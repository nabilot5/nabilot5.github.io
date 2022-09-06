import { Player } from "./player.js";
import { Ui } from "./ui.js";
import { Client } from "./client.js";
import { Sound } from "./sound.js";
import { Animation } from "./animation.js"

export class Game {
    constructor(multi) {
        this.player1
        this.player2
        this.multi = multi
        this.roomId
        this.ui = new Ui(this)
        this.sound = new Sound()
        this.animation = new Animation()
        this.client = new Client(this, true)
    }

    init() {
        this.player1 = new Player(this, document.getElementById("grille2"), 2)
        this.player2 = new Player(this, document.getElementById("grille1"), 1)

        // this.client = new Client(this, false) // true for local serveur, false for heroku serveur
        this.client.init()

        document.getElementById('namePlayer1').innerText = this.player1.name;
        document.getElementById('namePlayer2').innerText = this.player2.name;

        this.player1.otherPlayer = this.player2
        this.player2.otherPlayer = this.player1

        this.ui.init()
        this.player1.initControl()
    }

    reset() {
        this.ui.restartGame()
    }

    switchTurn() {
        if (this.player1.turn) {
            document.getElementById('potPlayer1').setAttribute('class', 'choice-dice clignote')
            document.getElementById('potPlayer2').setAttribute('class', 'choice-dice')
        }

        if (this.player2.turn) {
            document.getElementById('potPlayer1').setAttribute('class', 'choice-dice')
            document.getElementById('potPlayer2').setAttribute('class', 'choice-dice clignote')
        }
    }
} 