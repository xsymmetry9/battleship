/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Section/GameSetup.js":
/*!**********************************!*\
  !*** ./src/Section/GameSetup.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameSetup)
/* harmony export */ });
/* harmony import */ var _compounds_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../compounds/Gameboard */ "./src/compounds/Gameboard.js");
/* harmony import */ var _compounds_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../compounds/Game */ "./src/compounds/Game.js");
/* harmony import */ var _compounds_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../compounds/Player */ "./src/compounds/Player.js");
/* harmony import */ var _compounds_Random__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../compounds/Random */ "./src/compounds/Random.js");
/* harmony import */ var _compounds_Functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../compounds/Functions */ "./src/compounds/Functions.js");
/* harmony import */ var _compounds_Plot__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../compounds/Plot */ "./src/compounds/Plot.js");






const removeWindow = item => {
  document.getElementById("root").removeChild(document.querySelector(item));
};
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
      const player1 = new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player1Name").value, player1Board, player2Board, true);
      const player2 = isPlayerVsComputer ? new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"]("computer", player2Board, player1Board, false) : new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player2Name").value, player2Board, player1Board, true);
      const game = new _compounds_Game__WEBPACK_IMPORTED_MODULE_1__["default"](player1, player2);
      removeWindow(".menu-box");
      this.setupGame(game, "player 1");
      return game;
    } else {
      console.log("error");
      return "error";
    }
  }
  static userSelectShip(player) {
    let draggedShip;
    document.querySelectorAll(".ship-btn").forEach(button => {
      const ship = player.board.getShip(button.getAttribute("value"));
      button.setAttribute("draggable", !ship.deploy);
    });
    document.querySelectorAll(".ship-btn[draggable='true']").forEach(button => {
      button.addEventListener("dragstart", e => {
        draggedShip = player.board.getShip(e.currentTarget.getAttribute("value"));
        e.currentTarget.classList.add("valid");
      });
      button.addEventListener("dragend", e => {
        e.preventDefault();
        e.currentTarget.classList.remove("valid");
      });
    });
    document.querySelectorAll(".square").forEach(target => {
      target.addEventListener("dragover", e => {
        e.preventDefault();
      });
      target.addEventListener("dragenter", e => {
        const row = parseInt(e.currentTarget.getAttribute("row"));
        const col = parseInt(e.currentTarget.getAttribute("col"));
        if (e.currentTarget.classList.contains("dropzone")) {
          player.board.isValid(draggedShip, row, col, "horizontal") ? e.currentTarget.classList.add("valid") : e.currentTarget.classList.add("invalid");
        }
      });
      target.addEventListener("dragleave", e => {
        if (e.currentTarget.classList.contains("dropzone")) {
          e.currentTarget.classList.remove("valid");
          e.currentTarget.classList.remove("invalid");
        }
      });
      target.addEventListener("drop", e => {
        const row = parseInt(e.currentTarget.getAttribute("row"));
        const col = parseInt(e.currentTarget.getAttribute("col"));
        if (e.currentTarget.classList.contains("valid")) {
          player.board.placeShip(draggedShip, row, col, draggedShip.orientation);
          (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.updatePlotBoard)(player);
          console.log("Ship placed successfully.");
        } else {
          console.log("Invalid placement. There is already a ship in that location.");
        }
        e.currentTarget.classList.remove("valid");
        e.currentTarget.classList.remove("invalid");
      });
    });
  }
  static setupGame(game, playerTurn) {
    const player = playerTurn === "player 1" ? game.player1 : game.player2;
    game.loadSetupUI(player);
    (0,_compounds_Functions__WEBPACK_IMPORTED_MODULE_4__.addBoardHandler)(player);
    const randomPlacementBtn = document.getElementById("random-placement");
    const clearBtn = document.getElementById("clear-board");
    const doneBtn = document.querySelector(".start-btn");
    this.userSelectShip(player);
    randomPlacementBtn.addEventListener("click", () => {
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.plotAllShipsRandomly)(player);
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.updatePlotBoard)(player);
    });
    clearBtn.addEventListener("click", () => {
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.clearBoard)(player);
      this.userSelectShip(player);
    });
    doneBtn.addEventListener("click", () => this.finishedSetupBtn(game, playerTurn));
    return player;
  }
  static finishedSetupBtn(game, playerTurn) {
    removeWindow(".setup-menu");
    if (game.player2.isHuman && playerTurn === "player 1") {
      this.setupGame(game, "player 2");
    } else {
      game.player2.board.ships.forEach(ship => {
        (0,_compounds_Random__WEBPACK_IMPORTED_MODULE_3__.randomPlacement)(game.player2.board, ship);
      });
      this.play(game);
    }
  }
  static reset(game, window) {
    game.player1.board.reset();
    game.player2.board.reset();
    game.winner = null;
    game.turn = 1;
    removeWindow(window);
    this.setupGame(game, "player 1");
  }
  static play(game) {
    const getRoot = document.getElementById("root");
    if (game.winner != null) {
      getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.loadPlayAgainMenu)(game.getAttacker().name, game.getReceiver().name));
      document.getElementById("play-again").addEventListener("click", () => this.reset(game, ".menu-box"));
      return;
    }
    getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.plotGame)(game));
    (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.updateBoard)(game.getReceiver());
    if (game.getAttacker().isHuman) {
      document.querySelectorAll(".square").forEach(item => {
        const col = parseInt(item.getAttribute("col"));
        const row = parseInt(item.getAttribute("row"));
        if (game.getReceiver().board.grid[row][col] === "hit" || game.getReceiver().board.grid[row][col] === "miss") {
          return;
        }
        item.addEventListener("click", e => {
          const row = parseInt(e.currentTarget.getAttribute("row"));
          const col = parseInt(e.currentTarget.getAttribute("col"));
          game.getAttacker().attack(game.getReceiver().name, row, col);
          getRoot.removeChild(document.querySelector(".playerBoard"));
          if (game.getReceiver().board.isGameOver()) {
            game.setWinner(game.getAttacker().name);
          } else {
            game.nextTurn();
          }
          this.play(game);
        });
      });
    } else {
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.plotShips)(game.getReceiver().name, game.getReceiver().board);
      game.getAttacker().randomAttack(game.getReceiver().name);
      setTimeout(() => {
        getRoot.removeChild(document.querySelector(".playerBoard"));
        if (game.getReceiver().board.isGameOver()) {
          game.setWinner(game.getAttacker().name);
        } else {
          game.nextTurn();
        }
        this.play(game);
      }, 1000);
    }
    return game.getCurrentTurnOpponent();
  }
}

/***/ }),

/***/ "./src/Section/Menu.js":
/*!*****************************!*\
  !*** ./src/Section/Menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _Section_Menu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Section/Menu */ "./src/Section/Menu.js");

class App {
  static loadPage() {
    _Section_Menu__WEBPACK_IMPORTED_MODULE_0__["default"].load();
  }
}

/***/ }),

/***/ "./src/compounds/Functions.js":
/*!************************************!*\
  !*** ./src/compounds/Functions.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addBoardHandler: () => (/* binding */ addBoardHandler)
/* harmony export */ });
/* harmony import */ var _Plot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Plot */ "./src/compounds/Plot.js");

const addBoardHandler = player => {
  const squares = document.querySelectorAll(".square");
  squares.forEach(square => square.addEventListener("click", e => handleOrientation(e, player)));
};
const handleOrientation = (e, player) => {
  if (e.currentTarget.classList.contains("ship")) {
    setOrientation(e, player);
  }
};
const setOrientation = (e, player) => {
  const row = parseInt(e.currentTarget.getAttribute("row"));
  const col = parseInt(e.currentTarget.getAttribute("col"));
  const ship = player.board.getShipInfo(row, col);
  const start = ship.coordinates[0]; // Ensure 'coordinates' is correctly named
  const newOrientation = ship.orientation === "horizontal" ? "vertical" : "horizontal"; // Toggle orientation

  player.board.deleteShip(ship);
  if (player.board.isValid(ship, start[0], start[1], newOrientation)) {
    player.board.placeShip(ship, start[0], start[1], newOrientation);
    ship.setOrientation(newOrientation);
  } else {
    player.board.placeShip(ship, start[0], start[1], ship.orientation);
    console.log("Orientation change not valid, reverting to original orientation.");
  }
  (0,_Plot__WEBPACK_IMPORTED_MODULE_0__.updatePlotBoard)(player);
};


