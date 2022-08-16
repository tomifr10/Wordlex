// import WORDS from "./palabras.json";
let mainBox = document.querySelector('.main-box')
let keyBox = document.querySelector('.keys-box')
let reset = document.querySelector('.reset');
let keyValue;

reset.addEventListener('click', ()=> {
    location.reload()
})

let loteryWord;
let wordsChoisen = [];

async function getWord() {
    await fetch('https://palabras-aleatorias-public-api.herokuapp.com/random')
    .then(response => response.json())
    .then(data => loteryWord = data.body.Word);
    const wordle = loteryWord.toUpperCase().split("")
    for(let i=0; i<wordle.length; i++) {
        let arrLife = [];
        wordle.forEach(char => {
            char = "";
            arrLife.push(char)
        })
        wordsChoisen.push(arrLife)
    }
    const keys = [
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'M',
        'DELETE',
        'ENTER',
    ];
    
    wordsChoisen.forEach((guessRow, guessRowIndex) => {
        const rowElement = document.createElement('div')
        rowElement.classList.add("div-words");
        rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
        guessRow.forEach((_guess, guessIndex) => {
            const tileElement = document.createElement('div')
            tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
            tileElement.classList.add('tile')
            rowElement.append(tileElement)
        })
        mainBox.append(rowElement)
    })
    keys.forEach((key,index)=> {
        const keyButton = document.createElement('button');
        keyButton.innerText = key;
        keyButton.setAttribute('id', 'key-' + key);
        keyButton.setAttribute('value', key);
        keyButton.classList.add('keyButton')
        keyButton.addEventListener('click', () => handleClick(key))
        keyBox.append(keyButton)
    })

    const returnValue = (e)=> {
        keyValue = e.key.toUpperCase();
        handleClick(keyValue)
    }
        
    document.addEventListener('keydown', (e)=> {
        returnValue(e);
    })
    
    const handleClick = (letter) => {
            if (letter === 'DELETE' || letter === 'BACKSPACE') {
                console.log('borrado')
                deleteLetter()
                return
            }
            if (letter === 'ENTER') {
                cheqResult()
                cheqWinner()
                return
            }
            addLetter(letter)
    }
    let currentRow = 0
    let currentTile = 0
    let winner = false
    const addLetter = (letter) => {
        if (currentTile < wordle.length && currentRow < wordle.length) {
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
            tile.textContent = letter
            wordsChoisen[currentRow][currentTile] = letter
            currentTile++
        }
    }
    
    const deleteLetter = (letter) => {
        currentTile = currentTile - 1;
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ""
        wordsChoisen[currentRow][currentTile] = ""
    }
    
    let winnerArray = []
    
    function cheqResult() {
        const wordPlayer = wordsChoisen[currentRow]
        wordPlayer.forEach((letter,index) => {
            const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + index);
            const keyButton = document.getElementById('key-' + letter);

            if(wordle.includes(letter)) {
                tile.style.backgroundColor = 'yellow';
                keyButton.style.backgroundColor = 'yellow';
                tile.setAttribute('data', 'yellow')
            }
            if(wordle[index] == letter) {
                tile.style.backgroundColor = 'green';
                keyButton.style.backgroundColor = 'green';
                tile.setAttribute('data', 'green')
                winnerArray.push(letter)
            }
            if(winnerArray.includes(letter)) {
                keyButton.style.backgroundColor = 'green';
            }
            if(!(wordle.includes(letter))) {
                tile.style.backgroundColor = 'red';
                console.log(tile.style)
                keyButton.style.backgroundColor = 'red';
                tile.setAttribute('data', 'gray')
            }
            if(index == (wordle.length -1) && winnerArray.length !== wordle.length) {
                currentRow++
                currentTile = 0
            }
            
        })
    }
    function cheqWinner() {

    if(winnerArray.length !== wordle.length) {
        winnerArray = []
    } else {
        winner = true;
        let notification = document.querySelector('.notification');
        notification.textContent = 'Winner winner chicken dinner'
    }
    if(currentRow == wordle.length && !winner) {
        let notification = document.querySelector('.notification');
        notification.textContent = 'La palabra era ' + loteryWord.toUpperCase()
    }
    }
}

getWord()






