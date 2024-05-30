import Board from "../compounds/Gameboard";
import Game from "../compounds/Game";
import Player from "../compounds/Player";
import {randomPlacement} from "../compounds/Random";
import { 
    plotGame,
    clearBoard,
    updateBoard,
    updatePlotBoard,
    plotShips,
    plotAllShipsRandomly,
    loadPlayAgainMenu,
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
    static userSelectShip = (player) =>{
        let draggedShip;

        document.querySelectorAll(".ship-btn").forEach((button) =>{
            !player.board.getShip(button.getAttribute("value")).deploy ? 
                button.setAttribute("draggable", true) : button.setAttribute("draggable", false);
        }) 
       
        document.querySelectorAll(".draggable").forEach((button) => {
                button.addEventListener(("dragstart"), (e) => {
                    draggedShip = player.board.getShip(e.currentTarget.getAttribute("value"));
                    e.currentTarget.classList.add("valid");
                });
                button.addEventListener(("dragend"), (e) =>{
                    e.preventDefault();
                    //Removes the render of the selected button
                    e.currentTarget.classList.remove("valid");
                });
            }
        );
        document.querySelectorAll(".square").forEach((target) =>{
            target.addEventListener("dragover",
                (e) =>{
                    e.preventDefault();
                }, 
                false,
            );
            target.addEventListener("dragenter", (e) =>{
                const row = parseInt(e.currentTarget.getAttribute("row")); //returns row
                const col = parseInt(e.currentTarget.getAttribute("col")); //returns column
                if(e.currentTarget.classList.contains("dropzone")){
                    player.board.isValid(draggedShip, row, col, "horizontal") ? e.currentTarget.classList.add("valid") : e.currentTarget.classList.add("invalid");
                }
            });
            target.addEventListener("dragleave", e =>{

                const row = parseInt(e.currentTarget.getAttribute("row")); //returns row
                const col = parseInt(e.currentTarget.getAttribute("col")); //returns column
                if(e.currentTarget.classList.contains("dropzone")){
                    player.board.isValid(draggedShip, row, col, "horizontal") ? e.currentTarget.classList.remove("valid") : e.currentTarget.classList.remove("invalid");
                }
            });

            target.addEventListener("drop", e => {
                const check = ["valid", "invalid"];

                check.forEach((item) => {
                    if(e.currentTarget.classList.contains("valid") || e.currentTarget.classList.contains("invalid")){
                        e.currentTarget.classList.remove(item);
                    } 
                });
                const row = parseInt(e.currentTarget.getAttribute("row")); //returns row
                const col = parseInt(e.currentTarget.getAttribute("col")); //returns column

            if(player.board.grid[row][col] === null)
            {
                //place the ship and plots it
                const orientation = "horizontal"
                player.placeShip(draggedShip, row, col, orientation);
                this.userSelectShip(player);

            } else {
                //selects the ship
                return("There is a ship located there.  Place another square.");
            }
            })
        })
    }
 
     static setupGame = (game, playerTurn) =>{
        const player = playerTurn === "player 1" ? game.player1 : game.player2;
        game.loadSetupUI(player);
        const randomPlacementBtn = document.getElementById("random-placement");
        const clearBtn = document.getElementById("clear-board");
        const doneBtn = document.querySelector(".start-btn");

        //User is allowed to click and drag the ship to the board
        this.userSelectShip(player); //adds handler
         
        randomPlacementBtn.addEventListener(("click"), () => {
            plotAllShipsRandomly(player);
            console.log(updatePlotBoard(player));
        });
        clearBtn.addEventListener(("click"), () => {
            clearBoard(player);
            this.userSelectShip(player);
        });
        doneBtn.addEventListener(("click"), () => this.finishedSetupBtn(game, playerTurn));

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