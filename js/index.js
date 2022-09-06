import { Login } from "./class/login.js"
import { Leaderboard } from "./class/leaderBoard.js"
import { Sound } from "./class/sound.js"
import { Game } from "./class/game.js"

const login = new Login()
login.autoConnect()
login.signup()
login.signin()

const leaderBoard = new Leaderboard()
leaderBoard.init()

const changeBackground = () => {
    const bg = document.getElementById('backg');
    const input = document.getElementById('bgInput');
    const time = new Date().getHours() + 1;

    if (time >= 8 && time < 13) {
        bg.setAttribute('src', 'assets/bg1.png');
        input.setAttribute('src', 'assets/input1.png');
    }
    else if (time >= 13 && time < 18) {
        bg.setAttribute('src', 'assets/bg2.png');
        input.setAttribute('src', 'assets/input2.png');
    }
    else {
        bg.setAttribute('src', 'assets/bg3.png');
        input.setAttribute('src', 'assets/input3.png');
    }
}

changeBackground()

document.getElementById('randomName').addEventListener('click', () => {
    const name = ["Jackson", "Bobby", "Molly", "Rascass", "Mortane", "Barbasse", "Edward", "Morgane", "Shanks"]
    document.getElementById('input').value = name[Math.round(Math.random() * 8)]
})

document.getElementById('redirectionSolo').addEventListener('click', () => {
    document.getElementById('index').setAttribute('class', 'hideGame');
    document.getElementById('wrapper').removeAttribute('class', 'hideGame');
    document.getElementById('btn-rules').removeAttribute('class', 'hideGame');
    document.getElementById('lore').removeAttribute('class', 'hideGame');
    const game = new Game(false);
    game.init();
    game.player2.name = document.getElementById('input').value;
    document.getElementById('namePlayer2').innerText = game.player2.name;
    resize()
})

document.getElementById('redirectionMulti').addEventListener('click', () => {
    document.getElementById('index').setAttribute('class', 'hideGame');
    document.getElementById('wrapper').removeAttribute('class', 'hideGame');
    document.getElementById('btn-rules').removeAttribute('class', 'hideGame');
    document.getElementById('lore').removeAttribute('class', 'hideGame');
    const game = new Game(true);
    game.init();
    game.player2.name = document.getElementById('input').value;
    document.getElementById('namePlayer2').innerText = game.player2.name;
    console.log(game);
    resize()
})

document.getElementById('lore').addEventListener('click', () => {
    const dropCoin = new Sound();
    dropCoin.overlapPlay('dropCoin', 0.1, false);
})

const resize = () => {
    let backgroundHeight = document.getElementById("fond").height
    document.getElementById("rolls").style.height = backgroundHeight + "px"
    document.getElementById("grids").style.height = backgroundHeight + "px"
}
resize()

const seaSound = document.getElementById('SeaSound');
seaSound.volume = 0.1;
const bgAudio = document.getElementById('bgAudio');
bgAudio.volume = 0.1;

document.getElementById("quitBtn").addEventListener("click", () => {
    document.getElementById('wrapper').setAttribute('class', 'hideGame');
    document.getElementById('index').removeAttribute('class', 'hideGame');
    document.getElementById('lore').setAttribute('class', 'hideGame');
    resize()
    window.location.reload();
})

document.getElementById("quitGame").addEventListener("click", () => {
    document.getElementById('wrapper').setAttribute('class', 'hideGame');
    document.getElementById('index').removeAttribute('class', 'hideGame');
    document.getElementById('lore').setAttribute('class', 'hideGame');
    resize()
    window.location.reload();
})

document.getElementById('returnToTheGame').addEventListener('click', () => {
    const closeRulesBook = new Sound();
    closeRulesBook.play('closeRulesBook', 0.2, false);
    const oppacity = document.getElementById('oppacity');
    const image = document.getElementById('rulesImg');
    const imageBack = document.getElementById('returnToTheGame');
    oppacity.style.display = "none";
    image.style.display = "none";
    imageBack.style.display = "none";
})

document.getElementById('btn-rules').addEventListener('click', () => {
    const rulesBookSound = new Sound();
    rulesBookSound.play('rulesBookSound', 0.2, false);
    const oppacity = document.getElementById('oppacity');
    const image = document.getElementById('rulesImg');
    const imageBack = document.getElementById('returnToTheGame');
    oppacity.style.display = "block";
    image.style.display = "block";
    imageBack.style.display = "block";
    image.style.animation = 'fadeIn 3s';
    imageBack.style.animation = 'fadeIn 3s';
})