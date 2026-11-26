# MJ Rewind — Site Inicial

## Contextualização
A indústria da música segue como um dos principais pilares do entretenimento global. Nesse cenário, Michael Jackson ocupa posição central por sua inovação artística, impacto cultural e legado histórico — com destaque para *Thriller* (1982), reconhecido como o álbum mais vendido de todos os tempos.

Este projeto nasce para valorizar essa importância, aproximando o público (especialmente a geração Z) da discografia de Michael Jackson por meio de uma experiência de avaliação, comentário e registro de músicas favoritas.

## Objetivo do projeto
Criar uma plataforma em que o usuário possa:
- se cadastrar e autenticar;
- acessar a discografia principal de Michael Jackson (fase com controle criativo);
- avaliar álbuns;
- registrar comentários e música favorita;
- acompanhar estatísticas em dashboard.

## Funcionalidades principais
- **Home (antes do login)** com apresentação do tema.
- **Página “Minha História”** com contexto pessoal do projeto.
- **Cadastro/Login** com validações.
- **Discografia** com os álbuns:
  - Off the Wall (1979)
  - Thriller (1982)
  - Bad (1987)
  - Dangerous (1991)
  - HIStory (1995)
  - Blood on the Dance Floor (1997)
  - Invincible (2001)
- **Tela de avaliação por álbum**, contendo:
  - nota (0 a 10),
  - comentário breve,
  - música favorita.
- **Dashboard interativa** com:
  - KPIs (álbum mais avaliado, total de avaliações e nota consolidada),
  - gráfico de barras por quantidade de avaliações,
  - últimas 3 avaliações.

## Escopo
Inclui:
- fluxo completo de autenticação e navegação entre páginas;
- avaliação individual por álbum;
- consolidação e visualização de dados na dashboard.

Não inclui (nesta fase):
- catálogo completo pós-2001;
- recursos sociais avançados (seguir usuários, curtidas, etc.).

## Requisitos e premissas
- Conexão com internet.
- Interesse em música.
- Leitura e escrita para preenchimento das avaliações.
- Usuário com conhecimento básico sobre Michael Jackson (recomendado).

## Regras de negócio
- Campos de cadastro/login obrigatórios e validados.
- Campos de avaliação obrigatórios e validados.
- Cada álbum possui página própria de avaliação.
- O sistema deve exibir alertas para entradas vazias ou inválidas.

## Relacionamento com ODS (ONU)
O projeto se conecta a:
- **Saúde e bem-estar**: incentivo à imersão musical.
- **Redução das desigualdades**: reflexão sobre temas sociais presentes em álbuns como *Dangerous* e *HIStory*.

## Modelagem lógica (resumo)
Entidades principais:
- `usuario`
- `album`
- `avaliacao`

Relacionamentos:
- um usuário pode realizar várias avaliações;
- um álbum pode receber várias avaliações;
- cada avaliação associa um usuário a um álbum.

## Estrutura de documentação
- `siteinicial/Documentação/A importância de Michael Jackson para a indústria da música.pdf`
- este `README.md` (resumo funcional e contextual do projeto)

## Autor
- **Miguel Perez Vargas**
