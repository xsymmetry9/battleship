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
/* harmony import */ var _compounds_Random__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../compounds/Random */ "./src/compounds/Random.js");
/* harmony import */ var _compounds_Plot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../compounds/Plot */ "./src/compounds/Plot.js");





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
    randomPlacementBtn.addEventListener("click", () => (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.plotAllShipsRandomly)(player));
    clearBtn.addEventListener("click", () => (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.clearBoard)(player));
    doneBtn.addEventListener("click", () => this.finishedSetupBtn(game, playerTurn));
    return player;
  };
  static finishedSetupBtn = (game, playerTurn) => {
    document.getElementById("root").removeChild(document.querySelector(".setup-menu"));
    if (game.player2.isHuman && playerTurn === "player 1") {
      this.setupGame(game, "player 2");
    } else {
      // randomPlacement(game.player2);
      //generate randomPlacement for player 2
      game.player2.board.ships.forEach(ship => {
        (0,_compounds_Random__WEBPACK_IMPORTED_MODULE_3__.randomPlacement)(game.player2.board, ship);
      });
      this.play(game);
    }
  };
  static play = game => {
    const getRoot = document.getElementById("root");
    if (game.winner != null) {
      console.log(game.winner);
      return game.winner;
    }
    //Whoever is the attacker
    getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.plotGame)(game));
    (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.updateBoard)(game.getReceiver());
    if (game.getAttacker().isHuman) {
      //load previous moves if any
      const squares = document.querySelectorAll(".square");
      squares.forEach(item => {
        const col = parseInt(item.getAttribute("col"));
        const row = parseInt(item.getAttribute("row"));

        //Doesn't add eventListener because the square is occupied.
        if (game.getReceiver().board.grid[row][col] === "hit" || game.getReceiver().board.grid[row][col] === "miss") {
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
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.plotShips)(game.getReceiver().name, game.getReceiver().board);
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
      const ship = this.grid[x][y];
      ship.hit();
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
/* harmony export */   clearBoard: () => (/* binding */ clearBoard),
/* harmony export */   loadBoard: () => (/* binding */ loadBoard),
/* harmony export */   plotAllShipsRandomly: () => (/* binding */ plotAllShipsRandomly),
/* harmony export */   plotBanner: () => (/* binding */ plotBanner),
/* harmony export */   plotGame: () => (/* binding */ plotGame),
/* harmony export */   plotMessage: () => (/* binding */ plotMessage),
/* harmony export */   plotRandomPlacement: () => (/* binding */ plotRandomPlacement),
/* harmony export */   plotShip: () => (/* binding */ plotShip),
/* harmony export */   plotShips: () => (/* binding */ plotShips),
/* harmony export */   plotTextBox: () => (/* binding */ plotTextBox),
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
const plotAllShipsRandomly = player => player.board.ships.forEach(ship => plotRandomPlacement(player, ship));
const plotRandomPlacement = player => {
  if (!player.board.isAllShipsDeployed()) {
    player.placeRandomToBoard();
    plotShips(player.name.toLowerCase(), player.board);
    return player.board.isAllShipsDeployed(); //returns true
  } else {
    clearBoard(player);
    plotRandomPlacement(player);
  }
};
const clearBoard = player => {
  player.board.clearGrid();
  player.board.changeAllShiptoNotDeployed();
  removeRender(player.name.toLowerCase());
  return player.board.isAllShipsDeployed(); //returns false
};
const removeAllChildNodes = parent => {
  while (parent.firstChild) {
    console.log(parent);
    parent.removeChild(parent.firstChild);
  }
};
const plotBanner = message => {
  const container = document.createElement("div");
  // container.className="bottom-spacing-1";
  const box = document.createElement("div");
  box.innerHTML = `<h2>${message}</h2>`;
  container.appendChild(box);
  return container;
};
const plotTextBox = text => {
  const container = document.createElement("div");
  container.className = "text-box";
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
const middleSection = ships => {
  const container = document.createElement("div");
  container.className = "shipsBox | display-flex-row bottom-spacing-1";
  ships.forEach(ship => {
    const createBox = document.createElement("div");
    createBox.className = "display-flex-row";
    createBox.innerHTML = `
        <p>${ship.name}</p>
        <p>${ship.length - ship.hits}</p>`;
    container.appendChild(createBox);
  });
  return container;
};
const plotGame = game => {
  //game -> returns object of player's board game.receiver();
  const container = document.createElement("div");
  container.className = "playerBoard";
  container.appendChild(plotBanner(`${game.getAttacker().name}`));
  container.appendChild(middleSection(game.getReceiver().board.ships));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7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bHMvLi9zcmMvU2VjdGlvbi9HYW1lU2V0dXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvU2VjdGlvbi9NZW51LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9BcHAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxheWVyLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbG90LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvZ2FtZS5zY3NzPzY4NDgiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvbWVudS5zY3NzPzY3YzAiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvYXJkIGZyb20gXCIuLi9jb21wb3VuZHMvR2FtZWJvYXJkXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9jb21wb3VuZHMvR2FtZVwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9jb21wb3VuZHMvUGxheWVyXCI7XHJcbmltcG9ydCB7cmFuZG9tUGxhY2VtZW50fSBmcm9tIFwiLi4vY29tcG91bmRzL1JhbmRvbVwiO1xyXG5pbXBvcnQgeyBcclxuICAgIHBsb3RHYW1lLFxyXG4gICAgY2xlYXJCb2FyZCxcclxuICAgIGxvYWRCb2FyZCxcclxuICAgIHVwZGF0ZUJvYXJkLFxyXG4gICAgcGxvdFNoaXBzLFxyXG4gICAgcGxvdEFsbFNoaXBzUmFuZG9tbHlcclxuICAgIH0gZnJvbSAnLi4vY29tcG91bmRzL1Bsb3QnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2V0dXB7XHJcbiAgICBzdGF0aWMgbG9hZCgpe1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBzZXR1cCgpe1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjFCb2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjJCb2FyZCA9IG5ldyBCb2FyZCgpXHJcblxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNDb21wdXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidnNDb21wdXRlclwiKS5jaGVja2VkO1xyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZzUGxheWVyXCIpLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgaWYoaXNQbGF5ZXJWc1BsYXllciB8fCBpc1BsYXllclZzQ29tcHV0ZXIpXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFBsYXllcjFOYW1lID0gbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFOYW1lXCIpLnZhbHVlLCBwbGF5ZXIxQm9hcmQsIHBsYXllcjJCb2FyZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFBsYXllcjJOYW1lID0gaXNQbGF5ZXJWc0NvbXB1dGVyID8gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIHBsYXllcjJCb2FyZCwgcGxheWVyMUJvYXJkLCBmYWxzZSkgOiBcclxuICAgICAgICAgICAgICAgIG5ldyBQbGF5ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyTmFtZVwiKS52YWx1ZSwgcGxheWVyMkJvYXJkLCBwbGF5ZXIxQm9hcmQsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2V0UGxheWVyMU5hbWUsIGdldFBsYXllcjJOYW1lKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1ib3hcIikpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAxXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2FtZTtcclxuXHJcbiAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG4gICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICBzdGF0aWMgYWN0aXZhdGVTcXVhcmUgPSAocGxheWVyLCBuYW1lKSA9PntcclxuICAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpLmNoaWxkTm9kZXM7XHJcbiBcclxuICAgICAgICAgY29uc3QgcGxhY2VTaGlwVG9Cb2FyZCA9IChlKSA9PiB7XHJcbiAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpOyAvL3JldHVybnMgcm93XHJcbiAgICAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpOyAvL3JldHVybnMgY29sdW1uXHJcbiAgICAgICAgICAgICBjb25zdCBzaGlwID0gcGxheWVyLmJvYXJkLmdldFNoaXAobmFtZSk7IC8vcmV0dXJucyBzaGlwXHJcbiAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHBhcnNlSW50KHJvdyksIHBhcnNlSW50KGNvbCkpKTtcclxuIFxyXG4gICAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmdyaWRbcm93XVtjb2xdID09PSBudWxsKVxyXG4gICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgIC8vcGxhY2UgdGhlIHNoaXBcclxuICAgICAgICAgICAgICAgICByZXR1cm4gcGxheWVyLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCk7XHJcbiBcclxuICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgLy9zZWxlY3RzIHRoZSBzaGlwXHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuKFwiVGhlcmUgaXMgYSBzaGlwIGxvY2F0ZWQgdGhlcmUuICBQbGFjZSBhbm90aGVyIHNxdWFyZS5cIik7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PntcclxuXHJcbiAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHBsYWNlU2hpcFRvQm9hcmQpO1xyXG4gICAgICAgICB9KVxyXG4gICAgIH1cclxuIFxyXG4gICAgIHN0YXRpYyBzZXR1cEdhbWUgPSAoZ2FtZSwgcGxheWVyVHVybikgPT57XHJcbiAgICAgICAgY29uc3QgcGxheWVyID0gcGxheWVyVHVybiA9PT0gXCJwbGF5ZXIgMVwiID8gZ2FtZS5wbGF5ZXIxIDogZ2FtZS5wbGF5ZXIyO1xyXG4gICAgICAgIGdhbWUubG9hZFNldHVwVUkocGxheWVyKTtcclxuICAgICAgICBjb25zdCByYW5kb21QbGFjZW1lbnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICAgICAgY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsZWFyLWJvYXJkXCIpO1xyXG4gICAgICAgIGNvbnN0IGRvbmVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWJ0blwiKTtcclxuICAgICAgICBjb25zdCBzaGlwQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2hpcC1idG5cIik7XHJcbiAgICAgICAgc2hpcEJ0bnMuZm9yRWFjaCgoc2hpcEJ0biA9PiBzaGlwQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHRoaXMuYWN0aXZhdGVTcXVhcmUocGxheWVyLCBzaGlwQnRuLnZhbHVlKSkpKTtcclxuICAgICAgICAgXHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHBsb3RBbGxTaGlwc1JhbmRvbWx5KHBsYXllcikpO1xyXG4gICAgICAgIGNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IGNsZWFyQm9hcmQocGxheWVyKSk7XHJcbiAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB0aGlzLmZpbmlzaGVkU2V0dXBCdG4oZ2FtZSwgcGxheWVyVHVybikpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXI7XHJcbiAgICAgfVxyXG4gXHJcbiAgICAgc3RhdGljIGZpbmlzaGVkU2V0dXBCdG4gPSAoZ2FtZSwgcGxheWVyVHVybikgPT57XHJcbiAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNldHVwLW1lbnVcIikpO1xyXG4gICAgICAgIGlmKGdhbWUucGxheWVyMi5pc0h1bWFuICYmIHBsYXllclR1cm4gPT09IFwicGxheWVyIDFcIil7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBHYW1lKGdhbWUsIFwicGxheWVyIDJcIilcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIC8vIHJhbmRvbVBsYWNlbWVudChnYW1lLnBsYXllcjIpO1xyXG4gICAgICAgICAgICAvL2dlbmVyYXRlIHJhbmRvbVBsYWNlbWVudCBmb3IgcGxheWVyIDJcclxuICAgICAgICAgICAgZ2FtZS5wbGF5ZXIyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+e1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWUucGxheWVyMi5ib2FyZCwgc2hpcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgfSBcclxuICAgICB9XHJcblxyXG4gICAgIHN0YXRpYyBwbGF5ID0oZ2FtZSkgPT57XHJcbiAgICAgICAgY29uc3QgZ2V0Um9vdCA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcbiAgICAgICAgaWYoZ2FtZS53aW5uZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUud2lubmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdhbWUud2lubmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1dob2V2ZXIgaXMgdGhlIGF0dGFja2VyXHJcbiAgICAgICAgZ2V0Um9vdC5hcHBlbmRDaGlsZChwbG90R2FtZShnYW1lKSk7XHJcbiAgICAgICAgdXBkYXRlQm9hcmQoZ2FtZS5nZXRSZWNlaXZlcigpKTtcclxuICAgICAgICBpZihnYW1lLmdldEF0dGFja2VyKCkuaXNIdW1hbilcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vbG9hZCBwcmV2aW91cyBtb3ZlcyBpZiBhbnlcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRG9lc24ndCBhZGQgZXZlbnRMaXN0ZW5lciBiZWNhdXNlIHRoZSBzcXVhcmUgaXMgb2NjdXBpZWQuXHJcbiAgICAgICAgICAgICAgICBpZihnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gPT09IFwiaGl0XCIgfHwgZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLmdyaWRbcm93XVtjb2xdID09PSBcIm1pc3NcIil7IFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgZSA9PntcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5nZXRBdHRhY2tlcigpLmF0dGFjayhnYW1lLmdldFJlY2VpdmVyKCkubmFtZSwgcm93LCBjb2wpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFJvb3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5uZXh0VHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3JhbmRvbSBhdHRhY2tcclxuICAgICAgICAgICAgcGxvdFNoaXBzKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCBnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQpO1xyXG4gICAgICAgICAgICBnYW1lLmdldEF0dGFja2VyKCkucmFuZG9tQXR0YWNrKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgZ2V0Um9vdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubmV4dFR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ2FtZS5nZXRDdXJyZW50VHVybk9wcG9uZW50KCk7XHJcblxyXG4gICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0ICcuLi9zdHlsZS9tZW51LnNjc3MnXHJcbmltcG9ydCBHYW1lU2V0dXAgZnJvbSBcIi4vR2FtZVNldHVwXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51e1xyXG4gICAgc3RhdGljIGxvYWQoKXtcclxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy5VSSgpKTtcclxuICAgICAgICB0aGlzLmxvYWRIYW5kbGVycygpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIFVJKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJtZW51LWJveFwiO1xyXG5cclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ0ZXh0LWNlbnRlcmVkXCI+V2VsY29tZSB0byBCYXR0bGVzaGlwPC9oMT5cclxuICAgICAgICAgICAgPGRpdiBpZD1cImdhbWVGb3JtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBsYXllcjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNjcmlwdGlvblwiPlBsYXllciAxOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwbGF5ZXIxTmFtZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJwbGF5ZXIySW5wdXRcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBsYXllcjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNjcmlwdGlvblwiPlBsYXllciAyOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwbGF5ZXIyTmFtZVwiIGRpc2FibGVkLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImdhbWVNb2RlXCIgY2xhc3M9XCJnYW1lTW9kZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZCA9XCJ2c0NvbXB1dGVyXCIgbmFtZT1cImdhbWVNb2RlXCIgdmFsdWU9XCJjb21wdXRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ2c0NvbXB1dGVyXCI+UGxheWVyIHZzIENvbXB1dGVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJ2c1BsYXllclwiIG5hbWU9XCJnYW1lTW9kZVwiIHZhbHVlPVwicGxheWVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInZzUGxheWVyXCI+UGxheWVyIHZzIFBsYXllcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic3VibWl0LWJ0blwiIHR5cGU9XCJzdWJtaXRcIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRIYW5kbGVycygpe1xyXG4gICAgICAgIGNvbnN0IGdldFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZU1vZGUgaW5wdXRcIik7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnRuXCIpO1xyXG5cclxuICAgICAgICBnZXRSYWRpb3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2hhbmdlXCIpLCAoKSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IFwidnNQbGF5ZXJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gR2FtZVNldHVwLmxvYWQoKSk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCBNZW51IGZyb20gJy4uL1NlY3Rpb24vTWVudSc7XHJcbi8vIGltcG9ydCBCb2FyZCBmcm9tICcuL0dhbWVib2FyZCc7XHJcbi8vIGltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInO1xyXG4vLyBpbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUnO1xyXG4vLyBpbXBvcnQge3Bsb3RNZXNzYWdlLFxyXG4vLyAgICAgIHJlbW92ZVJlbmRlciwgXHJcbi8vICAgICAgcGxvdFNoaXAsXHJcbi8vICAgICAgcGxvdFNoaXBzLCBcclxuLy8gICAgICByYW5kb21QbGFjZW1lbnQsIFxyXG4vLyAgICAgIHJlbW92ZUFsbENoaWxkTm9kZXMsXHJcbi8vICAgICAgYWRkQWxsQ2hpbGROb2RlcywgXHJcbi8vICAgICAgY2xlYXJCb2FyZH0gZnJvbSAnLi9QbG90J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwe1xyXG4gICAgc3RhdGljIGxvYWRQYWdlKCl7XHJcbiAgICAgICAgTWVudS5sb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRCdXR0b25zKCl7XHJcbiAgICAvLyAgICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgYnV0dG9ucy5jbGFzc05hbWUgPSBcImJ1dHRvbnMtY29udGFpbmVyXCJcclxuXHJcbiAgICAvLyAgICAgYnV0dG9ucy5pbm5lckhUTUwgPSBgXHJcbiAgICAvLyAgICAgICAgIDxidXR0b24gaWQ9XCJzdGFydC1iYXR0bGVzaGlwXCIgdHlwZT1cImJ1dHRvblwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cclxuICAgIC8vICAgICAgICAgPGJ1dHRvbiBpZD1cInJhbmRvbS1wbGFjZW1lbnRcIiB0eXBlPVwiYnV0dG9uXCI+UmFuZG9tIFBsYWNlbWVudDwvYnV0dG9uPlxyXG4gICAgLy8gICAgICAgICA8YnV0dG9uIGlkPSBcImNsZWFyLWJvYXJkXCIgdHlwZT1cImJ1dHRvblwiPkNsZWFyPC9idXR0b24+XHJcbiAgICAvLyAgICAgICAgIDxidXR0b24gaWQ9XCJyZXNldC1iYXR0bGVzaGlwXCIgY2xhc3M9XCJoaWRkZW5cIiB0eXBlPVwiYnV0dG9uXCI+UmVzZXQ8L2J1dHRvbj5cclxuICAgIC8vICAgICBgXHJcbiAgICAvLyAgICAgcmV0dXJuIGJ1dHRvbnM7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRCb2FyZHMoKXtcclxuICAgIC8vICAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGJvYXJkcy5jbGFzc05hbWUgPSBcImJvYXJkcy1jb250YWluZXJcIjtcclxuICAgIC8vICAgICBib2FyZHMuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQm9hcmQocGxheWVyMSwgXCJteUJvYXJkXCIpKTtcclxuICAgIC8vICAgICBib2FyZHMuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQm9hcmQocGxheWVyMiwgXCJvcHBvbmVudEJvYXJkXCIpKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGJvYXJkcztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZERPTSgpe1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gXCJnYW1lLWNvbnRhaW5lclwiO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBoYW5kbGVCdG5zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBoYW5kbGVCdG5zQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGxheWVyLW1lbnVcIjtcclxuICAgICAgICBcclxuICAgIC8vICAgICBoYW5kbGVCdG5zQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubG9hZFNoaXBzKHBsYXllcjEpKTtcclxuICAgIC8vICAgICBoYW5kbGVCdG5zQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubG9hZE9yaWVudGF0aW9uQnRucygpKTtcclxuICAgIC8vICAgICBjb250ZW50LmFwcGVuZENoaWxkKGhhbmRsZUJ0bnNDb250YWluZXIpO1xyXG5cclxuICAgIC8vICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkcygpKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRNZXNzYWdlTG9nKCl7XHJcbiAgICAvLyAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJtZXNzYWdlLWxvZy1jb250YWluZXJcIjtcclxuXHJcbiAgICAvLyAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBib3guY2xhc3NOYW1lID0gXCJtZXNzYWdlLWxvZy1ib3hcIjtcclxuICAgIC8vICAgICBib3guaW5uZXJIVE1MID0gYDxwIGlkPVwibWVzc2FnZS1sb2dcIj5UZXN0PC9wPmA7XHJcblxyXG4gICAgLy8gICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3gpO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc3RhdGljIHNlbmRNZXNzYWdlKG1lc3NhZ2Upe1xyXG4gICAgLy8gICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheS13cmFwcGVyIGgyXCIpO1xyXG4gICAgLy8gICAgIGJveC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRCb2FyZChwbGF5ZXIsIGlkKXtcclxuICAgICAgICBcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5sb2FkR3JpZChwbGF5ZXIsIGlkKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSB7XHJcbiAgICAvLyAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAvLyAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2cocGxheWVyLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgXCJob3Jpem9udGFsXCIpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlT3JpZW50YXRpb24gPSAoc2hpcCkgPT57XHJcbiAgICAvLyAgICAgY29uc3Qgb3JpZW50YXRpb25CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmllbnRhdGlvbi1idG5zXCIpO1xyXG4gICAgLy8gICAgIG9yaWVudGF0aW9uQnRucy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgIC8vICAgICAgICAgaWYoaXRlbS52YWx1ZSAhPT0gc2hpcC5vcmllbnRhdGlvbilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIChlKSA9PiB0aGlzLmhhbmRsZU9yaWVudGF0aW9uQnRuKGUsIHNoaXApKTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZUxvYWRTaGlwQnRuID0gKGUsIHBsYXllcikgPT57XHJcbiAgICAvLyAgICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICAvLyAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlCb2FyZFwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgIC8vICAgICB0aGlzLmhhbmRsZU9yaWVudGF0aW9uKHNoaXApO1xyXG4gXHJcbiAgICAvLyAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLmhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBoYW5kbGVPcmllbnRhdGlvbkJ0biA9IChlLCBzaGlwKSA9PntcclxuICAgIC8vICAgICAvLyBzaGlwLnNldE9yaWVudGF0aW9uID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgLy8gICAgIHNoaXAub3JpZW50YXRpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICAvLyAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuXHJcblxyXG4gICAgLy8gICAgIGNvbnN0IG9yaWVudGF0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JpZW50YXRpb24tYnRuc1wiKTtcclxuICAgIC8vICAgICBvcmllbnRhdGlvbkJ0bnMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAvLyAgICAgICAgIGlmKGl0ZW0udmFsdWUgIT09IHNoaXAub3JpZW50YXRpb24pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoZSkgPT4gdGhpcy5oYW5kbGVPcmllbnRhdGlvbihlLCBzaGlwKSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGUuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZE9yaWVudGF0aW9uQnRucyA9ICgpID0+e1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwib3JpZW50YXRpb24tY29udGFpbmVyXCI7XHJcblxyXG4gICAgLy8gICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAvLyAgICAgPGJ1dHRvbiBjbGFzcz1cIm9yaWVudGF0aW9uLWJ0bnNcIiBpZD1cImhvcml6b250YWwtYnRuXCIgdmFsdWU9XCJob3Jpem9udGFsXCI+aG9yaXpvbnRhbDwvYnV0dG9uPlxyXG4gICAgLy8gICAgIDxidXR0b24gY2xhc3M9XCJvcmllbnRhdGlvbi1idG5zXCIgaWQ9XCJ2ZXJ0aWNhbC1idG5cIiB2YWx1ZT1cInZlcnRpY2FsXCI+dmVydGljYWw8L2J1dHRvbj5cclxuICAgIC8vICAgICBgO1xyXG4gICAgLy8gICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRTaGlwcyhwbGF5ZXIpIHtcclxuICAgIC8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG4gICBcclxuICAgIC8vICAgICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zdCBjcmVhdGVTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZVNoaXBzLmNsYXNzTmFtZSA9IFwic2hpcC1idG4tY29udGFpbmVyXCI7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG5cIjtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgLy8gICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuaGFuZGxlTG9hZFNoaXBCdG4oZSwgcGxheWVyKSk7XHJcblxyXG4gICAgLy8gICAgICAgICBjcmVhdGVTaGlwcy5hcHBlbmRDaGlsZChjcmVhdGVCdG4pO1xyXG4gICAgLy8gICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlU2hpcHMpO1xyXG4gICAgICAgXHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICBcclxuICAgIC8vIH1cclxuICAgIC8vIHN0YXRpYyBsb2FkR3JpZChwbGF5ZXIsIGlkKXtcclxuICAgIC8vICAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcclxuXHJcbiAgICAvLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRHYW1lYm9hcmQucm93czsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiY29sXCIsIGopO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIHBsb3RTaGlwcyhnYW1lYm9hcmQpe1xyXG4gICAgLy8gICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAvLyAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgIC8vICAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgLy8gICAgICAgICBpZihnYW1lYm9hcmQuZ3JpZFtyb3ddW2NvbF0gIT09IG51bGwpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlcigpe1xyXG4gICAgLy8gICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgIC8vICAgICBjb25zdCBjbGVhckJvYXJkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKVxyXG4gICAgLy8gICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtY29udGFpbmVyXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IGdldFNoaXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWJ1dHRvbnNcIik7XHJcbiAgICAvLyAgICAgY29uc3QgcGxheWVyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW1lbnVcIik7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IG1vdmUgPSAoZSkgPT57XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGUuY3VycmVudFRhcmdldDtcclxuICAgIC8vICAgICAgICAgY29uc3QgY29sID0gc3F1YXJlLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIC8vICAgICAgICAgY29uc3Qgcm93ID0gc3F1YXJlLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICBpZihwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyLm5hbWUsIHJvdywgY29sKSA9PT0gXCJoaXRcIil7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgLy8gIGNoZWNrcyBpZiBnYW1lIG92ZXJcclxuICAgIC8vICAgICAgICAgICAgIGlmKHBsYXllcjEub3Bwb25lbnRCb2FyZC5pc0dhbWVPdmVyKCkpXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXJcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKHBsYXllcjIucmFuZG9tQXR0YWNrKHBsYXllcjEubmFtZSkpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgfSBlbHNlIFxyXG4gICAgLy8gICAgICAgICB7ICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjayhwbGF5ZXIxLm5hbWUpKSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIG1vdmUpO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgY29uc3Qgc3RhcnQgPSAoKSA9PntcclxuICAgIC8vICAgICAgICAgY29uc3QgcGxheWVyTW92ZXMgPSAoKSA9PntcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgb3Bwb25lbnRCb2FyZGApLmNoaWxkTm9kZXM7XHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBwbGF5KTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBoYW5kbGVycyB3ZXJlIHJlbW92ZWQgc3VjY2Vzc2Z1bGx5LlwiKVxyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgZ2V0Q2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgb3Bwb25lbnRCb2FyZGApLmNoaWxkTm9kZXM7XHJcbiAgICAvLyAgICAgICAgICAgICBnZXRDaGlsZHJlbi5mb3JFYWNoKChzcXVhcmUpID0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBwbGF5KTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHBsYXkgPSAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBjb2wgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYmF0dGxlU2hpcEdhbWUuZ2V0QXR0YWNrZXIoKSAhPT0gXCJjb21wdXRlclwiID8gYmF0dGxlU2hpcEdhbWUuZ2V0QXR0YWNrZXIoKS5hdHRhY2soYmF0dGxlU2hpcEdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCByb3csIGNvbCkgOiBiYXR0bGVTaGlwR2FtZS5nZXRBdHRhY2tlcigpLnJhbmRvbUF0dGFjayhiYXR0bGVTaGlwR2FtZS5nZXRSZWNlaXZlcigpKTtcclxuICAgIC8vICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gXCJoaXRcIilcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdFwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3Igc3RhdHVzXHJcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR2FtZS5uZXh0VHVybigpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJhdHRsZVNoaXBHYW1lLnR1cm4pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBwbGF5ZXJNb3ZlcygpO1xyXG4gICAgLy8gICAgICAgICAgICAgfTtcclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJhdHRsZVNoaXBHYW1lLmlzR2FtZU92ZXIpO1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gcmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgLy8gICAgICAgICBwbG90TWVzc2FnZShcIlBsYXllciAxIGdvZXMgZmlyc3RcIilcclxuICAgIC8vICAgICAgICAgY29uc3QgYmF0dGxlU2hpcEdhbWUgPSBuZXcgR2FtZShwbGF5ZXIxLCBwbGF5ZXIyLCBmYWxzZSk7XHJcbiAgICAvLyAgICAgICAgIGJhdHRsZVNoaXBHYW1lLnBsYXllcjIucGxhY2VSYW5kb21Ub0JvYXJkKCk7XHJcblxyXG4gICAgLy8gICAgICAgICBpZighYmF0dGxlU2hpcEdhbWUuaXNHYW1lT3ZlciAmJlxyXG4gICAgLy8gICAgICAgICAgICAgYmF0dGxlU2hpcEdhbWUucGxheWVyMS5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSAmJiBiYXR0bGVTaGlwR2FtZS5wbGF5ZXIyLmJvYXJkLmlzQWxsU2hpcHNEZXBsb3llZCgpKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL0FkZCBoYW5kbGVyIHRvIGVhY2ggc3F1YXJlXHJcbiAgICAvLyAgICAgICAgICAgICBzdGFydEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAvLyAgICAgICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICBjbGVhckJvYXJkQnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICByZXNldEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmVtb3ZlQWxsQ2hpbGROb2RlcyhwbGF5ZXJNZW51KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAvL0dhbWUgc3RhcnRzIGhlcmVcclxuICAgIC8vICAgICAgICAgICAgIHBsYXllck1vdmVzKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS50dXJuKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhmYWxzZSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBjb25zdCByZXNldCA9ICgpID0+e1xyXG4gICAgLy8gICAgICAgICBwbGF5ZXIxLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgLy8gICAgICAgICBwbGF5ZXIyLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnVwZGF0ZUdhbWVCb2FyZChcIm15Qm9hcmRcIik7XHJcbiAgICAvLyAgICAgICAgIC8vIHJlbW92ZVJlbmRlcihcIm15Qm9hcmRcIik7XHJcbiAgICAvLyAgICAgICAgIC8vIHJlbW92ZVJlbmRlcihcIm9wcG9uZW50Qm9hYXJkXCIpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gICAgICAgICByZXNldEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAvLyAgICAgICAgIHN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgIGdldFNoaXBCdG5zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICBjbGVhckJvYXJkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcblxyXG4gICAgLy8gICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFwiUHJlc3MgU3RhcnQuXCIpXHJcblxyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHN0YXJ0KTtcclxuICAgIC8vICAgICByYW5kb21QbGFjZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gcmFuZG9tUGxhY2VtZW50KHBsYXllcjEpKTtcclxuICAgIC8vICAgICBjbGVhckJvYXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IGNsZWFyQm9hcmQocGxheWVyMSkpXHJcbiAgICAvLyAgICAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcmVzZXQpO1xyXG5cclxuICAgXHJcbiAgICAvLyB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQge2FkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXJ9IGZyb20gJy4vRnVuY3Rpb25zJ1xyXG5pbXBvcnQge3Bsb3RNZXNzYWdlLCByYW5kb21QbGFjZW1lbnR9IGZyb20gJy4vUGxvdCdcclxuaW1wb3J0IFwiLi4vc3R5bGUvZ2FtZS5zY3NzXCJcclxuXHJcbmV4cG9ydCBjb25zdCBiYW5uZXIgPSAobWVzc2FnZSkgPT57XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBgPGgxPiR7bWVzc2FnZX08L2gxPmA7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5leHBvcnQgY29uc3QgbG9hZEJ1dHRvbnMgPShwbGF5ZXIpID0+e1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBidXR0b25zLmNsYXNzTmFtZSA9IFwiYnV0dG9ucy1jb250YWluZXJcIjtcclxuXHJcbiAgICBjb25zdCByYW5kb21QbGFjZW1lbnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgcmFuZG9tUGxhY2VtZW50QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgIHJhbmRvbVBsYWNlbWVudEJ0bi50ZXh0Q29udGVudD1cInJhbmRvbVwiO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNsZWFyQnRuLnRleHRDb250ZW50ID0gXCJjbGVhclwiO1xyXG4gICAgY2xlYXJCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjbGVhci1ib2FyZFwiKTtcclxuXHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKHJhbmRvbVBsYWNlbWVudEJ0bik7XHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKGNsZWFyQnRuKTtcclxuXHJcbiAgICByZXR1cm4gYnV0dG9ucztcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGxvYWRCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gcGxheWVyLmJvYXJkO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKX0tJHtpfS0ke2p9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRSb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJoaXRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcIm1pc3NcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGxvYWRTdGFydEJ1dHRvbiA9ICgpID0+e1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc3RhcnRCdG4uY2xhc3NOYW1lPVwic3RhcnQtYnRuXCI7XHJcbiAgICBzdGFydEJ0bi50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xyXG4gICAgcmV0dXJuIHN0YXJ0QnRuO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2hpcE1lbnUgPSAocGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJzaGlwLWJ1dHRvbnNcIjtcclxuICAgXHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG5cIjtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUJ0bik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVMb2FkU2hpcEJ0biA9IChlLCBwbGF5ZXIpID0+e1xyXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhzaGlwKTtcclxuICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKS5jaGlsZE5vZGVzO1xyXG4gXHJcbiAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgaGFuZGxlU3F1YXJlQ2xpY2sgPSAoZSwgc2hpcCwgcGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcblxyXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKTtcclxuICAgIH1cclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbmNsYXNzIEdhbWV7XHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGxheWVyMSA9IHBsYXllcjE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gcGxheWVyMjtcclxuICAgICAgICB0aGlzLndpbm5lciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50dXJuID0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvL3R1cm4gYmFzZSBwbGF5aW5nIGdhbWVcclxuXHJcbiAgICBnZXRBdHRhY2tlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJlY2VpdmVyKCl7XHJcbiAgICAgICAgaWYodGhpcy50dXJuICUgMiAhPT0gMCkge1xyXG4gICAgICAgICAgICAvL2lmIGl0J3MgcGxheWVyMSB0dXJuLCByZXR1cm5zIHBsYXllcjIgbmFtZS5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9yZXR1cm5zIHBsYXllcjEgYW5kIHBsYXllcjIgYXMgc3RyaW5nc1xyXG4gICAgZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dGFja2VyKCkubmFtZSA9PSB0aGlzLnBsYXllcjEubmFtZSA/IFwicGxheWVyMlwiIDogXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcbiAgICBuZXh0VHVybigpe1xyXG4gICAgICAgIHRoaXMudHVybisrO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFNldHVwVUkocGxheWVyKXtcclxuICAgICAgICBjb25zdCB1c2VySW50ZXJmYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmNsYXNzTmFtZSA9IFwic2V0dXAtbWVudVwiO1xyXG4gICAgICAgIC8vTG9hZCBTZXQgcGllY2VzIGJ5IHBsYXllcnNcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGJhbm5lcihwbGF5ZXIubmFtZSkpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQobG9hZEJ1dHRvbnMocGxheWVyKSk7XHJcbiAgICAgICAgY29uc3Qgc2hpcE1lbnVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImJvYXJkLWNvbnRhaW5lclwiO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKHBsYXllcikpO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcE1lbnUocGxheWVyKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChzaGlwTWVudUJvYXJkQ29udGFpbmVyKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGxvYWRTdGFydEJ1dHRvbigpKTtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVzZXJJbnRlcmZhY2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xyXG5jbGFzcyBHYW1lYm9hcmR7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvd3MgPSAxMDsgXHJcbiAgICB0aGlzLmNvbHMgPSAxMDtcclxuICAgIHRoaXMuZ3JpZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoKSA9PiBBcnJheSh0aGlzLmNvbHMpLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5zaGlwcyA9IFtcclxuICAgICAgbmV3IFNoaXAoXCJBc3NhdWx0IFNoaXBcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQWlyY3JhZnQgQ2FycmllclwiLCA1KSxcclxuICAgICAgbmV3IFNoaXAoXCJEZXN0cm95ZXJcIiwgNyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQ3J1aXNlclwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJDb21iYXQgU2hpcFwiLCAxKSAgIFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8vQ2xlYXJzIHRoZSBib2FyZC5cclxuICBjbGVhckdyaWQoKXtcclxuICAgIHRoaXMuZ3JpZC5mb3JFYWNoKHJvdyA9PiByb3cuZmlsbChudWxsKSk7XHJcbiAgICB0aGlzLmNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCk7XHJcbiAgfVxyXG4gIC8vQ2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgc2hpcHMgb24gdGhlIGJvYXJkIGFuZCBpZiBpdCBmaXRzLlxyXG4gIGlzVmFsaWQoc2hpcCwgcm93LCBjb2wpe1xyXG4gICAgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICBpZihjb2wgKyBzaGlwLmxlbmd0aCA+IHRoaXMuY29scylcclxuICAgICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSAvLyBcIkVycm9yOiBTaGlwIGRvZXNuJ3QgZml0IGhvcml6b250YWxseS5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IHNoaXAubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiRXJyb3I6IEEgc2hpcCBpcyBhbHJlYWR5IHByZXNlbnQgYXQgdGhpcyBsb2NhdGlvbiBob3Jpem9udGFsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5kZXggKys7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvL1Bhc3MgYWxsIHRlc3RcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSBlbHNlIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGlmKHJvdyArIHNoaXAubGVuZ3RoID4gdGhpcy5yb3dzKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIlNoaXAgZG9lc24ndCBmaXQgdmVydGljYWxseVwiOyAvL1NoaXAgZG9lc24ndCBmaXQuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB3aGlsZShpbmRleCA8IHNoaXAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgaWYodGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiQSBzaGlwIGlzIGFscmVhZHkgYXQgdGhpcyBsb2NhdGlvbiB2ZXJ0aWNhbGx5LlwiOyAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlIC8vXCJJbnZhbGlkIGRpcmVjdGlvblwiOyAvL2ludmFsaWQgbmFtZVxyXG4gICAgfVxyXG4gIH1cclxuLy9QbGFjZXMgdGhlIHNoaXAgb24gdGhlIGJvYXJkLlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCl7XHJcbiAgICBpZighdGhpcy5pc1ZhbGlkKHNoaXAsIHJvdywgY29sKSlcclxuICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgIFxyXG4gICAgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpXHJcbiAgICAgIHtcclxuICAgICAgICAvL2NoZWNrcyBmb3Igb3ZlcmxhcHMgb3Igb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5kZXBsb3kgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfSBlbHNlIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIil7IC8vZGlyZWN0aW9uIGlzIGhvcml6b250YWxcclxuICAgICAgICAvL2lmIGV2ZXJ5dGhpbmcgcGFzc2VzLCBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgdGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5kZXBsb3kgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IFxyXG4gICAgZ2V0U2hpcChzaGlwTmFtZSl7XHJcbiAgICAgIGxldCByZXN1bHQ7XHJcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGlmKHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBcInNoaXAgbm90IGZvdW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAvL1BsYWNlcyBhbiBhdHRhY2sgb24gdGhlIGJvYXJkLlxyXG4gIHJlY2VpdmVBdHRhY2soeCwgeSl7XHJcbiAgICBcclxuICAgIGlmKHggPj0gdGhpcy5jb2xzIHx8IHkgPj10aGlzLnJvd3MgKVxyXG4gICAgICByZXR1cm4gXCJvdXQgb2YgYm91bmRzXCI7XHJcbiAgICBpZih0aGlzLmdyaWRbeF1beV0gPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwibWlzc1wiOyAvL21hcmsgZG93biBtaXNzXHJcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcclxuICAgIH0gZWxzZXtcclxuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZ3JpZFt4XVt5XTtcclxuICAgICAgc2hpcC5oaXQoKTtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJoaXRcIjtcclxuICAgICAgcmV0dXJuIFwiaGl0XCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE1heEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAubGVuZ3RoO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuICBnZXRIaXRzKCl7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+e1xyXG4gICAgICBzdW0rPSBzaGlwLmhpdHM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG5cclxuICBjaGVja3NEaWZmZXJlbmNlKCl7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRNYXhIaXRzKCkgLSB0aGlzLmdldEhpdHMoKTtcclxuICB9XHJcblxyXG4gIC8vQ2hlY2tzIGlmIHRoZSBnYW1lIGlzIG92ZXIuXHJcbiAgaXNHYW1lT3Zlcigpe1xyXG4gICAgY29uc29sZS5sb2codGhpcy5jaGVja3NEaWZmZXJlbmNlKCkpO1xyXG4gICAgcmV0dXJuIHRoaXMuY2hlY2tzRGlmZmVyZW5jZSgpID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNBbGxTaGlwc0RlcGxveWVkKCl7XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBpZighc2hpcC5kZXBsb3kpXHJcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIGNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCl7XHJcbiAgICB0aGlzLnNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5kZXBsb3kgPSBmYWxzZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQge2dldFJhbmRvbUNvb3JkaW5hdGVzLCByYW5kb21QbGFjZW1lbnR9IGZyb20gJy4vUmFuZG9tJztcclxuaW1wb3J0IHtwbG90U2hpcH0gZnJvbSAnLi9QbG90JztcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZ2FtZWJvYXJkLCBvcHBvbmVudEJvYXJkLCBpc0h1bWFuKVxyXG4gIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmJvYXJkID0gZ2FtZWJvYXJkO1xyXG4gICAgdGhpcy5vcHBvbmVudEJvYXJkID0gb3Bwb25lbnRCb2FyZDtcclxuICAgIHRoaXMuaXNIdW1hbiA9IGlzSHVtYW47XHJcblxyXG4gIH1cclxuICAvL1BsYWNlcyBzaGlwcyByYW5kb21seSBvbiB0aGUgYm9hcmQuXHJcbiAgcGxhY2VSYW5kb21Ub0JvYXJkKCl7XHJcbiAgICB0aGlzLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgcmFuZG9tUGxhY2VtZW50KHRoaXMuYm9hcmQsIHNoaXApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGhpcy5vcHBvbmVudEJvYXJkLnNoaXBzO1xyXG4gIH1cclxuLy9BIGZ1bmN0aW9uIHRoYXQgcGxhY2VzIHNoaXBzIG9uIHRoZSBib2FyZCBtYW51YWxseS5cclxuICBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wpXHJcbiAge1xyXG4gICAgaWYgKCFzaGlwLmRlcGxveSAmJiB0aGlzLmJvYXJkLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCkpe1xyXG4gICAgICBwbG90U2hpcCh0aGlzLm5hbWUsIHJvdywgY29sLCBzaGlwLmxlbmd0aCwgc2hpcC5vcmllbnRhdGlvbik7XHJcbiAgICAgIHJldHVybiB0aGlzLmJvYXJkLmdyaWQ7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiU2hpcCBoYXMgYWxyZWFkeSBiZWVuIGRlcGxveWVkLiAgVHJpZWQgYWdhaW5cIlxyXG4gICAgfVxyXG5cclxuICB9XHJcbi8vUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIGF0dGFjayhlbmVteUJvYXJkTmFtZSwgcm93LCBjb2wpe1xyXG4gICAgY29uc3QgcGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2VuZW15Qm9hcmROYW1lfS0ke3Jvd30tJHtjb2x9YCk7XHJcblxyXG4gICAgaWYodGhpcy5vcHBvbmVudEJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpID09PSBcImhpdFwiKVxyXG4gICAge1xyXG4gICAgICBwbG90LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgIHJldHVybiBgaGl0YDsgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwbG90LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICByZXR1cm4gYG1pc3NgO1xyXG4gICAgfTtcclxuICB9XHJcbi8vUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIHJhbmRvbWx5IG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIHJhbmRvbUF0dGFjayhlbmVteUJvYXJkTmFtZSl7XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKHRoaXMub3Bwb25lbnRCb2FyZCk7XHJcbiAgICBjb25zdCByb3cgPSBjb29yZGluYXRlc1swXTtcclxuICAgIGNvbnN0IGNvbCA9IGNvb3JkaW5hdGVzWzFdO1xyXG4gICAgY29uc29sZS5sb2coXCJyYW5kb20gYXR0YWNrIGV4ZWN1dGVkXCIpO1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImNvbnN0IHBsb3RTaGlwcyA9IChib2FyZE5hbWUsIGdhbWVib2FyZCkgPT57XHJcbiAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9hcmROYW1lLnRvTG93ZXJDYXNlKCkpLmNoaWxkTm9kZXM7XHJcbiAgICBcclxuICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgaWYoZ2FtZWJvYXJkLmdyaWRbcm93XVtjb2xdICE9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGdldFNxdWFyZXM7XHJcbn1cclxuY29uc3QgcGxvdFNoaXAgPSAobmFtZSwgcm93LCBjb2wsIGxlbmd0aCwgb3JpZW50YXRpb24pID0+e1xyXG4gICAgY29uc29sZS5sb2coe1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgY29sOiBjb2wsXHJcbiAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uXHJcbiAgICB9KVxyXG5cclxuICAgIGlmKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke25hbWUudG9Mb3dlckNhc2UoKX0tJHtyb3d9LSR7Y29sICsgaW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIGUgPT57Y29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0KX0pO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3JvdyArIGluZGV4fS0ke2NvbH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJQbG90dGluZyBkaWRuJ3Qgd29yay5cIlxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBwbG90TWVzc2FnZSA9IChtZXNzYWdlKSA9PntcclxuICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheS13cmFwcGVyIGgyXCIpO1xyXG4gICAgYm94LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlUmVuZGVyID0gKHBsYXllcikgPT57XHJcbiAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyKS5jaGlsZE5vZGVzO1xyXG4gICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIn0pO1xyXG5cclxufVxyXG5jb25zdCBwbG90QWxsU2hpcHNSYW5kb21seSA9IChwbGF5ZXIpID0+IHBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBwbG90UmFuZG9tUGxhY2VtZW50KHBsYXllciwgc2hpcCkpO1xyXG5cclxuY29uc3QgcGxvdFJhbmRvbVBsYWNlbWVudCA9IChwbGF5ZXIpID0+eyAgIFxyXG4gICAgaWYoIXBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSl7XHJcbiAgICAgICAgcGxheWVyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgIHBsb3RTaGlwcyhwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLCBwbGF5ZXIuYm9hcmQpOyAgXHJcbiAgICAgICAgcmV0dXJuIHBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKTsgLy9yZXR1cm5zIHRydWVcclxuICAgIH0gZWxzZXtcclxuICAgICAgICBjbGVhckJvYXJkKHBsYXllcik7XHJcbiAgICAgICAgcGxvdFJhbmRvbVBsYWNlbWVudChwbGF5ZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjbGVhckJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICBwbGF5ZXIuYm9hcmQuY2xlYXJHcmlkKCk7XHJcbiAgICBwbGF5ZXIuYm9hcmQuY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKTtcclxuICAgIHJlbW92ZVJlbmRlcihwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIHJldHVybiBwbGF5ZXIuYm9hcmQuaXNBbGxTaGlwc0RlcGxveWVkKCk7IC8vcmV0dXJucyBmYWxzZVxyXG59XHJcblxyXG5jb25zdCByZW1vdmVBbGxDaGlsZE5vZGVzID0gKHBhcmVudCkgPT57XHJcbiAgICB3aGlsZShwYXJlbnQuZmlyc3RDaGlsZCl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyZW50KTtcclxuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IHBsb3RCYW5uZXIgPSAobWVzc2FnZSkgPT57XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vIGNvbnRhaW5lci5jbGFzc05hbWU9XCJib3R0b20tc3BhY2luZy0xXCI7XHJcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYm94LmlubmVySFRNTCA9IGA8aDI+JHttZXNzYWdlfTwvaDI+YFxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveCk7XHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcbmNvbnN0IHBsb3RUZXh0Qm94ID0gKHRleHQpID0+e1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInRleHQtYm94XCI7XHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYDxwPiR7dGV4dH08L3A+YDtcclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuY29uc3QgbG9hZEJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG5cclxuICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgfVxyXG5jb25zdCB1cGRhdGVCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgY29uc3QgcGFyc2VkUm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcImhpdFwiKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtwYXJzZWRSb3ddW3BhcnNlZENvbF0gPT09IFwibWlzc1wiKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICAgICB9IFxyXG4gICAgICAgfSk7XHJcbiAgIH1cclxuY29uc3QgbWlkZGxlU2VjdGlvbiA9IChzaGlwcykgPT57XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTmFtZT1cInNoaXBzQm94IHwgZGlzcGxheS1mbGV4LXJvdyBib3R0b20tc3BhY2luZy0xXCI7XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY3JlYXRlQm94LmNsYXNzTmFtZSA9IFwiZGlzcGxheS1mbGV4LXJvd1wiO1xyXG4gICAgICAgIGNyZWF0ZUJveC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPHA+JHtzaGlwLm5hbWV9PC9wPlxyXG4gICAgICAgIDxwPiR7c2hpcC5sZW5ndGggLSBzaGlwLmhpdHN9PC9wPmBcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUJveCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcbmNvbnN0IHBsb3RHYW1lID0gKGdhbWUpID0+e1xyXG4gICAgLy9nYW1lIC0+IHJldHVybnMgb2JqZWN0IG9mIHBsYXllcidzIGJvYXJkIGdhbWUucmVjZWl2ZXIoKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJwbGF5ZXJCb2FyZFwiO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsb3RCYW5uZXIoYCR7Z2FtZS5nZXRBdHRhY2tlcigpLm5hbWV9YCkpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1pZGRsZVNlY3Rpb24oZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLnNoaXBzKSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKGdhbWUuZ2V0UmVjZWl2ZXIoKSkpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsb3RUZXh0Qm94KGAke2dhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lfSdzIHR1cm4gdG8gYXR0YWNrICR7Z2FtZS5nZXRSZWNlaXZlcigpLm5hbWV9YCkpO1xyXG5cclxucmV0dXJuIGNvbnRhaW5lcjtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBwbG90U2hpcHMsIFxyXG4gICAgcGxvdFNoaXAsIFxyXG4gICAgcGxvdE1lc3NhZ2UsIFxyXG4gICAgcmVtb3ZlUmVuZGVyLFxyXG4gICAgcGxvdEFsbFNoaXBzUmFuZG9tbHksXHJcbiAgICBwbG90UmFuZG9tUGxhY2VtZW50LCBcclxuICAgIHJlbW92ZUFsbENoaWxkTm9kZXMsIFxyXG4gICAgY2xlYXJCb2FyZCxcclxuICAgIHBsb3RHYW1lLFxyXG4gICAgcGxvdFRleHRCb3gsXHJcbiAgICBwbG90QmFubmVyLFxyXG4gICAgdXBkYXRlQm9hcmQsXHJcbiAgICBsb2FkQm9hcmRcclxufVxyXG4iLCIvL0dlbmVyYXRlcyByYW5kb20gbnVtYmVyIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYW5kIHJvd3MuXHJcbmNvbnN0IGdlbmVyYXRlTnVtYmVyID0gKG1heCkgPT57XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgd2l0aGluIHRoZSBnYW1lIGJvYXJkXHJcbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBjb2wgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQuY29scyk7XHJcbiAgICBsZXQgcm93ID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLnJvd3MpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjb2wsIHJvd107XHJcbn1cclxuXHJcbi8vR2VuZXJhdGUgYSByYW5kb20gcGxhY2VtZW50IG9uIHRoZSBib2FyZC5cclxuY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKGdhbWVib2FyZCwgc2hpcCkgPT57XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInZlcnRpY2FsXCI6IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc2hpcC5vcmllbnRhdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdKSlcclxuICAgIHtcclxuICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWVib2FyZCwgc2hpcCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbi8vUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZFxyXG5jb25zdCBnZXRSYW5kb21Db29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+e1xyXG5cclxuICAgIGxldCByYW5kb21Db29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTsgLy9yZXR1cm5zIGFycmF5XHJcblxyXG4gICAgaWYgKGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwibWlzc1wiICYmIGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwiaGl0XCIgKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gcmFuZG9tQ29vcmRpbmF0ZXM7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHJldHVybiBnZXRSYW5kb21Db29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dldFJhbmRvbUNvb3JkaW5hdGVzLCByYW5kb21QbGFjZW1lbnR9IiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcbmNvbnN0IF9ERUZBVUxUX29yaWVudGF0aW9uICA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBfREVGQVVMVF9vcmllbnRhdGlvbjtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuZGVwbG95ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRPcmllbnRhdGlvbihpdGVtKXtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb247XHJcbiAgfVxyXG5cclxuICBoaXQoKXtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCl7XHJcblxyXG4gICAgaWYoKHRoaXMubGVuZ3RoIC0gdGhpcy5oaXRzKSA9PT0gMClcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBzdW5rYCk7XHJcbiAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBoaXQgJHt0aGlzLmhpdHN9IHRpbWUuYCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGUvc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvdW5kcy9BcHAuanNcIjtcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIEFwcC5sb2FkUGFnZSgpKTsiXSwibmFtZXMiOlsiQm9hcmQiLCJHYW1lIiwiUGxheWVyIiwicmFuZG9tUGxhY2VtZW50IiwicGxvdEdhbWUiLCJjbGVhckJvYXJkIiwibG9hZEJvYXJkIiwidXBkYXRlQm9hcmQiLCJwbG90U2hpcHMiLCJwbG90QWxsU2hpcHNSYW5kb21seSIsIkdhbWVTZXR1cCIsImxvYWQiLCJzZXR1cCIsInBsYXllcjFCb2FyZCIsInBsYXllcjJCb2FyZCIsImlzUGxheWVyVnNDb21wdXRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGVja2VkIiwiaXNQbGF5ZXJWc1BsYXllciIsImdldFBsYXllcjFOYW1lIiwidmFsdWUiLCJnZXRQbGF5ZXIyTmFtZSIsImdhbWUiLCJyZW1vdmVDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJzZXR1cEdhbWUiLCJjb25zb2xlIiwibG9nIiwiYWN0aXZhdGVTcXVhcmUiLCJwbGF5ZXIiLCJuYW1lIiwiZ2V0U3F1YXJlcyIsImNoaWxkTm9kZXMiLCJwbGFjZVNoaXBUb0JvYXJkIiwiZSIsInJvdyIsInBhcnNlSW50IiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiY29sIiwic2hpcCIsImJvYXJkIiwiZ2V0U2hpcCIsImdyaWQiLCJwbGFjZVNoaXAiLCJmb3JFYWNoIiwiaXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJwbGF5ZXJUdXJuIiwicGxheWVyMSIsInBsYXllcjIiLCJsb2FkU2V0dXBVSSIsInJhbmRvbVBsYWNlbWVudEJ0biIsImNsZWFyQnRuIiwiZG9uZUJ0biIsInNoaXBCdG5zIiwicXVlcnlTZWxlY3RvckFsbCIsInNoaXBCdG4iLCJmaW5pc2hlZFNldHVwQnRuIiwiaXNIdW1hbiIsInNoaXBzIiwicGxheSIsImdldFJvb3QiLCJ3aW5uZXIiLCJhcHBlbmRDaGlsZCIsImdldFJlY2VpdmVyIiwiZ2V0QXR0YWNrZXIiLCJzcXVhcmVzIiwiY3VycmVudFRhcmdldCIsImF0dGFjayIsIm5leHRUdXJuIiwicmFuZG9tQXR0YWNrIiwic2V0VGltZW91dCIsImdldEN1cnJlbnRUdXJuT3Bwb25lbnQiLCJNZW51Iiwicm9vdCIsIlVJIiwibG9hZEhhbmRsZXJzIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImdldFJhZGlvcyIsInN1Ym1pdCIsImRpc2FibGVkIiwiQXBwIiwibG9hZFBhZ2UiLCJhZGRIYW5kbGVyIiwicmVtb3ZlSGFuZGxlciIsInBsb3RNZXNzYWdlIiwiYmFubmVyIiwibWVzc2FnZSIsImxvYWRCdXR0b25zIiwiYnV0dG9ucyIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwidG9Mb3dlckNhc2UiLCJnZXRHYW1lYm9hcmQiLCJpIiwicm93cyIsImoiLCJjb2xzIiwic3F1YXJlIiwicGFyc2VkUm93IiwicGFyc2VkQ29sIiwiY2xhc3NMaXN0IiwiYWRkIiwibG9hZFN0YXJ0QnV0dG9uIiwic3RhcnRCdG4iLCJzaGlwTWVudSIsImNyZWF0ZUJ0biIsImlkIiwiaGFuZGxlTG9hZFNoaXBCdG4iLCJoYW5kbGVTcXVhcmVDbGljayIsImNvbnN0cnVjdG9yIiwidHVybiIsInVzZXJJbnRlcmZhY2UiLCJzaGlwTWVudUJvYXJkQ29udGFpbmVyIiwiU2hpcCIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJjbGVhckdyaWQiLCJjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCIsImlzVmFsaWQiLCJvcmllbnRhdGlvbiIsImluZGV4IiwiZGVwbG95Iiwic2hpcE5hbWUiLCJyZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJoaXQiLCJnZXRNYXhIaXRzIiwic3VtIiwiZ2V0SGl0cyIsImhpdHMiLCJjaGVja3NEaWZmZXJlbmNlIiwiaXNHYW1lT3ZlciIsImlzQWxsU2hpcHNEZXBsb3llZCIsIm1hcCIsImdldFJhbmRvbUNvb3JkaW5hdGVzIiwicGxvdFNoaXAiLCJnYW1lYm9hcmQiLCJvcHBvbmVudEJvYXJkIiwicGxhY2VSYW5kb21Ub0JvYXJkIiwiZW5lbXlCb2FyZE5hbWUiLCJwbG90IiwiY29vcmRpbmF0ZXMiLCJib2FyZE5hbWUiLCJjcmVhdGVJZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJib3giLCJyZW1vdmVSZW5kZXIiLCJwbG90UmFuZG9tUGxhY2VtZW50IiwicmVtb3ZlQWxsQ2hpbGROb2RlcyIsInBhcmVudCIsImZpcnN0Q2hpbGQiLCJwbG90QmFubmVyIiwicGxvdFRleHRCb3giLCJ0ZXh0IiwibWlkZGxlU2VjdGlvbiIsImNyZWF0ZUJveCIsImdlbmVyYXRlTnVtYmVyIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2VuZXJhdGVDb29yZGluYXRlcyIsImRpcmVjdGlvbiIsInJhbmRvbUNvb3JkaW5hdGVzIiwidjQiLCJ1dWlkdjQiLCJfREVGQVVMVF9vcmllbnRhdGlvbiIsInNldE9yaWVudGF0aW9uIiwiaXNTdW5rIl0sInNvdXJjZVJvb3QiOiIifQ==