const audios = document.querySelectorAll("audio");

function configurarPlayer(idAudio, idBotao, idStatus, nome) {
    const audio = document.getElementById(idAudio);
    const botao = document.getElementById(idBotao);
    const status = document.getElementById(idStatus);

    audio.addEventListener("play", function () {
        status.textContent = "Tocando: " + nome;
        botao.textContent = "Pausar " + nome;
    });

    audio.addEventListener("pause", function () {
        status.textContent = nome + " pausado";
        botao.textContent = "Tocar " + nome;
    });

    botao.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
}

configurarPlayer("audio-hino", "btn-tocar", "status", "Hino de Curitiba");
configurarPlayer("audio-cidade", "btn-tocar-cidade", "status-cidade", "Som da cidade");

for (let i = 0; i < audios.length; i++) {
    const audio = audios[i];

    audio.addEventListener("play", function () {
        for (let j = 0; j < audios.length; j++) {
            if (audios[j] !== audio) {
                audios[j].pause();
            }
        }
    });
}
