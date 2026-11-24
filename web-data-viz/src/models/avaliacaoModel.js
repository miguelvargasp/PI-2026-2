var database = require("../database/config");

function buscarUsuarioPorId(idUsuario) {
    var instrucaoSql = `
        SELECT id_usuario
        FROM usuario
        WHERE id_usuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlbumPorTitulo(titulo) {
    var instrucaoSql = `
        SELECT id_album, titulo
        FROM album
        WHERE LOWER(titulo) = LOWER('${titulo}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(idUsuario, idAlbum, nota, comentario, musicaFavorita) {
    var instrucaoSql = `
        INSERT INTO avaliacao (fk_usuario, fk_album, nota, comentario, musica_favorita)
        VALUES (${idUsuario}, ${idAlbum}, ${nota}, '${comentario}', '${musicaFavorita}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlbumMaisAvaliado() {
    var instrucaoSql = `
        SELECT
            a.titulo AS album,
            COUNT(av.id_avaliacao) AS quantidadeAvaliacoes,
            ROUND(AVG(av.nota), 1) AS notaMediaAlbum
        FROM album a
        LEFT JOIN avaliacao av ON av.fk_album = a.id_album
        GROUP BY a.id_album, a.titulo
        ORDER BY COUNT(av.id_avaliacao) DESC, AVG(av.nota) DESC, a.titulo
        LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarTotaisDashboard() {
    var instrucaoSql = `
        SELECT
            COUNT(*) AS totalAvaliacoes,
            ROUND(AVG(nota), 1) AS notaMediaGeral
        FROM avaliacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarQuantidadePorAlbum() {
    var instrucaoSql = `
        SELECT
            a.titulo AS album,
            COUNT(av.id_avaliacao) AS quantidade
        FROM album a
        LEFT JOIN avaliacao av ON av.fk_album = a.id_album
        GROUP BY a.id_album, a.titulo
        ORDER BY a.ano_lancamento;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasAvaliacoes(limite) {
    var instrucaoSql = `
        SELECT
            av.id_avaliacao AS id,
            a.titulo AS album,
            av.nota,
            av.musica_favorita AS musicaFavorita,
            av.comentario
        FROM avaliacao av
        JOIN album a ON a.id_album = av.fk_album
        ORDER BY av.id_avaliacao DESC
        LIMIT ${limite};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUsuarioPorId,
    buscarAlbumPorTitulo,
    cadastrar,
    buscarAlbumMaisAvaliado,
    buscarTotaisDashboard,
    buscarQuantidadePorAlbum,
    buscarUltimasAvaliacoes
};
