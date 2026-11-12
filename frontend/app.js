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
