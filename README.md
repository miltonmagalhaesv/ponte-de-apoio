# 🏆 Equipe 9 · Ponte de Apoio — Hackathon APONTI Academy 2026

> **Desafio:** Antena na Lama (REC'n'Play 2026)  
> **Caminho escolhido:** Prevenir e cuidar

## 📖 Sobre o Projeto

O Ponte de Apoio é um guia para ajudar moradores da Região Metropolitana do Recife a se preparar para dias de chuva. A proposta é transformar orientações públicas em passos compreensíveis e ajudar cada pessoa a combinar, antes de uma emergência, de que apoio precisa, com quem pode contar e onde pretende se encontrar.

O guia funcional permite registrar um combinado neste navegador, ouvir o resumo e consultar um recorte de mapa de São José, no Recife. Há também um protótipo visual do questionário e das telas planejadas. A integração entre os dois, as informações atualizadas de abrigos e a personalização de orientações por IA ainda estão em desenvolvimento.

## 👥 Equipe

- **Equipe:** 9
- **Integrantes:** Milton Magalhães e equipe — nomes e atribuições a completar com o grupo.
- **Validador(a) do Movimento Pró-Criança:** a confirmar com a equipe.

## 🚀 Tecnologias Utilizadas

O guia funcional é uma aplicação web móvel em HTML, CSS e JavaScript. A primeira abertura precisa de conexão. Depois que o guia confirma a disponibilidade offline, o usuário pode reabrir o plano e o mapa no mesmo dispositivo e perfil.

| Recurso | Implementação atual |
|---|---|
| Plano pessoal | JavaScript valida as respostas e guarda o plano simples em `localStorage`. Os dados permanecem após fechar o guia. Limpar os dados do site também apaga o plano. |
| Guia e mapa offline | Um Service Worker usa Cache Storage para guardar a interface e o arquivo cartográfico de São José. Canvas desenha as ruas a partir desse recorte. Dados © OpenStreetMap contributors, [ODbL](https://www.openstreetmap.org/copyright). |
| Hospedagem e testes | A versão estática dispensa servidor de aplicação e banco remoto. O projeto utiliza o test runner do Node.js e GitHub Actions. O endereço público e a experiência offline em aparelho físico precisam de validação. |

### Evolução proposta para o aplicativo instalado

- **Instalação na tela inicial (PWA).** Acrescentar manifesto, ícones de instalação e abertura em janela própria. Publicar em HTTPS e testar instalação, fechamento e reabertura em modo avião no Android e no iPhone.
- **Destinos e localização.** Pedir localização apenas quando a pessoa escolher usá-la, com endereço manual como alternativa. Guardar destino familiar e referência municipal. O botão proposto **Ir até o local** deve identificar se vai apenas mostrar o ponto no mapa salvo ou abrir um serviço externo de navegação. O mapa atual permite consulta visual; cálculo de trajetos offline requer uma malha de caminhos e um mecanismo de roteamento.
- **Pré-alerta oficial.** Com conexão, consultar mudanças nos pontos da área salva e apresentar uma alternativa com fonte, horário, situação de acolhimento e acessibilidade conhecida. Em modo offline, exibir a última atualização guardada. A recomendação de um percurso depende também de informações sobre interdições e condições de passagem. Recepção de alertas, atualização automática e sugestões por localização são funcionalidades planejadas.

## 🤖 Uso Ético de IA

- **Onde a IA foi usada:** auxílio na elaboração da interface inicial, da documentação e dos testes.
- **O que foi corrigido ou validado:** a identidade visual foi ajustada após avaliações de Milton, incluindo o nome Ponte de Apoio e a simplificação da marca. A saída de texto do protótipo foi verificada por teste automatizado. A revisão de conteúdo municipal e o teste com o validador ainda estão pendentes.
- **Ferramenta usada:** Codex (OpenAI). Outras ferramentas usadas pela equipe devem ser acrescentadas.
- **No produto:** o uso de IA para adaptar orientações municipais é uma proposta e ainda não está integrado.

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos

Python 3 para servir os arquivos e Node.js para executar os testes.

### Front-end

Na raiz do repositório, execute:

```bash
python3 -m http.server 8000 --directory frontend
```

Abra `http://localhost:8000` para o guia funcional. Para experimentar o questionário ilustrativo, abra `http://localhost:8000/prototipo.html`. O protótipo ilustrativo não mantém as respostas após recarregar.

O guia guarda dados no navegador do aparelho. Quem acessar o mesmo perfil do navegador pode ler o combinado. Para os testes, use dados fictícios e o botão de apagar ao terminar.

### Back-end

Ainda não há serviço de back-end implementado.

## 🌐 Deploy Público

- **Front-end:** pendente de publicação e verificação.
- **API:** ainda não implementada.

## 🧪 Testes Automatizados

Na raiz do repositório, execute:

```bash
node --test tests/*.test.mjs
```

O GitHub Actions está configurado para executar os testes e verificações de sintaxe em pushes e pull requests.

## 📊 Indicador de resultado

Proposta para o teste com o validador: contar quantas pessoas conseguem criar e recuperar um combinado sem ajuda, após reabrir o guia sem conexão. Registrar o total de participantes e o resultado observado. A medição ainda não foi realizada.

## 🗣️ Validação com o Movimento Pró-Criança

A conversa e o teste de uso com o validador devem ser registrados aqui, incluindo o que mudou no projeto após suas observações. Resultado e alterações a confirmar com a equipe.

## 📚 Material de apoio

- [Plano de execução e roteiro de pitch](docs/Plano-de-execucao.md)
- [Documento editável da equipe](docs/Ponte-de-Apoio.docx)
- [Modelo do hackathon](https://github.com/apontiacademy/HACKATHON-PE-RECPLAY26/blob/main/README.md)

[Requisitos gerais e critérios de aceite](docs/Requisitos.md) · [Apresentação interativa](frontend/pitch.html)
