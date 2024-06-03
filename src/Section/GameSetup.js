import Board from "../compounds/Gameboard";
import Game from "../compounds/Game";
import Player from "../compounds/Player";
import { randomPlacement } from "../compounds/Random";
import { addBoardHandler } from "../compounds/Functions";
import {
    plotGame,
    clearBoard,
    updateBoard,
    updatePlotBoard,
    plotShips,
    plotAllShipsRandomly,
    loadPlayAgainMenu,
} from '../compounds/Plot';

const removeWindow = (item) => {
    document.getElementById("root").removeChild(document.querySelector(item));
};

export default class GameSetup {
    static load() {
        this.setup();
    }

    static setup() {
        const player1Board = new Board();
        const player2Board = new Board();

        const isPlayerVsComputer = document.getElementById("vsComputer").checked;
        const isPlayerVsPlayer = document.getElementById("vsPlayer").checked;

        if (isPlayerVsPlayer || isPlayerVsComputer) {
            const player1 = new Player(document.getElementById("player1Name").value, player1Board, player2Board, true);
            const player2 = isPlayerVsComputer ? new Player("computer", player2Board, player1Board, false) :
                new Player(document.getElementById("player2Name").value, player2Board, player1Board, true);

            const game = new Game(player1, player2);
            removeWindow(".menu-box");
            this.setupGame(game, "player 1");

            return game;
        } else {
            console.log("error");
            return "error";
        }
    }

    static userSelectShip(player) {
        let draggedShip;

        document.querySelectorAll(".ship-btn").forEach((button) => {
            const ship = player.board.getShip(button.getAttribute("value"));
            button.setAttribute("draggable", !ship.deploy);
        });

        document.querySelectorAll(".ship-btn[draggable='true']").forEach((button) => {
            button.addEventListener("dragstart", (e) => {
                draggedShip = player.board.getShip(e.currentTarget.getAttribute("value"));
                e.currentTarget.classList.add("valid");
            });

            button.addEventListener("dragend", (e) => {
                e.preventDefault();
                e.currentTarget.classList.remove("valid");
            });
        });

        document.querySelectorAll(".square").forEach((target) => {
            target.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            target.addEventListener("dragenter", (e) => {
                const row = parseInt(e.currentTarget.getAttribute("row"));
                const col = parseInt(e.currentTarget.getAttribute("col"));
                if (e.currentTarget.classList.contains("dropzone")) {
                    player.board.isValid(draggedShip, row, col, "horizontal") ?
                        e.currentTarget.classList.add("valid") : e.currentTarget.classList.add("invalid");
                }
            });

            target.addEventListener("dragleave", (e) => {
                if (e.currentTarget.classList.contains("dropzone")) {
                    e.currentTarget.classList.remove("valid");
                    e.currentTarget.classList.remove("invalid");
                }
            });

            target.addEventListener("drop", (e) => {
                const row = parseInt(e.currentTarget.getAttribute("row"));
                const col = parseInt(e.currentTarget.getAttribute("col"));

                if (e.currentTarget.classList.contains("valid")) {
                    player.board.placeShip(draggedShip, row, col, draggedShip.orientation);
                    updatePlotBoard(player);
                    console.log("Ship placed successfully.");
                } else {
                    console.log("Invalid placement. There is already a ship in that location.");
                }

                e.currentTarget.classList.remove("valid");
                e.currentTarget.classList.remove("invalid");
            });
        });
    }

    static setupGame(game, playerTurn) {
        const player = playerTurn === "player 1" ? game.player1 : game.player2;
        game.loadSetupUI(player);

        addBoardHandler(player);

        const randomPlacementBtn = document.getElementById("random-placement");
        const clearBtn = document.getElementById("clear-board");
        const doneBtn = document.querySelector(".start-btn");

        this.userSelectShip(player);

        randomPlacementBtn.addEventListener("click", () => {
            plotAllShipsRandomly(player);
            updatePlotBoard(player);
        });

        clearBtn.addEventListener("click", () => {
            clearBoard(player);
            this.userSelectShip(player);
        });

        doneBtn.addEventListener("click", () => this.finishedSetupBtn(game, playerTurn));

        return player;
    }

    static finishedSetupBtn(game, playerTurn) {
        removeWindow(".setup-menu");

        if (game.player2.isHuman && playerTurn === "player 1") {
            this.setupGame(game, "player 2");
        } else {
            game.player2.board.ships.forEach((ship) => {
                randomPlacement(game.player2.board, ship);
            });
            this.play(game);
        }
    }

    static reset(game, window) {
        game.player1.board.reset();
        game.player2.board.reset();
        game.winner = null;
        game.turn = 1;
        removeWindow(window);
        this.setupGame(game, "player 1");
    }

    static play(game) {
        const getRoot = document.getElementById("root");

        if (game.winner != null) {
            getRoot.appendChild(loadPlayAgainMenu(game.getAttacker().name, game.getReceiver().name));
            document.getElementById("play-again").addEventListener("click", () => this.reset(game, ".menu-box"));
            return;
        }

        getRoot.appendChild(plotGame(game));
        updateBoard(game.getReceiver());

        if (game.getAttacker().isHuman) {
            document.querySelectorAll(".square").forEach((item) => {
                const col = parseInt(item.getAttribute("col"));
                const row = parseInt(item.getAttribute("row"));

                if (game.getReceiver().board.grid[row][col] === "hit" || game.getReceiver().board.grid[row][col] === "miss") {
                    return;
                }

                item.addEventListener("click", (e) => {
                    const row = parseInt(e.currentTarget.getAttribute("row"));
                    const col = parseInt(e.currentTarget.getAttribute("col"));
                    game.getAttacker().attack(game.getReceiver().name, row, col);
                    getRoot.removeChild(document.querySelector(".playerBoard"));
                    if (game.getReceiver().board.isGameOver()) {
                        game.setWinner(game.getAttacker().name);
                    } else {
                        game.nextTurn();
                    }
                    this.play(game);
                });
            });
        } else {
            plotShips(game.getReceiver().name, game.getReceiver().board);
            game.getAttacker().randomAttack(game.getReceiver().name);
            setTimeout(() => {
                getRoot.removeChild(document.querySelector(".playerBoard"));
                if (game.getReceiver().board.isGameOver()) {
                    game.setWinner(game.getAttacker().name);
                } else {
                    game.nextTurn();
                }
                this.play(game);
            }, 1000);
        }
        return game.getCurrentTurnOpponent();
    }
}
