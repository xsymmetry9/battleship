/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Section/Menu.js":
/*!*****************************!*\
  !*** ./src/Section/Menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Menu)
/* harmony export */ });
/* harmony import */ var _style_menu_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/menu.scss */ "./src/style/menu.scss");
/* harmony import */ var _compounds_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compounds/Game */ "./src/compounds/Game.js");
/* harmony import */ var _compounds_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../compounds/Player */ "./src/compounds/Player.js");
/* harmony import */ var _compounds_Gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../compounds/Gameboard */ "./src/compounds/Gameboard.js");




class Menu {
  static load() {
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
           
        `;
    return container;
  }
  static loadHandlers() {
    const getRadios = document.querySelectorAll(".gameMode input");
    getRadios.forEach(item => {
      item.addEventListener("change", () => {
        if (item.getAttribute("id") === "vsPlayer") {
          document.getElementById("player2Name").disabled = false;
        } else {
          document.getElementById("player2Name").disabled = true;
        }
      });
    });
  }
}

/***/ }),

/***/ "./src/compounds/App.js":
/*!******************************!*\
  !*** ./src/compounds/App.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _Section_Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Section/Menu */ "./src/Section/Menu.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/compounds/Gameboard.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/compounds/Player.js");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Game */ "./src/compounds/Game.js");
/* harmony import */ var _Plot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Plot */ "./src/compounds/Plot.js");





class App {
  static loadPage() {
    const body = document.getElementById("root");
    body.appendChild(_Section_Menu__WEBPACK_IMPORTED_MODULE_0__["default"].load());
    _Section_Menu__WEBPACK_IMPORTED_MODULE_0__["default"].loadHandlers();
    this.submitHandler();

    // body.appendChild(this.loadBanner());
    // body.appendChild(this.loadButtons());
    // body.appendChild(this.loadDOM());
    // body.appendChild(this.loadMessageLog());

    // this.handler();
  }
  static submitHandler() {
    const submit = document.querySelector(".submit-btn");
    submit.addEventListener("click", () => {
      const player1Board = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
      const player2Board = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
      const isPlayerVsComputer = document.getElementById("vsComputer").checked;
      const isPlayerVsPlayer = document.getElementById("vsPlayer").checked;
      if (isPlayerVsPlayer || isPlayerVsComputer) {
        const getPlayer1Name = new _Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player1Name").value, player1Board, player2Board, true);
        const getPlayer2Name = isPlayerVsComputer ? new _Player__WEBPACK_IMPORTED_MODULE_2__["default"]("computer", player2Board, player1Board, false) : new _Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player2Name").value, player2Board, player1Board, true);
        const game = new _Game__WEBPACK_IMPORTED_MODULE_3__["default"](getPlayer1Name, getPlayer2Name);
        document.getElementById("root").removeChild(document.querySelector(".menu-box"));
        game.loadSetupUI(game.player1); //Player1 goes first
        const randomPlacementBtn = document.getElementById("random-placement");
        const clearBtn = document.getElementById("clear-board");
        const doneBtn = document.querySelector(".start-btn");
        const shipBtns = document.querySelectorAll(".ship-btn");
        shipBtns.forEach(shipBtn => shipBtn.addEventListener("click", () => this.activateSquare(game.player1, shipBtn.value)));
        randomPlacementBtn.addEventListener("click", () => (0,_Plot__WEBPACK_IMPORTED_MODULE_4__.randomPlacement)(game.player1));
        clearBtn.addEventListener("click", () => (0,_Plot__WEBPACK_IMPORTED_MODULE_4__.clearBoard)(game.player1));
        doneBtn.addEventListener("click", () => this.finishedSetupBtn(game));
      } else {
        console.log("error");
      }
    });
  }
  static activateSquare = (player, name) => {
    const getSquares = document.querySelector(".gameboard").childNodes;
    const placeShipToBoard = e => {
      const row = parseInt(e.target.getAttribute("row")); //returns row
      const col = parseInt(e.target.getAttribute("col")); //returns column
      const ship = player.board.getShip(name); //returns ship
      // console.log(player.board.placeShip(ship, parseInt(row), parseInt(col)));

      if (player.board.grid[row][col] === null) {
        //place the ship
        return player.placeShip(ship, row, col);
      } else {
        //selects the ship
        return "There is a ship located there.  Place another square.";
      }
    };
    getSquares.forEach(item => {
      item.addEventListener("click", placeShipToBoard);
    });
  };
  static finishedSetupBtn = game => {
    document.getElementById("root").removeChild(document.querySelector(".setup-menu"));
    if (game.player2.isHuman) {
      game.loadSetupUI(game.player2);
      const randomPlacementBtn = document.getElementById("random-placement");
      const clearBtn = document.getElementById("clear-board");
      const doneBtn = document.querySelector(".start-btn");
      const shipBtns = document.querySelectorAll(".ship-btn");
      shipBtns.forEach(shipBtn => shipBtn.addEventListener("click", () => this.activateSquare(game.player2, shipBtn.value)));
      randomPlacementBtn.addEventListener("click", () => (0,_Plot__WEBPACK_IMPORTED_MODULE_4__.randomPlacement)(game.player2));
      clearBtn.addEventListener("click", () => (0,_Plot__WEBPACK_IMPORTED_MODULE_4__.clearBoard)(game.player2));
      doneBtn.addEventListener("click", () => this.startGame);
    } else {
      console.log("computer");
    }
  };
  static startGame = game => {
    console.log(game);
  };

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
  // static updateGameBoard(player){
  //     const getSquares = document.getElementById(player).childNodes;

  //     getSquares.forEach((item) => {
  //         const col = item.getAttribute("col");
  //         const row = item.getAttribute("row");
  //         if(player1.board.grid[col][row] == "hit")
  //         {
  //             item.classList.remove("ship");
  //             item.classList.add("hit");
  //         } else if(player1.board.grid[col][row] == "miss")
  //         {
  //         }
  //     });
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

/***/ }),

/***/ "./src/compounds/Functions.js":
/*!************************************!*\
  !*** ./src/compounds/Functions.js ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "./src/compounds/Game.js":
/*!*******************************!*\
  !*** ./src/compounds/Game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   handleSquareClick: () => (/* binding */ handleSquareClick)
/* harmony export */ });
/* harmony import */ var _Functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Functions */ "./src/compounds/Functions.js");
/* harmony import */ var _Functions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Functions__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Plot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Plot */ "./src/compounds/Plot.js");
/* harmony import */ var _style_game_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/game.scss */ "./src/style/game.scss");



const banner = message => {
  const item = document.createElement("div");
  item.innerHTML = `<h1>${message}</h1>`;
  return item;
};
const loadButtons = player => {
  const buttons = document.createElement("div");
  buttons.className = "buttons-container";
  const randomPlacementBtn = document.createElement("button");
  randomPlacementBtn.setAttribute("id", "random-placement");
  randomPlacementBtn.textContent = "random";
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "clear";
  clearBtn.setAttribute("id", "clear-board");
  buttons.appendChild(randomPlacementBtn);
  buttons.appendChild(clearBtn);
  return buttons;
};
const loadBoard = player => {
  const container = document.createElement("div");
  container.className = "gameboard";
  container.setAttribute("id", player.name);
  const getGameboard = player.board;
  for (let i = 0; i < getGameboard.rows; i++) {
    for (let j = 0; j < getGameboard.cols; j++) {
      const square = document.createElement("div");
      square.className = "square";
      square.setAttribute("row", i);
      square.setAttribute("col", j);
      square.setAttribute("id", `${player.name.toLowerCase()}-${i}-${j}`);
      container.appendChild(square);
    }
  }
  return container;
};
const loadStartButton = () => {
  const startBtn = document.createElement("button");
  startBtn.className = "start-btn";
  startBtn.textContent = "Done";
  return startBtn;
};
const shipMenu = player => {
  const container = document.createElement("div");
  container.className = "ship-buttons";
  player.board.ships.forEach(ship => {
    const createBtn = document.createElement("button");
    createBtn.className = "ship-btn";
    createBtn.setAttribute("id", ship.id);
    createBtn.setAttribute("value", ship.name);
    createBtn.textContent = ship.name;

    // createBtn.addEventListener("click", (e) => handleLoadShipBtn(e, player));

    container.appendChild(createBtn);
  });
  return container;
};
const handleLoadShipBtn = (e, player) => {
  const ship = player.board.getShip(e.currentTarget.value);
  console.log(ship);
  const getSquares = document.getElementById(player.name.toLowerCase()).childNodes;
  getSquares.forEach(item => {
    item.addEventListener("click", e => handleSquareClick(e, ship, player));
  });
};
const handleSquareClick = (e, ship, player) => {
  const col = parseInt(e.currentTarget.getAttribute("col"));
  const row = parseInt(e.currentTarget.getAttribute("row"));
  player.board.placeShip(ship, row, col, "horizontal");
};
class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.isGameOver = false;
    this.turn = 1;
  }

  //turn base playing game

  getAttacker() {
    if (this.turn % 2 !== 0) {
      //if it's player1 turn, returns player2 name.
      return this.player1;
    } else {
      return this.player2;
    }
  }
  getReceiver() {
    if (this.turn % 2 !== 0) {
      //if it's player1 turn, returns player2 name.
      return this.player2;
    } else {
      return this.player1;
    }
  }
  //returns player1 and player2 as strings
  getCurrentTurnOpponent() {
    return this.getAttacker().name == this.player1.name ? "player2" : "player1";
  }
  nextTurn() {
    this.turn++;
    return this.turn;
  }
  loadSetupUI(player) {
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
  loadGameUI() {}
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/compounds/Gameboard.js":
/*!************************************!*\
  !*** ./src/compounds/Gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/compounds/Ship.js");

class Gameboard {
  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.grid = Array.from({
      length: this.rows
    }, () => Array(this.cols).fill(null));
    this.ships = [new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Assault Ship", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Aircraft Carrier", 5), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Destroyer", 7), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Cruiser", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Combat Ship", 1)];
  }

  //Clears the board.
  clearGrid() {
    this.grid.forEach(row => row.fill(null));
    this.changeAllShiptoNotDeployed();
  }
  //Checks if there are any ships on the board and if it fits.
  isValid(ship, row, col) {
    if (ship.orientation === "horizontal") {
      if (col + ship.length > this.cols) {
        console.log("Error: Ship doesn't fit horizontally.");
        return false; // "Error: Ship doesn't fit horizontally.";
      } else {
        let index = 0;
        while (index < ship.length) {
          if (this.grid[row][col + index] !== null) {
            console.log("Error: A ship is already present at this location horizontally."); //A ship is current in that location)
            return false; //"Error: A ship is already present at this location horizontally."; //A ship is current in that location
          }
          index++;
        }
        return true; //Pass all test
      }
    } else if (ship.orientation === "vertical") {
      if (row + ship.length > this.rows) {
        console.log("Ship doesn't fit vertically");
        return false; //"Ship doesn't fit vertically"; //Ship doesn't fit.
      } else {
        let index = 0;
        while (index < ship.length) {
          if (this.grid[row + index][col] !== null) {
            console.log("A ship is already at this location vertically.");
            return false; //"A ship is already at this location vertically."; //A ship is current in that location
            //A ship is current in that location
          }
          index++;
        }
        return true;
      }
    } else {
      return false; //"Invalid direction"; //invalid name
    }
  }
  //Places the ship on the board.
  placeShip(ship, row, col) {
    if (!this.isValid(ship, row, col)) return ship.deploy;
    if (ship.orientation === "horizontal") {
      //checks for overlaps or out of bounds
      for (let index = 0; index < ship.length; index++) {
        this.grid[row][col + index] = ship;
      }
      ship.deploy = true;
      return ship.deploy;
    } else if (ship.orientation === "vertical") {
      //direction is horizontal
      //if everything passes, place the ship vertically
      for (let index = 0; index < ship.length; index++) {
        this.grid[row + index][col] = ship;
      }
      ship.deploy = true;
      return ship.deploy;
    } else {
      return ship.deploy;
    }
  }
  getShip(shipName) {
    let result;
    this.ships.forEach(ship => {
      if (ship.name === shipName) {
        result = ship;
      } else {
        return "ship not found";
      }
    });
    return result;
  }
  //Places an attack on the board.
  receiveAttack(x, y) {
    if (x >= this.cols || y >= this.rows) return "out of bounds";
    if (this.grid[x][y] === null) {
      this.grid[x][y] = "miss"; //mark down miss
      return "miss";
    } else {
      this.grid[x][y] = "hit";
      return "hit";
    }
  }
  getMaxHits() {
    let sum = 0;
    this.ships.forEach(ship => {
      sum += ship.length;
    });
    return sum;
  }
  getHits() {
    let sum = 0;
    this.ships.forEach(ship => {
      sum += ship.hits;
    });
    return sum;
  }
  checksDifference() {
    return this.getMaxHits() - this.getHits();
  }

  //Checks if the game is over.
  isGameOver() {
    console.log(this.checksDifference());
    return this.checksDifference() === 0 ? true : false;
  }
  isAllShipsDeployed() {
    let result = true;
    this.ships.forEach(ship => {
      if (!ship.deploy) result = false;
    });
    return result;
  }
  changeAllShiptoNotDeployed() {
    this.ships.map(ship => ship.deploy = false);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/compounds/Player.js":
/*!*********************************!*\
  !*** ./src/compounds/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random */ "./src/compounds/Random.js");
/* harmony import */ var _Plot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Plot */ "./src/compounds/Plot.js");


class Player {
  constructor(name, gameboard, opponentBoard, isHuman) {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
  }
  //Places ships randomly on the board.
  placeRandomToBoard() {
    this.board.ships.forEach(ship => {
      (0,_Random__WEBPACK_IMPORTED_MODULE_0__.randomPlacement)(this.board, ship);
    });
    return this.opponentBoard.ships;
  }
  //A function that places ships on the board manually.
  placeShip(ship, row, col) {
    if (!ship.deploy && this.board.placeShip(ship, row, col)) {
      (0,_Plot__WEBPACK_IMPORTED_MODULE_1__.plotShip)(this.name, row, col, ship.length, ship.orientation);
      return this.board.grid;
    } else {
      return "Ship has already been deployed.  Tried again";
    }
  }
  //Player chooses to attack on the opponent's board.
  attack(enemyBoardName, row, col) {
    const plot = document.getElementById(`${enemyBoardName}-${row}-${col}`);
    if (this.opponentBoard.receiveAttack(row, col) === "hit") {
      plot.classList.add("hit");
      return `hit`;
    } else {
      plot.classList.add("miss");
      return `miss`;
    }
    ;
  }
  //Player chooses to attack randomly on the opponent's board.
  randomAttack(enemyBoardName) {
    const coordinates = (0,_Random__WEBPACK_IMPORTED_MODULE_0__.getRandomCoordinates)(this.opponentBoard);
    const row = coordinates[0];
    const col = coordinates[1];
    console.log(enemyBoardName);
    return this.attack(enemyBoardName.toLowerCase(), row, col);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/compounds/Plot.js":
/*!*******************************!*\
  !*** ./src/compounds/Plot.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAllChildNodes: () => (/* binding */ addAllChildNodes),
/* harmony export */   clearBoard: () => (/* binding */ clearBoard),
/* harmony export */   plotMessage: () => (/* binding */ plotMessage),
/* harmony export */   plotShip: () => (/* binding */ plotShip),
/* harmony export */   plotShips: () => (/* binding */ plotShips),
/* harmony export */   randomPlacement: () => (/* binding */ randomPlacement),
/* harmony export */   removeAllChildNodes: () => (/* binding */ removeAllChildNodes),
/* harmony export */   removeRender: () => (/* binding */ removeRender)
/* harmony export */ });
const plotShips = (boardName, gameboard) => {
  const getSquares = document.getElementById(boardName).childNodes;
  getSquares.forEach(item => {
    const col = item.getAttribute("col");
    const row = item.getAttribute("row");
    if (gameboard.grid[row][col] !== null) {
      item.classList.add("ship");
    }
  });
  return getSquares;
};
const plotShip = (name, row, col, length, orientation) => {
  console.log({
    name: name,
    row: row,
    col: col,
    orientation: orientation
  });
  if (orientation === "horizontal") {
    for (let index = 0; index < length; index++) {
      const createId = document.getElementById(`${name.toLowerCase()}-${row}-${col + index}`);
      createId.removeEventListener("click", e => {
        console.log(e.currentTarget);
      });
      createId.classList.add("ship");
    }
  } else if (orientation === "vertical") {
    for (let index = 0; index < length; index++) {
      const createId = document.getElementById(`${name.toLowerCase()}-${row + index}-${col}`);
      createId.classList.add("ship");
    }
  } else {
    return "Plotting didn't work.";
  }
};
const plotMessage = message => {
  const box = document.querySelector(".display-wrapper h2");
  box.textContent = message;
};
const removeRender = player => {
  const squares = document.getElementById(player).childNodes;
  squares.forEach(square => {
    square.className = "square";
  });
};
const randomPlacement = player => {
  if (!player.board.isAllShipsDeployed()) {
    player.placeRandomToBoard();
    plotShips(player.name.toLowerCase(), player.board);
    return player.board.isAllShipsDeployed(); //returns true
  } else {
    clearBoard(player);
    randomPlacement(player);
  }
};
const clearBoard = player => {
  player.board.clearGrid();
  player.board.changeAllShiptoNotDeployed();
  removeRender(player.name.toLowerCase());
  return player.board.isAllShipsDeployed(); //returns false
};

//Adds ships on Menu
const addAllChildNodes = () => {
  const getMenu = document.querySelector(".player-menu");
};
const removeAllChildNodes = parent => {
  while (parent.firstChild) {
    console.log(parent);
    parent.removeChild(parent.firstChild);
  }
};


/***/ }),

/***/ "./src/compounds/Random.js":
/*!*********************************!*\
  !*** ./src/compounds/Random.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomCoordinates: () => (/* binding */ getRandomCoordinates),
/* harmony export */   randomPlacement: () => (/* binding */ randomPlacement)
/* harmony export */ });
//Generates random number depending on the number of columns and rows.
const generateNumber = max => {
  return Math.floor(Math.random() * max);
};

//Generate random coordinates within the game board
const generateCoordinates = gameboard => {
  let col = generateNumber(gameboard.cols);
  let row = generateNumber(gameboard.rows);
  return [col, row];
};

//Generate a random placement on the board.
const randomPlacement = (gameboard, ship) => {
  const coordinates = generateCoordinates(gameboard);
  const direction = Math.random() < 0.5 ? "vertical" : "horizontal";
  ship.orientation = direction;
  if (gameboard.isValid(ship, coordinates[0], coordinates[1])) {
    gameboard.placeShip(ship, coordinates[0], coordinates[1]);
  } else {
    randomPlacement(gameboard, ship);
  }
};

//Perform a random attack on the gameboard
const getRandomCoordinates = gameboard => {
  let randomCoordinates = generateCoordinates(gameboard); //returns array

  if (gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit") {
    return randomCoordinates;
  } else {
    return getRandomCoordinates(gameboard);
  }
};


/***/ }),

/***/ "./src/compounds/Ship.js":
/*!*******************************!*\
  !*** ./src/compounds/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");

const _DEFAULT_orientation = "horizontal";
class Ship {
  constructor(name, length) {
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.name = name;
    this.orientation = _DEFAULT_orientation;
    this.length = length;
    this.hits = 0;
    this.deploy = false;
  }
  setOrientation(item) {
    this.orientation = item;
    return this.orientation;
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.length - this.hits === 0) {
      console.log(`${this.name} has been sunk`);
      return true;
    } else {
      console.log(`${this.name} has been hit ${this.hits} time.`);
      return false;
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/style/game.scss":
/*!*****************************!*\
  !*** ./src/style/game.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/menu.scss":
/*!*****************************!*\
  !*** ./src/style/menu.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.scss */ "./src/style/style.scss");
/* harmony import */ var _compounds_App_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compounds/App.js */ "./src/compounds/App.js");


addEventListener("DOMContentLoaded", _compounds_App_js__WEBPACK_IMPORTED_MODULE_1__["default"].loadPage());
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUksSUFBSTtJQUN4QlcsT0FBTyxDQUFDQyxHQUFHLENBQUNaLElBQUksQ0FBQztFQUNyQixDQUFDOztFQUVEO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUdBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBOztFQUVBOztFQUVBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBSUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUdBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUdBO0FBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hicUQ7QUFDRjtBQUN4QjtBQUUzQixNQUFNaUMsTUFBTSxHQUFJQyxPQUFPLElBQUk7RUFDdkIsTUFBTTlELElBQUksR0FBR1IsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzFDTyxJQUFJLENBQUNMLFNBQVMsR0FBSSxPQUFNbUUsT0FBUSxPQUFNO0VBQ3RDLE9BQU85RCxJQUFJO0FBQ2YsQ0FBQztBQUNELE1BQU0rRCxXQUFXLEdBQUd0QixNQUFNLElBQUk7RUFDMUIsTUFBTXVCLE9BQU8sR0FBR3hFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUM3Q3VFLE9BQU8sQ0FBQ3RFLFNBQVMsR0FBRyxtQkFBbUI7RUFFdkMsTUFBTXNDLGtCQUFrQixHQUFHeEMsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQzNEdUMsa0JBQWtCLENBQUNpQyxZQUFZLENBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDO0VBQ3pEakMsa0JBQWtCLENBQUNrQyxXQUFXLEdBQUMsUUFBUTtFQUV2QyxNQUFNakMsUUFBUSxHQUFHekMsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ2pEd0MsUUFBUSxDQUFDaUMsV0FBVyxHQUFHLE9BQU87RUFDOUJqQyxRQUFRLENBQUNnQyxZQUFZLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQztFQUUxQ0QsT0FBTyxDQUFDaEQsV0FBVyxDQUFDZ0Isa0JBQWtCLENBQUM7RUFDdkNnQyxPQUFPLENBQUNoRCxXQUFXLENBQUNpQixRQUFRLENBQUM7RUFFN0IsT0FBTytCLE9BQU87QUFDZCxDQUFDO0FBQ0wsTUFBTUcsU0FBUyxHQUFJMUIsTUFBTSxJQUFJO0VBQ3hCLE1BQU1sRCxTQUFTLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQ0YsU0FBUyxDQUFDRyxTQUFTLEdBQUcsV0FBVztFQUNqQ0gsU0FBUyxDQUFDMEUsWUFBWSxDQUFDLElBQUksRUFBRXhCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDO0VBQzFDLE1BQU0wQixZQUFZLEdBQUczQixNQUFNLENBQUNXLEtBQUs7RUFFN0IsS0FBSyxJQUFJaUIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRCxZQUFZLENBQUNFLElBQUksRUFBRUQsQ0FBQyxFQUFFLEVBQzFDO0lBQ0ksS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUNILFlBQVksQ0FBQ0ksSUFBSSxFQUFFRCxDQUFDLEVBQUUsRUFDeEM7TUFDSSxNQUFNRSxNQUFNLEdBQUdqRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDNUNnRixNQUFNLENBQUMvRSxTQUFTLEdBQUcsUUFBUTtNQUUzQitFLE1BQU0sQ0FBQ1IsWUFBWSxDQUFDLEtBQUssRUFBRUksQ0FBQyxDQUFDO01BQzdCSSxNQUFNLENBQUNSLFlBQVksQ0FBQyxLQUFLLEVBQUVNLENBQUMsQ0FBQztNQUM3QkUsTUFBTSxDQUFDUixZQUFZLENBQUMsSUFBSSxFQUFHLEdBQUV4QixNQUFNLENBQUNDLElBQUksQ0FBQ2dDLFdBQVcsQ0FBQyxDQUFFLElBQUdMLENBQUUsSUFBR0UsQ0FBRSxFQUFDLENBQUM7TUFFbkVoRixTQUFTLENBQUN5QixXQUFXLENBQUN5RCxNQUFNLENBQUM7SUFDakM7RUFDSjtFQUNBLE9BQU9sRixTQUFTO0FBQ3BCLENBQUM7QUFDTCxNQUFNb0YsZUFBZSxHQUFHQSxDQUFBLEtBQUs7RUFDekIsTUFBTUMsUUFBUSxHQUFHcEYsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0VBQ2pEbUYsUUFBUSxDQUFDbEYsU0FBUyxHQUFDLFdBQVc7RUFDOUJrRixRQUFRLENBQUNWLFdBQVcsR0FBRyxNQUFNO0VBQzdCLE9BQU9VLFFBQVE7QUFDbkIsQ0FBQztBQUVELE1BQU1DLFFBQVEsR0FBSXBDLE1BQU0sSUFBSztFQUNyQixNQUFNbEQsU0FBUyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDL0NGLFNBQVMsQ0FBQ0csU0FBUyxHQUFHLGNBQWM7RUFFcEMrQyxNQUFNLENBQUNXLEtBQUssQ0FBQzBCLEtBQUssQ0FBQy9FLE9BQU8sQ0FBRW9ELElBQUksSUFBSztJQUNqQyxNQUFNNEIsU0FBUyxHQUFHdkYsUUFBUSxDQUFDQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQ2xEc0YsU0FBUyxDQUFDckYsU0FBUyxHQUFHLFVBQVU7SUFDaENxRixTQUFTLENBQUNkLFlBQVksQ0FBQyxJQUFJLEVBQUVkLElBQUksQ0FBQzZCLEVBQUUsQ0FBQztJQUNyQ0QsU0FBUyxDQUFDZCxZQUFZLENBQUMsT0FBTyxFQUFFZCxJQUFJLENBQUNULElBQUksQ0FBQztJQUMxQ3FDLFNBQVMsQ0FBQ2IsV0FBVyxHQUFHZixJQUFJLENBQUNULElBQUk7O0lBRWpDOztJQUVBbkQsU0FBUyxDQUFDeUIsV0FBVyxDQUFDK0QsU0FBUyxDQUFDO0VBQ3BDLENBQUMsQ0FBQztFQUNGLE9BQU94RixTQUFTO0FBQ3BCLENBQUM7QUFFTCxNQUFNMEYsaUJBQWlCLEdBQUdBLENBQUNuQyxDQUFDLEVBQUVMLE1BQU0sS0FBSTtFQUNwQyxNQUFNVSxJQUFJLEdBQUdWLE1BQU0sQ0FBQ1csS0FBSyxDQUFDQyxPQUFPLENBQUNQLENBQUMsQ0FBQ29DLGFBQWEsQ0FBQ3hELEtBQUssQ0FBQztFQUN4RGEsT0FBTyxDQUFDQyxHQUFHLENBQUNXLElBQUksQ0FBQztFQUNqQixNQUFNUixVQUFVLEdBQUduRCxRQUFRLENBQUNXLGNBQWMsQ0FBQ3NDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDZ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOUIsVUFBVTtFQUVoRkQsVUFBVSxDQUFDNUMsT0FBTyxDQUFFQyxJQUFJLElBQUs7SUFDckJBLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFHNkMsQ0FBQyxJQUFLcUMsaUJBQWlCLENBQUNyQyxDQUFDLEVBQUVLLElBQUksRUFBRVYsTUFBTSxDQUFDLENBQUM7RUFDN0UsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNFLE1BQU0wQyxpQkFBaUIsR0FBR0EsQ0FBQ3JDLENBQUMsRUFBRUssSUFBSSxFQUFFVixNQUFNLEtBQUs7RUFDOUMsTUFBTVMsR0FBRyxHQUFHRixRQUFRLENBQUNGLENBQUMsQ0FBQ29DLGFBQWEsQ0FBQ2hGLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUN6RCxNQUFNNkMsR0FBRyxHQUFHQyxRQUFRLENBQUNGLENBQUMsQ0FBQ29DLGFBQWEsQ0FBQ2hGLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUV6RHVDLE1BQU0sQ0FBQ1csS0FBSyxDQUFDRyxTQUFTLENBQUNKLElBQUksRUFBRUosR0FBRyxFQUFFRyxHQUFHLEVBQUUsWUFBWSxDQUFDO0FBQ3hELENBQUM7QUFFTCxNQUFNaEUsSUFBSTtFQUNOa0csV0FBV0EsQ0FBQ3JELE9BQU8sRUFBRXlCLE9BQU8sRUFDNUI7SUFDSSxJQUFJLENBQUN6QixPQUFPLEdBQUdBLE9BQU87SUFDdEIsSUFBSSxDQUFDeUIsT0FBTyxHQUFHQSxPQUFPO0lBQ3RCLElBQUksQ0FBQzZCLFVBQVUsR0FBRyxLQUFLO0lBQ3ZCLElBQUksQ0FBQ0MsSUFBSSxHQUFHLENBQUM7RUFDakI7O0VBRUE7O0VBRUFDLFdBQVdBLENBQUEsRUFBRTtJQUNULElBQUcsSUFBSSxDQUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUNwQjtNQUNBLE9BQU8sSUFBSSxDQUFDdkQsT0FBTztJQUN2QixDQUFDLE1BQUs7TUFDRixPQUFPLElBQUksQ0FBQ3lCLE9BQU87SUFDdkI7RUFDSjtFQUNBZ0MsV0FBV0EsQ0FBQSxFQUFFO0lBQ1QsSUFBRyxJQUFJLENBQUNGLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO01BQ3BCO01BQ0EsT0FBTyxJQUFJLENBQUM5QixPQUFPO0lBQ3ZCLENBQUMsTUFBSztNQUNGLE9BQU8sSUFBSSxDQUFDekIsT0FBTztJQUN2QjtFQUNKO0VBQ0E7RUFDQTBELHNCQUFzQkEsQ0FBQSxFQUFFO0lBQ3BCLE9BQU8sSUFBSSxDQUFDRixXQUFXLENBQUMsQ0FBQyxDQUFDN0MsSUFBSSxJQUFJLElBQUksQ0FBQ1gsT0FBTyxDQUFDVyxJQUFJLEdBQUcsU0FBUyxHQUFHLFNBQVM7RUFDL0U7RUFDQWdELFFBQVFBLENBQUEsRUFBRTtJQUNOLElBQUksQ0FBQ0osSUFBSSxFQUFFO0lBQ1gsT0FBTyxJQUFJLENBQUNBLElBQUk7RUFDcEI7RUFFQXhELFdBQVdBLENBQUNXLE1BQU0sRUFBQztJQUNmRixPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsTUFBTSxDQUFDO0lBQ25CLE1BQU1rRCxJQUFJLEdBQUduRyxRQUFRLENBQUNXLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFFNUMsTUFBTXlGLGFBQWEsR0FBR3BHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUNuRG1HLGFBQWEsQ0FBQ2xHLFNBQVMsR0FBRyxZQUFZOztJQUV0QztJQUNBa0csYUFBYSxDQUFDNUUsV0FBVyxDQUFDNkMsTUFBTSxDQUFDcEIsTUFBTSxDQUFDQyxJQUFJLENBQUMsQ0FBQztJQUM5Q2tELGFBQWEsQ0FBQzVFLFdBQVcsQ0FBQytDLFdBQVcsQ0FBQ3RCLE1BQU0sQ0FBQyxDQUFDO0lBRTlDLE1BQU1vRCxzQkFBc0IsR0FBR3JHLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUM1RG9HLHNCQUFzQixDQUFDbkcsU0FBUyxHQUFHLGlCQUFpQjtJQUNwRG1HLHNCQUFzQixDQUFDN0UsV0FBVyxDQUFDbUQsU0FBUyxDQUFDMUIsTUFBTSxDQUFDLENBQUM7SUFDckRvRCxzQkFBc0IsQ0FBQzdFLFdBQVcsQ0FBQzZELFFBQVEsQ0FBQ3BDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BEbUQsYUFBYSxDQUFDNUUsV0FBVyxDQUFDNkUsc0JBQXNCLENBQUM7SUFDakRELGFBQWEsQ0FBQzVFLFdBQVcsQ0FBQzJELGVBQWUsQ0FBQyxDQUFDLENBQUM7O0lBRTVDO0lBQ0E7O0lBRUFnQixJQUFJLENBQUMzRSxXQUFXLENBQUM0RSxhQUFhLENBQUM7RUFDbkM7RUFDQUUsVUFBVUEsQ0FBQSxFQUFFLENBRVo7QUFJSjtBQUVBLGlFQUFlNUcsSUFBSTs7Ozs7Ozs7Ozs7Ozs7OztBQzVKTztBQUMxQixNQUFNOEcsU0FBUztFQUNiWixXQUFXQSxDQUFBLEVBQUc7SUFDWixJQUFJLENBQUNkLElBQUksR0FBRyxFQUFFO0lBQ2QsSUFBSSxDQUFDRSxJQUFJLEdBQUcsRUFBRTtJQUNkLElBQUksQ0FBQ2xCLElBQUksR0FBRzJDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDO01BQUVDLE1BQU0sRUFBRSxJQUFJLENBQUM3QjtJQUFLLENBQUMsRUFBRSxNQUFNMkIsS0FBSyxDQUFDLElBQUksQ0FBQ3pCLElBQUksQ0FBQyxDQUFDNEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hGLElBQUksQ0FBQ3RCLEtBQUssR0FBRyxDQUNYLElBQUlpQiw2Q0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFDM0IsSUFBSUEsNkNBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsRUFDL0IsSUFBSUEsNkNBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQ3hCLElBQUlBLDZDQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUN0QixJQUFJQSw2Q0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FDM0I7RUFDSDs7RUFFQTtFQUNBTSxTQUFTQSxDQUFBLEVBQUU7SUFDVCxJQUFJLENBQUMvQyxJQUFJLENBQUN2RCxPQUFPLENBQUNnRCxHQUFHLElBQUlBLEdBQUcsQ0FBQ3FELElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxJQUFJLENBQUNFLDBCQUEwQixDQUFDLENBQUM7RUFDbkM7RUFDQTtFQUNBQyxPQUFPQSxDQUFDcEQsSUFBSSxFQUFFSixHQUFHLEVBQUVHLEdBQUcsRUFBQztJQUNyQixJQUFHQyxJQUFJLENBQUNxRCxXQUFXLEtBQUssWUFBWSxFQUFDO01BQ25DLElBQUd0RCxHQUFHLEdBQUdDLElBQUksQ0FBQ2dELE1BQU0sR0FBRyxJQUFJLENBQUMzQixJQUFJLEVBQ2hDO1FBQ0VqQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQztRQUNwRCxPQUFPLEtBQUssRUFBQztNQUNmLENBQUMsTUFBTTtRQUNMLElBQUlpRSxLQUFLLEdBQUcsQ0FBQztRQUNiLE9BQU9BLEtBQUssR0FBR3RELElBQUksQ0FBQ2dELE1BQU0sRUFDMUI7VUFDRSxJQUFHLElBQUksQ0FBQzdDLElBQUksQ0FBQ1AsR0FBRyxDQUFDLENBQUNHLEdBQUcsR0FBR3VELEtBQUssQ0FBQyxLQUFLLElBQUksRUFBQztZQUN0Q2xFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGlFQUFpRSxDQUFDLENBQUMsQ0FBQztZQUNoRixPQUFPLEtBQUssRUFBQztVQUNmO1VBQ0FpRSxLQUFLLEVBQUc7UUFDVjtRQUNBLE9BQU8sSUFBSSxDQUFDLENBQUM7TUFDZjtJQUVGLENBQUMsTUFBTSxJQUFHdEQsSUFBSSxDQUFDcUQsV0FBVyxLQUFLLFVBQVUsRUFBRTtNQUN2QyxJQUFHekQsR0FBRyxHQUFHSSxJQUFJLENBQUNnRCxNQUFNLEdBQUcsSUFBSSxDQUFDN0IsSUFBSSxFQUFFO1FBQ2hDL0IsT0FBTyxDQUFDQyxHQUFHLENBQUMsNkJBQTZCLENBQUM7UUFDMUMsT0FBTyxLQUFLLEVBQUM7TUFDYixDQUFDLE1BQU07UUFDTCxJQUFJaUUsS0FBSyxHQUFHLENBQUM7UUFDYixPQUFNQSxLQUFLLEdBQUd0RCxJQUFJLENBQUNnRCxNQUFNLEVBQUU7VUFDekIsSUFBRyxJQUFJLENBQUM3QyxJQUFJLENBQUNQLEdBQUcsR0FBRzBELEtBQUssQ0FBQyxDQUFDdkQsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3ZDWCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQztZQUM3RCxPQUFPLEtBQUssRUFBQztZQUNkO1VBQ0M7VUFDRmlFLEtBQUssRUFBRTtRQUNQO1FBQ0YsT0FBTyxJQUFJO01BRVg7SUFDRixDQUFDLE1BQ0Y7TUFDTCxPQUFPLEtBQUssRUFBQztJQUNiO0VBQ0Y7RUFDRjtFQUNFbEQsU0FBU0EsQ0FBQ0osSUFBSSxFQUFFSixHQUFHLEVBQUVHLEdBQUcsRUFBQztJQUN2QixJQUFHLENBQUMsSUFBSSxDQUFDcUQsT0FBTyxDQUFDcEQsSUFBSSxFQUFFSixHQUFHLEVBQUVHLEdBQUcsQ0FBQyxFQUNoQyxPQUFPQyxJQUFJLENBQUN1RCxNQUFNO0lBRWxCLElBQUd2RCxJQUFJLENBQUNxRCxXQUFXLEtBQUssWUFBWSxFQUNsQztNQUNFO01BQ0EsS0FBSSxJQUFJQyxLQUFLLEdBQUcsQ0FBQyxFQUFFQSxLQUFLLEdBQUd0RCxJQUFJLENBQUNnRCxNQUFNLEVBQUVNLEtBQUssRUFBRSxFQUM5QztRQUNFLElBQUksQ0FBQ25ELElBQUksQ0FBQ1AsR0FBRyxDQUFDLENBQUNHLEdBQUcsR0FBR3VELEtBQUssQ0FBQyxHQUFHdEQsSUFBSTtNQUNyQztNQUNBQSxJQUFJLENBQUN1RCxNQUFNLEdBQUcsSUFBSTtNQUNsQixPQUFPdkQsSUFBSSxDQUFDdUQsTUFBTTtJQUNwQixDQUFDLE1BQU0sSUFBR3ZELElBQUksQ0FBQ3FELFdBQVcsS0FBSyxVQUFVLEVBQUM7TUFBRTtNQUMxQztNQUNBLEtBQUksSUFBSUMsS0FBSyxHQUFHLENBQUMsRUFBRUEsS0FBSyxHQUFHdEQsSUFBSSxDQUFDZ0QsTUFBTSxFQUFFTSxLQUFLLEVBQUUsRUFBQztRQUM5QyxJQUFJLENBQUNuRCxJQUFJLENBQUNQLEdBQUcsR0FBRzBELEtBQUssQ0FBQyxDQUFDdkQsR0FBRyxDQUFDLEdBQUdDLElBQUk7TUFDcEM7TUFDQUEsSUFBSSxDQUFDdUQsTUFBTSxHQUFHLElBQUk7TUFDbEIsT0FBT3ZELElBQUksQ0FBQ3VELE1BQU07SUFDcEIsQ0FBQyxNQUFNO01BQ0wsT0FBT3ZELElBQUksQ0FBQ3VELE1BQU07SUFDcEI7RUFFRjtFQUNBckQsT0FBT0EsQ0FBQ3NELFFBQVEsRUFBQztJQUNmLElBQUlDLE1BQU07SUFDVixJQUFJLENBQUM5QixLQUFLLENBQUMvRSxPQUFPLENBQUVvRCxJQUFJLElBQUs7TUFDM0IsSUFBR0EsSUFBSSxDQUFDVCxJQUFJLEtBQUtpRSxRQUFRLEVBQUU7UUFDekJDLE1BQU0sR0FBR3pELElBQUk7TUFDZixDQUFDLE1BQU07UUFDTCxPQUFPLGdCQUFnQjtNQUN6QjtJQUNGLENBQUMsQ0FBQztJQUNGLE9BQU95RCxNQUFNO0VBQ2Y7RUFDRjtFQUNBQyxhQUFhQSxDQUFDQyxDQUFDLEVBQUVDLENBQUMsRUFBQztJQUVqQixJQUFHRCxDQUFDLElBQUksSUFBSSxDQUFDdEMsSUFBSSxJQUFJdUMsQ0FBQyxJQUFHLElBQUksQ0FBQ3pDLElBQUksRUFDaEMsT0FBTyxlQUFlO0lBQ3hCLElBQUcsSUFBSSxDQUFDaEIsSUFBSSxDQUFDd0QsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFDM0I7TUFDRSxJQUFJLENBQUN6RCxJQUFJLENBQUN3RCxDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7TUFDMUIsT0FBTyxNQUFNO0lBQ2YsQ0FBQyxNQUFLO01BQ0osSUFBSSxDQUFDekQsSUFBSSxDQUFDd0QsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLEtBQUs7TUFDdkIsT0FBTyxLQUFLO0lBQ2Q7RUFDRjtFQUNBQyxVQUFVQSxDQUFBLEVBQUU7SUFDVixJQUFJQyxHQUFHLEdBQUcsQ0FBQztJQUNYLElBQUksQ0FBQ25DLEtBQUssQ0FBQy9FLE9BQU8sQ0FBQ29ELElBQUksSUFBRztNQUN4QjhELEdBQUcsSUFBRzlELElBQUksQ0FBQ2dELE1BQU07SUFDbkIsQ0FBQyxDQUFDO0lBQ0YsT0FBT2MsR0FBRztFQUNaO0VBQ0FDLE9BQU9BLENBQUEsRUFBRTtJQUNQLElBQUlELEdBQUcsR0FBRyxDQUFDO0lBQ1gsSUFBSSxDQUFDbkMsS0FBSyxDQUFDL0UsT0FBTyxDQUFDb0QsSUFBSSxJQUFHO01BQ3hCOEQsR0FBRyxJQUFHOUQsSUFBSSxDQUFDZ0UsSUFBSTtJQUNqQixDQUFDLENBQUM7SUFDRixPQUFPRixHQUFHO0VBQ1o7RUFFQUcsZ0JBQWdCQSxDQUFBLEVBQUU7SUFDaEIsT0FBTyxJQUFJLENBQUNKLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDRSxPQUFPLENBQUMsQ0FBQztFQUMzQzs7RUFFQTtFQUNBN0IsVUFBVUEsQ0FBQSxFQUFFO0lBQ1Y5QyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUM0RSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDcEMsT0FBTyxJQUFJLENBQUNBLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUs7RUFDckQ7RUFFQUMsa0JBQWtCQSxDQUFBLEVBQUU7SUFDbEIsSUFBSVQsTUFBTSxHQUFHLElBQUk7SUFDakIsSUFBSSxDQUFDOUIsS0FBSyxDQUFDL0UsT0FBTyxDQUFFb0QsSUFBSSxJQUFLO01BQzNCLElBQUcsQ0FBQ0EsSUFBSSxDQUFDdUQsTUFBTSxFQUNiRSxNQUFNLEdBQUcsS0FBSztJQUNsQixDQUFDLENBQUM7SUFDRixPQUFPQSxNQUFNO0VBQ2Y7RUFDQU4sMEJBQTBCQSxDQUFBLEVBQUU7SUFDMUIsSUFBSSxDQUFDeEIsS0FBSyxDQUFDd0MsR0FBRyxDQUFFbkUsSUFBSSxJQUFLQSxJQUFJLENBQUN1RCxNQUFNLEdBQUcsS0FBSyxDQUFDO0VBQy9DO0FBRUY7QUFFQSxpRUFBZVYsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4SnVDO0FBQy9CO0FBRWhDLE1BQU03RyxNQUFNLENBQUM7RUFDWGlHLFdBQVdBLENBQUMxQyxJQUFJLEVBQUU4RSxTQUFTLEVBQUVDLGFBQWEsRUFBRWhFLE9BQU8sRUFDbkQ7SUFDRSxJQUFJLENBQUNmLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNVLEtBQUssR0FBR29FLFNBQVM7SUFDdEIsSUFBSSxDQUFDQyxhQUFhLEdBQUdBLGFBQWE7SUFDbEMsSUFBSSxDQUFDaEUsT0FBTyxHQUFHQSxPQUFPO0VBRXhCO0VBQ0E7RUFDQWlFLGtCQUFrQkEsQ0FBQSxFQUFFO0lBQ2xCLElBQUksQ0FBQ3RFLEtBQUssQ0FBQzBCLEtBQUssQ0FBQy9FLE9BQU8sQ0FBRW9ELElBQUksSUFBSztNQUNqQzFDLHdEQUFlLENBQUMsSUFBSSxDQUFDMkMsS0FBSyxFQUFFRCxJQUFJLENBQUM7SUFDbkMsQ0FBQyxDQUFDO0lBQ0YsT0FBTyxJQUFJLENBQUNzRSxhQUFhLENBQUMzQyxLQUFLO0VBQ2pDO0VBQ0Y7RUFDRXZCLFNBQVNBLENBQUNKLElBQUksRUFBRUosR0FBRyxFQUFFRyxHQUFHLEVBQ3hCO0lBQ0UsSUFBSSxDQUFDQyxJQUFJLENBQUN1RCxNQUFNLElBQUksSUFBSSxDQUFDdEQsS0FBSyxDQUFDRyxTQUFTLENBQUNKLElBQUksRUFBRUosR0FBRyxFQUFFRyxHQUFHLENBQUMsRUFBQztNQUN2RDNDLCtDQUFRLENBQUMsSUFBSSxDQUFDbUMsSUFBSSxFQUFFSyxHQUFHLEVBQUVHLEdBQUcsRUFBRUMsSUFBSSxDQUFDZ0QsTUFBTSxFQUFFaEQsSUFBSSxDQUFDcUQsV0FBVyxDQUFDO01BQzVELE9BQU8sSUFBSSxDQUFDcEQsS0FBSyxDQUFDRSxJQUFJO0lBRXhCLENBQUMsTUFBTTtNQUNMLE9BQU8sOENBQThDO0lBQ3ZEO0VBRUY7RUFDRjtFQUNFcUUsTUFBTUEsQ0FBQ0MsY0FBYyxFQUFFN0UsR0FBRyxFQUFFRyxHQUFHLEVBQUM7SUFDOUIsTUFBTTJFLElBQUksR0FBR3JJLFFBQVEsQ0FBQ1csY0FBYyxDQUFFLEdBQUV5SCxjQUFlLElBQUc3RSxHQUFJLElBQUdHLEdBQUksRUFBQyxDQUFDO0lBRXZFLElBQUcsSUFBSSxDQUFDdUUsYUFBYSxDQUFDWixhQUFhLENBQUM5RCxHQUFHLEVBQUVHLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFDdkQ7TUFDRTJFLElBQUksQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO01BQ3pCLE9BQVEsS0FBSTtJQUNkLENBQUMsTUFBTTtNQUNMRixJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMxQixPQUFRLE1BQUs7SUFDZjtJQUFDO0VBQ0g7RUFDRjtFQUNFQyxZQUFZQSxDQUFDSixjQUFjLEVBQUM7SUFDMUIsTUFBTUssV0FBVyxHQUFHViw2REFBb0IsQ0FBQyxJQUFJLENBQUNFLGFBQWEsQ0FBQztJQUM1RCxNQUFNMUUsR0FBRyxHQUFHa0YsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMxQixNQUFNL0UsR0FBRyxHQUFHK0UsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUMxQjFGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDb0YsY0FBYyxDQUFDO0lBQzNCLE9BQU8sSUFBSSxDQUFDRCxNQUFNLENBQUNDLGNBQWMsQ0FBQ2xELFdBQVcsQ0FBQyxDQUFDLEVBQUUzQixHQUFHLEVBQUVHLEdBQUcsQ0FBQztFQUM1RDtBQUNGO0FBRUEsaUVBQWUvRCxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdERyQixNQUFNcUIsU0FBUyxHQUFHQSxDQUFDMEgsU0FBUyxFQUFFVixTQUFTLEtBQUk7RUFDdkMsTUFBTTdFLFVBQVUsR0FBR25ELFFBQVEsQ0FBQ1csY0FBYyxDQUFDK0gsU0FBUyxDQUFDLENBQUN0RixVQUFVO0VBRWhFRCxVQUFVLENBQUM1QyxPQUFPLENBQUVDLElBQUksSUFBSTtJQUN4QixNQUFNa0QsR0FBRyxHQUFHbEQsSUFBSSxDQUFDRSxZQUFZLENBQUMsS0FBSyxDQUFDO0lBQ3BDLE1BQU02QyxHQUFHLEdBQUcvQyxJQUFJLENBQUNFLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDcEMsSUFBR3NILFNBQVMsQ0FBQ2xFLElBQUksQ0FBQ1AsR0FBRyxDQUFDLENBQUNHLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFDcEM7TUFDSWxELElBQUksQ0FBQzhILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM5QjtFQUNKLENBQUMsQ0FBQztFQUNGLE9BQU9wRixVQUFVO0FBQ3JCLENBQUM7QUFDRCxNQUFNcEMsUUFBUSxHQUFHQSxDQUFDbUMsSUFBSSxFQUFFSyxHQUFHLEVBQUVHLEdBQUcsRUFBRWlELE1BQU0sRUFBRUssV0FBVyxLQUFJO0VBQ3JEakUsT0FBTyxDQUFDQyxHQUFHLENBQUM7SUFDUkUsSUFBSSxFQUFFQSxJQUFJO0lBQ1ZLLEdBQUcsRUFBRUEsR0FBRztJQUNSRyxHQUFHLEVBQUVBLEdBQUc7SUFDUnNELFdBQVcsRUFBRUE7RUFDakIsQ0FBQyxDQUFDO0VBRUYsSUFBR0EsV0FBVyxLQUFLLFlBQVksRUFDL0I7SUFDSSxLQUFJLElBQUlDLEtBQUssR0FBRyxDQUFDLEVBQUVBLEtBQUssR0FBR04sTUFBTSxFQUFFTSxLQUFLLEVBQUUsRUFBQztNQUN2QyxNQUFNMEIsUUFBUSxHQUFHM0ksUUFBUSxDQUFDVyxjQUFjLENBQUUsR0FBRXVDLElBQUksQ0FBQ2dDLFdBQVcsQ0FBQyxDQUFFLElBQUczQixHQUFJLElBQUdHLEdBQUcsR0FBR3VELEtBQU0sRUFBQyxDQUFDO01BQ3ZGMEIsUUFBUSxDQUFDQyxtQkFBbUIsQ0FBRSxPQUFPLEVBQUd0RixDQUFDLElBQUc7UUFBQ1AsT0FBTyxDQUFDQyxHQUFHLENBQUNNLENBQUMsQ0FBQ29DLGFBQWEsQ0FBQztNQUFBLENBQUMsQ0FBQztNQUMzRWlELFFBQVEsQ0FBQ0wsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQ2xDO0VBQ0osQ0FBQyxNQUFNLElBQUd2QixXQUFXLEtBQUssVUFBVSxFQUFFO0lBQ2xDLEtBQUksSUFBSUMsS0FBSyxHQUFHLENBQUMsRUFBRUEsS0FBSyxHQUFHTixNQUFNLEVBQUVNLEtBQUssRUFBRSxFQUFDO01BQ3ZDLE1BQU0wQixRQUFRLEdBQUczSSxRQUFRLENBQUNXLGNBQWMsQ0FBRSxHQUFFdUMsSUFBSSxDQUFDZ0MsV0FBVyxDQUFDLENBQUUsSUFBRzNCLEdBQUcsR0FBRzBELEtBQU0sSUFBR3ZELEdBQUksRUFBQyxDQUFDO01BQ3ZGaUYsUUFBUSxDQUFDTCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDbEM7RUFDSixDQUFDLE1BQU07SUFDSCxPQUFPLHVCQUF1QjtFQUNsQztBQUNKLENBQUM7QUFFRCxNQUFNMUgsV0FBVyxHQUFJeUQsT0FBTyxJQUFJO0VBQzVCLE1BQU11RSxHQUFHLEdBQUc3SSxRQUFRLENBQUMyQixhQUFhLENBQUMscUJBQXFCLENBQUM7RUFDekRrSCxHQUFHLENBQUNuRSxXQUFXLEdBQUdKLE9BQU87QUFDN0IsQ0FBQztBQUVELE1BQU14RCxZQUFZLEdBQUltQyxNQUFNLElBQUk7RUFDNUIsTUFBTTZGLE9BQU8sR0FBRzlJLFFBQVEsQ0FBQ1csY0FBYyxDQUFDc0MsTUFBTSxDQUFDLENBQUNHLFVBQVU7RUFDMUQwRixPQUFPLENBQUN2SSxPQUFPLENBQUUwRSxNQUFNLElBQUs7SUFBQ0EsTUFBTSxDQUFDL0UsU0FBUyxHQUFHLFFBQVE7RUFBQSxDQUFDLENBQUM7QUFFOUQsQ0FBQztBQUNELE1BQU1lLGVBQWUsR0FBSWdDLE1BQU0sSUFBSTtFQUMvQixJQUFHLENBQUNBLE1BQU0sQ0FBQ1csS0FBSyxDQUFDaUUsa0JBQWtCLENBQUMsQ0FBQyxFQUFDO0lBQ2xDNUUsTUFBTSxDQUFDaUYsa0JBQWtCLENBQUMsQ0FBQztJQUMzQmxILFNBQVMsQ0FBQ2lDLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDZ0MsV0FBVyxDQUFDLENBQUMsRUFBRWpDLE1BQU0sQ0FBQ1csS0FBSyxDQUFDO0lBQ2xELE9BQU9YLE1BQU0sQ0FBQ1csS0FBSyxDQUFDaUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxNQUFLO0lBQ0Z6RyxVQUFVLENBQUM2QixNQUFNLENBQUM7SUFDbEJoQyxlQUFlLENBQUNnQyxNQUFNLENBQUM7RUFDM0I7QUFDSixDQUFDO0FBRUQsTUFBTTdCLFVBQVUsR0FBSTZCLE1BQU0sSUFBSTtFQUMxQkEsTUFBTSxDQUFDVyxLQUFLLENBQUNpRCxTQUFTLENBQUMsQ0FBQztFQUN4QjVELE1BQU0sQ0FBQ1csS0FBSyxDQUFDa0QsMEJBQTBCLENBQUMsQ0FBQztFQUN6Q2hHLFlBQVksQ0FBQ21DLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDZ0MsV0FBVyxDQUFDLENBQUMsQ0FBQztFQUN2QyxPQUFPakMsTUFBTSxDQUFDVyxLQUFLLENBQUNpRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDOztBQUVEO0FBQ0EsTUFBTTFHLGdCQUFnQixHQUFHQSxDQUFBLEtBQUs7RUFDMUIsTUFBTTRILE9BQU8sR0FBRy9JLFFBQVEsQ0FBQzJCLGFBQWEsQ0FBQyxjQUFjLENBQUM7QUFDMUQsQ0FBQztBQUNELE1BQU1ULG1CQUFtQixHQUFJOEgsTUFBTSxJQUFJO0VBQ25DLE9BQU1BLE1BQU0sQ0FBQ0MsVUFBVSxFQUFDO0lBQ3BCbEcsT0FBTyxDQUFDQyxHQUFHLENBQUNnRyxNQUFNLENBQUM7SUFDbkJBLE1BQU0sQ0FBQzNHLFdBQVcsQ0FBQzJHLE1BQU0sQ0FBQ0MsVUFBVSxDQUFDO0VBQ3pDO0FBQ0osQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRUQ7QUFDQSxNQUFNQyxjQUFjLEdBQUlDLEdBQUcsSUFBSTtFQUMzQixPQUFPQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHSCxHQUFHLENBQUM7QUFDMUMsQ0FBQzs7QUFFRDtBQUNBLE1BQU1JLG1CQUFtQixHQUFJdkIsU0FBUyxJQUFJO0VBQ3RDLElBQUl0RSxHQUFHLEdBQUd3RixjQUFjLENBQUNsQixTQUFTLENBQUNoRCxJQUFJLENBQUM7RUFDeEMsSUFBSXpCLEdBQUcsR0FBRzJGLGNBQWMsQ0FBQ2xCLFNBQVMsQ0FBQ2xELElBQUksQ0FBQztFQUV4QyxPQUFPLENBQUNwQixHQUFHLEVBQUVILEdBQUcsQ0FBQztBQUNyQixDQUFDOztBQUVEO0FBQ0EsTUFBTXRDLGVBQWUsR0FBR0EsQ0FBQytHLFNBQVMsRUFBRXJFLElBQUksS0FBSTtFQUN4QyxNQUFNOEUsV0FBVyxHQUFHYyxtQkFBbUIsQ0FBQ3ZCLFNBQVMsQ0FBQztFQUNsRCxNQUFNd0IsU0FBUyxHQUFHSixJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRSxZQUFZO0VBQ2hFM0YsSUFBSSxDQUFDcUQsV0FBVyxHQUFHd0MsU0FBUztFQUU1QixJQUFJeEIsU0FBUyxDQUFDakIsT0FBTyxDQUFDcEQsSUFBSSxFQUFFOEUsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0Q7SUFDRVQsU0FBUyxDQUFDakUsU0FBUyxDQUFDSixJQUFJLEVBQUU4RSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzRCxDQUFDLE1BQU07SUFDTHhILGVBQWUsQ0FBQytHLFNBQVMsRUFBRXJFLElBQUksQ0FBQztFQUNsQztBQUNGLENBQUM7O0FBRUg7QUFDQSxNQUFNb0Usb0JBQW9CLEdBQUlDLFNBQVMsSUFBSTtFQUV2QyxJQUFJeUIsaUJBQWlCLEdBQUdGLG1CQUFtQixDQUFDdkIsU0FBUyxDQUFDLENBQUMsQ0FBQzs7RUFFeEQsSUFBSUEsU0FBUyxDQUFDbEUsSUFBSSxDQUFDMkYsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLElBQUl6QixTQUFTLENBQUNsRSxJQUFJLENBQUMyRixpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDako7SUFDRSxPQUFPQSxpQkFBaUI7RUFDMUIsQ0FBQyxNQUFLO0lBQ0osT0FBTzFCLG9CQUFvQixDQUFDQyxTQUFTLENBQUM7RUFDeEM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDZ0M7QUFDakMsTUFBTTRCLG9CQUFvQixHQUFJLFlBQVk7QUFFMUMsTUFBTXJELElBQUk7RUFDUlgsV0FBV0EsQ0FBQzFDLElBQUksRUFBRXlELE1BQU0sRUFBQztJQUN2QixJQUFJLENBQUNuQixFQUFFLEdBQUdtRSxnREFBTSxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDekcsSUFBSSxHQUFHQSxJQUFJO0lBQ2hCLElBQUksQ0FBQzhELFdBQVcsR0FBRzRDLG9CQUFvQjtJQUN2QyxJQUFJLENBQUNqRCxNQUFNLEdBQUdBLE1BQU07SUFDcEIsSUFBSSxDQUFDZ0IsSUFBSSxHQUFHLENBQUM7SUFDYixJQUFJLENBQUNULE1BQU0sR0FBRyxLQUFLO0VBQ3JCO0VBRUEyQyxjQUFjQSxDQUFDckosSUFBSSxFQUFDO0lBQ2xCLElBQUksQ0FBQ3dHLFdBQVcsR0FBR3hHLElBQUk7SUFDdkIsT0FBTyxJQUFJLENBQUN3RyxXQUFXO0VBQ3pCO0VBRUE4QyxHQUFHQSxDQUFBLEVBQUU7SUFDSCxJQUFJLENBQUNuQyxJQUFJLEVBQUU7RUFDYjtFQUVBb0MsTUFBTUEsQ0FBQSxFQUFFO0lBRU4sSUFBSSxJQUFJLENBQUNwRCxNQUFNLEdBQUcsSUFBSSxDQUFDZ0IsSUFBSSxLQUFNLENBQUMsRUFDbEM7TUFDRTVFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFFLEdBQUUsSUFBSSxDQUFDRSxJQUFLLGdCQUFlLENBQUM7TUFDekMsT0FBTyxJQUFJO0lBQ2IsQ0FBQyxNQUFNO01BQ0xILE9BQU8sQ0FBQ0MsR0FBRyxDQUFFLEdBQUUsSUFBSSxDQUFDRSxJQUFLLGlCQUFnQixJQUFJLENBQUN5RSxJQUFLLFFBQU8sQ0FBQztNQUMzRCxPQUFPLEtBQUs7SUFDZDtFQUNGO0FBQ0Y7QUFFQSxpRUFBZXBCLElBQUk7Ozs7Ozs7Ozs7OztBQ25DbkI7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSxpRUFBZTtBQUNmO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDSEQsaUVBQWUsY0FBYyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxHQUFHLHlDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7O0FDQXBJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyx3REFBUTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ1M7QUFDTjtBQUNzQjs7QUFFakQ7QUFDQSxNQUFNLGtEQUFNO0FBQ1osV0FBVyxrREFBTTtBQUNqQjs7QUFFQTtBQUNBLGlEQUFpRCwrQ0FBRyxLQUFLOztBQUV6RDtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTs7QUFFQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsU0FBUyw4REFBZTtBQUN4Qjs7QUFFQSxpRUFBZSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0FDNUJjOztBQUUvQjtBQUNBLHFDQUFxQyxpREFBSztBQUMxQzs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7VUNOdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ1M7QUFFckM5RixnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRVkseURBQUcsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHMvLi9zcmMvU2VjdGlvbi9NZW51LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9BcHAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxheWVyLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbG90LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvZ2FtZS5zY3NzPzY4NDgiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvbWVudS5zY3NzPzY3YzAiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZS9tZW51LnNjc3MnXHJcbmltcG9ydCBHYW1lIGZyb20gJy4uL2NvbXBvdW5kcy9HYW1lJ1xyXG5pbXBvcnQgUGxheWVyIGZyb20gJy4uL2NvbXBvdW5kcy9QbGF5ZXInO1xyXG5pbXBvcnQgQm9hcmQgZnJvbSAnLi4vY29tcG91bmRzL0dhbWVib2FyZCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51e1xyXG4gICAgc3RhdGljIGxvYWQoKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm1lbnUtYm94XCI7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxoMSBjbGFzcz1cInRleHQtY2VudGVyZWRcIj5XZWxjb21lIHRvIEJhdHRsZXNoaXA8L2gxPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiZ2FtZUZvcm1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGxheWVyMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+UGxheWVyIDE6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBsYXllcjFOYW1lXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInBsYXllcjJJbnB1dFwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGxheWVyMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+UGxheWVyIDI6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBsYXllcjJOYW1lXCIgZGlzYWJsZWQvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZ2FtZU1vZGVcIiBjbGFzcz1cImdhbWVNb2RlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkID1cInZzQ29tcHV0ZXJcIiBuYW1lPVwiZ2FtZU1vZGVcIiB2YWx1ZT1cImNvbXB1dGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInZzQ29tcHV0ZXJcIj5QbGF5ZXIgdnMgQ29tcHV0ZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInZzUGxheWVyXCIgbmFtZT1cImdhbWVNb2RlXCIgdmFsdWU9XCJwbGF5ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidnNQbGF5ZXJcIj5QbGF5ZXIgdnMgUGxheWVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzdWJtaXQtYnRuXCIgdHlwZT1cInN1Ym1pdFwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRIYW5kbGVycygpe1xyXG4gICAgICAgIGNvbnN0IGdldFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZU1vZGUgaW5wdXRcIik7XHJcbiAgICAgICAgZ2V0UmFkaW9zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNoYW5nZVwiKSwgKCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBcInZzUGxheWVyXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyTmFtZVwiKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IE1lbnUgZnJvbSAnLi4vU2VjdGlvbi9NZW51JztcclxuaW1wb3J0IEJvYXJkIGZyb20gJy4vR2FtZWJvYXJkJztcclxuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcic7XHJcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XHJcbmltcG9ydCB7cGxvdE1lc3NhZ2UsXHJcbiAgICAgcmVtb3ZlUmVuZGVyLCBcclxuICAgICBwbG90U2hpcCxcclxuICAgICBwbG90U2hpcHMsIFxyXG4gICAgIHJhbmRvbVBsYWNlbWVudCwgXHJcbiAgICAgcmVtb3ZlQWxsQ2hpbGROb2RlcyxcclxuICAgICBhZGRBbGxDaGlsZE5vZGVzLCBcclxuICAgICBjbGVhckJvYXJkfSBmcm9tICcuL1Bsb3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHB7XHJcbiAgICBzdGF0aWMgbG9hZFBhZ2UoKXtcclxuICAgICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKE1lbnUubG9hZCgpKTtcclxuICAgICAgICBNZW51LmxvYWRIYW5kbGVycygpO1xyXG4gICAgICAgIHRoaXMuc3VibWl0SGFuZGxlcigpO1xyXG5cclxuICAgICAgICAvLyBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZEJhbm5lcigpKTtcclxuICAgICAgICAvLyBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZEJ1dHRvbnMoKSk7XHJcbiAgICAgICAgLy8gYm9keS5hcHBlbmRDaGlsZCh0aGlzLmxvYWRET00oKSk7XHJcbiAgICAgICAgLy8gYm9keS5hcHBlbmRDaGlsZCh0aGlzLmxvYWRNZXNzYWdlTG9nKCkpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLmhhbmRsZXIoKTtcclxuXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc3VibWl0SGFuZGxlcigpe1xyXG4gICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnRuXCIpO1xyXG4gICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PntcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjFCb2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIyQm9hcmQgPSBuZXcgQm9hcmQoKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaXNQbGF5ZXJWc0NvbXB1dGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2c0NvbXB1dGVyXCIpLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzUGxheWVyVnNQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZzUGxheWVyXCIpLmNoZWNrZWQ7XHJcbiAgICAgICAgICAgaWYoaXNQbGF5ZXJWc1BsYXllciB8fCBpc1BsYXllclZzQ29tcHV0ZXIpXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMU5hbWUgPSBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMU5hbWVcIikudmFsdWUsIHBsYXllcjFCb2FyZCwgcGxheWVyMkJvYXJkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdldFBsYXllcjJOYW1lID0gaXNQbGF5ZXJWc0NvbXB1dGVyID8gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIHBsYXllcjJCb2FyZCwgcGxheWVyMUJvYXJkLCBmYWxzZSkgOiBcclxuICAgICAgICAgICAgICAgICAgICBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikudmFsdWUsIHBsYXllcjJCb2FyZCwgcGxheWVyMUJvYXJkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2V0UGxheWVyMU5hbWUsIGdldFBsYXllcjJOYW1lKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1ib3hcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIGdhbWUubG9hZFNldHVwVUkoZ2FtZS5wbGF5ZXIxKTsgLy9QbGF5ZXIxIGdvZXMgZmlyc3RcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWJ0blwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWJ0blwiKTtcclxuICAgICAgICAgICAgICAgIHNoaXBCdG5zLmZvckVhY2goKHNoaXBCdG4gPT4gc2hpcEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB0aGlzLmFjdGl2YXRlU3F1YXJlKGdhbWUucGxheWVyMSwgc2hpcEJ0bi52YWx1ZSkpKSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiByYW5kb21QbGFjZW1lbnQoZ2FtZS5wbGF5ZXIxKSk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiBjbGVhckJvYXJkKGdhbWUucGxheWVyMSkpO1xyXG4gICAgICAgICAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB0aGlzLmZpbmlzaGVkU2V0dXBCdG4oZ2FtZSkpO1xyXG5cclxuICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgYWN0aXZhdGVTcXVhcmUgPSAocGxheWVyLCBuYW1lKSA9PntcclxuICAgICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAgICAgY29uc3QgcGxhY2VTaGlwVG9Cb2FyZCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7IC8vcmV0dXJucyByb3dcclxuICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTsgLy9yZXR1cm5zIGNvbHVtblxyXG4gICAgICAgICAgICBjb25zdCBzaGlwID0gcGxheWVyLmJvYXJkLmdldFNoaXAobmFtZSk7IC8vcmV0dXJucyBzaGlwXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcGFyc2VJbnQocm93KSwgcGFyc2VJbnQoY29sKSkpO1xyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmdyaWRbcm93XVtjb2xdID09PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3BsYWNlIHRoZSBzaGlwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9zZWxlY3RzIHRoZSBzaGlwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXCJUaGVyZSBpcyBhIHNoaXAgbG9jYXRlZCB0aGVyZS4gIFBsYWNlIGFub3RoZXIgc3F1YXJlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHBsYWNlU2hpcFRvQm9hcmQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGZpbmlzaGVkU2V0dXBCdG4gPSAoZ2FtZSkgPT57XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2V0dXAtbWVudVwiKSk7XHJcbiAgICAgICAgaWYoZ2FtZS5wbGF5ZXIyLmlzSHVtYW4pe1xyXG4gICAgICAgICAgICBnYW1lLmxvYWRTZXR1cFVJKGdhbWUucGxheWVyMik7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgICAgICAgICAgY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJvYXJkXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBkb25lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1idG5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWJ0blwiKTtcclxuICAgICAgICAgICAgc2hpcEJ0bnMuZm9yRWFjaCgoc2hpcEJ0biA9PiBzaGlwQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHRoaXMuYWN0aXZhdGVTcXVhcmUoZ2FtZS5wbGF5ZXIyLCBzaGlwQnRuLnZhbHVlKSkpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiByYW5kb21QbGFjZW1lbnQoZ2FtZS5wbGF5ZXIyKSk7XHJcbiAgICAgICAgICAgIGNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IGNsZWFyQm9hcmQoZ2FtZS5wbGF5ZXIyKSk7XHJcbiAgICAgICAgICAgIGRvbmVCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gdGhpcy5zdGFydEdhbWUpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcHV0ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHN0YXJ0R2FtZSA9IChnYW1lKSA9PntcclxuICAgICAgICBjb25zb2xlLmxvZyhnYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZEJ1dHRvbnMoKXtcclxuICAgIC8vICAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBidXR0b25zLmNsYXNzTmFtZSA9IFwiYnV0dG9ucy1jb250YWluZXJcIlxyXG5cclxuICAgIC8vICAgICBidXR0b25zLmlubmVySFRNTCA9IGBcclxuICAgIC8vICAgICAgICAgPGJ1dHRvbiBpZD1cInN0YXJ0LWJhdHRsZXNoaXBcIiB0eXBlPVwiYnV0dG9uXCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxyXG4gICAgLy8gICAgICAgICA8YnV0dG9uIGlkPVwicmFuZG9tLXBsYWNlbWVudFwiIHR5cGU9XCJidXR0b25cIj5SYW5kb20gUGxhY2VtZW50PC9idXR0b24+XHJcbiAgICAvLyAgICAgICAgIDxidXR0b24gaWQ9IFwiY2xlYXItYm9hcmRcIiB0eXBlPVwiYnV0dG9uXCI+Q2xlYXI8L2J1dHRvbj5cclxuICAgIC8vICAgICAgICAgPGJ1dHRvbiBpZD1cInJlc2V0LWJhdHRsZXNoaXBcIiBjbGFzcz1cImhpZGRlblwiIHR5cGU9XCJidXR0b25cIj5SZXNldDwvYnV0dG9uPlxyXG4gICAgLy8gICAgIGBcclxuICAgIC8vICAgICByZXR1cm4gYnV0dG9ucztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZEJvYXJkcygpe1xyXG4gICAgLy8gICAgIGNvbnN0IGJvYXJkcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgYm9hcmRzLmNsYXNzTmFtZSA9IFwiYm9hcmRzLWNvbnRhaW5lclwiO1xyXG4gICAgLy8gICAgIGJvYXJkcy5hcHBlbmRDaGlsZCh0aGlzLmxvYWRCb2FyZChwbGF5ZXIxLCBcIm15Qm9hcmRcIikpO1xyXG4gICAgLy8gICAgIGJvYXJkcy5hcHBlbmRDaGlsZCh0aGlzLmxvYWRCb2FyZChwbGF5ZXIyLCBcIm9wcG9uZW50Qm9hcmRcIikpO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gYm9hcmRzO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkRE9NKCl7XHJcbiAgICAvLyAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGVudC5jbGFzc05hbWUgPSBcImdhbWUtY29udGFpbmVyXCI7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IGhhbmRsZUJ0bnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGhhbmRsZUJ0bnNDb250YWluZXIuY2xhc3NOYW1lID0gXCJwbGF5ZXItbWVudVwiO1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIGhhbmRsZUJ0bnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkU2hpcHMocGxheWVyMSkpO1xyXG4gICAgLy8gICAgIGhhbmRsZUJ0bnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkT3JpZW50YXRpb25CdG5zKCkpO1xyXG4gICAgLy8gICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGFuZGxlQnRuc0NvbnRhaW5lcik7XHJcblxyXG4gICAgLy8gICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQm9hcmRzKCkpO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gY29udGVudDtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZE1lc3NhZ2VMb2coKXtcclxuICAgIC8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm1lc3NhZ2UtbG9nLWNvbnRhaW5lclwiO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGJveC5jbGFzc05hbWUgPSBcIm1lc3NhZ2UtbG9nLWJveFwiO1xyXG4gICAgLy8gICAgIGJveC5pbm5lckhUTUwgPSBgPHAgaWQ9XCJtZXNzYWdlLWxvZ1wiPlRlc3Q8L3A+YDtcclxuXHJcbiAgICAvLyAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveCk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBzdGF0aWMgc2VuZE1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgICAvLyAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5LXdyYXBwZXIgaDJcIik7XHJcbiAgICAvLyAgICAgYm94LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZEJvYXJkKHBsYXllciwgaWQpe1xyXG4gICAgICAgIFxyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLmxvYWRHcmlkKHBsYXllciwgaWQpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBoYW5kbGVTcXVhcmVDbGljayhlLCBzaGlwLCBwbGF5ZXIpIHtcclxuICAgIC8vICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTtcclxuICAgIC8vICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhwbGF5ZXIucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIikpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBoYW5kbGVPcmllbnRhdGlvbiA9IChzaGlwKSA9PntcclxuICAgIC8vICAgICBjb25zdCBvcmllbnRhdGlvbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yaWVudGF0aW9uLWJ0bnNcIik7XHJcbiAgICAvLyAgICAgb3JpZW50YXRpb25CdG5zLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgLy8gICAgICAgICBpZihpdGVtLnZhbHVlICE9PSBzaGlwLm9yaWVudGF0aW9uKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKGUpID0+IHRoaXMuaGFuZGxlT3JpZW50YXRpb25CdG4oZSwgc2hpcCkpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlTG9hZFNoaXBCdG4gPSAoZSwgcGxheWVyKSA9PntcclxuICAgIC8vICAgICBjb25zdCBzaGlwID0gcGxheWVyLmJvYXJkLmdldFNoaXAoZS5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcclxuICAgIC8vICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUJvYXJkXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgLy8gICAgIHRoaXMuaGFuZGxlT3JpZW50YXRpb24oc2hpcCk7XHJcbiBcclxuICAgIC8vICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIC8vICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSk7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZU9yaWVudGF0aW9uQnRuID0gKGUsIHNoaXApID0+e1xyXG4gICAgLy8gICAgIC8vIHNoaXAuc2V0T3JpZW50YXRpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAvLyAgICAgc2hpcC5vcmllbnRhdGlvbiA9IGUuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZyhzaGlwKTtcclxuICAgIC8vICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG5cclxuXHJcbiAgICAvLyAgICAgY29uc3Qgb3JpZW50YXRpb25CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmllbnRhdGlvbi1idG5zXCIpO1xyXG4gICAgLy8gICAgIG9yaWVudGF0aW9uQnRucy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgIC8vICAgICAgICAgaWYoaXRlbS52YWx1ZSAhPT0gc2hpcC5vcmllbnRhdGlvbilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIChlKSA9PiB0aGlzLmhhbmRsZU9yaWVudGF0aW9uKGUsIHNoaXApKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkT3JpZW50YXRpb25CdG5zID0gKCkgPT57XHJcbiAgICAvLyAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJvcmllbnRhdGlvbi1jb250YWluZXJcIjtcclxuXHJcbiAgICAvLyAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgIC8vICAgICA8YnV0dG9uIGNsYXNzPVwib3JpZW50YXRpb24tYnRuc1wiIGlkPVwiaG9yaXpvbnRhbC1idG5cIiB2YWx1ZT1cImhvcml6b250YWxcIj5ob3Jpem9udGFsPC9idXR0b24+XHJcbiAgICAvLyAgICAgPGJ1dHRvbiBjbGFzcz1cIm9yaWVudGF0aW9uLWJ0bnNcIiBpZD1cInZlcnRpY2FsLWJ0blwiIHZhbHVlPVwidmVydGljYWxcIj52ZXJ0aWNhbDwvYnV0dG9uPlxyXG4gICAgLy8gICAgIGA7XHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZFNoaXBzKHBsYXllcikge1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwic2hpcC1idXR0b25zXCI7XHJcbiAgIFxyXG4gICAgLy8gICAgIHBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNyZWF0ZVNoaXBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICAgICAgY3JlYXRlU2hpcHMuY2xhc3NOYW1lID0gXCJzaGlwLWJ0bi1jb250YWluZXJcIjtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICBjb25zdCBjcmVhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgLy8gICAgICAgICBjcmVhdGVCdG4uY2xhc3NOYW1lID0gXCJzaGlwLWJ0blwiO1xyXG4gICAgLy8gICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgc2hpcC5pZCk7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLCBzaGlwLm5hbWUpO1xyXG4gICAgLy8gICAgICAgICBjcmVhdGVCdG4udGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdGhpcy5oYW5kbGVMb2FkU2hpcEJ0bihlLCBwbGF5ZXIpKTtcclxuXHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZVNoaXBzLmFwcGVuZENoaWxkKGNyZWF0ZUJ0bik7XHJcbiAgICAvLyAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVTaGlwcyk7XHJcbiAgICAgICBcclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIFxyXG4gICAgLy8gfVxyXG4gICAgLy8gc3RhdGljIGxvYWRHcmlkKHBsYXllciwgaWQpe1xyXG4gICAgLy8gICAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAvLyAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJnYW1lYm9hcmRcIjtcclxuICAgIC8vICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xyXG5cclxuICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAvLyAgICAge1xyXG4gICAgLy8gICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgIC8vICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKX0tJHtpfS0ke2p9YCk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgcGxvdFNoaXBzKGdhbWVib2FyZCl7XHJcbiAgICAvLyAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgIC8vICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgLy8gICAgICAgICBjb25zdCBjb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIC8vICAgICAgICAgY29uc3Qgcm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAvLyAgICAgICAgIGlmKGdhbWVib2FyZC5ncmlkW3Jvd11bY29sXSAhPT0gbnVsbClcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9XHJcbiAgICAvLyBzdGF0aWMgdXBkYXRlR2FtZUJvYXJkKHBsYXllcil7XHJcbiAgICAvLyAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuY2hpbGROb2RlcztcclxuXHJcbiAgICAvLyAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgLy8gICAgICAgICBjb25zdCByb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgIC8vICAgICAgICAgaWYocGxheWVyMS5ib2FyZC5ncmlkW2NvbF1bcm93XSA9PSBcImhpdFwiKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2UgaWYocGxheWVyMS5ib2FyZC5ncmlkW2NvbF1bcm93XSA9PSBcIm1pc3NcIilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZXIoKXtcclxuICAgIC8vICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYmF0dGxlc2hpcFwiKTtcclxuICAgIC8vICAgICBjb25zdCByYW5kb21QbGFjZW1lbnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICAvLyAgICAgY29uc3QgY2xlYXJCb2FyZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYm9hcmRcIilcclxuICAgIC8vICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXQtYmF0dGxlc2hpcFwiKTtcclxuICAgIC8vICAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWNvbnRhaW5lclwiKTtcclxuICAgIC8vICAgICBjb25zdCBnZXRTaGlwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1idXR0b25zXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHBsYXllck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1tZW51XCIpO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBtb3ZlID0gKGUpID0+e1xyXG4gICAgLy8gICAgICAgICBjb25zdCBzcXVhcmUgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNvbCA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJvdyA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgaWYocGxheWVyMS5hdHRhY2socGxheWVyMi5uYW1lLCByb3csIGNvbCkgPT09IFwiaGl0XCIpe1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIC8vICBjaGVja3MgaWYgZ2FtZSBvdmVyXHJcbiAgICAvLyAgICAgICAgICAgICBpZihwbGF5ZXIxLm9wcG9uZW50Qm9hcmQuaXNHYW1lT3ZlcigpKVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGFsZXJ0KFwiR2FtZSBvdmVyXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjayhwbGF5ZXIxLm5hbWUpKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSBcclxuICAgIC8vICAgICAgICAgeyAgICBcclxuICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSgocGxheWVyMi5yYW5kb21BdHRhY2socGxheWVyMS5uYW1lKSkpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBtb3ZlKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IHN0YXJ0ID0gKCkgPT57XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHBsYXllck1vdmVzID0gKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG9wcG9uZW50Qm9hcmRgKS5jaGlsZE5vZGVzO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcGxheSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBjb25zdCByZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaGFuZGxlcnMgd2VyZSByZW1vdmVkIHN1Y2Nlc3NmdWxseS5cIilcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGdldENoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG9wcG9uZW50Qm9hcmRgKS5jaGlsZE5vZGVzO1xyXG4gICAgLy8gICAgICAgICAgICAgZ2V0Q2hpbGRyZW4uZm9yRWFjaCgoc3F1YXJlKSA9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcGxheSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBjb25zdCBwbGF5ID0gKGUpID0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCByb3cgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgY29sID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhdHRsZVNoaXBHYW1lLmdldEF0dGFja2VyKCkgIT09IFwiY29tcHV0ZXJcIiA/IGJhdHRsZVNoaXBHYW1lLmdldEF0dGFja2VyKCkuYXR0YWNrKGJhdHRsZVNoaXBHYW1lLmdldFJlY2VpdmVyKCkubmFtZSwgcm93LCBjb2wpIDogYmF0dGxlU2hpcEdhbWUuZ2V0QXR0YWNrZXIoKS5yYW5kb21BdHRhY2soYmF0dGxlU2hpcEdhbWUuZ2V0UmVjZWl2ZXIoKSk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihyZXN1bHQgPT09IFwiaGl0XCIpXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoaXRcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy9jaGVja3MgZm9yIHN0YXR1c1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdhbWUubmV4dFR1cm4oKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS50dXJuKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcGxheWVyTW92ZXMoKTtcclxuICAgIC8vICAgICAgICAgICAgIH07XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS5pc0dhbWVPdmVyKTtcclxuICAgIC8vICAgICAgICAgICAgIC8vIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgICBcclxuICAgIC8vICAgICAgICAgcGxvdE1lc3NhZ2UoXCJQbGF5ZXIgMSBnb2VzIGZpcnN0XCIpXHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGJhdHRsZVNoaXBHYW1lID0gbmV3IEdhbWUocGxheWVyMSwgcGxheWVyMiwgZmFsc2UpO1xyXG4gICAgLy8gICAgICAgICBiYXR0bGVTaGlwR2FtZS5wbGF5ZXIyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYoIWJhdHRsZVNoaXBHYW1lLmlzR2FtZU92ZXIgJiZcclxuICAgIC8vICAgICAgICAgICAgIGJhdHRsZVNoaXBHYW1lLnBsYXllcjEuYm9hcmQuaXNBbGxTaGlwc0RlcGxveWVkKCkgJiYgYmF0dGxlU2hpcEdhbWUucGxheWVyMi5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy9BZGQgaGFuZGxlciB0byBlYWNoIHNxdWFyZVxyXG4gICAgLy8gICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgLy8gICAgICAgICAgICAgc3RhcnRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHJlbW92ZUFsbENoaWxkTm9kZXMocGxheWVyTWVudSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgLy9HYW1lIHN0YXJ0cyBoZXJlXHJcbiAgICAvLyAgICAgICAgICAgICBwbGF5ZXJNb3ZlcygpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYmF0dGxlU2hpcEdhbWUudHVybik7XHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZmFsc2UpO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgY29uc3QgcmVzZXQgPSAoKSA9PntcclxuICAgIC8vICAgICAgICAgcGxheWVyMS5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIC8vICAgICAgICAgcGxheWVyMi5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy51cGRhdGVHYW1lQm9hcmQoXCJteUJvYXJkXCIpO1xyXG4gICAgLy8gICAgICAgICAvLyByZW1vdmVSZW5kZXIoXCJteUJvYXJkXCIpO1xyXG4gICAgLy8gICAgICAgICAvLyByZW1vdmVSZW5kZXIoXCJvcHBvbmVudEJvYWFyZFwiKTtcclxuXHJcblxyXG5cclxuICAgIC8vICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgLy8gICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICBnZXRTaGlwQnRucy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICByYW5kb21QbGFjZW1lbnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG5cclxuICAgIC8vICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShcIlByZXNzIFN0YXJ0LlwiKVxyXG5cclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAvLyAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHJhbmRvbVBsYWNlbWVudChwbGF5ZXIxKSk7XHJcbiAgICAvLyAgICAgY2xlYXJCb2FyZEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiBjbGVhckJvYXJkKHBsYXllcjEpKVxyXG4gICAgLy8gICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHJlc2V0KTtcclxuXHJcbiAgIFxyXG4gICAgLy8gfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHthZGRIYW5kbGVyLCByZW1vdmVIYW5kbGVyfSBmcm9tICcuL0Z1bmN0aW9ucydcclxuaW1wb3J0IHtwbG90TWVzc2FnZSwgcmFuZG9tUGxhY2VtZW50fSBmcm9tICcuL1Bsb3QnXHJcbmltcG9ydCBcIi4uL3N0eWxlL2dhbWUuc2Nzc1wiXHJcblxyXG5jb25zdCBiYW5uZXIgPSAobWVzc2FnZSkgPT57XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBgPGgxPiR7bWVzc2FnZX08L2gxPmA7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5jb25zdCBsb2FkQnV0dG9ucyA9KHBsYXllcikgPT57XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiO1xyXG5cclxuICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICByYW5kb21QbGFjZW1lbnRCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJyYW5kb20tcGxhY2VtZW50XCIpO1xyXG4gICAgcmFuZG9tUGxhY2VtZW50QnRuLnRleHRDb250ZW50PVwicmFuZG9tXCI7XHJcblxyXG4gICAgY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgY2xlYXJCdG4udGV4dENvbnRlbnQgPSBcImNsZWFyXCI7XHJcbiAgICBjbGVhckJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNsZWFyLWJvYXJkXCIpO1xyXG5cclxuICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQocmFuZG9tUGxhY2VtZW50QnRuKTtcclxuICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQoY2xlYXJCdG4pO1xyXG5cclxuICAgIHJldHVybiBidXR0b25zO1xyXG4gICAgfVxyXG5jb25zdCBsb2FkQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwbGF5ZXIubmFtZSk7XHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0R2FtZWJvYXJkLnJvd3M7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqPGdldEdhbWVib2FyZC5jb2xzOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwicm93XCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpfS0ke2l9LSR7an1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5jb25zdCBsb2FkU3RhcnRCdXR0b24gPSAoKSA9PntcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHN0YXJ0QnRuLmNsYXNzTmFtZT1cInN0YXJ0LWJ0blwiO1xyXG4gICAgc3RhcnRCdG4udGV4dENvbnRlbnQgPSBcIkRvbmVcIjtcclxuICAgIHJldHVybiBzdGFydEJ0bjtcclxufVxyXG5cclxuY29uc3Qgc2hpcE1lbnUgPSAocGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJzaGlwLWJ1dHRvbnNcIjtcclxuICAgXHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG5cIjtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUJ0bik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbmNvbnN0IGhhbmRsZUxvYWRTaGlwQnRuID0gKGUsIHBsYXllcikgPT57XHJcbiAgICBjb25zdCBzaGlwID0gcGxheWVyLmJvYXJkLmdldFNoaXAoZS5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcclxuICAgIGNvbnNvbGUubG9nKHNoaXApO1xyXG4gICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpLmNoaWxkTm9kZXM7XHJcbiBcclxuICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTcXVhcmVDbGljayA9IChlLCBzaGlwLCBwbGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTtcclxuICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTtcclxuXHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgXCJob3Jpem9udGFsXCIpO1xyXG4gICAgfVxyXG5cclxuY2xhc3MgR2FtZXtcclxuICAgIGNvbnN0cnVjdG9yKHBsYXllcjEsIHBsYXllcjIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIxID0gcGxheWVyMTtcclxuICAgICAgICB0aGlzLnBsYXllcjIgPSBwbGF5ZXIyO1xyXG4gICAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHVybiA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy90dXJuIGJhc2UgcGxheWluZyBnYW1lXHJcblxyXG4gICAgZ2V0QXR0YWNrZXIoKXtcclxuICAgICAgICBpZih0aGlzLnR1cm4gJSAyICE9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vaWYgaXQncyBwbGF5ZXIxIHR1cm4sIHJldHVybnMgcGxheWVyMiBuYW1lLlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRSZWNlaXZlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjI7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vcmV0dXJucyBwbGF5ZXIxIGFuZCBwbGF5ZXIyIGFzIHN0cmluZ3NcclxuICAgIGdldEN1cnJlbnRUdXJuT3Bwb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2tlcigpLm5hbWUgPT0gdGhpcy5wbGF5ZXIxLm5hbWUgPyBcInBsYXllcjJcIiA6IFwicGxheWVyMVwiO1xyXG4gICAgfVxyXG4gICAgbmV4dFR1cm4oKXtcclxuICAgICAgICB0aGlzLnR1cm4rKztcclxuICAgICAgICByZXR1cm4gdGhpcy50dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRTZXR1cFVJKHBsYXllcil7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyKTtcclxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICBjb25zdCB1c2VySW50ZXJmYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmNsYXNzTmFtZSA9IFwic2V0dXAtbWVudVwiO1xyXG5cclxuICAgICAgICAvL0xvYWQgU2V0IHBpZWNlcyBieSBwbGF5ZXJzXHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChiYW5uZXIocGxheWVyLm5hbWUpKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGxvYWRCdXR0b25zKHBsYXllcikpO1xyXG5cclxuICAgICAgICBjb25zdCBzaGlwTWVudUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzaGlwTWVudUJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYm9hcmQtY29udGFpbmVyXCI7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkQm9hcmQocGxheWVyKSk7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwTWVudShwbGF5ZXIpKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKHNoaXBNZW51Qm9hcmRDb250YWluZXIpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQobG9hZFN0YXJ0QnV0dG9uKCkpO1xyXG5cclxuICAgICAgICAvL0FmdGVyIEZpcnN0IHBsYXllciBwbGFjZSBhbGwgcGllY2VzLCAybmQgcGxheWVyIHN0YXJ0cyB0byBzZXQgdGhlIHBpZWNlc1xyXG4gICAgICAgIC8vaWYgMm5kIHBsYXllciBpcyBhIGNvbXB1dGVyLCBzdGFydCB0aGUgZ2FtZSAgICAgICAgXHJcblxyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodXNlckludGVyZmFjZSk7XHJcbiAgICB9XHJcbiAgICBsb2FkR2FtZVVJKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICBcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcclxuY2xhc3MgR2FtZWJvYXJke1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3dzID0gMTA7IFxyXG4gICAgdGhpcy5jb2xzID0gMTA7XHJcbiAgICB0aGlzLmdyaWQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLnJvd3MgfSwgKCkgPT4gQXJyYXkodGhpcy5jb2xzKS5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuc2hpcHMgPSBbXHJcbiAgICAgIG5ldyBTaGlwKFwiQXNzYXVsdCBTaGlwXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIkFpcmNyYWZ0IENhcnJpZXJcIiwgNSksXHJcbiAgICAgIG5ldyBTaGlwKFwiRGVzdHJveWVyXCIsIDcpLFxyXG4gICAgICBuZXcgU2hpcChcIkNydWlzZXJcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQ29tYmF0IFNoaXBcIiwgMSkgICBcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICAvL0NsZWFycyB0aGUgYm9hcmQuXHJcbiAgY2xlYXJHcmlkKCl7XHJcbiAgICB0aGlzLmdyaWQuZm9yRWFjaChyb3cgPT4gcm93LmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5jaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpO1xyXG4gIH1cclxuICAvL0NoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHNoaXBzIG9uIHRoZSBib2FyZCBhbmQgaWYgaXQgZml0cy5cclxuICBpc1ZhbGlkKHNoaXAsIHJvdywgY29sKXtcclxuICAgIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgaWYoY29sICsgc2hpcC5sZW5ndGggPiB0aGlzLmNvbHMpXHJcbiAgICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBTaGlwIGRvZXNuJ3QgZml0IGhvcml6b250YWxseS5cIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIC8vIFwiRXJyb3I6IFNoaXAgZG9lc24ndCBmaXQgaG9yaXpvbnRhbGx5LlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgc2hpcC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYodGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdICE9PSBudWxsKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogQSBzaGlwIGlzIGFscmVhZHkgcHJlc2VudCBhdCB0aGlzIGxvY2F0aW9uIGhvcml6b250YWxseS5cIik7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJFcnJvcjogQSBzaGlwIGlzIGFscmVhZHkgcHJlc2VudCBhdCB0aGlzIGxvY2F0aW9uIGhvcml6b250YWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbmRleCArKzsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vUGFzcyBhbGwgdGVzdFxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9IGVsc2UgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgaWYocm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLnJvd3MpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2hpcCBkb2Vzbid0IGZpdCB2ZXJ0aWNhbGx5XCIpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJTaGlwIGRvZXNuJ3QgZml0IHZlcnRpY2FsbHlcIjsgLy9TaGlwIGRvZXNuJ3QgZml0LlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUoaW5kZXggPCBzaGlwLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBIHNoaXAgaXMgYWxyZWFkeSBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJBIHNoaXAgaXMgYWxyZWFkeSBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2UgLy9cIkludmFsaWQgZGlyZWN0aW9uXCI7IC8vaW52YWxpZCBuYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4vL1BsYWNlcyB0aGUgc2hpcCBvbiB0aGUgYm9hcmQuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKXtcclxuICAgIGlmKCF0aGlzLmlzVmFsaWQoc2hpcCwgcm93LCBjb2wpKVxyXG4gICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgXHJcbiAgICBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgICAge1xyXG4gICAgICAgIC8vY2hlY2tzIGZvciBvdmVybGFwcyBvciBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2UgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKXsgLy9kaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxyXG4gICAgICAgIC8vaWYgZXZlcnl0aGluZyBwYXNzZXMsIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gXHJcbiAgICBnZXRTaGlwKHNoaXBOYW1lKXtcclxuICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgaWYoc2hpcC5uYW1lID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIFwic2hpcCBub3QgZm91bmRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIC8vUGxhY2VzIGFuIGF0dGFjayBvbiB0aGUgYm9hcmQuXHJcbiAgcmVjZWl2ZUF0dGFjayh4LCB5KXtcclxuICAgIFxyXG4gICAgaWYoeCA+PSB0aGlzLmNvbHMgfHwgeSA+PXRoaXMucm93cyApXHJcbiAgICAgIHJldHVybiBcIm91dCBvZiBib3VuZHNcIjtcclxuICAgIGlmKHRoaXMuZ3JpZFt4XVt5XSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJtaXNzXCI7IC8vbWFyayBkb3duIG1pc3NcclxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcImhpdFwiO1xyXG4gICAgICByZXR1cm4gXCJoaXRcIjtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF4SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG4gIGdldEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAuaGl0cztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcblxyXG4gIGNoZWNrc0RpZmZlcmVuY2UoKXtcclxuICAgIHJldHVybiB0aGlzLmdldE1heEhpdHMoKSAtIHRoaXMuZ2V0SGl0cygpO1xyXG4gIH1cclxuXHJcbiAgLy9DaGVja3MgaWYgdGhlIGdhbWUgaXMgb3Zlci5cclxuICBpc0dhbWVPdmVyKCl7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSk7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVja3NEaWZmZXJlbmNlKCkgPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0FsbFNoaXBzRGVwbG95ZWQoKXtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGlmKCFzaGlwLmRlcGxveSlcclxuICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKXtcclxuICAgIHRoaXMuc2hpcHMubWFwKChzaGlwKSA9PiBzaGlwLmRlcGxveSA9IGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCB7Z2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudH0gZnJvbSAnLi9SYW5kb20nO1xyXG5pbXBvcnQge3Bsb3RTaGlwfSBmcm9tICcuL1Bsb3QnO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBnYW1lYm9hcmQsIG9wcG9uZW50Qm9hcmQsIGlzSHVtYW4pXHJcbiAge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQgPSBnYW1lYm9hcmQ7XHJcbiAgICB0aGlzLm9wcG9uZW50Qm9hcmQgPSBvcHBvbmVudEJvYXJkO1xyXG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcclxuXHJcbiAgfVxyXG4gIC8vUGxhY2VzIHNoaXBzIHJhbmRvbWx5IG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVJhbmRvbVRvQm9hcmQoKXtcclxuICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQodGhpcy5ib2FyZCwgc2hpcCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLm9wcG9uZW50Qm9hcmQuc2hpcHM7XHJcbiAgfVxyXG4vL0EgZnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gdGhlIGJvYXJkIG1hbnVhbGx5LlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbClcclxuICB7XHJcbiAgICBpZiAoIXNoaXAuZGVwbG95ICYmIHRoaXMuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKSl7XHJcbiAgICAgIHBsb3RTaGlwKHRoaXMubmFtZSwgcm93LCBjb2wsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKTtcclxuICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ3JpZDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCJTaGlwIGhhcyBhbHJlYWR5IGJlZW4gZGVwbG95ZWQuICBUcmllZCBhZ2FpblwiXHJcbiAgICB9XHJcblxyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCl7XHJcbiAgICBjb25zdCBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZW5lbXlCb2FyZE5hbWV9LSR7cm93fS0ke2NvbH1gKTtcclxuXHJcbiAgICBpZih0aGlzLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCkgPT09IFwiaGl0XCIpXHJcbiAgICB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgcmV0dXJuIGBoaXRgOyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIHJldHVybiBgbWlzc2A7XHJcbiAgICB9O1xyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgcmFuZG9tbHkgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgcmFuZG9tQXR0YWNrKGVuZW15Qm9hcmROYW1lKXtcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXModGhpcy5vcHBvbmVudEJvYXJkKTtcclxuICAgIGNvbnN0IHJvdyA9IGNvb3JkaW5hdGVzWzBdO1xyXG4gICAgY29uc3QgY29sID0gY29vcmRpbmF0ZXNbMV07XHJcbiAgICBjb25zb2xlLmxvZyhlbmVteUJvYXJkTmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2soZW5lbXlCb2FyZE5hbWUudG9Mb3dlckNhc2UoKSwgcm93LCBjb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJjb25zdCBwbG90U2hpcHMgPSAoYm9hcmROYW1lLCBnYW1lYm9hcmQpID0+e1xyXG4gICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvYXJkTmFtZSkuY2hpbGROb2RlcztcclxuICAgIFxyXG4gICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgICAgICBjb25zdCBjb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICBjb25zdCByb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICBpZihnYW1lYm9hcmQuZ3JpZFtyb3ddW2NvbF0gIT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gZ2V0U3F1YXJlcztcclxufVxyXG5jb25zdCBwbG90U2hpcCA9IChuYW1lLCByb3csIGNvbCwgbGVuZ3RoLCBvcmllbnRhdGlvbikgPT57XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICBjb2w6IGNvbCxcclxuICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cclxuICAgIH0pXHJcblxyXG4gICAgaWYob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3Jvd30tJHtjb2wgKyBpbmRleH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgZSA9Pntjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQpfSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93ICsgaW5kZXh9LSR7Y29sfWApO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlBsb3R0aW5nIGRpZG4ndCB3b3JrLlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHBsb3RNZXNzYWdlID0gKG1lc3NhZ2UpID0+e1xyXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5LXdyYXBwZXIgaDJcIik7XHJcbiAgICBib3gudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG59XHJcblxyXG5jb25zdCByZW1vdmVSZW5kZXIgPSAocGxheWVyKSA9PntcclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIpLmNoaWxkTm9kZXM7XHJcbiAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge3NxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwifSk7XHJcblxyXG59XHJcbmNvbnN0IHJhbmRvbVBsYWNlbWVudCA9IChwbGF5ZXIpID0+eyAgIFxyXG4gICAgaWYoIXBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSl7XHJcbiAgICAgICAgcGxheWVyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgIHBsb3RTaGlwcyhwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLCBwbGF5ZXIuYm9hcmQpOyAgXHJcbiAgICAgICAgcmV0dXJuIHBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKTsgLy9yZXR1cm5zIHRydWVcclxuICAgIH0gZWxzZXtcclxuICAgICAgICBjbGVhckJvYXJkKHBsYXllcik7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KHBsYXllcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGNsZWFyQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgIHBsYXllci5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIHBsYXllci5ib2FyZC5jaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpO1xyXG4gICAgcmVtb3ZlUmVuZGVyKHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIHBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKTsgLy9yZXR1cm5zIGZhbHNlXHJcbn1cclxuXHJcbi8vQWRkcyBzaGlwcyBvbiBNZW51XHJcbmNvbnN0IGFkZEFsbENoaWxkTm9kZXMgPSAoKSA9PntcclxuICAgIGNvbnN0IGdldE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1tZW51XCIpO1xyXG59XHJcbmNvbnN0IHJlbW92ZUFsbENoaWxkTm9kZXMgPSAocGFyZW50KSA9PntcclxuICAgIHdoaWxlKHBhcmVudC5maXJzdENoaWxkKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJlbnQpO1xyXG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQge3Bsb3RTaGlwcywgcGxvdFNoaXAsIHBsb3RNZXNzYWdlLCByZW1vdmVSZW5kZXIsIHJhbmRvbVBsYWNlbWVudCwgYWRkQWxsQ2hpbGROb2RlcywgcmVtb3ZlQWxsQ2hpbGROb2RlcywgY2xlYXJCb2FyZH0iLCIvL0dlbmVyYXRlcyByYW5kb20gbnVtYmVyIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYW5kIHJvd3MuXHJcbmNvbnN0IGdlbmVyYXRlTnVtYmVyID0gKG1heCkgPT57XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgd2l0aGluIHRoZSBnYW1lIGJvYXJkXHJcbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBjb2wgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQuY29scyk7XHJcbiAgICBsZXQgcm93ID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLnJvd3MpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjb2wsIHJvd107XHJcbn1cclxuXHJcbi8vR2VuZXJhdGUgYSByYW5kb20gcGxhY2VtZW50IG9uIHRoZSBib2FyZC5cclxuY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKGdhbWVib2FyZCwgc2hpcCkgPT57XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInZlcnRpY2FsXCI6IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc2hpcC5vcmllbnRhdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdKSlcclxuICAgIHtcclxuICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWVib2FyZCwgc2hpcCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbi8vUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZFxyXG5jb25zdCBnZXRSYW5kb21Db29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+e1xyXG5cclxuICAgIGxldCByYW5kb21Db29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTsgLy9yZXR1cm5zIGFycmF5XHJcblxyXG4gICAgaWYgKGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwibWlzc1wiICYmIGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwiaGl0XCIgKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gcmFuZG9tQ29vcmRpbmF0ZXM7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHJldHVybiBnZXRSYW5kb21Db29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dldFJhbmRvbUNvb3JkaW5hdGVzLCByYW5kb21QbGFjZW1lbnR9IiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcbmNvbnN0IF9ERUZBVUxUX29yaWVudGF0aW9uICA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBfREVGQVVMVF9vcmllbnRhdGlvbjtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuZGVwbG95ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRPcmllbnRhdGlvbihpdGVtKXtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb247XHJcbiAgfVxyXG5cclxuICBoaXQoKXtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCl7XHJcblxyXG4gICAgaWYoKHRoaXMubGVuZ3RoIC0gdGhpcy5oaXRzKSA9PT0gMClcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBzdW5rYCk7XHJcbiAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBoaXQgJHt0aGlzLmhpdHN9IHRpbWUuYCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGUvc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvdW5kcy9BcHAuanNcIjtcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIEFwcC5sb2FkUGFnZSgpKTsiXSwibmFtZXMiOlsiR2FtZSIsIlBsYXllciIsIkJvYXJkIiwiTWVudSIsImxvYWQiLCJjb250YWluZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJsb2FkSGFuZGxlcnMiLCJnZXRSYWRpb3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0QXR0cmlidXRlIiwiZ2V0RWxlbWVudEJ5SWQiLCJkaXNhYmxlZCIsInBsb3RNZXNzYWdlIiwicmVtb3ZlUmVuZGVyIiwicGxvdFNoaXAiLCJwbG90U2hpcHMiLCJyYW5kb21QbGFjZW1lbnQiLCJyZW1vdmVBbGxDaGlsZE5vZGVzIiwiYWRkQWxsQ2hpbGROb2RlcyIsImNsZWFyQm9hcmQiLCJBcHAiLCJsb2FkUGFnZSIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInN1Ym1pdEhhbmRsZXIiLCJzdWJtaXQiLCJxdWVyeVNlbGVjdG9yIiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwiaXNQbGF5ZXJWc0NvbXB1dGVyIiwiY2hlY2tlZCIsImlzUGxheWVyVnNQbGF5ZXIiLCJnZXRQbGF5ZXIxTmFtZSIsInZhbHVlIiwiZ2V0UGxheWVyMk5hbWUiLCJnYW1lIiwicmVtb3ZlQ2hpbGQiLCJsb2FkU2V0dXBVSSIsInBsYXllcjEiLCJyYW5kb21QbGFjZW1lbnRCdG4iLCJjbGVhckJ0biIsImRvbmVCdG4iLCJzaGlwQnRucyIsInNoaXBCdG4iLCJhY3RpdmF0ZVNxdWFyZSIsImZpbmlzaGVkU2V0dXBCdG4iLCJjb25zb2xlIiwibG9nIiwicGxheWVyIiwibmFtZSIsImdldFNxdWFyZXMiLCJjaGlsZE5vZGVzIiwicGxhY2VTaGlwVG9Cb2FyZCIsImUiLCJyb3ciLCJwYXJzZUludCIsInRhcmdldCIsImNvbCIsInNoaXAiLCJib2FyZCIsImdldFNoaXAiLCJncmlkIiwicGxhY2VTaGlwIiwicGxheWVyMiIsImlzSHVtYW4iLCJzdGFydEdhbWUiLCJhZGRIYW5kbGVyIiwicmVtb3ZlSGFuZGxlciIsImJhbm5lciIsIm1lc3NhZ2UiLCJsb2FkQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImxvYWRCb2FyZCIsImdldEdhbWVib2FyZCIsImkiLCJyb3dzIiwiaiIsImNvbHMiLCJzcXVhcmUiLCJ0b0xvd2VyQ2FzZSIsImxvYWRTdGFydEJ1dHRvbiIsInN0YXJ0QnRuIiwic2hpcE1lbnUiLCJzaGlwcyIsImNyZWF0ZUJ0biIsImlkIiwiaGFuZGxlTG9hZFNoaXBCdG4iLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJjb25zdHJ1Y3RvciIsImlzR2FtZU92ZXIiLCJ0dXJuIiwiZ2V0QXR0YWNrZXIiLCJnZXRSZWNlaXZlciIsImdldEN1cnJlbnRUdXJuT3Bwb25lbnQiLCJuZXh0VHVybiIsInJvb3QiLCJ1c2VySW50ZXJmYWNlIiwic2hpcE1lbnVCb2FyZENvbnRhaW5lciIsImxvYWRHYW1lVUkiLCJTaGlwIiwiR2FtZWJvYXJkIiwiQXJyYXkiLCJmcm9tIiwibGVuZ3RoIiwiZmlsbCIsImNsZWFyR3JpZCIsImNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkIiwiaXNWYWxpZCIsIm9yaWVudGF0aW9uIiwiaW5kZXgiLCJkZXBsb3kiLCJzaGlwTmFtZSIsInJlc3VsdCIsInJlY2VpdmVBdHRhY2siLCJ4IiwieSIsImdldE1heEhpdHMiLCJzdW0iLCJnZXRIaXRzIiwiaGl0cyIsImNoZWNrc0RpZmZlcmVuY2UiLCJpc0FsbFNoaXBzRGVwbG95ZWQiLCJtYXAiLCJnZXRSYW5kb21Db29yZGluYXRlcyIsImdhbWVib2FyZCIsIm9wcG9uZW50Qm9hcmQiLCJwbGFjZVJhbmRvbVRvQm9hcmQiLCJhdHRhY2siLCJlbmVteUJvYXJkTmFtZSIsInBsb3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJyYW5kb21BdHRhY2siLCJjb29yZGluYXRlcyIsImJvYXJkTmFtZSIsImNyZWF0ZUlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImJveCIsInNxdWFyZXMiLCJnZXRNZW51IiwicGFyZW50IiwiZmlyc3RDaGlsZCIsImdlbmVyYXRlTnVtYmVyIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2VuZXJhdGVDb29yZGluYXRlcyIsImRpcmVjdGlvbiIsInJhbmRvbUNvb3JkaW5hdGVzIiwidjQiLCJ1dWlkdjQiLCJfREVGQVVMVF9vcmllbnRhdGlvbiIsInNldE9yaWVudGF0aW9uIiwiaGl0IiwiaXNTdW5rIl0sInNvdXJjZVJvb3QiOiIifQ==