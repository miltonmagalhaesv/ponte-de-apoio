import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createContext, runInContext} from 'node:vm';

const html = readFileSync(new URL('../frontend/index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

test('mostra apelidos como texto no resumo e na lista de participantes', () => {
  const screen = {};
  const nav = {};
  const context = createContext({
    document: {querySelector: selector => selector === '#screen' ? screen : nav}
  });
  runInContext(script, context);
  runInContext("plans[0].person = 'Ana <teste>'; plans[0].members = ['Rosa & Bia']; detail(0)", context);
  assert.ok(screen.innerHTML.includes('Ana &lt;teste&gt;'));
  runInContext('people(0)', context);
  assert.ok(screen.innerHTML.includes('Rosa &amp; Bia'));
});

test('todos os arquivos prometidos para uso offline estão na entrega', () => {
  const root = new URL('../frontend/', import.meta.url);
  const worker = readFileSync(new URL('sw.js', root), 'utf8');
  const entries = worker.match(/const files = \[([^\]]+)\]/)[1];
  for (const [,path] of entries.matchAll(/'([^']+)'/g)) {
    assert.ok(readFileSync(new URL(path === './' ? './index.html' : path, root)).length, path);
  }
});

test('assistente diferencia apoio pendente, destino e pedido de socorro', () => {
  const context = createContext({document:{querySelector:()=>({})}});
  runInContext(script, context);
  const ask = question => context.answer(question, {who:'Ana',dest:'Casa de Rosa',agreed:false});
  assert.match(ask('Quem vem comigo?'), /Ana.*a confirmar/);
  assert.match(ask('Onde posso ficar?'), /Casa de Rosa/);
  assert.match(ask('Não consigo contactar'), /193/);
});
