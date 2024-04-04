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

export default class App{
    static loadPage(){
        const body = document.getElementById("root");

        body.appendChild(this.loadContent());

        this.handler();
    }
    
    static loadContent(){
        const content = document.createElement("div");
        content.className = "playerBoard"

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

                if(gameboard.grid[i][j] !== null)
                {
                    square.classList.add("ship");
                }
                square.setAttribute("row", i);
                square.setAttribute("col", j);

                container.appendChild(square);
            }
        }

        return container;

    }

    static handler(){

        const squares = document.querySelectorAll(".square");
        squares.forEach((square) =>{
            square.addEventListener(("click"), (e)=> {
                const col = e.currentTarget.getAttribute("col");
                const row = e.currentTarget.getAttribute("row");

                console.log(`You have clicked ${col}, ${row}`);
            })
        })
    }

}

