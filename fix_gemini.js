const fs = require('fs');
let c = fs.readFileSync('frontend/src/App.js', 'utf8');

// ── FIX 1: Eliminar estados inútiles de Gemini ──
c = c.replace(/\s*const \[trasladosInterSedes, setTrasladosInterSedes\] = useState\(\[\]\);\s*\n/g, '\n');
c = c.replace(/\s*const \[ordenParaFirmar, setOrdenParaFirmar\] = useState\(null\);\s*\n/g, '\n');
c = c.replace(/\s*const \[firmaDibujada, setFirmaDibujada\] = useState\(false\);\s*\n/g, '\n');

// ── FIX 2: Eliminar el useEffect de notificaciones que llama fetchNotificaciones sin definir ──
c = c.replace(/\s*\/\/ Cargar notificaciones cuando hay usuario admin \(NUEVO\)\s*\n\s*useEffect\(\(\) => \{\s*\n\s*if \(usuarioActual\) \{\s*\n\s*fetchNotificaciones\(\);\s*\n\s*const interval = setInterval\(fetchNotificaciones, 30000\)[^}]*\}\s*\n\s*\}\s*\n\s*\}, \[usuarioActual, fetchNotificaciones\]\);\s*\n/g, '\n');

// ── FIX 3: Restaurar la sesión automática (Gemini la había comentado) ──
const sessionRestoreOld = `  // Restaurar sesión desde localStorage
  useEffect(() => {
    // Se comenta la restauración automática del usuario al recargar para forzar
    // que el sistema siempre pida credenciales al navegar a Logística o Administración.
    // const token = localStorage.getItem('sigid_token');
    // const user = localStorage.getItem('sigid_user');
    // if (token && user) {
    //   try { setUsuarioActual(JSON.parse(user)); } catch { localStorage.clear(); }
    // }
    const carritoGuardado = localStorage.getItem('sigid_cart');
    if (carritoGuardado) { try { setCarrito(JSON.parse(carritoGuardado)); } catch {} }`;

const sessionRestoreNew = `  // Restaurar sesión desde localStorage
  useEffect(() => {
    const token = localStorage.getItem('sigid_token');
    const user = localStorage.getItem('sigid_user');
    if (token && user) {
      try { setUsuarioActual(JSON.parse(user)); } catch { localStorage.clear(); }
    }
    const carritoGuardado = localStorage.getItem('sigid_cart');
    if (carritoGuardado) { try { setCarrito(JSON.parse(carritoGuardado)); } catch {} }`;

if (c.includes(sessionRestoreOld)) {
  c = c.replace(sessionRestoreOld, sessionRestoreNew);
  console.log('✅ Restauración de sesión reparada');
} else {
  console.log('⚠️  Bloque de restauración no encontrado exacto - buscando alternativa...');
}

// ── FIX 4: Asegurar que fetchNotificaciones esté definida como noop antes de los efectos ──
if (!c.includes('const fetchNotificaciones = useCallback(')) {
  // Insertar después de fetchOrdenes
  c = c.replace(
    '  }, [usuarioActual]);\n\n  // ─── EFECTOS',
    '  }, [usuarioActual]);\n\n  // Notificaciones: stub (sin servicio externo)\n  const fetchNotificaciones = useCallback(() => {}, []);\n\n  // ─── EFECTOS'
  );
  console.log('✅ fetchNotificaciones definida');
}

// ── FIX 5: Eliminar usos de firmaDibujada en el JSX ──
c = c.replace(/setFirmaDibujada\([^)]*\)/g, '() => {}');
c = c.replace(/firmaDibujada\s*&&[^}]+}/g, '');
c = c.replace(/\{firmaDibujada[^}]*\}/g, '');

fs.writeFileSync('frontend/src/App.js', c);

let b=0, p=0;
for(const ch of c){ if(ch==='{')b++; else if(ch==='}')b--; else if(ch==='(')p++; else if(ch===')')p--; }
console.log('Llaves:', b, 'Parens:', p, 'Líneas:', c.split('\n').length);

// Verificar problemas restantes
const checks = ['firmaDibujada','trasladosInterSedes','ordenParaFirmar','notificacionService'];
checks.forEach(k => {
  const count = (c.match(new RegExp(k,'g'))||[]).length;
  console.log(count > 0 ? `⚠️  ${k}: ${count} ocurrencias` : `✅ ${k}: limpio`);
});
