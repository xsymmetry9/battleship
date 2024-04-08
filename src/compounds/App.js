import Ship from "./Ship"
import Gameboard from './Gameboard'
import Player from './Player'

const gameboardPlayer1 = new Gameboard();
const gameboardPlayer2 = new Gameboard();

const player1 = new Player("Gary", gameboardPlayer1, gameboardPlayer2, true);
const player2 = new Player("computer", gameboardPlayer2, gameboardPlayer1, false);

// const ship1 = new Ship("Assault Ship", 3);
// const ship2 = new Ship("Aircraft Carrier", 5);
// const ship3 = new Ship("Destroyer", 7);
// const ship4 = new Ship("Cruiser", 3);
// const ship5 = new Ship("Combat Ship", 5);

// player1.placeShip(ship1, 0, 0, "vertical");

export default class App{
    static loadPage(){
        const body = document.getElementById("root");

        body.appendChild(this.loadBanner());
        body.appendChild(this.loadButtons());
        body.appendChild(this.loadDOM());

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

        buttons.innerHTML = `<button id="start-battleship" type="button">Start Game</button>`
        return buttons;
    }

    
    static loadDOM(){
        const content = document.createElement("div");
        content.className = "boards-container"

        content.appendChild(this.loadPlayer(player1, "player1"));
        content.appendChild(this.loadPlayer(player2, "player2"));
        return content;
    }

    static loadPlayer(player, id){
        const container = document.createElement("div");
        
        const title = document.createElement("h2");
        title.textContent = player.name;

        container.appendChild(this.loadGrid(player.board, id));
        container.appendChild(title);

        return container;
    }
    static loadGrid(gameboard, id){
        const getGameboard = gameboard;

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
                item.classList.add("miss");
            }
        });
    }

    static handler(){

        const button = document.getElementById("start-battleship");

        button.addEventListener(("click"), () =>{
            player1.placeRandomToBoard();
            player2.placeRandomToBoard();
            this.plotShips(player1.board);

        })


        const move = (e) =>{
            const square = e.currentTarget;
            const col = square.getAttribute("col");
            const row = square.getAttribute("row");

            player1.attack(col, row);

            if(player1.opponentBoard.grid[col][row] === "hit"){
                square.classList.add("hit");

                 //checks if game over
                if(!player1.opponentBoard.isGameOver())
                {
                    player2.randomAttack();
                    this.updateGameBoard();
                } else{
                    console.log("Game over");
                }
              
            } else if(player1.opponentBoard.grid[col][row] === "miss")
            {
                square.classList.add("miss");
                player2.randomAttack();
                this.updateGameBoard();

            } else{
                console.log("error");
            }
           
            square.removeEventListener(("click"), move);
        }
        const squares = document.getElementById("player2").childNodes;
        squares.forEach((square) =>{
            square.addEventListener(("click"), move);
        })
    }

}

