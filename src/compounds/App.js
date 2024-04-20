import Ship from "./Ship"
import Gameboard from './Gameboard'
import Player from './Player'

const gameboardPlayer1 = new Gameboard();
const gameboardPlayer2 = new Gameboard();

const player1 = new Player("Gary", gameboardPlayer1, gameboardPlayer2, true);
const player2 = new Player("computer", gameboardPlayer2, gameboardPlayer1, false);

export default class App{
    static loadPage(){
        const body = document.getElementById("root");

        body.appendChild(this.loadBanner());
        body.appendChild(this.loadButtons());
        body.appendChild(this.loadDOM());
        body.appendChild(this.loadMessageLog());

        this.handler();

    }
    static loadBanner(){
        const container = document.createElement("div");
        container.className = "banner";

        const wrapper = document.createElement("div");
        wrapper.className = "display-wrapper";
        const title = document.createElement("h2")
        title.textContent = "Battleship";
        wrapper.appendChild(title);

        container.appendChild(wrapper);

        return container;
    }

    static loadButtons(){
        const buttons = document.createElement("div");
        buttons.className = "buttons-container"

        buttons.innerHTML = `
            <button id="start-battleship" type="button">Start Game</button>
            <button id="random-placement" type="button">Random Placement</button>
            <button id= "clear-board" type="button">Clear</button>
            <button id="reset-battleship" class="hidden" type="button">Reset</button>
        `
        return buttons;
    }

    static loadNewGameButton(){

    }

    static loadDOM(){
        const content = document.createElement("div");
        content.className = "boards-container";

        const handleBtnsContainer = document.createElement("div");
        handleBtnsContainer.className = "player-menu";
        
        handleBtnsContainer.appendChild(this.loadShips(player1));
        handleBtnsContainer.appendChild(this.loadOrientationBtns());

        content.appendChild(handleBtnsContainer);
        content.appendChild(this.loadBoard(player1, "player1"));
        content.appendChild(this.loadBoard(player2, "player2"));

        return content;
    }

    static loadMessageLog(){
        const container = document.createElement("div");
        container.className = "message-log-container";

        const box = document.createElement("div");
        box.className = "message-log-box";
        box.innerHTML = `<p id="message-log">Test</p>`;

        container.appendChild(box);

        return container;
    }

    // static sendMessage(message){
    //     const box = document.querySelector(".message-log-box");
    //     box.innerHTML += `<p>${message}</p>`;
    // }
    static sendMessage(message){
        const box = document.querySelector(".display-wrapper h2");
        box.textContent = message;
    }

    static loadBoard(player, id){
        const container = document.createElement("div");

        container.appendChild(this.loadGrid(player, id));
        return container;
    }

    static handleSquareClick(e, ship, player) {
        const col = parseInt(e.currentTarget.getAttribute("col"));
        const row = parseInt(e.currentTarget.getAttribute("row"));
        console.log(player.placeShip(ship, row, col, "horizontal"));
    }

    static handleOrientation = (ship) =>{
        const orientationBtns = document.querySelectorAll(".orientation-btns");
        orientationBtns.forEach((item) =>{
            if(item.value !== ship.orientation)
            {
                item.classList.remove("disabled");
                item.addEventListener(("click"), (e) => this.handleOrientationBtn(e, ship));
            } else {
                item.classList.add("disabled");
            }
        });
    }

    static handleLoadShipBtn = (e, player) =>{
        const ship = player.board.getShip(e.currentTarget.value);
        const getSquares = document.getElementById("player1").childNodes;

        this.handleOrientation(ship);
 
        getSquares.forEach((item) => {
            item.addEventListener("click", (e) => this.handleSquareClick(e, ship, player));
        });
    }

    static handleOrientationBtn = (e, ship) =>{
        // ship.setOrientation = e.currentTarget.value;
        ship.orientation = e.currentTarget.value;
        console.log(ship);
        e.currentTarget.classList.add("disabled");


        const orientationBtns = document.querySelectorAll(".orientation-btns");
        orientationBtns.forEach((item) =>{
            if(item.value !== ship.orientation)
            {
                item.classList.remove("disabled");
                item.addEventListener(("click"), (e) => this.handleOrientation(e, ship));
            }
        });

        return e.currentTarget.value;
    }

    static loadOrientationBtns = () =>{
        const container = document.createElement("div");
        container.className = "orientation-container";

        container.innerHTML = `
        <button class="orientation-btns" id="horizontal-btn" value="horizontal">horizontal</button>
        <button class="orientation-btns" id="vertical-btn" value="vertical">vertical</button>
        `;
        return container;
    }

