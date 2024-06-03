import "../style/game.scss"

export const banner = (message) =>{
    const item = document.createElement("div")
    item.innerHTML = `<h1>${message}</h1>`;
    return item;
}
export const loadButtons =(player) =>{
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
export const loadBoard = (player) =>{
     const container = document.createElement("div");
     container.className = "gameboard";
     container.setAttribute("id", player.name.toLowerCase());
    const getGameboard = player.board;

        for (let i = 0; i < getGameboard.rows; i++)
        {
            for (let j = 0; j<getGameboard.cols; j++)
            {
                const square = document.createElement("div");
                square.className = "square dropzone";
                square.setAttribute("row", i);
                square.setAttribute("col", j);
                square.setAttribute("id", `${player.name.toLowerCase()}-${i}-${j}`);
                container.appendChild(square);
            }
        }
        return container;
    }
export const updateBoard = (player) =>{
        const getSquares = document.querySelector(".gameboard").childNodes;

        getSquares.forEach((item) => {
            const parsedRow = item.getAttribute("row");
            const parsedCol = item.getAttribute("col");
            if(player.board.grid[parsedRow][parsedCol] === "hit")
            {
                item.classList.add("hit");
            } else if(player.board.grid[parsedRow][parsedCol] === "miss")
            {
                item.classList.add("miss");
            } 
        });
    }
export const loadStartButton = () =>{
    const startBtn = document.createElement("button");
    startBtn.className="start-btn";
    startBtn.textContent = "Done";
    return startBtn;
}

export const shipMenu = (player) => {
        const container = document.createElement("div");
        container.className = "ship-buttons";
   
        player.board.ships.forEach((ship) => {
            const createBtn = document.createElement("div");
            createBtn.className = "ship-btn draggable";
            createBtn.setAttribute("id", ship.id);
            createBtn.setAttribute("value", ship.name);
            createBtn.setAttribute("draggable", true);
            createBtn.textContent = ship.name;
    
            // createBtn.addEventListener("click", (e) => handleLoadShipBtn(e, player));

            container.appendChild(createBtn);
        });
        return container;
    }

export const handleLoadShipBtn = (e, player) =>{
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
const root = document.getElementById("root");

class Game{
    constructor(player1, player2)
    {
        this.player1 = player1;
        this.player2 = player2;
        this.winner = null;
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
    setWinner(winner){
        this.winner = winner;
    }

    loadSetupUI(player){
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
        root.appendChild(userInterface);
    }

}

export default Game;