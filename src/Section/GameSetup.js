import Board from "../compounds/Gameboard";
import Game from "../compounds/Game";
import Player from "../compounds/Player";
import {randomPlacement} from "../compounds/Random";
import { 
    plotGame,
    clearBoard,
    updateBoard,
    plotShips,
    plotAllShipsRandomly,
    loadPlayAgainMenu,
    loadVerticalHorizontalBtns
    } from '../compounds/Plot'

const removeWindow = (item) =>{
    document.getElementById("root").removeChild(document.querySelector(item));
}
export default class GameSetup{
    static load(){
        this.setup();
    }
    static setup(){
        const player1Board = new Board();
        const player2Board = new Board()

        const isPlayerVsComputer = document.getElementById("vsComputer").checked;
        const isPlayerVsPlayer = document.getElementById("vsPlayer").checked;

       if(isPlayerVsPlayer || isPlayerVsComputer)
       {
            const getPlayer1Name = new Player(document.getElementById("player1Name").value, player1Board, player2Board, true);

            //Determines if player 2 is human or computer
            const getPlayer2Name = isPlayerVsComputer ? new Player("computer", player2Board, player1Board, false) : 
                new Player(document.getElementById("player2Name").value, player2Board, player1Board, true);

            const game = new Game(getPlayer1Name, getPlayer2Name);
            removeWindow(".menu-box");
            this.setupGame(game, "player 1");

            return game;

       } else {
            console.log("error");
            return "error";
       }
    }
    static activateSquares = (player, name, e) =>{
        document.querySelector(".setup-menu").removeChild(document.querySelector(".ver-hor-btn"));
        const orientation = e.currentTarget.id;
        const ship = player.board.getShip(name); //returns ship
        // ship.setOrientation(orientation);

        //remove window box and activates squares
        const getSquares = document.querySelector(".gameboard").childNodes;

        const placeShipToBoard = (e, ship) => {
            const row = parseInt(e.target.getAttribute("row")); //returns row
            const col = parseInt(e.target.getAttribute("col")); //returns column
            // const ship = player.board.getShip(name); //returns ship
            // console.log(player.board.placeShip(ship, parseInt(row), parseInt(col)));

            if(player.board.grid[row][col] === null)
            {
                //place the ship
                return player.placeShip(ship, row, col, orientation);

            } else {
                //selects the ship
                return("There is a ship located there.  Place another square.");
            }
        }
        getSquares.forEach((item) =>{

            item.addEventListener(("click"), (e) => placeShipToBoard(e, ship));
        })

    }
     static userSelectShip = (player, name) =>{
        let dragged;
        // loadVerticalHorizontalBtns();
        // document.querySelectorAll(".ver-hor-btn button").forEach((button) => button.addEventListener(("click"), (e) => this.activateSquares(player, name, e)));
        document.querySelectorAll(".draggable").forEach((button) => {
                button.addEventListener("drag", (event) =>{
                    console.log("dragging");
                });
                button.addEventListener(("dragstart"), (event) => {
                    dragged = event.target;
                    event.target.classList.add("dragging");
                    console.log(dragged);
                });
                button.addEventListener(("dragend"), (event) =>{
                    event.target.classList.remove("dragging");
                });

            }
        );
        document.querySelectorAll(".square").forEach((target) =>{
            target.addEventListener("dragover",
                (event) =>{
                    event.preventDefault();
                }, 
                false,
            );
            target.addEventListener("dragenter", (event) =>{
                if(event.target.classList.contains("dropzone")){
                    event.target.classList.add("dragover");
                }
            });
            target.addEventListener("dragleave", event =>{
                if(event.target.classList.contains("dropzone")){
                    event.target.classList.remove("dragover");
                }
            });

        })
    }
 
     static setupGame = (game, playerTurn) =>{
        const player = playerTurn === "player 1" ? game.player1 : game.player2;
        game.loadSetupUI(player);
        const randomPlacementBtn = document.getElementById("random-placement");
        const clearBtn = document.getElementById("clear-board");
        const doneBtn = document.querySelector(".start-btn");
        const shipBtns = document.querySelectorAll(".ship-btn");
        shipBtns.forEach((shipBtn => shipBtn.addEventListener(("click"), () => this.userSelectShip(player, shipBtn.value))));
         
        randomPlacementBtn.addEventListener(("click"), () => plotAllShipsRandomly(player));
        clearBtn.addEventListener(("click"), () => clearBoard(player));
        doneBtn.addEventListener(("click"), () => this.finishedSetupBtn(game, playerTurn));
        console.log(player.board.isAllShipsDeployed());

        return player;
     }
 
     static finishedSetupBtn = (game, playerTurn) =>{
 
         removeWindow(".setup-menu");

        if(game.player2.isHuman && playerTurn === "player 1"){
            this.setupGame(game, "player 2")
        } else{
            // randomPlacement(game.player2);
            //generate randomPlacement for player 2
            game.player2.board.ships.forEach((ship) =>{
                randomPlacement(game.player2.board, ship);
            });
            this.play(game);
        } 
     }
     static reset = (game, window) => {
        game.player1.board.reset();
        game.player2.board.reset();
        game.winner = null;
        game.turn = 1;
        removeWindow(window);
        //loads setup menu
        this.setupGame(game, "player 1");
     }

     static play =(game) =>{
        const getRoot =  document.getElementById("root");

        if(game.winner != null){
            // removeWindow(".playerBoard");
            //Need to test this code.
            getRoot.appendChild(loadPlayAgainMenu(game.getAttacker().name, game.getReceiver().name));
            document.getElementById("play-again").addEventListener(("click"), ()=> this.reset(game, ".menu-box"));       
            return;     
        }
   
        //Whoever is the attacker
        getRoot.appendChild(plotGame(game));
        updateBoard(game.getReceiver());
        if(game.getAttacker().isHuman)
        {            
            //load previous moves if any
            const squares = document.querySelectorAll(".square");
            squares.forEach((item) =>{
                const col = parseInt(item.getAttribute("col"));
                const row = parseInt(item.getAttribute("row"));

                //Doesn't add eventListener because the square is occupied.
                if(game.getReceiver().board.grid[row][col] === "hit" || game.getReceiver().board.grid[row][col] === "miss"){ 
                    return;
                }
                item.addEventListener(("click"), e =>{
                    const row = e.currentTarget.getAttribute("row");
                    const col = e.currentTarget.getAttribute("col");
                    game.getAttacker().attack(game.getReceiver().name, row, col);
                    getRoot.removeChild(document.querySelector(".playerBoard"));
                    game.getReceiver().board.isGameOver() ? game.setWinner(game.getAttacker().name) : game.nextTurn();
                    // game.nextTurn();
                    this.play(game);
                });
            });
        } else {
            //random attack
            plotShips(game.getReceiver().name, game.getReceiver().board);
            game.getAttacker().randomAttack(game.getReceiver().name);
            setTimeout(() =>{
                getRoot.removeChild(document.querySelector(".playerBoard"));
                game.getReceiver().board.isGameOver() ? game.setWinner(game.getAttacker().name) : game.nextTurn();

                // game.nextTurn();
                this.play(game);
            }, 1000);
        }
        return game.getCurrentTurnOpponent();

     }


}