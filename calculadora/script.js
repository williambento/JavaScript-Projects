// selecionando elementos do HTML
// basicamente eu uso querySelector e passo o id ou class do objeto html
const display = document.querySelector("#displayInput")
const botaoIgual = document.querySelector(".igual")
const botaoPonto = document.querySelector(".ponto")
const botoesNum = document.querySelectorAll(".num")
const botoesOperadores = document.querySelectorAll(".operador")
const botaoReset = document.querySelector("#reset")

// variaveis
let operacaoAtual = "";
let operado = null;
let valorAnterior = "";
let calculando = false;

// funções
function atualizaDisplay() {
    // atualiza o display mostrando no input a operação atual
    display.value = operacaoAtual
}

function insereNumero(evento) {
    if (calculando) {
        // pega o item de texto do evento no caso do botao clicado
        operacaoAtual = evento.target.textContent
        calculando = false
    } else {
        operacaoAtual += evento.target.textContent
    }
    atualizaDisplay()
}

function inserePonto() {
    if (operacaoAtual.indexOf(".") === -1) {
        operacaoAtual += "."
        atualizaDisplay()
    }
}

function calcula() {
    let resultado

    // converte os dados de string para float
    const operandoAnterior = parseFloat(valorAnterior)
    const operandoAtual = parseFloat(operacaoAtual)

    // conforme cada operador é identificado um case é executado
    switch (operado) {
        case "+":
            resultado = operandoAnterior + operandoAtual
            break
        case "-":
            resultado = operandoAnterior - operandoAtual
            break
        case "*":
            resultado = operandoAnterior * operandoAtual
            break
        case "/":
            resultado = operandoAnterior / operandoAtual
            break
    }

    operacaoAtual = String(resultado) // passa o resultado para a operação atual
    valorAnterior = operacaoAtual // valor anterior recebe o valor atual
    calculando = true
    atualizaDisplay()
}

function insereOperador(evento) {
    // se a operação atual nao estiver vazia, ou seja algo ja foi digitado
    if (operacaoAtual !== "") {
        // se calculando for falso, ou seja não há nenhuma operação ainda
        if (!calculando) {
            // se o operador for nulo
            if (operado !== null) {
                calcula()
            }
            // caso o operador nao seja nulo o valor atual é guardado em outra variavel para futuras contas
            valorAnterior = operacaoAtual;
            operacaoAtual = ""; // operação atual recebe vazio para aceitar outros valores
        }
        // operador recebe o texto do botao clicado
        operado = evento.target.textContent
    }
}

function resetar(){
    operacaoAtual = ""
    operado = null
    calcula = false
    atualizaDisplay()
}

//eventos
// criar uma especie de ouvinte a cada click em um botao do tipo numero a função insere numero é chamada
botoesNum.forEach((botao) => botao.addEventListener("click", insereNumero))
botaoPonto.addEventListener("click", inserePonto)
botoesOperadores.forEach((botao) => botao.addEventListener("click", insereOperador))
botaoIgual.addEventListener("click", calcula)
botaoReset.addEventListener("click", resetar)