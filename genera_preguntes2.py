import anthropic
import json
import time

client = anthropic.Anthropic()

# ── CONFIGURACIÓ DE GENERACIÓ ─────────────────────────────────────────────────
# Cada entrada: (subtema, n_preguntes)
# Les preguntes es generen en blocs de 25 màxim per evitar tokens excessius

TASQUES = [
    # Esports: 25 preguntes sobre Barça i gimnàstica
    {
        'cat': 'esports', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre el FC Barcelona (futbol, bàsquet, handbol, etc.) '
            'i sobre gimnàstica artística, rítmica o acrobàtica. '
            'Inclou jugadors, títols, temporades, entrenadors, estadis, '
            'gimnastes famoses i competicions.'
        ),
    },

    # Geografia: 25 generals + 25 Catalunya
    {
        'cat': 'geografia', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre geografia del món: capitals, rius, muntanyes, '
            'països, continents, climes, fronteres, oceans, deserts, etc. '
            'Evita preguntes ja molt habituals (capital de França, riu Nil...).'
        ),
    },
    {
        'cat': 'geografia', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes EXCLUSIVAMENT sobre geografia de Catalunya: '
            'comarques, capitals de comarca, rius, muntanyes (Pirineus, Montseny, '
            'Montserrat...), mars, llacs, parcs naturals, pobles destacats, '
            'límits amb altres comunitats i països, clima, etc.'
        ),
    },

    # Cultura: 25 generals + 25 cultura catalana
    {
        'cat': 'cultura', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre cultura general: cinema, música, literatura, art, '
            'gastronomia, jocs, tecnologia popular, sèries, videojocs, etc. '
            'Evita preguntes molt repetides (Picasso, Beatles, Cervantes...).'
        ),
    },
    {
        'cat': 'cultura', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes EXCLUSIVAMENT sobre cultura catalana: '
            'literatura catalana (Mercè Rodoreda, J.V. Foix, Salvador Espriu...), '
            'música (Rumba catalana, Nova Cançó, Els Segadors, Havaneres...), '
            'cinema català, gastronomia catalana (pa amb tomàquet, crema catalana, '
            'escudella, cargols...), festes (Castellers, Diada, Sant Jordi, '
            'Carnaval de Sitges...), art català, arquitectura (Gaudí, Domènech '
            'i Montaner...), dansa (Sardana), tradicions, etc.'
        ),
    },

    # Ciències: 50 astronomia + 50 generals
    {
        'cat': 'ciencies', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes EXCLUSIVAMENT sobre astronomia: planetes, satèl·lits, '
            'estrelles, constel·lacions, galàxies, forats negres, missions espacials, '
            'telescopis, fenòmens astronòmics (eclipsis, solsticis, equinoccis...), '
            'agències espacials (NASA, ESA...), astronautes famosos, etc.'
        ),
    },
    {
        'cat': 'ciencies', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes EXCLUSIVAMENT sobre astronomia: sistema solar, Via Làctia, '
            'Big Bang, matèria fosca, ones gravitacionals, exoplanetes, '
            'nebuloses, nanes blanques, púlsars, exploració de Mart, etc. '
            'Evita repetir preguntes de la primera tanda.'
        ),
    },
    {
        'cat': 'ciencies', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre biologia, física i química: cèl·lules, ADN, evolució, '
            'òrgans humans, elements químics, reaccions, forces, energia, ones, '
            'termodinàmica, genètica, ecosistemes, etc.'
        ),
    },
    {
        'cat': 'ciencies', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre tecnologia, medicina i ciències naturals: '
            'internet, dispositius, sistemes operatius, malalties, vacunes, '
            'animals i plantes, geologia, meteorologia, etc.'
        ),
    },

    # Història: 50 Catalunya + 50 generals
    {
        'cat': 'historia', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes EXCLUSIVAMENT sobre la història de Catalunya: '
            'Comtat de Barcelona, Corona d\'Aragó, Guerra de Successió (1714), '
            'Renaixença, Mancomunitat, República Catalana, Guerra Civil i repressió, '
            'franquisme a Catalunya, Transició, Estatut d\'Autonomia, personatges '
            'catalans destacats (Jaume I, Roger de Llúria, Pau Claris, Companys, '
            'Macià, Tarradellas...), etc.'
        ),
    },
    {
        'cat': 'historia', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes EXCLUSIVAMENT sobre la història de Catalunya (2a tanda): '
            'arqueologia (Ullastret, Empúries...), edat mitjana catalana, '
            'institucions (Generalitat, Corts Catalanes, Consell de Cent...), '
            'literatura medieval (Ramon Llull, Tirant lo Blanc, Ausiàs March...), '
            'industrialització catalana, arquitectura modernista, etc. '
            'Evita repetir temes de la primera tanda.'
        ),
    },
    {
        'cat': 'historia', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre història del món (antiguitat i edat mitjana): '
            'Grècia i Roma antigues, Egipte faraònic, Mesopotàmia, imperis asiàtics, '
            'edat mitjana europea, croades, Islam medieval, imperis precolombins, etc.'
        ),
    },
    {
        'cat': 'historia', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre història del món (edat moderna i contemporània): '
            'Renaixement, Reforma protestant, grans exploradors, Revolució Industrial, '
            'revolucions liberals, imperialisme, guerres mundials, Guerra Freda, '
            'descolonització, etc. Evita preguntes ja molt habituals.'
        ),
    },

    # Açores: 50 vocabulari + 50 curiositats
    {
        'cat': 'acores', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre VOCABULARI portuguès relacionat amb les Açores i la vida '
            'quotidiana portuguesa. Format: dona una paraula en portuguès i pregunta '
            'pel seu significat en català, o a la inversa. '
            'Exemples de paraules: caldeira, saudade, miradouro, pastéis, '
            'mercearia, farol, ribeira, levada, adega, quinta, etc. '
            'Les 4 opcions han de ser significats en català plausibles.'
        ),
    },
    {
        'cat': 'acores', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre VOCABULARI portuguès (2a tanda): paraules relacionades '
            'amb la natura, el mar, la cuina i la vida de les Açores. '
            'Paraules com: garoupa, lapas, chouriço, queijada, fumeiro, '
            'chamarrita (dansa), fajã, caldas, nascente, etc. '
            'Evita repetir paraules de la primera tanda.'
        ),
    },
    {
        'cat': 'acores', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre curiositats, natura i cultura específica de les Açores: '
            'fauna i flora endèmica, geologia volcànica, tradicions locals, '
            'gastronomia (plats que no s\'hagin mencionat), pesca, artesania, '
            'arquitectura típica, festes locals per illa, rutes de senderisme, etc.'
        ),
    },
    {
        'cat': 'acores', 'dif': 'mitjana', 'n': 25,
        'instruccions': (
            'Preguntes sobre les illes de les Açores una per una: '
            'São Miguel (Sete Cidades, Furnas, Lagoa do Fogo...), '
            'Terceira (Algar do Carvão, Angra do Heroísmo...), '
            'Pico (vinyes UNESCO, muntanya...), Faial (Horta, marina...), '
            'São Jorge (fajãs, queijo...), Graciosa, Santa Maria, Flores, Corvo. '
            'Evita repetir preguntes ja generades.'
        ),
    },
]

