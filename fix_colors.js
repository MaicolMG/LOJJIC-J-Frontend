const fs = require('fs');
let c = fs.readFileSync('frontend/src/App.js', 'utf8');

const rep = (from, to) => { c = c.split(from).join(to); };

rep("darkMode ? '#fff' : '#111'",           "'var(--text-h)'");
rep("darkMode ? '#ffffff' : '#111'",        "'var(--text-h)'");
rep("darkMode ? '#fff' : '#0a0a0a'",        "'var(--text-h)'");
rep("darkMode ? '#cbd5e1' : '#4b5563'",     "'var(--text-body)'");
rep("darkMode ? '#94a3b8' : '#4b5563'",     "'var(--text-body)'");
rep("darkMode ? '#94a3b8' : '#6b7280'",     "'var(--text-muted)'");
rep("darkMode ? '#1e293b' : '#fff'",        "'var(--bg-card)'");
rep("darkMode ? '#1e293b' : '#ffffff'",     "'var(--bg-card)'");
rep("darkMode ? 'rgba(255,255,255,0.05)' : '#fff'",     "'var(--bg-card)'");
rep("darkMode ? 'rgba(255,255,255,0.02)' : '#ffffff'",  "'var(--bg-card)'");
rep("darkMode ? 'rgba(255,255,255,0.02)' : '#f1f5f9'",  "'var(--bg-section-1)'");
rep("darkMode ? '#0a0a0a' : '#ffffff'",     "'var(--bg-section-2)'");
rep("darkMode ? '#0a0a0a' : '#f1f5f9'",     "'var(--bg-section-1)'");
rep("darkMode ? '#111' : '#f1f5f9'",        "'var(--bg-section-1)'");
rep("darkMode ? '#111' : '#f9fafb'",        "'var(--bg-section-1)'");

fs.writeFileSync('frontend/src/App.js', c);

let b=0, p=0;
for(const ch of c){ if(ch==='{')b++; else if(ch==='}')b--; else if(ch==='(')p++; else if(ch===')')p--; }
console.log('Llaves:', b, 'Paréntesis:', p);
console.log('Líneas:', c.split('\n').length);
const rem = (c.match(/darkMode \? '#/g)||[]).length;
console.log('darkMode color refs restantes:', rem);
