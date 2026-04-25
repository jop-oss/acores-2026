import anthropic
import json
import time
import os

client = anthropic.Anthropic(api_key=os.environ.get('ANTHROPIC_API_KEY'))

CATEGORIES = {
    'famosos':   'Persones famoses (actors, cantants, esportistes, polítics, científics, personatges històrics...). Han de ser prou conegudes per a una família catalana.',
    'geografia': 'Llocs geogràfics (ciutats, països, muntanyes, rius, monuments, continents, illes...). Variats i de tot el món.',
    'musica':    'Cançons, grups musicals, cantants, instruments, gèneres musicals, àlbums famosos... Variats i de diferents èpoques.',
    'animals':   'Animals de tot tipus (mamífers, ocells, peixos, rèptils, insectes, animals marins...). Variats.',
    'menjar':    'Aliments, begudes, plats típics, ingredients, fruites, verdures, dolços, restaurants famosos...',
    'objectes':  'Objectes quotidians, eines, electrodomèstics, vehicles, mobles, roba, tecnologia...',
    'esports':   'Esports, equips esportius, competicions, trofeus, material esportiu, instal·lacions...',
}

def genera_bloc(categoria, descripcio, n, offset_id):
    prompt = f"""Genera exactament {n} paraules o conceptes per al joc "Qui sóc?" en català.
Categoria: {descripcio}

Per a cada paraula, genera també 3 pistes creatives i indirectes que ajudin a endevinar-la.
Les pistes NO han de contenir la paraula ni parts d'ella.
Les pistes han de ser progressivament més fàcils (la 1a més difícil, la 3a més fàcil).
Les paraules han de ser prou conegudes per a una família catalana que viatja a les Açores el juliol de 2026.

Respon ÚNICAMENT amb un array JSON vàlid, sense cap text addicional ni marques de codi:
[
  {{
    "paraula": "...",
    "pistes": ["pista difícil", "pista mitjana", "pista fàcil"]
  }}
]"""

    for intent in range(3):
        try:
            resp = client.messages.create(
                model='claude-haiku-4-5-20251001',
                max_tokens=4000,
                messages=[{'role': 'user', 'content': prompt}]
            )
            text = resp.content[0].text.strip()
            text = text.replace('```json', '').replace('```', '').strip()
            entrades = json.loads(text)

            result = []
            for i, e in enumerate(entrades[:n]):
                if 'paraula' not in e or 'pistes' not in e:
                    continue
                if len(e['pistes']) < 3:
                    continue
                result.append({
                    'id': offset_id + i,
                    'categoria': categoria,
                    'paraula': e['paraula'],
                    'pistes': e['pistes'][:3]
                })
            return result
        except Exception as ex:
            print(f"  Intent {intent+1} fallat: {ex}, reintentant...")
            time.sleep(1)

    print(f"  ERROR: no s'ha pogut generar el bloc després de 3 intents")
    return []

# Genera totes les entrades
totes = []
id_counter = 1

for cat, desc in CATEGORIES.items():
    print(f"Generant {cat} (100)...")
    for bloc in range(4):
        entrades = genera_bloc(cat, desc, 25, id_counter)
        totes.extend(entrades)
        id_counter += len(entrades)
        print(f"  Bloc {bloc+1}/4 OK ({len(entrades)} paraules)")
        time.sleep(0.5)

print(f"\nTotal paraules generades: {len(totes)}")
for cat in CATEGORIES.keys():
    n = len([e for e in totes if e['categoria'] == cat])
    print(f"  {cat}: {n}")

with open('paraules_qqs.json', 'w', encoding='utf-8') as f:
    json.dump(totes, f, ensure_ascii=False, indent=2)

print("\nGuardat a paraules_qqs.json")
