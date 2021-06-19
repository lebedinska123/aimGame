
const ClassNames = {
    startGameBtn: 'btn-start-game',
    mainScreen: 'main-screen',
    gameScreen: 'game-screen',
    chooseTime: 'choose-time-screen',
    timeBtns: 'time-btns',
    timeBtn: 'time-btn',
    gameArea: 'game-area',
    timeLeftTime: 'time-left__time',

    randomPoint: 'random-point',
    score: 'score',
    startNewGame: 'btn start-game-btn',
    countdown: 'countdown',
};

const Selector = {
    startGameBtn: `.${ClassNames.startGameBtn}`,
    mainScreen: `.${ClassNames.mainScreen}`,
    chooseTime: `.${ClassNames.chooseTime}`,
    timeBtns: `.${ClassNames.timeBtns}`,
    timeBtn: `.${ClassNames.timeBtn}`,
    gameArea: `.${ClassNames.gameArea}`,
    timeLeftTime: `.${ClassNames.timeLeftTime}`,
    startNewGame: `.${ClassNames.startNewGame}`,
    gameScreen: `.${ClassNames.gameScreen}`,
};

const RANDOM_POINT_MIN_SIZE = 10;
const RANDOM_POINT_MAX_SIZE = 60;

const gameArea = document.querySelector(Selector.gameArea);

let gameTime = undefined;
let gameScore = 0;

let gameScreenSize = undefined;
let randomPoint = undefined;

let startNewGameBtn = undefined;

let init = function() {
    initRandomPoint();
    initNewGameBtn();
    addEventListeners();
    setGameFieldSize();
};

let initNewGameBtn = function() {
    startNewGameBtn = document.createElement('button');
    startNewGameBtn.className = ClassNames.startNewGame;
    startNewGameBtn.innerText = 'Начать заново';
};

let initRandomPoint = function() {
    randomPoint = document.createElement('div');
    randomPoint.className = ClassNames.randomPoint;
};

let onStartGameBtnClick = function() {
    document.querySelector(Selector.mainScreen).style.display = 'none';
};

let onTimeBtnClick = function(event) {
    if (event.target.classList.contains(ClassNames.timeBtn)) {
        gameTime = +event.target.dataset.time;
        document.querySelector(Selector.chooseTime).style.display = 'none';
        let gameScreen = document.querySelector(Selector.gameScreen);
        gameScreen.style.display = 'flex';
        document.querySelector(Selector.timeLeftTime).innerHTML = getTime(gameTime);

        countdown();
    }
};

let onRandomPointClick = function() {
    gameScore++;
    
    setRandomPointOnGameArea();
};

let onStartNewGameBtnClick = function() {
    gameScore = 0;
    gameArea.innerHTML = '';

    let gameScreen = document.querySelector(Selector.gameScreen);
    let timeScreen = document.querySelector(Selector.chooseTime);

    gameScreen.style.display = 'none';
    timeScreen.style.display = 'flex';
};

let addEventListeners = function() {
    let startGameBtn = document.querySelector(Selector.startGameBtn);
    let timeBtns = document.querySelector(Selector.timeBtns);

    startGameBtn.addEventListener('click', onStartGameBtnClick);
    timeBtns.addEventListener('click', onTimeBtnClick);
    randomPoint.addEventListener('click', onRandomPointClick);
    startNewGameBtn.addEventListener('click', onStartNewGameBtnClick);
};

let setGameFieldSize = function() {
    let screenWidth = document.documentElement.clientWidth;
    let screenHeight = document.documentElement.clientHeight;

    if (screenWidth < screenHeight) {
        gameScreenSize = Math.round(screenWidth * 0.8);
    } else {
        gameScreenSize = Math.round(screenHeight * 0.8);
    }

    gameArea.style.height = `${gameScreenSize}px`;
    gameArea.style.width = `${gameScreenSize}px`;
};

let initGameArea = function() {
    let timeLeftTime = document.querySelector(Selector.timeLeftTime);
    timeLeftTime.innerHTML = getTime(gameTime);

    let interval = setInterval(() => {
        timeLeftTime.innerHTML = getTime(--gameTime);

        if (gameTime === 0) {
            clearInterval(interval);
            gameArea.removeChild(randomPoint);
            showScore();
        }
    }, 1000);
};

let getTime = function(time) {
    if (time < 10) {
        return `0${time}:00`;
    }

    return `${time}:00`;
};

let setRandomPointOnGameArea = function() {
    let pointSize = Math.round(Math.random() * (RANDOM_POINT_MAX_SIZE - RANDOM_POINT_MIN_SIZE) + RANDOM_POINT_MIN_SIZE);

    randomPoint.style.width = `${pointSize}px`;
    randomPoint.style.height = `${pointSize}px`;

    let pointPositionTop = Math.round(Math.random() * (gameScreenSize - pointSize * 2) + pointSize);
    let pointPositionLeft = Math.round(Math.random() * (gameScreenSize - pointSize * 2) + pointSize);

    randomPoint.style.top = `${pointPositionTop}px`;
    randomPoint.style.left = `${pointPositionLeft}px`;
};

let showScore = function() {
    let scoreWrapper = document.createElement('div');
    let score = document.createElement('div');
    score.className = ClassNames.score;
    score.innerText = `Счет: ${gameScore}`;

    scoreWrapper.appendChild(score);
    scoreWrapper.appendChild(startNewGameBtn);
    gameArea.innerHTML = '';

    gameArea.appendChild(scoreWrapper);
};

let countdown = function() {
    let counter = 3;
    let interval = setInterval(() => {
        gameArea.innerHTML = `
            <div class="${ClassNames.countdown}">${counter}</div>
        `;

        if (counter === 0) {
            clearInterval(interval);
            gameArea.innerHTML = null;

            gameArea.append(randomPoint);
            setRandomPointOnGameArea();
            initGameArea();
        }

        counter--;
    }, 1000);
};


init();