/***/ }),

/***/ "./src/compounds/Game.js":
/*!*******************************!*\
  !*** ./src/compounds/Game.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _style_game_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/game.scss */ "./src/style/game.scss");

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
  randomPlacementBtn.textContent = "Random";
  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear";
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
      square.className = "square dropzone";
      square.setAttribute("row", i);
      square.setAttribute("col", j);
      square.setAttribute("id", `${player.name.toLowerCase()}-${i}-${j}`);
      container.appendChild(square);
    }
  }
  return container;
};
const updateBoard = player => {
  const getSquares = document.querySelectorAll(".gameboard .square");
  getSquares.forEach(item => {
    const parsedRow = item.getAttribute("row");
    const parsedCol = item.getAttribute("col");
    const gridValue = player.board.grid[parsedRow][parsedCol];
    item.classList.remove("hit", "miss");
    if (gridValue === "hit") {
      item.classList.add("hit");
    } else if (gridValue === "miss") {
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
    const createBtn = document.createElement("div");
    createBtn.className = "ship-btn draggable";
    createBtn.setAttribute("id", ship.id);
    createBtn.setAttribute("value", ship.name);
    createBtn.setAttribute("draggable", true);
    createBtn.textContent = ship.name;
    createBtn.addEventListener("click", e => handleLoadShipBtn(e, player));
    container.appendChild(createBtn);
  });
  return container;
};
const handleLoadShipBtn = (e, player) => {
  const ship = player.board.getShip(e.currentTarget.getAttribute("value"));
  console.log(ship);
  const getSquares = document.getElementById(player.name.toLowerCase()).childNodes;
  getSquares.forEach(item => {
    item.addEventListener("click", e => handleSquareClick(e, ship, player));
  });
};
const handleSquareClick = (e, ship, player) => {
  const col = parseInt(e.currentTarget.getAttribute("col"));
  const row = parseInt(e.currentTarget.getAttribute("row"));
  if (player.board.placeShip(ship, row, col, "horizontal")) {
    updateBoard(player);
  } else {
    console.error("Invalid placement");
  }
};
const root = document.getElementById("root");
class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.winner = null;
    this.turn = 1;
  }
  getAttacker() {
    return this.turn % 2 !== 0 ? this.player1 : this.player2;
  }
  getReceiver() {
    return this.turn % 2 !== 0 ? this.player2 : this.player1;
  }
  getCurrentTurnOpponent() {
    return this.getAttacker().name === this.player1.name ? "player2" : "player1";
  }
  nextTurn() {
    this.turn++;
    return this.turn;
  }
  setWinner(winner) {
    this.winner = winner;
  }
  loadSetupUI(player) {
    const userInterface = document.createElement("div");
    userInterface.className = "setup-menu";
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
    this.ships = [new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Assault Ship", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Aircraft Carrier", 5), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Destroyer", 7), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Cruiser", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Submarine", 4)];
  }
  reset() {
    this.clearGrid();
    this.isAllShipsDeployed();
  }
  //Clears the board.
  clearGrid() {
    this.grid.forEach(row => row.fill(null));
    this.changeAllShiptoNotDeployed();
  }
  //Checks if there are any ships on the board and if it fits.
  isValid(ship, row, col, orientation) {
    if (orientation === "horizontal") {
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
    } else if (orientation === "vertical") {
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
  placeShip(ship, row, col, orientation) {
    if (!this.isValid(ship, row, col, orientation)) return ship.deploy; //false

    if (orientation === "horizontal") {
      //checks for overlaps or out of bounds
      for (let index = 0; index < ship.length; index++) {
        this.grid[row][col + index] = ship;
        ship.coordinate.push([row, col + index]);
      }
      ship.deploy = true;
      return ship.deploy;
    } else if (orientation === "vertical") {
      //direction is horizontal
      //if everything passes, place the ship vertically
      for (let index = 0; index < ship.length; index++) {
        this.grid[row + index][col] = ship;
        ship.coordinate.push([row + index, col]);
      }
      ship.deploy = true;
      return ship.deploy;
    } else {
      return ship.deploy;
    }
  }
  getShipInfo(row, col) {
    return this.grid[row][col];
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
  deleteShip(shipName) {
    shipName.coordinate.forEach(item => {
      const row = item[0];
      const col = item[1];
      this.grid[row][col] = null;
    });
    return this.grid;
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random */ "./src/compounds/Random.js");

class Player {
  constructor(name, gameboard, opponentBoard, isHuman) {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
  }

  // Player chooses to attack on the opponent's board.
  attack(enemyBoardName, row, col) {
    const plot = document.getElementById(`${enemyBoardName}-${row}-${col}`);
    if (!plot) {
      console.error("Invalid plot ID");
      return false;
    }
    if (plot.classList.contains("hit") || plot.classList.contains("miss")) {
      console.warn("Already attacked this position");
      return false;
    }
    const attackResult = this.opponentBoard.receiveAttack(row, col);
    this.updateAttackResult(plot, attackResult);
    return attackResult === "hit";
  }

  // Player chooses to attack randomly on the opponent's board.
  randomAttack(enemyBoardName) {
    const [row, col] = (0,_Random__WEBPACK_IMPORTED_MODULE_0__.getRandomCoordinates)(this.opponentBoard);
    console.log("Random attack executed");
    return this.attack(enemyBoardName, row, col);
  }

  // Update the UI based on the attack result
  updateAttackResult(plot, result) {
    if (result === "hit") {
      plot.classList.add("hit");
    } else if (result === "miss") {
      plot.classList.add("miss");
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/compounds/Plot.js":
/*!*******************************!*\
  !*** ./src/compounds/Plot.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearBoard: () => (/* binding */ clearBoard),
/* harmony export */   loadPlayAgainMenu: () => (/* binding */ loadPlayAgainMenu),
/* harmony export */   plotAllShipsRandomly: () => (/* binding */ plotAllShipsRandomly),
/* harmony export */   plotGame: () => (/* binding */ plotGame),
/* harmony export */   plotShip: () => (/* binding */ plotShip),
/* harmony export */   plotShips: () => (/* binding */ plotShips),
/* harmony export */   updateBoard: () => (/* binding */ updateBoard),
/* harmony export */   updatePlotBoard: () => (/* binding */ updatePlotBoard)
/* harmony export */ });
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random */ "./src/compounds/Random.js");

const plotShip = (name, ship, row, col, orientation, board) => {
  const addShipClass = elementId => {
    const square = document.getElementById(elementId);
    if (square) square.classList.add("ship");
  };
  if (orientation === "horizontal") {
    for (let index = 0; index < ship.length; index++) {
      addShipClass(`${name.toLowerCase()}-${row}-${col + index}`);
    }
  } else if (orientation === "vertical") {
    for (let index = 0; index < ship.length; index++) {
      addShipClass(`${name.toLowerCase()}-${row + index}-${col}`);
    }
  } else {
    console.error("Invalid orientation");
    return "Plotting didn't work.";
  }
  return {
    name: name,
    row: row,
    col: col,
    orientation: orientation
  };
};
const plotShips = (boardName, gameboard) => {
  const getSquares = document.getElementById(boardName.toLowerCase()).childNodes;
  getSquares.forEach(square => {
    const col = square.getAttribute("col");
    const row = square.getAttribute("row");
    if (gameboard.grid[row][col] !== null) {
      square.classList.add("ship");
    }
  });
  return getSquares;
};
const updatePlotBoard = player => {
  const getName = player.name.toLowerCase();
  player.board.grid.forEach((row, rowNum) => {
    row.forEach((column, colNum) => {
      const square = document.getElementById(`${getName}-${rowNum}-${colNum}`);
      if (square) {
        square.className = column !== null ? "square ship" : "square dropzone";
      }
    });
  });
};
const removeRender = player => {
  const squares = document.getElementById(player).childNodes;
  squares.forEach(square => {
    square.className = "square dropzone";
  });
};
const plotAllShipsRandomly = player => {
  player.board.ships.forEach(ship => {
    if (!ship.deploy) {
      (0,_Random__WEBPACK_IMPORTED_MODULE_0__.randomPlacement)(player.board, ship);
    }
  });
  return player.board;
};
const clearBoard = player => {
  player.board.clearGrid();
  player.board.changeAllShiptoNotDeployed();
  removeRender(player.name.toLowerCase());
  return player.board.isAllShipsDeployed(); // returns false
};
const loadBoard = player => {
  const container = document.createElement("div");
  container.className = "gameboard";
  container.setAttribute("id", player.name.toLowerCase());
  for (let i = 0; i < player.board.rows; i++) {
    for (let j = 0; j < player.board.cols; j++) {
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

// ------------------------------- Plots Game board UI ------------------------------------
const plotBanner = message => {
  const container = document.createElement("div");
  const box = document.createElement("div");
  box.innerHTML = `<h2>${message}</h2>`;
  container.appendChild(box);
  return container;
};
const plotGame = game => {
  const container = document.createElement("div");
  container.className = "playerBoard";
  container.appendChild(plotBanner(`${game.getAttacker().name}`));
  container.appendChild(loadBoard(game.getReceiver()));
  return container;
};

// ----------------------------------Play again Menu ---------------------------------------

const loadPlayAgainMenu = (winner, loser) => {
  const playAgainMenu = document.createElement("div");
  playAgainMenu.className = "menu-box";
  playAgainMenu.innerHTML = `
    <h2>${winner} has defeated ${loser}</h2>
    <p>Would you like to play again?</p>
    <button class="" id="play-again">Play Again</button>
  `;
  return playAgainMenu;
};


/***/ }),

/***/ "./src/compounds/Random.js":
/*!*********************************!*\
  !*** ./src/compounds/Random.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRandomCoordinates: () => (/* binding */ getRandomCoordinates),
/* harmony export */   randomPlacement: () => (/* binding */ randomPlacement)
/* harmony export */ });
// Generates a random number depending on the number of columns and rows.
const generateNumber = max => {
  return Math.floor(Math.random() * max);
};