    static loadShips(player) {
        const container = document.createElement("div");
        container.className = "ship-buttons";
   
        player.board.ships.forEach((ship) => {
            const createShips = document.createElement("div");
            createShips.className = "ship-btn-container";
    
            const createBtn = document.createElement("button");
            createBtn.className = "ship-btn";
            createBtn.setAttribute("id", ship.id);
            createBtn.setAttribute("value", ship.name);
            createBtn.textContent = ship.name;
    
            createBtn.addEventListener("click", (e) => this.handleLoadShipBtn(e, player));

            createShips.appendChild(createBtn);
            container.appendChild(createShips);

       
        });

        return container;
    

    }
    static loadGrid(player, id){
        const getGameboard = player.board;

        const container = document.createElement("div");
        container.className = "gameboard";
        container.setAttribute("id", id);

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

    static plotShips(gameboard){
        const getSquares = document.getElementById("player1").childNodes;

        getSquares.forEach((item) =>{
            const col = item.getAttribute("col");
            const row = item.getAttribute("row");
            if(gameboard.grid[row][col] !== null)
            {
                item.classList.add("ship");
            }
        })
    }
    static updateGameBoard(){
        const getSquares = document.getElementById("player1").childNodes;

        getSquares.forEach((item) => {
            const col = item.getAttribute("col");
            const row = item.getAttribute("row");
            if(player1.board.grid[col][row] == "hit")
            {
                item.classList.remove("ship");
                item.classList.add("hit");
            } else if(player1.board.grid[col][row] == "miss")
            {
            }
        });
    }

    static handler(){
        const startBtn = document.getElementById("start-battleship");
        const randomPlacementBtn = document.getElementById("random-placement");
        const clearBoardBtn = document.getElementById("clear-board")
        const resetBtn = document.getElementById("reset-battleship");
        const content = document.querySelector(".boards-container");
        const getShipBtns = document.querySelector(".ship-buttons");
        const playerMenu = document.querySelector(".player-menu");

        const move = (e) =>{
            const square = e.currentTarget;
            const col = square.getAttribute("col");
            const row = square.getAttribute("row");

            this.sendMessage(player1.attack(player2.name, row, col)); //players chooses to go
            if(player1.opponentBoard.grid[col][row] === "hit"){
                 //checks if game over
                if(player1.opponentBoard.isGameOver())
                {
                    alert("Game over");
                    removeHandler();
                } else{
                    setTimeout(() =>{
                        this.sendMessage((player2.randomAttack()));
                        this.updateGameBoard();
                    }, 3000);
                }
              
            } else if(player1.opponentBoard.grid[col][row] === "miss")
            {    
                setTimeout(() =>{
                    this.sendMessage((player2.randomAttack()));
                    this.updateGameBoard();
                }, 3000);

            } else{
                console.log("error");
            }
           
            square.removeEventListener(("click"), move);
        }

        const addHandler = ()=>{
            const squares = document.getElementById("player2").childNodes;
            squares.forEach((square) =>{
                square.addEventListener(("click"), move);
            });
        }

        const removeHandler = () => {
            const getChildren = document.getElementById("player2").childNodes;
            getChildren.forEach((square) =>{
                square.removeEventListener(("click"), move);
            });
        }

        const start = () =>{
            addHandler();
            getShipBtns.classList.add("hidden");
            this.sendMessage("Player 1 moves first");
            player2.placeRandomToBoard();
            startBtn.removeEventListener(("click"), start);
            startBtn.classList.add("hidden");
            randomPlacementBtn.classList.add("hidden");
            clearBoardBtn.classList.add("hidden");
            resetBtn.classList.remove("hidden");
        }

        const removeRender = (player) =>{
            const squares = document.getElementById(player).childNodes;
            squares.forEach((square) => {square.className = "square"});

        }
        const randomPlacement = (player) =>{
            player1.placeRandomToBoard();
            this.plotShips(player1.board);   
        }

        const clearBoard = (player) =>{
            console.log("clear")
            player.board.clearGrid();
            player.board.changeAllShiptoNotDeployed();
            removeRender("player1");
        }

        const reset = () =>{
            player1.board.clearGrid();
            player2.board.clearGrid();
            removeHandler();
            removeRender("player1");
            removeRender("player2");

            this.sendMessage("Press Start.")

            startBtn.addEventListener(("click"), start);
            startBtn.classList.remove("hidden");
            resetBtn.classList.add("hidden");
            getShipBtns.classList.remove("hidden");
            randomPlacementBtn.classList.remove("hidden");
            clearBoardBtn.classList.remove("hidden");

        }

        startBtn.addEventListener(("click"), start);
        randomPlacementBtn.addEventListener(("click"), () => randomPlacement(player1));
        clearBoardBtn.addEventListener(("click"), () => clearBoard(player1))
        resetBtn.addEventListener(("click"), reset);

   
    }

}

