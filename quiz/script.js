const questions = [
    {
      question: "Qual é a capital do Brasil?",
      choices: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
      answer: "Brasília",
    },
    {
      question: "Qual é a capital da Argentina?",
      choices: ["Buenos Aires", "Brasília", "Lisboa", "Paris"],
      answer: "Buenos Aires",
    },
    {
      question: "Qual é a capital da França?",
      choices: ["Roma", "Madri", "Paris", "Londres"],
      answer: "Paris",
    },
    {
      question: "Qual é a capital da Espanha?",
      choices: ["Lisboa", "Madri", "Barcelona", "Valência"],
      answer: "Madri",
    },
    {
      question: "Qual é a capital da Itália?",
      choices: ["Veneza", "Milão", "Roma", "Nápoles"],
      answer: "Roma",
    },
    {
      question: "Qual é a capital do Canadá?",
      choices: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      answer: "Ottawa",
    },
    {
      question: "Qual é a capital dos Estados Unidos?",
      choices: ["Nova York", "Los Angeles", "Chicago", "Washington"],
      answer: "Washington",
    },
    {
      question: "Qual é a capital do Reino Unido?",
      choices: ["Liverpool", "Manchester", "Edimburgo", "Londres"],
      answer: "Londres",
    },
  ];

// pega os elementos do HTML
const questionElement = document.querySelector("#questao")
const choiceElements = document.querySelectorAll(".respostas")
const next = document.querySelector("#next")
const score = document.querySelector("#acertos")
const erros = document.querySelector("#erros")

// variaveis
let contaQuestao = 0;
let pontos = 0;
let erradas = 0;
let respostaEscolhida = false // usada para permitir que o usuario responda a questao atual

// funções
function carregaPergunta(){
    const questao = questions[contaQuestao] // armazena todos os dados do JSON do indice indicado na variavel questao
    questionElement.innerText = questao.question // exibe a pergunta na tela acessando a chave question do JSON

    const respostas = embaralhar(questao.choices) // armazena todas as opções de resposta do JSON na variavel

    // percorre todos os elementos de botao para resposta e adiciona uma resposta
    for(let i = 0; i < choiceElements.length; i++){
        choiceElements[i].innerText = respostas[i]
    }

    respostaEscolhida = false
}

//função para embaralhar as respostas
function embaralhar(array){
    let indexAtual = array.length // salva o tamanho do array
    let auxiliar // vai ser usado para armazenar tal valor do array temporiariamente
    let randomIndex // gera um index randomico cujo item em auxiliar irá subtituir

    // esse loop rodara até que todos os campos de respostas sejam preechidos
    while(0 !== indexAtual) {
        randomIndex = Math.floor(Math.random() * indexAtual) // pega um index ramdomico dentros dos indices de indexAtual
        indexAtual -= 1; // decremente a qtd do indexAtual

        auxiliar = array[indexAtual] //guarda a resposta contida no array para o index atual
        array[indexAtual] = array[randomIndex] // substitui a resposta do array com indexAtual pelo ramdomico
        array[randomIndex] = auxiliar // guarda o valor do auxiliar no indice randomico do array
    }

    return array
}

function checarPergunta(e) {
    
    if(respostaEscolhida) return; // resposta ja for escolhida ele retorna da função

    respostaEscolhida = true; // caso nao isso vira true

    // verifica se o texto da açao é igual a resposta da questao
    if(e.target.innerText === questions[contaQuestao].answer){
        pontos++ // caso seja incrementa o ponto
        score.innerText = `Pontuação: ${pontos}` // atualiza a pontuação
        alert("Você Acertou!") // emite mensagem de acertou
    } else {
        erradas++ // caso seja diferente incremeta os erros
        erros.innerText = `Erros: ${erradas}` // atualiza no front
        alert(`Errado! A resposta correta é: ${questions[contaQuestao].answer}`) // emite alerta
    }
}

choiceElements.forEach((btn) => {btn.addEventListener("click", checarPergunta)}) // evento do click do botao de uma das respostas

next.addEventListener("click", () => {
    if(!respostaEscolhida){ // inpede que prossiga sem escolher a resposta da pergunta atual
        alert("Escolha uma opção para prosseguir!")
        return
    }
    contaQuestao++; // avança o contador de questao
    if(contaQuestao < questions.length){ // se ainda houver questoes carrega a seguinte
        carregaPergunta();
    } else {
        alert(`Fim de Jogo: acertou ${pontos} de ${questions.length}`) // quando nao ha mais questao declara o fim do jogo
        reiniciar() // reiniciar o jogo
    }
})

// função de reiniciar
function reiniciar(){
    contaQuestao = 0;
    pontos = 0;
    erradas = 0;
    score.innerText = `Pontuação: 0`
    erros.innerText = `Erros 0`
    carregaPergunta();
}

carregaPergunta()