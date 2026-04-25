import anthropic
import json
import time

client = anthropic.Anthropic()

CATEGORIES = {
    'esports':    {'color': '#FF8C00', 'emoji': '⚽', 'label': 'Esports'},
    'geografia':  {'color': '#4169E1', 'emoji': '🌍', 'label': 'Geografia'},
    'ciencies':   {'color': '#228B22', 'emoji': '🔬', 'label': 'Ciències i Naturalesa'},
    'historia':   {'color': '#DAA520', 'emoji': '📜', 'label': 'Història'},
    'cultura':    {'color': '#FF69B4', 'emoji': '🎭', 'label': 'Cultura General'},
    'acores':     {'color': '#9370DB', 'emoji': '🌋', 'label': 'Açores'},
}

INSTRUCCIONS_CAT = {
    'esports':   'Preguntes sobre esportistes, equips o esdeveniments esportius del 2020 al 2025. Futbol, tennis, atletisme, ciclisme, bàsquet, natació, F1, etc.',
    'geografia': 'Preguntes sobre capitals, rius, muntanyes, països, continents, climes, fronteres, etc. del món.',
    'ciencies':  'Preguntes sobre biologia, física, química, astronomia, tecnologia, medicina, animals, plantes, etc.',
    'historia':  'Preguntes sobre esdeveniments, personatges i dates històriques del món. Evita preguntes massa específiques.',
    'cultura':   'Preguntes sobre cinema, música, literatura, art, gastronomia, jocs, tecnologia popular, etc.',
    'acores':    'Preguntes sobre la història, geografia, natura, cultura, gastronomia i curiositats de les Açores.',
}

def genera_bloc(categoria, dificultat, n, offset_id):
    if dificultat == 'mitjana':
        desc = 'dificultat mitjana: que una persona culta pugui encertar amb una mica de reflexió'
    else:
        desc = 'dificultat alta: que requereixi coneixements específics o detallats'

    prompt = f"""Genera exactament {n} preguntes de trivial en català sobre la categoria "{INSTRUCCIONS_CAT[categoria]}".

Dificultat: {desc}.
{'Per a esports, fes preguntes sobre fets entre 2020 i 2025.' if categoria == 'esports' else ''}

IMPORTANT:
- Cada pregunta té exactament 4 opcions de resposta
- Només una és correcta
- Les opcions incorrectes han de ser plausibles però clarament incorrectes si es coneix la resposta
- Les preguntes han de ser variades, no repetir el mateix tema
- Respon ÚNICAMENT amb un array JSON vàlid, sense cap text addicional ni marques de codi

Format exacte:
[
  {{
    "p": "Text de la pregunta?",
    "o": ["Opció A", "Opció B", "Opció C", "Opció D"],
    "c": 0
  }}
]

On "c" és l'índex (0-3) de l'opció correcta."""

    resp = client.messages.create(
        model='claude-haiku-4-5-20251001',
        max_tokens=4000,
        messages=[{'role': 'user', 'content': prompt}]
    )
    
    text = resp.content[0].text.strip()
    # Neteja possibles marques de codi
    text = text.replace('```json', '').replace('```', '').strip()
    
    preguntes = json.loads(text)
    
    result = []
    for i, q in enumerate(preguntes[:n]):
        result.append({
            'id': offset_id + i,
            'categoria': categoria,
            'dificultat': dificultat,
            'p': q['p'],
            'o': q['o'],
            'c': q['c']
        })
    return result

# Genera totes les preguntes
totes = []
id_counter = 1

for cat in CATEGORIES.keys():
    print(f"Generant {cat} - mitjana (100)...")
    # Genera en blocs de 25 per evitar tokens excessius
    for bloc in range(4):
        preguntes = genera_bloc(cat, 'mitjana', 25, id_counter)
        totes.extend(preguntes)
        id_counter += len(preguntes)
        print(f"  Bloc {bloc+1}/4 OK ({len(preguntes)} preguntes)")
        time.sleep(0.5)
    
    print(f"Generant {cat} - alta (25)...")
    preguntes = genera_bloc(cat, 'alta', 25, id_counter)
    totes.extend(preguntes)
    id_counter += len(preguntes)
    print(f"  OK ({len(preguntes)} preguntes)")
    time.sleep(0.5)

print(f"\nTotal preguntes generades: {len(totes)}")

# Verifica distribució
for cat in CATEGORIES.keys():
    mitj = [q for q in totes if q['categoria'] == cat and q['dificultat'] == 'mitjana']
    alta = [q for q in totes if q['categoria'] == cat and q['dificultat'] == 'alta']
    print(f"  {cat}: {len(mitj)} mitjanes + {len(alta)} altes")

# Guarda el JSON
with open('preguntes_trivial.json', 'w', encoding='utf-8') as f:
    json.dump(totes, f, ensure_ascii=False, indent=2)

print("\nGuardat a preguntes_trivial.json")
