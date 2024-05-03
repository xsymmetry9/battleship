import '../style/menu.scss'
import GameSetup from "./GameSetup";

export default class Menu{
    static load(){
        const root = document.getElementById("root");
        root.appendChild(this.UI());
        this.loadHandlers();
    }
    static UI(){
        const container = document.createElement("div");
        container.className = "menu-box";

        container.innerHTML = `
            <h1 class="text-centered">Welcome to Battleship</h1>
            <div id="gameForm">
                <div class="row">
                    <label for="player1">
                        <span class="description">Player 1:</span>
                        <input type="text" id="player1Name"/>
                    </label>
                </div>
              
                <div class="row" id="player2Input" style="display: block">
                    <label for="player2">
                        <span class="description">Player 2:</span>
                        <input type="text" id="player2Name" disabled/>
                    </label>
                </div>

                <label for="gameMode" class="gameMode">
                    <input type="radio" id ="vsComputer" name="gameMode" value="computer">
                    <label for="vsComputer">Player vs Computer</label>
                    <input type="radio" id="vsPlayer" name="gameMode" value="player">
                    <label for="vsPlayer">Player vs Player</label>
                </label>
                
                <div class="buttons-container">
                    <button class="submit-btn" type="submit">Start Game</button>
                </div>

            </div>
           
        `
        return container;
    }
    static loadHandlers(){
        const getRadios = document.querySelectorAll(".gameMode input");
        const submit = document.querySelector(".submit-btn");

        getRadios.forEach((item) => {
            item.addEventListener(("change"), () =>{
                if(item.getAttribute("id") === "vsPlayer")
                {
                    document.getElementById("player2Name").disabled = false;
                } else {
                    document.getElementById("player2Name").disabled = true;
                }
            })
        });

        submit.addEventListener(("click"), () => GameSetup.load());
    }


}