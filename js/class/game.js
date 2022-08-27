import { Player } from "/js/class/player.js";
import { Ui } from "/js/class/ui.js";
import { Animate } from "/js/class/animation.js";

export class Game {
    constructor() {
        this.player1 = new Player(this, document.getElementById("grille2"), 2)
        this.player2 = new Player(this, document.getElementById("grille1"), 1, true)
        this.ui = new Ui(this)
        this.run = true
        this.anim = null;
    }

    init() {
        document.getElementById('namePlayer1').innerText = this.player1.name;
        document.getElementById('namePlayer2').innerText = this.player2.name;

        this.player1.grid = [null, null, null, null, null, null, null, null, null]
        this.player1.otherPlayer = this.player2
        this.player1.drawGrille()
        this.player1.turn = true;

        this.player2.grid = [null, null, null, null, null, null, null, null, null]
        this.player2.otherPlayer = this.player1
        this.player2.drawGrille()
    }

    reset() {
        this.ui.restartGame()
        this.player1.reset()
        this.player1.turn = true
        this.player2.reset()
        this.run = true
    }

    destroyEnemieDices(gamePLayer, otherPlayer) {
        let gridPlayer1 = gamePLayer.getFormatGrid()
        let gridPlayer2 = otherPlayer.getFormatGrid()
        let newGrid = []


        this.anim = new Animate(gamePLayer, otherPlayer);
        for (let nbCol = 0; nbCol < gridPlayer1.length; nbCol++) {

            gridPlayer2[nbCol].forEach((element) => {
                if (gridPlayer1[nbCol].includes(element) && element !== null) {
                    this.anim.animate(document.getElementById(`player${otherPlayer.id}-col${nbCol + 1}-case-${gridPlayer2[nbCol].indexOf(element) + 1}`));
                    newGrid.push(null)
                } else {
                    newGrid.push(element)
                }
            });
        }
        otherPlayer.grid = newGrid
        otherPlayer.setSortedGrid()
    }

    getTotalCase() {
        return this.player1.nbCol * this.nbColCase
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

        this.player1.turn = !this.player1.turn
        this.player2.turn = !this.player2.turn


        if (this.player1.gridIsFull() || this.player2.gridIsFull()) {
            this.ui.endGame()
            if (this.player1.score > this.player2.score) {
                console.log('test1' + this.id);
                document.getElementById('end-menu').style.filter = 'drop-shadow(0 0 5rem rgb(255, 179, 0))';
            }
            if (this.player1.score < this.player2.score) {
                console.log('test2' + this.id);
                document.getElementById('end-menu').style.filter = 'drop-shadow(0 0 5rem rgb(255, 0, 0))';
                this.run = false
            }
        }
        if (this.player1.turn && this.player1.ai && this.run) {
            this.player1.aiTurn()
        }

        if (this.player2.turn && this.player2.ai && this.run) {
            this.player2.aiTurn()
        }

    }
} 