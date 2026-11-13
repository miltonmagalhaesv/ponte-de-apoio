# Ponte de Apoio · Plano de execução da Equipe 9

**Decisão de produto.** Começar por Prevenir e Cuidar, em um bairro do Recife. O primeiro benefício é sair com um combinado real com alguém de confiança, inclusive de outro bairro. O teste decisivo é conseguir recuperar esse combinado no próprio celular quando a conexão cair.

| Ordem | Responsável sugerido | Entrega e critério de aceite |
|---|---|---|
| 1 · Primeiro ciclo | Milton e Vitória, produto e interface | Observar três pessoas criando um combinado com uma necessidade, um contato e uma ação. Anotar onde precisam de ajuda. Medir tempo e compreensão antes de acrescentar perguntas. |
| 2 · Em paralelo | Biologia e conteúdo | Selecionar três orientações de preparação do plano municipal. Usar IA para rascunhar versões curtas. Registrar página, trecho, revisão humana e versão antes de distribuir. Usar exemplos familiares e oferecer leitura em áudio. |
| 3 · Em paralelo | Backend | Entregar um arquivo JSON versionado com locais de referência, município, endereço, coordenadas verificadas, fonte e data. Separar cadastro de local de confirmação de abertura. Se faltar confirmação, mostrar “Situação desconhecida”. |
| 4 · Integração | Frontend e backend | Vincular a lista textual ao mapa local. Baixar o pacote enquanto há rede. Mostrar tamanho e data e confirmar que o download terminou. Abrir novamente em modo avião e localizar plano, contato e mapa. Manter a versão anterior se a atualização falhar. |
| 5 · Antes do pitch | Equipe | Rodar CI e testar num Android e num iPhone, com rede lenta, modo avião e fonte ampliada. Apresentar com família fictícia e distinguir dados demonstrativos de informes vigentes. |

## Dados e tecnologia

O primeiro recorte local já usa ruas do OpenStreetMap e Canvas. Manter JavaScript, Service Worker e Cache Storage no MVP. A lista textual oferece acesso aos locais também por leitor de tela. Para ampliar a cobertura, avaliar Leaflet com GeoJSON simplificado servido pelo próprio projeto e atribuição da base. Usar bairro escolhido manualmente como alternativa à geolocalização. Distância até um local não determina segurança da rota.

