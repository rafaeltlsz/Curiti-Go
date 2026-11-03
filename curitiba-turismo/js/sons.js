const audioHino = document.getElementById("audio-hino");
const statusAudio = document.getElementById("status");
const botao = document.getElementById("btn-tocar");
const audioElements = document.querySelectorAll("audio");

audioHino.addEventListener("play", function () {
    statusAudio.textContent = "Tocando: Hino de Curitiba";
    botao.textContent = "Pausar Hino de Curitiba";
});

audioHino.addEventListener("pause", function () {
    statusAudio.textContent = "Hino de Curitiba pausado";
    botao.textContent = "Tocar Hino de Curitiba";
});

botao.addEventListener("click", function () {
    if (audioHino.paused) {
        audioHino.play();
    } else {
        audioHino.pause();
    }
});

for (let i = 0; i < audioElements.length; i++) {
    const audio = audioElements[i];
    audio.addEventListener("play", function () {
        for (let j = 0; j < audioElements.length; j++) {
            if (audioElements[j] !== audio) {
                audioElements[j].pause();
            }
        }
    });
}