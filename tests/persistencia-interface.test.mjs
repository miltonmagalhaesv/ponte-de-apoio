import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createContext, runInContext} from 'node:vm';

const html = readFileSync(new URL('../frontend/index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

test('planos guardados reaparecem e falhas de armazenamento são sinalizadas', () => {
  const data = new Map();
  const localStorage = {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value)
  };
  const createApp = () => {
    const context = createContext({document: {querySelector: () => ({})}, localStorage});
    runInContext(script, context);
    return context;
  };
  let app = createApp();
  assert.equal(runInContext("savePlans([...plans, {person:'Maria',help:[],dest:'Casa'}])", app), true);
  app = createApp();
  assert.equal(runInContext("plans[1].person", app), 'Maria');
  localStorage.setItem = () => { throw new Error('armazenamento indisponível'); };
  assert.equal(runInContext('savePlans(plans)', app), false);
});
