const fs = require('fs');
let c = fs.readFileSync('frontend/src/App.js', 'utf8');
const lines = c.split('\n');

// Agregar los 3 estados faltantes de vuelta (los necesita el JSX)
// Los insertamos antes del comentario de Panel empleado
const estadosFaltantes = `
  // Estados para firma digital y traslados (funciones de Gemini — mantener para el JSX)
  const [trasladosInterSedes, setTrasladosInterSedes] = useState([]);
  const [ordenParaFirmar, setOrdenParaFirmar] = useState(null);
  const [firmaDibujada, setFirmaDibujada] = useState(false);
`;

c = c.replace('  // ── Panel empleado ──', estadosFaltantes + '  // ── Panel empleado ──');

fs.writeFileSync('frontend/src/App.js', c);

let b=0, p=0;
for(const ch of c){ if(ch==='{')b++; else if(ch==='}')b--; else if(ch==='(')p++; else if(ch===')')p--; }
console.log('Llaves:', b, 'Parens:', p, 'Líneas:', c.split('\n').length);

const checks = ['firmaDibujada','trasladosInterSedes','ordenParaFirmar'];
checks.forEach(k => {
  const count = (c.match(new RegExp(k,'g'))||[]).length;
  console.log(`✅ ${k}: ${count} ocurrencias`);
});
console.log('App listo para compilar');
