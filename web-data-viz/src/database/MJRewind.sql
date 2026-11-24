CREATE DATABASE mjrewind;
USE mjrewind;

CREATE TABLE usuario (
  id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  CONSTRAINT uq_usuario_email
    UNIQUE (email),
  CONSTRAINT chk_usuario_email
    CHECK (email LIKE '%@%')
);

CREATE TABLE album (
  id_album INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(45) NOT NULL,
  faixas INT NOT NULL,
  ano_lancamento CHAR(4) NOT NULL
);

CREATE TABLE avaliacao (
  id_avaliacao INT NOT NULL AUTO_INCREMENT,
  fk_usuario INT NOT NULL,
  fk_album INT NOT NULL,
  nota DECIMAL(3,1) NOT NULL,
  comentario VARCHAR(100) NULL,
  musica_favorita VARCHAR(45) NULL,
  PRIMARY KEY (id_avaliacao),
  CONSTRAINT chk_avaliacao_nota
    CHECK (nota BETWEEN 0 AND 10.0),
  CONSTRAINT fk_avaliacao_usuario
    FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_avaliacao_album
    FOREIGN KEY (fk_album) REFERENCES album (id_album)
);

INSERT INTO album (titulo, faixas, ano_lancamento) VALUES
('Off the Wall', 10, '1979'),
('Thriller', 9, '1982'),
('Bad', 11, '1987'),
('Dangerous', 14, '1991'),
('HIStory', 15, '1995'),
('Blood on the Dance Floor', 13, '1997'),
('Invincible', 16, '2001');


SELECT a.titulo,
       ROUND(AVG(av.nota), 1) AS nota_media
FROM avaliacao av
JOIN album a ON a.id_album = av.fk_album
GROUP BY a.id_album, a.titulo
ORDER BY AVG(av.nota) DESC, COUNT(*) DESC
LIMIT 1;


SELECT COUNT(*) AS total_avaliacoes
FROM avaliacao;


SELECT musica_favorita,
       COUNT(*) AS quantidade
FROM avaliacao
WHERE musica_favorita IS NOT NULL
  AND musica_favorita <> ''
GROUP BY musica_favorita
ORDER BY quantidade DESC, musica_favorita
LIMIT 1;
