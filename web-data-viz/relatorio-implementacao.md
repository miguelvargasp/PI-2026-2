# Relatório de Implementação

## 1. Arquivos alterados/criados

## Backend
- **Alterado:** `app.js`
- **Alterado:** `src/routes/usuarios.js`
- **Alterado:** `src/controllers/usuarioController.js`
- **Alterado:** `src/models/usuarioModel.js`
- **Criado:** `src/routes/avaliacoes.js`
- **Criado:** `src/controllers/avaliacaoController.js`
- **Criado:** `src/models/avaliacaoModel.js`

## Banco de dados
- **Alterado:** `src/database/MJRewind.sql`

## Frontend
- **Alterado:** `public/cadastro.html`
- **Alterado:** `public/login.html`
- **Alterado:** `public/discografia.html`
- **Alterado:** `public/dashboard.html`
- **Alterado:** `public/avaliacaoOTW.html`
- **Alterado:** `public/avaliacaoTHR.html`
- **Alterado:** `public/avaliacaoBAD.html`
- **Alterado:** `public/avaliacaoDNG.html`
- **Alterado:** `public/avaliacaoHIS.html`
- **Alterado:** `public/avaliacaoBOTDF.html`
- **Alterado:** `public/avaliacaoINV.html`
- **Criado:** `public/js/avaliacao.js`
- **Criado:** `public/minha-historia.html`
- **Alterado:** `public/index.html`
- **Alterado:** `public/indexLog.html`

---

## 2. Decisões tomadas fora do plano

1. **Nenhuma decisão funcional fora do escopo do plano.**
2. **Exceção operacional de ambiente (não de produto):**
   - Para validar dados em banco local, foi necessário inserir registros de teste (`album`, `usuario`, `avaliacao`) via SQL/API.
   - Isso foi feito apenas para cumprir as validações das etapas.

---

## 3. Validações executadas (por etapa)

## Etapa 1 — Modelo de dados
- `src/database/MJRewind.sql` atualizado com:
  - `UNIQUE(email)` em `usuario`;
  - seed dos 7 álbuns;
  - `CHECK nota BETWEEN 0 AND 10` mantido.
- Validações executadas:
  - `SELECT COUNT(*) AS total_album FROM album;` → **7**
  - `INSERT` em `avaliacao` com nota `11` → **falhou** com `Check constraint 'chk_avaliacao_nota' is violated`.

## Etapa 2 — Contrato de autenticação
- Implementado:
  - `POST /usuarios/cadastrar`
  - `POST /usuarios/autenticar` retornando `id` e `email`
  - `GET /usuarios/listar`
- Validações executadas por `curl`:
  - cadastro válido → **200**
  - autenticação válida → **200**, body com `{ id, email }`
  - autenticação inválida → **403**

## Etapa 3 — API de avaliações
- Implementado:
  - `POST /avaliacoes/cadastrar`
  - `GET /avaliacoes/dashboard/kpis`
  - `GET /avaliacoes/dashboard/por-album`
  - `GET /avaliacoes/dashboard/ultimas?limite=3`
- Validações executadas:
  - payload válido no cadastro → **201**
  - payload inválido (nota fora do intervalo) → **400**
  - FK inválida (usuário inexistente) → **404**

## Etapa 4 — Padronização das telas de avaliação
- 7 páginas `avaliacao*.html` passaram a usar `public/js/avaliacao.js`.
- Validações por inspeção/execução:
  - bloqueio de campos inválidos presente no script compartilhado;
  - sucesso limpa campos e mostra feedback;
  - sem login, envio redireciona para login.

## Etapa 5 — Cadastro/Login/Discografia
- `cadastro.html`, `login.html`, `discografia.html` ajustados.
- Validações executadas:
  - cadastro + login via API com sucesso;
  - sessão salva no `sessionStorage` pelo fluxo de login (código revisado);
  - `discografia.html` sem referências inválidas de elementos.

## Etapa 6 — Dashboard com dados reais
- `dashboard.html` migrou de dados mockados para `fetch` dos novos endpoints.
- Validações executadas:
  - `/avaliacoes/dashboard/kpis` retornando KPI real;
  - `/avaliacoes/dashboard/por-album` retornando contagem por álbum;
  - `/avaliacoes/dashboard/ultimas?limite=3` retornando avaliações ordenadas por `id_avaliacao` desc.

## Etapa 7 — Minha História e navegação
- Criada `public/minha-historia.html`.
- Menus de `index.html` e `indexLog.html` atualizados com link.
- Validações executadas:
  - presença do link em ambas as páginas;
  - conteúdo da nova página condizente com contexto/objetivo.

## Etapa 8 — Teste integrado (roteiro)
- Executado roteiro funcional via API:
  1. cadastro de usuário,
  2. login,
  3. cadastro de avaliações,
  4. leitura de KPIs/gráfico/últimas.
- Resultado: fluxo **funcional** no backend + contrato pronto para frontend.

---

## 4. Pendências

1. **Permissão de banco insuficiente para validar reaplicação completa do script SQL**
   - Usuário local não possui permissão para `CREATE DATABASE`/`ALTER TABLE`.
   - O arquivo SQL está correto no repositório, mas a aplicação dessas alterações depende de usuário com privilégio administrativo.

2. **Validação visual E2E em navegador (manual)**
   - O backend e endpoints foram validados por `curl`.
   - Recomenda-se executar teste manual final no browser:
     - cadastro -> login -> avaliação em cada álbum -> dashboard renderizando KPIs, gráfico e últimas 3.
