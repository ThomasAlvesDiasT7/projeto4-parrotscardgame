/** ---- VARIÁVEIS GLOBAIS ---- */

const MIN_CARTAS = 4;
const MAX_CARTAS = 14;
const PAPAGAIOS = [
  "bobrossparrot", "explodyparrot", "fiestaparrot", 
  "metalparrot", "revertitparrot", "tripletsparrot", 
  "unicornparrot"
];

// inicializações
let qtdCartas = 0;
let qtdJogadas = 0;
let jogada = [];
let baralho = [];
let tempoDecorrido = 0;
let intervalo = 0;

/** ---- INÍCIO DO JOGO ---- */

obterNumeroCartas();
intervalo = setInterval(aumentarTempo, 1000); // iniciar contagem
criarCartasDinamicamente();
embaralharCartas();
inserirCartasNaTela();

/** ---- DECLARAÇÕES ---- */

function obterNumeroCartas() {
  while(!isQtdCartasValida()) {
    qtdCartas = prompt(`Insira a quantidade de cartas (${MIN_CARTAS} a ${MAX_CARTAS})`) * 1; // parseInt()
  }
}

function isQtdCartasValida() {
  const isPar = qtdCartas % 2 === 0;
  const isQtdValida = qtdCartas >= MIN_CARTAS && qtdCartas <= MAX_CARTAS;
  
  return isPar && isQtdValida;
}

function criarCartasDinamicamente() {
  const qtdPares = qtdCartas/2;
  for(let i = 0; i < qtdPares; i++) {
    const carta = construirCarta(i);
    baralho.push(carta);
    baralho.push(carta);
  }

  return baralho;
}

function construirCarta(indicePapagaio) {
  const papagaio = PAPAGAIOS[indicePapagaio];
  const cartaPapagaio = `
  <div class="carta" onclick="selecionarCarta(this)">
    <div class="face-carta frente">
      <img src="img/front.png" alt="${papagaio}" />
    </div>
    <div class="face-carta verso">
      <img src="img/${papagaio}.gif" alt="${papagaio}" />
    </div>
  </div>
  `;

  return cartaPapagaio;
}

function selecionarCarta(div) {
  if(isCartaValida(div)) {
    div.classList.add("selecionado");
    jogada.push(div);
  
    if(jogada.length === 2) {
      checarCartasIguais();
    }
  }
}

function isCartaValida(div) {
  return !div.classList.contains("selecionado") || 
    !div.classList.contains("finalizado");
}

function checarCartasIguais() {
  const primeiraCarta = jogada[0];
  const segundaCarta = jogada[1];

  if(primeiraCarta.innerHTML === segundaCarta.innerHTML) {
    primeiraCarta.classList.add("finalizado");
    segundaCarta.classList.add("finalizado");
    setTimeout(checarFinalJogo, 500);
  } else {
    setTimeout(virarCartasDoAvesso, 1000);
  }
  
  qtdJogadas++;
}

function embaralharCartas() {
  return baralho.sort(comparador);
}

function comparador() {
  return Math.random() - 0.5;
}

function inserirCartasNaTela() {
  const container = document.querySelector(".container");
  for(let i = 0; i < baralho.length; i++) {
    container.innerHTML += baralho[i];
  }
}

function checarFinalJogo() {
  const cartasViradas = document.querySelectorAll(".finalizado").length;
  if(qtdCartas === cartasViradas) {
    clearInterval(intervalo);
    alert(`Booooa! Você finalizou essa paradinha em ${qtdJogadas} jogada(s) e apenas ${tempoDecorrido} segundos!`);
    reiniciarSeForNecessario();
  }
  jogada = [];
}

function virarCartasDoAvesso() {
  jogada[0].classList.remove("selecionado");
  jogada[1].classList.remove("selecionado");
  jogada = [];
}

function aumentarTempo() {
  tempoDecorrido++;
  document.querySelector(".tempo").innerHTML = tempoDecorrido;
}

function reiniciarSeForNecessario() {
  const resposta = prompt("Deseja reiniciar? (s ou n)");
  if(resposta === `s`) { window.location.reload(true); }
}