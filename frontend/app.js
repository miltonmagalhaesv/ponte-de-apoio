// Polyfill para crypto.randomUUID (Garante funcionamento em HTTP/IPs locais)
if (!window.crypto) { window.crypto = {}; }
if (!window.crypto.randomUUID) {
  window.crypto.randomUUID = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
}

// Configurações do Supabase
const SUPABASE_URL = 'https://sjlsqvdzunfwtozqxiva.supabase.co';
const SUPABASE_KEY = 'sb_publishable_UtWArqI0Yavo_zFY2-wguQ_zc5fSEGM';

// Cria a ligação ao banco de dados e guarda na variável clienteSupabase
const clienteSupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * Função para salvar o "Combinado" no banco de dados
 */
async function salvarPlanoNoBackend(dadosDoPlano) {
  try {
    // 1. Usamos o clienteSupabase aqui em vez de supabase
    const { data: usuario, error: erroUsuario } = await clienteSupabase
      .from('usuarios')
      .insert([{ nome: dadosDoPlano.nome, telefone: dadosDoPlano.telefone }])
      .select()
      .single();

    if (erroUsuario) throw erroUsuario;

    // 2. Usamos o clienteSupabase aqui também
    const { data: plano, error: erroPlano } = await clienteSupabase
      .from('planos_familiares')
      .insert([{
        usuario_id: usuario.id,
        ponto_de_encontro: dadosDoPlano.pontoEncontro,
        contatos_emergencia: dadosDoPlano.contatos,
        necessidades_especiais: dadosDoPlano.necessidades
      }])
      .select();

    if (erroPlano) throw erroPlano;

    console.log('Plano salvo com sucesso no back-end!', plano);
    return true;

  } catch (erro) {
    console.error('Erro ao salvar no Supabase:', erro.message);
    
    // Fallback: se falhar, guarda no localStorage
    localStorage.setItem('plano_pendente', JSON.stringify(dadosDoPlano));
    return false;
  }
}

// === LÓGICA DO FORMULÁRIO ===
const formulario = document.getElementById('form-plano');

if (formulario) {
  formulario.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede a página de recarregar

    // Captura os valores reais que o utilizador digitou
    const meuCombinado = {
      nome: document.getElementById('nome').value,
      telefone: document.getElementById('telefone').value,
      pontoEncontro: document.getElementById('ponto-encontro').value,
      contatos: [{ detalhes: document.getElementById('contatos').value }],
      necessidades: document.getElementById('necessidades').value
    };

    try {
      const salvo = await salvarPlanoNoBackend(meuCombinado);

      if (salvo) {
        alert('O seu plano foi salvo na nuvem com sucesso!');
      } else {
        alert('Sem internet no momento. O seu plano foi salvo no aparelho e será sincronizado depois.');
      }
      
      formulario.reset();
    } catch (error) {
      console.error('Erro no fluxo do formulário:', error);
    }
  });
}

// === REGISTO DO SERVICE WORKER ===
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => navigator.serviceWorker.ready)
    .then(() => console.log('Guia disponível offline neste navegador.'))
    .catch((erro) => console.error('Erro ao registar Service Worker:', erro));
}

// === RENDERIZAÇÃO DO MAPA OFFLINE (CANVAS) ===
async function renderMap() {
  try {
    const response = await fetch('./assets/map.json');
    if (!response.ok) throw Error('Mapa indisponível');
    const data = await response.json();
    
    // Apanha o canvas pelo ID do novo HTML
    const canvas = document.getElementById('mapa-canvas');
    if (!canvas) return; 
    
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
    console.log('Mapa carregado com sucesso.');
  } catch (erro) {
    console.error('Falha ao carregar o mapa:', erro);
  }
}

// Inicia a renderização do mapa
renderMap();

