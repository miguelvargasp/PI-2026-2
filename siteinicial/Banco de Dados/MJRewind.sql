CREATE DATABASE mjrewind;
USE mjrewind;

CREATE TABLE usuario (
  id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
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
  PRIMARY KEY (id_avaliacao, fk_usuario, fk_album),
  CONSTRAINT chk_avaliacao_nota
    CHECK (nota BETWEEN 0 AND 10.0),
  CONSTRAINT fk_avaliacao_usuario
    FOREIGN KEY (fk_usuario) REFERENCES usuario (id_usuario),
  CONSTRAINT fk_avaliacao_album
    FOREIGN KEY (fk_album) REFERENCES album (id_album)
);