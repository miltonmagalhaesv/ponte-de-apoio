import {validatePlan, describe} from './plan.mjs';
const field = id => document.getElementById(id);
const section = document.querySelector('section');
const key = 'ponte.plano.v1';
function show(plan) {
  for (const name of ['need','who','action']) field(name).value = plan[name];
  field('confirmed').checked = plan.confirmed;
  field('summary').textContent = describe(plan);
  section.hidden = false;
}
try {
  const stored = localStorage.getItem(key);
  if (stored) show(validatePlan(JSON.parse(stored)));
} catch { field('status').textContent = 'Não foi possível recuperar o plano.'; }
document.querySelector('form').onsubmit = event => {
  event.preventDefault();
  try {
    const plan = validatePlan({need:field('need').value, who:field('who').value, action:field('action').value, confirmed:field('confirmed').checked});
    localStorage.setItem(key, JSON.stringify(plan));
    show(plan);
    field('status').textContent = 'Plano guardado neste navegador.';
  } catch (error) { field('status').textContent = error.message; }
};
field('erase').onclick = () => {
  localStorage.removeItem(key);
  window.speechSynthesis?.cancel();
  document.querySelector('form').reset();
  field('summary').textContent = '';
  section.hidden = true;
  field('status').textContent = 'Plano apagado.';
};
field('hear').onclick = () => {
  if (!window.speechSynthesis) { field('status').textContent = 'Leitura em voz indisponível neste aparelho.'; return; }
  const utterance = new SpeechSynthesisUtterance(field('summary').textContent);
  utterance.lang = 'pt-BR';
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
};
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js')
  .then(() => navigator.serviceWorker.ready)
  .then(() => field('offline').textContent = 'Guia disponível offline neste navegador.')
  .catch(() => field('offline').textContent = 'O guia ainda precisa de conexão para abrir.');

field('example').onclick = () => {
  show({need:'Dona Lúcia precisa de companhia para se deslocar.', who:'Ana, filha que trabalha em outro bairro', action:'Telefonar para Lúcia e combinar apoio com a vizinha Rosa.', confirmed:false});
  field('status').textContent = 'Exemplo fictício. Revise e toque em Guardar meu plano para salvar.';
};

function drawDemoRoute(ctx, points, project) {
  ctx.save();
  ctx.strokeStyle = '#07579a';
  ctx.lineWidth = 5;
  ctx.beginPath();
  points.forEach((point, index) => {
    const [x, y] = project(point);
    if (index) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  });
  ctx.stroke();
  for (const [point, label] of [[points[0], 'A'], [points[points.length - 1], 'B']]) {
    const [x, y] = project(point);
    ctx.fillStyle = '#073652';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(label, x, y + 4);
  }
  ctx.restore();
}

async function renderMap() {
  try {
    const response = await fetch('./assets/map.json');
    if (!response.ok) throw Error('Mapa indisponível');
    const data = await response.json();
    const canvas = field('map');
    const ctx = canvas.getContext('2d');
    const [west, south, east, north] = data.bounds;
    const project = ([lon,lat]) => [25+(lon-west)/(east-west)*850, 25+(north-lat)/(north-south)*600];
    ctx.fillStyle = '#e9ede4';
    ctx.fillRect(0,0,900,650);
    for (const way of data.ways) {
      ctx.beginPath();
      way.points.forEach((point,index) => {
        const [x,y] = project(point);
        if (index) ctx.lineTo(x,y); else ctx.moveTo(x,y);
      });
      if (way.kind !== 'street') {
        ctx.fillStyle = way.kind === 'water' ? '#9acac7' : '#d2d8ca';
        ctx.fill();
      } else {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 9;
        ctx.stroke();
      }
    }
    ctx.fillStyle = '#12382e';
    ctx.font = '16px system-ui';
    const named = new Set();
    for (const way of data.ways.filter(way => way.kind === 'street' && way.name)) {
      if (named.has(way.name) || way.points.length < 2) continue;
      named.add(way.name);
      const [x,y] = project(way.points[Math.floor(way.points.length/2)]);
      if (x>0 && x<720 && y>20 && y<630) ctx.fillText(way.name,x,y);
    }
    field('route').disabled = false;
    field('route').onclick = () => {
      drawDemoRoute(ctx, data.demoRoute, project);
      field('map-status').textContent = 'A: casa de exemplo. B: casa da irmã. Percurso ilustrativo, sem verificação das condições de passagem.';
    };
    field('map-status').textContent = 'Mapa carregado. Após o guia confirmar disponibilidade offline, você pode reabrir este recorte sem conexão.';
  } catch {
    field('map-status').textContent = 'Mapa indisponível. Reconecte para guardar o guia completo.';
  }
}
renderMap();
