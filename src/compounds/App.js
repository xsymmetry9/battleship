import Ship from "./Ship"
import Gameboard from './Gameboard'
import Player from './Player'

const gameboardPlayer1 = new Gameboard(10,10);
const gameboardPlayer2 = new Gameboard(10,10);

const player1 = new Player("Gary", gameboardPlayer1, gameboardPlayer2, true);
const player2 = new Player("computer", gameboardPlayer2, gameboardPlayer1, false);

const ship1 = new Ship("Destroyer", 3);
const ship2 = new Ship("Destroyer", 5);
const ship3 = new Ship("Destroyer", 7);
const ship4 = new Ship("Destroyer", 3);
const ship5 = new Ship("Destroyer", 5);

player1.placeShip(ship1, 0, 0, "horizontal");
player1.placeShip(ship2, 5, 5, "vertical");
player1.placeShip(ship3, 2, 2, "horizontal");
player1.placeShip(ship4, 4, 0, "horizontal");
player1.placeShip(ship5, 9, 2, "vertical");
player2.placeShip(ship1, 0, 0, "horizontal");
player2.placeShip(ship2, 5, 5, "vertical");
player2.placeShip(ship3, 2, 2, "horizontal");
player2.placeShip(ship4, 4, 0, "horizontal");
player2.placeShip(ship5, 9, 2, "vertical");

export default class App{
    static loadPage(){
        const body = document.getElementById("root");

        body.appendChild(this.loadBanner());
        body.appendChild(this.loadButtons());
        body.appendChild(this.loadDOM());

        this.handler();
        this.plotShips(player1.board);
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

        const startBtn = document.createElement("button");
        startBtn.textContent = "Start Game";
        buttons.appendChild(startBtn);

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

        for (let i = 0; i < getGameboard.cols; i++)
        {
            for (let j = 0; j<getGameboard.rows; j++)
            {
                const square = document.createElement("div");
                square.className = "square";

                // if(gameboard.grid[i][j] !== null)
                // {
                //     square.classList.add("ship");
                // }
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
            if(gameboard.grid[col][row] !== null)
            {
                item.classList.add("ship");
            }
        })
    }

    static handler(){

        const move = (e) =>{
            const square = e.currentTarget;
            const col = square.getAttribute("col");
            const row = square.getAttribute("row");

            player1.attack(col, row);

            if(player1.opponentBoard.grid[col][row] === "hit"){
                square.classList.add("hit");
            } else if(player1.opponentBoard.grid[col][row] === "miss")
            {
                square.classList.add("miss");
            } else{
                console.log("error");
            }

            square.removeEventListener(("click"), move);
        }
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) =>{
            square.addEventListener(("click"), move);
        })
    }

}

