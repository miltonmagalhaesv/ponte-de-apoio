# Ponte de Apoio — requisitos do MVP
O guia apoia moradores do Recife que precisam planejar com quem sair e onde ficar em dias de chuva.

| Necessidade | Critério de aceite |
| --- | --- |
| Acesso rápido | A entrada mostra plano, mapa, aviso identificado como simulado, acolhimento e telefones de emergência. |
| Preparação familiar | Em Planos, seis perguntas organizam partida, mobilidade, companhia e destino. No protótipo esses planos duram a sessão. O guia de plano salvo permite guardar e recuperar um acordo no dispositivo. |
| Mudança de percurso | A demonstração mostra um caminho habitual e um desvio que evita o trecho bloqueado no cenário fictício. |
| Destinos indisponíveis | O morador encontra três opções e pode pedir outra referência. A comparação por localização usa pontos fictícios e admite recusa da permissão. |
| Falta de rede | Após a primeira carga e instalação do cache, o guia e as ruas locais ficam disponíveis. Consultas externas requerem conexão. |
| Acessibilidade | O questionário oferece leitura em voz em navegadores compatíveis. O mapa deve ter explicação textual do bloqueio. |
| Dados oficiais | APAC, COP, CTTU e Ação Inverno são canais de consulta. A ingestão automática depende de fonte validada com trecho, estado e data. |
| Entrega | A CI executa testes em PRs. O fluxo de Pages publica a pasta frontend após CI aprovada na main. |

Próximo teste com moradores: verificar se identificam o acompanhante, o destino confirmado e a ação disponível quando esse destino falha.

O assistente por voz consulta o plano selecionado. Oferece entrada por fala quando o navegador permite, perguntas por toque, texto e leitura da resposta. Reconhecimento depende do navegador e pode exigir rede. O assistente usa regras locais e não aciona resgate nem verifica condições em tempo real.
