const fs = require('fs');
let lines = fs.readFileSync('frontend/src/App.js', 'utf8').split('\n');

// Eliminar líneas exactamente duplicadas consecutivas (o no) para estos estados
const seen = {};
lines = lines.filter(l => {
  const trimmed = l.trim();
  // Solo deduplicar declaraciones de estado específicas
  if (
    trimmed.startsWith('const [usuariosSistema') ||
    trimmed.startsWith('const [loadingUsuarios') ||
    trimmed.startsWith('const [isRegistering')
  ) {
    if (seen[trimmed]) return false;
    seen[trimmed] = true;
  }
  return true;
});

// También arreglar el problema del admin que abre logística:
// El manejarLogin redirige según vista ('empleado'/'admin') pero si está en 'admin'
// y el rol del backend es 'empleado', va a panel-empleado igualmente.
// Necesitamos forzar que si vista==='admin', solo acepte admin/master
const c = lines.join('\n');

let b=0, p=0;
for(const ch of c){ if(ch==='{')b++; else if(ch==='}')b--; else if(ch==='(')p++; else if(ch===')')p--; }

fs.writeFileSync('frontend/src/App.js', c);
console.log('Llaves:', b, 'Parens:', p, 'Líneas:', c.split('\n').length);

// Verificar
['const [usuariosSistema','const [loadingUsuarios','const [isRegistering'].forEach(k => {
  const count = c.split(k).length - 1;
  console.log(count <= 1 ? `✅ ${k}: ${count}` : `⚠️ DUPE ${k}: ${count}`);
});
