const fs = require('fs');
let lines = fs.readFileSync('frontend/src/App.js', 'utf8').split('\n');

// 1. Eliminar línea duplicada de contadorNoLeidas (mantener solo la primera)
let contadorCount = 0;
lines = lines.filter(l => {
  if (l.includes('const [contadorNoLeidas, setContadorNoLeidas]')) {
    contadorCount++;
    return contadorCount === 1; // mantener solo la primera
  }
  return true;
});

// 2. Eliminar líneas duplicadas de Sesión con contadorNoLeidas en el JSX
let sesionCount = 0;
lines = lines.filter(l => {
  if (l.includes('Sesión:') && l.includes('contadorNoLeidas')) {
    sesionCount++;
    return sesionCount === 1;
  }
  return true;
});

// 3. Eliminar líneas duplicadas de ⚡ notificaciones
let notifCount = 0;
lines = lines.filter(l => {
  if (l.includes('⚡') && l.includes('contadorNoLeidas')) {
    notifCount++;
    return notifCount === 1;
  }
  return true;
});

// 4. Eliminar línea duplicada "CLIC AQUÍ PARA FIRMAR"
let clicCount = 0;
lines = lines.filter(l => {
  if (l.includes('CLIC AQUÍ PARA FIRMAR')) {
    clicCount++;
    return clicCount === 1;
  }
  return true;
});

const c = lines.join('\n');
fs.writeFileSync('frontend/src/App.js', c);

let b=0, p=0;
for(const ch of c){ if(ch==='{')b++; else if(ch==='}')b--; else if(ch==='(')p++; else if(ch===')')p--; }
console.log('Llaves:', b, 'Parens:', p, 'Líneas:', c.split('\n').length);
console.log('Fix completado. Duplicados eliminados:', contadorCount-1, 'contador,', sesionCount-1, 'sesion,', notifCount-1, 'notif,', clicCount-1, 'clic');
