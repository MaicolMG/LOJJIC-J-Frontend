const fs = require('fs');
let c = fs.readFileSync('frontend/src/App.js', 'utf8');

// 1. Eliminar estados duplicados y de notificaciones
c = c.replace(/\s*\/\/ ── Notificaciones \(NUEVO\) ──\s*\n\s*const \[notificaciones, setNotificaciones\] = useState\(\[\]\);\s*\n\s*const \[notificaciones, setNotificaciones\] = useState\(\[\]\);\s*\n\s*const \[contadorNoLeidas, setContadorNoLeidas\] = useState\(0\);\s*\n\s*const \[contadorNoLeidas, setContadorNoLeidas\] = useState\(0\);/g,
  '\n  // Estados de notificaciones\n  const [notificaciones, setNotificaciones] = useState([]);\n  const [contadorNoLeidas, setContadorNoLeidas] = useState(0);');

// 2. Eliminar el useEffect de polling de notificaciones (que llama fetchNotificaciones que no existe)
c = c.replace(/\s*\/\/ Cargar notificaciones cuando hay usuario admin \(NUEVO\)\s*\n.*\n\s*useEffect\(\(\) => \{[\s\S]*?fetchNotificaciones\(\);\s*\n\s*const interval = setInterval\(fetchNotificaciones, 30000\)[^}]*\}[\s\S]*?\}, \[usuarioActual, fetchNotificaciones\]\);/g, '');

// 3. Definir fetchNotificaciones como función vacía para evitar errores
const fetchNotDef = `
  // Notificaciones: función de carga (sin servicio externo por ahora)
  const fetchNotificaciones = useCallback(() => {}, []);
`;
// Insertarla antes de los efectos
c = c.replace('  // ─── EFECTOS', fetchNotDef + '\n  // ─── EFECTOS');

fs.writeFileSync('frontend/src/App.js', c);

let b=0, p=0;
for(const ch of c){ if(ch==='{')b++; else if(ch==='}')b--; else if(ch==='(')p++; else if(ch===')')p--; }
console.log('Llaves:', b, 'Parens:', p, 'Lineas:', c.split('\n').length);
const remaining = (c.match(/notificacionService/g)||[]).length;
console.log('notificacionService restantes:', remaining);
const dupes = (c.match(/setNotificaciones/g)||[]).length;
console.log('setNotificaciones ocurrencias:', dupes);
