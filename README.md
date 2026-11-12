# Ponte de Apoio
Equipe 9 · Antena na Lama · Caminho proposto: Prevenir e cuidar.

Guia de bolso para combinar ajuda antes das chuvas. [Documento editável da equipe](docs/Ponte-de-Apoio.docx). Repositório de trabalho pessoal baseado no [modelo APONTI](https://github.com/apontiacademy/HACKATHON-PE-RECPLAY26). A entrega institucional depende de acesso à organização.

## Experimentar
Execute `python3 -m http.server 8000 --directory frontend` e abra http://localhost:8000. Preencha o plano, marque se a ajuda está confirmada e salve. Após o aviso offline, desligue a rede e recarregue. A leitura usa a voz disponível no aparelho. Para testar no celular fora de localhost, use hospedagem HTTPS.

## Privacidade e colaboração
Os campos ficam no armazenamento do navegador, sem cadastro ou transmissão a servidor. Quem usa o mesmo perfil de navegador pode ler o plano. Use apelidos em aparelhos compartilhados e apague após o teste. A interface insere o texto do usuário sem interpretar HTML. Não há dependências de aplicação nem chaves de API. Nunca inclua sessões de WhatsApp, dados do validador ou credenciais no GitHub.

Proponha mudanças por pull request. Rode `node --test tests/*.test.mjs` antes do envio. O CI repete os testes, verifica sintaxe e nomes de arquivos privados com permissões de leitura. A verificação por nome não substitui a revisão do conteúdo.

## Uso de IA e validação
IA auxiliou na geração da primeira interface, testes e documentação. Revisão humana, entrevista com o jovem e aprovação do escopo pelo mentor pendentes. Esta versão monta o combinado localmente. A personalização por IA com conteúdo municipal revisado, a base de acolhimento do kit e o mapa ainda precisam ser integrados. Indicador proposto: completar o plano sem ajuda e identificar quem confirmou apoio após reabrir sem internet. Registre o resultado observado e as mudanças após o teste.

## Mapa offline experimental
Recorte de São José no Recife, obtido da API OpenStreetMap em 12/11/2026. © OpenStreetMap contributors, dados sob ODbL: https://www.openstreetmap.org/copyright. O arquivo local contém ruas e edificações. Não há roteamento, informação de transitabilidade nem abertura de abrigos. O service worker guarda o mapa junto à aplicação. Teste de reabertura offline em aparelho ainda pendente. Identidade provisória Pontes de Apoio gerada com IA e sujeita à revisão da equipe.
