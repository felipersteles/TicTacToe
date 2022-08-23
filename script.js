
//----------------------------------------------------------------------------------------

//Gameplay stuffs

//----------------------------------------------------------------------------------------


const X_CLASS = 'x' //Classe X
const CIRCLE_CLASS = 'circle' //Classe circle

// Todas as combinacoes possiveis numa matrix 3x3
const WINNING_COMBINATIONS = [  
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//Declarando as celulas e o tabuleiro
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

//Declarando as mensagens de fim de partida
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

//Declarando o butao de reiniciar o jogo
const restartButton = document.getElementById('restartButton')

//Bool para verificar o turno
let circleTurn = false;

startGame()
restartButton.addEventListener('click', startGame)

//inicia o jogo
//Geralmente função Start() no unity mas como a funcao tem que ser chama em js nao alterar em codigos futuros
function startGame() {
    circleTurn = false

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })

    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

//ao clicar na celula
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

    //Metodos - funcoes - fucntions
    // Check for win
    // Check for draw
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        //console.log('alguem venceu')
        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else {
        // Switch Turns
        swapTurns()
        setBoardHoverClass()
    }
}

// After
function endGame(draw) { //Analisar se foi empate
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

//retorna true se a partida nao tiver vencedor
function isDraw() {
    //
    return [...cellElements].every(cell => { //verificar se toda celula foi preenchida
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS) //e se a celula ja tem uma classe
    })
}

//place Mark
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// Switch Turns
function swapTurns() {
    circleTurn = !circleTurn
}

// add a class to board to turn with circleTurn
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn)
        board.classList.add(CIRCLE_CLASS)
    else
        board.classList.add(X_CLASS)
}

//retorna true se a partida tiver vencedor
function checkWin(currentClass) {
    
    return WINNING_COMBINATIONS.some(combinations => { //Retorna verdadeiro caso qualquer uma das combinações ocorra
        return combinations.every(index => { //cada combinacao tenha a mesma classe
            return cellElements[index].classList.contains(currentClass) // Garante  que todos elementos de cell retornados pra vencer sejam da mesma classe
        })
    })
}