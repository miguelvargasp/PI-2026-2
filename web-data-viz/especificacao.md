# Plano de Especificação

## 1. Contexto
A indústria musical global segue em expansão, com destaque para o streaming e para a valorização de catálogos. Nesse cenário, Michael Jackson permanece como uma das figuras mais relevantes da história da música, com impacto cultural duradouro e forte presença intergeracional.  
O projeto propõe um site temático para registrar e compartilhar percepções sobre os álbuns de estúdio de Michael Jackson sob controle criativo em vida, conectando fãs e pessoas que desejam conhecer mais sobre sua obra.

## 2. Objetivo
Desenvolver uma plataforma web para:
- celebrar o legado musical de Michael Jackson;
- permitir cadastro e autenticação de usuários;
- possibilitar avaliação de álbuns com nota, comentário e música favorita;
- oferecer visualização analítica das avaliações por meio de dashboard.

## 3. Escopo
Inclui:
- Tela Home;
- Tela “Minha História”;
- Tela de Cadastro/Login;
- Home pós-login com acesso à discografia;
- Páginas de avaliação individuais para os 7 álbuns:
  - Off The Wall (1979)
  - Thriller (1982)
  - Bad (1987)
  - Dangerous (1991)
  - HIStory (1995)
  - Blood On The Dance Floor (1997)
  - Invincible (2001)
- Tela de Estatísticas (Dashboard).

Não inclui (neste plano):
- catálogo além dos 7 álbuns definidos;
- recursos de rede social avançados (seguir usuários, mensagens privadas etc.).

## 4. Funcionalidades
- Cadastro de usuário com validação de campos.
- Login com validação de credenciais.
- Navegação pela discografia.
- Avaliação por álbum com os campos:
  - nota (0 a 10);
  - comentário breve;
  - música favorita.
- Possibilidade de múltiplas avaliações por usuário (registro pessoal e tabela N:N no banco de dados).
- Dashboard interativo com:
  - KPIs (álbum mais avaliado, total de avaliações, nota final/média);
  - gráfico de barras de quantidade de avaliações por álbum;
  - listagem das 3 últimas avaliações (álbum, nota, música favorita e comentário).

## 5. Regras de negócio
- Apenas usuários autenticados podem registrar avaliações.
- Cada avaliação deve estar vinculada a um usuário e a um álbum existente.
- Nota obrigatória no intervalo de 0 a 10.
- Comentário e música favorita devem ser validados para não aceitar campos vazios.
- Sistema deve exibir alertas para campos ausentes ou inválidos em cadastro, login e avaliação.
- Cada álbum possui página própria de avaliação.
- Dashboard deve refletir os dados cadastrados em tempo de consulta.

## 6. Interface
- Interface web com navegação simples e foco em conteúdo musical.
- Estrutura mínima de telas:
  - Home (apresentação do projeto);
  - Minha História (contextualização pessoal e propósito);
  - Cadastro/Login;
  - Discografia (cards/lista de álbuns);
  - Avaliação por álbum (formulário objetivo);
  - Dashboard (KPIs, gráfico e últimas avaliações).
- Boas práticas de UX:
  - feedback imediato em validações;
  - legibilidade de textos e dados;
  - consistência visual entre páginas.

## 7. Critérios de aceitação
- Usuário consegue criar conta e fazer login com sucesso.
- Sistema bloqueia submissões com campos inválidos e exibe mensagens claras.
- Usuário autenticado consegue acessar os 7 álbuns e abrir a página de avaliação de cada um.
- Avaliação só é salva quando todos os campos obrigatórios estiverem válidos.
- Dashboard exibe corretamente:
  - álbum mais avaliado;
  - total de avaliações;
  - nota final/média;
  - gráfico de barras por álbum;
  - 3 avaliações mais recentes.
- Dados exibidos no dashboard condizem com os registros inseridos.
