//Login stuffs

const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')

const form = document.getElementById('form')
const errorElement = document.getElementById('error')

const confronto = document.getElementById('confronto')

form.addEventListener('submit', (e) => {
    let messages = []

    if (player1.value == '' || player1.value == null) {
        messages.push('Preencha o nome do primeiro jogador')
        //console.log('player 1 nao preenchiido')
    } 
        
    if (player2.value == '' || player2.value == null){
        messages.push('Preencha o nome do segundo jogador')
        //console.log('player 2 nao preenchiido')
    }

    e.preventDefault()
    
    if (messages.length > 0) {
        errorElement.innerText = messages.join('\n')
    } else{
        window.location.href = "game.html";
        confronto.innerText = player1 + "\nVS\n" + player2
    }
})
