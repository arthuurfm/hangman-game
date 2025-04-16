import wordList from "./word-list.js";
import translate from "./translations/translations.js";

// game.
const game = document.querySelector(".container");
const wordDisplay = document.querySelector(".word-display");
const hintText = document.querySelector(".hint-text");
const guessesText = document.querySelector(".guesses-text b");
const hangmanImage = document.querySelector(".hangman-box img");
const keyboard = document.querySelector(".keyboard");

// tela de vitória/derrota.
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const backToMenuBtn = document.querySelector(".back-to-menu");

// menu.
const menu = document.querySelector(".menu");
const startBtn = document.querySelector(".start");
const settingsBtn = document.querySelector(".settings");

// menu de opções.
const settingsMenu = document.querySelector(".settings-menu");
const saveSettingsBtn = document.querySelector(".save-settings");
const showHint = document.querySelector(".show-hint");

// opções de idioma.
const language = document.getElementById("language");

let currentWord, correctLetters = [], wrongGuessCount = 0;
const maxGuesses = 6;

// iniciando o jogo.
const startGame = () => {
  menu.classList.remove("show");
  game.classList.add("show");
}

// entrando no menu de opções.
const showSettingsMenu = () => {
  settingsMenu.classList.add("show");
  menu.classList.remove("show");
}

// selecionando o idioma.
const selectLanguage = () => translate(language.value);

// salvar opções.
const saveSettings = () => {
  if (showHint.checked == true) {
    hintText.classList.add("on");
    hintText.classList.remove("off");
  } 

  if (showHint.checked == false) {
    hintText.classList.add("off");
    hintText.classList.remove("on");
  }

  settingsMenu.classList.remove("show");
  menu.classList.add("show");
  selectLanguage();
}

const resetGame = () => {
  // resetando todas as variáveis e elementos UI do jogo.
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
  wordDisplay.innerHTML = currentWord.split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
}

const getRandomWord = () => {
  // selecionando a uma palavra e dica aleatória da lista (wordList).
  const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
}

const gameOver = (isVictory) => {
  // depois de 600ms do jogo acabar, mostrar os detalhes do fim da partida. 
  setTimeout(() => {
    const modalText = isVictory ? `You got the right word:`
      : `The right word was: `;
      gameModal.querySelector("img").src = `./images/${isVictory ? `victory`
        : `lost`}.gif`
      gameModal.querySelector("h4").innerText = `${isVictory ? `Congratulations!`
        : `Game over!`}`
      gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`
      gameModal.classList.add("show");
      game.classList.remove("show");
  }, 300);
}

const initGame = (button, clickedLetter) => {
  // checando se a letra clicada (clickedLetter) existe na palavra atual (currentWord).
  if (currentWord.includes(clickedLetter)) {
    // mostrando todas as letras já acertadas no display.
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // se clicar numa letra que não existe na palavra, é atuliazada as incorretas (wrongGuessCount) e a imagem da forca.
    wrongGuessCount++;
    hangmanImage.src = `./images/hangman-${wrongGuessCount}.svg`;
  }
  
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  
  // verificando vitória.
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
}

// voltando para o menu.
const showMenu = () => {
  getRandomWord();
  gameModal.classList.remove("show");
  game.classList.remove("show");
  menu.classList.add("show");
}

const newGame = () => {
  getRandomWord();
  game.classList.add("show");
} 

// criando os botões do teclado e escutando eventos.
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  // String.fromCharCode -> pega caractéres do teclado em ordem alfabética.
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", event => initGame(event.target, String.fromCharCode(i)));
}

getRandomWord();

// eventos dos botões.
playAgainBtn.addEventListener("click", newGame);
startBtn.addEventListener("click", startGame);
settingsBtn.addEventListener("click", showSettingsMenu);
saveSettingsBtn.addEventListener("click", saveSettings);
backToMenuBtn.addEventListener("click", showMenu);