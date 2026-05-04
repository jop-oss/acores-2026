// diferencies-data.js
// 8 escenes SVG per al joc Busca les Diferències
// Cada escena té 5 diferències marcades amb coordenades (centre del cercle de detecció)
// Les coordenades són relatives a cadascuna de les dues imatges (310×250 px cada una)

const DIFER_ESCENES = [

// ─────────────────────────────────────────────────────────────
// 1. VOLCÀ EN ERUPCIÓ
// ─────────────────────────────────────────────────────────────
{
  id: 1,
  titol: 'Volcà en erupció',
  emoji: '🌋',
  dificultat: 'fàcil',
  diferencies: [
    { x: 268, y: 38,  r: 30, desc: 'Sol gran/petit' },
    { x: 117, y: 58,  r: 22, desc: '3 ocells / 2 ocells' },
    { x:  32, y: 214, r: 28, desc: 'Vaixell present/absent' },
    { x:  55, y: 238, r: 18, desc: 'Flor vermella/groga' },
    { x: 245, y: 238, r: 22, desc: 'Roca gran/petita' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#6BB8D4"/>
    <circle cx="268" cy="38" r="20" fill="#FFD44A"/>
    <line x1="268" y1="11" x2="268" y2="5" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="268" y1="65" x2="268" y2="71" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="242" y1="38" x2="236" y2="38" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="294" y1="38" x2="300" y2="38" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="250" y1="19" x2="246" y2="14" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="286" y1="57" x2="290" y2="62" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="286" y1="19" x2="290" y2="14" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="250" y1="57" x2="246" y2="62" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="55" cy="32" rx="32" ry="13" fill="white"/>
    <ellipse cx="73" cy="26" rx="22" ry="11" fill="white"/>
    <ellipse cx="38" cy="29" rx="17" ry="9" fill="white"/>
    <ellipse cx="165" cy="22" rx="28" ry="11" fill="white"/>
    <ellipse cx="182" cy="17" rx="19" ry="9" fill="white"/>
    <ellipse cx="149" cy="20" rx="15" ry="8" fill="white"/>
    <path d="M100 62 Q104 57 108 62" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M113 54 Q117 49 121 54" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M126 63 Q130 58 134 63" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <polygon points="155,28 28,200 282,200" fill="#6B5040"/>
    <polygon points="155,28 98,175 155,180 212,175" fill="#4A3428"/>
    <polygon points="28,200 282,200 255,165 58,165" fill="#3A6E28"/>
    <polygon points="155,33 142,130 155,142 168,130" fill="#FF4500"/>
    <polygon points="155,50 146,150 155,160 164,150" fill="#FF6A00"/>
    <polygon points="155,60 151,120 155,126 159,120" fill="#FFAA00" opacity="0.7"/>
    <ellipse cx="155" cy="32" rx="18" ry="7" fill="#1A0800"/>
    <ellipse cx="155" cy="18" rx="14" ry="9" fill="#7A5030" opacity="0.75"/>
    <ellipse cx="148" cy="8" rx="9" ry="6" fill="#6A4020" opacity="0.6"/>
    <ellipse cx="163" cy="5" rx="8" ry="5" fill="#7A4A25" opacity="0.5"/>
    <rect x="0" y="200" width="310" height="40" rx="0" fill="#1A6EA8"/>
    <path d="M0 208 Q18 203 36 208 Q54 213 72 208 Q90 203 108 208 Q126 213 144 208 Q162 203 180 208 Q198 213 216 208 Q234 203 252 208 Q270 213 288 208 Q304 213 310 208" fill="none" stroke="#4D9EC8" stroke-width="1.8"/>
    <path d="M0 222 Q22 217 44 222 Q66 227 88 222 Q110 217 132 222 Q154 227 176 222 Q198 217 220 222 Q242 227 264 222 Q288 217 310 222" fill="none" stroke="#4D9EC8" stroke-width="1.2"/>
    <rect x="14" y="210" width="36" height="9" rx="3" fill="#8B5E3C"/>
    <polygon points="32,210 32,196 48,210" fill="#F5DEB3"/>
    <rect x="30" y="196" width="2.5" height="14" fill="#5C3317"/>
    <circle cx="24" cy="214" r="2.5" fill="#ADE0F0"/>
    <rect x="0" y="240" width="310" height="10" rx="0" fill="#2A4A1A"/>
    <rect x="20" y="224" width="5" height="16" fill="#4A3020"/>
    <ellipse cx="22" cy="220" rx="11" ry="13" fill="#2A6A22"/>
    <rect x="280" y="228" width="5" height="12" fill="#4A3020"/>
    <ellipse cx="282" cy="224" rx="10" ry="12" fill="#2A6A22"/>
    <circle cx="55" cy="238" r="5" fill="#D62828"/>
    <circle cx="55" cy="238" r="2.2" fill="#FFE000"/>
    <ellipse cx="245" cy="238" rx="14" ry="7" fill="#5A4A38"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#6BB8D4"/>
    <circle cx="268" cy="38" r="13" fill="#FFD44A"/>
    <line x1="268" y1="19" x2="268" y2="13" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="268" y1="57" x2="268" y2="63" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="249" y1="38" x2="243" y2="38" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="287" y1="38" x2="293" y2="38" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="254" y1="24" x2="250" y2="19" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="282" y1="52" x2="286" y2="57" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="282" y1="24" x2="286" y2="19" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <line x1="254" y1="52" x2="250" y2="57" stroke="#FFD44A" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="55" cy="32" rx="32" ry="13" fill="white"/>
    <ellipse cx="73" cy="26" rx="22" ry="11" fill="white"/>
    <ellipse cx="38" cy="29" rx="17" ry="9" fill="white"/>
    <ellipse cx="165" cy="22" rx="28" ry="11" fill="white"/>
    <ellipse cx="182" cy="17" rx="19" ry="9" fill="white"/>
    <ellipse cx="149" cy="20" rx="15" ry="8" fill="white"/>
    <path d="M100 62 Q104 57 108 62" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M113 54 Q117 49 121 54" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <polygon points="155,28 28,200 282,200" fill="#6B5040"/>
    <polygon points="155,28 98,175 155,180 212,175" fill="#4A3428"/>
    <polygon points="28,200 282,200 255,165 58,165" fill="#3A6E28"/>
    <polygon points="155,33 142,130 155,142 168,130" fill="#FF4500"/>
    <polygon points="155,50 146,150 155,160 164,150" fill="#FF6A00"/>
    <polygon points="155,60 151,120 155,126 159,120" fill="#FFAA00" opacity="0.7"/>
    <ellipse cx="155" cy="32" rx="18" ry="7" fill="#1A0800"/>
    <ellipse cx="155" cy="18" rx="14" ry="9" fill="#7A5030" opacity="0.75"/>
    <ellipse cx="148" cy="8" rx="9" ry="6" fill="#6A4020" opacity="0.6"/>
    <ellipse cx="163" cy="5" rx="8" ry="5" fill="#7A4A25" opacity="0.5"/>
    <rect x="0" y="200" width="310" height="40" rx="0" fill="#1A6EA8"/>
    <path d="M0 208 Q18 203 36 208 Q54 213 72 208 Q90 203 108 208 Q126 213 144 208 Q162 203 180 208 Q198 213 216 208 Q234 203 252 208 Q270 213 288 208 Q304 213 310 208" fill="none" stroke="#4D9EC8" stroke-width="1.8"/>
    <path d="M0 222 Q22 217 44 222 Q66 227 88 222 Q110 217 132 222 Q154 227 176 222 Q198 217 220 222 Q242 227 264 222 Q288 217 310 222" fill="none" stroke="#4D9EC8" stroke-width="1.2"/>
    <rect x="0" y="240" width="310" height="10" rx="0" fill="#2A4A1A"/>
    <rect x="20" y="224" width="5" height="16" fill="#4A3020"/>
    <ellipse cx="22" cy="220" rx="11" ry="13" fill="#2A6A22"/>
    <rect x="280" y="228" width="5" height="12" fill="#4A3020"/>
    <ellipse cx="282" cy="224" rx="10" ry="12" fill="#2A6A22"/>
    <circle cx="55" cy="238" r="5" fill="#FFD700"/>
    <circle cx="55" cy="238" r="2.2" fill="#FF6B00"/>
    <ellipse cx="245" cy="238" rx="8" ry="5" fill="#5A4A38"/>
  `,
},

// ─────────────────────────────────────────────────────────────
// 2. FONS MARÍ
// ─────────────────────────────────────────────────────────────
{
  id: 2,
  titol: 'Fons marí',
  emoji: '🐠',
  dificultat: 'fàcil',
  diferencies: [
    { x:  60, y:  60, r: 28, desc: 'Peix gran/petit' },
    { x: 220, y:  80, r: 25, desc: '3 bombolles / 2 bombolles' },
    { x: 155, y: 155, r: 25, desc: 'Estrella de mar present/absent' },
    { x:  90, y: 200, r: 22, desc: 'Coral vermell/taronja' },
    { x: 250, y: 175, r: 22, desc: 'Peix petit addicional' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#0A4F7A"/>
    <rect x="0" y="0" width="310" height="60" rx="6" fill="#0D6A9E"/>
    <path d="M0 55 Q20 50 40 55 Q60 60 80 55 Q100 50 120 55 Q140 60 160 55 Q180 50 200 55 Q220 60 240 55 Q270 50 310 55" fill="none" stroke="#1E8BC3" stroke-width="1.5"/>
    <ellipse cx="60" cy="50" rx="28" ry="14" fill="#F4A261"/>
    <ellipse cx="42" cy="48" rx="8" ry="6" fill="#F4A261"/>
    <ellipse cx="78" cy="52" rx="7" ry="5" fill="#F4A261"/>
    <polygon points="88,50 60,44 60,56" fill="#E76F51"/>
    <circle cx="65" cy="48" r="3" fill="#1A1A1A"/>
    <ellipse cx="60" cy="44" rx="6" ry="3" fill="#E76F51"/>
    <ellipse cx="55" cy="56" rx="5" ry="3" fill="#E76F51"/>
    <ellipse cx="70" cy="56" rx="5" ry="2.5" fill="#E76F51"/>
    <ellipse cx="160" cy="100" rx="18" ry="9" fill="#2A9D8F"/>
    <ellipse cx="145" cy="98" rx="5" ry="4" fill="#2A9D8F"/>
    <ellipse cx="175" cy="102" rx="4" ry="3.5" fill="#2A9D8F"/>
    <polygon points="178,100 160,95 160,105" fill="#21867A"/>
    <circle cx="164" cy="97" r="2" fill="#1A1A1A"/>
    <ellipse cx="160" cy="94" rx="4" ry="2" fill="#21867A"/>
    <circle cx="220" cy="78" r="5" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
    <circle cx="232" cy="65" r="3.5" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.2"/>
    <circle cx="215" cy="58" r="2.5" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <polygon points="155,145 162,162 155,158 148,162" fill="#E9C46A"/>
    <polygon points="155,145 172,152 168,158 155,158" fill="#E9C46A"/>
    <polygon points="155,145 138,152 142,158 155,158" fill="#E9C46A"/>
    <circle cx="155" cy="155" r="6" fill="#F4A261"/>
    <rect x="10" y="210" width="14" height="40" rx="3" fill="#6B3A2A"/>
    <path d="M10 225 Q5 220 10 215 Q15 210 20 215 Q25 210 24 225" fill="#E76F51"/>
    <path d="M10 235 Q5 230 10 225 Q15 220 20 225 Q25 220 24 235" fill="#E9C46A"/>
    <rect x="85" y="195" width="10" height="55" rx="3" fill="#6B3A2A"/>
    <path d="M85 210 Q80 205 85 200 Q90 195 95 200 Q100 195 95 210" fill="#E76F51"/>
    <path d="M85 225 Q80 220 85 215 Q90 210 95 215 Q100 210 95 225" fill="#E76F51"/>
    <path d="M85 240 Q80 235 85 230 Q90 225 95 230 Q100 225 95 240" fill="#E9C46A"/>
    <rect x="260" y="220" width="12" height="30" rx="3" fill="#6B3A2A"/>
    <path d="M260 232 Q255 227 260 222 Q265 217 270 222 Q275 217 272 232" fill="#2A9D8F"/>
    <path d="M260 245 Q255 240 260 235 Q265 230 270 235 Q275 230 272 245" fill="#2A9D8F"/>
    <ellipse cx="155" cy="245" rx="80" ry="8" fill="#1A3A1A"/>
    <ellipse cx="60" cy="248" rx="40" ry="5" fill="#1A3A1A"/>
    <ellipse cx="260" cy="246" rx="35" ry="4" fill="#1A3A1A"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#0A3A5A" stroke-width="1"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#0A4F7A"/>
    <rect x="0" y="0" width="310" height="60" rx="6" fill="#0D6A9E"/>
    <path d="M0 55 Q20 50 40 55 Q60 60 80 55 Q100 50 120 55 Q140 60 160 55 Q180 50 200 55 Q220 60 240 55 Q270 50 310 55" fill="none" stroke="#1E8BC3" stroke-width="1.5"/>
    <ellipse cx="60" cy="50" rx="18" ry="9" fill="#F4A261"/>
    <ellipse cx="46" cy="49" rx="5" ry="4" fill="#F4A261"/>
    <ellipse cx="74" cy="52" rx="5" ry="3.5" fill="#F4A261"/>
    <polygon points="78,50 60,46 60,54" fill="#E76F51"/>
    <circle cx="63" cy="48" r="2" fill="#1A1A1A"/>
    <ellipse cx="60" cy="45" rx="4" ry="2" fill="#E76F51"/>
    <ellipse cx="56" cy="54" rx="4" ry="2" fill="#E76F51"/>
    <ellipse cx="66" cy="54" rx="4" ry="2" fill="#E76F51"/>
    <ellipse cx="160" cy="100" rx="18" ry="9" fill="#2A9D8F"/>
    <ellipse cx="145" cy="98" rx="5" ry="4" fill="#2A9D8F"/>
    <ellipse cx="175" cy="102" rx="4" ry="3.5" fill="#2A9D8F"/>
    <polygon points="178,100 160,95 160,105" fill="#21867A"/>
    <circle cx="164" cy="97" r="2" fill="#1A1A1A"/>
    <ellipse cx="160" cy="94" rx="4" ry="2" fill="#21867A"/>
    <circle cx="220" cy="78" r="5" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
    <circle cx="215" cy="58" r="2.5" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <ellipse cx="250" cy="172" rx="12" ry="6" fill="#E9C46A"/>
    <ellipse cx="240" cy="170" rx="3.5" ry="3" fill="#E9C46A"/>
    <ellipse cx="260" cy="174" rx="3" ry="2.5" fill="#E9C46A"/>
    <polygon points="263,172 250,168 250,176" fill="#D4A017"/>
    <circle cx="253" cy="170" r="1.8" fill="#1A1A1A"/>
    <rect x="10" y="210" width="14" height="40" rx="3" fill="#6B3A2A"/>
    <path d="M10 225 Q5 220 10 215 Q15 210 20 215 Q25 210 24 225" fill="#E76F51"/>
    <path d="M10 235 Q5 230 10 225 Q15 220 20 225 Q25 220 24 235" fill="#E9C46A"/>
    <rect x="85" y="195" width="10" height="55" rx="3" fill="#6B3A2A"/>
    <path d="M85 210 Q80 205 85 200 Q90 195 95 200 Q100 195 95 210" fill="#F4842A"/>
    <path d="M85 225 Q80 220 85 215 Q90 210 95 215 Q100 210 95 225" fill="#F4842A"/>
    <path d="M85 240 Q80 235 85 230 Q90 225 95 230 Q100 225 95 240" fill="#E9C46A"/>
    <rect x="260" y="220" width="12" height="30" rx="3" fill="#6B3A2A"/>
    <path d="M260 232 Q255 227 260 222 Q265 217 270 222 Q275 217 272 232" fill="#2A9D8F"/>
    <path d="M260 245 Q255 240 260 235 Q265 230 270 235 Q275 230 272 245" fill="#2A9D8F"/>
    <ellipse cx="155" cy="245" rx="80" ry="8" fill="#1A3A1A"/>
    <ellipse cx="60" cy="248" rx="40" ry="5" fill="#1A3A1A"/>
    <ellipse cx="260" cy="246" rx="35" ry="4" fill="#1A3A1A"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#0A3A5A" stroke-width="1"/>
  `,
},

// ─────────────────────────────────────────────────────────────
// 3. FERRI ENTRE ILLES
// ─────────────────────────────────────────────────────────────
{
  id: 3,
  titol: 'Ferri entre illes',
  emoji: '⛴️',
  dificultat: 'fàcil',
  diferencies: [
    { x:  50, y:  40, r: 28, desc: 'Núvol gran/petit' },
    { x: 155, y:  80, r: 25, desc: '2 xemeneies / 1 xemeneia' },
    { x: 245, y:  42, r: 22, desc: 'Ocell present/absent' },
    { x:  80, y: 195, r: 22, desc: 'Onada extra present/absent' },
    { x: 260, y: 170, r: 22, desc: 'Illa gran/petita' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#87C4E0"/>
    <ellipse cx="50" cy="38" rx="35" ry="16" fill="white"/>
    <ellipse cx="68" cy="30" rx="24" ry="12" fill="white"/>
    <ellipse cx="32" cy="34" rx="18" ry="10" fill="white"/>
    <ellipse cx="180" cy="28" rx="28" ry="12" fill="white"/>
    <ellipse cx="196" cy="22" rx="18" ry="9" fill="white"/>
    <ellipse cx="164" cy="26" rx="14" ry="8" fill="white"/>
    <path d="M240 42 Q244 37 248 42" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M252 36 Q256 31 260 36" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <rect x="0" y="130" width="310" height="120" rx="0" fill="#1B78B0"/>
    <path d="M0 138 Q22 132 44 138 Q66 144 88 138 Q110 132 132 138 Q154 144 176 138 Q198 132 220 138 Q242 144 264 138 Q286 132 310 138" fill="none" stroke="#3A9AC8" stroke-width="2"/>
    <path d="M0 155 Q25 149 50 155 Q75 161 100 155 Q125 149 150 155 Q175 161 200 155 Q225 149 250 155 Q275 161 310 155" fill="none" stroke="#3A9AC8" stroke-width="1.5"/>
    <path d="M0 173 Q30 167 60 173 Q90 179 120 173 Q150 167 180 173 Q210 179 240 173 Q270 167 310 173" fill="none" stroke="#3A9AC8" stroke-width="1.2"/>
    <path d="M70 195 Q90 189 110 195 Q130 201 150 195" fill="none" stroke="#3A9AC8" stroke-width="2.5"/>
    <rect x="50" y="95" width="210" height="50" rx="4" fill="#E8E4D9"/>
    <rect x="50" y="90" width="210" height="15" rx="3" fill="#B8B0A0"/>
    <rect x="50" y="120" width="210" height="25" rx="0" fill="#D8D0C0"/>
    <rect x="65" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="95" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="125" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="195" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="225" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="140" y="60" width="8" height="35" rx="2" fill="#888"/>
    <rect x="162" y="65" width="8" height="30" rx="2" fill="#888"/>
    <ellipse cx="144" cy="57" rx="8" ry="6" fill="#AAA"/>
    <ellipse cx="166" cy="62" rx="7" ry="5" fill="#AAA"/>
    <polygon points="255,170 240,210 270,210" fill="#4A7A3A"/>
    <ellipse cx="255" cy="168" rx="18" ry="10" fill="#3A6A2A"/>
    <polygon points="45" fill="#4A7A3A"/>
    <polygon points="40,200 25,240 55,240" fill="#4A7A3A"/>
    <ellipse cx="40" cy="198" rx="18" ry="9" fill="#3A6A2A"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#5A9AC8" stroke-width="1"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#87C4E0"/>
    <ellipse cx="50" cy="38" rx="20" ry="10" fill="white"/>
    <ellipse cx="62" cy="32" rx="14" ry="8" fill="white"/>
    <ellipse cx="38" cy="35" rx="11" ry="7" fill="white"/>
    <ellipse cx="180" cy="28" rx="28" ry="12" fill="white"/>
    <ellipse cx="196" cy="22" rx="18" ry="9" fill="white"/>
    <ellipse cx="164" cy="26" rx="14" ry="8" fill="white"/>
    <path d="M252 36 Q256 31 260 36" fill="none" stroke="#2a2a2a" stroke-width="1.8" stroke-linecap="round"/>
    <rect x="0" y="130" width="310" height="120" rx="0" fill="#1B78B0"/>
    <path d="M0 138 Q22 132 44 138 Q66 144 88 138 Q110 132 132 138 Q154 144 176 138 Q198 132 220 138 Q242 144 264 138 Q286 132 310 138" fill="none" stroke="#3A9AC8" stroke-width="2"/>
    <path d="M0 155 Q25 149 50 155 Q75 161 100 155 Q125 149 150 155 Q175 161 200 155 Q225 149 250 155 Q275 161 310 155" fill="none" stroke="#3A9AC8" stroke-width="1.5"/>
    <path d="M0 173 Q30 167 60 173 Q90 179 120 173 Q150 167 180 173 Q210 179 240 173 Q270 167 310 173" fill="none" stroke="#3A9AC8" stroke-width="1.2"/>
    <rect x="50" y="95" width="210" height="50" rx="4" fill="#E8E4D9"/>
    <rect x="50" y="90" width="210" height="15" rx="3" fill="#B8B0A0"/>
    <rect x="50" y="120" width="210" height="25" rx="0" fill="#D8D0C0"/>
    <rect x="65" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="95" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="125" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="195" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="225" y="125" width="20" height="15" rx="2" fill="#ADE0F0"/>
    <rect x="150" y="60" width="8" height="35" rx="2" fill="#888"/>
    <ellipse cx="154" cy="57" rx="8" ry="6" fill="#AAA"/>
    <polygon points="255,185 235,220 275,220" fill="#4A7A3A"/>
    <ellipse cx="255" cy="183" rx="11" ry="7" fill="#3A6A2A"/>
    <polygon points="40,200 25,240 55,240" fill="#4A7A3A"/>
    <ellipse cx="40" cy="198" rx="18" ry="9" fill="#3A6A2A"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#5A9AC8" stroke-width="1"/>
  `,
},

// ─────────────────────────────────────────────────────────────
// 4. POBLE COSTANER
// ─────────────────────────────────────────────────────────────
{
  id: 4,
  titol: 'Poble costaner',
  emoji: '🏘️',
  dificultat: 'mitjà',
  diferencies: [
    { x:  55, y:  85, r: 22, desc: 'Finestra casa esquerra present/absent' },
    { x: 155, y:  60, r: 20, desc: 'Creu campanari present/absent' },
    { x: 255, y:  90, r: 22, desc: 'Teulada vermella/blava' },
    { x: 100, y: 195, r: 22, desc: 'Barca groga/vermella' },
    { x: 220, y: 175, r: 22, desc: 'Gat present/absent' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#87CEEB"/>
    <ellipse cx="80" cy="25" rx="30" ry="12" fill="white"/>
    <ellipse cx="96" cy="18" rx="20" ry="10" fill="white"/>
    <rect x="20" y="110" width="70" height="90" rx="2" fill="#F5F0E8"/>
    <polygon points="20,110 55,75 90,110" fill="#C84B3A"/>
    <rect x="35" y="140" width="20" height="30" rx="1" fill="#7EC8E3"/>
    <rect x="62" y="130" width="18" height="20" rx="1" fill="#ADE0F0"/>
    <rect x="40" y="80" width="8" height="3" fill="#C84B3A"/>
    <rect x="44" y="68" width="2" height="16" fill="#888"/>
    <rect x="30" y="150" width="8" height="8" rx="1" fill="#ADE0F0"/>
    <rect x="115" y="90" width="80" height="110" rx="2" fill="#EDE8DE"/>
    <polygon points="115,90 155,55 195,90" fill="#3A6EA8"/>
    <rect x="143" y="45" width="4" height="20" fill="#888"/>
    <rect x="139" y="43" width="12" height="3" fill="#888"/>
    <rect x="139" y="45" width="3" height="12" fill="#888"/>
    <rect x="136" y="110" width="22" height="35" rx="1" fill="#7EC8E3"/>
    <rect x="122" y="105" width="16" height="14" rx="1" fill="#ADE0F0"/>
    <rect x="160" y="105" width="16" height="14" rx="1" fill="#ADE0F0"/>
    <rect x="200" y="100" width="90" height="100" rx="2" fill="#F0EBE0"/>
    <polygon points="200,100 245,70 290,100" fill="#B03A2E"/>
    <rect x="215" y="125" width="22" height="30" rx="1" fill="#7EC8E3"/>
    <rect x="252" y="125" width="22" height="30" rx="1" fill="#ADE0F0"/>
    <rect x="240" y="110" width="16" height="14" rx="1" fill="#ADE0F0"/>
    <rect x="0" y="200" width="310" height="50" rx="0" fill="#1B78B0"/>
    <path d="M0 208 Q22 202 44 208 Q66 214 88 208 Q110 202 132 208 Q154 214 176 208 Q198 202 220 208 Q242 214 264 208 Q286 202 310 208" fill="none" stroke="#3A9AC8" stroke-width="1.8"/>
    <rect x="80" y="188" width="40" height="15" rx="3" fill="#F4D03F"/>
    <polygon points="100,188 100,174 114,188" fill="#F0F0E0"/>
    <rect x="98" y="174" width="2" height="14" fill="#888"/>
    <rect x="218" y="173" width="14" height="6" rx="1" fill="#5A4A38"/>
    <ellipse cx="220" cy="172" rx="4" ry="5" fill="#8B7355"/>
    <ellipse cx="226" cy="175" rx="3" ry="4" fill="#8B7355"/>
    <rect x="0" y="195" width="310" height="10" rx="0" fill="#3A5A28"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#5A9AC8" stroke-width="1"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#87CEEB"/>
    <ellipse cx="80" cy="25" rx="30" ry="12" fill="white"/>
    <ellipse cx="96" cy="18" rx="20" ry="10" fill="white"/>
    <rect x="20" y="110" width="70" height="90" rx="2" fill="#F5F0E8"/>
    <polygon points="20,110 55,75 90,110" fill="#C84B3A"/>
    <rect x="35" y="140" width="20" height="30" rx="1" fill="#7EC8E3"/>
    <rect x="62" y="130" width="18" height="20" rx="1" fill="#ADE0F0"/>
    <rect x="40" y="80" width="8" height="3" fill="#C84B3A"/>
    <rect x="44" y="68" width="2" height="16" fill="#888"/>
    <rect x="115" y="90" width="80" height="110" rx="2" fill="#EDE8DE"/>
    <polygon points="115,90 155,55 195,90" fill="#3A6EA8"/>
    <rect x="143" y="45" width="4" height="20" fill="#888"/>
    <rect x="136" y="110" width="22" height="35" rx="1" fill="#7EC8E3"/>
    <rect x="122" y="105" width="16" height="14" rx="1" fill="#ADE0F0"/>
    <rect x="160" y="105" width="16" height="14" rx="1" fill="#ADE0F0"/>
    <rect x="200" y="100" width="90" height="100" rx="2" fill="#F0EBE0"/>
    <polygon points="200,100 245,70 290,100" fill="#3A6EA8"/>
    <rect x="215" y="125" width="22" height="30" rx="1" fill="#7EC8E3"/>
    <rect x="252" y="125" width="22" height="30" rx="1" fill="#ADE0F0"/>
    <rect x="240" y="110" width="16" height="14" rx="1" fill="#ADE0F0"/>
    <rect x="0" y="200" width="310" height="50" rx="0" fill="#1B78B0"/>
    <path d="M0 208 Q22 202 44 208 Q66 214 88 208 Q110 202 132 208 Q154 214 176 208 Q198 202 220 208 Q242 214 264 208 Q286 202 310 208" fill="none" stroke="#3A9AC8" stroke-width="1.8"/>
    <rect x="80" y="188" width="40" height="15" rx="3" fill="#E74C3C"/>
    <polygon points="100,188 100,174 114,188" fill="#F0F0E0"/>
    <rect x="98" y="174" width="2" height="14" fill="#888"/>
    <rect x="0" y="195" width="310" height="10" rx="0" fill="#3A5A28"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#5A9AC8" stroke-width="1"/>
  `,
},

// ─────────────────────────────────────────────────────────────
// 5. POP I CRANCS
// ─────────────────────────────────────────────────────────────
{
  id: 5,
  titol: 'Pop i crancs',
  emoji: '🐙',
  dificultat: 'mitjà',
  diferencies: [
    { x: 155, y:  90, r: 28, desc: 'Cap pop gran/petit' },
    { x:  60, y: 190, r: 25, desc: 'Cranc vermell/taronja' },
    { x: 255, y: 170, r: 22, desc: '4 tentacles / 3 tentacles dreta' },
    { x: 155, y: 210, r: 22, desc: 'Petxina present/absent' },
    { x: 100, y:  50, r: 20, desc: '3 bombolles / 2 bombolles dalt' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#083D6E"/>
    <rect x="0" y="0" width="310" height="40" rx="6" fill="#0D5A9E"/>
    <path d="M0 38 Q22 32 44 38 Q66 44 88 38 Q110 32 132 38 Q154 44 176 38 Q198 32 220 38 Q242 44 264 38 Q286 32 310 38" fill="none" stroke="#1E7ABE" stroke-width="1.5"/>
    <circle cx="100" cy="48" r="5" fill="none" stroke="rgba(200,230,255,0.5)" stroke-width="1.5"/>
    <circle cx="112" cy="36" r="3.5" fill="none" stroke="rgba(200,230,255,0.4)" stroke-width="1.2"/>
    <circle cx="94" cy="30" r="2.5" fill="none" stroke="rgba(200,230,255,0.35)" stroke-width="1"/>
    <ellipse cx="155" cy="88" rx="30" ry="26" fill="#9B2335"/>
    <circle cx="143" cy="82" r="6" fill="white"/>
    <circle cx="143" cy="82" r="3.5" fill="#1A1A1A"/>
    <circle cx="167" cy="82" r="6" fill="white"/>
    <circle cx="167" cy="82" r="3.5" fill="#1A1A1A"/>
    <path d="M155 96 Q148 102 142 98" fill="none" stroke="#7A1A28" stroke-width="2" stroke-linecap="round"/>
    <path d="M115 95 Q95 115 85 140 Q80 160 90 175" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M120 108 Q105 130 100 158 Q98 175 108 188" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M140 115 Q138 140 142 165 Q144 180 140 195" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M195 95 Q215 115 225 140 Q230 160 220 175" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M190 108 Q205 130 210 158 Q212 175 202 188" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M170 115 Q172 140 168 165 Q166 180 170 195" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M155 115 Q155 140 155 165 Q155 180 155 200" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="60" cy="195" rx="22" ry="12" fill="#C0392B"/>
    <rect x="44" y="188" width="8" height="7" rx="1" fill="#C0392B"/>
    <rect x="70" y="188" width="8" height="7" rx="1" fill="#C0392B"/>
    <rect x="38" y="186" width="12" height="4" rx="1" fill="#E74C3C"/>
    <rect x="72" y="186" width="12" height="4" rx="1" fill="#E74C3C"/>
    <circle cx="55" cy="192" r="2.5" fill="#1A1A1A"/>
    <circle cx="65" cy="192" r="2.5" fill="#1A1A1A"/>
    <ellipse cx="245" cy="210" rx="22" ry="12" fill="#C0392B"/>
    <rect x="229" y="203" width="8" height="7" rx="1" fill="#C0392B"/>
    <rect x="255" y="203" width="8" height="7" rx="1" fill="#C0392B"/>
    <rect x="223" y="201" width="12" height="4" rx="1" fill="#E74C3C"/>
    <rect x="257" y="201" width="12" height="4" rx="1" fill="#E74C3C"/>
    <circle cx="240" cy="207" r="2.5" fill="#1A1A1A"/>
    <circle cx="250" cy="207" r="2.5" fill="#1A1A1A"/>
    <path d="M140 215 Q150 205 160 215 Q165 222 155 225 Q145 222 140 215 Z" fill="#F0EAD6"/>
    <ellipse cx="155" cy="245" rx="100" ry="8" fill="#0A2A0A"/>
    <ellipse cx="50" cy="247" rx="35" ry="5" fill="#0A2A0A"/>
    <ellipse cx="270" cy="246" rx="30" ry="4" fill="#0A2A0A"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#0A3A5A" stroke-width="1"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#083D6E"/>
    <rect x="0" y="0" width="310" height="40" rx="6" fill="#0D5A9E"/>
    <path d="M0 38 Q22 32 44 38 Q66 44 88 38 Q110 32 132 38 Q154 44 176 38 Q198 32 220 38 Q242 44 264 38 Q286 32 310 38" fill="none" stroke="#1E7ABE" stroke-width="1.5"/>
    <circle cx="100" cy="48" r="5" fill="none" stroke="rgba(200,230,255,0.5)" stroke-width="1.5"/>
    <circle cx="94" cy="30" r="2.5" fill="none" stroke="rgba(200,230,255,0.35)" stroke-width="1"/>
    <ellipse cx="155" cy="88" rx="20" ry="17" fill="#9B2335"/>
    <circle cx="147" cy="84" r="4.5" fill="white"/>
    <circle cx="147" cy="84" r="2.5" fill="#1A1A1A"/>
    <circle cx="163" cy="84" r="4.5" fill="white"/>
    <circle cx="163" cy="84" r="2.5" fill="#1A1A1A"/>
    <path d="M155 94 Q150 99 145 96" fill="none" stroke="#7A1A28" stroke-width="2" stroke-linecap="round"/>
    <path d="M115 95 Q95 115 85 140 Q80 160 90 175" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M120 108 Q105 130 100 158 Q98 175 108 188" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M140 115 Q138 140 142 165 Q144 180 140 195" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M195 95 Q215 115 225 140 Q230 160 220 175" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M190 108 Q205 130 210 158 Q212 175 202 188" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <path d="M155 115 Q155 140 155 165 Q155 180 155 200" fill="none" stroke="#9B2335" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="60" cy="195" rx="22" ry="12" fill="#E67E22"/>
    <rect x="44" y="188" width="8" height="7" rx="1" fill="#E67E22"/>
    <rect x="70" y="188" width="8" height="7" rx="1" fill="#E67E22"/>
    <rect x="38" y="186" width="12" height="4" rx="1" fill="#F0932B"/>
    <rect x="72" y="186" width="12" height="4" rx="1" fill="#F0932B"/>
    <circle cx="55" cy="192" r="2.5" fill="#1A1A1A"/>
    <circle cx="65" cy="192" r="2.5" fill="#1A1A1A"/>
    <ellipse cx="245" cy="210" rx="22" ry="12" fill="#C0392B"/>
    <rect x="229" y="203" width="8" height="7" rx="1" fill="#C0392B"/>
    <rect x="255" y="203" width="8" height="7" rx="1" fill="#C0392B"/>
    <rect x="223" y="201" width="12" height="4" rx="1" fill="#E74C3C"/>
    <rect x="257" y="201" width="12" height="4" rx="1" fill="#E74C3C"/>
    <circle cx="240" cy="207" r="2.5" fill="#1A1A1A"/>
    <circle cx="250" cy="207" r="2.5" fill="#1A1A1A"/>
    <ellipse cx="155" cy="245" rx="100" ry="8" fill="#0A2A0A"/>
    <ellipse cx="50" cy="247" rx="35" ry="5" fill="#0A2A0A"/>
    <ellipse cx="270" cy="246" rx="30" ry="4" fill="#0A2A0A"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#0A3A5A" stroke-width="1"/>
  `,
},

// ─────────────────────────────────────────────────────────────
// 6. JARDÍ TROPICAL
// ─────────────────────────────────────────────────────────────
{
  id: 6,
  titol: 'Jardí tropical',
  emoji: '🌿',
  dificultat: 'mitjà',
  diferencies: [
    { x:  55, y:  80, r: 25, desc: 'Papallona present/absent' },
    { x: 155, y:  50, r: 22, desc: 'Flors roses 3/2' },
    { x: 260, y: 100, r: 22, desc: 'Ocell vermell/groc' },
    { x:  90, y: 175, r: 22, desc: 'Fulla gran addicional' },
    { x: 220, y: 190, r: 22, desc: 'Llimona present/absent' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#C8E6C9"/>
    <rect x="0" y="0" width="310" height="100" rx="6" fill="#A5D6A7"/>
    <rect x="0" y="230" width="310" height="20" rx="0" fill="#558B2F"/>
    <rect x="0" y="100" width="310" height="130" rx="0" fill="#81C784"/>
    <rect x="130" y="60" width="12" height="170" rx="4" fill="#5D4037"/>
    <ellipse cx="136" cy="55" rx="22" ry="35" fill="#2E7D32"/>
    <ellipse cx="110" cy="70" rx="30" ry="15" fill="#388E3C"/>
    <ellipse cx="162" cy="70" rx="30" ry="15" fill="#388E3C"/>
    <ellipse cx="136" cy="40" rx="18" ry="22" fill="#43A047"/>
    <rect x="30" y="100" width="9" height="130" rx="3" fill="#5D4037"/>
    <ellipse cx="34" cy="95" rx="18" ry="28" fill="#2E7D32"/>
    <ellipse cx="14" cy="108" rx="24" ry="12" fill="#388E3C"/>
    <ellipse cx="54" cy="108" rx="24" ry="12" fill="#388E3C"/>
    <rect x="255" y="120" width="8" height="110" rx="3" fill="#5D4037"/>
    <ellipse cx="259" cy="115" rx="16" ry="25" fill="#2E7D32"/>
    <ellipse cx="240" cy="128" rx="22" ry="11" fill="#388E3C"/>
    <ellipse cx="278" cy="128" rx="22" ry="11" fill="#388E3C"/>
    <circle cx="136" cy="30" r="6" fill="#FF8F00"/>
    <circle cx="155" cy="48" r="5" fill="#FFB300"/>
    <circle cx="117" cy="48" r="5" fill="#FFB300"/>
    <circle cx="148" cy="25" r="4" fill="#FFA000"/>
    <ellipse cx="180" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="192" cy="44" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="186" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <circle cx="186" cy="47" r="3" fill="#F8BBD9"/>
    <ellipse cx="210" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="222" cy="44" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="216" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <circle cx="216" cy="47" r="3" fill="#F8BBD9"/>
    <ellipse cx="240" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="252" cy="44" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="246" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <circle cx="246" cy="47" r="3" fill="#F8BBD9"/>
    <ellipse cx="50" cy="75" rx="10" ry="6" fill="#E91E63" opacity="0.85"/>
    <ellipse cx="50" cy="75" rx="10" ry="6" fill="#E91E63" opacity="0.85" transform="rotate(90,50,75)"/>
    <circle cx="50" cy="75" r="3" fill="#FF6F00"/>
    <ellipse cx="260" cy="100" rx="10" ry="6" fill="#E53935"/>
    <ellipse cx="260" cy="100" rx="4" ry="8" fill="#E53935"/>
    <circle cx="260" cy="95" r="4" fill="#1A1A1A"/>
    <path d="M250 100 Q260 92 270 100" fill="none" stroke="#E53935" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="85" cy="165" rx="35" ry="15" fill="#1B5E20" transform="rotate(-30,85,165)"/>
    <ellipse cx="95" cy="185" rx="30" ry="12" fill="#2E7D32" transform="rotate(20,95,185)"/>
    <ellipse cx="220" cy="185" rx="12" ry="12" fill="#F9A825"/>
    <ellipse cx="232" cy="192" rx="10" ry="10" fill="#FFD54F"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#558B2F" stroke-width="1"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#C8E6C9"/>
    <rect x="0" y="0" width="310" height="100" rx="6" fill="#A5D6A7"/>
    <rect x="0" y="230" width="310" height="20" rx="0" fill="#558B2F"/>
    <rect x="0" y="100" width="310" height="130" rx="0" fill="#81C784"/>
    <rect x="130" y="60" width="12" height="170" rx="4" fill="#5D4037"/>
    <ellipse cx="136" cy="55" rx="22" ry="35" fill="#2E7D32"/>
    <ellipse cx="110" cy="70" rx="30" ry="15" fill="#388E3C"/>
    <ellipse cx="162" cy="70" rx="30" ry="15" fill="#388E3C"/>
    <ellipse cx="136" cy="40" rx="18" ry="22" fill="#43A047"/>
    <rect x="30" y="100" width="9" height="130" rx="3" fill="#5D4037"/>
    <ellipse cx="34" cy="95" rx="18" ry="28" fill="#2E7D32"/>
    <ellipse cx="14" cy="108" rx="24" ry="12" fill="#388E3C"/>
    <ellipse cx="54" cy="108" rx="24" ry="12" fill="#388E3C"/>
    <rect x="255" y="120" width="8" height="110" rx="3" fill="#5D4037"/>
    <ellipse cx="259" cy="115" rx="16" ry="25" fill="#2E7D32"/>
    <ellipse cx="240" cy="128" rx="22" ry="11" fill="#388E3C"/>
    <ellipse cx="278" cy="128" rx="22" ry="11" fill="#388E3C"/>
    <circle cx="136" cy="30" r="6" fill="#FF8F00"/>
    <circle cx="155" cy="48" r="5" fill="#FFB300"/>
    <circle cx="117" cy="48" r="5" fill="#FFB300"/>
    <circle cx="148" cy="25" r="4" fill="#FFA000"/>
    <ellipse cx="180" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="192" cy="44" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="186" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <circle cx="186" cy="47" r="3" fill="#F8BBD9"/>
    <ellipse cx="240" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="252" cy="44" rx="8" ry="5" fill="#EC407A"/>
    <ellipse cx="246" cy="50" rx="8" ry="5" fill="#EC407A"/>
    <circle cx="246" cy="47" r="3" fill="#F8BBD9"/>
    <ellipse cx="260" cy="100" rx="10" ry="6" fill="#F9A825"/>
    <ellipse cx="260" cy="100" rx="4" ry="8" fill="#FFD54F"/>
    <circle cx="260" cy="95" r="4" fill="#1A1A1A"/>
    <path d="M250 100 Q260 92 270 100" fill="none" stroke="#F9A825" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="85" cy="165" rx="35" ry="15" fill="#1B5E20" transform="rotate(-30,85,165)"/>
    <ellipse cx="95" cy="185" rx="30" ry="12" fill="#2E7D32" transform="rotate(20,95,185)"/>
    <ellipse cx="65" cy="178" rx="28" ry="12" fill="#33691E" transform="rotate(-15,65,178)"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#558B2F" stroke-width="1"/>
  `,
},

// ─────────────────────────────────────────────────────────────
// 7. CASCADA I LLACUNA
// ─────────────────────────────────────────────────────────────
{
  id: 7,
  titol: 'Cascada i llacuna',
  emoji: '💧',
  dificultat: 'difícil',
  diferencies: [
    { x:  70, y:  40, r: 22, desc: 'Arc de Sant Martí present/absent' },
    { x: 155, y:  80, r: 22, desc: 'Cascada ampla/estreta' },
    { x: 255, y: 130, r: 22, desc: 'Roca gran/absent' },
    { x: 100, y: 195, r: 22, desc: 'Granota present/absent' },
    { x: 210, y: 210, r: 22, desc: 'Nenúfar present/absent' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#B8D4E8"/>
    <rect x="0" y="0" width="310" height="120" rx="6" fill="#C5DDA8"/>
    <rect x="50" y="0" width="80" height="120" rx="0" fill="#A8C87A"/>
    <rect x="180" y="0" width="80" height="120" rx="0" fill="#A8C87A"/>
    <rect x="115" y="0" width="80" height="80" rx="0" fill="#8DB85A"/>
    <path d="M115 0 L115 80 Q135 90 155 80 Q175 90 195 80 L195 0" fill="#9FC868"/>
    <rect x="135" y="0" width="40" height="80" rx="0" fill="#7AA848"/>
    <path d="M145 0 L145 80 Q155 88 165 80 L165 0" fill="#AADA58" opacity="0.8"/>
    <rect x="0" y="160" width="310" height="90" rx="0" fill="#5B9EC9"/>
    <path d="M0 168 Q22 162 44 168 Q66 174 88 168 Q110 162 132 168 Q154 174 176 168 Q198 162 220 168 Q242 174 264 168 Q286 162 310 168" fill="none" stroke="#7BBDE0" stroke-width="1.5"/>
    <path d="M0 182 Q25 176 50 182 Q75 188 100 182 Q125 176 150 182 Q175 188 200 182 Q225 176 250 182 Q275 188 310 182" fill="none" stroke="#7BBDE0" stroke-width="1.2"/>
    <rect x="120" y="80" width="70" height="80" rx="0" fill="#ADE0F8"/>
    <path d="M120 80 Q130 95 140 85 Q150 75 160 85 Q170 95 180 85 Q190 75 190 80" fill="none" stroke="white" stroke-width="2"/>
    <path d="M125 100 Q135 110 145 105 Q155 100 165 105 Q175 110 185 105" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
    <ellipse cx="155" cy="160" rx="50" ry="15" fill="#7BBDE0" opacity="0.6"/>
    <path d="M60 42 Q70 30 80 42" fill="none" stroke="#FF6B6B" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
    <path d="M62 46 Q72 34 82 46" fill="none" stroke="#FFA500" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    <path d="M64 50 Q74 38 84 50" fill="none" stroke="#FFD700" stroke-width="1.8" stroke-linecap="round" opacity="0.6"/>
    <path d="M66 54 Q76 42 86 54" fill="none" stroke="#32CD32" stroke-width="1.6" stroke-linecap="round" opacity="0.5"/>
    <path d="M68 58 Q78 46 88 58" fill="none" stroke="#4169E1" stroke-width="1.4" stroke-linecap="round" opacity="0.5"/>
    <ellipse cx="255" cy="140" rx="22" ry="16" fill="#7A6A58"/>
    <ellipse cx="265" cy="148" rx="16" ry="11" fill="#6A5A48"/>
    <ellipse cx="100" cy="193" rx="8" ry="5" fill="#4CAF50"/>
    <circle cx="98" cy="190" r="2.5" fill="#1A1A1A"/>
    <circle cx="103" cy="190" r="2.5" fill="#1A1A1A"/>
    <path d="M92 196 Q100 200 108 196" fill="none" stroke="#2E7D32" stroke-width="1.5"/>
    <ellipse cx="210" cy="210" rx="14" ry="8" fill="#81C784"/>
    <ellipse cx="210" cy="208" rx="10" ry="6" fill="#A5D6A7"/>
    <circle cx="210" cy="208" r="3" fill="#E91E63"/>
    <ellipse cx="40" cy="110" rx="18" ry="10" fill="#4CAF50"/>
    <ellipse cx="28" cy="105" rx="14" ry="7" fill="#388E3C"/>
    <ellipse cx="280" cy="100" rx="20" ry="11" fill="#4CAF50"/>
    <ellipse cx="292" cy="96" rx="14" ry="8" fill="#388E3C"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#4A9AB8" stroke-width="1"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#B8D4E8"/>
    <rect x="0" y="0" width="310" height="120" rx="6" fill="#C5DDA8"/>
    <rect x="50" y="0" width="80" height="120" rx="0" fill="#A8C87A"/>
    <rect x="180" y="0" width="80" height="120" rx="0" fill="#A8C87A"/>
    <rect x="115" y="0" width="80" height="80" rx="0" fill="#8DB85A"/>
    <path d="M115 0 L115 80 Q135 90 155 80 Q175 90 195 80 L195 0" fill="#9FC868"/>
    <rect x="145" y="0" width="20" height="80" rx="0" fill="#7AA848"/>
    <path d="M150 0 L150 80 Q155 86 160 80 L160 0" fill="#AADA58" opacity="0.8"/>
    <rect x="0" y="160" width="310" height="90" rx="0" fill="#5B9EC9"/>
    <path d="M0 168 Q22 162 44 168 Q66 174 88 168 Q110 162 132 168 Q154 174 176 168 Q198 162 220 168 Q242 174 264 168 Q286 162 310 168" fill="none" stroke="#7BBDE0" stroke-width="1.5"/>
    <path d="M0 182 Q25 176 50 182 Q75 188 100 182 Q125 176 150 182 Q175 188 200 182 Q225 176 250 182 Q275 188 310 182" fill="none" stroke="#7BBDE0" stroke-width="1.2"/>
    <rect x="145" y="80" width="20" height="80" rx="0" fill="#ADE0F8"/>
    <path d="M145 80 Q150 90 155 84 Q160 78 165 84 Q165 80 165 80" fill="none" stroke="white" stroke-width="2"/>
    <ellipse cx="155" cy="160" rx="50" ry="15" fill="#7BBDE0" opacity="0.6"/>
    <ellipse cx="40" cy="110" rx="18" ry="10" fill="#4CAF50"/>
    <ellipse cx="28" cy="105" rx="14" ry="7" fill="#388E3C"/>
    <ellipse cx="280" cy="100" rx="20" ry="11" fill="#4CAF50"/>
    <ellipse cx="292" cy="96" rx="14" ry="8" fill="#388E3C"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#4A9AB8" stroke-width="1"/>
  `,
},

// ─────────────────────────────────────────────────────────────
// 8. TIBURÃO I ESCOLA DE PEIXOS
// ─────────────────────────────────────────────────────────────
{
  id: 8,
  titol: 'Tauró i peixos',
  emoji: '🦈',
  dificultat: 'difícil',
  diferencies: [
    { x: 155, y: 120, r: 30, desc: 'Tauró gran/petit' },
    { x:  65, y:  85, r: 22, desc: 'Grup peixos 5/4' },
    { x: 255, y:  60, r: 22, desc: 'Peix lluna present/absent' },
    { x: 100, y: 200, r: 22, desc: 'Medusa present/absent' },
    { x: 230, y: 185, r: 22, desc: 'Tresors/caixa present/absent' },
  ],
  svgOriginal: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#0C3F6E"/>
    <rect x="0" y="0" width="310" height="35" rx="6" fill="#1264A8"/>
    <path d="M0 33 Q22 27 44 33 Q66 39 88 33 Q110 27 132 33 Q154 39 176 33 Q198 27 220 33 Q242 39 264 33 Q286 27 310 33" fill="none" stroke="#2A8AC8" stroke-width="1.5"/>
    <ellipse cx="155" cy="115" rx="60" ry="22" fill="#A0A8B0"/>
    <ellipse cx="85" cy="112" rx="14" ry="10" fill="#A0A8B0"/>
    <polygon points="215,112 240,105 240,122" fill="#90989E"/>
    <polygon points="155,93 145,80 165,80" fill="#90989E"/>
    <polygon points="100,108 88,98 88,118" fill="#90989E"/>
    <ellipse cx="170" cy="113" rx="10" ry="8" fill="#B8BFC8"/>
    <circle cx="122" cy="112" r="4" fill="#1A1A1A"/>
    <path d="M130 118 Q140 124 150 118" fill="none" stroke="#808890" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="60" cy="82" rx="10" ry="5" fill="#F4A261"/>
    <ellipse cx="53" cy="80" rx="3" ry="2.5" fill="#F4A261"/>
    <ellipse cx="67" cy="84" rx="3" ry="2" fill="#F4A261"/>
    <polygon points="70,82 60,79 60,85" fill="#E76F51"/>
    <circle cx="63" cy="80" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="78" cy="72" rx="10" ry="5" fill="#F4A261"/>
    <ellipse cx="71" cy="70" rx="3" ry="2.5" fill="#F4A261"/>
    <ellipse cx="85" cy="74" rx="3" ry="2" fill="#F4A261"/>
    <polygon points="88,72 78,69 78,75" fill="#E76F51"/>
    <circle cx="81" cy="70" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="50" cy="96" rx="10" ry="5" fill="#F4A261"/>
    <ellipse cx="43" cy="94" rx="3" ry="2.5" fill="#F4A261"/>
    <ellipse cx="57" cy="98" rx="3" ry="2" fill="#F4A261"/>
    <polygon points="60,96 50,93 50,99" fill="#E76F51"/>
    <circle cx="53" cy="94" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="72" cy="98" rx="10" ry="5" fill="#2A9D8F"/>
    <ellipse cx="65" cy="96" rx="3" ry="2.5" fill="#2A9D8F"/>
    <ellipse cx="79" cy="100" rx="3" ry="2" fill="#2A9D8F"/>
    <polygon points="82,98 72,95 72,101" fill="#21867A"/>
    <circle cx="75" cy="96" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="85" cy="90" rx="10" ry="5" fill="#2A9D8F"/>
    <ellipse cx="78" cy="88" rx="3" ry="2.5" fill="#2A9D8F"/>
    <ellipse cx="92" cy="92" rx="3" ry="2" fill="#2A9D8F"/>
    <polygon points="95,90 85,87 85,93" fill="#21867A"/>
    <circle cx="88" cy="88" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="255" cy="58" rx="18" ry="22" fill="#E8E0D0"/>
    <ellipse cx="248" cy="52" rx="5" ry="4" fill="#D0C8B8"/>
    <ellipse cx="262" cy="52" rx="5" ry="4" fill="#D0C8B8"/>
    <circle cx="255" cy="56" r="3" fill="#1A1A1A"/>
    <ellipse cx="100" cy="196" rx="15" ry="20" fill="rgba(200,220,255,0.4)" stroke="rgba(150,180,220,0.6)" stroke-width="1"/>
    <path d="M88 210 Q94 218 100 215 Q106 218 112 210" fill="none" stroke="rgba(150,180,220,0.6)" stroke-width="1.2"/>
    <path d="M92 214 Q96 220 100 218 Q104 220 108 214" fill="none" stroke="rgba(150,180,220,0.5)" stroke-width="1"/>
    <rect x="218" y="210" width="24" height="16" rx="2" fill="#8B6914"/>
    <rect x="218" y="210" width="24" height="5" rx="2" fill="#A07820"/>
    <rect x="228" y="207" width="4" height="6" rx="1" fill="#C09830"/>
    <ellipse cx="230" cy="212" rx="4" ry="3" fill="#FFD700"/>
    <ellipse cx="155" cy="245" rx="120" ry="6" fill="#061E38"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#0A3A5A" stroke-width="1"/>
  `,
  svgModificat: `
    <rect x="0" y="0" width="310" height="250" rx="6" fill="#0C3F6E"/>
    <rect x="0" y="0" width="310" height="35" rx="6" fill="#1264A8"/>
    <path d="M0 33 Q22 27 44 33 Q66 39 88 33 Q110 27 132 33 Q154 39 176 33 Q198 27 220 33 Q242 39 264 33 Q286 27 310 33" fill="none" stroke="#2A8AC8" stroke-width="1.5"/>
    <ellipse cx="155" cy="120" rx="42" ry="15" fill="#A0A8B0"/>
    <ellipse cx="100" cy="118" rx="10" ry="7" fill="#A0A8B0"/>
    <polygon points="197,118 215,113 215,124" fill="#90989E"/>
    <polygon points="155,105 148,96 162,96" fill="#90989E"/>
    <polygon points="112,115 102,107 102,123" fill="#90989E"/>
    <ellipse cx="167" cy="119" rx="7" ry="5.5" fill="#B8BFC8"/>
    <circle cx="128" cy="118" r="3" fill="#1A1A1A"/>
    <path d="M134 123 Q142 128 150 123" fill="none" stroke="#808890" stroke-width="1.5" stroke-linecap="round"/>
    <ellipse cx="60" cy="82" rx="10" ry="5" fill="#F4A261"/>
    <ellipse cx="53" cy="80" rx="3" ry="2.5" fill="#F4A261"/>
    <ellipse cx="67" cy="84" rx="3" ry="2" fill="#F4A261"/>
    <polygon points="70,82 60,79 60,85" fill="#E76F51"/>
    <circle cx="63" cy="80" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="78" cy="72" rx="10" ry="5" fill="#F4A261"/>
    <ellipse cx="71" cy="70" rx="3" ry="2.5" fill="#F4A261"/>
    <ellipse cx="85" cy="74" rx="3" ry="2" fill="#F4A261"/>
    <polygon points="88,72 78,69 78,75" fill="#E76F51"/>
    <circle cx="81" cy="70" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="50" cy="96" rx="10" ry="5" fill="#F4A261"/>
    <ellipse cx="43" cy="94" rx="3" ry="2.5" fill="#F4A261"/>
    <ellipse cx="57" cy="98" rx="3" ry="2" fill="#F4A261"/>
    <polygon points="60,96 50,93 50,99" fill="#E76F51"/>
    <circle cx="53" cy="94" r="1.8" fill="#1A1A1A"/>
    <ellipse cx="72" cy="98" rx="10" ry="5" fill="#2A9D8F"/>
    <ellipse cx="65" cy="96" rx="3" ry="2.5" fill="#2A9D8F"/>
    <ellipse cx="79" cy="100" rx="3" ry="2" fill="#2A9D8F"/>
    <polygon points="82,98 72,95 72,101" fill="#21867A"/>
    <circle cx="75" cy="96" r="1.8" fill="#1A1A1A"/>
    <rect x="218" y="210" width="24" height="16" rx="2" fill="#8B6914"/>
    <rect x="218" y="210" width="24" height="5" rx="2" fill="#A07820"/>
    <rect x="228" y="207" width="4" height="6" rx="1" fill="#C09830"/>
    <ellipse cx="230" cy="212" rx="4" ry="3" fill="#FFD700"/>
    <ellipse cx="155" cy="245" rx="120" ry="6" fill="#061E38"/>
    <rect x="0" y="0" width="310" height="250" rx="6" fill="none" stroke="#0A3A5A" stroke-width="1"/>
  `,
},

]; // fi DIFER_ESCENES