O [catálogo municipal de abrigos](https://dados.recife.pe.gov.br/pt_BR/dataset/abrigos-temporarios-disponiveis) é ponto de partida para identificar locais. Conferir data e formato de cada recurso antes de importar. O [Ação Inverno](https://acaoinverno.recife.pe.gov.br/) e o [Plano de Contingência 2026](https://acaoinverno.recife.pe.gov.br/wp-content/uploads/2026/04/PLANO-DE-CONTINGENCIA-RECIFE-2026__final.pdf) dão contexto municipal. Confirmar com o COP ou a Defesa Civil qual canal permite redistribuir boletins e ativações. Uma API pública operacional de abertura e lotação ainda precisa de confirmação.

Começar com publicação revisada de boletins oficiais. Guardar emissor, município, publicação, vigência e link original. No retorno da rede, buscar atualizações e destacar o que mudou. Offline, mostrar horário da última consulta. Se houver integração autorizada, um processo agendado no backend pode validar, deduplicar e publicar novos boletins. Web Push entra depois, com adesão explícita e teste de entrega. Previsão de chuva, alerta oficial e abertura de abrigo são eventos distintos.

## Qualidade e entrega

Em cada revisão, testar persistência e exclusão do plano, expiração de boletim e falha na atualização. Usar os testes Node existentes e acrescentar Playwright para abrir, salvar, desligar a rede e reabrir. Incluir axe-core e uma rodada manual com leitor de tela. Medir o tamanho do primeiro download e estabelecer como meta abrir o guia salvo em até dois segundos no celular de teste. Verificar se há voz disponível offline; para orientações fixas, baixar áudio revisado junto com o guia.

Manter dados familiares no aparelho, oferecer exclusão e evitar nomes nos registros de uso. Validar campos e fontes antes da publicação, tratar textos externos como texto e guardar credenciais apenas no ambiente do servidor. Rodar testes e análise de dependências na revisão. Condicionar publicação à CI aprovada, testar a versão publicada e documentar retorno à última versão conhecida. Confirmar visibilidade da hospedagem antes do lançamento.

## Próximos ciclos

Com o fluxo básico validado, adicionar checklist acessível e lembrete opcional para revisar o combinado antes do inverno. Experimentar uma dica ambiental local por vez e medir se leva a alguma ação. Para Jaboatão e outros municípios, validar fonte, contatos e vigência próprios. Compartilhamento voluntário do plano pode anteceder grupos comunitários. SOS automático, caronas, rastreamento contínuo e despacho à Defesa Civil exigem validação operacional própria e ficam fora da demonstração.

## Da Ação Inverno ao mapa da família

Na apresentação da [Ação Inverno 2026](https://www2.recife.pe.gov.br/node/300130), a Prefeitura informou que já havia mapeado 50 locais para possível ativação. O plano de 2026 prevê inclusive o acionamento de escolas no estágio de alerta máximo. A equipe deve confirmar a lista nominal e a data de cada registro antes de incluí-lo no mapa.

1. **Publicação da edição anual.** A pessoa responsável por conteúdo compara a edição com a anterior, revisa as orientações e publica um pacote datado. Quando houver internet, o app oferece a atualização e preserva os combinados pessoais.
2. **Cadastro antecipado.** Guardar nome, tipo de equipamento, bairro e função prevista. Mostrar “Local previsto para acolhimento · abertura não confirmada”. Uma escola pode ser equipamento educacional no cadastro e exercer função de abrigo durante um evento.
3. **Operação durante a chuva.** No piloto, uma pessoa confere o comunicado oficial e publica a função efetiva, abrangência, horário, fonte e eventual encerramento. Incluir locais extraordinários mesmo que estejam fora da lista inicial. Registrar separadamente acolhimento, orientação e outros serviços quando informados.
4. **Aviso regional proposto.** Usar bairros escolhidos pela pessoa e adesão a avisos. Exemplo fictício: “A Escola Exemplo começou a receber famílias no bairro Exemplo. Informação da Prefeitura às 14h20. Ver comunicado.” Deduplicar pelo evento e enviar correção ou encerramento aos mesmos bairros. Sem conexão, exibir data da última informação. Automatizar a publicação quando houver canal oficial validado.

## Pitch com demonstração · limite de 3 minutos

**0:00–0:30 · Milton, problema.** “Quando chove forte no Recife, minha mãe e eu podemos estar em bairros diferentes. Se a internet cair, ela lembra com quem combinou de falar? A Prefeitura já tem um Plano de Contingência. Ele organiza o trabalho de muitos órgãos. Nossa pergunta foi: como colocar a parte que interessa à minha família no celular dela, antes da chuva?”

**0:30–1:00 · Conteúdo e IA.** “Nossa proposta é que a equipe selecione uma orientação do plano, use IA para redigi-la em linguagem simples e confira o resultado com o trecho original. Quem abre o guia pode consultar a fonte. E pode transformar a orientação num combinado com alguém de confiança.” Mostrar um exemplo revisado, se disponível.

**1:00–1:55 · Vitória demonstra.** Abrir o guia. Preencher um exemplo fictício: “Minha mãe precisa de companhia. Combinei com minha irmã que ela vai ligar.” Salvar. Ativar modo avião, fechar e reabrir o guia no aparelho previamente preparado. Mostrar onde o combinado e o mapa ficam. Deixar alguns segundos para a banca enxergar a tela. Ensaiar o áudio no aparelho antes de incluí-lo na demonstração.

**1:55–2:30 · Mapa e atualização.** “Recife já mapeou 50 locais que podem ser ativados. Uma escola pode passar a acolher famílias durante a chuva. No mapa que estamos propondo, a família consegue distinguir um local previsto de um local que a Prefeitura confirmou como aberto. O aviso para quem acompanha aquele bairro traz a fonte e o horário. Sem internet, a pessoa vê quando recebeu a última atualização.” Mostrar o recorte local atual e identificar como simulação qualquer aviso demonstrativo.

**2:30–2:50 · Resultado e fechamento.** “Nosso teste é simples: quantas pessoas conseguem criar o combinado e encontrá-lo de novo em modo avião, sem ajuda? É assim que vamos saber se tiramos uma orientação do papel e a colocamos ao alcance de uma família.” Se já houver teste, dizer quantas conseguiram, de quantas participantes e em qual aparelho.

**2:50–3:00 · Margem para troca de tela ou fala.** Cronometrar o ensaio completo, incluindo o tempo de desbloquear o celular.

## Meus planos e mapa offline · especificação revisada

A tela inicial abre o único plano salvo. “Criar outro plano” reutiliza o mesmo formulário. Cada plano tem identificador próprio, pessoa, local de partida, posição confirmada, necessidades, contato, tarefa e destinos. Com dois ou mais, mostrar cartões como “Mãe · Casa” e “Eu · Trabalho”. Editar ou excluir um preserva os demais. O plano criado no aparelho do filho fica nesse aparelho; prever cópia compartilhada ou preparação diretamente no celular da mãe.

| Tela | Pergunta em linguagem falada | Resultado |
|---|---|---|
| 1 | Para quem vamos fazer este plano? | Para mim ou para outra pessoa. Apelido para reconhecer o cartão. |
| 2 | De onde essa pessoa vai sair? | Casa, trabalho ou outro local. Usar localização atual somente se estiver nesse lugar; alternativa: CEP, rua, número ou referência. Ler cidade, UF e endereço em voz alta e confirmar o ponto no mapa ou pela descrição. Bairro basta para explorar; planejamento de trajeto requer origem confirmada. |
| 3 | Se precisar sair daqui, de que ajuda essa pessoa precisa? | Várias escolhas: companhia para andar, passagem sem escadas, espaço para cadeira de rodas, transporte, orientação por voz, orientação visual, outra ou nenhuma. Aceitar resposta falada. |
| 4 | Quem pode ajudar e qual é o telefone? | Nome ou apelido e telefone para habilitar a ligação. Sem telefone, guardar rascunho e mostrar pendência. Local do contato opcional: está por perto ou em outro lugar. |
| 5 | O que você vai pedir a essa pessoa? | Opções concretas: ligar, vir acompanhar ou esperar no local combinado. Depois perguntar “Ela já topou?” Sim ou ainda vou falar. Não disparar mensagens automaticamente. |
| 6 | Onde vocês combinaram de se encontrar? | Local familiar, ponto municipal ou decidir depois. A ficha informa função, endereço, acessibilidade conhecida, fonte e data. Guardar encontro familiar e acolhimento municipal separadamente se necessário. |

Oferecer Ouvir desde a primeira tela, repetir, falar ou tocar em respostas com ícones e descrição, reproduzir a resposta entendida e confirmar ou corrigir. Baixar as falas fixas com o guia. Validar ditado e vozes offline em Android e iPhone; manter opções sonoras selecionáveis quando transcrição estiver indisponível. Testar o fluxo completo com pessoa que prefere áudio, inclusive abrir plano, identificar contato e ouvir destino.

Guardar os planos localmente em IndexedDB. Compartilhar pacotes cartográficos entre planos com cobertura comum. Com rede, selecionar quadrículas vetoriais próprias que cubram o entorno inicial de 1 km e, quando disponível, todo o trajeto até o destino escolhido; oferecer expansão para 3 ou 5 km. Medir tamanho real, incluir lista textual de pontos e só confirmar download após verificar o pacote completo. Manter versão anterior se a rede cair. A política dos [servidores de mapas OSM](https://operations.osmfoundation.org/policies/tiles/) requer hospedagem própria ou provedor que autorize download offline.

São José permanece recorte demonstrativo. Para piloto em área de risco, conferir a categoria e abrangência do [cadastro da Defesa Civil](https://dados.recife.pe.gov.br/dataset/defesa-civil), pontos de apoio com fonte e percursos com moradores e equipe municipal. Medir distâncias pela malha de pedestres, escadas, travessias, pontos disponíveis e bytes por pacote. Área de risco cadastrada, ocorrência atual de alagamento e interdição são registros distintos. Avisos operacionais exigem fonte, horário, cobertura e validade. O mapa offline apresenta a última informação recebida. Trajeto futuro exige grafo de pedestres e confirmação de acessibilidade; indisponibilidade de dados deve ficar visível. O protótipo atual oferece mapa de referência.
