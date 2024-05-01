import {addHandler, removeHandler} from './Functions'
import {plotMessage, randomPlacement} from './Plot'
import "../style/game.scss"

const banner = (message) =>{
    const item = document.createElement("div")
    item.innerHTML = `<h1>${message}</h1>`;
    return item;
}
const loadButtons =(player) =>{
    const buttons = document.createElement("div");
    buttons.className = "buttons-container";

    const randomPlacementBtn = document.createElement("button");
    randomPlacementBtn.setAttribute("id", "random-placement");
    randomPlacementBtn.textContent="random";

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "clear";
    clearBtn.setAttribute("id", "clear-board");

    buttons.appendChild(randomPlacementBtn);
    buttons.appendChild(clearBtn);

    return buttons;
    }
const loadBoard = (player) =>{
     const container = document.createElement("div");
     container.className = "gameboard";
     container.setAttribute("id", player.name);
    const getGameboard = player.board;

        for (let i = 0; i < getGameboard.rows; i++)
        {
            for (let j = 0; j<getGameboard.cols; j++)
            {
                const square = document.createElement("div");
                square.className = "square";

                square.setAttribute("row", i);
                square.setAttribute("col", j);
                square.setAttribute("id", `${player.name.toLowerCase()}-${i}-${j}`);

                container.appendChild(square);
            }
        }
        return container;
    }
const loadStartButton = () =>{
    const startBtn = document.createElement("button");
    startBtn.className="start-btn";
    startBtn.textContent = "Done";
    return startBtn;
}

const shipMenu = (player) => {
        const container = document.createElement("div");
        container.className = "ship-buttons";
   
        player.board.ships.forEach((ship) => {
            const createBtn = document.createElement("button");
            createBtn.className = "ship-btn";
            createBtn.setAttribute("id", ship.id);
            createBtn.setAttribute("value", ship.name);
            createBtn.textContent = ship.name;
    
            // createBtn.addEventListener("click", (e) => handleLoadShipBtn(e, player));

            container.appendChild(createBtn);
        });
        return container;
    }

const handleLoadShipBtn = (e, player) =>{
    const ship = player.board.getShip(e.currentTarget.value);
    console.log(ship);
    const getSquares = document.getElementById(player.name.toLowerCase()).childNodes;
 
    getSquares.forEach((item) => {
            item.addEventListener("click", (e) => handleSquareClick(e, ship, player));
        });
    }
export const handleSquareClick = (e, ship, player) => {
        const col = parseInt(e.currentTarget.getAttribute("col"));
        const row = parseInt(e.currentTarget.getAttribute("row"));

        player.board.placeShip(ship, row, col, "horizontal");
    }

class Game{
    constructor(player1, player2)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.isGameOver = false;
        this.turn = 1;
    }

    //turn base playing game

    getAttacker(){
        if(this.turn % 2 !== 0) {
            //if it's player1 turn, returns player2 name.
            return this.player1;
        } else{
            return this.player2;
        }
    }
    getReceiver(){
        if(this.turn % 2 !== 0) {
            //if it's player1 turn, returns player2 name.
            return this.player2;
        } else{
            return this.player1;
        }
    }
    //returns player1 and player2 as strings
    getCurrentTurnOpponent(){
        return this.getAttacker().name == this.player1.name ? "player2" : "player1";
    }
    nextTurn(){
        this.turn++;
        return this.turn;
    }

    loadSetupUI(player){
        console.log(player);
        const root = document.getElementById("root");

        const userInterface = document.createElement("div");
        userInterface.className = "setup-menu";

        //Load Set pieces by players
        userInterface.appendChild(banner(player.name));
        userInterface.appendChild(loadButtons(player));

        const shipMenuBoardContainer = document.createElement("div");
        shipMenuBoardContainer.className = "board-container";
        shipMenuBoardContainer.appendChild(loadBoard(player));
        shipMenuBoardContainer.appendChild(shipMenu(player));
        userInterface.appendChild(shipMenuBoardContainer);
        userInterface.appendChild(loadStartButton());

        //After First player place all pieces, 2nd player starts to set the pieces
        //if 2nd player is a computer, start the game        

        root.appendChild(userInterface);
    }
    loadGameUI(){

    }

  

}

export default Game;