/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Section/GameSetup.js":
/*!**********************************!*\
  !*** ./src/Section/GameSetup.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameSetup)
/* harmony export */ });
/* harmony import */ var _compounds_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../compounds/Gameboard */ "./src/compounds/Gameboard.js");
/* harmony import */ var _compounds_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compounds/Game */ "./src/compounds/Game.js");
/* harmony import */ var _compounds_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../compounds/Player */ "./src/compounds/Player.js");
/* harmony import */ var _compounds_Plot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../compounds/Plot */ "./src/compounds/Plot.js");




class GameSetup {
  static load() {
    this.setup();
  }
  static setup() {
    const player1Board = new _compounds_Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const player2Board = new _compounds_Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    const isPlayerVsComputer = document.getElementById("vsComputer").checked;
    const isPlayerVsPlayer = document.getElementById("vsPlayer").checked;
    if (isPlayerVsPlayer || isPlayerVsComputer) {
      const getPlayer1Name = new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player1Name").value, player1Board, player2Board, true);
      const getPlayer2Name = isPlayerVsComputer ? new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"]("computer", player2Board, player1Board, false) : new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player2Name").value, player2Board, player1Board, true);
      const game = new _compounds_Game__WEBPACK_IMPORTED_MODULE_1__["default"](getPlayer1Name, getPlayer2Name);
      document.getElementById("root").removeChild(document.querySelector(".menu-box"));
      this.setupGame(game, "player 1");
      return game;
    } else {
      console.log("error");
    }
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
  static setupGame = (game, playerTurn) => {
    const player = playerTurn === "player 1" ? game.player1 : game.player2;
    game.loadSetupUI(player);
    const randomPlacementBtn = document.getElementById("random-placement");
    const clearBtn = document.getElementById("clear-board");
    const doneBtn = document.querySelector(".start-btn");
    const shipBtns = document.querySelectorAll(".ship-btn");
    shipBtns.forEach(shipBtn => shipBtn.addEventListener("click", () => this.activateSquare(player, shipBtn.value)));
    randomPlacementBtn.addEventListener("click", () => (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_3__.randomPlacement)(player));
    clearBtn.addEventListener("click", () => (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_3__.clearBoard)(player));
    doneBtn.addEventListener("click", () => this.finishedSetupBtn(game, playerTurn));
    return player;
  };
  static finishedSetupBtn = (game, playerTurn) => {
    document.getElementById("root").removeChild(document.querySelector(".setup-menu"));
    game.player2.isHuman && playerTurn === "player 1" ? this.setupGame(game, "player 2") : this.play(game);
  };
  static play = game => {
    const getRoot = document.getElementById("root");
    if (game.winner != null) {
      console.log(game.winner);
      return game.winner;
    }
    //Whoever is the attacker
    getRoot.appendChild((0,_compounds_Game__WEBPACK_IMPORTED_MODULE_1__.loadBoard)(game.getReceiver()));
    (0,_compounds_Game__WEBPACK_IMPORTED_MODULE_1__.updateBoard)(game.getReceiver());
    if (game.getAttacker().isHuman) {
      //load previous moves if any
      const squares = document.querySelectorAll(".square");
      squares.forEach(item => {
        item.addEventListener("click", e => {
          const row = e.currentTarget.getAttribute("row");
          const col = e.currentTarget.getAttribute("col");
          game.getAttacker().attack(game.getReceiver().name, row, col);
          getRoot.removeChild(document.querySelector(".gameboard"));
          game.nextTurn();
          this.play(game);
        });
      });
    } else {
      //random attack
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_3__.plotShips)(game.getReceiver().name, game.getReceiver().board);
      game.getAttacker().randomAttack(game.getReceiver().name);
      setTimeout(() => {
        getRoot.removeChild(document.querySelector(".gameboard"));
        game.nextTurn();
        this.play(game);
      }, 1000);
    }
    return game.getCurrentTurnOpponent();
  };
}

/***/ }),

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
/* harmony import */ var _GameSetup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameSetup */ "./src/Section/GameSetup.js");


