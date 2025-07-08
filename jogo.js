let iniciadoPrimeira = false;
let balao;
let quant_baloes;
console.log(balao)


function iniciaJogo() {

 if (iniciadoPrimeira) {
	document.getElementById('cenario').remove();
	console.log(iniciadoPrimeira);
	console.log(i);
 }


	var nivel_jogo = document.getElementById('nivel_jogo').value;


	var tempo_segundos = 0;

	if (nivel_jogo == 1) {
		tempo_segundos = 120;
	}

	if (nivel_jogo == 2) {
		tempo_segundos = 60;
	}

	if (nivel_jogo == 3) {
		tempo_segundos = 30;
	}

	document.getElementById('cronometro').innerHTML = tempo_segundos;

	 quant_baloes = 20;


	cria_baloes(quant_baloes);

	document.getElementById('baloes_inteiros').innerHTML = quant_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1);

}

function contagem_tempo(segundos) {
	segundos = segundos - 1;
	if (segundos == -1) {
		clearTimeout(timeId);
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	timeId = setTimeout('contagem_tempo(' + segundos + ')', 1000);
}

function cria_baloes(quant_baloes) {
	for (i = 1; i <= quant_baloes; i++) {
		balao = document.createElement("img");
		balao.src = 'imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b' + i;
		balao.onclick = function () { estourar(this) }
		document.getElementById('cenario').appendChild(balao);
		iniciadoPrimeira = true;

	}

}

function pontuacao(acao) {
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situaco_jogo(baloes_inteiros, baloes_estourados);
}

function estourar(e) {
	var id_balao = e.id;
	document.getElementById(id_balao).setAttribute("onclick", "");
	document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";
	pontuacao(-1);
}

function situaco_jogo(baloes_inteiros, baloes_estourados) {
	if (baloes_inteiros == 0) {
		alert('Parabéns, você conseguiu estourar os balões a tempo.');
		parar_jogo();
	}
}

function parar_jogo() {
	clearTimeout(timeId);
}

function game_over() {
	alert("Que pena, você não conseguiu estourar os balões a tempo.");
}