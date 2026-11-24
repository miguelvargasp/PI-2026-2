var avaliacaoModel = require("../models/avaliacaoModel");

function cadastrar(req, res) {
    var idUsuario = Number(req.body.idUsuarioServer);
    var album = (req.body.albumServer || "").trim();
    var nota = Number(req.body.notaServer);
    var musicaFavorita = (req.body.musicaServer || "").trim();
    var comentario = (req.body.comentarioServer || "").trim();

    if (!idUsuario || !Number.isInteger(idUsuario)) {
        return res.status(400).send("idUsuario inválido.");
    }

    if (album.length == 0) {
        return res.status(400).send("Álbum é obrigatório.");
    }

    if (Number.isNaN(nota) || nota < 0 || nota > 10) {
        return res.status(400).send("Nota deve estar entre 0 e 10.");
    }

    if (musicaFavorita.length == 0) {
        return res.status(400).send("Música favorita é obrigatória.");
    }

    if (comentario.length == 0 || comentario.length > 100) {
        return res.status(400).send("Comentário obrigatório e com no máximo 100 caracteres.");
    }

    Promise.all([
        avaliacaoModel.buscarUsuarioPorId(idUsuario),
        avaliacaoModel.buscarAlbumPorTitulo(album)
    ]).then(function ([resultadoUsuario, resultadoAlbum]) {
        if (resultadoUsuario.length == 0) {
            return res.status(404).send("Usuário não encontrado.");
        }

        if (resultadoAlbum.length == 0) {
            return res.status(404).send("Álbum não encontrado.");
        }

        var idAlbum = resultadoAlbum[0].id_album;

        avaliacaoModel.cadastrar(idUsuario, idAlbum, nota, comentario, musicaFavorita)
            .then(function () {
                res.status(201).json({ mensagem: "Avaliação cadastrada com sucesso." });
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao cadastrar avaliação.", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao validar vínculos da avaliação.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKpis(req, res) {
    Promise.all([
        avaliacaoModel.buscarAlbumMaisAvaliado(),
        avaliacaoModel.buscarTotaisDashboard()
    ]).then(function ([albumMaisAvaliado, totais]) {
        var albumKpi = albumMaisAvaliado[0] || {
            album: "-",
            quantidadeAvaliacoes: 0,
            notaMediaAlbum: null
        };

        var totaisKpi = totais[0] || {
            totalAvaliacoes: 0,
            notaMediaGeral: null
        };

        res.status(200).json({
            albumMaisAvaliado: albumKpi,
            totalAvaliacoes: totaisKpi.totalAvaliacoes || 0,
            notaMediaGeral: totaisKpi.notaMediaGeral
        });
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar KPIs.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPorAlbum(req, res) {
    avaliacaoModel.buscarQuantidadePorAlbum()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar dados por álbum.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarUltimas(req, res) {
    var limite = Number(req.query.limite) || 3;

    if (!Number.isInteger(limite) || limite <= 0) {
        return res.status(400).send("Parâmetro limite inválido.");
    }

    avaliacaoModel.buscarUltimasAvaliacoes(limite)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar últimas avaliações.", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    cadastrar,
    buscarKpis,
    buscarPorAlbum,
    buscarUltimas
};
