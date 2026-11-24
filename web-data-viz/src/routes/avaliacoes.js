var express = require("express");
var router = express.Router();

var avaliacaoController = require("../controllers/avaliacaoController");

router.post("/cadastrar", function (req, res) {
    avaliacaoController.cadastrar(req, res);
});

router.get("/dashboard/kpis", function (req, res) {
    avaliacaoController.buscarKpis(req, res);
});

router.get("/dashboard/por-album", function (req, res) {
    avaliacaoController.buscarPorAlbum(req, res);
});

router.get("/dashboard/ultimas", function (req, res) {
    avaliacaoController.buscarUltimas(req, res);
});

module.exports = router;
