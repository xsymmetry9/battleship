import Menu from '../Section/Menu';
// import Board from './Gameboard';
// import Player from './Player';
// import Game from './Game';
// import {plotMessage,
//      removeRender, 
//      plotShip,
//      plotShips, 
//      randomPlacement, 
//      removeAllChildNodes,
//      addAllChildNodes, 
//      clearBoard} from './Plot'

export default class App{
    static loadPage(){
        Menu.load();
    }

    // static loadButtons(){
    //     const buttons = document.createElement("div");
    //     buttons.className = "buttons-container"

    //     buttons.innerHTML = `
    //         <button id="start-battleship" type="button">Start Game</button>
    //         <button id="random-placement" type="button">Random Placement</button>
    //         <button id= "clear-board" type="button">Clear</button>
    //         <button id="reset-battleship" class="hidden" type="button">Reset</button>
    //     `
    //     return buttons;
    // }

    // static loadBoards(){
    //     const boards = document.createElement("div");
    //     boards.className = "boards-container";
    //     boards.appendChild(this.loadBoard(player1, "myBoard"));
    //     boards.appendChild(this.loadBoard(player2, "opponentBoard"));

    //     return boards;
    // }

    // static loadDOM(){
    //     const content = document.createElement("div");
    //     content.className = "game-container";

    //     const handleBtnsContainer = document.createElement("div");
    //     handleBtnsContainer.className = "player-menu";
        
    //     handleBtnsContainer.appendChild(this.loadShips(player1));
    //     handleBtnsContainer.appendChild(this.loadOrientationBtns());
    //     content.appendChild(handleBtnsContainer);

    //     content.appendChild(this.loadBoards());

    //     return content;
    // }

    // static loadMessageLog(){
    //     const container = document.createElement("div");
    //     container.className = "message-log-container";

    //     const box = document.createElement("div");
    //     box.className = "message-log-box";
    //     box.innerHTML = `<p id="message-log">Test</p>`;

    //     container.appendChild(box);

    //     return container;
    // }
    // static sendMessage(message){
    //     const box = document.querySelector(".display-wrapper h2");
    //     box.textContent = message;
    // }

    // static loadBoard(player, id){
        
    //     return this.loadGrid(player, id);
    // }

    // static handleSquareClick(e, ship, player) {
    //     const col = parseInt(e.currentTarget.getAttribute("col"));
    //     const row = parseInt(e.currentTarget.getAttribute("row"));
    //     console.log(player.placeShip(ship, row, col, "horizontal"));
    // }

    // static handleOrientation = (ship) =>{
    //     const orientationBtns = document.querySelectorAll(".orientation-btns");
    //     orientationBtns.forEach((item) =>{
    //         if(item.value !== ship.orientation)
    //         {
    //             item.classList.remove("disabled");
    //             item.addEventListener(("click"), (e) => this.handleOrientationBtn(e, ship));
    //         } else {
    //             item.classList.add("disabled");
    //         }
    //     });
    // }

    // static handleLoadShipBtn = (e, player) =>{
    //     const ship = player.board.getShip(e.currentTarget.value);
    //     const getSquares = document.getElementById("myBoard").childNodes;

    //     this.handleOrientation(ship);
 
    //     getSquares.forEach((item) => {
    //         item.addEventListener("click", (e) => this.handleSquareClick(e, ship, player));
    //     });
    // }

    // static handleOrientationBtn = (e, ship) =>{
    //     // ship.setOrientation = e.currentTarget.value;
    //     ship.orientation = e.currentTarget.value;
    //     console.log(ship);
    //     e.currentTarget.classList.add("disabled");


    //     const orientationBtns = document.querySelectorAll(".orientation-btns");
    //     orientationBtns.forEach((item) =>{
    //         if(item.value !== ship.orientation)
    //         {
    //             item.classList.remove("disabled");
    //             item.addEventListener(("click"), (e) => this.handleOrientation(e, ship));
    //         }
    //     });

    //     return e.currentTarget.value;
    // }

    // static loadOrientationBtns = () =>{
    //     const container = document.createElement("div");
    //     container.className = "orientation-container";

    //     container.innerHTML = `
    //     <button class="orientation-btns" id="horizontal-btn" value="horizontal">horizontal</button>
    //     <button class="orientation-btns" id="vertical-btn" value="vertical">vertical</button>
    //     `;
    //     return container;
    // }

    // static loadShips(player) {
    //     const container = document.createElement("div");
    //     container.className = "ship-buttons";
   
    //     player.board.ships.forEach((ship) => {
    //         const createShips = document.createElement("div");
    //         createShips.className = "ship-btn-container";
    
    //         const createBtn = document.createElement("button");
    //         createBtn.className = "ship-btn";
    //         createBtn.setAttribute("id", ship.id);
    //         createBtn.setAttribute("value", ship.name);
    //         createBtn.textContent = ship.name;
    
    //         createBtn.addEventListener("click", (e) => this.handleLoadShipBtn(e, player));

    //         createShips.appendChild(createBtn);
    //         container.appendChild(createShips);
       
    //     });

    //     return container;
    
    // }
    // static loadGrid(player, id){
    //     const getGameboard = player.board;

    //     const container = document.createElement("div");
    //     container.className = "gameboard";
    //     container.setAttribute("id", id);