# ── FUNCIÓ DE GENERACIÓ ───────────────────────────────────────────────────────

def genera_bloc(instruccions, n, cat, dif, offset_id):
    if dif == 'mitjana':
        desc_dif = 'dificultat mitjana: que una persona culta pugui encertar amb reflexió'
    else:
        desc_dif = 'dificultat alta: que requereixi coneixements específics o detallats'

    prompt = f"""Genera exactament {n} preguntes de trivial en CATALÀ sobre el tema següent:

{instruccions}

Dificultat: {desc_dif}.

IMPORTANT:
- Totes les preguntes i opcions han d'estar en CATALÀ correcte (no castellà, no portuguès excepte quan la pregunta ho requereixi explícitament)
- Cada pregunta té exactament 4 opcions de resposta
- Només una és correcta
- Les opcions incorrectes han de ser plausibles però clarament incorrectes si es coneix la resposta
- Les preguntes han de ser variades, no repetir el mateix tema
- Respon ÚNICAMENT amb un array JSON vàlid, sense cap text addicional ni marques de codi

Format exacte (c és l'índex 0-3 de l'opció correcta):
[
  {{
    "p": "Text de la pregunta?",
    "o": ["Opció A", "Opció B", "Opció C", "Opció D"],
    "c": 0
  }}
]"""

    resp = client.messages.create(
        model='claude-haiku-4-5-20251001',
        max_tokens=4000,
        messages=[{'role': 'user', 'content': prompt}]
    )

    text = resp.content[0].text.strip()
    text = text.replace('```json', '').replace('```', '').strip()

    preguntes = json.loads(text)

    result = []
    for i, q in enumerate(preguntes[:n]):
        result.append({
            'id':    offset_id + i,
            'cat':   cat,
            'dif':   dif,
            'p':     q['p'],
            'o':     q['o'],
            'c':     q['c'],
        })
    return result


# ── EXECUCIÓ ──────────────────────────────────────────────────────────────────

totes = []
id_counter = 1000  # IDs alts per no xocar amb els existents

for i, tasca in enumerate(TASQUES):
    cat = tasca['cat']
    dif = tasca['dif']
    n   = tasca['n']
    print(f"[{i+1}/{len(TASQUES)}] {cat} / {dif} / {n} preguntes...")

    try:
        preguntes = genera_bloc(tasca['instruccions'], n, cat, dif, id_counter)
        totes.extend(preguntes)
        id_counter += len(preguntes)
        print(f"  ✓ {len(preguntes)} preguntes generades")
    except Exception as e:
        print(f"  ✗ Error: {e}")

    time.sleep(1)  # pausa entre crides

# ── RESUM ─────────────────────────────────────────────────────────────────────

print(f"\n{'='*50}")
print(f"Total preguntes generades: {len(totes)}")
print(f"{'='*50}")

cats = ['esports', 'geografia', 'ciencies', 'historia', 'cultura', 'acores']
for cat in cats:
    mitj = [q for q in totes if q['cat'] == cat and q['dif'] == 'mitjana']
    alta = [q for q in totes if q['cat'] == cat and q['dif'] == 'alta']
    if mitj or alta:
        print(f"  {cat:10}: {len(mitj)} mitjanes + {len(alta)} altes")

# ── EXPORTA JSON ──────────────────────────────────────────────────────────────

with open('preguntes_noves.json', 'w', encoding='utf-8') as f:
    json.dump(totes, f, ensure_ascii=False, indent=2)

print("\nGuardat a preguntes_noves.json")
print("Recorda revisar-les i integrar-les al trivial-data.js!")
