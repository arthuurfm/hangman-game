let translations = {
  ptBr: {
    ptBr: "Português", en: "Inglês", es: "Espanhol", fr: "Francês",
    gameName: "Jogo da Forca", 
    startBtn: "Iniciar", 
    settingsBtn: "Configurações",
    settingsTitle: "Configurações:",
    languageText: "Idioma:",
    showHintText: "Mostrar dica:",
    hintText: "Dica:",
    guessesText: "Incorretas:",
  },

  en: {
    ptBr: "Portuguese", en: "English", es: "Spanish", fr: "French",
    gameName: "Hangman Game", 
    startBtn: "Start", 
    settingsBtn: "Settings",
    settingsTitle: "Settings:",
    languageText: "Language:",
    showHintText: "Show hint:",
    hintText: "Hint:",
    guessesText: "Incorrects:",
  },

  es: {
    ptBr: "Portugués", en: "Inglés", es: "Español", fr: "Francés",
    gameName: "Juego del Ahorcado", 
    startBtn: "Comenzar", 
    settingsBtn: "Ajustes",
    settingsTitle: "Ajustes:",
    languageText: "Idioma:",
    showHintText: "Mostrar pista:",
    hintText: "Dica:",
    guessesText: "Incorrectos:",
  },

  fr: {
    ptBr: "Portugais", en: "Anglais", es: "Espagnol", fr: "Français",
    gameName: "Jeu du Pendu", 
    startBtn: "Commencer", 
    settingsBtn: "Paramètres",
    settingsTitle: "Paramètres:",
    languageText: "Langue:",
    showHintText: "Montrer indice:",
    hintText: "Indice:",
    guessesText: "Incorrects:",
  }
}

function translate(language) {
  // nome do jogo.
  const gameNames = document.querySelectorAll(".game-name");
  gameNames.forEach(gameName => gameName.innerText = translations[language].gameName);

  // menu principal.
  const startBtn = document.querySelector(".start");
  startBtn.innerText = translations[language].startBtn;
  const settingsBtn = document.querySelector(".settings");
  settingsBtn.innerText = translations[language].settingsBtn;

  // menu de configurações.
  const settingsTitle = document.querySelector(".settings-title");
  settingsTitle.innerText = translations[language].settingsTitle;
  const languageText = document.querySelector(".language-text");
  languageText.innerText = translations[language].languageText;
  const showHintText = document.querySelector(".show-hint-text");
  showHintText.innerText = translations[language].showHintText;

  // idiomas no menu de configurações.
  const languages = document.getElementById("language").querySelectorAll("option");
  languages.forEach(l => {
    if (l.value == "ptBr") {
      l.innerText = translations[language].ptBr;
    } else if (l.value == "en") {
      l.innerText = translations[language].en;
    } else if (l.value == "es") {
      l.innerText = translations[language].es;
    } else if(l.value == "fr") {
      l.innerText = translations[language].fr;
    }
  });

  // game.
  const hintText = document.querySelector(".hint-text").querySelector("span");
  hintText.innerText = translations[language].hintText;
  const guessesText = document.querySelector(".guesses-text").querySelector("span");
  guessesText.innerText = translations[language].guessesText;
}

export default translate;