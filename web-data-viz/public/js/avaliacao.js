function configurarPaginaAvaliacao(album) {
  const idUsuario = sessionStorage.getItem("ID_USUARIO");

  if (idUsuario) {
    const menuCadastro = document.getElementById("menu_cadastro");
    const menuLogin = document.getElementById("menu_login");
    const linkLogo = document.getElementById("link_logo");

    if (menuCadastro) menuCadastro.style.display = "none";
    if (menuLogin) menuLogin.style.display = "none";
    if (linkLogo) linkLogo.href = "indexLog.html";
  }

  window.avaliar = function () {
    if (!sessionStorage.getItem("ID_USUARIO")) {
      mostrarMensagem("Você precisa estar logado para avaliar. Redirecionando...", false);
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
      return false;
    }

    let notaVar = inp_nota.value;
    let musicaVar = inp_musica.value.trim();
    let comentarioBruto = inp_comentario.value;
    let comentarioVar = comentarioBruto.trim();

    if (notaVar == "" || musicaVar == "" || comentarioVar == "") {
      mostrarMensagem("Preencha todos os campos!", false);
      return false;
    } else if (isNaN(Number(notaVar)) || !(Number(notaVar) >= 0 && Number(notaVar) <= 10)) {
      mostrarMensagem("A nota deve ser um número de 0 a 10!", false);
      return false;
    } else if (comentarioBruto.length > 100) {
      mostrarMensagem("O comentário deve ter no máximo 100 caracteres!", false);
      return false;
    } else {
      fetch("/avaliacoes/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idUsuarioServer: sessionStorage.ID_USUARIO,
          albumServer: album,
          notaServer: Number(notaVar),
          musicaServer: musicaVar,
          comentarioServer: comentarioVar
        })
      })
        .then(function (resposta) {
          if (resposta.ok) {
            mostrarMensagem("Avaliação enviada com sucesso!", true);
            inp_nota.value = "";
            inp_musica.value = "";
            inp_comentario.value = "";
          } else {
            return resposta.text().then((textoErro) => {
              throw textoErro || "Houve um erro ao tentar enviar a avaliação!";
            });
          }
        })
        .catch(function (erro) {
          console.log(`#ERRO: ${erro}`);
          mostrarMensagem(String(erro), false);
        });

      return false;
    }
  };
}

function mostrarMensagem(texto, sucesso) {
  const msg = document.getElementById("mensagem_erro");
  msg.innerHTML = texto;
  msg.className = sucesso ? "mensagem sucesso" : "mensagem";
}

function converterMaiuscula(campo) {
  const inicio = campo.selectionStart;
  const fim = campo.selectionEnd;
  campo.value = campo.value.toUpperCase();
  campo.setSelectionRange(inicio, fim);
}
