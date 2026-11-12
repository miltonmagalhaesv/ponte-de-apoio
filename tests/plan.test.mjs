import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePlan, describe} from '../frontend/plan.mjs';
const plan = {need:' Apoio ', who:'Ana', action:'Ligar', confirmed:false};
test('preserva o combinado ao salvar e reabrir', () => assert.deepEqual(validatePlan(JSON.parse(JSON.stringify(plan))), {...plan, need:'Apoio'}));
test('não confunde ajuda pendente com confirmada', () => {
 assert.match(describe(plan), /falta confirmar/);
 assert.match(describe({...plan,confirmed:true}), /Ajuda combinada/);
});
test('rejeita campos vazios, extensos e dados corrompidos', () => {
 for(const invalid of [null,{...plan,who:' '},{...plan,action:'a'.repeat(181)},{...plan,confirmed:'sim'}]) assert.throws(() => validatePlan(invalid));
});