// Generate random coordinates within the game board.
const generateCoordinates = gameboard => {
  let col = generateNumber(gameboard.cols);
  let row = generateNumber(gameboard.rows);
  return [row, col];
};

// Generate a random placement on the board.
const randomPlacement = (gameboard, ship) => {
  let placed = false;
  while (!placed) {
    const [row, col] = generateCoordinates(gameboard);
    const orientation = Math.random() < 0.5 ? "vertical" : "horizontal";
    if (gameboard.isValid(ship, row, col, orientation)) {
      placed = gameboard.placeShip(ship, row, col, orientation);
    }
  }
};

// Perform a random attack on the gameboard.
const getRandomCoordinates = gameboard => {
  let validCoordinates = false;
  let coordinates;
  while (!validCoordinates) {
    coordinates = generateCoordinates(gameboard);
    if (gameboard.grid[coordinates[0]][coordinates[1]] !== "miss" && gameboard.grid[coordinates[0]][coordinates[1]] !== "hit") {
      validCoordinates = true;
    }
  }
  return coordinates;
};


/***/ }),

/***/ "./src/compounds/Ship.js":
/*!*******************************!*\
  !*** ./src/compounds/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
    this.coordinate = [];
    this.orientation = _DEFAULT_orientation;
    this.length = length;
    this.hits = 0;
    this.deploy = false;
  }
  hit = () => this.hits++;
  isSunk = () => this.length - this.hits === 0 ? true : false;
  deleteCoordinates = () => this.coordinate.splice(0, this.coordinate.length); //returns an empty array 

  toggleOrientation = () => this.orientation === "horizontal" ? this.setOrientation("vertical") : this.setOrientation("horizontal");
  setOrientation = newOrientation => this.orientation = newOrientation;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/style/game.scss":
/*!*****************************!*\
  !*** ./src/style/game.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/menu.scss":
/*!*****************************!*\
  !*** ./src/style/menu.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aENTO0FBQ047QUFDc0I7O0FBRWpEO0FBQ0EsTUFBTSxrREFBTTtBQUNaLFdBQVcsa0RBQU07QUFDakI7O0FBRUE7QUFDQSxpREFBaUQsK0NBQUcsS0FBSzs7QUFFekQ7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsOERBQWU7QUFDeEI7O0FBRUEsaUVBQWUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FDNUJjOztBQUUvQjtBQUNBLHFDQUFxQyxpREFBSztBQUMxQzs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7VUNOdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONEI7QUFDUztBQUVyQzNGLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFb0QseURBQUcsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHMvLi9zcmMvU2VjdGlvbi9HYW1lU2V0dXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvU2VjdGlvbi9NZW51LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9BcHAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvR2FtZS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1Bsb3QuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1JhbmRvbS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvU2hpcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9nYW1lLnNjc3M/Njg0OCIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9tZW51LnNjc3M/NjdjMCIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9scy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9hcmQgZnJvbSBcIi4uL2NvbXBvdW5kcy9HYW1lYm9hcmRcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2NvbXBvdW5kcy9HYW1lXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL2NvbXBvdW5kcy9QbGF5ZXJcIjtcclxuaW1wb3J0IHsgcmFuZG9tUGxhY2VtZW50IH0gZnJvbSBcIi4uL2NvbXBvdW5kcy9SYW5kb21cIjtcclxuaW1wb3J0IHsgYWRkQm9hcmRIYW5kbGVyIH0gZnJvbSBcIi4uL2NvbXBvdW5kcy9GdW5jdGlvbnNcIjtcclxuaW1wb3J0IHtcclxuICAgIHBsb3RHYW1lLFxyXG4gICAgY2xlYXJCb2FyZCxcclxuICAgIHVwZGF0ZUJvYXJkLFxyXG4gICAgdXBkYXRlUGxvdEJvYXJkLFxyXG4gICAgcGxvdFNoaXBzLFxyXG4gICAgcGxvdEFsbFNoaXBzUmFuZG9tbHksXHJcbiAgICBsb2FkUGxheUFnYWluTWVudSxcclxufSBmcm9tICcuLi9jb21wb3VuZHMvUGxvdCc7XHJcblxyXG5jb25zdCByZW1vdmVXaW5kb3cgPSAoaXRlbSkgPT4ge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbSkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNldHVwIHtcclxuICAgIHN0YXRpYyBsb2FkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0dXAoKSB7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMUJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMkJvYXJkID0gbmV3IEJvYXJkKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNDb21wdXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidnNDb21wdXRlclwiKS5jaGVja2VkO1xyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZzUGxheWVyXCIpLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgIGlmIChpc1BsYXllclZzUGxheWVyIHx8IGlzUGxheWVyVnNDb21wdXRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFOYW1lXCIpLnZhbHVlLCBwbGF5ZXIxQm9hcmQsIHBsYXllcjJCb2FyZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcjIgPSBpc1BsYXllclZzQ29tcHV0ZXIgPyBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyMkJvYXJkLCBwbGF5ZXIxQm9hcmQsIGZhbHNlKSA6XHJcbiAgICAgICAgICAgICAgICBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikudmFsdWUsIHBsYXllcjJCb2FyZCwgcGxheWVyMUJvYXJkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShwbGF5ZXIxLCBwbGF5ZXIyKTtcclxuICAgICAgICAgICAgcmVtb3ZlV2luZG93KFwiLm1lbnUtYm94XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAxXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdhbWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3JcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHVzZXJTZWxlY3RTaGlwKHBsYXllcikge1xyXG4gICAgICAgIGxldCBkcmFnZ2VkU2hpcDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWJ0blwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSk7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgIXNoaXAuZGVwbG95KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWJ0bltkcmFnZ2FibGU9J3RydWUnXVwiKS5mb3JFYWNoKChidXR0b24pID0+IHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGRyYWdnZWRTaGlwID0gcGxheWVyLmJvYXJkLmdldFNoaXAoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKFwidmFsaWRcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIikuZm9yRWFjaCgodGFyZ2V0KSA9PiB7XHJcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHpvbmVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYm9hcmQuaXNWYWxpZChkcmFnZ2VkU2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKSA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKFwidmFsaWRcIikgOiBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZHJvcHpvbmVcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwiaW52YWxpZFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2YWxpZFwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoZHJhZ2dlZFNoaXAsIHJvdywgY29sLCBkcmFnZ2VkU2hpcC5vcmllbnRhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGxvdEJvYXJkKHBsYXllcik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaGlwIHBsYWNlZCBzdWNjZXNzZnVsbHkuXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkludmFsaWQgcGxhY2VtZW50LiBUaGVyZSBpcyBhbHJlYWR5IGEgc2hpcCBpbiB0aGF0IGxvY2F0aW9uLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0dXBHYW1lKGdhbWUsIHBsYXllclR1cm4pIHtcclxuICAgICAgICBjb25zdCBwbGF5ZXIgPSBwbGF5ZXJUdXJuID09PSBcInBsYXllciAxXCIgPyBnYW1lLnBsYXllcjEgOiBnYW1lLnBsYXllcjI7XHJcbiAgICAgICAgZ2FtZS5sb2FkU2V0dXBVSShwbGF5ZXIpO1xyXG5cclxuICAgICAgICBhZGRCb2FyZEhhbmRsZXIocGxheWVyKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb20tcGxhY2VtZW50XCIpO1xyXG4gICAgICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKTtcclxuICAgICAgICBjb25zdCBkb25lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1idG5cIik7XHJcblxyXG4gICAgICAgIHRoaXMudXNlclNlbGVjdFNoaXAocGxheWVyKTtcclxuXHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsb3RBbGxTaGlwc1JhbmRvbWx5KHBsYXllcik7XHJcbiAgICAgICAgICAgIHVwZGF0ZVBsb3RCb2FyZChwbGF5ZXIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjbGVhckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhckJvYXJkKHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMudXNlclNlbGVjdFNoaXAocGxheWVyKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5maW5pc2hlZFNldHVwQnRuKGdhbWUsIHBsYXllclR1cm4pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZmluaXNoZWRTZXR1cEJ0bihnYW1lLCBwbGF5ZXJUdXJuKSB7XHJcbiAgICAgICAgcmVtb3ZlV2luZG93KFwiLnNldHVwLW1lbnVcIik7XHJcblxyXG4gICAgICAgIGlmIChnYW1lLnBsYXllcjIuaXNIdW1hbiAmJiBwbGF5ZXJUdXJuID09PSBcInBsYXllciAxXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cEdhbWUoZ2FtZSwgXCJwbGF5ZXIgMlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnYW1lLnBsYXllcjIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWUucGxheWVyMi5ib2FyZCwgc2hpcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyByZXNldChnYW1lLCB3aW5kb3cpIHtcclxuICAgICAgICBnYW1lLnBsYXllcjEuYm9hcmQucmVzZXQoKTtcclxuICAgICAgICBnYW1lLnBsYXllcjIuYm9hcmQucmVzZXQoKTtcclxuICAgICAgICBnYW1lLndpbm5lciA9IG51bGw7XHJcbiAgICAgICAgZ2FtZS50dXJuID0gMTtcclxuICAgICAgICByZW1vdmVXaW5kb3cod2luZG93KTtcclxuICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAxXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBwbGF5KGdhbWUpIHtcclxuICAgICAgICBjb25zdCBnZXRSb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICBpZiAoZ2FtZS53aW5uZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBnZXRSb290LmFwcGVuZENoaWxkKGxvYWRQbGF5QWdhaW5NZW51KGdhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lLCBnYW1lLmdldFJlY2VpdmVyKCkubmFtZSkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXktYWdhaW5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMucmVzZXQoZ2FtZSwgXCIubWVudS1ib3hcIikpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXRSb290LmFwcGVuZENoaWxkKHBsb3RHYW1lKGdhbWUpKTtcclxuICAgICAgICB1cGRhdGVCb2FyZChnYW1lLmdldFJlY2VpdmVyKCkpO1xyXG5cclxuICAgICAgICBpZiAoZ2FtZS5nZXRBdHRhY2tlcigpLmlzSHVtYW4pIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIikuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gPT09IFwiaGl0XCIgfHwgZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLmdyaWRbcm93XVtjb2xdID09PSBcIm1pc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuZ2V0QXR0YWNrZXIoKS5hdHRhY2soZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUsIHJvdywgY29sKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSb290LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuaXNHYW1lT3ZlcigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWUuc2V0V2lubmVyKGdhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lLm5leHRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbG90U2hpcHMoZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUsIGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZCk7XHJcbiAgICAgICAgICAgIGdhbWUuZ2V0QXR0YWNrZXIoKS5yYW5kb21BdHRhY2soZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGdldFJvb3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLmlzR2FtZU92ZXIoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuc2V0V2lubmVyKGdhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS5uZXh0VHVybigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KGdhbWUpO1xyXG4gICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdhbWUuZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAnLi4vc3R5bGUvbWVudS5zY3NzJ1xyXG5pbXBvcnQgR2FtZVNldHVwIGZyb20gXCIuL0dhbWVTZXR1cFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVudXtcclxuICAgIHN0YXRpYyBsb2FkKCl7XHJcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMuVUkoKSk7XHJcbiAgICAgICAgdGhpcy5sb2FkSGFuZGxlcnMoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBVSSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVudS1ib3hcIjtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGgxIGNsYXNzPVwidGV4dC1jZW50ZXJlZFwiPldlbGNvbWUgdG8gQmF0dGxlc2hpcDwvaDE+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJnYW1lRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwbGF5ZXIxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5QbGF5ZXIgMTo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGxheWVyMU5hbWVcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiIGlkPVwicGxheWVyMklucHV0XCIgc3R5bGU9XCJkaXNwbGF5OiBibG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwbGF5ZXIyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGVzY3JpcHRpb25cIj5QbGF5ZXIgMjo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwicGxheWVyMk5hbWVcIiBkaXNhYmxlZC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJnYW1lTW9kZVwiIGNsYXNzPVwiZ2FtZU1vZGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQgPVwidnNDb21wdXRlclwiIG5hbWU9XCJnYW1lTW9kZVwiIHZhbHVlPVwiY29tcHV0ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidnNDb21wdXRlclwiPlBsYXllciB2cyBDb21wdXRlcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwidnNQbGF5ZXJcIiBuYW1lPVwiZ2FtZU1vZGVcIiB2YWx1ZT1cInBsYXllclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ2c1BsYXllclwiPlBsYXllciB2cyBQbGF5ZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ1dHRvbnMtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym1pdC1idG5cIiB0eXBlPVwic3VibWl0XCI+U3RhcnQgR2FtZTwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICBcclxuICAgICAgICBgXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkSGFuZGxlcnMoKXtcclxuICAgICAgICBjb25zdCBnZXRSYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVNb2RlIGlucHV0XCIpO1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0LWJ0blwiKTtcclxuXHJcbiAgICAgICAgZ2V0UmFkaW9zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNoYW5nZVwiKSwgKCkgPT57XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtLmdldEF0dHJpYnV0ZShcImlkXCIpID09PSBcInZzUGxheWVyXCIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyTmFtZVwiKS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IEdhbWVTZXR1cC5sb2FkKCkpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgTWVudSBmcm9tICcuLi9TZWN0aW9uL01lbnUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwe1xyXG4gICAgc3RhdGljIGxvYWRQYWdlKCl7XHJcbiAgICAgICAgTWVudS5sb2FkKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IHVwZGF0ZVBsb3RCb2FyZCB9IGZyb20gXCIuL1Bsb3RcIjtcclxuXHJcbmNvbnN0IGFkZEJvYXJkSGFuZGxlciA9IChwbGF5ZXIpID0+IHtcclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcclxuICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoYW5kbGVPcmllbnRhdGlvbihlLCBwbGF5ZXIpKSk7XHJcbn1cclxuXHJcbmNvbnN0IGhhbmRsZU9yaWVudGF0aW9uID0gKGUsIHBsYXllcikgPT4ge1xyXG4gICAgaWYgKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XHJcbiAgICAgICAgc2V0T3JpZW50YXRpb24oZSwgcGxheWVyKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3Qgc2V0T3JpZW50YXRpb24gPSAoZSwgcGxheWVyKSA9PiB7XHJcbiAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTtcclxuICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwSW5mbyhyb3csIGNvbCk7XHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSBzaGlwLmNvb3JkaW5hdGVzWzBdOyAvLyBFbnN1cmUgJ2Nvb3JkaW5hdGVzJyBpcyBjb3JyZWN0bHkgbmFtZWRcclxuICAgIGNvbnN0IG5ld09yaWVudGF0aW9uID0gc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjsgLy8gVG9nZ2xlIG9yaWVudGF0aW9uXHJcblxyXG4gICAgcGxheWVyLmJvYXJkLmRlbGV0ZVNoaXAoc2hpcCk7XHJcblxyXG4gICAgaWYgKHBsYXllci5ib2FyZC5pc1ZhbGlkKHNoaXAsIHN0YXJ0WzBdLCBzdGFydFsxXSwgbmV3T3JpZW50YXRpb24pKSB7XHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwLCBzdGFydFswXSwgc3RhcnRbMV0sIG5ld09yaWVudGF0aW9uKTtcclxuICAgICAgICBzaGlwLnNldE9yaWVudGF0aW9uKG5ld09yaWVudGF0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwLCBzdGFydFswXSwgc3RhcnRbMV0sIHNoaXAub3JpZW50YXRpb24pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiT3JpZW50YXRpb24gY2hhbmdlIG5vdCB2YWxpZCwgcmV2ZXJ0aW5nIHRvIG9yaWdpbmFsIG9yaWVudGF0aW9uLlwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBkYXRlUGxvdEJvYXJkKHBsYXllcik7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGFkZEJvYXJkSGFuZGxlciB9XHJcbiIsImltcG9ydCBcIi4uL3N0eWxlL2dhbWUuc2Nzc1wiXHJcblxyXG5leHBvcnQgY29uc3QgYmFubmVyID0gKG1lc3NhZ2UpID0+IHtcclxuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBgPGgxPiR7bWVzc2FnZX08L2gxPmA7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkQnV0dG9ucyA9IChwbGF5ZXIpID0+IHtcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYnV0dG9ucy5jbGFzc05hbWUgPSBcImJ1dHRvbnMtY29udGFpbmVyXCI7XHJcblxyXG4gICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICByYW5kb21QbGFjZW1lbnRCdG4udGV4dENvbnRlbnQgPSBcIlJhbmRvbVwiO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNsZWFyQnRuLnRleHRDb250ZW50ID0gXCJDbGVhclwiO1xyXG4gICAgY2xlYXJCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjbGVhci1ib2FyZFwiKTtcclxuXHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKHJhbmRvbVBsYWNlbWVudEJ0bik7XHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKGNsZWFyQnRuKTtcclxuXHJcbiAgICByZXR1cm4gYnV0dG9ucztcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkQm9hcmQgPSAocGxheWVyKSA9PiB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcblxyXG4gICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gcGxheWVyLmJvYXJkO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0R2FtZWJvYXJkLnJvd3M7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2V0R2FtZWJvYXJkLmNvbHM7IGorKykge1xyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmUgZHJvcHpvbmVcIjtcclxuICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZWJvYXJkIC5zcXVhcmVcIik7XHJcblxyXG4gICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkUm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgY29uc3QgZ3JpZFZhbHVlID0gcGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdO1xyXG5cclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJoaXRcIiwgXCJtaXNzXCIpO1xyXG4gICAgICAgIGlmIChncmlkVmFsdWUgPT09IFwiaGl0XCIpIHtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZ3JpZFZhbHVlID09PSBcIm1pc3NcIikge1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvYWRTdGFydEJ1dHRvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHN0YXJ0QnRuLmNsYXNzTmFtZSA9IFwic3RhcnQtYnRuXCI7XHJcbiAgICBzdGFydEJ0bi50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xyXG4gICAgcmV0dXJuIHN0YXJ0QnRuO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNoaXBNZW51ID0gKHBsYXllcikgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG5cclxuICAgIHBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjcmVhdGVCdG4uY2xhc3NOYW1lID0gXCJzaGlwLWJ0biBkcmFnZ2FibGVcIjtcclxuICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgc2hpcC5pZCk7XHJcbiAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNoaXAubmFtZSk7XHJcbiAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCB0cnVlKTtcclxuICAgICAgICBjcmVhdGVCdG4udGV4dENvbnRlbnQgPSBzaGlwLm5hbWU7XHJcblxyXG4gICAgICAgIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlQnRuKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVMb2FkU2hpcEJ0biA9IChlLCBwbGF5ZXIpID0+IHtcclxuICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpO1xyXG4gICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSkuY2hpbGROb2RlcztcclxuXHJcbiAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4gaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVTcXVhcmVDbGljayA9IChlLCBzaGlwLCBwbGF5ZXIpID0+IHtcclxuICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcblxyXG4gICAgaWYgKHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKSkge1xyXG4gICAgICAgIHVwZGF0ZUJvYXJkKHBsYXllcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHBsYWNlbWVudFwiKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG5jbGFzcyBHYW1lIHtcclxuICAgIGNvbnN0cnVjdG9yKHBsYXllcjEsIHBsYXllcjIpIHtcclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xyXG4gICAgICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudHVybiA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXR0YWNrZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHVybiAlIDIgIT09IDAgPyB0aGlzLnBsYXllcjEgOiB0aGlzLnBsYXllcjI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVjZWl2ZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHVybiAlIDIgIT09IDAgPyB0aGlzLnBsYXllcjIgOiB0aGlzLnBsYXllcjE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2tlcigpLm5hbWUgPT09IHRoaXMucGxheWVyMS5uYW1lID8gXCJwbGF5ZXIyXCIgOiBcInBsYXllcjFcIjtcclxuICAgIH1cclxuXHJcbiAgICBuZXh0VHVybigpIHtcclxuICAgICAgICB0aGlzLnR1cm4rKztcclxuICAgICAgICByZXR1cm4gdGhpcy50dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFdpbm5lcih3aW5uZXIpIHtcclxuICAgICAgICB0aGlzLndpbm5lciA9IHdpbm5lcjtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU2V0dXBVSShwbGF5ZXIpIHtcclxuICAgICAgICBjb25zdCB1c2VySW50ZXJmYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmNsYXNzTmFtZSA9IFwic2V0dXAtbWVudVwiO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQoYmFubmVyKHBsYXllci5uYW1lKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChsb2FkQnV0dG9ucyhwbGF5ZXIpKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2hpcE1lbnVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImJvYXJkLWNvbnRhaW5lclwiO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKHBsYXllcikpO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcE1lbnUocGxheWVyKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChzaGlwTWVudUJvYXJkQ29udGFpbmVyKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGxvYWRTdGFydEJ1dHRvbigpKTtcclxuXHJcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh1c2VySW50ZXJmYWNlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcclxuY2xhc3MgR2FtZWJvYXJke1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5yb3dzID0gMTA7IFxyXG4gICAgdGhpcy5jb2xzID0gMTA7XHJcbiAgICB0aGlzLmdyaWQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiB0aGlzLnJvd3MgfSwgKCkgPT4gQXJyYXkodGhpcy5jb2xzKS5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuc2hpcHMgPSBbXHJcbiAgICAgIG5ldyBTaGlwKFwiQXNzYXVsdCBTaGlwXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIkFpcmNyYWZ0IENhcnJpZXJcIiwgNSksXHJcbiAgICAgIG5ldyBTaGlwKFwiRGVzdHJveWVyXCIsIDcpLFxyXG4gICAgICBuZXcgU2hpcChcIkNydWlzZXJcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiU3VibWFyaW5lXCIsIDQpICAgXHJcbiAgICBdO1xyXG4gIH1cclxuICByZXNldCgpe1xyXG4gICAgdGhpcy5jbGVhckdyaWQoKTtcclxuICAgIHRoaXMuaXNBbGxTaGlwc0RlcGxveWVkKCk7XHJcbiAgfVxyXG4gIC8vQ2xlYXJzIHRoZSBib2FyZC5cclxuICBjbGVhckdyaWQoKXtcclxuICAgIHRoaXMuZ3JpZC5mb3JFYWNoKHJvdyA9PiByb3cuZmlsbChudWxsKSk7XHJcbiAgICB0aGlzLmNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCk7XHJcbiAgfVxyXG4gIC8vQ2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgc2hpcHMgb24gdGhlIGJvYXJkIGFuZCBpZiBpdCBmaXRzLlxyXG4gIGlzVmFsaWQoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKXtcclxuICAgIGlmKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgIGlmKGNvbCArIHNoaXAubGVuZ3RoID4gdGhpcy5jb2xzKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIC8vIFwiRXJyb3I6IFNoaXAgZG9lc24ndCBmaXQgaG9yaXpvbnRhbGx5LlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgc2hpcC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYodGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJFcnJvcjogQSBzaGlwIGlzIGFscmVhZHkgcHJlc2VudCBhdCB0aGlzIGxvY2F0aW9uIGhvcml6b250YWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbmRleCArKzsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vUGFzcyBhbGwgdGVzdFxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGlmKHJvdyArIHNoaXAubGVuZ3RoID4gdGhpcy5yb3dzKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIlNoaXAgZG9lc24ndCBmaXQgdmVydGljYWxseVwiOyAvL1NoaXAgZG9lc24ndCBmaXQuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB3aGlsZShpbmRleCA8IHNoaXAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgaWYodGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiQSBzaGlwIGlzIGFscmVhZHkgYXQgdGhpcyBsb2NhdGlvbiB2ZXJ0aWNhbGx5LlwiOyAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlIC8vXCJJbnZhbGlkIGRpcmVjdGlvblwiOyAvL2ludmFsaWQgbmFtZVxyXG4gICAgfVxyXG4gIH1cclxuLy9QbGFjZXMgdGhlIHNoaXAgb24gdGhlIGJvYXJkLlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pe1xyXG4gICAgaWYoIXRoaXMuaXNWYWxpZChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pKVxyXG4gICAgcmV0dXJuIHNoaXAuZGVwbG95OyAvL2ZhbHNlXHJcbiAgICBcclxuICAgIGlmKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgICAge1xyXG4gICAgICAgIC8vY2hlY2tzIGZvciBvdmVybGFwcyBvciBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gPSBzaGlwO1xyXG4gICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZS5wdXNoKFtyb3csIGNvbCArIGluZGV4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKXsgLy9kaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxyXG4gICAgICAgIC8vaWYgZXZlcnl0aGluZyBwYXNzZXMsIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgICAgc2hpcC5jb29yZGluYXRlLnB1c2goW3JvdyArIGluZGV4LCBjb2xdKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBcclxuICBnZXRTaGlwSW5mbyhyb3csIGNvbClcclxuICAgIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ3JpZFtyb3ddW2NvbF07XHJcbiAgICB9XHJcbiAgZ2V0U2hpcChzaGlwTmFtZSl7XHJcbiAgICAgIGxldCByZXN1bHQ7XHJcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGlmKHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBcInNoaXAgbm90IGZvdW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICBkZWxldGVTaGlwKHNoaXBOYW1lKXtcclxuICAgICAgc2hpcE5hbWUuY29vcmRpbmF0ZS5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgICAgICBjb25zdCByb3cgPSBpdGVtWzBdO1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IGl0ZW1bMV07XHJcbiAgICAgICAgdGhpcy5ncmlkW3Jvd11bY29sXSA9IG51bGw7XHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiB0aGlzLmdyaWQ7XHJcbiAgICB9XHJcbiAgLy9QbGFjZXMgYW4gYXR0YWNrIG9uIHRoZSBib2FyZC5cclxuICByZWNlaXZlQXR0YWNrKHgsIHkpe1xyXG4gICAgXHJcbiAgICBpZih4ID49IHRoaXMuY29scyB8fCB5ID49dGhpcy5yb3dzIClcclxuICAgICAgcmV0dXJuIFwib3V0IG9mIGJvdW5kc1wiO1xyXG4gICAgaWYodGhpcy5ncmlkW3hdW3ldID09PSBudWxsKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcIm1pc3NcIjsgLy9tYXJrIGRvd24gbWlzc1xyXG4gICAgICByZXR1cm4gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmdyaWRbeF1beV07XHJcbiAgICAgIHNoaXAuaGl0KCk7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwiaGl0XCI7XHJcbiAgICAgIHJldHVybiBcImhpdFwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNYXhIaXRzKCl7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+e1xyXG4gICAgICBzdW0rPSBzaGlwLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcbiAgZ2V0SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5oaXRzO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tzRGlmZmVyZW5jZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TWF4SGl0cygpIC0gdGhpcy5nZXRIaXRzKCk7XHJcbiAgfVxyXG5cclxuICAvL0NoZWNrcyBpZiB0aGUgZ2FtZSBpcyBvdmVyLlxyXG4gIGlzR2FtZU92ZXIoKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY2hlY2tzRGlmZmVyZW5jZSgpKTtcclxuICAgIHJldHVybiB0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlzQWxsU2hpcHNEZXBsb3llZCgpe1xyXG4gICAgbGV0IHJlc3VsdCA9IHRydWU7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYoIXNoaXAuZGVwbG95KVxyXG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpe1xyXG4gICAgdGhpcy5zaGlwcy5tYXAoKHNoaXApID0+IHNoaXAuZGVwbG95ID0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IHsgZ2V0UmFuZG9tQ29vcmRpbmF0ZXMgfSBmcm9tICcuL1JhbmRvbSc7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGdhbWVib2FyZCwgb3Bwb25lbnRCb2FyZCwgaXNIdW1hbikge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQgPSBnYW1lYm9hcmQ7XHJcbiAgICB0aGlzLm9wcG9uZW50Qm9hcmQgPSBvcHBvbmVudEJvYXJkO1xyXG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcclxuICB9XHJcblxyXG4gIC8vIFBsYXllciBjaG9vc2VzIHRvIGF0dGFjayBvbiB0aGUgb3Bwb25lbnQncyBib2FyZC5cclxuICBhdHRhY2soZW5lbXlCb2FyZE5hbWUsIHJvdywgY29sKSB7XHJcbiAgICBjb25zdCBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZW5lbXlCb2FyZE5hbWV9LSR7cm93fS0ke2NvbH1gKTtcclxuXHJcbiAgICBpZiAoIXBsb3QpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgcGxvdCBJRFwiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbG90LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fCBwbG90LmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NcIikpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiQWxyZWFkeSBhdHRhY2tlZCB0aGlzIHBvc2l0aW9uXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXR0YWNrUmVzdWx0ID0gdGhpcy5vcHBvbmVudEJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlQXR0YWNrUmVzdWx0KHBsb3QsIGF0dGFja1Jlc3VsdCk7XHJcbiAgICByZXR1cm4gYXR0YWNrUmVzdWx0ID09PSBcImhpdFwiO1xyXG4gIH1cclxuXHJcbiAgLy8gUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIHJhbmRvbWx5IG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIHJhbmRvbUF0dGFjayhlbmVteUJvYXJkTmFtZSkge1xyXG4gICAgY29uc3QgW3JvdywgY29sXSA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKHRoaXMub3Bwb25lbnRCb2FyZCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlJhbmRvbSBhdHRhY2sgZXhlY3V0ZWRcIik7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2soZW5lbXlCb2FyZE5hbWUsIHJvdywgY29sKTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIGF0dGFjayByZXN1bHRcclxuICB1cGRhdGVBdHRhY2tSZXN1bHQocGxvdCwgcmVzdWx0KSB7XHJcbiAgICBpZiAocmVzdWx0ID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIm1pc3NcIikge1xyXG4gICAgICBwbG90LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJpbXBvcnQgeyByYW5kb21QbGFjZW1lbnQgfSBmcm9tIFwiLi9SYW5kb21cIjtcclxuXHJcbmNvbnN0IHBsb3RTaGlwID0gKG5hbWUsIHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbiwgYm9hcmQpID0+IHtcclxuICBjb25zdCBhZGRTaGlwQ2xhc3MgPSAoZWxlbWVudElkKSA9PiB7XHJcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xyXG4gICAgaWYgKHNxdWFyZSkgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gIH07XHJcblxyXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBhZGRTaGlwQ2xhc3MoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3Jvd30tJHtjb2wgKyBpbmRleH1gKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBhZGRTaGlwQ2xhc3MoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3JvdyArIGluZGV4fS0ke2NvbH1gKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgb3JpZW50YXRpb25cIik7XHJcbiAgICByZXR1cm4gXCJQbG90dGluZyBkaWRuJ3Qgd29yay5cIjtcclxuICB9XHJcbiAgcmV0dXJuIHsgbmFtZTogbmFtZSwgcm93OiByb3csIGNvbDogY29sLCBvcmllbnRhdGlvbjogb3JpZW50YXRpb24gfTtcclxufTtcclxuXHJcbmNvbnN0IHBsb3RTaGlwcyA9IChib2FyZE5hbWUsIGdhbWVib2FyZCkgPT4ge1xyXG4gIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib2FyZE5hbWUudG9Mb3dlckNhc2UoKSkuY2hpbGROb2RlcztcclxuXHJcbiAgZ2V0U3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcclxuICAgIGNvbnN0IGNvbCA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICBjb25zdCByb3cgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgaWYgKGdhbWVib2FyZC5ncmlkW3Jvd11bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGdldFNxdWFyZXM7XHJcbn07XHJcblxyXG5jb25zdCB1cGRhdGVQbG90Qm9hcmQgPSAocGxheWVyKSA9PiB7XHJcbiAgY29uc3QgZ2V0TmFtZSA9IHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgcGxheWVyLmJvYXJkLmdyaWQuZm9yRWFjaCgocm93LCByb3dOdW0pID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjb2x1bW4sIGNvbE51bSkgPT4ge1xyXG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtnZXROYW1lfS0ke3Jvd051bX0tJHtjb2xOdW19YCk7XHJcbiAgICAgIGlmIChzcXVhcmUpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gY29sdW1uICE9PSBudWxsID8gXCJzcXVhcmUgc2hpcFwiIDogXCJzcXVhcmUgZHJvcHpvbmVcIjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVSZW5kZXIgPSAocGxheWVyKSA9PiB7XHJcbiAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuY2hpbGROb2RlcztcclxuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4geyBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmUgZHJvcHpvbmVcIjsgfSk7XHJcbn07XHJcblxyXG5jb25zdCBwbG90QWxsU2hpcHNSYW5kb21seSA9IChwbGF5ZXIpID0+IHtcclxuICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgaWYgKCFzaGlwLmRlcGxveSkge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQocGxheWVyLmJvYXJkLCBzaGlwKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gcGxheWVyLmJvYXJkO1xyXG59O1xyXG5cclxuY29uc3QgY2xlYXJCb2FyZCA9IChwbGF5ZXIpID0+IHtcclxuICBwbGF5ZXIuYm9hcmQuY2xlYXJHcmlkKCk7XHJcbiAgcGxheWVyLmJvYXJkLmNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCk7XHJcbiAgcmVtb3ZlUmVuZGVyKHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gIHJldHVybiBwbGF5ZXIuYm9hcmQuaXNBbGxTaGlwc0RlcGxveWVkKCk7IC8vIHJldHVybnMgZmFsc2VcclxufTtcclxuXHJcbmNvbnN0IGxvYWRCb2FyZCA9IChwbGF5ZXIpID0+IHtcclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXIuYm9hcmQucm93czsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBsYXllci5ib2FyZC5jb2xzOyBqKyspIHtcclxuICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpfS0ke2l9LSR7an1gKTtcclxuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjb250YWluZXI7XHJcbn07XHJcblxyXG5jb25zdCB1cGRhdGVCb2FyZCA9IChwbGF5ZXIpID0+IHtcclxuICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIikuY2hpbGROb2RlcztcclxuXHJcbiAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWRSb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgIGNvbnN0IHBhcnNlZENvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgaWYgKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJoaXRcIikge1xyXG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICB9IGVsc2UgaWYgKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGxvdHMgR2FtZSBib2FyZCBVSSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgcGxvdEJhbm5lciA9IChtZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGJveC5pbm5lckhUTUwgPSBgPGgyPiR7bWVzc2FnZX08L2gyPmA7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveCk7XHJcbiAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IHBsb3RHYW1lID0gKGdhbWUpID0+IHtcclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInBsYXllckJvYXJkXCI7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsb3RCYW5uZXIoYCR7Z2FtZS5nZXRBdHRhY2tlcigpLm5hbWV9YCkpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkQm9hcmQoZ2FtZS5nZXRSZWNlaXZlcigpKSk7XHJcbiAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1QbGF5IGFnYWluIE1lbnUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5jb25zdCBsb2FkUGxheUFnYWluTWVudSA9ICh3aW5uZXIsIGxvc2VyKSA9PiB7XHJcbiAgY29uc3QgcGxheUFnYWluTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgcGxheUFnYWluTWVudS5jbGFzc05hbWUgPSBcIm1lbnUtYm94XCI7XHJcbiAgcGxheUFnYWluTWVudS5pbm5lckhUTUwgPSBgXHJcbiAgICA8aDI+JHt3aW5uZXJ9IGhhcyBkZWZlYXRlZCAke2xvc2VyfTwvaDI+XHJcbiAgICA8cD5Xb3VsZCB5b3UgbGlrZSB0byBwbGF5IGFnYWluPzwvcD5cclxuICAgIDxidXR0b24gY2xhc3M9XCJcIiBpZD1cInBsYXktYWdhaW5cIj5QbGF5IEFnYWluPC9idXR0b24+XHJcbiAgYDtcclxuICByZXR1cm4gcGxheUFnYWluTWVudTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgY2xlYXJCb2FyZCxcclxuICBsb2FkUGxheUFnYWluTWVudSxcclxuICBwbG90R2FtZSxcclxuICBwbG90U2hpcCxcclxuICBwbG90U2hpcHMsXHJcbiAgcGxvdEFsbFNoaXBzUmFuZG9tbHksXHJcbiAgdXBkYXRlQm9hcmQsXHJcbiAgdXBkYXRlUGxvdEJvYXJkLFxyXG59O1xyXG4iLCIvLyBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYW5kIHJvd3MuXHJcbmNvbnN0IGdlbmVyYXRlTnVtYmVyID0gKG1heCkgPT4ge1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGUgcmFuZG9tIGNvb3JkaW5hdGVzIHdpdGhpbiB0aGUgZ2FtZSBib2FyZC5cclxuY29uc3QgZ2VuZXJhdGVDb29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+IHtcclxuICBsZXQgY29sID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLmNvbHMpO1xyXG4gIGxldCByb3cgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQucm93cyk7XHJcblxyXG4gIHJldHVybiBbcm93LCBjb2xdO1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGUgYSByYW5kb20gcGxhY2VtZW50IG9uIHRoZSBib2FyZC5cclxuY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKGdhbWVib2FyZCwgc2hpcCkgPT4ge1xyXG4gIGxldCBwbGFjZWQgPSBmYWxzZTtcclxuICB3aGlsZSAoIXBsYWNlZCkge1xyXG4gICAgICBjb25zdCBbcm93LCBjb2xdID0gZ2VuZXJhdGVDb29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgICBjb25zdCBvcmllbnRhdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcclxuXHJcbiAgICAgIGlmIChnYW1lYm9hcmQuaXNWYWxpZChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pKSB7XHJcbiAgICAgICAgICBwbGFjZWQgPSBnYW1lYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbik7XHJcbiAgICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyBQZXJmb3JtIGEgcmFuZG9tIGF0dGFjayBvbiB0aGUgZ2FtZWJvYXJkLlxyXG5jb25zdCBnZXRSYW5kb21Db29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+IHtcclxuICBsZXQgdmFsaWRDb29yZGluYXRlcyA9IGZhbHNlO1xyXG4gIGxldCBjb29yZGluYXRlcztcclxuXHJcbiAgd2hpbGUgKCF2YWxpZENvb3JkaW5hdGVzKSB7XHJcbiAgICAgIGNvb3JkaW5hdGVzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG5cclxuICAgICAgaWYgKGdhbWVib2FyZC5ncmlkW2Nvb3JkaW5hdGVzWzBdXVtjb29yZGluYXRlc1sxXV0gIT09IFwibWlzc1wiICYmXHJcbiAgICAgICAgICBnYW1lYm9hcmQuZ3JpZFtjb29yZGluYXRlc1swXV1bY29vcmRpbmF0ZXNbMV1dICE9PSBcImhpdFwiKSB7XHJcbiAgICAgICAgICB2YWxpZENvb3JkaW5hdGVzID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gIH1cclxuICByZXR1cm4gY29vcmRpbmF0ZXM7XHJcbn07XHJcblxyXG5leHBvcnQgeyBnZXRSYW5kb21Db29yZGluYXRlcywgcmFuZG9tUGxhY2VtZW50IH07XHJcbiIsImltcG9ydCB7djQgYXMgdXVpZHY0fSBmcm9tICd1dWlkJ1xyXG5jb25zdCBfREVGQVVMVF9vcmllbnRhdGlvbiAgPSBcImhvcml6b250YWxcIjtcclxuXHJcbmNsYXNzIFNoaXB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgbGVuZ3RoKXtcclxuICAgIHRoaXMuaWQgPSB1dWlkdjQoKTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmNvb3JkaW5hdGUgPSBbXTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBfREVGQVVMVF9vcmllbnRhdGlvbjtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuZGVwbG95ID0gZmFsc2U7XHJcbiAgfVxyXG4gIFxyXG4gIGhpdCA9ICgpID0+IHRoaXMuaGl0cysrO1xyXG5cclxuICBpc1N1bmsgPSAoKSA9PiB0aGlzLmxlbmd0aCAtIHRoaXMuaGl0cyA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgZGVsZXRlQ29vcmRpbmF0ZXMgPSAoKSA9PiB0aGlzLmNvb3JkaW5hdGUuc3BsaWNlKDAsIHRoaXMuY29vcmRpbmF0ZS5sZW5ndGgpOyAvL3JldHVybnMgYW4gZW1wdHkgYXJyYXkgXHJcbiAgXHJcbiAgdG9nZ2xlT3JpZW50YXRpb24gPSAoKSA9PiB0aGlzLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IHRoaXMuc2V0T3JpZW50YXRpb24oXCJ2ZXJ0aWNhbFwiKSA6IHRoaXMuc2V0T3JpZW50YXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG5cclxuICBzZXRPcmllbnRhdGlvbiA9IChuZXdPcmllbnRhdGlvbikgPT4gdGhpcy5vcmllbnRhdGlvbiA9IG5ld09yaWVudGF0aW9uO1xyXG4gIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZS9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vY29tcG91bmRzL0FwcC5qc1wiO1xyXG5cclxuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgQXBwLmxvYWRQYWdlKCkpOyJdLCJuYW1lcyI6WyJCb2FyZCIsIkdhbWUiLCJQbGF5ZXIiLCJyYW5kb21QbGFjZW1lbnQiLCJhZGRCb2FyZEhhbmRsZXIiLCJwbG90R2FtZSIsImNsZWFyQm9hcmQiLCJ1cGRhdGVCb2FyZCIsInVwZGF0ZVBsb3RCb2FyZCIsInBsb3RTaGlwcyIsInBsb3RBbGxTaGlwc1JhbmRvbWx5IiwibG9hZFBsYXlBZ2Fpbk1lbnUiLCJyZW1vdmVXaW5kb3ciLCJpdGVtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZUNoaWxkIiwicXVlcnlTZWxlY3RvciIsIkdhbWVTZXR1cCIsImxvYWQiLCJzZXR1cCIsInBsYXllcjFCb2FyZCIsInBsYXllcjJCb2FyZCIsImlzUGxheWVyVnNDb21wdXRlciIsImNoZWNrZWQiLCJpc1BsYXllclZzUGxheWVyIiwicGxheWVyMSIsInZhbHVlIiwicGxheWVyMiIsImdhbWUiLCJzZXR1cEdhbWUiLCJjb25zb2xlIiwibG9nIiwidXNlclNlbGVjdFNoaXAiLCJwbGF5ZXIiLCJkcmFnZ2VkU2hpcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYnV0dG9uIiwic2hpcCIsImJvYXJkIiwiZ2V0U2hpcCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImRlcGxveSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY3VycmVudFRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwidGFyZ2V0Iiwicm93IiwicGFyc2VJbnQiLCJjb2wiLCJjb250YWlucyIsImlzVmFsaWQiLCJwbGFjZVNoaXAiLCJvcmllbnRhdGlvbiIsInBsYXllclR1cm4iLCJsb2FkU2V0dXBVSSIsInJhbmRvbVBsYWNlbWVudEJ0biIsImNsZWFyQnRuIiwiZG9uZUJ0biIsImZpbmlzaGVkU2V0dXBCdG4iLCJpc0h1bWFuIiwic2hpcHMiLCJwbGF5IiwicmVzZXQiLCJ3aW5kb3ciLCJ3aW5uZXIiLCJ0dXJuIiwiZ2V0Um9vdCIsImFwcGVuZENoaWxkIiwiZ2V0QXR0YWNrZXIiLCJuYW1lIiwiZ2V0UmVjZWl2ZXIiLCJncmlkIiwiYXR0YWNrIiwiaXNHYW1lT3ZlciIsInNldFdpbm5lciIsIm5leHRUdXJuIiwicmFuZG9tQXR0YWNrIiwic2V0VGltZW91dCIsImdldEN1cnJlbnRUdXJuT3Bwb25lbnQiLCJNZW51Iiwicm9vdCIsIlVJIiwibG9hZEhhbmRsZXJzIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImdldFJhZGlvcyIsInN1Ym1pdCIsImRpc2FibGVkIiwiQXBwIiwibG9hZFBhZ2UiLCJzcXVhcmVzIiwic3F1YXJlIiwiaGFuZGxlT3JpZW50YXRpb24iLCJzZXRPcmllbnRhdGlvbiIsImdldFNoaXBJbmZvIiwic3RhcnQiLCJjb29yZGluYXRlcyIsIm5ld09yaWVudGF0aW9uIiwiZGVsZXRlU2hpcCIsImJhbm5lciIsIm1lc3NhZ2UiLCJsb2FkQnV0dG9ucyIsImJ1dHRvbnMiLCJ0ZXh0Q29udGVudCIsImxvYWRCb2FyZCIsInRvTG93ZXJDYXNlIiwiZ2V0R2FtZWJvYXJkIiwiaSIsInJvd3MiLCJqIiwiY29scyIsImdldFNxdWFyZXMiLCJwYXJzZWRSb3ciLCJwYXJzZWRDb2wiLCJncmlkVmFsdWUiLCJsb2FkU3RhcnRCdXR0b24iLCJzdGFydEJ0biIsInNoaXBNZW51IiwiY3JlYXRlQnRuIiwiaWQiLCJoYW5kbGVMb2FkU2hpcEJ0biIsImNoaWxkTm9kZXMiLCJoYW5kbGVTcXVhcmVDbGljayIsImVycm9yIiwiY29uc3RydWN0b3IiLCJ1c2VySW50ZXJmYWNlIiwic2hpcE1lbnVCb2FyZENvbnRhaW5lciIsIlNoaXAiLCJHYW1lYm9hcmQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiY2xlYXJHcmlkIiwiaXNBbGxTaGlwc0RlcGxveWVkIiwiY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQiLCJpbmRleCIsImNvb3JkaW5hdGUiLCJwdXNoIiwic2hpcE5hbWUiLCJyZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJoaXQiLCJnZXRNYXhIaXRzIiwic3VtIiwiZ2V0SGl0cyIsImhpdHMiLCJjaGVja3NEaWZmZXJlbmNlIiwibWFwIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZXMiLCJnYW1lYm9hcmQiLCJvcHBvbmVudEJvYXJkIiwiZW5lbXlCb2FyZE5hbWUiLCJwbG90Iiwid2FybiIsImF0dGFja1Jlc3VsdCIsInVwZGF0ZUF0dGFja1Jlc3VsdCIsInBsb3RTaGlwIiwiYWRkU2hpcENsYXNzIiwiZWxlbWVudElkIiwiYm9hcmROYW1lIiwiZ2V0TmFtZSIsInJvd051bSIsImNvbHVtbiIsImNvbE51bSIsInJlbW92ZVJlbmRlciIsInBsb3RCYW5uZXIiLCJib3giLCJsb3NlciIsInBsYXlBZ2Fpbk1lbnUiLCJnZW5lcmF0ZU51bWJlciIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlQ29vcmRpbmF0ZXMiLCJwbGFjZWQiLCJ2YWxpZENvb3JkaW5hdGVzIiwidjQiLCJ1dWlkdjQiLCJfREVGQVVMVF9vcmllbnRhdGlvbiIsImlzU3VuayIsImRlbGV0ZUNvb3JkaW5hdGVzIiwic3BsaWNlIiwidG9nZ2xlT3JpZW50YXRpb24iXSwic291cmNlUm9vdCI6IiJ9