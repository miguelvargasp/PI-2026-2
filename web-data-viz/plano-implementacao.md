# Plano de Implementação — MJRewind

## 1) Objetivo do plano
Implementar o que está em `especificacao.md` sem codificar agora, definindo estrutura de arquivos, componentes, fluxo, regras, decisões técnicas e validações por etapa.

---

## 2) Arquivos a criar/alterar (planejado)

## Backend
- **Criar** `src/models/avaliacaoModel.js`  
  Consultas de avaliação e dashboard.
- **Criar** `src/controllers/avaliacaoController.js`  
  Validação de entrada + orquestração das respostas HTTP.
- **Criar** `src/routes/avaliacoes.js`  
  Rotas REST de avaliações e estatísticas.
- **Alterar** `app.js`  
  Registrar `app.use("/avaliacoes", avaliacaoRouter)`.
- **Alterar** `src/routes/usuarios.js`  
  Incluir rota `GET /usuarios/listar` (já usada no frontend atual) **ou** remover dependência no frontend (decisão na etapa 2).
- **Alterar** `src/controllers/usuarioController.js` e `src/models/usuarioModel.js`  
  Ajustar compatibilidade com schema (`id_usuario`) e retorno consistente para sessão.

## Banco de dados
- **Alterar** `src/database/MJRewind.sql`  
  - inserir seed dos 7 álbuns;  
  - garantir restrições (ex.: `UNIQUE(email)`);  
  - manter `CHECK nota BETWEEN 0 AND 10`.

## Frontend
- **Alterar** `public/cadastro.html`  
  Fluxo de cadastro + validações + decisão de uso (ou não) de `GET /usuarios/listar`.
- **Alterar** `public/login.html`  
  Ajustar contrato de resposta do login.
- **Alterar** `public/discografia.html`  
  Garantir sessão e corrigir referências de elementos de menu.
- **Alterar** `public/dashboard.html`  
  Trocar dados mockados por consumo real de API.
- **Alterar** `public/avaliacaoOTW.html`
- **Alterar** `public/avaliacaoTHR.html`
- **Alterar** `public/avaliacaoBAD.html`
- **Alterar** `public/avaliacaoDNG.html`
- **Alterar** `public/avaliacaoHIS.html`
- **Alterar** `public/avaliacaoBOTDF.html`
- **Alterar** `public/avaliacaoINV.html`  
  Padronizar validações e envio.
- **Criar** `public/minha-historia.html`  
  Tela prevista no escopo.
- **Criar** `public/js/avaliacao.js` *(recomendado)*  
  Script compartilhado para evitar duplicação nas 7 páginas.
- **Alterar** `public/index.html` e `public/indexLog.html`  
  Navegação para “Minha História” e consistência entre estados logado/não logado.

---

## 3) Componentes planejados

- **Componente de Autenticação**
  - Cadastro, login, sessão via `sessionStorage`.
  - Controle de acesso para envio de avaliação.

- **Componente de Discografia**
  - Lista dos 7 álbuns com navegação para páginas individuais.

- **Componente de Avaliação**
  - Formulário por álbum: nota, comentário, música favorita.
  - Regras de validação de campos.

- **Componente de Dashboard**
  - KPIs: álbum mais avaliado, total, nota média final.
  - Gráfico de barras por álbum.
  - Últimas 3 avaliações.

- **Componente de Dados (API + SQL)**
  - CRUD mínimo de avaliação (create + reads analíticos).
  - Consultas agregadas para dashboard.

---

## 4) Fluxo funcional (fim a fim)

1. Usuário acessa Home/Minha História.  
2. Usuário realiza cadastro e login.  
3. Sistema salva identificadores de sessão no navegador.  
4. Usuário acessa Discografia e escolhe um álbum.  
5. Usuário envia avaliação (nota, comentário, música favorita).  
6. API valida regras e grava no banco (`avaliacao` com `fk_usuario` e `fk_album`).  
7. Dashboard consulta API e exibe KPIs, gráfico e últimas 3 avaliações.

---

## 5) Regras de negócio (implementáveis)

- Somente usuário autenticado pode enviar avaliação.
- Nota obrigatória entre 0 e 10.
- Comentário e música favorita obrigatórios (não vazios após `trim`).
- Avaliação sempre vinculada a usuário e álbum existentes.
- Múltiplas avaliações por usuário são permitidas.
- Dashboard deve refletir dados persistidos no banco (sem dados mockados).