class Menu {
  static load() {
    const root = document.getElementById("root");
    root.appendChild(this.UI());
    this.loadHandlers();
  }
  static UI() {
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
    const submit = document.querySelector(".submit-btn");
    getRadios.forEach(item => {
      item.addEventListener("change", () => {
        if (item.getAttribute("id") === "vsPlayer") {
          document.getElementById("player2Name").disabled = false;
        } else {
          document.getElementById("player2Name").disabled = true;
        }
      });
    });
    submit.addEventListener("click", () => _GameSetup__WEBPACK_IMPORTED_MODULE_1__["default"].load());
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

class App {
  static loadPage() {
    _Section_Menu__WEBPACK_IMPORTED_MODULE_0__["default"].load();
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
/* harmony export */   banner: () => (/* binding */ banner),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   handleLoadShipBtn: () => (/* binding */ handleLoadShipBtn),
/* harmony export */   handleSquareClick: () => (/* binding */ handleSquareClick),
/* harmony export */   loadBoard: () => (/* binding */ loadBoard),
/* harmony export */   loadButtons: () => (/* binding */ loadButtons),
/* harmony export */   loadStartButton: () => (/* binding */ loadStartButton),
/* harmony export */   shipMenu: () => (/* binding */ shipMenu),
/* harmony export */   updateBoard: () => (/* binding */ updateBoard)
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
  container.setAttribute("id", player.name.toLowerCase());
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
const updateBoard = player => {
  const getSquares = document.querySelector(".gameboard").childNodes;
  getSquares.forEach(item => {
    const parsedRow = item.getAttribute("row");
    const parsedCol = item.getAttribute("col");
    if (player.board.grid[parsedRow][parsedCol] === "hit") {
      item.classList.add("hit");
    } else if (player.board.grid[parsedRow][parsedCol] === "miss") {
      item.classList.add("miss");
    }
  });
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
    this.winner = null;
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
    root.appendChild(userInterface);
  }
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
        return false; // "Error: Ship doesn't fit horizontally.";
      } else {
        let index = 0;
        while (index < ship.length) {
          if (this.grid[row][col + index] !== null) {
            return false; //"Error: A ship is already present at this location horizontally."; //A ship is current in that location
          }
          index++;
        }
        return true; //Pass all test
      }
    } else if (ship.orientation === "vertical") {
      if (row + ship.length > this.rows) {
        return false; //"Ship doesn't fit vertically"; //Ship doesn't fit.
      } else {
        let index = 0;
        while (index < ship.length) {
          if (this.grid[row + index][col] !== null) {
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
    console.log(enemyBoardName);
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
    console.log("random attack executed");
    return this.attack(enemyBoardName, row, col);
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
  const getSquares = document.getElementById(boardName.toLowerCase()).childNodes;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxrQkFBa0IsRUFBRXFDLHlEQUFHLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xzLy4vc3JjL1NlY3Rpb24vR2FtZVNldHVwLmpzIiwid2VicGFjazovL2xzLy4vc3JjL1NlY3Rpb24vTWVudS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvQXBwLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9HYW1lLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxvdC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUmFuZG9tLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9TaGlwLmpzIiwid2VicGFjazovL2xzLy4vc3JjL3N0eWxlL2dhbWUuc2Nzcz82ODQ4Iiwid2VicGFjazovL2xzLy4vc3JjL3N0eWxlL21lbnUuc2Nzcz82N2MwIiwid2VicGFjazovL2xzLy4vc3JjL3N0eWxlL3N0eWxlLnNjc3M/NDU2ZCIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCb2FyZCBmcm9tIFwiLi4vY29tcG91bmRzL0dhbWVib2FyZFwiO1xyXG5pbXBvcnQgR2FtZSwgIHtsb2FkQm9hcmQsIHVwZGF0ZUJvYXJkfSBmcm9tIFwiLi4vY29tcG91bmRzL0dhbWVcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vY29tcG91bmRzL1BsYXllclwiO1xyXG5pbXBvcnQge3Bsb3RNZXNzYWdlLFxyXG4gICAgcmVtb3ZlUmVuZGVyLCBcclxuICAgIHBsb3RTaGlwLFxyXG4gICAgcGxvdFNoaXBzLCBcclxuICAgIHJhbmRvbVBsYWNlbWVudCwgXHJcbiAgICByZW1vdmVBbGxDaGlsZE5vZGVzLFxyXG4gICAgYWRkQWxsQ2hpbGROb2RlcywgXHJcbiAgICBjbGVhckJvYXJkfSBmcm9tICcuLi9jb21wb3VuZHMvUGxvdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTZXR1cHtcclxuICAgIHN0YXRpYyBsb2FkKCl7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldHVwKCl7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMUJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMkJvYXJkID0gbmV3IEJvYXJkKClcclxuXHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJWc0NvbXB1dGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2c0NvbXB1dGVyXCIpLmNoZWNrZWQ7XHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJWc1BsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidnNQbGF5ZXJcIikuY2hlY2tlZDtcclxuXHJcbiAgICAgICBpZihpc1BsYXllclZzUGxheWVyIHx8IGlzUGxheWVyVnNDb21wdXRlcilcclxuICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMU5hbWUgPSBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMU5hbWVcIikudmFsdWUsIHBsYXllcjFCb2FyZCwgcGxheWVyMkJvYXJkLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMk5hbWUgPSBpc1BsYXllclZzQ29tcHV0ZXIgPyBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyMkJvYXJkLCBwbGF5ZXIxQm9hcmQsIGZhbHNlKSA6IFxyXG4gICAgICAgICAgICAgICAgbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLnZhbHVlLCBwbGF5ZXIyQm9hcmQsIHBsYXllcjFCb2FyZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShnZXRQbGF5ZXIxTmFtZSwgZ2V0UGxheWVyMk5hbWUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LWJveFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBHYW1lKGdhbWUsIFwicGxheWVyIDFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBnYW1lO1xyXG5cclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XHJcbiAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIHN0YXRpYyBhY3RpdmF0ZVNxdWFyZSA9IChwbGF5ZXIsIG5hbWUpID0+e1xyXG4gICAgICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIikuY2hpbGROb2RlcztcclxuIFxyXG4gICAgICAgICBjb25zdCBwbGFjZVNoaXBUb0JvYXJkID0gKGUpID0+IHtcclxuICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7IC8vcmV0dXJucyByb3dcclxuICAgICAgICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuICAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChuYW1lKTsgLy9yZXR1cm5zIHNoaXBcclxuICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcGFyc2VJbnQocm93KSwgcGFyc2VJbnQoY29sKSkpO1xyXG4gXHJcbiAgICAgICAgICAgICBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gPT09IG51bGwpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgLy9wbGFjZSB0aGUgc2hpcFxyXG4gICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXIucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKTtcclxuIFxyXG4gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAvL3NlbGVjdHMgdGhlIHNoaXBcclxuICAgICAgICAgICAgICAgICByZXR1cm4oXCJUaGVyZSBpcyBhIHNoaXAgbG9jYXRlZCB0aGVyZS4gIFBsYWNlIGFub3RoZXIgc3F1YXJlLlwiKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBwbGFjZVNoaXBUb0JvYXJkKTtcclxuICAgICAgICAgfSlcclxuICAgICB9XHJcbiBcclxuICAgICBzdGF0aWMgc2V0dXBHYW1lID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gICAgICAgICBjb25zdCBwbGF5ZXIgPSBwbGF5ZXJUdXJuID09PSBcInBsYXllciAxXCIgPyBnYW1lLnBsYXllcjEgOiBnYW1lLnBsYXllcjI7XHJcbiAgICAgICAgIGdhbWUubG9hZFNldHVwVUkocGxheWVyKTtcclxuICAgICAgICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb20tcGxhY2VtZW50XCIpO1xyXG4gICAgICAgICBjb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYm9hcmRcIik7XHJcbiAgICAgICAgIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWJ0blwiKTtcclxuICAgICAgICAgY29uc3Qgc2hpcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXAtYnRuXCIpO1xyXG4gICAgICAgICBzaGlwQnRucy5mb3JFYWNoKChzaGlwQnRuID0+IHNoaXBCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gdGhpcy5hY3RpdmF0ZVNxdWFyZShwbGF5ZXIsIHNoaXBCdG4udmFsdWUpKSkpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHJhbmRvbVBsYWNlbWVudChwbGF5ZXIpKTtcclxuICAgICAgICAgY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gY2xlYXJCb2FyZChwbGF5ZXIpKTtcclxuICAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB0aGlzLmZpbmlzaGVkU2V0dXBCdG4oZ2FtZSwgcGxheWVyVHVybikpO1xyXG4gICAgICAgICByZXR1cm4gcGxheWVyO1xyXG4gICAgIH1cclxuIFxyXG4gICAgIHN0YXRpYyBmaW5pc2hlZFNldHVwQnRuID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZXR1cC1tZW51XCIpKTtcclxuICAgICAgICAgZ2FtZS5wbGF5ZXIyLmlzSHVtYW4gJiYgcGxheWVyVHVybiA9PT0gXCJwbGF5ZXIgMVwiID8gdGhpcy5zZXR1cEdhbWUoZ2FtZSwgXCJwbGF5ZXIgMlwiKSA6IHRoaXMucGxheShnYW1lKTtcclxuICAgICB9XHJcblxyXG4gICAgIHN0YXRpYyBwbGF5ID0oZ2FtZSkgPT57XHJcbiAgICAgICAgY29uc3QgZ2V0Um9vdCA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcbiAgICAgICAgaWYoZ2FtZS53aW5uZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUud2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdhbWUud2lubmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1dob2V2ZXIgaXMgdGhlIGF0dGFja2VyXHJcbiAgICAgICAgZ2V0Um9vdC5hcHBlbmRDaGlsZChsb2FkQm9hcmQoZ2FtZS5nZXRSZWNlaXZlcigpKSk7XHJcbiAgICAgICAgdXBkYXRlQm9hcmQoZ2FtZS5nZXRSZWNlaXZlcigpKTtcclxuICAgICAgICBpZihnYW1lLmdldEF0dGFja2VyKCkuaXNIdW1hbilcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vbG9hZCBwcmV2aW91cyBtb3ZlcyBpZiBhbnlcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBlID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLmdldEF0dGFja2VyKCkuYXR0YWNrKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCByb3csIGNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0Um9vdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5uZXh0VHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3JhbmRvbSBhdHRhY2tcclxuICAgICAgICAgICAgcGxvdFNoaXBzKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCBnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQpO1xyXG4gICAgICAgICAgICBnYW1lLmdldEF0dGFja2VyKCkucmFuZG9tQXR0YWNrKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgZ2V0Um9vdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm5leHRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGdhbWUuZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpO1xyXG5cclxuICAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCAnLi4vc3R5bGUvbWVudS5zY3NzJ1xyXG5pbXBvcnQgR2FtZVNldHVwIGZyb20gXCIuL0dhbWVTZXR1cFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudXtcclxuICAgIHN0YXRpYyBsb2FkKCl7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMuVUkoKSk7XHJcbiAgICAgICAgdGhpcy5sb2FkSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBVSSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVudS1ib3hcIjtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGgxIGNsYXNzPVwidGV4dC1jZW50ZXJlZFwiPldlbGNvbWUgdG8gQmF0dGxlc2hpcDwvaDE+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJnYW1lRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwbGF5ZXIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5QbGF5ZXIgMTo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGxheWVyMU5hbWVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIGlkPVwicGxheWVyMklucHV0XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwbGF5ZXIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5QbGF5ZXIgMjo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGxheWVyMk5hbWVcIiBkaXNhYmxlZC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJnYW1lTW9kZVwiIGNsYXNzPVwiZ2FtZU1vZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQgPVwidnNDb21wdXRlclwiIG5hbWU9XCJnYW1lTW9kZVwiIHZhbHVlPVwiY29tcHV0ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidnNDb21wdXRlclwiPlBsYXllciB2cyBDb21wdXRlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwidnNQbGF5ZXJcIiBuYW1lPVwiZ2FtZU1vZGVcIiB2YWx1ZT1cInBsYXllclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ2c1BsYXllclwiPlBsYXllciB2cyBQbGF5ZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym1pdC1idG5cIiB0eXBlPVwic3VibWl0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICBcclxuICAgICAgICBgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkSGFuZGxlcnMoKXtcclxuICAgICAgICBjb25zdCBnZXRSYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVNb2RlIGlucHV0XCIpO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0LWJ0blwiKTtcclxuXHJcbiAgICAgICAgZ2V0UmFkaW9zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNoYW5nZVwiKSwgKCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBcInZzUGxheWVyXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyTmFtZVwiKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IEdhbWVTZXR1cC5sb2FkKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgTWVudSBmcm9tICcuLi9TZWN0aW9uL01lbnUnO1xyXG4vLyBpbXBvcnQgQm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnO1xyXG4vLyBpbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcclxuLy8gaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcclxuLy8gaW1wb3J0IHtwbG90TWVzc2FnZSxcclxuLy8gICAgICByZW1vdmVSZW5kZXIsIFxyXG4vLyAgICAgIHBsb3RTaGlwLFxyXG4vLyAgICAgIHBsb3RTaGlwcywgXHJcbi8vICAgICAgcmFuZG9tUGxhY2VtZW50LCBcclxuLy8gICAgICByZW1vdmVBbGxDaGlsZE5vZGVzLFxyXG4vLyAgICAgIGFkZEFsbENoaWxkTm9kZXMsIFxyXG4vLyAgICAgIGNsZWFyQm9hcmR9IGZyb20gJy4vUGxvdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIE1lbnUubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkQnV0dG9ucygpe1xyXG4gICAgLy8gICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiXHJcblxyXG4gICAgLy8gICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gYFxyXG4gICAgLy8gICAgICAgICA8YnV0dG9uIGlkPVwic3RhcnQtYmF0dGxlc2hpcFwiIHR5cGU9XCJidXR0b25cIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAvLyAgICAgICAgIDxidXR0b24gaWQ9XCJyYW5kb20tcGxhY2VtZW50XCIgdHlwZT1cImJ1dHRvblwiPlJhbmRvbSBQbGFjZW1lbnQ8L2J1dHRvbj5cclxuICAgIC8vICAgICAgICAgPGJ1dHRvbiBpZD0gXCJjbGVhci1ib2FyZFwiIHR5cGU9XCJidXR0b25cIj5DbGVhcjwvYnV0dG9uPlxyXG4gICAgLy8gICAgICAgICA8YnV0dG9uIGlkPVwicmVzZXQtYmF0dGxlc2hpcFwiIGNsYXNzPVwiaGlkZGVuXCIgdHlwZT1cImJ1dHRvblwiPlJlc2V0PC9idXR0b24+XHJcbiAgICAvLyAgICAgYFxyXG4gICAgLy8gICAgIHJldHVybiBidXR0b25zO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkQm9hcmRzKCl7XHJcbiAgICAvLyAgICAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBib2FyZHMuY2xhc3NOYW1lID0gXCJib2FyZHMtY29udGFpbmVyXCI7XHJcbiAgICAvLyAgICAgYm9hcmRzLmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkKHBsYXllcjEsIFwibXlCb2FyZFwiKSk7XHJcbiAgICAvLyAgICAgYm9hcmRzLmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkKHBsYXllcjIsIFwib3Bwb25lbnRCb2FyZFwiKSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBib2FyZHM7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRET00oKXtcclxuICAgIC8vICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250ZW50LmNsYXNzTmFtZSA9IFwiZ2FtZS1jb250YWluZXJcIjtcclxuXHJcbiAgICAvLyAgICAgY29uc3QgaGFuZGxlQnRuc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgaGFuZGxlQnRuc0NvbnRhaW5lci5jbGFzc05hbWUgPSBcInBsYXllci1tZW51XCI7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaGFuZGxlQnRuc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxvYWRTaGlwcyhwbGF5ZXIxKSk7XHJcbiAgICAvLyAgICAgaGFuZGxlQnRuc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxvYWRPcmllbnRhdGlvbkJ0bnMoKSk7XHJcbiAgICAvLyAgICAgY29udGVudC5hcHBlbmRDaGlsZChoYW5kbGVCdG5zQ29udGFpbmVyKTtcclxuXHJcbiAgICAvLyAgICAgY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRCb2FyZHMoKSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkTWVzc2FnZUxvZygpe1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctY29udGFpbmVyXCI7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgYm94LmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctYm94XCI7XHJcbiAgICAvLyAgICAgYm94LmlubmVySFRNTCA9IGA8cCBpZD1cIm1lc3NhZ2UtbG9nXCI+VGVzdDwvcD5gO1xyXG5cclxuICAgIC8vICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIC8vIH1cclxuICAgIC8vIHN0YXRpYyBzZW5kTWVzc2FnZShtZXNzYWdlKXtcclxuICAgIC8vICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXktd3JhcHBlciBoMlwiKTtcclxuICAgIC8vICAgICBib3gudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkQm9hcmQocGxheWVyLCBpZCl7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMubG9hZEdyaWQocGxheWVyLCBpZCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikge1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgLy8gICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHBsYXllci5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZU9yaWVudGF0aW9uID0gKHNoaXApID0+e1xyXG4gICAgLy8gICAgIGNvbnN0IG9yaWVudGF0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JpZW50YXRpb24tYnRuc1wiKTtcclxuICAgIC8vICAgICBvcmllbnRhdGlvbkJ0bnMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAvLyAgICAgICAgIGlmKGl0ZW0udmFsdWUgIT09IHNoaXAub3JpZW50YXRpb24pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoZSkgPT4gdGhpcy5oYW5kbGVPcmllbnRhdGlvbkJ0bihlLCBzaGlwKSk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBoYW5kbGVMb2FkU2hpcEJ0biA9IChlLCBwbGF5ZXIpID0+e1xyXG4gICAgLy8gICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xyXG4gICAgLy8gICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Qm9hcmRcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAvLyAgICAgdGhpcy5oYW5kbGVPcmllbnRhdGlvbihzaGlwKTtcclxuIFxyXG4gICAgLy8gICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgLy8gICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdGhpcy5oYW5kbGVTcXVhcmVDbGljayhlLCBzaGlwLCBwbGF5ZXIpKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlT3JpZW50YXRpb25CdG4gPSAoZSwgc2hpcCkgPT57XHJcbiAgICAvLyAgICAgLy8gc2hpcC5zZXRPcmllbnRhdGlvbiA9IGUuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgIC8vICAgICBzaGlwLm9yaWVudGF0aW9uID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHNoaXApO1xyXG4gICAgLy8gICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcblxyXG5cclxuICAgIC8vICAgICBjb25zdCBvcmllbnRhdGlvbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yaWVudGF0aW9uLWJ0bnNcIik7XHJcbiAgICAvLyAgICAgb3JpZW50YXRpb25CdG5zLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgLy8gICAgICAgICBpZihpdGVtLnZhbHVlICE9PSBzaGlwLm9yaWVudGF0aW9uKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKGUpID0+IHRoaXMuaGFuZGxlT3JpZW50YXRpb24oZSwgc2hpcCkpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRPcmllbnRhdGlvbkJ0bnMgPSAoKSA9PntcclxuICAgIC8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm9yaWVudGF0aW9uLWNvbnRhaW5lclwiO1xyXG5cclxuICAgIC8vICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgLy8gICAgIDxidXR0b24gY2xhc3M9XCJvcmllbnRhdGlvbi1idG5zXCIgaWQ9XCJob3Jpem9udGFsLWJ0blwiIHZhbHVlPVwiaG9yaXpvbnRhbFwiPmhvcml6b250YWw8L2J1dHRvbj5cclxuICAgIC8vICAgICA8YnV0dG9uIGNsYXNzPVwib3JpZW50YXRpb24tYnRuc1wiIGlkPVwidmVydGljYWwtYnRuXCIgdmFsdWU9XCJ2ZXJ0aWNhbFwiPnZlcnRpY2FsPC9idXR0b24+XHJcbiAgICAvLyAgICAgYDtcclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkU2hpcHMocGxheWVyKSB7XHJcbiAgICAvLyAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJzaGlwLWJ1dHRvbnNcIjtcclxuICAgXHJcbiAgICAvLyAgICAgcGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc3QgY3JlYXRlU2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgICAgICBjcmVhdGVTaGlwcy5jbGFzc05hbWUgPSBcInNoaXAtYnRuLWNvbnRhaW5lclwiO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNyZWF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi5jbGFzc05hbWUgPSBcInNoaXAtYnRuXCI7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzaGlwLmlkKTtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNoaXAubmFtZSk7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICBjcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLmhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgIC8vICAgICAgICAgY3JlYXRlU2hpcHMuYXBwZW5kQ2hpbGQoY3JlYXRlQnRuKTtcclxuICAgIC8vICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVNoaXBzKTtcclxuICAgICAgIFxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgXHJcbiAgICAvLyB9XHJcbiAgICAvLyBzdGF0aWMgbG9hZEdyaWQocGxheWVyLCBpZCl7XHJcbiAgICAvLyAgICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gcGxheWVyLmJvYXJkO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCk7XHJcblxyXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0R2FtZWJvYXJkLnJvd3M7IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGZvciAobGV0IGogPSAwOyBqPGdldEdhbWVib2FyZC5jb2xzOyBqKyspXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwicm93XCIsIGkpO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgIC8vICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpfS0ke2l9LSR7an1gKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBwbG90U2hpcHMoZ2FtZWJvYXJkKXtcclxuICAgIC8vICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIxXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgLy8gICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgLy8gICAgICAgICBjb25zdCByb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgIC8vICAgICAgICAgaWYoZ2FtZWJvYXJkLmdyaWRbcm93XVtjb2xdICE9PSBudWxsKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZXIoKXtcclxuICAgIC8vICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYmF0dGxlc2hpcFwiKTtcclxuICAgIC8vICAgICBjb25zdCByYW5kb21QbGFjZW1lbnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICAvLyAgICAgY29uc3QgY2xlYXJCb2FyZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYm9hcmRcIilcclxuICAgIC8vICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXQtYmF0dGxlc2hpcFwiKTtcclxuICAgIC8vICAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWNvbnRhaW5lclwiKTtcclxuICAgIC8vICAgICBjb25zdCBnZXRTaGlwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1idXR0b25zXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHBsYXllck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1tZW51XCIpO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBtb3ZlID0gKGUpID0+e1xyXG4gICAgLy8gICAgICAgICBjb25zdCBzcXVhcmUgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNvbCA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJvdyA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgaWYocGxheWVyMS5hdHRhY2socGxheWVyMi5uYW1lLCByb3csIGNvbCkgPT09IFwiaGl0XCIpe1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIC8vICBjaGVja3MgaWYgZ2FtZSBvdmVyXHJcbiAgICAvLyAgICAgICAgICAgICBpZihwbGF5ZXIxLm9wcG9uZW50Qm9hcmQuaXNHYW1lT3ZlcigpKVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGFsZXJ0KFwiR2FtZSBvdmVyXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjayhwbGF5ZXIxLm5hbWUpKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSBcclxuICAgIC8vICAgICAgICAgeyAgICBcclxuICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSgocGxheWVyMi5yYW5kb21BdHRhY2socGxheWVyMS5uYW1lKSkpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBtb3ZlKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IHN0YXJ0ID0gKCkgPT57XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHBsYXllck1vdmVzID0gKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG9wcG9uZW50Qm9hcmRgKS5jaGlsZE5vZGVzO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcGxheSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBjb25zdCByZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaGFuZGxlcnMgd2VyZSByZW1vdmVkIHN1Y2Nlc3NmdWxseS5cIilcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGdldENoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG9wcG9uZW50Qm9hcmRgKS5jaGlsZE5vZGVzO1xyXG4gICAgLy8gICAgICAgICAgICAgZ2V0Q2hpbGRyZW4uZm9yRWFjaCgoc3F1YXJlKSA9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcGxheSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBjb25zdCBwbGF5ID0gKGUpID0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCByb3cgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgY29sID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhdHRsZVNoaXBHYW1lLmdldEF0dGFja2VyKCkgIT09IFwiY29tcHV0ZXJcIiA/IGJhdHRsZVNoaXBHYW1lLmdldEF0dGFja2VyKCkuYXR0YWNrKGJhdHRsZVNoaXBHYW1lLmdldFJlY2VpdmVyKCkubmFtZSwgcm93LCBjb2wpIDogYmF0dGxlU2hpcEdhbWUuZ2V0QXR0YWNrZXIoKS5yYW5kb21BdHRhY2soYmF0dGxlU2hpcEdhbWUuZ2V0UmVjZWl2ZXIoKSk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihyZXN1bHQgPT09IFwiaGl0XCIpXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoaXRcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy9jaGVja3MgZm9yIHN0YXR1c1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdhbWUubmV4dFR1cm4oKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS50dXJuKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcGxheWVyTW92ZXMoKTtcclxuICAgIC8vICAgICAgICAgICAgIH07XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS5pc0dhbWVPdmVyKTtcclxuICAgIC8vICAgICAgICAgICAgIC8vIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgICBcclxuICAgIC8vICAgICAgICAgcGxvdE1lc3NhZ2UoXCJQbGF5ZXIgMSBnb2VzIGZpcnN0XCIpXHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGJhdHRsZVNoaXBHYW1lID0gbmV3IEdhbWUocGxheWVyMSwgcGxheWVyMiwgZmFsc2UpO1xyXG4gICAgLy8gICAgICAgICBiYXR0bGVTaGlwR2FtZS5wbGF5ZXIyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYoIWJhdHRsZVNoaXBHYW1lLmlzR2FtZU92ZXIgJiZcclxuICAgIC8vICAgICAgICAgICAgIGJhdHRsZVNoaXBHYW1lLnBsYXllcjEuYm9hcmQuaXNBbGxTaGlwc0RlcGxveWVkKCkgJiYgYmF0dGxlU2hpcEdhbWUucGxheWVyMi5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy9BZGQgaGFuZGxlciB0byBlYWNoIHNxdWFyZVxyXG4gICAgLy8gICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgLy8gICAgICAgICAgICAgc3RhcnRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHJlbW92ZUFsbENoaWxkTm9kZXMocGxheWVyTWVudSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgLy9HYW1lIHN0YXJ0cyBoZXJlXHJcbiAgICAvLyAgICAgICAgICAgICBwbGF5ZXJNb3ZlcygpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYmF0dGxlU2hpcEdhbWUudHVybik7XHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZmFsc2UpO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgY29uc3QgcmVzZXQgPSAoKSA9PntcclxuICAgIC8vICAgICAgICAgcGxheWVyMS5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIC8vICAgICAgICAgcGxheWVyMi5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy51cGRhdGVHYW1lQm9hcmQoXCJteUJvYXJkXCIpO1xyXG4gICAgLy8gICAgICAgICAvLyByZW1vdmVSZW5kZXIoXCJteUJvYXJkXCIpO1xyXG4gICAgLy8gICAgICAgICAvLyByZW1vdmVSZW5kZXIoXCJvcHBvbmVudEJvYWFyZFwiKTtcclxuXHJcblxyXG5cclxuICAgIC8vICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgLy8gICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICBnZXRTaGlwQnRucy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICByYW5kb21QbGFjZW1lbnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG5cclxuICAgIC8vICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShcIlByZXNzIFN0YXJ0LlwiKVxyXG5cclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAvLyAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHJhbmRvbVBsYWNlbWVudChwbGF5ZXIxKSk7XHJcbiAgICAvLyAgICAgY2xlYXJCb2FyZEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiBjbGVhckJvYXJkKHBsYXllcjEpKVxyXG4gICAgLy8gICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHJlc2V0KTtcclxuXHJcbiAgIFxyXG4gICAgLy8gfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHthZGRIYW5kbGVyLCByZW1vdmVIYW5kbGVyfSBmcm9tICcuL0Z1bmN0aW9ucydcclxuaW1wb3J0IHtwbG90TWVzc2FnZSwgcmFuZG9tUGxhY2VtZW50fSBmcm9tICcuL1Bsb3QnXHJcbmltcG9ydCBcIi4uL3N0eWxlL2dhbWUuc2Nzc1wiXHJcblxyXG5leHBvcnQgY29uc3QgYmFubmVyID0gKG1lc3NhZ2UpID0+e1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGl0ZW0uaW5uZXJIVE1MID0gYDxoMT4ke21lc3NhZ2V9PC9oMT5gO1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn1cclxuZXhwb3J0IGNvbnN0IGxvYWRCdXR0b25zID0ocGxheWVyKSA9PntcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYnV0dG9ucy5jbGFzc05hbWUgPSBcImJ1dHRvbnMtY29udGFpbmVyXCI7XHJcblxyXG4gICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICByYW5kb21QbGFjZW1lbnRCdG4udGV4dENvbnRlbnQ9XCJyYW5kb21cIjtcclxuXHJcbiAgICBjb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjbGVhckJ0bi50ZXh0Q29udGVudCA9IFwiY2xlYXJcIjtcclxuICAgIGNsZWFyQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2xlYXItYm9hcmRcIik7XHJcblxyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChyYW5kb21QbGFjZW1lbnRCdG4pO1xyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChjbGVhckJ0bik7XHJcblxyXG4gICAgcmV0dXJuIGJ1dHRvbnM7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCBsb2FkQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRHYW1lYm9hcmQucm93czsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiY29sXCIsIGopO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkUm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZENvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtwYXJzZWRSb3ddW3BhcnNlZENvbF0gPT09IFwiaGl0XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJtaXNzXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCBsb2FkU3RhcnRCdXR0b24gPSAoKSA9PntcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHN0YXJ0QnRuLmNsYXNzTmFtZT1cInN0YXJ0LWJ0blwiO1xyXG4gICAgc3RhcnRCdG4udGV4dENvbnRlbnQgPSBcIkRvbmVcIjtcclxuICAgIHJldHVybiBzdGFydEJ0bjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXBNZW51ID0gKHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwic2hpcC1idXR0b25zXCI7XHJcbiAgIFxyXG4gICAgICAgIHBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5jbGFzc05hbWUgPSBcInNoaXAtYnRuXCI7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzaGlwLmlkKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNoaXAubmFtZSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoYW5kbGVMb2FkU2hpcEJ0bihlLCBwbGF5ZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVCdG4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlTG9hZFNoaXBCdG4gPSAoZSwgcGxheWVyKSA9PntcclxuICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSkuY2hpbGROb2RlcztcclxuIFxyXG4gICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoYW5kbGVTcXVhcmVDbGljayhlLCBzaGlwLCBwbGF5ZXIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGhhbmRsZVNxdWFyZUNsaWNrID0gKGUsIHNoaXAsIHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG5cclxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIik7XHJcbiAgICB9XHJcblxyXG5jbGFzcyBHYW1le1xyXG4gICAgY29uc3RydWN0b3IocGxheWVyMSwgcGxheWVyMilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xyXG4gICAgICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudHVybiA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy90dXJuIGJhc2UgcGxheWluZyBnYW1lXHJcblxyXG4gICAgZ2V0QXR0YWNrZXIoKXtcclxuICAgICAgICBpZih0aGlzLnR1cm4gJSAyICE9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vaWYgaXQncyBwbGF5ZXIxIHR1cm4sIHJldHVybnMgcGxheWVyMiBuYW1lLlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRSZWNlaXZlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjI7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vcmV0dXJucyBwbGF5ZXIxIGFuZCBwbGF5ZXIyIGFzIHN0cmluZ3NcclxuICAgIGdldEN1cnJlbnRUdXJuT3Bwb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2tlcigpLm5hbWUgPT0gdGhpcy5wbGF5ZXIxLm5hbWUgPyBcInBsYXllcjJcIiA6IFwicGxheWVyMVwiO1xyXG4gICAgfVxyXG4gICAgbmV4dFR1cm4oKXtcclxuICAgICAgICB0aGlzLnR1cm4rKztcclxuICAgICAgICByZXR1cm4gdGhpcy50dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRTZXR1cFVJKHBsYXllcil7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuICAgICAgICBjb25zdCB1c2VySW50ZXJmYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmNsYXNzTmFtZSA9IFwic2V0dXAtbWVudVwiO1xyXG4gICAgICAgIC8vTG9hZCBTZXQgcGllY2VzIGJ5IHBsYXllcnNcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGJhbm5lcihwbGF5ZXIubmFtZSkpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQobG9hZEJ1dHRvbnMocGxheWVyKSk7XHJcbiAgICAgICAgY29uc3Qgc2hpcE1lbnVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImJvYXJkLWNvbnRhaW5lclwiO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKHBsYXllcikpO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcE1lbnUocGxheWVyKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChzaGlwTWVudUJvYXJkQ29udGFpbmVyKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGxvYWRTdGFydEJ1dHRvbigpKTtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVzZXJJbnRlcmZhY2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XHJcbmNsYXNzIEdhbWVib2FyZHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm93cyA9IDEwOyBcclxuICAgIHRoaXMuY29scyA9IDEwO1xyXG4gICAgdGhpcy5ncmlkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5yb3dzIH0sICgpID0+IEFycmF5KHRoaXMuY29scykuZmlsbChudWxsKSk7XHJcbiAgICB0aGlzLnNoaXBzID0gW1xyXG4gICAgICBuZXcgU2hpcChcIkFzc2F1bHQgU2hpcFwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJBaXJjcmFmdCBDYXJyaWVyXCIsIDUpLFxyXG4gICAgICBuZXcgU2hpcChcIkRlc3Ryb3llclwiLCA3KSxcclxuICAgICAgbmV3IFNoaXAoXCJDcnVpc2VyXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIkNvbWJhdCBTaGlwXCIsIDEpICAgXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgLy9DbGVhcnMgdGhlIGJvYXJkLlxyXG4gIGNsZWFyR3JpZCgpe1xyXG4gICAgdGhpcy5ncmlkLmZvckVhY2gocm93ID0+IHJvdy5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKTtcclxuICB9XHJcbiAgLy9DaGVja3MgaWYgdGhlcmUgYXJlIGFueSBzaGlwcyBvbiB0aGUgYm9hcmQgYW5kIGlmIGl0IGZpdHMuXHJcbiAgaXNWYWxpZChzaGlwLCByb3csIGNvbCl7XHJcbiAgICBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgIGlmKGNvbCArIHNoaXAubGVuZ3RoID4gdGhpcy5jb2xzKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIC8vIFwiRXJyb3I6IFNoaXAgZG9lc24ndCBmaXQgaG9yaXpvbnRhbGx5LlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgc2hpcC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYodGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJFcnJvcjogQSBzaGlwIGlzIGFscmVhZHkgcHJlc2VudCBhdCB0aGlzIGxvY2F0aW9uIGhvcml6b250YWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbmRleCArKzsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vUGFzcyBhbGwgdGVzdFxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9IGVsc2UgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgaWYocm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLnJvd3MpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiU2hpcCBkb2Vzbid0IGZpdCB2ZXJ0aWNhbGx5XCI7IC8vU2hpcCBkb2Vzbid0IGZpdC5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKGluZGV4IDwgc2hpcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBpZih0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJBIHNoaXAgaXMgYWxyZWFkeSBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2UgLy9cIkludmFsaWQgZGlyZWN0aW9uXCI7IC8vaW52YWxpZCBuYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4vL1BsYWNlcyB0aGUgc2hpcCBvbiB0aGUgYm9hcmQuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKXtcclxuICAgIGlmKCF0aGlzLmlzVmFsaWQoc2hpcCwgcm93LCBjb2wpKVxyXG4gICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgXHJcbiAgICBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgICAge1xyXG4gICAgICAgIC8vY2hlY2tzIGZvciBvdmVybGFwcyBvciBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2UgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKXsgLy9kaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxyXG4gICAgICAgIC8vaWYgZXZlcnl0aGluZyBwYXNzZXMsIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gXHJcbiAgICBnZXRTaGlwKHNoaXBOYW1lKXtcclxuICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgaWYoc2hpcC5uYW1lID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIFwic2hpcCBub3QgZm91bmRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIC8vUGxhY2VzIGFuIGF0dGFjayBvbiB0aGUgYm9hcmQuXHJcbiAgcmVjZWl2ZUF0dGFjayh4LCB5KXtcclxuICAgIFxyXG4gICAgaWYoeCA+PSB0aGlzLmNvbHMgfHwgeSA+PXRoaXMucm93cyApXHJcbiAgICAgIHJldHVybiBcIm91dCBvZiBib3VuZHNcIjtcclxuICAgIGlmKHRoaXMuZ3JpZFt4XVt5XSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJtaXNzXCI7IC8vbWFyayBkb3duIG1pc3NcclxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcImhpdFwiO1xyXG4gICAgICByZXR1cm4gXCJoaXRcIjtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF4SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG4gIGdldEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAuaGl0cztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcblxyXG4gIGNoZWNrc0RpZmZlcmVuY2UoKXtcclxuICAgIHJldHVybiB0aGlzLmdldE1heEhpdHMoKSAtIHRoaXMuZ2V0SGl0cygpO1xyXG4gIH1cclxuXHJcbiAgLy9DaGVja3MgaWYgdGhlIGdhbWUgaXMgb3Zlci5cclxuICBpc0dhbWVPdmVyKCl7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSk7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVja3NEaWZmZXJlbmNlKCkgPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0FsbFNoaXBzRGVwbG95ZWQoKXtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGlmKCFzaGlwLmRlcGxveSlcclxuICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKXtcclxuICAgIHRoaXMuc2hpcHMubWFwKChzaGlwKSA9PiBzaGlwLmRlcGxveSA9IGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCB7Z2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudH0gZnJvbSAnLi9SYW5kb20nO1xyXG5pbXBvcnQge3Bsb3RTaGlwfSBmcm9tICcuL1Bsb3QnO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBnYW1lYm9hcmQsIG9wcG9uZW50Qm9hcmQsIGlzSHVtYW4pXHJcbiAge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQgPSBnYW1lYm9hcmQ7XHJcbiAgICB0aGlzLm9wcG9uZW50Qm9hcmQgPSBvcHBvbmVudEJvYXJkO1xyXG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcclxuXHJcbiAgfVxyXG4gIC8vUGxhY2VzIHNoaXBzIHJhbmRvbWx5IG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVJhbmRvbVRvQm9hcmQoKXtcclxuICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQodGhpcy5ib2FyZCwgc2hpcCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLm9wcG9uZW50Qm9hcmQuc2hpcHM7XHJcbiAgfVxyXG4vL0EgZnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gdGhlIGJvYXJkIG1hbnVhbGx5LlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbClcclxuICB7XHJcbiAgICBpZiAoIXNoaXAuZGVwbG95ICYmIHRoaXMuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKSl7XHJcbiAgICAgIHBsb3RTaGlwKHRoaXMubmFtZSwgcm93LCBjb2wsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKTtcclxuICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ3JpZDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCJTaGlwIGhhcyBhbHJlYWR5IGJlZW4gZGVwbG95ZWQuICBUcmllZCBhZ2FpblwiXHJcbiAgICB9XHJcblxyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCl7XHJcbiAgICBjb25zdCBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZW5lbXlCb2FyZE5hbWV9LSR7cm93fS0ke2NvbH1gKTtcclxuICAgIGNvbnNvbGUubG9nKGVuZW15Qm9hcmROYW1lKTtcclxuXHJcbiAgICBpZih0aGlzLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCkgPT09IFwiaGl0XCIpXHJcbiAgICB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgcmV0dXJuIGBoaXRgOyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIHJldHVybiBgbWlzc2A7XHJcbiAgICB9O1xyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgcmFuZG9tbHkgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgcmFuZG9tQXR0YWNrKGVuZW15Qm9hcmROYW1lKXtcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXModGhpcy5vcHBvbmVudEJvYXJkKTtcclxuICAgIGNvbnN0IHJvdyA9IGNvb3JkaW5hdGVzWzBdO1xyXG4gICAgY29uc3QgY29sID0gY29vcmRpbmF0ZXNbMV07XHJcbiAgICBjb25zb2xlLmxvZyhcInJhbmRvbSBhdHRhY2sgZXhlY3V0ZWRcIik7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2soZW5lbXlCb2FyZE5hbWUsIHJvdywgY29sKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcclxuIiwiY29uc3QgcGxvdFNoaXBzID0gKGJvYXJkTmFtZSwgZ2FtZWJvYXJkKSA9PntcclxuICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib2FyZE5hbWUudG9Mb3dlckNhc2UoKSkuY2hpbGROb2RlcztcclxuICAgIFxyXG4gICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgICAgICBjb25zdCBjb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICBjb25zdCByb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICBpZihnYW1lYm9hcmQuZ3JpZFtyb3ddW2NvbF0gIT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gZ2V0U3F1YXJlcztcclxufVxyXG5jb25zdCBwbG90U2hpcCA9IChuYW1lLCByb3csIGNvbCwgbGVuZ3RoLCBvcmllbnRhdGlvbikgPT57XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICBjb2w6IGNvbCxcclxuICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cclxuICAgIH0pXHJcblxyXG4gICAgaWYob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3Jvd30tJHtjb2wgKyBpbmRleH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgZSA9Pntjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQpfSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93ICsgaW5kZXh9LSR7Y29sfWApO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlBsb3R0aW5nIGRpZG4ndCB3b3JrLlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHBsb3RNZXNzYWdlID0gKG1lc3NhZ2UpID0+e1xyXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5LXdyYXBwZXIgaDJcIik7XHJcbiAgICBib3gudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG59XHJcblxyXG5jb25zdCByZW1vdmVSZW5kZXIgPSAocGxheWVyKSA9PntcclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIpLmNoaWxkTm9kZXM7XHJcbiAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge3NxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwifSk7XHJcblxyXG59XHJcbmNvbnN0IHJhbmRvbVBsYWNlbWVudCA9IChwbGF5ZXIpID0+eyAgIFxyXG4gICAgaWYoIXBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSl7XHJcbiAgICAgICAgcGxheWVyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgIHBsb3RTaGlwcyhwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLCBwbGF5ZXIuYm9hcmQpOyAgXHJcbiAgICAgICAgcmV0dXJuIHBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKTsgLy9yZXR1cm5zIHRydWVcclxuICAgIH0gZWxzZXtcclxuICAgICAgICBjbGVhckJvYXJkKHBsYXllcik7XHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50KHBsYXllcik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IGNsZWFyQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgIHBsYXllci5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIHBsYXllci5ib2FyZC5jaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpO1xyXG4gICAgcmVtb3ZlUmVuZGVyKHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgcmV0dXJuIHBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKTsgLy9yZXR1cm5zIGZhbHNlXHJcbn1cclxuXHJcbi8vQWRkcyBzaGlwcyBvbiBNZW51XHJcbmNvbnN0IGFkZEFsbENoaWxkTm9kZXMgPSAoKSA9PntcclxuICAgIGNvbnN0IGdldE1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1tZW51XCIpO1xyXG59XHJcbmNvbnN0IHJlbW92ZUFsbENoaWxkTm9kZXMgPSAocGFyZW50KSA9PntcclxuICAgIHdoaWxlKHBhcmVudC5maXJzdENoaWxkKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhwYXJlbnQpO1xyXG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQge3Bsb3RTaGlwcywgcGxvdFNoaXAsIHBsb3RNZXNzYWdlLCByZW1vdmVSZW5kZXIsIHJhbmRvbVBsYWNlbWVudCwgYWRkQWxsQ2hpbGROb2RlcywgcmVtb3ZlQWxsQ2hpbGROb2RlcywgY2xlYXJCb2FyZH0iLCIvL0dlbmVyYXRlcyByYW5kb20gbnVtYmVyIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYW5kIHJvd3MuXHJcbmNvbnN0IGdlbmVyYXRlTnVtYmVyID0gKG1heCkgPT57XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgd2l0aGluIHRoZSBnYW1lIGJvYXJkXHJcbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBjb2wgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQuY29scyk7XHJcbiAgICBsZXQgcm93ID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLnJvd3MpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjb2wsIHJvd107XHJcbn1cclxuXHJcbi8vR2VuZXJhdGUgYSByYW5kb20gcGxhY2VtZW50IG9uIHRoZSBib2FyZC5cclxuY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKGdhbWVib2FyZCwgc2hpcCkgPT57XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInZlcnRpY2FsXCI6IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc2hpcC5vcmllbnRhdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdKSlcclxuICAgIHtcclxuICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWVib2FyZCwgc2hpcCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbi8vUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZFxyXG5jb25zdCBnZXRSYW5kb21Db29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+e1xyXG5cclxuICAgIGxldCByYW5kb21Db29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTsgLy9yZXR1cm5zIGFycmF5XHJcblxyXG4gICAgaWYgKGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwibWlzc1wiICYmIGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwiaGl0XCIgKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gcmFuZG9tQ29vcmRpbmF0ZXM7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHJldHVybiBnZXRSYW5kb21Db29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dldFJhbmRvbUNvb3JkaW5hdGVzLCByYW5kb21QbGFjZW1lbnR9IiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcbmNvbnN0IF9ERUZBVUxUX29yaWVudGF0aW9uICA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBfREVGQVVMVF9vcmllbnRhdGlvbjtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuZGVwbG95ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRPcmllbnRhdGlvbihpdGVtKXtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb247XHJcbiAgfVxyXG5cclxuICBoaXQoKXtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCl7XHJcblxyXG4gICAgaWYoKHRoaXMubGVuZ3RoIC0gdGhpcy5oaXRzKSA9PT0gMClcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBzdW5rYCk7XHJcbiAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBoaXQgJHt0aGlzLmhpdHN9IHRpbWUuYCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGUvc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvdW5kcy9BcHAuanNcIjtcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIEFwcC5sb2FkUGFnZSgpKTsiXSwibmFtZXMiOlsiQm9hcmQiLCJHYW1lIiwibG9hZEJvYXJkIiwidXBkYXRlQm9hcmQiLCJQbGF5ZXIiLCJwbG90TWVzc2FnZSIsInJlbW92ZVJlbmRlciIsInBsb3RTaGlwIiwicGxvdFNoaXBzIiwicmFuZG9tUGxhY2VtZW50IiwicmVtb3ZlQWxsQ2hpbGROb2RlcyIsImFkZEFsbENoaWxkTm9kZXMiLCJjbGVhckJvYXJkIiwiR2FtZVNldHVwIiwibG9hZCIsInNldHVwIiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwiaXNQbGF5ZXJWc0NvbXB1dGVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNoZWNrZWQiLCJpc1BsYXllclZzUGxheWVyIiwiZ2V0UGxheWVyMU5hbWUiLCJ2YWx1ZSIsImdldFBsYXllcjJOYW1lIiwiZ2FtZSIsInJlbW92ZUNoaWxkIiwicXVlcnlTZWxlY3RvciIsInNldHVwR2FtZSIsImNvbnNvbGUiLCJsb2ciLCJhY3RpdmF0ZVNxdWFyZSIsInBsYXllciIsIm5hbWUiLCJnZXRTcXVhcmVzIiwiY2hpbGROb2RlcyIsInBsYWNlU2hpcFRvQm9hcmQiLCJlIiwicm93IiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJjb2wiLCJzaGlwIiwiYm9hcmQiLCJnZXRTaGlwIiwiZ3JpZCIsInBsYWNlU2hpcCIsImZvckVhY2giLCJpdGVtIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBsYXllclR1cm4iLCJwbGF5ZXIxIiwicGxheWVyMiIsImxvYWRTZXR1cFVJIiwicmFuZG9tUGxhY2VtZW50QnRuIiwiY2xlYXJCdG4iLCJkb25lQnRuIiwic2hpcEJ0bnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2hpcEJ0biIsImZpbmlzaGVkU2V0dXBCdG4iLCJpc0h1bWFuIiwicGxheSIsImdldFJvb3QiLCJ3aW5uZXIiLCJhcHBlbmRDaGlsZCIsImdldFJlY2VpdmVyIiwiZ2V0QXR0YWNrZXIiLCJzcXVhcmVzIiwiY3VycmVudFRhcmdldCIsImF0dGFjayIsIm5leHRUdXJuIiwicmFuZG9tQXR0YWNrIiwic2V0VGltZW91dCIsImdldEN1cnJlbnRUdXJuT3Bwb25lbnQiLCJNZW51Iiwicm9vdCIsIlVJIiwibG9hZEhhbmRsZXJzIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImdldFJhZGlvcyIsInN1Ym1pdCIsImRpc2FibGVkIiwiQXBwIiwibG9hZFBhZ2UiLCJhZGRIYW5kbGVyIiwicmVtb3ZlSGFuZGxlciIsImJhbm5lciIsIm1lc3NhZ2UiLCJsb2FkQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsInRvTG93ZXJDYXNlIiwiZ2V0R2FtZWJvYXJkIiwiaSIsInJvd3MiLCJqIiwiY29scyIsInNxdWFyZSIsInBhcnNlZFJvdyIsInBhcnNlZENvbCIsImNsYXNzTGlzdCIsImFkZCIsImxvYWRTdGFydEJ1dHRvbiIsInN0YXJ0QnRuIiwic2hpcE1lbnUiLCJzaGlwcyIsImNyZWF0ZUJ0biIsImlkIiwiaGFuZGxlTG9hZFNoaXBCdG4iLCJoYW5kbGVTcXVhcmVDbGljayIsImNvbnN0cnVjdG9yIiwidHVybiIsInVzZXJJbnRlcmZhY2UiLCJzaGlwTWVudUJvYXJkQ29udGFpbmVyIiwiU2hpcCIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJjbGVhckdyaWQiLCJjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCIsImlzVmFsaWQiLCJvcmllbnRhdGlvbiIsImluZGV4IiwiZGVwbG95Iiwic2hpcE5hbWUiLCJyZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJnZXRNYXhIaXRzIiwic3VtIiwiZ2V0SGl0cyIsImhpdHMiLCJjaGVja3NEaWZmZXJlbmNlIiwiaXNHYW1lT3ZlciIsImlzQWxsU2hpcHNEZXBsb3llZCIsIm1hcCIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwiZ2FtZWJvYXJkIiwib3Bwb25lbnRCb2FyZCIsInBsYWNlUmFuZG9tVG9Cb2FyZCIsImVuZW15Qm9hcmROYW1lIiwicGxvdCIsImNvb3JkaW5hdGVzIiwiYm9hcmROYW1lIiwiY3JlYXRlSWQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYm94IiwiZ2V0TWVudSIsInBhcmVudCIsImZpcnN0Q2hpbGQiLCJnZW5lcmF0ZU51bWJlciIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlQ29vcmRpbmF0ZXMiLCJkaXJlY3Rpb24iLCJyYW5kb21Db29yZGluYXRlcyIsInY0IiwidXVpZHY0IiwiX0RFRkFVTFRfb3JpZW50YXRpb24iLCJzZXRPcmllbnRhdGlvbiIsImhpdCIsImlzU3VuayJdLCJzb3VyY2VSb290IjoiIn0=