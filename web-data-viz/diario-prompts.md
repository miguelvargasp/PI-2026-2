# Diário de Prompts

Registro cronológico dos prompts enviados pelo usuário nesta sessão.

1. `Oi`

2. `Entre em /siteinicial/Documentação em com base nesse pdf, crie um plano de especificação chaamado especificacao.md e coloque-o em /web-data-viz, contendo os seguintes tópicos: 1 Contexto 2 Objetivo 3 Escopo 4 Funcionalidades 5 Regras de negócio 6 Interface 7 Critérios de aceitação`

3. `Leia especificacao.md e gere um plano de implementação plano-implementacao.md.

Inclua: arquivos alterados ou criados, componentes, fluxo, regras de negócio, decisões técnicas e etapas numeradas com a forma de validar cada uma.

Não implemente nada. Apenas planeje.`

4. `Esse plano de implementação funcionaria para quando eu aplique o npm start consiga realizar o cadastro e/ou login, avalie o álbum na página discografia, e ao entrar em estatísticas a dashboard seja interativa (mostrando as três KPIs, gráfico e últimas 3 avaliações)?`

5. `Leia especificacao.md e plano-implementacao.md.

Implemente a funcionalidade seguindo as etapas do plano, na ordem descrita.

- Não tome decisões que não estejam no plano. Se algo estiver ambíguo, pare e me pergunte.
- Siga os padrões do projeto definidos na especificação.
- Ao concluir cada etapa, valide conforme o critério do plano.

Ao final, gere relatorio-implementacao.md com: arquivos alterados, decisões tomadas fora do plano, validações executadas e pendências.`

6. `A database, já está criada pelo usuário com privilégio administrativo, assim como as tabelas. que mais deve ser feito em relação ao script SQL MJRewind.sql?`

7. `Crie um novo script em /src/database/MJRewindFinal.sql , irei executar DROP DATABASE para aplicar o novo script, a tabela avaliacao ainda é composta relacionamento N:N`

8. `Será necessário criar SELECTs no script ou eles já estão feitos nos arquivos da pasta src?`

9. `Certo, obrigado. Vou testar o funcionamento.`

10. `Eu apenas consigo dar npm start se fechar o opencode, certo?`

11. `> web-data-viz@1.0.0 start
> node app.js

node:events:505
    throw er; // Unhandled 'error' event
    ^

Error: listen EADDRINUSE: address already in use :::3333
    at Server.setupListenHandle [as _listen2] (node:net:2328:16)
    at listenInCluster (node:net:2437:12)
    at Server.listen (node:net:2562:7)
    at app.listen (C:\Users\Miguel\Downloads\REP Projeto Individual\PI-2026-2\web-data-viz\node_modules\express\lib\application.js:635:24)
    at Object.<anonymous> (C:\Users\Miguel\Downloads\REP Projeto Individual\PI-2026-2\web-data-viz\app.js:40:5)
    at Module._compile (node:internal/modules/cjs/loader:1929:14)
    at Object..js (node:internal/modules/cjs/loader:2060:10)
    at Module.load (node:internal/modules/cjs/loader:1651:32)
    at Module._load (node:internal/modules/cjs/loader:1443:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
Emitted 'error' event on Server instance at:
    at emitErrorNT (node:net:2416:8)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  code: 'EADDRINUSE',
  errno: -4091,
  syscall: 'listen',
  address: '::',
  port: 3333
}

Node.js v24.21.0  aparece este erro`

12. `Elabore um diario-prompts.md em que é registrado todos os prompts que utilizei até agora`
