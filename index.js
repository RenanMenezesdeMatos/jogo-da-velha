// Variaveis de captura de botões
const player01 = document.getElementById('player-01')
const player02 = document.getElementById('player-02')

// Variáveis de captura de valores do jogo da velha
let boardRegions = document.querySelectorAll('.click')
let table = []
let turnPlayer = ''

// Arrays que controla os placares
let placarPlayer01 = []
let placarPlayer02 = []
let keepPlaying = document.getElementById('butom-yes')

// Variáveis para reset do game
let popUpReset = document.getElementsByClassName('pop-up-reset')
let oldGame = document.getElementsByClassName('old-game')

//keepPlaying.addEventListener('click', initializeGame)

//Capturar Valores do Input e Desabilitando o canal

player01.addEventListener('click', function(){

    const inputPlayer01 = document.getElementById('scoreboard01')
    const containerPlayer01 = document.getElementById('section-scoreboar-01')

    let playerName01 = document.createElement('label')
    playerName01.htmlFor = 'scoreboard01'
    playerName01.id = 'player-name-01'
    playerName01.innerText = (inputPlayer01).value

    containerPlayer01.appendChild(playerName01)

    inputPlayer01.value=''

    if(playerName01 !== null){
        inputPlayer01.setAttribute('disabled', inputPlayer01.disebled);
        player01.style.display = 'none'
        inputPlayer01.style.borderRadius = '10px'
    }

    startGame()

})

player02.addEventListener('click', function(){

    const inputPlayer02 = document.getElementById('scoreboard02')
    const containerPlayer02 = document.getElementById('section-scoreboar-02')

    let playerName02 = document.createElement('label')
    playerName02.htmlFor = 'scoreboard02'
    playerName02.id = 'player-name-02'
    playerName02.innerText = (inputPlayer02).value

    containerPlayer02.appendChild(playerName02)

    inputPlayer02.value=''

    if(playerName02 !== null){
        inputPlayer02.setAttribute('disabled', inputPlayer02.disebled);
        player02.style.display = 'none'
        inputPlayer02.style.borderRadius = '10px'
    }

    startGame()

})

//Fim da captura de valores de input 


function updateTitle(){

    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turn-player').innerText = 'aaaa'

}

function initializeGame(){
    table = [['','',''],['','',''],['','','']]
    turnPlayer = 'player-name-01'
    document.querySelector('h1').innerHTML = "<span id='turn-player' class='jogador01'>JOGADOR DA RODADA</span>"
    updateTitle()
    boardRegions.forEach(function(element){
        element.classList.remove('win')//criar classe no CSS com win
        element.innerText = ''
        element.addEventListener('click', handleBoardClick)
        element.classList = 'click'
        element.cursor = 'pointer'

        popUpReset.classList='pop-up-reset' // With display none
        oldGame.classList='old-game-initialize' // With display flex

    })
}

function getWinRegions(){
    const winRegions = []
    if (table[0][0] && table[0][0] === table[0][1] && table[0][0] === table[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (table[1][0] && table[1][0] === table[1][1] && table[1][0] === table[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (table[2][0] && table[2][0] === table[2][1] && table[2][0] === table[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (table[0][0] && table[0][0] === table[1][0] && table[0][0] === table[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (table[0][1] && table[0][1] === table[1][1] && table[0][1] === table[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (table[0][2] && table[0][2] === table[1][2] && table[0][2] === table[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (table[0][0] && table[0][0] === table[1][1] && table[0][0] === table[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (table[0][2] && table[0][2] === table[1][1] && table[0][2] === table[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions

}

function resetGame(){

    document.getElementsByClassName('pop-up-reset').classList.remove('pop-up-reset')
    document.getElementsByClassName('old-game').classList.remove('old-game')
    
}

function disableRegion(element){
    element.style.cursor = 'default'
    element.removeEventListener('click', handleBoardClick)
}

function disebledAllRegions (){
    boardRegions.forEach(function (regiao){
        regiao.removeEventListener('click', handleBoardClick)
        regiao.style.cursor = 'default'
    })
}

function updatePlacar(){
    document.getElementById('scoreboard01').value = placarPlayer01.length
    document.getElementById('scoreboard02').value = placarPlayer02.length
}

function handleWin (regions){
    regions.forEach(function (reg) {
        document.querySelector('[data-local="' + reg + '"]').classList.add('win')
    })
    const playerr = document.getElementById (turnPlayer).innerText
    document.querySelector('h1').innerText = playerr + ' é demais e venceu essa partida!'
    
}

function handleBoardClick(ev) {
    const region = ev.currentTarget.dataset.local 
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if(turnPlayer === 'player-name-01'){
        ev.currentTarget.innerText = "X"
        table[row][column] = "X"
    }else{
        ev.currentTarget.innerText = "O"
        table[row][column] = "O"
    }
    console.clear()
    console.table(table)
    disableRegion(ev.currentTarget)
    const winRegions = getWinRegions ()
    if (winRegions.length > 0) {
        handleWin(winRegions)
        turnPlayer === 'player-name-01' ? placarPlayer01.push('1'): placarPlayer02.push('1')
        updatePlacar()
        disebledAllRegions()
        resetGame()
    } else if (table.flat().includes('')){
        turnPlayer = turnPlayer === "player-name-01" ? 'player-name-02' : 'player-name-01'
        turnPlayer === 'player-name-01' ? ev.currentTarget.classList.add('jogador02') : ev.currentTarget.add('click')
    } else {
        document.querySelector('h1').innerHTML = 'Empate!'
    }
    
}

function startGame(){
    aaaa = document.getElementById('player-name-01')
    bbbb = document.getElementById('player-name-02')
    if(aaaa.innerText !== undefined && bbbb.innerText !== undefined){
        
     initializeGame()       

    }else{
        console.log('teste falso')
    }
}