---

## 6) Decisões técnicas

1. **Manter stack atual**: HTML/CSS/JS puro + Node/Express + MySQL (sem framework SPA).
2. **Manter padrão MVC existente** no backend (`routes -> controllers -> models`).
3. **API dedicada para avaliações/dashboard** em `/avaliacoes`.
4. **Página por álbum mantida** (requisito de escopo), com **script compartilhado** para reduzir repetição.
5. **Autenticação no padrão atual do projeto** (sessão em `sessionStorage`), com validação server-side de `idUsuario` e vínculos no banco.
6. **Dados analíticos via SQL agregado** (mais simples e performático para o escopo).
7. **Compatibilização de schema e código**: alinhar `id_usuario`/`id` para evitar inconsistência.

---

## 7) Etapas numeradas com validação

### Etapa 1 — Consolidar modelo de dados
**Ação:** Ajustar `MJRewind.sql` (restrições + seed dos 7 álbuns).  
**Validar:**  
- Executar script sem erro.  
- `SELECT * FROM album;` retorna 7 registros esperados.  
- `INSERT` com nota fora do intervalo falha.

### Etapa 2 — Fechar contrato de autenticação
**Ação:** Alinhar `usuarioModel/controller/routes` com schema e retorno usado pelo frontend.  
**Validar:**  
- `POST /usuarios/cadastrar` cria usuário válido.  
- `POST /usuarios/autenticar` retorna `id` e `email`.  
- Login inválido retorna 403.

### Etapa 3 — Implementar API de avaliações
**Ação:** Criar `avaliacaoModel/controller/routes` e registrar em `app.js`.  
**Endpoints previstos:**  
- `POST /avaliacoes/cadastrar`  
- `GET /avaliacoes/dashboard/kpis`  
- `GET /avaliacoes/dashboard/por-album`  
- `GET /avaliacoes/dashboard/ultimas?limite=3`  
**Validar:**  
- Cadastro de avaliação com payload válido retorna 201/200.  
- Payload inválido retorna 400.  
- FK inválida retorna erro controlado (4xx).

### Etapa 4 — Padronizar telas de avaliação
**Ação:** Ajustar 7 páginas `avaliacao*.html` e extrair lógica comum para `public/js/avaliacao.js`.  
**Validar:**  
- Em cada álbum, formulário bloqueia campos inválidos.  
- Envio bem-sucedido mostra feedback e limpa campos.  
- Sem login, envio é bloqueado/redirecionado.

### Etapa 5 — Ajustar cadastro/login/discografia
**Ação:** Corrigir validações e navegação (`cadastro.html`, `login.html`, `discografia.html`).  
**Validar:**  
- Cadastro completo redireciona para login.  
- Login cria sessão no `sessionStorage`.  
- Discografia abre páginas corretas sem erro de JS no console.

### Etapa 6 — Implementar dashboard com dados reais
**Ação:** Substituir dados mockados de `dashboard.html` por `fetch` dos endpoints analíticos.  
**Validar:**  
- KPIs refletem banco.  
- Gráfico de barras mostra contagem correta por álbum.  
- Lista de últimas 3 avaliações está ordenada da mais recente para a mais antiga.

### Etapa 7 — Criar “Minha História” e alinhar navegação
**Ação:** Criar `public/minha-historia.html` e atualizar menus de `index.html`/`indexLog.html`.  
**Validar:**  
- Página acessível pelos menus.  
- Conteúdo coerente com contexto/objetivo do projeto.

### Etapa 8 — Teste integrado e checklist de aceite
**Ação:** Executar roteiro completo do usuário (cadastro -> login -> avaliação -> dashboard).  
**Validar (aceite):**  
- Todos os critérios do item 7 de `especificacao.md` atendidos.  
- Sem erros críticos no console/browser e sem erro 500 em fluxo nominal.

---

## 8) Riscos e atenção
- Inconsistência de naming entre banco e código (`id_usuario` vs `id`).  
- Duplicação de lógica nas 7 páginas de avaliação (mitigado com `public/js/avaliacao.js`).  
- Dependência de rota não existente (`/usuarios/listar`) no cadastro atual.  
- Segurança: SQL atual usa interpolação de string; ideal evoluir para consultas parametrizadas em iteração futura.
