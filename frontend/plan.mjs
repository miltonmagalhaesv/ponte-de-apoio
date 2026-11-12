export function validatePlan(value) {
  if (!value || typeof value.confirmed !== 'boolean') throw Error('Revise seu combinado.');
  const plan = { confirmed: value.confirmed };
  for (const [key, limit] of Object.entries({need:180, who:80, action:180})) {
    const text = value[key];
    if (typeof text !== 'string' || !text.trim() || text.length > limit) throw Error('Preencha os campos dentro do limite indicado.');
    plan[key] = text.trim();
  }
  return plan;
}
export function describe(plan) {
  return [plan.need, plan.who + ' — ' + plan.action, plan.confirmed ? 'Ajuda combinada.' : 'Ainda falta confirmar a ajuda.'].join('\n');
}
