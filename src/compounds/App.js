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
            <button id="reset-battleship" class="hidden" type="button">Reset</button>
        `
        return buttons;
    }

    static loadNewGameButton(){

    }

    static loadDOM(){
        const content = document.createElement("div");
        content.className = "boards-container"

        content.appendChild(this.loadShips(player1));
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

    static loadShips(player){
        const container = document.createElement("div");
        container.className = "ship-buttons";
        
        player.board.ships.forEach((ship) => {
            const createShips = document.createElement("div");
            createShips.className = "ship-btn-container";
            const createBtn = document.createElement("button");
            createBtn.className = "ship-btn";
            createBtn.setAttribute("id", ship.id);
            createBtn.setAttribute("value", ship.name);

            createBtn.addEventListener(("click"), e =>{

                console.log(e.currentTarget.value);
                
                const ship = player.board.getShip(e.currentTarget.value);
                console.log(ship);


                // console.log(player.board.getShip(e.currentTarget.value));
                const getSquares = document.getElementById("player1").childNodes;
                getSquares.forEach((item) =>{

                    item.addEventListener(("click"), e =>{
                        const col = parseInt(e.currentTarget.getAttribute("col"));
                        const row = parseInt(e.currentTarget.getAttribute("row"));

                        console.log(player.board.placeShip(ship, row, col, "vertical"));
                   })
                    // const col = item.getAttribute("col");
                    // const row = item.getAttribute("row");
                    // if(player.board.grid[row][col] !== null)
                    // {
                    //     item.classList.add("ship");
                    // }
                });

            });
            createBtn.textContent = ship.name;

            createShips.appendChild(createBtn);

            container.appendChild(createShips);
        })
        return container;
    }
    static loadGrid(player, id){
        const getGameboard = player.board;

        const container = document.createElement("div");
        container.className = "gameboard";
        container.setAttribute("id", id)

        for (let i = 0; i < getGameboard.rows; i++)
        {
            for (let j = 0; j<getGameboard.cols; j++)
            {
                const square = document.createElement("div");
                square.className = "square";

                square.setAttribute("row", i);
                square.setAttribute("col", j);
                square.setAttribute("id", `${player.name}-${i}-${j}`)

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
        const resetBtn = document.getElementById("reset-battleship");
        const content = document.querySelector(".boards-container");
        const getShipBtns = document.querySelector(".ship-buttons");

        const move = (e) =>{
            const square = e.currentTarget;
            const col = square.getAttribute("col");
            const row = square.getAttribute("row");

            this.sendMessage(player1.attack(row, col)); //players chooses to go
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
            player1.placeRandomToBoard();
            player2.placeRandomToBoard();
            this.plotShips(player1.board);   
            startBtn.removeEventListener(("click"), start);
            startBtn.classList.add("hidden");
            resetBtn.classList.remove("hidden");
        }

        const removeRender = (player) =>{
            const squares = document.getElementById(player).childNodes;
            squares.forEach((square) => {square.className = "square"});

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

        }

        startBtn.addEventListener(("click"), start);
        resetBtn.addEventListener(("click"), reset);

   
    }

}

