# 🏆 Equipe 6 · Ponte de Apoio — Hackathon APONTI Academy 2026

> **Desafio:** Antena na Lama (REC'n'Play 2026)  
> **Caminho escolhido:** Prevenir e cuidar

## 📖 Sobre o Projeto

O Ponte de Apoio é um guia para ajudar moradores da Região Metropolitana do Recife a se preparar para dias de chuva. A proposta é transformar orientações públicas em passos compreensíveis e ajudar cada pessoa a combinar, antes de uma emergência, de que apoio precisa, com quem pode contar e onde pretende se encontrar.

O guia funcional permite registrar um combinado neste navegador, ouvir o resumo e consultar um recorte de mapa de São José, no Recife. Há também um protótipo visual do questionário e das telas planejadas. A integração entre os dois, as informações atualizadas de abrigos e a personalização de orientações por IA ainda estão em desenvolvimento.

## 👥 Equipe

- **Equipe:** 9
- **Integrantes:** Milton Magalhães | Vitória Camilo | Fellype Augusto de Oliveira | Enderson Lucas Costa
- **Validador(a) do Movimento Pró-Criança:** José Vinícius Ferreira

## 🚀 Tecnologias Utilizadas

- **Front-end:** HTML, CSS e JavaScript.
- **Armazenamento:** localStorage no navegador para o combinado do guia funcional.
- **Funcionamento offline:** Service Worker e Cache Storage para os arquivos do guia.
- **Mapa:** recorte local de dados OpenStreetMap, desenhado em Canvas. © OpenStreetMap contributors, [ODbL](https://www.openstreetmap.org/copyright).
- **Back-end e banco de dados:** ainda não implementados.
- **Deploy:** público pendente de confirmação.
- **Testes:** Node.js test runner e GitHub Actions.

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

Abra `http://localhost:8000` para o guia funcional. O questionário ilustrativo está em desenvolvimento e ainda não foi enviado a este repositório.

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

- Plano de execução e roteiro de pitch: disponível na cópia local, ainda não enviado.
- [Documento editável da equipe](docs/Ponte-de-Apoio.docx)
- [Modelo do hackathon](https://github.com/apontiacademy/HACKATHON-PE-RECPLAY26/blob/main/README.md)
