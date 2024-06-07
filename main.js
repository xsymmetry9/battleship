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






const getRoot = document.getElementById("root");
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
      const getPlayer1Name = new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player1Name").value, player1Board, player2Board, true);

      //Determines if player 2 is human or computer
      const getPlayer2Name = isPlayerVsComputer ? new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"]("computer", player2Board, player1Board, false) : new _compounds_Player__WEBPACK_IMPORTED_MODULE_2__["default"](document.getElementById("player2Name").value, player2Board, player1Board, true);
      const game = new _compounds_Game__WEBPACK_IMPORTED_MODULE_1__["default"](getPlayer1Name, getPlayer2Name);
      removeWindow(".menu-box");
      this.setupGame(game, "player 1");
      return game;
    } else {
      console.log("error");
      return "error";
    }
  }
  static userSelectShip = player => {
    let draggedShip;
    document.querySelectorAll(".ship-btn").forEach(button => {
      !player.board.getShip(button.getAttribute("value")).deploy ? button.setAttribute("draggable", true) : button.setAttribute("draggable", false);
    });
    document.querySelectorAll(".draggable").forEach(button => {
      button.addEventListener("dragstart", e => {
        draggedShip = player.board.getShip(e.currentTarget.getAttribute("value"));
        e.currentTarget.classList.add("valid");
      });
      button.addEventListener("dragend", e => {
        e.preventDefault();
        //Removes the render of the selected button
        e.currentTarget.classList.remove("valid");
      });
    });
    document.querySelectorAll(".square").forEach(target => {
      target.addEventListener("dragover", e => {
        e.preventDefault();
      }, false);
      target.addEventListener("dragenter", e => {
        const row = parseInt(e.currentTarget.getAttribute("row")); //returns row
        const col = parseInt(e.currentTarget.getAttribute("col")); //returns column
        if (e.currentTarget.classList.contains("dropzone")) {
          player.board.isValid(draggedShip, row, col, "horizontal") ? e.currentTarget.classList.add("valid") : e.currentTarget.classList.add("invalid");
        }
      });
      target.addEventListener("dragleave", e => {
        const row = parseInt(e.currentTarget.getAttribute("row")); //returns row
        const col = parseInt(e.currentTarget.getAttribute("col")); //returns column
        if (e.currentTarget.classList.contains("dropzone")) {
          player.board.isValid(draggedShip, row, col, "horizontal") ? e.currentTarget.classList.remove("valid") : e.currentTarget.classList.remove("invalid");
        }
      });
      target.addEventListener("drop", e => {
        const check = ["valid", "invalid"];
        check.forEach(item => {
          if (e.currentTarget.classList.contains("valid") || e.currentTarget.classList.contains("invalid")) {
            e.currentTarget.classList.remove(item);
          }
        });
        const row = parseInt(e.currentTarget.getAttribute("row")); //returns row
        const col = parseInt(e.currentTarget.getAttribute("col")); //returns column

        if (player.board.grid[row][col] === null && player.board.isValid(draggedShip, row, col, draggedShip.orientation)) {
          //place the ship and plots it
          player.board.placeShip(draggedShip, row, col, draggedShip.orientation);
          (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.updatePlotBoard)(player);
          // this.userSelectShip(player);
          console.log("valid");
        } else {
          //selects the ship
          return "There is a ship located there.  Place another square.";
        }
      });
    });
  };
  static setupGame = (game, playerTurn) => {
    const player = playerTurn === "player 1" ? game.player1 : game.player2;
    game.loadSetupUI(player);
    //add game handler
    (0,_compounds_Functions__WEBPACK_IMPORTED_MODULE_4__.addBoardHandler)(player);
    const randomPlacementBtn = document.getElementById("random-placement");
    const clearBtn = document.getElementById("clear-board");
    const doneBtn = document.querySelector(".start-btn");

    //User is allowed to click and drag the ship to the board
    this.userSelectShip(player); //adds handler

    randomPlacementBtn.addEventListener("click", () => {
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.plotAllShipsRandomly)(player);
      console.log((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.updatePlotBoard)(player));
    });
    clearBtn.addEventListener("click", () => {
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.clearBoard)(player);
      this.userSelectShip(player);
    });
    doneBtn.addEventListener("click", () => this.finishedSetupBtn(game, playerTurn));
    return player;
  };
  static finishedSetupBtn = (game, playerTurn) => {
    removeWindow(".setup-menu");
    if (game.player2.isHuman && playerTurn === "player 1") {
      this.setupGame(game, "player 2");
    } else {
      //generate randomPlacement for player 2
      game.player2.board.ships.forEach(ship => {
        (0,_compounds_Random__WEBPACK_IMPORTED_MODULE_3__.randomPlacement)(game.player2.board, ship);
      });
      this.play(game);
    }
  };
  static reset = (game, window) => {
    game.player1.board.reset();
    game.player2.board.reset();
    game.winner = null;
    game.turn = 1;
    removeWindow(window);
    //loads setup menu
    this.setupGame(game, "player 1");
  };
  static attack = (e, game) => {
    const row = e.currentTarget.getAttribute("row");
    const col = e.currentTarget.getAttribute("col");
    const id = e.currentTarget.getAttribute("id").split("-");
    if (id[0] === game.getReceiver().name.toLowerCase()) {
      const result = game.getAttacker().opponentBoard.receiveAttack(row, col);
      result === "hit" ? this.hit(e, game) : this.miss(e, game);
      this.nextTurn(game);
      // document.querySelector(".next-btn").appendChild(nextTurnBtn(game.getAttacker()));
      // document.querySelector(".next").addEventListener(("click"), () => this.nextTurn(game));
    } else {
      console.log("it's not your turn");
      return false;
    }
  };
  static nextTurn = game => {
    getRoot.removeChild(document.querySelector(".playerBoard"));
    game.getReceiver().board.isGameOver() ? game.setWinner(game.getAttacker().name) : game.nextTurn();
    this.play(game);
  };
  static hit = e => e.currentTarget.classList.add("hit");
  static miss = e => e.currentTarget.classList.add("miss");
  static play = game => {
    if (game.winner != null) {
      getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.loadPlayAgainMenu)(game.getAttacker().name, game.getReceiver().name));
      document.getElementById("play-again").addEventListener("click", () => this.reset(game, ".menu-box"));
      return;
    }

    //Whoever is the attacker
    getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.plotGame)(game));
    (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.updateBoard)(game.getReceiver());
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
        item.addEventListener("click", e => this.attack(e, game));
      });
    } else {
      //random attack
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.plotShips)(game.getReceiver().name, game.getReceiver().board);
      game.getAttacker().randomAttack(game.getReceiver().name);
      setTimeout(() => this.nextTurn(game), 1000);
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
  e.currentTarget.classList.contains("ship") ? setOrientation(e, player) : false;
};
const setOrientation = (e, player) => {
  const row = e.currentTarget.getAttribute("row");
  const col = e.currentTarget.getAttribute("col");
  const ship = player.board.getShipInfo(row, col);
  const start = ship.coordinate[0]; //type of array
  const orientation = ship.orientation === "horizontal" ? "vertical" : "horizontal"; //toggles orientation

  player.board.deleteShip(ship);
  if (player.board.isValid(ship, start[0], start[1], orientation)) {
    player.board.placeShip(ship, start[0], start[1], orientation);
    ship.setOrientation(orientation);
  } else {
    player.board.placeShip(ship, start[0], start[1], ship.orientation);
    console.log("not changed");
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
    const createBtn = document.createElement("div");
    createBtn.className = "ship-btn draggable";
    createBtn.setAttribute("id", ship.id);
    createBtn.setAttribute("value", ship.name);
    createBtn.setAttribute("draggable", true);
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
  setWinner(winner) {
    this.winner = winner;
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
    this.ships.map(ship => {
      ship.deploy = false;
      ship.deleteCoordinates();
      ship.setOrientation("horizontal");
    });
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
/* harmony export */   nextTurnBtn: () => (/* binding */ nextTurnBtn),
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
  updatePlotBoard(player);
  return player.board; // returns false
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

// ------------------------------ Play next turn button ---------------------------------------------
const loadNextTurnSection = () => {
  const container = document.createElement("div");
  container.className = "next-btn";
  return container;
};
const nextTurnBtn = () => {
  const button = document.createElement("button");
  button.textContent = "next";
  button.className = "next";
  return button;
};
const plotGame = game => {
  const container = document.createElement("div");
  container.className = "playerBoard";
  container.appendChild(plotBanner(`${game.getAttacker().name}`));
  container.appendChild(loadBoard(game.getReceiver()));
  container.appendChild(loadNextTurnSection());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QjtBQUNTO0FBRXJDakcsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUVnRSx5REFBRyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9scy8uL3NyYy9TZWN0aW9uL0dhbWVTZXR1cC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9TZWN0aW9uL01lbnUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0FwcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvRnVuY3Rpb25zLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9HYW1lLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxvdC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUmFuZG9tLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9TaGlwLmpzIiwid2VicGFjazovL2xzLy4vc3JjL3N0eWxlL2dhbWUuc2Nzcz82ODQ4Iiwid2VicGFjazovL2xzLy4vc3JjL3N0eWxlL21lbnUuc2Nzcz82N2MwIiwid2VicGFjazovL2xzLy4vc3JjL3N0eWxlL3N0eWxlLnNjc3M/NDU2ZCIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvbmF0aXZlLmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xzLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCb2FyZCBmcm9tIFwiLi4vY29tcG91bmRzL0dhbWVib2FyZFwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi4vY29tcG91bmRzL0dhbWVcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi4vY29tcG91bmRzL1BsYXllclwiO1xyXG5pbXBvcnQge3JhbmRvbVBsYWNlbWVudH0gZnJvbSBcIi4uL2NvbXBvdW5kcy9SYW5kb21cIjtcclxuaW1wb3J0IHthZGRCb2FyZEhhbmRsZXJ9IGZyb20gXCIuLi9jb21wb3VuZHMvRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgcGxvdEdhbWUsXHJcbiAgICBjbGVhckJvYXJkLFxyXG4gICAgdXBkYXRlQm9hcmQsXHJcbiAgICB1cGRhdGVQbG90Qm9hcmQsXHJcbiAgICBwbG90U2hpcHMsXHJcbiAgICBwbG90QWxsU2hpcHNSYW5kb21seSxcclxuICAgIGxvYWRQbGF5QWdhaW5NZW51LFxyXG4gICAgbmV4dFR1cm5CdG4sXHJcbiAgICB9IGZyb20gJy4uL2NvbXBvdW5kcy9QbG90JztcclxuXHJcbmNvbnN0IGdldFJvb3QgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuY29uc3QgcmVtb3ZlV2luZG93ID0gKGl0ZW0pID0+e1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbSkpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTZXR1cHtcclxuXHJcbiAgICBzdGF0aWMgbG9hZCgpe1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBzZXR1cCgpe1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjFCb2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjJCb2FyZCA9IG5ldyBCb2FyZCgpXHJcblxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNDb21wdXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidnNDb21wdXRlclwiKS5jaGVja2VkO1xyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZzUGxheWVyXCIpLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgaWYoaXNQbGF5ZXJWc1BsYXllciB8fCBpc1BsYXllclZzQ29tcHV0ZXIpXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFBsYXllcjFOYW1lID0gbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFOYW1lXCIpLnZhbHVlLCBwbGF5ZXIxQm9hcmQsIHBsYXllcjJCb2FyZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvL0RldGVybWluZXMgaWYgcGxheWVyIDIgaXMgaHVtYW4gb3IgY29tcHV0ZXJcclxuICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMk5hbWUgPSBpc1BsYXllclZzQ29tcHV0ZXIgPyBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyMkJvYXJkLCBwbGF5ZXIxQm9hcmQsIGZhbHNlKSA6IFxyXG4gICAgICAgICAgICAgICAgbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLnZhbHVlLCBwbGF5ZXIyQm9hcmQsIHBsYXllcjFCb2FyZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2V0UGxheWVyMU5hbWUsIGdldFBsYXllcjJOYW1lKTtcclxuICAgICAgICAgICAgcmVtb3ZlV2luZG93KFwiLm1lbnUtYm94XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAxXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdhbWU7XHJcblxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3JcIjtcclxuICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyB1c2VyU2VsZWN0U2hpcCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgIGxldCBkcmFnZ2VkU2hpcDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWJ0blwiKS5mb3JFYWNoKChidXR0b24pID0+e1xyXG4gICAgICAgICAgICAhcGxheWVyLmJvYXJkLmdldFNoaXAoYnV0dG9uLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKS5kZXBsb3kgPyBcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgdHJ1ZSkgOiBidXR0b24uc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIGZhbHNlKTtcclxuICAgICAgICB9KSBcclxuICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoKFwiZHJhZ3N0YXJ0XCIpLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnZWRTaGlwID0gcGxheWVyLmJvYXJkLmdldFNoaXAoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcInZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigoXCJkcmFnZW5kXCIpLCAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUmVtb3ZlcyB0aGUgcmVuZGVyIG9mIHRoZSBzZWxlY3RlZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpLmZvckVhY2goKHRhcmdldCkgPT57XHJcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIixcclxuICAgICAgICAgICAgICAgIChlKSA9PntcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTsgLy9yZXR1cm5zIHJvd1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wem9uZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmJvYXJkLmlzVmFsaWQoZHJhZ2dlZFNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIikgPyBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcInZhbGlkXCIpIDogZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZSA9PntcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTsgLy9yZXR1cm5zIHJvd1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wem9uZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmJvYXJkLmlzVmFsaWQoZHJhZ2dlZFNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIikgPyBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkXCIpIDogZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gW1widmFsaWRcIiwgXCJpbnZhbGlkXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmFsaWRcIikgfHwgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImludmFsaWRcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTsgLy9yZXR1cm5zIHJvd1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5ncmlkW3Jvd11bY29sXSA9PT0gbnVsbCAmJiBwbGF5ZXIuYm9hcmQuaXNWYWxpZChkcmFnZ2VkU2hpcCwgcm93LCBjb2wsIGRyYWdnZWRTaGlwLm9yaWVudGF0aW9uKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9wbGFjZSB0aGUgc2hpcCBhbmQgcGxvdHMgaXRcclxuICAgICAgICAgICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoZHJhZ2dlZFNoaXAsIHJvdywgY29sLCBkcmFnZ2VkU2hpcC5vcmllbnRhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVQbG90Qm9hcmQocGxheWVyKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMudXNlclNlbGVjdFNoaXAocGxheWVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmFsaWRcIik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9zZWxlY3RzIHRoZSBzaGlwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXCJUaGVyZSBpcyBhIHNoaXAgbG9jYXRlZCB0aGVyZS4gIFBsYWNlIGFub3RoZXIgc3F1YXJlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgICBzdGF0aWMgc2V0dXBHYW1lID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gICAgICAgIGNvbnN0IHBsYXllciA9IHBsYXllclR1cm4gPT09IFwicGxheWVyIDFcIiA/IGdhbWUucGxheWVyMSA6IGdhbWUucGxheWVyMjtcclxuICAgICAgICBnYW1lLmxvYWRTZXR1cFVJKHBsYXllcik7XHJcbiAgICAgICAgLy9hZGQgZ2FtZSBoYW5kbGVyXHJcbiAgICAgICAgYWRkQm9hcmRIYW5kbGVyKHBsYXllcik7XHJcblxyXG4gICAgICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgICAgICBjb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYm9hcmRcIik7XHJcbiAgICAgICAgY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtYnRuXCIpO1xyXG5cclxuICAgICAgICAvL1VzZXIgaXMgYWxsb3dlZCB0byBjbGljayBhbmQgZHJhZyB0aGUgc2hpcCB0byB0aGUgYm9hcmRcclxuICAgICAgICB0aGlzLnVzZXJTZWxlY3RTaGlwKHBsYXllcik7IC8vYWRkcyBoYW5kbGVyXHJcbiAgICAgICAgIFxyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBsb3RBbGxTaGlwc1JhbmRvbWx5KHBsYXllcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHVwZGF0ZVBsb3RCb2FyZChwbGF5ZXIpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGVhckJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyQm9hcmQocGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy51c2VyU2VsZWN0U2hpcChwbGF5ZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvbmVCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gdGhpcy5maW5pc2hlZFNldHVwQnRuKGdhbWUsIHBsYXllclR1cm4pKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjtcclxuICAgICB9XHJcbiBcclxuICAgICBzdGF0aWMgZmluaXNoZWRTZXR1cEJ0biA9IChnYW1lLCBwbGF5ZXJUdXJuKSA9PntcclxuIFxyXG4gICAgICAgICByZW1vdmVXaW5kb3coXCIuc2V0dXAtbWVudVwiKTtcclxuXHJcbiAgICAgICAgaWYoZ2FtZS5wbGF5ZXIyLmlzSHVtYW4gJiYgcGxheWVyVHVybiA9PT0gXCJwbGF5ZXIgMVwiKXtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cEdhbWUoZ2FtZSwgXCJwbGF5ZXIgMlwiKVxyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgLy9nZW5lcmF0ZSByYW5kb21QbGFjZW1lbnQgZm9yIHBsYXllciAyXHJcbiAgICAgICAgICAgIGdhbWUucGxheWVyMi5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PntcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudChnYW1lLnBsYXllcjIuYm9hcmQsIHNoaXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KGdhbWUpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgfVxyXG4gICAgIHN0YXRpYyByZXNldCA9IChnYW1lLCB3aW5kb3cpID0+IHtcclxuICAgICAgICBnYW1lLnBsYXllcjEuYm9hcmQucmVzZXQoKTtcclxuICAgICAgICBnYW1lLnBsYXllcjIuYm9hcmQucmVzZXQoKTtcclxuICAgICAgICBnYW1lLndpbm5lciA9IG51bGw7XHJcbiAgICAgICAgZ2FtZS50dXJuID0gMTtcclxuICAgICAgICByZW1vdmVXaW5kb3cod2luZG93KTtcclxuICAgICAgICAvL2xvYWRzIHNldHVwIG1lbnVcclxuICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAxXCIpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgc3RhdGljIGF0dGFjayA9IChlLCBnYW1lKSA9PntcclxuICAgICAgICBjb25zdCByb3cgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImlkXCIpLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICBpZihpZFswXSA9PT0gZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUudG9Mb3dlckNhc2UoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZ2FtZS5nZXRBdHRhY2tlcigpLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID09PSBcImhpdFwiID8gdGhpcy5oaXQoZSxnYW1lKSA6IHRoaXMubWlzcyhlLCBnYW1lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dFR1cm4oZ2FtZSk7XHJcbiAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5leHQtYnRuXCIpLmFwcGVuZENoaWxkKG5leHRUdXJuQnRuKGdhbWUuZ2V0QXR0YWNrZXIoKSkpO1xyXG4gICAgICAgICAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXh0XCIpLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHRoaXMubmV4dFR1cm4oZ2FtZSkpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIml0J3Mgbm90IHlvdXIgdHVyblwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgIH1cclxuICAgICBzdGF0aWMgbmV4dFR1cm4gPSAoZ2FtZSkgPT57XHJcbiAgICAgICAgICAgIGdldFJvb3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKSk7XHJcbiAgICAgICAgICAgIGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZC5pc0dhbWVPdmVyKCkgPyBnYW1lLnNldFdpbm5lcihnYW1lLmdldEF0dGFja2VyKCkubmFtZSkgOiBnYW1lLm5leHRUdXJuKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuXHJcbiAgICAgfVxyXG4gICAgIHN0YXRpYyBoaXQgPSAoZSkgPT4gZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgc3RhdGljIG1pc3MgPSAoZSkgPT4gZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpXHJcbiAgICAgc3RhdGljIHBsYXkgPShnYW1lKSA9PntcclxuXHJcbiAgICAgICAgaWYoZ2FtZS53aW5uZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGdldFJvb3QuYXBwZW5kQ2hpbGQobG9hZFBsYXlBZ2Fpbk1lbnUoZ2FtZS5nZXRBdHRhY2tlcigpLm5hbWUsIGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lKSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheS1hZ2FpblwiKS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKT0+IHRoaXMucmVzZXQoZ2FtZSwgXCIubWVudS1ib3hcIikpOyAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuOyAgICAgXHJcbiAgICAgICAgfVxyXG4gICBcclxuICAgICAgICAvL1dob2V2ZXIgaXMgdGhlIGF0dGFja2VyXHJcbiAgICAgICAgZ2V0Um9vdC5hcHBlbmRDaGlsZChwbG90R2FtZShnYW1lKSk7XHJcbiAgICAgICAgdXBkYXRlQm9hcmQoZ2FtZS5nZXRSZWNlaXZlcigpKTtcclxuICAgICAgICBpZihnYW1lLmdldEF0dGFja2VyKCkuaXNIdW1hbilcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vbG9hZCBwcmV2aW91cyBtb3ZlcyBpZiBhbnlcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpO1xyXG4gICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vRG9lc24ndCBhZGQgZXZlbnRMaXN0ZW5lciBiZWNhdXNlIHRoZSBzcXVhcmUgaXMgb2NjdXBpZWQuXHJcbiAgICAgICAgICAgICAgICBpZihnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gPT09IFwiaGl0XCIgfHwgZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLmdyaWRbcm93XVtjb2xdID09PSBcIm1pc3NcIil7IFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKGUpID0+IHRoaXMuYXR0YWNrKGUsIGdhbWUpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9yYW5kb20gYXR0YWNrXHJcbiAgICAgICAgICAgIHBsb3RTaGlwcyhnYW1lLmdldFJlY2VpdmVyKCkubmFtZSwgZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkKTtcclxuICAgICAgICAgICAgZ2FtZS5nZXRBdHRhY2tlcigpLnJhbmRvbUF0dGFjayhnYW1lLmdldFJlY2VpdmVyKCkubmFtZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5uZXh0VHVybihnYW1lKSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYW1lLmdldEN1cnJlbnRUdXJuT3Bwb25lbnQoKTtcclxuXHJcbiAgICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgJy4uL3N0eWxlL21lbnUuc2NzcydcclxuaW1wb3J0IEdhbWVTZXR1cCBmcm9tIFwiLi9HYW1lU2V0dXBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnV7XHJcbiAgICBzdGF0aWMgbG9hZCgpe1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLlVJKCkpO1xyXG4gICAgICAgIHRoaXMubG9hZEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgVUkoKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm1lbnUtYm94XCI7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxoMSBjbGFzcz1cInRleHQtY2VudGVyZWRcIj5XZWxjb21lIHRvIEJhdHRsZXNoaXA8L2gxPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiZ2FtZUZvcm1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGxheWVyMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+UGxheWVyIDE6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBsYXllcjFOYW1lXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInBsYXllcjJJbnB1dFwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGxheWVyMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+UGxheWVyIDI6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBsYXllcjJOYW1lXCIgZGlzYWJsZWQvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZ2FtZU1vZGVcIiBjbGFzcz1cImdhbWVNb2RlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkID1cInZzQ29tcHV0ZXJcIiBuYW1lPVwiZ2FtZU1vZGVcIiB2YWx1ZT1cImNvbXB1dGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInZzQ29tcHV0ZXJcIj5QbGF5ZXIgdnMgQ29tcHV0ZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInZzUGxheWVyXCIgbmFtZT1cImdhbWVNb2RlXCIgdmFsdWU9XCJwbGF5ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidnNQbGF5ZXJcIj5QbGF5ZXIgdnMgUGxheWVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzdWJtaXQtYnRuXCIgdHlwZT1cInN1Ym1pdFwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgbG9hZEhhbmRsZXJzKCl7XHJcbiAgICAgICAgY29uc3QgZ2V0UmFkaW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lTW9kZSBpbnB1dFwiKTtcclxuICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1idG5cIik7XHJcblxyXG4gICAgICAgIGdldFJhZGlvcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjaGFuZ2VcIiksICgpID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gXCJ2c1BsYXllclwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyTmFtZVwiKS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiBHYW1lU2V0dXAubG9hZCgpKTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IE1lbnUgZnJvbSAnLi4vU2VjdGlvbi9NZW51JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIE1lbnUubG9hZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyB1cGRhdGVQbG90Qm9hcmQgfSBmcm9tIFwiLi9QbG90XCI7XHJcblxyXG5jb25zdCBhZGRCb2FyZEhhbmRsZXIgPSAocGxheWVyKSA9PntcclxuICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcclxuICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKGUpID0+IGhhbmRsZU9yaWVudGF0aW9uKGUsIHBsYXllcikpKTtcclxufVxyXG5jb25zdCBoYW5kbGVPcmllbnRhdGlvbiA9IChlLCBwbGF5ZXIpID0+e1xyXG4gICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikgPyBzZXRPcmllbnRhdGlvbihlLCBwbGF5ZXIpIDogZmFsc2U7XHJcbn1cclxuY29uc3Qgc2V0T3JpZW50YXRpb24gPSAoZSwgcGxheWVyKSA9PntcclxuICAgIGNvbnN0IHJvdyA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICBjb25zdCBjb2wgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwSW5mbyhyb3csIGNvbCk7XHJcblxyXG4gICAgY29uc3Qgc3RhcnQgPSBzaGlwLmNvb3JkaW5hdGVbMF07IC8vdHlwZSBvZiBhcnJheVxyXG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiOyAvL3RvZ2dsZXMgb3JpZW50YXRpb25cclxuICAgIFxyXG4gICAgcGxheWVyLmJvYXJkLmRlbGV0ZVNoaXAoc2hpcCk7XHJcblxyXG4gICAgaWYocGxheWVyLmJvYXJkLmlzVmFsaWQoc2hpcCwgc3RhcnRbMF0sIHN0YXJ0WzFdLCBvcmllbnRhdGlvbikpe1xyXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgc3RhcnRbMF0sIHN0YXJ0WzFdLCBvcmllbnRhdGlvbik7XHJcbiAgICAgICAgc2hpcC5zZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgc3RhcnRbMF0sIHN0YXJ0WzFdLCBzaGlwLm9yaWVudGF0aW9uKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBjaGFuZ2VkXCIpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUGxvdEJvYXJkKHBsYXllcik7XHJcblxyXG59XHJcbmV4cG9ydCB7YWRkQm9hcmRIYW5kbGVyfSIsImltcG9ydCBcIi4uL3N0eWxlL2dhbWUuc2Nzc1wiXHJcblxyXG5leHBvcnQgY29uc3QgYmFubmVyID0gKG1lc3NhZ2UpID0+e1xyXG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgIGl0ZW0uaW5uZXJIVE1MID0gYDxoMT4ke21lc3NhZ2V9PC9oMT5gO1xyXG4gICAgcmV0dXJuIGl0ZW07XHJcbn1cclxuZXhwb3J0IGNvbnN0IGxvYWRCdXR0b25zID0ocGxheWVyKSA9PntcclxuICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYnV0dG9ucy5jbGFzc05hbWUgPSBcImJ1dHRvbnMtY29udGFpbmVyXCI7XHJcblxyXG4gICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInJhbmRvbS1wbGFjZW1lbnRcIik7XHJcbiAgICByYW5kb21QbGFjZW1lbnRCdG4udGV4dENvbnRlbnQ9XCJyYW5kb21cIjtcclxuXHJcbiAgICBjb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBjbGVhckJ0bi50ZXh0Q29udGVudCA9IFwiY2xlYXJcIjtcclxuICAgIGNsZWFyQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY2xlYXItYm9hcmRcIik7XHJcblxyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChyYW5kb21QbGFjZW1lbnRCdG4pO1xyXG4gICAgYnV0dG9ucy5hcHBlbmRDaGlsZChjbGVhckJ0bik7XHJcblxyXG4gICAgcmV0dXJuIGJ1dHRvbnM7XHJcbiAgICB9XHJcbmV4cG9ydCBjb25zdCBsb2FkQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRHYW1lYm9hcmQucm93czsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZSBkcm9wem9uZVwiO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKX0tJHtpfS0ke2p9YCk7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgdXBkYXRlQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRDb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcImhpdFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtwYXJzZWRSb3ddW3BhcnNlZENvbF0gPT09IFwibWlzc1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgbG9hZFN0YXJ0QnV0dG9uID0gKCkgPT57XHJcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBzdGFydEJ0bi5jbGFzc05hbWU9XCJzdGFydC1idG5cIjtcclxuICAgIHN0YXJ0QnRuLnRleHRDb250ZW50ID0gXCJEb25lXCI7XHJcbiAgICByZXR1cm4gc3RhcnRCdG47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGlwTWVudSA9IChwbGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG4gICBcclxuICAgICAgICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uY2xhc3NOYW1lID0gXCJzaGlwLWJ0biBkcmFnZ2FibGVcIjtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUJ0bik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVMb2FkU2hpcEJ0biA9IChlLCBwbGF5ZXIpID0+e1xyXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhzaGlwKTtcclxuICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKS5jaGlsZE5vZGVzO1xyXG4gXHJcbiAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgaGFuZGxlU3F1YXJlQ2xpY2sgPSAoZSwgc2hpcCwgcGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcblxyXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKTtcclxuICAgIH1cclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbmNsYXNzIEdhbWV7XHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGxheWVyMSA9IHBsYXllcjE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gcGxheWVyMjtcclxuICAgICAgICB0aGlzLndpbm5lciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50dXJuID0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvL3R1cm4gYmFzZSBwbGF5aW5nIGdhbWVcclxuXHJcbiAgICBnZXRBdHRhY2tlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJlY2VpdmVyKCl7XHJcbiAgICAgICAgaWYodGhpcy50dXJuICUgMiAhPT0gMCkge1xyXG4gICAgICAgICAgICAvL2lmIGl0J3MgcGxheWVyMSB0dXJuLCByZXR1cm5zIHBsYXllcjIgbmFtZS5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9yZXR1cm5zIHBsYXllcjEgYW5kIHBsYXllcjIgYXMgc3RyaW5nc1xyXG4gICAgZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dGFja2VyKCkubmFtZSA9PSB0aGlzLnBsYXllcjEubmFtZSA/IFwicGxheWVyMlwiIDogXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcbiAgICBuZXh0VHVybigpe1xyXG4gICAgICAgIHRoaXMudHVybisrO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRXaW5uZXIod2lubmVyKXtcclxuICAgICAgICB0aGlzLndpbm5lciA9IHdpbm5lcjtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU2V0dXBVSShwbGF5ZXIpe1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbnRlcmZhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuY2xhc3NOYW1lID0gXCJzZXR1cC1tZW51XCI7XHJcbiAgICAgICAgLy9Mb2FkIFNldCBwaWVjZXMgYnkgcGxheWVyc1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQoYmFubmVyKHBsYXllci5uYW1lKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChsb2FkQnV0dG9ucyhwbGF5ZXIpKTtcclxuICAgICAgICBjb25zdCBzaGlwTWVudUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzaGlwTWVudUJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYm9hcmQtY29udGFpbmVyXCI7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkQm9hcmQocGxheWVyKSk7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwTWVudShwbGF5ZXIpKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKHNoaXBNZW51Qm9hcmRDb250YWluZXIpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQobG9hZFN0YXJ0QnV0dG9uKCkpO1xyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodXNlckludGVyZmFjZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XHJcbmNsYXNzIEdhbWVib2FyZHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm93cyA9IDEwOyBcclxuICAgIHRoaXMuY29scyA9IDEwO1xyXG4gICAgdGhpcy5ncmlkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5yb3dzIH0sICgpID0+IEFycmF5KHRoaXMuY29scykuZmlsbChudWxsKSk7XHJcbiAgICB0aGlzLnNoaXBzID0gW1xyXG4gICAgICBuZXcgU2hpcChcIkFzc2F1bHQgU2hpcFwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJBaXJjcmFmdCBDYXJyaWVyXCIsIDUpLFxyXG4gICAgICBuZXcgU2hpcChcIkRlc3Ryb3llclwiLCA3KSxcclxuICAgICAgbmV3IFNoaXAoXCJDcnVpc2VyXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIlN1Ym1hcmluZVwiLCA0KSAgIFxyXG4gICAgXTtcclxuICB9XHJcbiAgcmVzZXQoKXtcclxuICAgIHRoaXMuY2xlYXJHcmlkKCk7XHJcbiAgICB0aGlzLmlzQWxsU2hpcHNEZXBsb3llZCgpO1xyXG4gIH1cclxuICAvL0NsZWFycyB0aGUgYm9hcmQuXHJcbiAgY2xlYXJHcmlkKCl7XHJcbiAgICB0aGlzLmdyaWQuZm9yRWFjaChyb3cgPT4gcm93LmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5jaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpO1xyXG4gIH1cclxuICAvL0NoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHNoaXBzIG9uIHRoZSBib2FyZCBhbmQgaWYgaXQgZml0cy5cclxuICBpc1ZhbGlkKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbil7XHJcbiAgICBpZihvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICBpZihjb2wgKyBzaGlwLmxlbmd0aCA+IHRoaXMuY29scylcclxuICAgICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSAvLyBcIkVycm9yOiBTaGlwIGRvZXNuJ3QgZml0IGhvcml6b250YWxseS5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IHNoaXAubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiRXJyb3I6IEEgc2hpcCBpcyBhbHJlYWR5IHByZXNlbnQgYXQgdGhpcyBsb2NhdGlvbiBob3Jpem9udGFsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5kZXggKys7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvL1Bhc3MgYWxsIHRlc3RcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSBlbHNlIGlmKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICBpZihyb3cgKyBzaGlwLmxlbmd0aCA+IHRoaXMucm93cykge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJTaGlwIGRvZXNuJ3QgZml0IHZlcnRpY2FsbHlcIjsgLy9TaGlwIGRvZXNuJ3QgZml0LlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUoaW5kZXggPCBzaGlwLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkEgc2hpcCBpcyBhbHJlYWR5IGF0IHRoaXMgbG9jYXRpb24gdmVydGljYWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgIC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZSAvL1wiSW52YWxpZCBkaXJlY3Rpb25cIjsgLy9pbnZhbGlkIG5hbWVcclxuICAgIH1cclxuICB9XHJcbi8vUGxhY2VzIHRoZSBzaGlwIG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKXtcclxuICAgIGlmKCF0aGlzLmlzVmFsaWQoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSlcclxuICAgIHJldHVybiBzaGlwLmRlcGxveTsgLy9mYWxzZVxyXG4gICAgXHJcbiAgICBpZihvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpXHJcbiAgICAgIHtcclxuICAgICAgICAvL2NoZWNrcyBmb3Igb3ZlcmxhcHMgb3Igb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdID0gc2hpcDtcclxuICAgICAgICAgICBzaGlwLmNvb3JkaW5hdGUucHVzaChbcm93LCBjb2wgKyBpbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIil7IC8vZGlyZWN0aW9uIGlzIGhvcml6b250YWxcclxuICAgICAgICAvL2lmIGV2ZXJ5dGhpbmcgcGFzc2VzLCBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgdGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdID0gc2hpcDtcclxuICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZS5wdXNoKFtyb3cgKyBpbmRleCwgY29sXSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gXHJcbiAgZ2V0U2hpcEluZm8ocm93LCBjb2wpXHJcbiAgICB7XHJcbiAgICAgIHJldHVybiB0aGlzLmdyaWRbcm93XVtjb2xdO1xyXG4gICAgfVxyXG4gIGdldFNoaXAoc2hpcE5hbWUpe1xyXG4gICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICBpZihzaGlwLm5hbWUgPT09IHNoaXBOYW1lKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSBzaGlwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gXCJzaGlwIG5vdCBmb3VuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgZGVsZXRlU2hpcChzaGlwTmFtZSl7XHJcbiAgICAgIHNoaXBOYW1lLmNvb3JkaW5hdGUuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgY29uc3Qgcm93ID0gaXRlbVswXTtcclxuICAgICAgICBjb25zdCBjb2wgPSBpdGVtWzFdO1xyXG4gICAgICAgIHRoaXMuZ3JpZFtyb3ddW2NvbF0gPSBudWxsO1xyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gdGhpcy5ncmlkO1xyXG4gICAgfVxyXG4gIC8vUGxhY2VzIGFuIGF0dGFjayBvbiB0aGUgYm9hcmQuXHJcbiAgcmVjZWl2ZUF0dGFjayh4LCB5KXtcclxuICAgIFxyXG4gICAgaWYoeCA+PSB0aGlzLmNvbHMgfHwgeSA+PXRoaXMucm93cyApXHJcbiAgICAgIHJldHVybiBcIm91dCBvZiBib3VuZHNcIjtcclxuICAgIGlmKHRoaXMuZ3JpZFt4XVt5XSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJtaXNzXCI7IC8vbWFyayBkb3duIG1pc3NcclxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5ncmlkW3hdW3ldO1xyXG4gICAgICBzaGlwLmhpdCgpO1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcImhpdFwiO1xyXG4gICAgICByZXR1cm4gXCJoaXRcIjtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF4SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG4gIGdldEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAuaGl0cztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcblxyXG4gIGNoZWNrc0RpZmZlcmVuY2UoKXtcclxuICAgIHJldHVybiB0aGlzLmdldE1heEhpdHMoKSAtIHRoaXMuZ2V0SGl0cygpO1xyXG4gIH1cclxuXHJcbiAgLy9DaGVja3MgaWYgdGhlIGdhbWUgaXMgb3Zlci5cclxuICBpc0dhbWVPdmVyKCl7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSk7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVja3NEaWZmZXJlbmNlKCkgPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0FsbFNoaXBzRGVwbG95ZWQoKXtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGlmKCFzaGlwLmRlcGxveSlcclxuICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKXtcclxuICAgIHRoaXMuc2hpcHMubWFwKChzaGlwKSA9PiBcclxuICAgICAge1xyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gZmFsc2U7XHJcbiAgICAgICAgc2hpcC5kZWxldGVDb29yZGluYXRlcygpO1xyXG4gICAgICAgIHNoaXAuc2V0T3JpZW50YXRpb24oXCJob3Jpem9udGFsXCIpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgeyBnZXRSYW5kb21Db29yZGluYXRlcyB9IGZyb20gJy4vUmFuZG9tJztcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZ2FtZWJvYXJkLCBvcHBvbmVudEJvYXJkLCBpc0h1bWFuKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZCA9IGdhbWVib2FyZDtcclxuICAgIHRoaXMub3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50Qm9hcmQ7XHJcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xyXG4gIH1cclxuXHJcbiAgLy8gUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIGF0dGFjayhlbmVteUJvYXJkTmFtZSwgcm93LCBjb2wpIHtcclxuICAgIGNvbnN0IHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlbmVteUJvYXJkTmFtZX0tJHtyb3d9LSR7Y29sfWApO1xyXG5cclxuICAgIGlmIChwbG90LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSB8fCBwbG90LmNsYXNzTGlzdC5jb250YWlucyhcIm1pc3NcIikpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiQWxyZWFkeSBhdHRhY2tlZCB0aGlzIHBvc2l0aW9uXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYXR0YWNrUmVzdWx0ID0gdGhpcy5vcHBvbmVudEJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xyXG5cclxuICAgIHRoaXMudXBkYXRlQXR0YWNrUmVzdWx0KHBsb3QsIGF0dGFja1Jlc3VsdCk7XHJcbiAgICByZXR1cm4gYXR0YWNrUmVzdWx0ID09PSBcImhpdFwiO1xyXG4gIH1cclxuXHJcbiAgLy8gUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIHJhbmRvbWx5IG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIHJhbmRvbUF0dGFjayhlbmVteUJvYXJkTmFtZSkge1xyXG4gICAgY29uc3QgW3JvdywgY29sXSA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKHRoaXMub3Bwb25lbnRCb2FyZCk7XHJcbiAgICBjb25zb2xlLmxvZyhcIlJhbmRvbSBhdHRhY2sgZXhlY3V0ZWRcIik7XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2soZW5lbXlCb2FyZE5hbWUsIHJvdywgY29sKTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIGF0dGFjayByZXN1bHRcclxuICB1cGRhdGVBdHRhY2tSZXN1bHQocGxvdCwgcmVzdWx0KSB7XHJcbiAgICBpZiAocmVzdWx0ID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIm1pc3NcIikge1xyXG4gICAgICBwbG90LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJpbXBvcnQgeyByYW5kb21QbGFjZW1lbnQgfSBmcm9tIFwiLi9SYW5kb21cIjtcclxuXHJcbmNvbnN0IHBsb3RTaGlwID0gKG5hbWUsIHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbiwgYm9hcmQpID0+IHtcclxuICBjb25zdCBhZGRTaGlwQ2xhc3MgPSAoZWxlbWVudElkKSA9PiB7XHJcbiAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xyXG4gICAgaWYgKHNxdWFyZSkgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gIH07XHJcblxyXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBhZGRTaGlwQ2xhc3MoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3Jvd30tJHtjb2wgKyBpbmRleH1gKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBhZGRTaGlwQ2xhc3MoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3JvdyArIGluZGV4fS0ke2NvbH1gKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkludmFsaWQgb3JpZW50YXRpb25cIik7XHJcbiAgICByZXR1cm4gXCJQbG90dGluZyBkaWRuJ3Qgd29yay5cIjtcclxuICB9XHJcbiAgcmV0dXJuIHsgbmFtZTogbmFtZSwgcm93OiByb3csIGNvbDogY29sLCBvcmllbnRhdGlvbjogb3JpZW50YXRpb24gfTtcclxufTtcclxuXHJcbmNvbnN0IHBsb3RTaGlwcyA9IChib2FyZE5hbWUsIGdhbWVib2FyZCkgPT4ge1xyXG4gIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChib2FyZE5hbWUudG9Mb3dlckNhc2UoKSkuY2hpbGROb2RlcztcclxuXHJcbiAgZ2V0U3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcclxuICAgIGNvbnN0IGNvbCA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICBjb25zdCByb3cgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgaWYgKGdhbWVib2FyZC5ncmlkW3Jvd11bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGdldFNxdWFyZXM7XHJcbn07XHJcblxyXG5jb25zdCB1cGRhdGVQbG90Qm9hcmQgPSAocGxheWVyKSA9PiB7XHJcbiAgY29uc3QgZ2V0TmFtZSA9IHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgcGxheWVyLmJvYXJkLmdyaWQuZm9yRWFjaCgocm93LCByb3dOdW0pID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjb2x1bW4sIGNvbE51bSkgPT4ge1xyXG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtnZXROYW1lfS0ke3Jvd051bX0tJHtjb2xOdW19YCk7XHJcbiAgICAgIGlmIChzcXVhcmUpIHtcclxuICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gY29sdW1uICE9PSBudWxsID8gXCJzcXVhcmUgc2hpcFwiIDogXCJzcXVhcmUgZHJvcHpvbmVcIjtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVSZW5kZXIgPSAocGxheWVyKSA9PiB7XHJcbiAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuY2hpbGROb2RlcztcclxuICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4geyBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmUgZHJvcHpvbmVcIjsgfSk7XHJcbn07XHJcblxyXG5jb25zdCBwbG90QWxsU2hpcHNSYW5kb21seSA9IChwbGF5ZXIpID0+IHtcclxuICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgaWYgKCFzaGlwLmRlcGxveSkge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQocGxheWVyLmJvYXJkLCBzaGlwKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gcGxheWVyLmJvYXJkO1xyXG59O1xyXG5cclxuY29uc3QgY2xlYXJCb2FyZCA9IChwbGF5ZXIpID0+IHtcclxuICBwbGF5ZXIuYm9hcmQuY2xlYXJHcmlkKCk7XHJcbiAgcGxheWVyLmJvYXJkLmNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCk7XHJcbiAgdXBkYXRlUGxvdEJvYXJkKHBsYXllcik7XHJcbiAgcmV0dXJuIHBsYXllci5ib2FyZDsgLy8gcmV0dXJucyBmYWxzZVxyXG59O1xyXG5cclxuY29uc3QgbG9hZEJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5ib2FyZC5yb3dzOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGxheWVyLmJvYXJkLmNvbHM7IGorKykge1xyXG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZUJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICBpZiAocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcImhpdFwiKSB7XHJcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgIH0gZWxzZSBpZiAocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcIm1pc3NcIikge1xyXG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQbG90cyBHYW1lIGJvYXJkIFVJIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBwbG90QmFubmVyID0gKG1lc3NhZ2UpID0+IHtcclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYm94LmlubmVySFRNTCA9IGA8aDI+JHttZXNzYWdlfTwvaDI+YDtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcclxuICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBsYXkgbmV4dCB0dXJuIGJ1dHRvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY29uc3QgbG9hZE5leHRUdXJuU2VjdGlvbiA9ICgpID0+e1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibmV4dC1idG5cIjtcclxuICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcblxyXG5jb25zdCBuZXh0VHVybkJ0biA9ICgpID0+e1xyXG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJuZXh0XCI7XHJcbiAgYnV0dG9uLmNsYXNzTmFtZSA9IFwibmV4dFwiO1xyXG4gIHJldHVybiBidXR0b247XHJcbn1cclxuY29uc3QgcGxvdEdhbWUgPSAoZ2FtZSkgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGxheWVyQm9hcmRcIjtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxvdEJhbm5lcihgJHtnYW1lLmdldEF0dGFja2VyKCkubmFtZX1gKSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxvYWRCb2FyZChnYW1lLmdldFJlY2VpdmVyKCkpKTtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZE5leHRUdXJuU2VjdGlvbigpKTtcclxuICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVBsYXkgYWdhaW4gTWVudSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmNvbnN0IGxvYWRQbGF5QWdhaW5NZW51ID0gKHdpbm5lciwgbG9zZXIpID0+IHtcclxuICBjb25zdCBwbGF5QWdhaW5NZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwbGF5QWdhaW5NZW51LmNsYXNzTmFtZSA9IFwibWVudS1ib3hcIjtcclxuICBwbGF5QWdhaW5NZW51LmlubmVySFRNTCA9IGBcclxuICAgIDxoMj4ke3dpbm5lcn0gaGFzIGRlZmVhdGVkICR7bG9zZXJ9PC9oMj5cclxuICAgIDxwPldvdWxkIHlvdSBsaWtlIHRvIHBsYXkgYWdhaW4/PC9wPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIlwiIGlkPVwicGxheS1hZ2FpblwiPlBsYXkgQWdhaW48L2J1dHRvbj5cclxuICBgO1xyXG4gIHJldHVybiBwbGF5QWdhaW5NZW51O1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBjbGVhckJvYXJkLFxyXG4gIGxvYWRQbGF5QWdhaW5NZW51LFxyXG4gIHBsb3RHYW1lLFxyXG4gIHBsb3RTaGlwLFxyXG4gIHBsb3RTaGlwcyxcclxuICBwbG90QWxsU2hpcHNSYW5kb21seSxcclxuICB1cGRhdGVCb2FyZCxcclxuICB1cGRhdGVQbG90Qm9hcmQsXHJcbiAgbmV4dFR1cm5CdG5cclxufTtcclxuIiwiLy8gR2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZiBjb2x1bW5zIGFuZCByb3dzLlxyXG5jb25zdCBnZW5lcmF0ZU51bWJlciA9IChtYXgpID0+IHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlIHJhbmRvbSBjb29yZGluYXRlcyB3aXRoaW4gdGhlIGdhbWUgYm9hcmQuXHJcbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PiB7XHJcbiAgbGV0IGNvbCA9IGdlbmVyYXRlTnVtYmVyKGdhbWVib2FyZC5jb2xzKTtcclxuICBsZXQgcm93ID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLnJvd3MpO1xyXG5cclxuICByZXR1cm4gW3JvdywgY29sXTtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlIGEgcmFuZG9tIHBsYWNlbWVudCBvbiB0aGUgYm9hcmQuXHJcbmNvbnN0IHJhbmRvbVBsYWNlbWVudCA9IChnYW1lYm9hcmQsIHNoaXApID0+IHtcclxuICBsZXQgcGxhY2VkID0gZmFsc2U7XHJcbiAgd2hpbGUgKCFwbGFjZWQpIHtcclxuICAgICAgY29uc3QgW3JvdywgY29sXSA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTtcclxuICAgICAgY29uc3Qgb3JpZW50YXRpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCI7XHJcblxyXG4gICAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSkge1xyXG4gICAgICAgICAgcGxhY2VkID0gZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pO1xyXG4gICAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZC5cclxuY29uc3QgZ2V0UmFuZG9tQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PiB7XHJcbiAgbGV0IHZhbGlkQ29vcmRpbmF0ZXMgPSBmYWxzZTtcclxuICBsZXQgY29vcmRpbmF0ZXM7XHJcblxyXG4gIHdoaWxlICghdmFsaWRDb29yZGluYXRlcykge1xyXG4gICAgICBjb29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTtcclxuXHJcbiAgICAgIGlmIChnYW1lYm9hcmQuZ3JpZFtjb29yZGluYXRlc1swXV1bY29vcmRpbmF0ZXNbMV1dICE9PSBcIm1pc3NcIiAmJlxyXG4gICAgICAgICAgZ2FtZWJvYXJkLmdyaWRbY29vcmRpbmF0ZXNbMF1dW2Nvb3JkaW5hdGVzWzFdXSAhPT0gXCJoaXRcIikge1xyXG4gICAgICAgICAgdmFsaWRDb29yZGluYXRlcyA9IHRydWU7XHJcbiAgICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG59O1xyXG5cclxuZXhwb3J0IHsgZ2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudCB9O1xyXG4iLCJpbXBvcnQge3Y0IGFzIHV1aWR2NH0gZnJvbSAndXVpZCdcclxuY29uc3QgX0RFRkFVTFRfb3JpZW50YXRpb24gID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG5jbGFzcyBTaGlwe1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCl7XHJcbiAgICB0aGlzLmlkID0gdXVpZHY0KCk7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5jb29yZGluYXRlID0gW107XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gX0RFRkFVTFRfb3JpZW50YXRpb247XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLmRlcGxveSA9IGZhbHNlO1xyXG4gIH1cclxuICBcclxuICBoaXQgPSAoKSA9PiB0aGlzLmhpdHMrKztcclxuXHJcbiAgaXNTdW5rID0gKCkgPT4gdGhpcy5sZW5ndGggLSB0aGlzLmhpdHMgPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gIGRlbGV0ZUNvb3JkaW5hdGVzID0gKCkgPT4gdGhpcy5jb29yZGluYXRlLnNwbGljZSgwLCB0aGlzLmNvb3JkaW5hdGUubGVuZ3RoKTsgLy9yZXR1cm5zIGFuIGVtcHR5IGFycmF5IFxyXG4gIFxyXG4gIHRvZ2dsZU9yaWVudGF0aW9uID0gKCkgPT4gdGhpcy5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyB0aGlzLnNldE9yaWVudGF0aW9uKFwidmVydGljYWxcIikgOiB0aGlzLnNldE9yaWVudGF0aW9uKFwiaG9yaXpvbnRhbFwiKTtcclxuXHJcbiAgc2V0T3JpZW50YXRpb24gPSAobmV3T3JpZW50YXRpb24pID0+IHRoaXMub3JpZW50YXRpb24gPSBuZXdPcmllbnRhdGlvbjtcclxuICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiBieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGUvc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvdW5kcy9BcHAuanNcIjtcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIEFwcC5sb2FkUGFnZSgpKTsiXSwibmFtZXMiOlsiQm9hcmQiLCJHYW1lIiwiUGxheWVyIiwicmFuZG9tUGxhY2VtZW50IiwiYWRkQm9hcmRIYW5kbGVyIiwicGxvdEdhbWUiLCJjbGVhckJvYXJkIiwidXBkYXRlQm9hcmQiLCJ1cGRhdGVQbG90Qm9hcmQiLCJwbG90U2hpcHMiLCJwbG90QWxsU2hpcHNSYW5kb21seSIsImxvYWRQbGF5QWdhaW5NZW51IiwibmV4dFR1cm5CdG4iLCJnZXRSb290IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZVdpbmRvdyIsIml0ZW0iLCJyZW1vdmVDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJHYW1lU2V0dXAiLCJsb2FkIiwic2V0dXAiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJpc1BsYXllclZzQ29tcHV0ZXIiLCJjaGVja2VkIiwiaXNQbGF5ZXJWc1BsYXllciIsImdldFBsYXllcjFOYW1lIiwidmFsdWUiLCJnZXRQbGF5ZXIyTmFtZSIsImdhbWUiLCJzZXR1cEdhbWUiLCJjb25zb2xlIiwibG9nIiwidXNlclNlbGVjdFNoaXAiLCJwbGF5ZXIiLCJkcmFnZ2VkU2hpcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYnV0dG9uIiwiYm9hcmQiLCJnZXRTaGlwIiwiZ2V0QXR0cmlidXRlIiwiZGVwbG95Iiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjdXJyZW50VGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJ0YXJnZXQiLCJyb3ciLCJwYXJzZUludCIsImNvbCIsImNvbnRhaW5zIiwiaXNWYWxpZCIsImNoZWNrIiwiZ3JpZCIsIm9yaWVudGF0aW9uIiwicGxhY2VTaGlwIiwicGxheWVyVHVybiIsInBsYXllcjEiLCJwbGF5ZXIyIiwibG9hZFNldHVwVUkiLCJyYW5kb21QbGFjZW1lbnRCdG4iLCJjbGVhckJ0biIsImRvbmVCdG4iLCJmaW5pc2hlZFNldHVwQnRuIiwiaXNIdW1hbiIsInNoaXBzIiwic2hpcCIsInBsYXkiLCJyZXNldCIsIndpbmRvdyIsIndpbm5lciIsInR1cm4iLCJhdHRhY2siLCJpZCIsInNwbGl0IiwiZ2V0UmVjZWl2ZXIiLCJuYW1lIiwidG9Mb3dlckNhc2UiLCJyZXN1bHQiLCJnZXRBdHRhY2tlciIsIm9wcG9uZW50Qm9hcmQiLCJyZWNlaXZlQXR0YWNrIiwiaGl0IiwibWlzcyIsIm5leHRUdXJuIiwiaXNHYW1lT3ZlciIsInNldFdpbm5lciIsImFwcGVuZENoaWxkIiwic3F1YXJlcyIsInJhbmRvbUF0dGFjayIsInNldFRpbWVvdXQiLCJnZXRDdXJyZW50VHVybk9wcG9uZW50IiwiTWVudSIsInJvb3QiLCJVSSIsImxvYWRIYW5kbGVycyIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJnZXRSYWRpb3MiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIkFwcCIsImxvYWRQYWdlIiwic3F1YXJlIiwiaGFuZGxlT3JpZW50YXRpb24iLCJzZXRPcmllbnRhdGlvbiIsImdldFNoaXBJbmZvIiwic3RhcnQiLCJjb29yZGluYXRlIiwiZGVsZXRlU2hpcCIsImJhbm5lciIsIm1lc3NhZ2UiLCJsb2FkQnV0dG9ucyIsImJ1dHRvbnMiLCJ0ZXh0Q29udGVudCIsImxvYWRCb2FyZCIsImdldEdhbWVib2FyZCIsImkiLCJyb3dzIiwiaiIsImNvbHMiLCJnZXRTcXVhcmVzIiwiY2hpbGROb2RlcyIsInBhcnNlZFJvdyIsInBhcnNlZENvbCIsImxvYWRTdGFydEJ1dHRvbiIsInN0YXJ0QnRuIiwic2hpcE1lbnUiLCJjcmVhdGVCdG4iLCJoYW5kbGVMb2FkU2hpcEJ0biIsImhhbmRsZVNxdWFyZUNsaWNrIiwiY29uc3RydWN0b3IiLCJ1c2VySW50ZXJmYWNlIiwic2hpcE1lbnVCb2FyZENvbnRhaW5lciIsIlNoaXAiLCJHYW1lYm9hcmQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiY2xlYXJHcmlkIiwiaXNBbGxTaGlwc0RlcGxveWVkIiwiY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQiLCJpbmRleCIsInB1c2giLCJzaGlwTmFtZSIsIngiLCJ5IiwiZ2V0TWF4SGl0cyIsInN1bSIsImdldEhpdHMiLCJoaXRzIiwiY2hlY2tzRGlmZmVyZW5jZSIsIm1hcCIsImRlbGV0ZUNvb3JkaW5hdGVzIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZXMiLCJnYW1lYm9hcmQiLCJlbmVteUJvYXJkTmFtZSIsInBsb3QiLCJ3YXJuIiwiYXR0YWNrUmVzdWx0IiwidXBkYXRlQXR0YWNrUmVzdWx0IiwicGxvdFNoaXAiLCJhZGRTaGlwQ2xhc3MiLCJlbGVtZW50SWQiLCJlcnJvciIsImJvYXJkTmFtZSIsImdldE5hbWUiLCJyb3dOdW0iLCJjb2x1bW4iLCJjb2xOdW0iLCJyZW1vdmVSZW5kZXIiLCJwbG90QmFubmVyIiwiYm94IiwibG9hZE5leHRUdXJuU2VjdGlvbiIsImxvc2VyIiwicGxheUFnYWluTWVudSIsImdlbmVyYXRlTnVtYmVyIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiZ2VuZXJhdGVDb29yZGluYXRlcyIsInBsYWNlZCIsInZhbGlkQ29vcmRpbmF0ZXMiLCJjb29yZGluYXRlcyIsInY0IiwidXVpZHY0IiwiX0RFRkFVTFRfb3JpZW50YXRpb24iLCJpc1N1bmsiLCJzcGxpY2UiLCJ0b2dnbGVPcmllbnRhdGlvbiIsIm5ld09yaWVudGF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==