// === LÓGICA DE SINCRONIZAÇÃO OFFLINE ===
async function sincronizarPlanosPendentes() {
  const planoPendente = localStorage.getItem('plano_pendente');

  if (planoPendente) {
    console.log('Plano pendente encontrado. A tentar sincronizar com o banco de dados...');
    try {
      const dadosDoPlano = JSON.parse(planoPendente);
      const sucesso = await salvarPlanoNoBackend(dadosDoPlano);

      if (sucesso) {
        localStorage.removeItem('plano_pendente');
        console.log('Sincronização concluída com sucesso!');
      }
    } catch (erro) {
      console.error('Erro ao tentar ler ou sincronizar o plano pendente:', erro);
    }
  } else {
    console.log('Sistema atualizado. Nenhum plano pendente.');
  }
}

// Detecta o momento exato em que o telemóvel recupera a internet
window.addEventListener('online', () => {
  console.log('Conexão restabelecida! A iniciar sincronização em segundo plano...');
  sincronizarPlanosPendentes();
});

// Detecta quando a internet cai
window.addEventListener('offline', () => {
  console.log('Atenção: Conexão perdida. O aplicativo está a operar em modo offline.');
});

// Tenta sincronizar sempre que o utilizador abre o aplicativo (se houver internet)
document.addEventListener('DOMContentLoaded', () => {
  if (navigator.onLine) {
    sincronizarPlanosPendentes();
  }
});

// === LÓGICA DE GEOLOCALIZAÇÃO E BUSCA DE ABRIGOS ===
const btnBuscarAbrigo = document.getElementById('btn-buscar-abrigo');
const divResultadoAbrigo = document.getElementById('resultado-abrigo');

if (btnBuscarAbrigo) {
  btnBuscarAbrigo.addEventListener('click', () => {
    // 1. Verifica se o navegador/celular suporta GPS
    if (!('geolocation' in navigator)) {
      mostrarResultadoAbrigo('O seu navegador não suporta geolocalização.', true);
      return;
    }

    mostrarResultadoAbrigo('A obter a sua localização exata...', false);
    btnBuscarAbrigo.disabled = true;

    // 2. Solicita as coordenadas atuais do usuário
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          // 3. Chama a função inteligente (RPC) do Supabase passando as coordenadas
          const { data, error } = await clienteSupabase.rpc('buscar_abrigo_proximo', {
            lat: lat,
            lng: lng
          });

          if (error) throw error;

          if (data && data.length > 0) {
            const abrigo = data[0];
            // Converte a distância de metros para quilômetros
            const distanciaKm = (abrigo.distancia_metros / 1000).toFixed(2);
            
            divResultadoAbrigo.innerHTML = `
              <span style="color: #005f73; font-weight: bold;">📍 Abrigo mais próximo encontrado:</span><br><br>
              <strong>${abrigo.nome}</strong><br>
              ${abrigo.endereco}<br><br>
              <em>Distância: aproximadamente ${distanciaKm} km de você.</em>
            `;
          } else {
            mostrarResultadoAbrigo('Nenhum abrigo encontrado na nossa base de dados.', true);
          }
        } catch (erro) {
          console.error('Erro ao buscar abrigo:', erro);
          mostrarResultadoAbrigo('Erro ao contactar o servidor. Verifique sua conexão.', true);
        } finally {
          btnBuscarAbrigo.disabled = false;
        }
      },
      (erro) => {
        console.error('Erro de permissão de GPS:', erro);
        mostrarResultadoAbrigo('Não foi possível obter a sua localização. Verifique as permissões de GPS do seu aparelho.', true);
        btnBuscarAbrigo.disabled = false;
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  });
}

// Função auxiliar para exibir mensagens na tela do abrigo
function mostrarResultadoAbrigo(mensagem, isErro) {
  divResultadoAbrigo.style.display = 'block';
  divResultadoAbrigo.style.color = isErro ? 'red' : '#12382e';
  divResultadoAbrigo.textContent = mensagem;
}