    //     for (let i = 0; i < getGameboard.rows; i++)
    //     {
    //         for (let j = 0; j<getGameboard.cols; j++)
    //         {
    //             const square = document.createElement("div");
    //             square.className = "square";

    //             square.setAttribute("row", i);
    //             square.setAttribute("col", j);
    //             square.setAttribute("id", `${player.name.toLowerCase()}-${i}-${j}`);

    //             container.appendChild(square);
    //         }
    //     }
    //     return container;
    // }

    // static plotShips(gameboard){
    //     const getSquares = document.getElementById("player1").childNodes;

    //     getSquares.forEach((item) =>{
    //         const col = item.getAttribute("col");
    //         const row = item.getAttribute("row");
    //         if(gameboard.grid[row][col] !== null)
    //         {
    //             item.classList.add("ship");
    //         }
    //     })
    // }


    // static handler(){
    //     const startBtn = document.getElementById("start-battleship");
    //     const randomPlacementBtn = document.getElementById("random-placement");
    //     const clearBoardBtn = document.getElementById("clear-board")
    //     const resetBtn = document.getElementById("reset-battleship");
    //     const gameContainer = document.querySelector(".game-container");
    //     const getShipBtns = document.querySelector(".ship-buttons");
    //     const playerMenu = document.querySelector(".player-menu");

    //     const move = (e) =>{
    //         const square = e.currentTarget;
    //         const col = square.getAttribute("col");
    //         const row = square.getAttribute("row");
             
    //         if(player1.attack(player2.name, row, col) === "hit"){

    //             //  checks if game over
    //             if(player1.opponentBoard.isGameOver())
    //             {
    //                 alert("Game over");
    //                 removeHandler();
    //             } else{
    //                 setTimeout(() =>{
    //                     this.sendMessage((player2.randomAttack(player1.name)));
    //                 }, 3000);
    //             }
              
    //         } else 
    //         {    
    //             setTimeout(() =>{
    //                 this.sendMessage((player2.randomAttack(player1.name)));
    //             }, 3000);

    //         }
           
    //         square.removeEventListener(("click"), move);
    //     }

    //     const start = () =>{
    //         const playerMoves = () =>{
    //             const squares = document.getElementById(`opponentBoard`).childNodes;
    //             squares.forEach((square) => {
    //                 square.addEventListener(("click"), play);
    //             });
    //         }
    //         const removeHandler = () => {
    //             console.log("all handlers were removed successfully.")
    //             const getChildren = document.getElementById(`opponentBoard`).childNodes;
    //             getChildren.forEach((square) =>{
    //                 square.removeEventListener(("click"), play);
    //             });
    //         }
    //         const play = (e) =>{
                
    //             const row = e.currentTarget.getAttribute("row");
    //             const col = e.currentTarget.getAttribute("col");
    //             const result = battleShipGame.getAttacker() !== "computer" ? battleShipGame.getAttacker().attack(battleShipGame.getReceiver().name, row, col) : battleShipGame.getAttacker().randomAttack(battleShipGame.getReceiver());
    //             if(result === "hit")
    //             {
    //                 console.log("hit");
    //                 //checks for status
    //             } else {
    //                 removeHandler();
    //                 battleShipGame.nextTurn();
    //                 console.log(battleShipGame.turn);

    //                 playerMoves();
    //             };
    //             // console.log(battleShipGame.isGameOver);
    //             // removeHandler();
    //         }
      
    //         plotMessage("Player 1 goes first")
    //         const battleShipGame = new Game(player1, player2, false);
    //         battleShipGame.player2.placeRandomToBoard();

    //         if(!battleShipGame.isGameOver &&
    //             battleShipGame.player1.board.isAllShipsDeployed() && battleShipGame.player2.board.isAllShipsDeployed())
    //         {
    //             //Add handler to each square
    //             startBtn.removeEventListener(("click"), start);
    //             startBtn.classList.add("hidden");
    //             randomPlacementBtn.classList.add("hidden");
    //             clearBoardBtn.classList.add("hidden");
    //             resetBtn.classList.remove("hidden");
    //             removeAllChildNodes(playerMenu);

    //             //Game starts here
    //             playerMoves();
    //             console.log(battleShipGame.turn);

    //         } else {
    //             console.log(false);
    //         }

    //     }

    //     const reset = () =>{
    //         player1.board.clearGrid();
    //         player2.board.clearGrid();
    //         this.updateGameBoard("myBoard");
    //         // removeRender("myBoard");
    //         // removeRender("opponentBoaard");



    //         resetBtn.classList.add("hidden");
    //         startBtn.addEventListener(("click"), start);
    //         startBtn.classList.remove("hidden");
    //         getShipBtns.classList.remove("hidden");
    //         randomPlacementBtn.classList.remove("hidden");
    //         clearBoardBtn.classList.remove("hidden");

    //         this.sendMessage("Press Start.")


    //     }

    //     startBtn.addEventListener(("click"), start);
    //     randomPlacementBtn.addEventListener(("click"), () => randomPlacement(player1));
    //     clearBoardBtn.addEventListener(("click"), () => clearBoard(player1))
    //     resetBtn.addEventListener(("click"), reset);

   
    // }

}

