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
    getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_3__.plotGame)(game));
    (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_3__.updateBoard)(game.getReceiver());
    if (game.getAttacker().isHuman) {
      //load previous moves if any
      const squares = document.querySelectorAll(".square");
      squares.forEach(item => {
        const col = parseInt(item.getAttribute("col"));
        const row = parseInt(item.getAttribute("row"));

        //Doesn't add eventListener because the square is occupied.
        if (game.getReceiver().board.grid[row][col] !== null) {
          return;
        }
        item.addEventListener("click", e => {
          const row = e.currentTarget.getAttribute("row");
          const col = e.currentTarget.getAttribute("col");
          game.getAttacker().attack(game.getReceiver().name, row, col);
          getRoot.removeChild(document.querySelector(".playerBoard"));
          game.nextTurn();
          this.play(game);
        });
      });
    } else {
      //random attack
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_3__.plotShips)(game.getReceiver().name, game.getReceiver().board);
      game.getAttacker().randomAttack(game.getReceiver().name);
      setTimeout(() => {
        getRoot.removeChild(document.querySelector(".playerBoard"));
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
const root = document.getElementById("root");
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
/* harmony export */   loadBoard: () => (/* binding */ loadBoard),
/* harmony export */   plotBanner: () => (/* binding */ plotBanner),
/* harmony export */   plotGame: () => (/* binding */ plotGame),
/* harmony export */   plotMessage: () => (/* binding */ plotMessage),
/* harmony export */   plotShip: () => (/* binding */ plotShip),
/* harmony export */   plotShips: () => (/* binding */ plotShips),
/* harmony export */   plotTextBox: () => (/* binding */ plotTextBox),
/* harmony export */   randomPlacement: () => (/* binding */ randomPlacement),
/* harmony export */   removeAllChildNodes: () => (/* binding */ removeAllChildNodes),
/* harmony export */   removeRender: () => (/* binding */ removeRender),
/* harmony export */   updateBoard: () => (/* binding */ updateBoard)
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
const plotBanner = message => {
  const container = document.createElement("div");
  const box = document.createElement("div");
  box.innerHTML = `<h2>${message}</h2>`;
  container.appendChild(box);
  return container;
};
const plotTextBox = text => {
  const container = document.createElement("div");
  container.innerHTML = `<p>${text}</p>`;
  return container;
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
const plotGame = game => {
  //game -> returns object of player's board game.receiver();
  const container = document.createElement("div");
  container.className = "playerBoard";
  container.appendChild(plotBanner(`${game.getAttacker().name}`));
  container.appendChild(loadBoard(game.getReceiver()));
  container.appendChild(plotTextBox(`${game.getAttacker().name}'s turn to attack ${game.getReceiver().name}`));
  return container;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7O0VBRUE7O0VBRUE7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBR0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBSUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUdBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUdBO0FBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0VXFEO0FBQ0Y7QUFDeEI7QUFFcEIsTUFBTStFLE1BQU0sR0FBSUMsT0FBTyxJQUFJO0VBQzlCLE1BQU01QyxJQUFJLEdBQUcvQixRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzFDaEMsSUFBSSxDQUFDa0MsU0FBUyxHQUFJLE9BQU1VLE9BQVEsT0FBTTtFQUN0QyxPQUFPNUMsSUFBSTtBQUNmLENBQUM7QUFDTSxNQUFNNkMsV0FBVyxHQUFHOUQsTUFBTSxJQUFJO0VBQ2pDLE1BQU0rRCxPQUFPLEdBQUc3RSxRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQzdDYyxPQUFPLENBQUNiLFNBQVMsR0FBRyxtQkFBbUI7RUFFdkMsTUFBTTNCLGtCQUFrQixHQUFHckMsUUFBUSxDQUFDK0QsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUMzRDFCLGtCQUFrQixDQUFDeUMsWUFBWSxDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQztFQUN6RHpDLGtCQUFrQixDQUFDMEMsV0FBVyxHQUFDLFFBQVE7RUFFdkMsTUFBTXpDLFFBQVEsR0FBR3RDLFFBQVEsQ0FBQytELGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDakR6QixRQUFRLENBQUN5QyxXQUFXLEdBQUcsT0FBTztFQUM5QnpDLFFBQVEsQ0FBQ3dDLFlBQVksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDO0VBRTFDRCxPQUFPLENBQUM3QixXQUFXLENBQUNYLGtCQUFrQixDQUFDO0VBQ3ZDd0MsT0FBTyxDQUFDN0IsV0FBVyxDQUFDVixRQUFRLENBQUM7RUFFN0IsT0FBT3VDLE9BQU87QUFDZCxDQUFDO0FBQ0UsTUFBTXRGLFNBQVMsR0FBSXVCLE1BQU0sSUFBSTtFQUMvQixNQUFNZ0QsU0FBUyxHQUFHOUQsUUFBUSxDQUFDK0QsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQ0QsU0FBUyxDQUFDRSxTQUFTLEdBQUcsV0FBVztFQUNqQ0YsU0FBUyxDQUFDZ0IsWUFBWSxDQUFDLElBQUksRUFBRWhFLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDaUUsV0FBVyxDQUFDLENBQUMsQ0FBQztFQUN4RCxNQUFNQyxZQUFZLEdBQUduRSxNQUFNLENBQUNZLEtBQUs7RUFFN0IsS0FBSyxJQUFJd0QsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRCxZQUFZLENBQUNFLElBQUksRUFBRUQsQ0FBQyxFQUFFLEVBQzFDO0lBQ0ksS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUNILFlBQVksQ0FBQ0ksSUFBSSxFQUFFRCxDQUFDLEVBQUUsRUFDeEM7TUFDSSxNQUFNRSxNQUFNLEdBQUd0RixRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO01BQzVDdUIsTUFBTSxDQUFDdEIsU0FBUyxHQUFHLFFBQVE7TUFFM0JzQixNQUFNLENBQUNSLFlBQVksQ0FBQyxLQUFLLEVBQUVJLENBQUMsQ0FBQztNQUM3QkksTUFBTSxDQUFDUixZQUFZLENBQUMsS0FBSyxFQUFFTSxDQUFDLENBQUM7TUFDN0JFLE1BQU0sQ0FBQ1IsWUFBWSxDQUFDLElBQUksRUFBRyxHQUFFaEUsTUFBTSxDQUFDQyxJQUFJLENBQUNpRSxXQUFXLENBQUMsQ0FBRSxJQUFHRSxDQUFFLElBQUdFLENBQUUsRUFBQyxDQUFDO01BRW5FdEIsU0FBUyxDQUFDZCxXQUFXLENBQUNzQyxNQUFNLENBQUM7SUFDakM7RUFDSjtFQUNBLE9BQU94QixTQUFTO0FBQ3BCLENBQUM7QUFDRSxNQUFNdEUsV0FBVyxHQUFJc0IsTUFBTSxJQUFJO0VBQzlCLE1BQU1FLFVBQVUsR0FBR2hCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDUSxVQUFVO0VBRWxFRCxVQUFVLENBQUNjLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3pCLE1BQU13RCxTQUFTLEdBQUd4RCxJQUFJLENBQUNSLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDMUMsTUFBTWlFLFNBQVMsR0FBR3pELElBQUksQ0FBQ1IsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUMxQyxJQUFHVCxNQUFNLENBQUNZLEtBQUssQ0FBQ0UsSUFBSSxDQUFDMkQsU0FBUyxDQUFDLENBQUNDLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFDcEQ7TUFDSXpELElBQUksQ0FBQzBELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDLE1BQU0sSUFBRzVFLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDRSxJQUFJLENBQUMyRCxTQUFTLENBQUMsQ0FBQ0MsU0FBUyxDQUFDLEtBQUssTUFBTSxFQUM1RDtNQUNJekQsSUFBSSxDQUFDMEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzlCO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNFLE1BQU1DLGVBQWUsR0FBR0EsQ0FBQSxLQUFLO0VBQ2hDLE1BQU1DLFFBQVEsR0FBRzVGLFFBQVEsQ0FBQytELGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDakQ2QixRQUFRLENBQUM1QixTQUFTLEdBQUMsV0FBVztFQUM5QjRCLFFBQVEsQ0FBQ2IsV0FBVyxHQUFHLE1BQU07RUFDN0IsT0FBT2EsUUFBUTtBQUNuQixDQUFDO0FBRU0sTUFBTUMsUUFBUSxHQUFJL0UsTUFBTSxJQUFLO0VBQzVCLE1BQU1nRCxTQUFTLEdBQUc5RCxRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQy9DRCxTQUFTLENBQUNFLFNBQVMsR0FBRyxjQUFjO0VBRXBDbEQsTUFBTSxDQUFDWSxLQUFLLENBQUNvRSxLQUFLLENBQUNoRSxPQUFPLENBQUVMLElBQUksSUFBSztJQUNqQyxNQUFNc0UsU0FBUyxHQUFHL0YsUUFBUSxDQUFDK0QsYUFBYSxDQUFDLFFBQVEsQ0FBQztJQUNsRGdDLFNBQVMsQ0FBQy9CLFNBQVMsR0FBRyxVQUFVO0lBQ2hDK0IsU0FBUyxDQUFDakIsWUFBWSxDQUFDLElBQUksRUFBRXJELElBQUksQ0FBQ3VFLEVBQUUsQ0FBQztJQUNyQ0QsU0FBUyxDQUFDakIsWUFBWSxDQUFDLE9BQU8sRUFBRXJELElBQUksQ0FBQ1YsSUFBSSxDQUFDO0lBQzFDZ0YsU0FBUyxDQUFDaEIsV0FBVyxHQUFHdEQsSUFBSSxDQUFDVixJQUFJOztJQUVqQzs7SUFFQStDLFNBQVMsQ0FBQ2QsV0FBVyxDQUFDK0MsU0FBUyxDQUFDO0VBQ3BDLENBQUMsQ0FBQztFQUNGLE9BQU9qQyxTQUFTO0FBQ3BCLENBQUM7QUFFRSxNQUFNbUMsaUJBQWlCLEdBQUdBLENBQUM5RSxDQUFDLEVBQUVMLE1BQU0sS0FBSTtFQUMzQyxNQUFNVyxJQUFJLEdBQUdYLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDQyxPQUFPLENBQUNSLENBQUMsQ0FBQ2lDLGFBQWEsQ0FBQy9DLEtBQUssQ0FBQztFQUN4RE0sT0FBTyxDQUFDQyxHQUFHLENBQUNhLElBQUksQ0FBQztFQUNqQixNQUFNVCxVQUFVLEdBQUdoQixRQUFRLENBQUNDLGNBQWMsQ0FBQ2EsTUFBTSxDQUFDQyxJQUFJLENBQUNpRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMvRCxVQUFVO0VBRWhGRCxVQUFVLENBQUNjLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3JCQSxJQUFJLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBR2IsQ0FBQyxJQUFLK0UsaUJBQWlCLENBQUMvRSxDQUFDLEVBQUVNLElBQUksRUFBRVgsTUFBTSxDQUFDLENBQUM7RUFDN0UsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUNFLE1BQU1vRixpQkFBaUIsR0FBR0EsQ0FBQy9FLENBQUMsRUFBRU0sSUFBSSxFQUFFWCxNQUFNLEtBQUs7RUFDOUMsTUFBTVUsR0FBRyxHQUFHSCxRQUFRLENBQUNGLENBQUMsQ0FBQ2lDLGFBQWEsQ0FBQzdCLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUN6RCxNQUFNSCxHQUFHLEdBQUdDLFFBQVEsQ0FBQ0YsQ0FBQyxDQUFDaUMsYUFBYSxDQUFDN0IsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBRXpEVCxNQUFNLENBQUNZLEtBQUssQ0FBQ0csU0FBUyxDQUFDSixJQUFJLEVBQUVMLEdBQUcsRUFBRUksR0FBRyxFQUFFLFlBQVksQ0FBQztBQUN4RCxDQUFDO0FBQ0wsTUFBTW1DLElBQUksR0FBRzNELFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLE1BQU0sQ0FBQztBQUU1QyxNQUFNZixJQUFJO0VBQ05pSCxXQUFXQSxDQUFDakUsT0FBTyxFQUFFQyxPQUFPLEVBQzVCO0lBQ0ksSUFBSSxDQUFDRCxPQUFPLEdBQUdBLE9BQU87SUFDdEIsSUFBSSxDQUFDQyxPQUFPLEdBQUdBLE9BQU87SUFDdEIsSUFBSSxDQUFDWSxNQUFNLEdBQUcsSUFBSTtJQUNsQixJQUFJLENBQUNxRCxJQUFJLEdBQUcsQ0FBQztFQUNqQjs7RUFFQTs7RUFFQWxELFdBQVdBLENBQUEsRUFBRTtJQUNULElBQUcsSUFBSSxDQUFDa0QsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDcEI7TUFDQSxPQUFPLElBQUksQ0FBQ2xFLE9BQU87SUFDdkIsQ0FBQyxNQUFLO01BQ0YsT0FBTyxJQUFJLENBQUNDLE9BQU87SUFDdkI7RUFDSjtFQUNBYyxXQUFXQSxDQUFBLEVBQUU7SUFDVCxJQUFHLElBQUksQ0FBQ21ELElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO01BQ3BCO01BQ0EsT0FBTyxJQUFJLENBQUNqRSxPQUFPO0lBQ3ZCLENBQUMsTUFBSztNQUNGLE9BQU8sSUFBSSxDQUFDRCxPQUFPO0lBQ3ZCO0VBQ0o7RUFDQTtFQUNBdUIsc0JBQXNCQSxDQUFBLEVBQUU7SUFDcEIsT0FBTyxJQUFJLENBQUNQLFdBQVcsQ0FBQyxDQUFDLENBQUNuQyxJQUFJLElBQUksSUFBSSxDQUFDbUIsT0FBTyxDQUFDbkIsSUFBSSxHQUFHLFNBQVMsR0FBRyxTQUFTO0VBQy9FO0VBQ0F1QyxRQUFRQSxDQUFBLEVBQUU7SUFDTixJQUFJLENBQUM4QyxJQUFJLEVBQUU7SUFDWCxPQUFPLElBQUksQ0FBQ0EsSUFBSTtFQUNwQjtFQUVBaEUsV0FBV0EsQ0FBQ3RCLE1BQU0sRUFBQztJQUNmLE1BQU11RixhQUFhLEdBQUdyRyxRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ25Ec0MsYUFBYSxDQUFDckMsU0FBUyxHQUFHLFlBQVk7SUFDdEM7SUFDQXFDLGFBQWEsQ0FBQ3JELFdBQVcsQ0FBQzBCLE1BQU0sQ0FBQzVELE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLENBQUM7SUFDOUNzRixhQUFhLENBQUNyRCxXQUFXLENBQUM0QixXQUFXLENBQUM5RCxNQUFNLENBQUMsQ0FBQztJQUM5QyxNQUFNd0Ysc0JBQXNCLEdBQUd0RyxRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQzVEdUMsc0JBQXNCLENBQUN0QyxTQUFTLEdBQUcsaUJBQWlCO0lBQ3BEc0Msc0JBQXNCLENBQUN0RCxXQUFXLENBQUN6RCxTQUFTLENBQUN1QixNQUFNLENBQUMsQ0FBQztJQUNyRHdGLHNCQUFzQixDQUFDdEQsV0FBVyxDQUFDNkMsUUFBUSxDQUFDL0UsTUFBTSxDQUFDLENBQUM7SUFDcER1RixhQUFhLENBQUNyRCxXQUFXLENBQUNzRCxzQkFBc0IsQ0FBQztJQUNqREQsYUFBYSxDQUFDckQsV0FBVyxDQUFDMkMsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUM1Q2hDLElBQUksQ0FBQ1gsV0FBVyxDQUFDcUQsYUFBYSxDQUFDO0VBQ25DO0FBRUo7QUFFQSxpRUFBZW5ILElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Sk87QUFDMUIsTUFBTXNILFNBQVM7RUFDYkwsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSSxDQUFDaEIsSUFBSSxHQUFHLEVBQUU7SUFDZCxJQUFJLENBQUNFLElBQUksR0FBRyxFQUFFO0lBQ2QsSUFBSSxDQUFDekQsSUFBSSxHQUFHNkUsS0FBSyxDQUFDQyxJQUFJLENBQUM7TUFBRUMsTUFBTSxFQUFFLElBQUksQ0FBQ3hCO0lBQUssQ0FBQyxFQUFFLE1BQU1zQixLQUFLLENBQUMsSUFBSSxDQUFDcEIsSUFBSSxDQUFDLENBQUN1QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEYsSUFBSSxDQUFDZCxLQUFLLEdBQUcsQ0FDWCxJQUFJUyw2Q0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsRUFDM0IsSUFBSUEsNkNBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsRUFDL0IsSUFBSUEsNkNBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQ3hCLElBQUlBLDZDQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUN0QixJQUFJQSw2Q0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FDM0I7RUFDSDs7RUFFQTtFQUNBTSxTQUFTQSxDQUFBLEVBQUU7SUFDVCxJQUFJLENBQUNqRixJQUFJLENBQUNFLE9BQU8sQ0FBQ1YsR0FBRyxJQUFJQSxHQUFHLENBQUN3RixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDRSwwQkFBMEIsQ0FBQyxDQUFDO0VBQ25DO0VBQ0E7RUFDQUMsT0FBT0EsQ0FBQ3RGLElBQUksRUFBRUwsR0FBRyxFQUFFSSxHQUFHLEVBQUM7SUFDckIsSUFBR0MsSUFBSSxDQUFDdUYsV0FBVyxLQUFLLFlBQVksRUFBQztNQUNuQyxJQUFHeEYsR0FBRyxHQUFHQyxJQUFJLENBQUNrRixNQUFNLEdBQUcsSUFBSSxDQUFDdEIsSUFBSSxFQUNoQztRQUNFLE9BQU8sS0FBSyxFQUFDO01BQ2YsQ0FBQyxNQUFNO1FBQ0wsSUFBSTRCLEtBQUssR0FBRyxDQUFDO1FBQ2IsT0FBT0EsS0FBSyxHQUFHeEYsSUFBSSxDQUFDa0YsTUFBTSxFQUMxQjtVQUNFLElBQUcsSUFBSSxDQUFDL0UsSUFBSSxDQUFDUixHQUFHLENBQUMsQ0FBQ0ksR0FBRyxHQUFHeUYsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFDO1lBQ3RDLE9BQU8sS0FBSyxFQUFDO1VBQ2Y7VUFDQUEsS0FBSyxFQUFHO1FBQ1Y7UUFDQSxPQUFPLElBQUksQ0FBQyxDQUFDO01BQ2Y7SUFFRixDQUFDLE1BQU0sSUFBR3hGLElBQUksQ0FBQ3VGLFdBQVcsS0FBSyxVQUFVLEVBQUU7TUFDdkMsSUFBRzVGLEdBQUcsR0FBR0ssSUFBSSxDQUFDa0YsTUFBTSxHQUFHLElBQUksQ0FBQ3hCLElBQUksRUFBRTtRQUNoQyxPQUFPLEtBQUssRUFBQztNQUNiLENBQUMsTUFBTTtRQUNMLElBQUk4QixLQUFLLEdBQUcsQ0FBQztRQUNiLE9BQU1BLEtBQUssR0FBR3hGLElBQUksQ0FBQ2tGLE1BQU0sRUFBRTtVQUN6QixJQUFHLElBQUksQ0FBQy9FLElBQUksQ0FBQ1IsR0FBRyxHQUFHNkYsS0FBSyxDQUFDLENBQUN6RixHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFFdkMsT0FBTyxLQUFLLEVBQUM7WUFDZDtVQUNDO1VBQ0Z5RixLQUFLLEVBQUU7UUFDUDtRQUNGLE9BQU8sSUFBSTtNQUVYO0lBQ0YsQ0FBQyxNQUNGO01BQ0wsT0FBTyxLQUFLLEVBQUM7SUFDYjtFQUNGO0VBQ0Y7RUFDRXBGLFNBQVNBLENBQUNKLElBQUksRUFBRUwsR0FBRyxFQUFFSSxHQUFHLEVBQUM7SUFDdkIsSUFBRyxDQUFDLElBQUksQ0FBQ3VGLE9BQU8sQ0FBQ3RGLElBQUksRUFBRUwsR0FBRyxFQUFFSSxHQUFHLENBQUMsRUFDaEMsT0FBT0MsSUFBSSxDQUFDeUYsTUFBTTtJQUVsQixJQUFHekYsSUFBSSxDQUFDdUYsV0FBVyxLQUFLLFlBQVksRUFDbEM7TUFDRTtNQUNBLEtBQUksSUFBSUMsS0FBSyxHQUFHLENBQUMsRUFBRUEsS0FBSyxHQUFHeEYsSUFBSSxDQUFDa0YsTUFBTSxFQUFFTSxLQUFLLEVBQUUsRUFDOUM7UUFDRSxJQUFJLENBQUNyRixJQUFJLENBQUNSLEdBQUcsQ0FBQyxDQUFDSSxHQUFHLEdBQUd5RixLQUFLLENBQUMsR0FBR3hGLElBQUk7TUFDckM7TUFDQUEsSUFBSSxDQUFDeUYsTUFBTSxHQUFHLElBQUk7TUFDbEIsT0FBT3pGLElBQUksQ0FBQ3lGLE1BQU07SUFDcEIsQ0FBQyxNQUFNLElBQUd6RixJQUFJLENBQUN1RixXQUFXLEtBQUssVUFBVSxFQUFDO01BQUU7TUFDMUM7TUFDQSxLQUFJLElBQUlDLEtBQUssR0FBRyxDQUFDLEVBQUVBLEtBQUssR0FBR3hGLElBQUksQ0FBQ2tGLE1BQU0sRUFBRU0sS0FBSyxFQUFFLEVBQUM7UUFDOUMsSUFBSSxDQUFDckYsSUFBSSxDQUFDUixHQUFHLEdBQUc2RixLQUFLLENBQUMsQ0FBQ3pGLEdBQUcsQ0FBQyxHQUFHQyxJQUFJO01BQ3BDO01BQ0FBLElBQUksQ0FBQ3lGLE1BQU0sR0FBRyxJQUFJO01BQ2xCLE9BQU96RixJQUFJLENBQUN5RixNQUFNO0lBQ3BCLENBQUMsTUFBTTtNQUNMLE9BQU96RixJQUFJLENBQUN5RixNQUFNO0lBQ3BCO0VBRUY7RUFDQXZGLE9BQU9BLENBQUN3RixRQUFRLEVBQUM7SUFDZixJQUFJQyxNQUFNO0lBQ1YsSUFBSSxDQUFDdEIsS0FBSyxDQUFDaEUsT0FBTyxDQUFFTCxJQUFJLElBQUs7TUFDM0IsSUFBR0EsSUFBSSxDQUFDVixJQUFJLEtBQUtvRyxRQUFRLEVBQUU7UUFDekJDLE1BQU0sR0FBRzNGLElBQUk7TUFDZixDQUFDLE1BQU07UUFDTCxPQUFPLGdCQUFnQjtNQUN6QjtJQUNGLENBQUMsQ0FBQztJQUNGLE9BQU8yRixNQUFNO0VBQ2Y7RUFDRjtFQUNBQyxhQUFhQSxDQUFDQyxDQUFDLEVBQUVDLENBQUMsRUFBQztJQUVqQixJQUFHRCxDQUFDLElBQUksSUFBSSxDQUFDakMsSUFBSSxJQUFJa0MsQ0FBQyxJQUFHLElBQUksQ0FBQ3BDLElBQUksRUFDaEMsT0FBTyxlQUFlO0lBQ3hCLElBQUcsSUFBSSxDQUFDdkQsSUFBSSxDQUFDMEYsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFDM0I7TUFDRSxJQUFJLENBQUMzRixJQUFJLENBQUMwRixDQUFDLENBQUMsQ0FBQ0MsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7TUFDMUIsT0FBTyxNQUFNO0lBQ2YsQ0FBQyxNQUFLO01BQ0osSUFBSSxDQUFDM0YsSUFBSSxDQUFDMEYsQ0FBQyxDQUFDLENBQUNDLENBQUMsQ0FBQyxHQUFHLEtBQUs7TUFDdkIsT0FBTyxLQUFLO0lBQ2Q7RUFDRjtFQUNBQyxVQUFVQSxDQUFBLEVBQUU7SUFDVixJQUFJQyxHQUFHLEdBQUcsQ0FBQztJQUNYLElBQUksQ0FBQzNCLEtBQUssQ0FBQ2hFLE9BQU8sQ0FBQ0wsSUFBSSxJQUFHO01BQ3hCZ0csR0FBRyxJQUFHaEcsSUFBSSxDQUFDa0YsTUFBTTtJQUNuQixDQUFDLENBQUM7SUFDRixPQUFPYyxHQUFHO0VBQ1o7RUFDQUMsT0FBT0EsQ0FBQSxFQUFFO0lBQ1AsSUFBSUQsR0FBRyxHQUFHLENBQUM7SUFDWCxJQUFJLENBQUMzQixLQUFLLENBQUNoRSxPQUFPLENBQUNMLElBQUksSUFBRztNQUN4QmdHLEdBQUcsSUFBR2hHLElBQUksQ0FBQ2tHLElBQUk7SUFDakIsQ0FBQyxDQUFDO0lBQ0YsT0FBT0YsR0FBRztFQUNaO0VBRUFHLGdCQUFnQkEsQ0FBQSxFQUFFO0lBQ2hCLE9BQU8sSUFBSSxDQUFDSixVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQ0UsT0FBTyxDQUFDLENBQUM7RUFDM0M7O0VBRUE7RUFDQUcsVUFBVUEsQ0FBQSxFQUFFO0lBQ1ZsSCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUNnSCxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDcEMsT0FBTyxJQUFJLENBQUNBLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxHQUFHLEtBQUs7RUFDckQ7RUFFQUUsa0JBQWtCQSxDQUFBLEVBQUU7SUFDbEIsSUFBSVYsTUFBTSxHQUFHLElBQUk7SUFDakIsSUFBSSxDQUFDdEIsS0FBSyxDQUFDaEUsT0FBTyxDQUFFTCxJQUFJLElBQUs7TUFDM0IsSUFBRyxDQUFDQSxJQUFJLENBQUN5RixNQUFNLEVBQ2JFLE1BQU0sR0FBRyxLQUFLO0lBQ2xCLENBQUMsQ0FBQztJQUNGLE9BQU9BLE1BQU07RUFDZjtFQUNBTiwwQkFBMEJBLENBQUEsRUFBRTtJQUMxQixJQUFJLENBQUNoQixLQUFLLENBQUNpQyxHQUFHLENBQUV0RyxJQUFJLElBQUtBLElBQUksQ0FBQ3lGLE1BQU0sR0FBRyxLQUFLLENBQUM7RUFDL0M7QUFFRjtBQUVBLGlFQUFlVixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JKdUM7QUFDL0I7QUFFaEMsTUFBTXJILE1BQU0sQ0FBQztFQUNYZ0gsV0FBV0EsQ0FBQ3BGLElBQUksRUFBRW1ILFNBQVMsRUFBRUMsYUFBYSxFQUFFdkYsT0FBTyxFQUNuRDtJQUNFLElBQUksQ0FBQzdCLElBQUksR0FBR0EsSUFBSTtJQUNoQixJQUFJLENBQUNXLEtBQUssR0FBR3dHLFNBQVM7SUFDdEIsSUFBSSxDQUFDQyxhQUFhLEdBQUdBLGFBQWE7SUFDbEMsSUFBSSxDQUFDdkYsT0FBTyxHQUFHQSxPQUFPO0VBRXhCO0VBQ0E7RUFDQXdGLGtCQUFrQkEsQ0FBQSxFQUFFO0lBQ2xCLElBQUksQ0FBQzFHLEtBQUssQ0FBQ29FLEtBQUssQ0FBQ2hFLE9BQU8sQ0FBRUwsSUFBSSxJQUFLO01BQ2pDckMsd0RBQWUsQ0FBQyxJQUFJLENBQUNzQyxLQUFLLEVBQUVELElBQUksQ0FBQztJQUNuQyxDQUFDLENBQUM7SUFDRixPQUFPLElBQUksQ0FBQzBHLGFBQWEsQ0FBQ3JDLEtBQUs7RUFDakM7RUFDRjtFQUNFakUsU0FBU0EsQ0FBQ0osSUFBSSxFQUFFTCxHQUFHLEVBQUVJLEdBQUcsRUFDeEI7SUFDRSxJQUFJLENBQUNDLElBQUksQ0FBQ3lGLE1BQU0sSUFBSSxJQUFJLENBQUN4RixLQUFLLENBQUNHLFNBQVMsQ0FBQ0osSUFBSSxFQUFFTCxHQUFHLEVBQUVJLEdBQUcsQ0FBQyxFQUFDO01BQ3ZEeUcsK0NBQVEsQ0FBQyxJQUFJLENBQUNsSCxJQUFJLEVBQUVLLEdBQUcsRUFBRUksR0FBRyxFQUFFQyxJQUFJLENBQUNrRixNQUFNLEVBQUVsRixJQUFJLENBQUN1RixXQUFXLENBQUM7TUFDNUQsT0FBTyxJQUFJLENBQUN0RixLQUFLLENBQUNFLElBQUk7SUFFeEIsQ0FBQyxNQUFNO01BQ0wsT0FBTyw4Q0FBOEM7SUFDdkQ7RUFFRjtFQUNGO0VBQ0V5QixNQUFNQSxDQUFDZ0YsY0FBYyxFQUFFakgsR0FBRyxFQUFFSSxHQUFHLEVBQUM7SUFDOUIsTUFBTThHLElBQUksR0FBR3RJLFFBQVEsQ0FBQ0MsY0FBYyxDQUFFLEdBQUVvSSxjQUFlLElBQUdqSCxHQUFJLElBQUdJLEdBQUksRUFBQyxDQUFDO0lBRXZFLElBQUcsSUFBSSxDQUFDMkcsYUFBYSxDQUFDZCxhQUFhLENBQUNqRyxHQUFHLEVBQUVJLEdBQUcsQ0FBQyxLQUFLLEtBQUssRUFDdkQ7TUFDRThHLElBQUksQ0FBQzdDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQztNQUN6QixPQUFRLEtBQUk7SUFDZCxDQUFDLE1BQU07TUFDTDRDLElBQUksQ0FBQzdDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUMxQixPQUFRLE1BQUs7SUFDZjtJQUFDO0VBQ0g7RUFDRjtFQUNFbkMsWUFBWUEsQ0FBQzhFLGNBQWMsRUFBQztJQUMxQixNQUFNRSxXQUFXLEdBQUdQLDZEQUFvQixDQUFDLElBQUksQ0FBQ0csYUFBYSxDQUFDO0lBQzVELE1BQU0vRyxHQUFHLEdBQUdtSCxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzFCLE1BQU0vRyxHQUFHLEdBQUcrRyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzFCNUgsT0FBTyxDQUFDQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7SUFDckMsT0FBTyxJQUFJLENBQUN5QyxNQUFNLENBQUNnRixjQUFjLEVBQUVqSCxHQUFHLEVBQUVJLEdBQUcsQ0FBQztFQUM5QztBQUNGO0FBRUEsaUVBQWVyQyxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RHJCLE1BQU1NLFNBQVMsR0FBR0EsQ0FBQytJLFNBQVMsRUFBRU4sU0FBUyxLQUFJO0VBQ3ZDLE1BQU1sSCxVQUFVLEdBQUdoQixRQUFRLENBQUNDLGNBQWMsQ0FBQ3VJLFNBQVMsQ0FBQ3hELFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQy9ELFVBQVU7RUFFOUVELFVBQVUsQ0FBQ2MsT0FBTyxDQUFFQyxJQUFJLElBQUk7SUFDeEIsTUFBTVAsR0FBRyxHQUFHTyxJQUFJLENBQUNSLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDcEMsTUFBTUgsR0FBRyxHQUFHVyxJQUFJLENBQUNSLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDcEMsSUFBRzJHLFNBQVMsQ0FBQ3RHLElBQUksQ0FBQ1IsR0FBRyxDQUFDLENBQUNJLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFDcEM7TUFDSU8sSUFBSSxDQUFDMEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzlCO0VBQ0osQ0FBQyxDQUFDO0VBQ0YsT0FBTzFFLFVBQVU7QUFDckIsQ0FBQztBQUNELE1BQU1pSCxRQUFRLEdBQUdBLENBQUNsSCxJQUFJLEVBQUVLLEdBQUcsRUFBRUksR0FBRyxFQUFFbUYsTUFBTSxFQUFFSyxXQUFXLEtBQUk7RUFDckRyRyxPQUFPLENBQUNDLEdBQUcsQ0FBQztJQUNSRyxJQUFJLEVBQUVBLElBQUk7SUFDVkssR0FBRyxFQUFFQSxHQUFHO0lBQ1JJLEdBQUcsRUFBRUEsR0FBRztJQUNSd0YsV0FBVyxFQUFFQTtFQUNqQixDQUFDLENBQUM7RUFFRixJQUFHQSxXQUFXLEtBQUssWUFBWSxFQUMvQjtJQUNJLEtBQUksSUFBSUMsS0FBSyxHQUFHLENBQUMsRUFBRUEsS0FBSyxHQUFHTixNQUFNLEVBQUVNLEtBQUssRUFBRSxFQUFDO01BQ3ZDLE1BQU13QixRQUFRLEdBQUd6SSxRQUFRLENBQUNDLGNBQWMsQ0FBRSxHQUFFYyxJQUFJLENBQUNpRSxXQUFXLENBQUMsQ0FBRSxJQUFHNUQsR0FBSSxJQUFHSSxHQUFHLEdBQUd5RixLQUFNLEVBQUMsQ0FBQztNQUN2RndCLFFBQVEsQ0FBQ0MsbUJBQW1CLENBQUUsT0FBTyxFQUFHdkgsQ0FBQyxJQUFHO1FBQUNSLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTyxDQUFDLENBQUNpQyxhQUFhLENBQUM7TUFBQSxDQUFDLENBQUM7TUFDM0VxRixRQUFRLENBQUNoRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDbEM7RUFDSixDQUFDLE1BQU0sSUFBR3NCLFdBQVcsS0FBSyxVQUFVLEVBQUU7SUFDbEMsS0FBSSxJQUFJQyxLQUFLLEdBQUcsQ0FBQyxFQUFFQSxLQUFLLEdBQUdOLE1BQU0sRUFBRU0sS0FBSyxFQUFFLEVBQUM7TUFDdkMsTUFBTXdCLFFBQVEsR0FBR3pJLFFBQVEsQ0FBQ0MsY0FBYyxDQUFFLEdBQUVjLElBQUksQ0FBQ2lFLFdBQVcsQ0FBQyxDQUFFLElBQUc1RCxHQUFHLEdBQUc2RixLQUFNLElBQUd6RixHQUFJLEVBQUMsQ0FBQztNQUN2RmlILFFBQVEsQ0FBQ2hELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUNsQztFQUNKLENBQUMsTUFBTTtJQUNILE9BQU8sdUJBQXVCO0VBQ2xDO0FBQ0osQ0FBQztBQUVELE1BQU1qQixXQUFXLEdBQUlFLE9BQU8sSUFBSTtFQUM1QixNQUFNZ0UsR0FBRyxHQUFHM0ksUUFBUSxDQUFDUyxhQUFhLENBQUMscUJBQXFCLENBQUM7RUFDekRrSSxHQUFHLENBQUM1RCxXQUFXLEdBQUdKLE9BQU87QUFDN0IsQ0FBQztBQUVELE1BQU1pRSxZQUFZLEdBQUk5SCxNQUFNLElBQUk7RUFDNUIsTUFBTXFDLE9BQU8sR0FBR25ELFFBQVEsQ0FBQ0MsY0FBYyxDQUFDYSxNQUFNLENBQUMsQ0FBQ0csVUFBVTtFQUMxRGtDLE9BQU8sQ0FBQ3JCLE9BQU8sQ0FBRXdELE1BQU0sSUFBSztJQUFDQSxNQUFNLENBQUN0QixTQUFTLEdBQUcsUUFBUTtFQUFBLENBQUMsQ0FBQztBQUU5RCxDQUFDO0FBQ0QsTUFBTTVFLGVBQWUsR0FBSTBCLE1BQU0sSUFBSTtFQUMvQixJQUFHLENBQUNBLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDb0csa0JBQWtCLENBQUMsQ0FBQyxFQUFDO0lBQ2xDaEgsTUFBTSxDQUFDc0gsa0JBQWtCLENBQUMsQ0FBQztJQUMzQjNJLFNBQVMsQ0FBQ3FCLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDaUUsV0FBVyxDQUFDLENBQUMsRUFBRWxFLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDO0lBQ2xELE9BQU9aLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDb0csa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUMsQ0FBQyxNQUFLO0lBQ0Z4SSxVQUFVLENBQUN3QixNQUFNLENBQUM7SUFDbEIxQixlQUFlLENBQUMwQixNQUFNLENBQUM7RUFDM0I7QUFDSixDQUFDO0FBRUQsTUFBTXhCLFVBQVUsR0FBSXdCLE1BQU0sSUFBSTtFQUMxQkEsTUFBTSxDQUFDWSxLQUFLLENBQUNtRixTQUFTLENBQUMsQ0FBQztFQUN4Qi9GLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDb0YsMEJBQTBCLENBQUMsQ0FBQztFQUN6QzhCLFlBQVksQ0FBQzlILE1BQU0sQ0FBQ0MsSUFBSSxDQUFDaUUsV0FBVyxDQUFDLENBQUMsQ0FBQztFQUN2QyxPQUFPbEUsTUFBTSxDQUFDWSxLQUFLLENBQUNvRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDOztBQUVEO0FBQ0EsTUFBTWUsZ0JBQWdCLEdBQUdBLENBQUEsS0FBSztFQUMxQixNQUFNQyxPQUFPLEdBQUc5SSxRQUFRLENBQUNTLGFBQWEsQ0FBQyxjQUFjLENBQUM7QUFDMUQsQ0FBQztBQUNELE1BQU1zSSxtQkFBbUIsR0FBSUMsTUFBTSxJQUFJO0VBQ25DLE9BQU1BLE1BQU0sQ0FBQ0MsVUFBVSxFQUFDO0lBQ3BCdEksT0FBTyxDQUFDQyxHQUFHLENBQUNvSSxNQUFNLENBQUM7SUFDbkJBLE1BQU0sQ0FBQ3hJLFdBQVcsQ0FBQ3dJLE1BQU0sQ0FBQ0MsVUFBVSxDQUFDO0VBQ3pDO0FBQ0osQ0FBQztBQUNELE1BQU1DLFVBQVUsR0FBSXZFLE9BQU8sSUFBSTtFQUUzQixNQUFNYixTQUFTLEdBQUc5RCxRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQy9DLE1BQU00RSxHQUFHLEdBQUczSSxRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ3pDNEUsR0FBRyxDQUFDMUUsU0FBUyxHQUFJLE9BQU1VLE9BQVEsT0FBTTtFQUNyQ2IsU0FBUyxDQUFDZCxXQUFXLENBQUMyRixHQUFHLENBQUM7RUFDMUIsT0FBTzdFLFNBQVM7QUFDcEIsQ0FBQztBQUNELE1BQU1xRixXQUFXLEdBQUlDLElBQUksSUFBSTtFQUN6QixNQUFNdEYsU0FBUyxHQUFHOUQsUUFBUSxDQUFDK0QsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQ0QsU0FBUyxDQUFDRyxTQUFTLEdBQUksTUFBS21GLElBQUssTUFBSztFQUN0QyxPQUFPdEYsU0FBUztBQUNwQixDQUFDO0FBQ0QsTUFBTXZFLFNBQVMsR0FBSXVCLE1BQU0sSUFBSTtFQUN6QixNQUFNZ0QsU0FBUyxHQUFHOUQsUUFBUSxDQUFDK0QsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQ0QsU0FBUyxDQUFDRSxTQUFTLEdBQUcsV0FBVztFQUNqQ0YsU0FBUyxDQUFDZ0IsWUFBWSxDQUFDLElBQUksRUFBRWhFLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDaUUsV0FBVyxDQUFDLENBQUMsQ0FBQztFQUN4RCxNQUFNQyxZQUFZLEdBQUduRSxNQUFNLENBQUNZLEtBQUs7RUFFN0IsS0FBSyxJQUFJd0QsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRCxZQUFZLENBQUNFLElBQUksRUFBRUQsQ0FBQyxFQUFFLEVBQzFDO0lBQ0ksS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUNILFlBQVksQ0FBQ0ksSUFBSSxFQUFFRCxDQUFDLEVBQUUsRUFDeEM7TUFDSSxNQUFNRSxNQUFNLEdBQUd0RixRQUFRLENBQUMrRCxhQUFhLENBQUMsS0FBSyxDQUFDO01BQzVDdUIsTUFBTSxDQUFDdEIsU0FBUyxHQUFHLFFBQVE7TUFFM0JzQixNQUFNLENBQUNSLFlBQVksQ0FBQyxLQUFLLEVBQUVJLENBQUMsQ0FBQztNQUM3QkksTUFBTSxDQUFDUixZQUFZLENBQUMsS0FBSyxFQUFFTSxDQUFDLENBQUM7TUFDN0JFLE1BQU0sQ0FBQ1IsWUFBWSxDQUFDLElBQUksRUFBRyxHQUFFaEUsTUFBTSxDQUFDQyxJQUFJLENBQUNpRSxXQUFXLENBQUMsQ0FBRSxJQUFHRSxDQUFFLElBQUdFLENBQUUsRUFBQyxDQUFDO01BRW5FdEIsU0FBUyxDQUFDZCxXQUFXLENBQUNzQyxNQUFNLENBQUM7SUFDakM7RUFDSjtFQUNBLE9BQU94QixTQUFTO0FBQ3BCLENBQUM7QUFDSixNQUFNdEUsV0FBVyxHQUFJc0IsTUFBTSxJQUFJO0VBQ3hCLE1BQU1FLFVBQVUsR0FBR2hCLFFBQVEsQ0FBQ1MsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDUSxVQUFVO0VBRWxFRCxVQUFVLENBQUNjLE9BQU8sQ0FBRUMsSUFBSSxJQUFLO0lBQ3pCLE1BQU13RCxTQUFTLEdBQUd4RCxJQUFJLENBQUNSLFlBQVksQ0FBQyxLQUFLLENBQUM7SUFDMUMsTUFBTWlFLFNBQVMsR0FBR3pELElBQUksQ0FBQ1IsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUMxQyxJQUFHVCxNQUFNLENBQUNZLEtBQUssQ0FBQ0UsSUFBSSxDQUFDMkQsU0FBUyxDQUFDLENBQUNDLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFDcEQ7TUFDSXpELElBQUksQ0FBQzBELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQztJQUM3QixDQUFDLE1BQU0sSUFBRzVFLE1BQU0sQ0FBQ1ksS0FBSyxDQUFDRSxJQUFJLENBQUMyRCxTQUFTLENBQUMsQ0FBQ0MsU0FBUyxDQUFDLEtBQUssTUFBTSxFQUM1RDtNQUNJekQsSUFBSSxDQUFDMEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzlCO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVKLE1BQU1yRyxRQUFRLEdBQUlrQixJQUFJLElBQUk7RUFDdEI7RUFDQSxNQUFNdUQsU0FBUyxHQUFHOUQsUUFBUSxDQUFDK0QsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQ0QsU0FBUyxDQUFDRSxTQUFTLEdBQUcsYUFBYTtFQUNuQ0YsU0FBUyxDQUFDZCxXQUFXLENBQUNrRyxVQUFVLENBQUUsR0FBRTNJLElBQUksQ0FBQzJDLFdBQVcsQ0FBQyxDQUFDLENBQUNuQyxJQUFLLEVBQUMsQ0FBQyxDQUFDO0VBQy9EK0MsU0FBUyxDQUFDZCxXQUFXLENBQUN6RCxTQUFTLENBQUNnQixJQUFJLENBQUMwQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcERhLFNBQVMsQ0FBQ2QsV0FBVyxDQUFDbUcsV0FBVyxDQUFFLEdBQUU1SSxJQUFJLENBQUMyQyxXQUFXLENBQUMsQ0FBQyxDQUFDbkMsSUFBSyxxQkFBb0JSLElBQUksQ0FBQzBDLFdBQVcsQ0FBQyxDQUFDLENBQUNsQyxJQUFLLEVBQUMsQ0FBQyxDQUFDO0VBRWhILE9BQU8rQyxTQUFTO0FBRWhCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeklEO0FBQ0EsTUFBTXVGLGNBQWMsR0FBSUMsR0FBRyxJQUFJO0VBQzNCLE9BQU9DLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUdILEdBQUcsQ0FBQztBQUMxQyxDQUFDOztBQUVEO0FBQ0EsTUFBTUksbUJBQW1CLEdBQUl4QixTQUFTLElBQUk7RUFDdEMsSUFBSTFHLEdBQUcsR0FBRzZILGNBQWMsQ0FBQ25CLFNBQVMsQ0FBQzdDLElBQUksQ0FBQztFQUN4QyxJQUFJakUsR0FBRyxHQUFHaUksY0FBYyxDQUFDbkIsU0FBUyxDQUFDL0MsSUFBSSxDQUFDO0VBRXhDLE9BQU8sQ0FBQzNELEdBQUcsRUFBRUosR0FBRyxDQUFDO0FBQ3JCLENBQUM7O0FBRUQ7QUFDQSxNQUFNaEMsZUFBZSxHQUFHQSxDQUFDOEksU0FBUyxFQUFFekcsSUFBSSxLQUFJO0VBQ3hDLE1BQU04RyxXQUFXLEdBQUdtQixtQkFBbUIsQ0FBQ3hCLFNBQVMsQ0FBQztFQUNsRCxNQUFNeUIsU0FBUyxHQUFHSixJQUFJLENBQUNFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRSxZQUFZO0VBQ2hFaEksSUFBSSxDQUFDdUYsV0FBVyxHQUFHMkMsU0FBUztFQUU1QixJQUFJekIsU0FBUyxDQUFDbkIsT0FBTyxDQUFDdEYsSUFBSSxFQUFFOEcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFQSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDM0Q7SUFDRUwsU0FBUyxDQUFDckcsU0FBUyxDQUFDSixJQUFJLEVBQUU4RyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUVBLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzRCxDQUFDLE1BQU07SUFDTG5KLGVBQWUsQ0FBQzhJLFNBQVMsRUFBRXpHLElBQUksQ0FBQztFQUNsQztBQUNGLENBQUM7O0FBRUg7QUFDQSxNQUFNdUcsb0JBQW9CLEdBQUlFLFNBQVMsSUFBSTtFQUV2QyxJQUFJMEIsaUJBQWlCLEdBQUdGLG1CQUFtQixDQUFDeEIsU0FBUyxDQUFDLENBQUMsQ0FBQzs7RUFFeEQsSUFBSUEsU0FBUyxDQUFDdEcsSUFBSSxDQUFDZ0ksaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLElBQUkxQixTQUFTLENBQUN0RyxJQUFJLENBQUNnSSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDako7SUFDRSxPQUFPQSxpQkFBaUI7RUFDMUIsQ0FBQyxNQUFLO0lBQ0osT0FBTzVCLG9CQUFvQixDQUFDRSxTQUFTLENBQUM7RUFDeEM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDZ0M7QUFDakMsTUFBTTZCLG9CQUFvQixHQUFJLFlBQVk7QUFFMUMsTUFBTXhELElBQUk7RUFDUkosV0FBV0EsQ0FBQ3BGLElBQUksRUFBRTRGLE1BQU0sRUFBQztJQUN2QixJQUFJLENBQUNYLEVBQUUsR0FBRzhELGdEQUFNLENBQUMsQ0FBQztJQUNsQixJQUFJLENBQUMvSSxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDaUcsV0FBVyxHQUFHK0Msb0JBQW9CO0lBQ3ZDLElBQUksQ0FBQ3BELE1BQU0sR0FBR0EsTUFBTTtJQUNwQixJQUFJLENBQUNnQixJQUFJLEdBQUcsQ0FBQztJQUNiLElBQUksQ0FBQ1QsTUFBTSxHQUFHLEtBQUs7RUFDckI7RUFFQThDLGNBQWNBLENBQUNqSSxJQUFJLEVBQUM7SUFDbEIsSUFBSSxDQUFDaUYsV0FBVyxHQUFHakYsSUFBSTtJQUN2QixPQUFPLElBQUksQ0FBQ2lGLFdBQVc7RUFDekI7RUFFQWlELEdBQUdBLENBQUEsRUFBRTtJQUNILElBQUksQ0FBQ3RDLElBQUksRUFBRTtFQUNiO0VBRUF1QyxNQUFNQSxDQUFBLEVBQUU7SUFFTixJQUFJLElBQUksQ0FBQ3ZELE1BQU0sR0FBRyxJQUFJLENBQUNnQixJQUFJLEtBQU0sQ0FBQyxFQUNsQztNQUNFaEgsT0FBTyxDQUFDQyxHQUFHLENBQUUsR0FBRSxJQUFJLENBQUNHLElBQUssZ0JBQWUsQ0FBQztNQUN6QyxPQUFPLElBQUk7SUFDYixDQUFDLE1BQU07TUFDTEosT0FBTyxDQUFDQyxHQUFHLENBQUUsR0FBRSxJQUFJLENBQUNHLElBQUssaUJBQWdCLElBQUksQ0FBQzRHLElBQUssUUFBTyxDQUFDO01BQzNELE9BQU8sS0FBSztJQUNkO0VBQ0Y7QUFDRjtBQUVBLGlFQUFlcEIsSUFBSTs7Ozs7Ozs7Ozs7O0FDbkNuQjs7Ozs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBLGlFQUFlO0FBQ2Y7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNIRCxpRUFBZSxjQUFjLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEdBQUcseUNBQXlDOzs7Ozs7Ozs7Ozs7Ozs7QUNBcEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQnFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLHdEQUFRO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDUztBQUNOO0FBQ3NCOztBQUVqRDtBQUNBLE1BQU0sa0RBQU07QUFDWixXQUFXLGtEQUFNO0FBQ2pCOztBQUVBO0FBQ0EsaURBQWlELCtDQUFHLEtBQUs7O0FBRXpEO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTLDhEQUFlO0FBQ3hCOztBQUVBLGlFQUFlLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QmM7O0FBRS9CO0FBQ0EscUNBQXFDLGlEQUFLO0FBQzFDOztBQUVBLGlFQUFlLFFBQVE7Ozs7OztVQ052QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNONEI7QUFDUztBQUVyQ3ZFLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFcUMseURBQUcsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHMvLi9zcmMvU2VjdGlvbi9HYW1lU2V0dXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvU2VjdGlvbi9NZW51LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9BcHAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxheWVyLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbG90LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvZ2FtZS5zY3NzPzY4NDgiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvbWVudS5zY3NzPzY3YzAiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvYXJkIGZyb20gXCIuLi9jb21wb3VuZHMvR2FtZWJvYXJkXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9jb21wb3VuZHMvR2FtZVwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9jb21wb3VuZHMvUGxheWVyXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgcmFuZG9tUGxhY2VtZW50LCBcclxuICAgIHBsb3RHYW1lLFxyXG4gICAgY2xlYXJCb2FyZCxcclxuICAgIGxvYWRCb2FyZCxcclxuICAgIHVwZGF0ZUJvYXJkLFxyXG4gICAgcGxvdFNoaXBzXHJcbiAgICB9IGZyb20gJy4uL2NvbXBvdW5kcy9QbG90J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNldHVwe1xyXG4gICAgc3RhdGljIGxvYWQoKXtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgc2V0dXAoKXtcclxuICAgICAgICBjb25zdCBwbGF5ZXIxQm9hcmQgPSBuZXcgQm9hcmQoKTtcclxuICAgICAgICBjb25zdCBwbGF5ZXIyQm9hcmQgPSBuZXcgQm9hcmQoKVxyXG5cclxuICAgICAgICBjb25zdCBpc1BsYXllclZzQ29tcHV0ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZzQ29tcHV0ZXJcIikuY2hlY2tlZDtcclxuICAgICAgICBjb25zdCBpc1BsYXllclZzUGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2c1BsYXllclwiKS5jaGVja2VkO1xyXG5cclxuICAgICAgIGlmKGlzUGxheWVyVnNQbGF5ZXIgfHwgaXNQbGF5ZXJWc0NvbXB1dGVyKVxyXG4gICAgICAge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRQbGF5ZXIxTmFtZSA9IG5ldyBQbGF5ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIxTmFtZVwiKS52YWx1ZSwgcGxheWVyMUJvYXJkLCBwbGF5ZXIyQm9hcmQsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBnZXRQbGF5ZXIyTmFtZSA9IGlzUGxheWVyVnNDb21wdXRlciA/IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLCBwbGF5ZXIyQm9hcmQsIHBsYXllcjFCb2FyZCwgZmFsc2UpIDogXHJcbiAgICAgICAgICAgICAgICBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikudmFsdWUsIHBsYXllcjJCb2FyZCwgcGxheWVyMUJvYXJkLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKGdldFBsYXllcjFOYW1lLCBnZXRQbGF5ZXIyTmFtZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYm94XCIpKTtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cEdhbWUoZ2FtZSwgXCJwbGF5ZXIgMVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdhbWU7XHJcblxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgc3RhdGljIGFjdGl2YXRlU3F1YXJlID0gKHBsYXllciwgbmFtZSkgPT57XHJcbiAgICAgICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKS5jaGlsZE5vZGVzO1xyXG4gXHJcbiAgICAgICAgIGNvbnN0IHBsYWNlU2hpcFRvQm9hcmQgPSAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTsgLy9yZXR1cm5zIHJvd1xyXG4gICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTsgLy9yZXR1cm5zIGNvbHVtblxyXG4gICAgICAgICAgICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKG5hbWUpOyAvL3JldHVybnMgc2hpcFxyXG4gICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwLCBwYXJzZUludChyb3cpLCBwYXJzZUludChjb2wpKSk7XHJcbiBcclxuICAgICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5ncmlkW3Jvd11bY29sXSA9PT0gbnVsbClcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAvL3BsYWNlIHRoZSBzaGlwXHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuIHBsYXllci5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wpO1xyXG4gXHJcbiAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgIC8vc2VsZWN0cyB0aGUgc2hpcFxyXG4gICAgICAgICAgICAgICAgIHJldHVybihcIlRoZXJlIGlzIGEgc2hpcCBsb2NhdGVkIHRoZXJlLiAgUGxhY2UgYW5vdGhlciBzcXVhcmUuXCIpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT57XHJcblxyXG4gICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBwbGFjZVNoaXBUb0JvYXJkKTtcclxuICAgICAgICAgfSlcclxuICAgICB9XHJcbiBcclxuICAgICBzdGF0aWMgc2V0dXBHYW1lID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gICAgICAgICBjb25zdCBwbGF5ZXIgPSBwbGF5ZXJUdXJuID09PSBcInBsYXllciAxXCIgPyBnYW1lLnBsYXllcjEgOiBnYW1lLnBsYXllcjI7XHJcbiAgICAgICAgIGdhbWUubG9hZFNldHVwVUkocGxheWVyKTtcclxuICAgICAgICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb20tcGxhY2VtZW50XCIpO1xyXG4gICAgICAgICBjb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYm9hcmRcIik7XHJcbiAgICAgICAgIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWJ0blwiKTtcclxuICAgICAgICAgY29uc3Qgc2hpcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXAtYnRuXCIpO1xyXG4gICAgICAgICBzaGlwQnRucy5mb3JFYWNoKChzaGlwQnRuID0+IHNoaXBCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gdGhpcy5hY3RpdmF0ZVNxdWFyZShwbGF5ZXIsIHNoaXBCdG4udmFsdWUpKSkpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHJhbmRvbVBsYWNlbWVudChwbGF5ZXIpKTtcclxuICAgICAgICAgY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gY2xlYXJCb2FyZChwbGF5ZXIpKTtcclxuICAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB0aGlzLmZpbmlzaGVkU2V0dXBCdG4oZ2FtZSwgcGxheWVyVHVybikpO1xyXG4gICAgICAgICByZXR1cm4gcGxheWVyO1xyXG4gICAgIH1cclxuIFxyXG4gICAgIHN0YXRpYyBmaW5pc2hlZFNldHVwQnRuID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZXR1cC1tZW51XCIpKTtcclxuICAgICAgICAgZ2FtZS5wbGF5ZXIyLmlzSHVtYW4gJiYgcGxheWVyVHVybiA9PT0gXCJwbGF5ZXIgMVwiID8gdGhpcy5zZXR1cEdhbWUoZ2FtZSwgXCJwbGF5ZXIgMlwiKSA6IHRoaXMucGxheShnYW1lKTtcclxuICAgICB9XHJcblxyXG4gICAgIHN0YXRpYyBwbGF5ID0oZ2FtZSkgPT57XHJcbiAgICAgICAgY29uc3QgZ2V0Um9vdCA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcbiAgICAgICAgaWYoZ2FtZS53aW5uZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUud2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdhbWUud2lubmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1dob2V2ZXIgaXMgdGhlIGF0dGFja2VyXHJcbiAgICAgICAgZ2V0Um9vdC5hcHBlbmRDaGlsZChwbG90R2FtZShnYW1lKSk7XHJcbiAgICAgICAgdXBkYXRlQm9hcmQoZ2FtZS5nZXRSZWNlaXZlcigpKTtcclxuICAgICAgICBpZihnYW1lLmdldEF0dGFja2VyKCkuaXNIdW1hbilcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vbG9hZCBwcmV2aW91cyBtb3ZlcyBpZiBhbnlcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRG9lc24ndCBhZGQgZXZlbnRMaXN0ZW5lciBiZWNhdXNlIHRoZSBzcXVhcmUgaXMgb2NjdXBpZWQuXHJcbiAgICAgICAgICAgICAgICBpZihnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gIT09IG51bGwpeyBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIGUgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuZ2V0QXR0YWNrZXIoKS5hdHRhY2soZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUsIHJvdywgY29sKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSb290LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUubmV4dFR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9yYW5kb20gYXR0YWNrXHJcbiAgICAgICAgICAgIHBsb3RTaGlwcyhnYW1lLmdldFJlY2VpdmVyKCkubmFtZSwgZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkKTtcclxuICAgICAgICAgICAgZ2FtZS5nZXRBdHRhY2tlcigpLnJhbmRvbUF0dGFjayhnYW1lLmdldFJlY2VpdmVyKCkubmFtZSlcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgIGdldFJvb3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLm5leHRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGdhbWUuZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpO1xyXG5cclxuICAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCAnLi4vc3R5bGUvbWVudS5zY3NzJ1xyXG5pbXBvcnQgR2FtZVNldHVwIGZyb20gXCIuL0dhbWVTZXR1cFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudXtcclxuICAgIHN0YXRpYyBsb2FkKCl7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMuVUkoKSk7XHJcbiAgICAgICAgdGhpcy5sb2FkSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBVSSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVudS1ib3hcIjtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGgxIGNsYXNzPVwidGV4dC1jZW50ZXJlZFwiPldlbGNvbWUgdG8gQmF0dGxlc2hpcDwvaDE+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJnYW1lRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwbGF5ZXIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5QbGF5ZXIgMTo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGxheWVyMU5hbWVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIGlkPVwicGxheWVyMklucHV0XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwbGF5ZXIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5QbGF5ZXIgMjo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGxheWVyMk5hbWVcIiBkaXNhYmxlZC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJnYW1lTW9kZVwiIGNsYXNzPVwiZ2FtZU1vZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQgPVwidnNDb21wdXRlclwiIG5hbWU9XCJnYW1lTW9kZVwiIHZhbHVlPVwiY29tcHV0ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidnNDb21wdXRlclwiPlBsYXllciB2cyBDb21wdXRlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwidnNQbGF5ZXJcIiBuYW1lPVwiZ2FtZU1vZGVcIiB2YWx1ZT1cInBsYXllclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ2c1BsYXllclwiPlBsYXllciB2cyBQbGF5ZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym1pdC1idG5cIiB0eXBlPVwic3VibWl0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICBcclxuICAgICAgICBgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkSGFuZGxlcnMoKXtcclxuICAgICAgICBjb25zdCBnZXRSYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVNb2RlIGlucHV0XCIpO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0LWJ0blwiKTtcclxuXHJcbiAgICAgICAgZ2V0UmFkaW9zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNoYW5nZVwiKSwgKCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBcInZzUGxheWVyXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyTmFtZVwiKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IEdhbWVTZXR1cC5sb2FkKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgTWVudSBmcm9tICcuLi9TZWN0aW9uL01lbnUnO1xyXG4vLyBpbXBvcnQgQm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnO1xyXG4vLyBpbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcclxuLy8gaW1wb3J0IEdhbWUgZnJvbSAnLi9HYW1lJztcclxuLy8gaW1wb3J0IHtwbG90TWVzc2FnZSxcclxuLy8gICAgICByZW1vdmVSZW5kZXIsIFxyXG4vLyAgICAgIHBsb3RTaGlwLFxyXG4vLyAgICAgIHBsb3RTaGlwcywgXHJcbi8vICAgICAgcmFuZG9tUGxhY2VtZW50LCBcclxuLy8gICAgICByZW1vdmVBbGxDaGlsZE5vZGVzLFxyXG4vLyAgICAgIGFkZEFsbENoaWxkTm9kZXMsIFxyXG4vLyAgICAgIGNsZWFyQm9hcmR9IGZyb20gJy4vUGxvdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIE1lbnUubG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkQnV0dG9ucygpe1xyXG4gICAgLy8gICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiXHJcblxyXG4gICAgLy8gICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gYFxyXG4gICAgLy8gICAgICAgICA8YnV0dG9uIGlkPVwic3RhcnQtYmF0dGxlc2hpcFwiIHR5cGU9XCJidXR0b25cIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAvLyAgICAgICAgIDxidXR0b24gaWQ9XCJyYW5kb20tcGxhY2VtZW50XCIgdHlwZT1cImJ1dHRvblwiPlJhbmRvbSBQbGFjZW1lbnQ8L2J1dHRvbj5cclxuICAgIC8vICAgICAgICAgPGJ1dHRvbiBpZD0gXCJjbGVhci1ib2FyZFwiIHR5cGU9XCJidXR0b25cIj5DbGVhcjwvYnV0dG9uPlxyXG4gICAgLy8gICAgICAgICA8YnV0dG9uIGlkPVwicmVzZXQtYmF0dGxlc2hpcFwiIGNsYXNzPVwiaGlkZGVuXCIgdHlwZT1cImJ1dHRvblwiPlJlc2V0PC9idXR0b24+XHJcbiAgICAvLyAgICAgYFxyXG4gICAgLy8gICAgIHJldHVybiBidXR0b25zO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkQm9hcmRzKCl7XHJcbiAgICAvLyAgICAgY29uc3QgYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBib2FyZHMuY2xhc3NOYW1lID0gXCJib2FyZHMtY29udGFpbmVyXCI7XHJcbiAgICAvLyAgICAgYm9hcmRzLmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkKHBsYXllcjEsIFwibXlCb2FyZFwiKSk7XHJcbiAgICAvLyAgICAgYm9hcmRzLmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkKHBsYXllcjIsIFwib3Bwb25lbnRCb2FyZFwiKSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBib2FyZHM7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRET00oKXtcclxuICAgIC8vICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250ZW50LmNsYXNzTmFtZSA9IFwiZ2FtZS1jb250YWluZXJcIjtcclxuXHJcbiAgICAvLyAgICAgY29uc3QgaGFuZGxlQnRuc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgaGFuZGxlQnRuc0NvbnRhaW5lci5jbGFzc05hbWUgPSBcInBsYXllci1tZW51XCI7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgaGFuZGxlQnRuc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxvYWRTaGlwcyhwbGF5ZXIxKSk7XHJcbiAgICAvLyAgICAgaGFuZGxlQnRuc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmxvYWRPcmllbnRhdGlvbkJ0bnMoKSk7XHJcbiAgICAvLyAgICAgY29udGVudC5hcHBlbmRDaGlsZChoYW5kbGVCdG5zQ29udGFpbmVyKTtcclxuXHJcbiAgICAvLyAgICAgY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRCb2FyZHMoKSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkTWVzc2FnZUxvZygpe1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctY29udGFpbmVyXCI7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgYm94LmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctYm94XCI7XHJcbiAgICAvLyAgICAgYm94LmlubmVySFRNTCA9IGA8cCBpZD1cIm1lc3NhZ2UtbG9nXCI+VGVzdDwvcD5gO1xyXG5cclxuICAgIC8vICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIC8vIH1cclxuICAgIC8vIHN0YXRpYyBzZW5kTWVzc2FnZShtZXNzYWdlKXtcclxuICAgIC8vICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXktd3JhcHBlciBoMlwiKTtcclxuICAgIC8vICAgICBib3gudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkQm9hcmQocGxheWVyLCBpZCl7XHJcbiAgICAgICAgXHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMubG9hZEdyaWQocGxheWVyLCBpZCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikge1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgLy8gICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHBsYXllci5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZU9yaWVudGF0aW9uID0gKHNoaXApID0+e1xyXG4gICAgLy8gICAgIGNvbnN0IG9yaWVudGF0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JpZW50YXRpb24tYnRuc1wiKTtcclxuICAgIC8vICAgICBvcmllbnRhdGlvbkJ0bnMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAvLyAgICAgICAgIGlmKGl0ZW0udmFsdWUgIT09IHNoaXAub3JpZW50YXRpb24pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoZSkgPT4gdGhpcy5oYW5kbGVPcmllbnRhdGlvbkJ0bihlLCBzaGlwKSk7XHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBoYW5kbGVMb2FkU2hpcEJ0biA9IChlLCBwbGF5ZXIpID0+e1xyXG4gICAgLy8gICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xyXG4gICAgLy8gICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Qm9hcmRcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAvLyAgICAgdGhpcy5oYW5kbGVPcmllbnRhdGlvbihzaGlwKTtcclxuIFxyXG4gICAgLy8gICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgLy8gICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gdGhpcy5oYW5kbGVTcXVhcmVDbGljayhlLCBzaGlwLCBwbGF5ZXIpKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlT3JpZW50YXRpb25CdG4gPSAoZSwgc2hpcCkgPT57XHJcbiAgICAvLyAgICAgLy8gc2hpcC5zZXRPcmllbnRhdGlvbiA9IGUuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgIC8vICAgICBzaGlwLm9yaWVudGF0aW9uID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHNoaXApO1xyXG4gICAgLy8gICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcblxyXG5cclxuICAgIC8vICAgICBjb25zdCBvcmllbnRhdGlvbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9yaWVudGF0aW9uLWJ0bnNcIik7XHJcbiAgICAvLyAgICAgb3JpZW50YXRpb25CdG5zLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgLy8gICAgICAgICBpZihpdGVtLnZhbHVlICE9PSBzaGlwLm9yaWVudGF0aW9uKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKGUpID0+IHRoaXMuaGFuZGxlT3JpZW50YXRpb24oZSwgc2hpcCkpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRPcmllbnRhdGlvbkJ0bnMgPSAoKSA9PntcclxuICAgIC8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm9yaWVudGF0aW9uLWNvbnRhaW5lclwiO1xyXG5cclxuICAgIC8vICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgLy8gICAgIDxidXR0b24gY2xhc3M9XCJvcmllbnRhdGlvbi1idG5zXCIgaWQ9XCJob3Jpem9udGFsLWJ0blwiIHZhbHVlPVwiaG9yaXpvbnRhbFwiPmhvcml6b250YWw8L2J1dHRvbj5cclxuICAgIC8vICAgICA8YnV0dG9uIGNsYXNzPVwib3JpZW50YXRpb24tYnRuc1wiIGlkPVwidmVydGljYWwtYnRuXCIgdmFsdWU9XCJ2ZXJ0aWNhbFwiPnZlcnRpY2FsPC9idXR0b24+XHJcbiAgICAvLyAgICAgYDtcclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBsb2FkU2hpcHMocGxheWVyKSB7XHJcbiAgICAvLyAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJzaGlwLWJ1dHRvbnNcIjtcclxuICAgXHJcbiAgICAvLyAgICAgcGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc3QgY3JlYXRlU2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgICAgICBjcmVhdGVTaGlwcy5jbGFzc05hbWUgPSBcInNoaXAtYnRuLWNvbnRhaW5lclwiO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNyZWF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi5jbGFzc05hbWUgPSBcInNoaXAtYnRuXCI7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzaGlwLmlkKTtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNoaXAubmFtZSk7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgIFxyXG4gICAgLy8gICAgICAgICBjcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLmhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgIC8vICAgICAgICAgY3JlYXRlU2hpcHMuYXBwZW5kQ2hpbGQoY3JlYXRlQnRuKTtcclxuICAgIC8vICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVNoaXBzKTtcclxuICAgICAgIFxyXG4gICAgLy8gICAgIH0pO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgXHJcbiAgICAvLyB9XHJcbiAgICAvLyBzdGF0aWMgbG9hZEdyaWQocGxheWVyLCBpZCl7XHJcbiAgICAvLyAgICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gcGxheWVyLmJvYXJkO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCk7XHJcblxyXG4gICAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0R2FtZWJvYXJkLnJvd3M7IGkrKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGZvciAobGV0IGogPSAwOyBqPGdldEdhbWVib2FyZC5jb2xzOyBqKyspXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwicm93XCIsIGkpO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgIC8vICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpfS0ke2l9LSR7an1gKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBwbG90U2hpcHMoZ2FtZWJvYXJkKXtcclxuICAgIC8vICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIxXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgLy8gICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgLy8gICAgICAgICBjb25zdCByb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgIC8vICAgICAgICAgaWYoZ2FtZWJvYXJkLmdyaWRbcm93XVtjb2xdICE9PSBudWxsKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH1cclxuXHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZXIoKXtcclxuICAgIC8vICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYmF0dGxlc2hpcFwiKTtcclxuICAgIC8vICAgICBjb25zdCByYW5kb21QbGFjZW1lbnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICAvLyAgICAgY29uc3QgY2xlYXJCb2FyZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYm9hcmRcIilcclxuICAgIC8vICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXQtYmF0dGxlc2hpcFwiKTtcclxuICAgIC8vICAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lLWNvbnRhaW5lclwiKTtcclxuICAgIC8vICAgICBjb25zdCBnZXRTaGlwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1idXR0b25zXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHBsYXllck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllci1tZW51XCIpO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBtb3ZlID0gKGUpID0+e1xyXG4gICAgLy8gICAgICAgICBjb25zdCBzcXVhcmUgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGNvbCA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJvdyA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgaWYocGxheWVyMS5hdHRhY2socGxheWVyMi5uYW1lLCByb3csIGNvbCkgPT09IFwiaGl0XCIpe1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIC8vICBjaGVja3MgaWYgZ2FtZSBvdmVyXHJcbiAgICAvLyAgICAgICAgICAgICBpZihwbGF5ZXIxLm9wcG9uZW50Qm9hcmQuaXNHYW1lT3ZlcigpKVxyXG4gICAgLy8gICAgICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGFsZXJ0KFwiR2FtZSBvdmVyXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgIC8vICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjayhwbGF5ZXIxLm5hbWUpKSk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSBcclxuICAgIC8vICAgICAgICAgeyAgICBcclxuICAgIC8vICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZSgocGxheWVyMi5yYW5kb21BdHRhY2socGxheWVyMS5uYW1lKSkpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBtb3ZlKTtcclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IHN0YXJ0ID0gKCkgPT57XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHBsYXllck1vdmVzID0gKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG9wcG9uZW50Qm9hcmRgKS5jaGlsZE5vZGVzO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcGxheSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBjb25zdCByZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaGFuZGxlcnMgd2VyZSByZW1vdmVkIHN1Y2Nlc3NmdWxseS5cIilcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGdldENoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYG9wcG9uZW50Qm9hcmRgKS5jaGlsZE5vZGVzO1xyXG4gICAgLy8gICAgICAgICAgICAgZ2V0Q2hpbGRyZW4uZm9yRWFjaCgoc3F1YXJlKSA9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcGxheSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgICBjb25zdCBwbGF5ID0gKGUpID0+e1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCByb3cgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgY29sID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGJhdHRsZVNoaXBHYW1lLmdldEF0dGFja2VyKCkgIT09IFwiY29tcHV0ZXJcIiA/IGJhdHRsZVNoaXBHYW1lLmdldEF0dGFja2VyKCkuYXR0YWNrKGJhdHRsZVNoaXBHYW1lLmdldFJlY2VpdmVyKCkubmFtZSwgcm93LCBjb2wpIDogYmF0dGxlU2hpcEdhbWUuZ2V0QXR0YWNrZXIoKS5yYW5kb21BdHRhY2soYmF0dGxlU2hpcEdhbWUuZ2V0UmVjZWl2ZXIoKSk7XHJcbiAgICAvLyAgICAgICAgICAgICBpZihyZXN1bHQgPT09IFwiaGl0XCIpXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJoaXRcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLy9jaGVja3MgZm9yIHN0YXR1c1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyKCk7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdhbWUubmV4dFR1cm4oKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS50dXJuKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcGxheWVyTW92ZXMoKTtcclxuICAgIC8vICAgICAgICAgICAgIH07XHJcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS5pc0dhbWVPdmVyKTtcclxuICAgIC8vICAgICAgICAgICAgIC8vIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgICBcclxuICAgIC8vICAgICAgICAgcGxvdE1lc3NhZ2UoXCJQbGF5ZXIgMSBnb2VzIGZpcnN0XCIpXHJcbiAgICAvLyAgICAgICAgIGNvbnN0IGJhdHRsZVNoaXBHYW1lID0gbmV3IEdhbWUocGxheWVyMSwgcGxheWVyMiwgZmFsc2UpO1xyXG4gICAgLy8gICAgICAgICBiYXR0bGVTaGlwR2FtZS5wbGF5ZXIyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYoIWJhdHRsZVNoaXBHYW1lLmlzR2FtZU92ZXIgJiZcclxuICAgIC8vICAgICAgICAgICAgIGJhdHRsZVNoaXBHYW1lLnBsYXllcjEuYm9hcmQuaXNBbGxTaGlwc0RlcGxveWVkKCkgJiYgYmF0dGxlU2hpcEdhbWUucGxheWVyMi5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSlcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgLy9BZGQgaGFuZGxlciB0byBlYWNoIHNxdWFyZVxyXG4gICAgLy8gICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgLy8gICAgICAgICAgICAgc3RhcnRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHJlbW92ZUFsbENoaWxkTm9kZXMocGxheWVyTWVudSk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgLy9HYW1lIHN0YXJ0cyBoZXJlXHJcbiAgICAvLyAgICAgICAgICAgICBwbGF5ZXJNb3ZlcygpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coYmF0dGxlU2hpcEdhbWUudHVybik7XHJcblxyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coZmFsc2UpO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgY29uc3QgcmVzZXQgPSAoKSA9PntcclxuICAgIC8vICAgICAgICAgcGxheWVyMS5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIC8vICAgICAgICAgcGxheWVyMi5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy51cGRhdGVHYW1lQm9hcmQoXCJteUJvYXJkXCIpO1xyXG4gICAgLy8gICAgICAgICAvLyByZW1vdmVSZW5kZXIoXCJteUJvYXJkXCIpO1xyXG4gICAgLy8gICAgICAgICAvLyByZW1vdmVSZW5kZXIoXCJvcHBvbmVudEJvYWFyZFwiKTtcclxuXHJcblxyXG5cclxuICAgIC8vICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgLy8gICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICBnZXRTaGlwQnRucy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICByYW5kb21QbGFjZW1lbnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgIC8vICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG5cclxuICAgIC8vICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShcIlByZXNzIFN0YXJ0LlwiKVxyXG5cclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAvLyAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHJhbmRvbVBsYWNlbWVudChwbGF5ZXIxKSk7XHJcbiAgICAvLyAgICAgY2xlYXJCb2FyZEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiBjbGVhckJvYXJkKHBsYXllcjEpKVxyXG4gICAgLy8gICAgIHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHJlc2V0KTtcclxuXHJcbiAgIFxyXG4gICAgLy8gfVxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHthZGRIYW5kbGVyLCByZW1vdmVIYW5kbGVyfSBmcm9tICcuL0Z1bmN0aW9ucydcclxuaW1wb3J0IHtwbG90TWVzc2FnZSwgcmFuZG9tUGxhY2VtZW50fSBmcm9tICcuL1Bsb3QnXHJcbmltcG9ydCBcIi4uL3N0eWxlL2dhbWUuc2Nzc1wiXHJcblxyXG5leHBvcnQgY29uc3QgYmFubmVyID0gKG1lc3NhZ2UpID0+e1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGl0ZW0uaW5uZXJIVE1MID0gYDxoMT4ke21lc3NhZ2V9PC9oMT5gO1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn1cclxuZXhwb3J0IGNvbnN0IGxvYWRCdXR0b25zID0ocGxheWVyKSA9PntcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYnV0dG9ucy5jbGFzc05hbWUgPSBcImJ1dHRvbnMtY29udGFpbmVyXCI7XHJcblxyXG4gICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICByYW5kb21QbGFjZW1lbnRCdG4udGV4dENvbnRlbnQ9XCJyYW5kb21cIjtcclxuXHJcbiAgICBjb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjbGVhckJ0bi50ZXh0Q29udGVudCA9IFwiY2xlYXJcIjtcclxuICAgIGNsZWFyQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2xlYXItYm9hcmRcIik7XHJcblxyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChyYW5kb21QbGFjZW1lbnRCdG4pO1xyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChjbGVhckJ0bik7XHJcblxyXG4gICAgcmV0dXJuIGJ1dHRvbnM7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCBsb2FkQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRHYW1lYm9hcmQucm93czsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiY29sXCIsIGopO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCB1cGRhdGVCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkUm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZENvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtwYXJzZWRSb3ddW3BhcnNlZENvbF0gPT09IFwiaGl0XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJtaXNzXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCBsb2FkU3RhcnRCdXR0b24gPSAoKSA9PntcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHN0YXJ0QnRuLmNsYXNzTmFtZT1cInN0YXJ0LWJ0blwiO1xyXG4gICAgc3RhcnRCdG4udGV4dENvbnRlbnQgPSBcIkRvbmVcIjtcclxuICAgIHJldHVybiBzdGFydEJ0bjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXBNZW51ID0gKHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwic2hpcC1idXR0b25zXCI7XHJcbiAgIFxyXG4gICAgICAgIHBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5jbGFzc05hbWUgPSBcInNoaXAtYnRuXCI7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzaGlwLmlkKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNoaXAubmFtZSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoYW5kbGVMb2FkU2hpcEJ0bihlLCBwbGF5ZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVCdG4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlTG9hZFNoaXBCdG4gPSAoZSwgcGxheWVyKSA9PntcclxuICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSkuY2hpbGROb2RlcztcclxuIFxyXG4gICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoYW5kbGVTcXVhcmVDbGljayhlLCBzaGlwLCBwbGF5ZXIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGhhbmRsZVNxdWFyZUNsaWNrID0gKGUsIHNoaXAsIHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG5cclxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIik7XHJcbiAgICB9XHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG5jbGFzcyBHYW1le1xyXG4gICAgY29uc3RydWN0b3IocGxheWVyMSwgcGxheWVyMilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xyXG4gICAgICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudHVybiA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy90dXJuIGJhc2UgcGxheWluZyBnYW1lXHJcblxyXG4gICAgZ2V0QXR0YWNrZXIoKXtcclxuICAgICAgICBpZih0aGlzLnR1cm4gJSAyICE9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vaWYgaXQncyBwbGF5ZXIxIHR1cm4sIHJldHVybnMgcGxheWVyMiBuYW1lLlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRSZWNlaXZlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjI7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vcmV0dXJucyBwbGF5ZXIxIGFuZCBwbGF5ZXIyIGFzIHN0cmluZ3NcclxuICAgIGdldEN1cnJlbnRUdXJuT3Bwb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2tlcigpLm5hbWUgPT0gdGhpcy5wbGF5ZXIxLm5hbWUgPyBcInBsYXllcjJcIiA6IFwicGxheWVyMVwiO1xyXG4gICAgfVxyXG4gICAgbmV4dFR1cm4oKXtcclxuICAgICAgICB0aGlzLnR1cm4rKztcclxuICAgICAgICByZXR1cm4gdGhpcy50dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWRTZXR1cFVJKHBsYXllcil7XHJcbiAgICAgICAgY29uc3QgdXNlckludGVyZmFjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5jbGFzc05hbWUgPSBcInNldHVwLW1lbnVcIjtcclxuICAgICAgICAvL0xvYWQgU2V0IHBpZWNlcyBieSBwbGF5ZXJzXHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChiYW5uZXIocGxheWVyLm5hbWUpKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGxvYWRCdXR0b25zKHBsYXllcikpO1xyXG4gICAgICAgIGNvbnN0IHNoaXBNZW51Qm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuY2xhc3NOYW1lID0gXCJib2FyZC1jb250YWluZXJcIjtcclxuICAgICAgICBzaGlwTWVudUJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKGxvYWRCb2FyZChwbGF5ZXIpKTtcclxuICAgICAgICBzaGlwTWVudUJvYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNoaXBNZW51KHBsYXllcikpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQoc2hpcE1lbnVCb2FyZENvbnRhaW5lcik7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChsb2FkU3RhcnRCdXR0b24oKSk7XHJcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh1c2VySW50ZXJmYWNlKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcclxuY2xhc3MgR2FtZWJvYXJke1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3dzID0gMTA7IFxyXG4gICAgdGhpcy5jb2xzID0gMTA7XHJcbiAgICB0aGlzLmdyaWQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLnJvd3MgfSwgKCkgPT4gQXJyYXkodGhpcy5jb2xzKS5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuc2hpcHMgPSBbXHJcbiAgICAgIG5ldyBTaGlwKFwiQXNzYXVsdCBTaGlwXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIkFpcmNyYWZ0IENhcnJpZXJcIiwgNSksXHJcbiAgICAgIG5ldyBTaGlwKFwiRGVzdHJveWVyXCIsIDcpLFxyXG4gICAgICBuZXcgU2hpcChcIkNydWlzZXJcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQ29tYmF0IFNoaXBcIiwgMSkgICBcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICAvL0NsZWFycyB0aGUgYm9hcmQuXHJcbiAgY2xlYXJHcmlkKCl7XHJcbiAgICB0aGlzLmdyaWQuZm9yRWFjaChyb3cgPT4gcm93LmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5jaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpO1xyXG4gIH1cclxuICAvL0NoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHNoaXBzIG9uIHRoZSBib2FyZCBhbmQgaWYgaXQgZml0cy5cclxuICBpc1ZhbGlkKHNoaXAsIHJvdywgY29sKXtcclxuICAgIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgaWYoY29sICsgc2hpcC5sZW5ndGggPiB0aGlzLmNvbHMpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgLy8gXCJFcnJvcjogU2hpcCBkb2Vzbid0IGZpdCBob3Jpem9udGFsbHkuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPCBzaGlwLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZih0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gIT09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkVycm9yOiBBIHNoaXAgaXMgYWxyZWFkeSBwcmVzZW50IGF0IHRoaXMgbG9jYXRpb24gaG9yaXpvbnRhbGx5LlwiOyAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGluZGV4ICsrOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTsgLy9QYXNzIGFsbCB0ZXN0XHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0gZWxzZSBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICBpZihyb3cgKyBzaGlwLmxlbmd0aCA+IHRoaXMucm93cykge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJTaGlwIGRvZXNuJ3QgZml0IHZlcnRpY2FsbHlcIjsgLy9TaGlwIGRvZXNuJ3QgZml0LlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUoaW5kZXggPCBzaGlwLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkEgc2hpcCBpcyBhbHJlYWR5IGF0IHRoaXMgbG9jYXRpb24gdmVydGljYWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgIC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZSAvL1wiSW52YWxpZCBkaXJlY3Rpb25cIjsgLy9pbnZhbGlkIG5hbWVcclxuICAgIH1cclxuICB9XHJcbi8vUGxhY2VzIHRoZSBzaGlwIG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wpe1xyXG4gICAgaWYoIXRoaXMuaXNWYWxpZChzaGlwLCByb3csIGNvbCkpXHJcbiAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICBcclxuICAgIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAgICB7XHJcbiAgICAgICAgLy9jaGVja3MgZm9yIG92ZXJsYXBzIG9yIG91dCBvZiBib3VuZHNcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKylcclxuICAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH0gZWxzZSBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpeyAvL2RpcmVjdGlvbiBpcyBob3Jpem9udGFsXHJcbiAgICAgICAgLy9pZiBldmVyeXRoaW5nIHBhc3NlcywgcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgIHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBcclxuICAgIGdldFNoaXAoc2hpcE5hbWUpe1xyXG4gICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICBpZihzaGlwLm5hbWUgPT09IHNoaXBOYW1lKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSBzaGlwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gXCJzaGlwIG5vdCBmb3VuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgLy9QbGFjZXMgYW4gYXR0YWNrIG9uIHRoZSBib2FyZC5cclxuICByZWNlaXZlQXR0YWNrKHgsIHkpe1xyXG4gICAgXHJcbiAgICBpZih4ID49IHRoaXMuY29scyB8fCB5ID49dGhpcy5yb3dzIClcclxuICAgICAgcmV0dXJuIFwib3V0IG9mIGJvdW5kc1wiO1xyXG4gICAgaWYodGhpcy5ncmlkW3hdW3ldID09PSBudWxsKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcIm1pc3NcIjsgLy9tYXJrIGRvd24gbWlzc1xyXG4gICAgICByZXR1cm4gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwiaGl0XCI7XHJcbiAgICAgIHJldHVybiBcImhpdFwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNYXhIaXRzKCl7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+e1xyXG4gICAgICBzdW0rPSBzaGlwLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcbiAgZ2V0SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5oaXRzO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tzRGlmZmVyZW5jZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TWF4SGl0cygpIC0gdGhpcy5nZXRIaXRzKCk7XHJcbiAgfVxyXG5cclxuICAvL0NoZWNrcyBpZiB0aGUgZ2FtZSBpcyBvdmVyLlxyXG4gIGlzR2FtZU92ZXIoKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY2hlY2tzRGlmZmVyZW5jZSgpKTtcclxuICAgIHJldHVybiB0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlzQWxsU2hpcHNEZXBsb3llZCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYoIXNoaXAuZGVwbG95KVxyXG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpe1xyXG4gICAgdGhpcy5zaGlwcy5tYXAoKHNoaXApID0+IHNoaXAuZGVwbG95ID0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IHtnZXRSYW5kb21Db29yZGluYXRlcywgcmFuZG9tUGxhY2VtZW50fSBmcm9tICcuL1JhbmRvbSc7XHJcbmltcG9ydCB7cGxvdFNoaXB9IGZyb20gJy4vUGxvdCc7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGdhbWVib2FyZCwgb3Bwb25lbnRCb2FyZCwgaXNIdW1hbilcclxuICB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZCA9IGdhbWVib2FyZDtcclxuICAgIHRoaXMub3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50Qm9hcmQ7XHJcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xyXG5cclxuICB9XHJcbiAgLy9QbGFjZXMgc2hpcHMgcmFuZG9tbHkgb24gdGhlIGJvYXJkLlxyXG4gIHBsYWNlUmFuZG9tVG9Cb2FyZCgpe1xyXG4gICAgdGhpcy5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIHJhbmRvbVBsYWNlbWVudCh0aGlzLmJvYXJkLCBzaGlwKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMub3Bwb25lbnRCb2FyZC5zaGlwcztcclxuICB9XHJcbi8vQSBmdW5jdGlvbiB0aGF0IHBsYWNlcyBzaGlwcyBvbiB0aGUgYm9hcmQgbWFudWFsbHkuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKVxyXG4gIHtcclxuICAgIGlmICghc2hpcC5kZXBsb3kgJiYgdGhpcy5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wpKXtcclxuICAgICAgcGxvdFNoaXAodGhpcy5uYW1lLCByb3csIGNvbCwgc2hpcC5sZW5ndGgsIHNoaXAub3JpZW50YXRpb24pO1xyXG4gICAgICByZXR1cm4gdGhpcy5ib2FyZC5ncmlkO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIlNoaXAgaGFzIGFscmVhZHkgYmVlbiBkZXBsb3llZC4gIFRyaWVkIGFnYWluXCJcclxuICAgIH1cclxuXHJcbiAgfVxyXG4vL1BsYXllciBjaG9vc2VzIHRvIGF0dGFjayBvbiB0aGUgb3Bwb25lbnQncyBib2FyZC5cclxuICBhdHRhY2soZW5lbXlCb2FyZE5hbWUsIHJvdywgY29sKXtcclxuICAgIGNvbnN0IHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlbmVteUJvYXJkTmFtZX0tJHtyb3d9LSR7Y29sfWApO1xyXG5cclxuICAgIGlmKHRoaXMub3Bwb25lbnRCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sKSA9PT0gXCJoaXRcIilcclxuICAgIHtcclxuICAgICAgcGxvdC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICByZXR1cm4gYGhpdGA7IFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGxvdC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgcmV0dXJuIGBtaXNzYDtcclxuICAgIH07XHJcbiAgfVxyXG4vL1BsYXllciBjaG9vc2VzIHRvIGF0dGFjayByYW5kb21seSBvbiB0aGUgb3Bwb25lbnQncyBib2FyZC5cclxuICByYW5kb21BdHRhY2soZW5lbXlCb2FyZE5hbWUpe1xyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZXRSYW5kb21Db29yZGluYXRlcyh0aGlzLm9wcG9uZW50Qm9hcmQpO1xyXG4gICAgY29uc3Qgcm93ID0gY29vcmRpbmF0ZXNbMF07XHJcbiAgICBjb25zdCBjb2wgPSBjb29yZGluYXRlc1sxXTtcclxuICAgIGNvbnNvbGUubG9nKFwicmFuZG9tIGF0dGFjayBleGVjdXRlZFwiKTtcclxuICAgIHJldHVybiB0aGlzLmF0dGFjayhlbmVteUJvYXJkTmFtZSwgcm93LCBjb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJjb25zdCBwbG90U2hpcHMgPSAoYm9hcmROYW1lLCBnYW1lYm9hcmQpID0+e1xyXG4gICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvYXJkTmFtZS50b0xvd2VyQ2FzZSgpKS5jaGlsZE5vZGVzO1xyXG4gICAgXHJcbiAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgIGlmKGdhbWVib2FyZC5ncmlkW3Jvd11bY29sXSAhPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBnZXRTcXVhcmVzO1xyXG59XHJcbmNvbnN0IHBsb3RTaGlwID0gKG5hbWUsIHJvdywgY29sLCBsZW5ndGgsIG9yaWVudGF0aW9uKSA9PntcclxuICAgIGNvbnNvbGUubG9nKHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIHJvdzogcm93LFxyXG4gICAgICAgIGNvbDogY29sLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvblxyXG4gICAgfSlcclxuXHJcbiAgICBpZihvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93fS0ke2NvbCArIGluZGV4fWApO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBlID0+e2NvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldCl9KTtcclxuICAgICAgICAgICAgY3JlYXRlSWQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke25hbWUudG9Mb3dlckNhc2UoKX0tJHtyb3cgKyBpbmRleH0tJHtjb2x9YCk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiUGxvdHRpbmcgZGlkbid0IHdvcmsuXCJcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgcGxvdE1lc3NhZ2UgPSAobWVzc2FnZSkgPT57XHJcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXktd3JhcHBlciBoMlwiKTtcclxuICAgIGJveC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbn1cclxuXHJcbmNvbnN0IHJlbW92ZVJlbmRlciA9IChwbGF5ZXIpID0+e1xyXG4gICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuY2hpbGROb2RlcztcclxuICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7c3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCJ9KTtcclxuXHJcbn1cclxuY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKHBsYXllcikgPT57ICAgXHJcbiAgICBpZighcGxheWVyLmJvYXJkLmlzQWxsU2hpcHNEZXBsb3llZCgpKXtcclxuICAgICAgICBwbGF5ZXIucGxhY2VSYW5kb21Ub0JvYXJkKCk7XHJcbiAgICAgICAgcGxvdFNoaXBzKHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCksIHBsYXllci5ib2FyZCk7ICBcclxuICAgICAgICByZXR1cm4gcGxheWVyLmJvYXJkLmlzQWxsU2hpcHNEZXBsb3llZCgpOyAvL3JldHVybnMgdHJ1ZVxyXG4gICAgfSBlbHNle1xyXG4gICAgICAgIGNsZWFyQm9hcmQocGxheWVyKTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnQocGxheWVyKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgY2xlYXJCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgcGxheWVyLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgcGxheWVyLmJvYXJkLmNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCk7XHJcbiAgICByZW1vdmVSZW5kZXIocGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gcGxheWVyLmJvYXJkLmlzQWxsU2hpcHNEZXBsb3llZCgpOyAvL3JldHVybnMgZmFsc2VcclxufVxyXG5cclxuLy9BZGRzIHNoaXBzIG9uIE1lbnVcclxuY29uc3QgYWRkQWxsQ2hpbGROb2RlcyA9ICgpID0+e1xyXG4gICAgY29uc3QgZ2V0TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW1lbnVcIik7XHJcbn1cclxuY29uc3QgcmVtb3ZlQWxsQ2hpbGROb2RlcyA9IChwYXJlbnQpID0+e1xyXG4gICAgd2hpbGUocGFyZW50LmZpcnN0Q2hpbGQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmVudCk7XHJcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcclxuICAgIH1cclxufVxyXG5jb25zdCBwbG90QmFubmVyID0gKG1lc3NhZ2UpID0+e1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYm94LmlubmVySFRNTCA9IGA8aDI+JHttZXNzYWdlfTwvaDI+YFxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveCk7XHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcbmNvbnN0IHBsb3RUZXh0Qm94ID0gKHRleHQpID0+e1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgPHA+JHt0ZXh0fTwvcD5gO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5jb25zdCBsb2FkQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJnYW1lYm9hcmRcIjtcclxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gcGxheWVyLmJvYXJkO1xyXG5cclxuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0R2FtZWJvYXJkLnJvd3M7IGkrKylcclxuICAgICAgIHtcclxuICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwicm93XCIsIGkpO1xyXG4gICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiY29sXCIsIGopO1xyXG4gICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKX0tJHtpfS0ke2p9YCk7XHJcblxyXG4gICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICB9XHJcbmNvbnN0IHVwZGF0ZUJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICBjb25zdCBwYXJzZWRSb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICBjb25zdCBwYXJzZWRDb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtwYXJzZWRSb3ddW3BhcnNlZENvbF0gPT09IFwiaGl0XCIpXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgICAgfSBlbHNlIGlmKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJtaXNzXCIpXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICAgICAgIH0gXHJcbiAgICAgICB9KTtcclxuICAgfVxyXG5cclxuY29uc3QgcGxvdEdhbWUgPSAoZ2FtZSkgPT57XHJcbiAgICAvL2dhbWUgLT4gcmV0dXJucyBvYmplY3Qgb2YgcGxheWVyJ3MgYm9hcmQgZ2FtZS5yZWNlaXZlcigpO1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInBsYXllckJvYXJkXCI7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxvdEJhbm5lcihgJHtnYW1lLmdldEF0dGFja2VyKCkubmFtZX1gKSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKGdhbWUuZ2V0UmVjZWl2ZXIoKSkpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsb3RUZXh0Qm94KGAke2dhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lfSdzIHR1cm4gdG8gYXR0YWNrICR7Z2FtZS5nZXRSZWNlaXZlcigpLm5hbWV9YCkpO1xyXG5cclxucmV0dXJuIGNvbnRhaW5lcjtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBwbG90U2hpcHMsIFxyXG4gICAgcGxvdFNoaXAsIFxyXG4gICAgcGxvdE1lc3NhZ2UsIFxyXG4gICAgcmVtb3ZlUmVuZGVyLFxyXG4gICAgcmFuZG9tUGxhY2VtZW50LCBcclxuICAgIGFkZEFsbENoaWxkTm9kZXMsIFxyXG4gICAgcmVtb3ZlQWxsQ2hpbGROb2RlcywgXHJcbiAgICBjbGVhckJvYXJkLFxyXG4gICAgcGxvdEdhbWUsXHJcbiAgICBwbG90VGV4dEJveCxcclxuICAgIHBsb3RCYW5uZXIsXHJcbiAgICB1cGRhdGVCb2FyZCxcclxuICAgIGxvYWRCb2FyZFxyXG59XHJcbiIsIi8vR2VuZXJhdGVzIHJhbmRvbSBudW1iZXIgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2YgY29sdW1ucyBhbmQgcm93cy5cclxuY29uc3QgZ2VuZXJhdGVOdW1iZXIgPSAobWF4KSA9PntcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG59XHJcblxyXG4vL0dlbmVyYXRlIHJhbmRvbSBjb29yZGluYXRlcyB3aXRoaW4gdGhlIGdhbWUgYm9hcmRcclxuY29uc3QgZ2VuZXJhdGVDb29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgbGV0IGNvbCA9IGdlbmVyYXRlTnVtYmVyKGdhbWVib2FyZC5jb2xzKTtcclxuICAgIGxldCByb3cgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQucm93cyk7XHJcbiAgXHJcbiAgICByZXR1cm4gW2NvbCwgcm93XTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSBhIHJhbmRvbSBwbGFjZW1lbnQgb24gdGhlIGJvYXJkLlxyXG5jb25zdCByYW5kb21QbGFjZW1lbnQgPSAoZ2FtZWJvYXJkLCBzaGlwKSA9PntcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwidmVydGljYWxcIjogXCJob3Jpem9udGFsXCI7XHJcbiAgICBzaGlwLm9yaWVudGF0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgIGlmIChnYW1lYm9hcmQuaXNWYWxpZChzaGlwLCBjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pKVxyXG4gICAge1xyXG4gICAgICBnYW1lYm9hcmQucGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQoZ2FtZWJvYXJkLCBzaGlwKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuLy9QZXJmb3JtIGEgcmFuZG9tIGF0dGFjayBvbiB0aGUgZ2FtZWJvYXJkXHJcbmNvbnN0IGdldFJhbmRvbUNvb3JkaW5hdGVzID0gKGdhbWVib2FyZCkgPT57XHJcblxyXG4gICAgbGV0IHJhbmRvbUNvb3JkaW5hdGVzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhnYW1lYm9hcmQpOyAvL3JldHVybnMgYXJyYXlcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmdyaWRbcmFuZG9tQ29vcmRpbmF0ZXNbMF1dW3JhbmRvbUNvb3JkaW5hdGVzWzFdXSAhPT0gXCJtaXNzXCIgJiYgZ2FtZWJvYXJkLmdyaWRbcmFuZG9tQ29vcmRpbmF0ZXNbMF1dW3JhbmRvbUNvb3JkaW5hdGVzWzFdXSAhPT0gXCJoaXRcIiApXHJcbiAgICB7XHJcbiAgICAgIHJldHVybiByYW5kb21Db29yZGluYXRlcztcclxuICAgIH0gZWxzZXtcclxuICAgICAgcmV0dXJuIGdldFJhbmRvbUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudH0iLCJpbXBvcnQge3Y0IGFzIHV1aWR2NH0gZnJvbSAndXVpZCdcclxuY29uc3QgX0RFRkFVTFRfb3JpZW50YXRpb24gID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG5jbGFzcyBTaGlwe1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCl7XHJcbiAgICB0aGlzLmlkID0gdXVpZHY0KCk7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IF9ERUZBVUxUX29yaWVudGF0aW9uO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5kZXBsb3kgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNldE9yaWVudGF0aW9uKGl0ZW0pe1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IGl0ZW07XHJcbiAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbjtcclxuICB9XHJcblxyXG4gIGhpdCgpe1xyXG4gICAgdGhpcy5oaXRzKys7XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKXtcclxuXHJcbiAgICBpZigodGhpcy5sZW5ndGggLSB0aGlzLmhpdHMpID09PSAwKVxyXG4gICAge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGhhcyBiZWVuIHN1bmtgKTtcclxuICAgICAgcmV0dXJuIHRydWUgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGhhcyBiZWVuIGhpdCAke3RoaXMuaGl0c30gdGltZS5gKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiBieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZS9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vY29tcG91bmRzL0FwcC5qc1wiO1xyXG5cclxuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgQXBwLmxvYWRQYWdlKCkpOyJdLCJuYW1lcyI6WyJCb2FyZCIsIkdhbWUiLCJQbGF5ZXIiLCJyYW5kb21QbGFjZW1lbnQiLCJwbG90R2FtZSIsImNsZWFyQm9hcmQiLCJsb2FkQm9hcmQiLCJ1cGRhdGVCb2FyZCIsInBsb3RTaGlwcyIsIkdhbWVTZXR1cCIsImxvYWQiLCJzZXR1cCIsInBsYXllcjFCb2FyZCIsInBsYXllcjJCb2FyZCIsImlzUGxheWVyVnNDb21wdXRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGVja2VkIiwiaXNQbGF5ZXJWc1BsYXllciIsImdldFBsYXllcjFOYW1lIiwidmFsdWUiLCJnZXRQbGF5ZXIyTmFtZSIsImdhbWUiLCJyZW1vdmVDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXR1cEdhbWUiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZhdGVTcXVhcmUiLCJwbGF5ZXIiLCJuYW1lIiwiZ2V0U3F1YXJlcyIsImNoaWxkTm9kZXMiLCJwbGFjZVNoaXBUb0JvYXJkIiwiZSIsInJvdyIsInBhcnNlSW50IiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiY29sIiwic2hpcCIsImJvYXJkIiwiZ2V0U2hpcCIsImdyaWQiLCJwbGFjZVNoaXAiLCJmb3JFYWNoIiwiaXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGF5ZXJUdXJuIiwicGxheWVyMSIsInBsYXllcjIiLCJsb2FkU2V0dXBVSSIsInJhbmRvbVBsYWNlbWVudEJ0biIsImNsZWFyQnRuIiwiZG9uZUJ0biIsInNoaXBCdG5zIiwicXVlcnlTZWxlY3RvckFsbCIsInNoaXBCdG4iLCJmaW5pc2hlZFNldHVwQnRuIiwiaXNIdW1hbiIsInBsYXkiLCJnZXRSb290Iiwid2lubmVyIiwiYXBwZW5kQ2hpbGQiLCJnZXRSZWNlaXZlciIsImdldEF0dGFja2VyIiwic3F1YXJlcyIsImN1cnJlbnRUYXJnZXQiLCJhdHRhY2siLCJuZXh0VHVybiIsInJhbmRvbUF0dGFjayIsInNldFRpbWVvdXQiLCJnZXRDdXJyZW50VHVybk9wcG9uZW50IiwiTWVudSIsInJvb3QiLCJVSSIsImxvYWRIYW5kbGVycyIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJnZXRSYWRpb3MiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIkFwcCIsImxvYWRQYWdlIiwiYWRkSGFuZGxlciIsInJlbW92ZUhhbmRsZXIiLCJwbG90TWVzc2FnZSIsImJhbm5lciIsIm1lc3NhZ2UiLCJsb2FkQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsInRvTG93ZXJDYXNlIiwiZ2V0R2FtZWJvYXJkIiwiaSIsInJvd3MiLCJqIiwiY29scyIsInNxdWFyZSIsInBhcnNlZFJvdyIsInBhcnNlZENvbCIsImNsYXNzTGlzdCIsImFkZCIsImxvYWRTdGFydEJ1dHRvbiIsInN0YXJ0QnRuIiwic2hpcE1lbnUiLCJzaGlwcyIsImNyZWF0ZUJ0biIsImlkIiwiaGFuZGxlTG9hZFNoaXBCdG4iLCJoYW5kbGVTcXVhcmVDbGljayIsImNvbnN0cnVjdG9yIiwidHVybiIsInVzZXJJbnRlcmZhY2UiLCJzaGlwTWVudUJvYXJkQ29udGFpbmVyIiwiU2hpcCIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJjbGVhckdyaWQiLCJjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCIsImlzVmFsaWQiLCJvcmllbnRhdGlvbiIsImluZGV4IiwiZGVwbG95Iiwic2hpcE5hbWUiLCJyZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJnZXRNYXhIaXRzIiwic3VtIiwiZ2V0SGl0cyIsImhpdHMiLCJjaGVja3NEaWZmZXJlbmNlIiwiaXNHYW1lT3ZlciIsImlzQWxsU2hpcHNEZXBsb3llZCIsIm1hcCIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwicGxvdFNoaXAiLCJnYW1lYm9hcmQiLCJvcHBvbmVudEJvYXJkIiwicGxhY2VSYW5kb21Ub0JvYXJkIiwiZW5lbXlCb2FyZE5hbWUiLCJwbG90IiwiY29vcmRpbmF0ZXMiLCJib2FyZE5hbWUiLCJjcmVhdGVJZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJib3giLCJyZW1vdmVSZW5kZXIiLCJhZGRBbGxDaGlsZE5vZGVzIiwiZ2V0TWVudSIsInJlbW92ZUFsbENoaWxkTm9kZXMiLCJwYXJlbnQiLCJmaXJzdENoaWxkIiwicGxvdEJhbm5lciIsInBsb3RUZXh0Qm94IiwidGV4dCIsImdlbmVyYXRlTnVtYmVyIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2VuZXJhdGVDb29yZGluYXRlcyIsImRpcmVjdGlvbiIsInJhbmRvbUNvb3JkaW5hdGVzIiwidjQiLCJ1dWlkdjQiLCJfREVGQVVMVF9vcmllbnRhdGlvbiIsInNldE9yaWVudGF0aW9uIiwiaGl0IiwiaXNTdW5rIl0sInNvdXJjZVJvb3QiOiIifQ==