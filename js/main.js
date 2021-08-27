window.addEventListener('load',init);

const levels = {
    easy : 5,
    medium : 3,
    hard :2
}

const currentLevel = levels.easy;


let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];

//init function , when window load

function init(){
    //console.log('init');

    seconds.innerHTML = currentLevel;
    //load word from array
    showWord(words);
    //Take input and match
    wordInput.addEventListener('input',startMatch);

    // call count down every second
    setInterval(countdown,1000);

    //check game status
    setInterval(checkStatus,50);
}

function startMatch(){
    if(matchWords()){
        // If words Match
        isPlaying = true;
        time = currentLevel+1;
        // 1 sec for loading
        showWord(words);
        wordInput.value = '';
        score++;
    }

    if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
        sessionStorage['highscore'] = score;
      } else {
        sessionStorage['highscore'] = sessionStorage['highscore'];
      }
    
      // Prevent display of High Score: -1
      if (sessionStorage['highscore'] >= 0) {
      highscoreDisplay.innerHTML = sessionStorage['highscore'];
      }

    if(score==-1)
        scoreDisplay.innerHTML = 0;
    else
       scoreDisplay.innerHTML = score;
}
//Compare Match Words
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML == "correct";
        return true;
    }
    else
    {
        message.innerHTML = '';
        return false;
    }

}

function showWord(words) {
    // Generate Random Array index
    const randIndex = Math.floor(Math.random() * words.length);

    currentWord.innerHTML = words[randIndex];

} 

function countdown() {

    // Make sure time is not run out
    if(time > 0)
    {
        time--;
    }
    else if(time === 0)
    {
        isPlaying = false;
    }
    //show time
    timeDisplay.innerHTML = time;
}

function checkStatus() {
    if(!isPlaying && time === 0){
            message.innerHTML = 'Game Over';
            score = -1;
        }
    
}