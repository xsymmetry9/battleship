import Board from "../compounds/Gameboard";
import Game,  {loadBoard, updateBoard} from "../compounds/Game";
import Player from "../compounds/Player";
import {plotMessage,
    removeRender, 
    plotShip,
    plotShips, 
    randomPlacement, 
    removeAllChildNodes,
    addAllChildNodes, 
    clearBoard} from '../compounds/Plot'

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
            const getPlayer2Name = isPlayerVsComputer ? new Player("computer", player2Board, player1Board, false) : 
                new Player(document.getElementById("player2Name").value, player2Board, player1Board, true);
            const game = new Game(getPlayer1Name, getPlayer2Name);
            document.getElementById("root").removeChild(document.querySelector(".menu-box"));
            this.setupGame(game, "player 1");
            return game;

       } else {
            console.log("error");
       }
    }

     static activateSquare = (player, name) =>{
         const getSquares = document.querySelector(".gameboard").childNodes;
 
         const placeShipToBoard = (e) => {
             const row = parseInt(e.target.getAttribute("row")); //returns row
             const col = parseInt(e.target.getAttribute("col")); //returns column
             const ship = player.board.getShip(name); //returns ship
             // console.log(player.board.placeShip(ship, parseInt(row), parseInt(col)));
 
             if(player.board.grid[row][col] === null)
             {
                 //place the ship
                 return player.placeShip(ship, row, col);
 
             } else {
                 //selects the ship
                 return("There is a ship located there.  Place another square.");
             }
         }
         getSquares.forEach((item) =>{
             item.addEventListener(("click"), placeShipToBoard);
         })
     }
 
     static setupGame = (game, playerTurn) =>{
         const player = playerTurn === "player 1" ? game.player1 : game.player2;
         game.loadSetupUI(player);
         const randomPlacementBtn = document.getElementById("random-placement");
         const clearBtn = document.getElementById("clear-board");
         const doneBtn = document.querySelector(".start-btn");
         const shipBtns = document.querySelectorAll(".ship-btn");
         shipBtns.forEach((shipBtn => shipBtn.addEventListener(("click"), () => this.activateSquare(player, shipBtn.value))));
         
         randomPlacementBtn.addEventListener(("click"), () => randomPlacement(player));
         clearBtn.addEventListener(("click"), () => clearBoard(player));
         doneBtn.addEventListener(("click"), () => this.finishedSetupBtn(game, playerTurn));
         return player;
     }
 
     static finishedSetupBtn = (game, playerTurn) =>{
         document.getElementById("root").removeChild(document.querySelector(".setup-menu"));
         game.player2.isHuman && playerTurn === "player 1" ? this.setupGame(game, "player 2") : this.play(game);
     }

     static play =(game) =>{
        const getRoot =  document.getElementById("root");
        if(game.winner != null){
            console.log(game.winner);
            return game.winner;
        }
        //Whoever is the attacker
        getRoot.appendChild(loadBoard(game.getReceiver()));
        updateBoard(game.getReceiver());
        if(game.getAttacker().isHuman)
        {            
            //load previous moves if any
            const squares = document.querySelectorAll(".square");
            squares.forEach((item) =>{
                item.addEventListener(("click"), e =>{
                    const row = e.currentTarget.getAttribute("row");
                    const col = e.currentTarget.getAttribute("col");
                    game.getAttacker().attack(game.getReceiver().name, row, col);
                    getRoot.removeChild(document.querySelector(".gameboard"));
                    game.nextTurn();
                    this.play(game);
                });
            });
        } else {
            //random attack
            plotShips(game.getReceiver().name, game.getReceiver().board);
            game.getAttacker().randomAttack(game.getReceiver().name)
            setTimeout(() =>{
                getRoot.removeChild(document.querySelector(".gameboard"));
                game.nextTurn();
                this.play(game);
            }, 1000);
        }

        return game.getCurrentTurnOpponent();

     }


}