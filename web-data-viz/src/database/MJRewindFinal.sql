CREATE DATABASE mjrewind;
USE mjrewind;

CREATE TABLE usuario (
  id_usuario INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_usuario),
  CONSTRAINT uq_usuario_email UNIQUE (email),
  CONSTRAINT chk_usuario_email CHECK (email LIKE '%@%')
);

CREATE TABLE album (
  id_album INT NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(45) NOT NULL,
  faixas INT NOT NULL,
  ano_lancamento CHAR(4) NOT NULL,
  PRIMARY KEY (id_album)
);

CREATE TABLE avaliacao (
  id_avaliacao INT NOT NULL AUTO_INCREMENT,
  fk_usuario INT NOT NULL,
  fk_album INT NOT NULL,
  nota DECIMAL(3,1) NOT NULL,
  comentario VARCHAR(100) NULL,
  musica_favorita VARCHAR(45) NULL,
  PRIMARY KEY (id_avaliacao, fk_usuario, fk_album),
  CONSTRAINT chk_avaliacao_nota CHECK (nota BETWEEN 0 AND 10.0),
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
