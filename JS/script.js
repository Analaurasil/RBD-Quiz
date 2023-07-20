import perguntas from "../JS/perguntas.js";
const respostasElement = document.querySelector(".respostas");
const perguntasElement = document.querySelector(".perguntas");
const Qtd = document.querySelector(".Qtd");
const textoFinal = document.querySelector(".fim span");
const conteudo = document.querySelector(".conteudo");
const conteudoFinal = document.querySelector(".fim");
const botaoReiniciar = document.querySelector(".fim button");

let currentIndex = 0;
let perguntaCorreta = 0;

botaoReiniciar.onclick = () => {
  conteudo.style.display = "flex";
  conteudoFinal.style.display = "none";

  currentIndex = 0;
  perguntaCorreta = 0;
  loadPergunta();
};

function nextPergunta(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    perguntaCorreta++;
  }

  if (currentIndex < perguntas.length - 1) {
    currentIndex++;
    loadPergunta();
  } else {
    finish();
  }
}

function finish() {
  textoFinal.innerHTML = `Você acertou ${perguntaCorreta} de ${perguntas.length}`;
  conteudo.style.display = "none";
  conteudoFinal.style.display = "flex";
}

function loadPergunta() {
  Qtd.innerHTML = `${currentIndex + 1}/${perguntas.length}`;
  const item = perguntas[currentIndex];
  respostasElement.innerHTML = "";
  perguntasElement.innerHTML = item.pergunta;

  item.respostas.forEach((resposta) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <button class="resposta" data-correct="${resposta.correct}">
      ${resposta.option}
    </button>
    `;

    respostasElement.appendChild(div);
  });

  document.querySelectorAll(".resposta").forEach((item) => {
    item.addEventListener("click", nextPergunta);
  });
}

loadPergunta();
