import Ship from "./Ship"
import Gameboard from './Gameboard'
import Player from './Player'

const gameboardPlayer1 = new Gameboard(10,10);
const gameboardPlayer2 = new Gameboard(10,10);

const player1 = new Player("Gary", gameboardPlayer1, gameboardPlayer2, true);
const player2 = new Player("computer", gameboardPlayer2, gameboardPlayer1, false);

export default class App{
    static loadPage(){
        const body = document.getElementById("root");

        body.appendChild(this.loadContent());

        this.handler();
    }
    
    static loadContent(){
        const content = document.createElement("div");
        content.className = "playerBoard"

        content.appendChild(this.loadPlayer(player1));
        content.appendChild(this.loadPlayer(player2));
        return content;
    }

    static loadPlayer(player){
        const container = document.createElement("div");
        
        const title = document.createElement("h2");
        title.textContent = player.name;

        container.appendChild(this.loadGrid(player.board));
        container.appendChild(title);


        return container;
    }
    static loadGrid(gameboard){
        const getGameboard = gameboard;

        const container = document.createElement("div");
        container.className = "gameboard";

        for (let i = 0; i < getGameboard.cols; i++)
        {
            for (let j = 0; j<getGameboard.rows; j++)
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

