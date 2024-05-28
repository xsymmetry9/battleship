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

        if (player.board.grid[row][col] === null) {
          //place the ship and plots it
          const orientation = "horizontal";
          player.placeShip(draggedShip, row, col, orientation);
          this.userSelectShip(player);
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
    const randomPlacementBtn = document.getElementById("random-placement");
    const clearBtn = document.getElementById("clear-board");
    const doneBtn = document.querySelector(".start-btn");

    //User is allowed to click and drag the ship to the board
    this.userSelectShip(player); //adds handler

    randomPlacementBtn.addEventListener("click", () => {
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.plotAllShipsRandomly)(player);
      console.log((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.updatePlotBoard)(player.board));
    });
    clearBtn.addEventListener("click", () => {
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.clearBoard)(player);
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
      // randomPlacement(game.player2);
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
  static play = game => {
    const getRoot = document.getElementById("root");
    if (game.winner != null) {
      // removeWindow(".playerBoard");
      //Need to test this code.
      getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.loadPlayAgainMenu)(game.getAttacker().name, game.getReceiver().name));
      document.getElementById("play-again").addEventListener("click", () => this.reset(game, ".menu-box"));
      return;
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
          game.getReceiver().board.isGameOver() ? game.setWinner(game.getAttacker().name) : game.nextTurn();
          // game.nextTurn();
          this.play(game);
        });
      });
    } else {
      //random attack
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.plotShips)(game.getReceiver().name, game.getReceiver().board);
      game.getAttacker().randomAttack(game.getReceiver().name);
      setTimeout(() => {
        getRoot.removeChild(document.querySelector(".playerBoard"));
        game.getReceiver().board.isGameOver() ? game.setWinner(game.getAttacker().name) : game.nextTurn();

        // game.nextTurn();
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
  placeShip(ship, row, col, orientation) {
    if (!ship.deploy && this.board.placeShip(ship, row, col, orientation)) {
      return (0,_Plot__WEBPACK_IMPORTED_MODULE_1__.plotShip)(this.name, ship, row, col, orientation, this.board);
    } else {
      return "Ship has already been deployed.  Tried again";
    }
  }
  //Player chooses to attack on the opponent's board.
  attack(enemyBoardName, row, col) {
    const plot = document.getElementById(`${enemyBoardName}-${row}-${col}`);
    if (this.opponentBoard.receiveAttack(row, col) === "hit") {
      plot.classList.add("hit");
      return true;
    } else {
      plot.classList.add("miss");
      return false;
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
/* harmony export */   loadPlayAgainMenu: () => (/* binding */ loadPlayAgainMenu),
/* harmony export */   plotAllShipsRandomly: () => (/* binding */ plotAllShipsRandomly),
/* harmony export */   plotBanner: () => (/* binding */ plotBanner),
/* harmony export */   plotGame: () => (/* binding */ plotGame),
/* harmony export */   plotMessage: () => (/* binding */ plotMessage),
/* harmony export */   plotShip: () => (/* binding */ plotShip),
/* harmony export */   plotShips: () => (/* binding */ plotShips),
/* harmony export */   plotTextBox: () => (/* binding */ plotTextBox),
/* harmony export */   removeAllChildNodes: () => (/* binding */ removeAllChildNodes),
/* harmony export */   removeRender: () => (/* binding */ removeRender),
/* harmony export */   updateBoard: () => (/* binding */ updateBoard),
/* harmony export */   updatePlotBoard: () => (/* binding */ updatePlotBoard)
/* harmony export */ });
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random */ "./src/compounds/Random.js");

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
const plotShip = (name, ship, row, col, orientation, board) => {
  if (orientation === "horizontal") {
    for (let index = 0; index < ship.length; index++) {
      const square = document.getElementById(`${name.toLowerCase()}-${row}-${col + index}`);
      square.classList.add("ship");
      addHandlerOrientation(ship, square, board);
    }
    return {
      name: name,
      row: row,
      col: col,
      orientation: orientation
    };
  } else if (orientation === "vertical") {
    for (let index = 0; index < ship.length; index++) {
      const createId = document.getElementById(`${name.toLowerCase()}-${row + index}-${col}`);
      createId.classList.add("ship");
      addHandlerOrientation(ship, square, board);
    }
    return {
      name: name,
      row: row,
      col: col,
      orientation: orientation
    };
  } else {
    return "Plotting didn't work.";
  }
};
const addHandlerOrientation = (ship, square, board) => {
  square.addEventListener("click", () => toggleOrientation(ship, board));
};
const toggleOrientation = (ship, board) => {
  const row = ship.coordinate[0][0];
  const col = ship.coordinate[0][1];
  const orientation = ship.orientation === "horizontal" ? "vertical" : "horizontal"; //toggles orientation

  board.deleteShip(ship); //deletes the ship from board
  if (board.isValid(ship, row, col, orientation)) {
    board.placeShip(ship, row, col, orientation);
    ship.setOrientation(orientation);
  } else {
    board.placeShip(ship, row, col, ship.orientation);
  }
  updatePlotBoard(board);
};
const updatePlotBoard = board => {
  board.grid.forEach((row, rowNum) => {
    row.forEach((column, colNum) => {
      const square = document.getElementById(`gary-${rowNum}-${colNum}`);
      if (column !== null) {
        square.className = "square ship";
        square.addEventListener("click", () => {
          //selects the ship if user wants to change ship'sorientation
          //***code goes here */
          console.log("selected");
        });
      } else {
        square.className = "square dropzone";
      }
    });
  });
};
const plotMessage = message => {
  const box = document.querySelector(".display-wrapper h2");
  box.textContent = message;
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
      console.log("not deployed");
      (0,_Random__WEBPACK_IMPORTED_MODULE_0__.randomPlacement)(player.board, ship);
    } else {
      console.log(ship);
    }
  });
  return player.board;
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
const playAgainButton = () => {
  const button = document.createElement("button");
  button.setAttribute("id", "play-again");
  button.textContent = "Play again";
  return button;
};
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
  const orientation = Math.random() < 0.5 ? "vertical" : "horizontal";
  if (gameboard.isValid(ship, coordinates[0], coordinates[1], orientation)) {
    return gameboard.placeShip(ship, coordinates[0], coordinates[1], orientation);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxpREFBaUQsK0NBQUcsS0FBSzs7QUFFekQ7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsOERBQWU7QUFDeEI7O0FBRUEsaUVBQWUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztBQzVCYzs7QUFFL0I7QUFDQSxxQ0FBcUMsaURBQUs7QUFDMUM7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7O1VDTnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040QjtBQUNTO0FBRXJDekYsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUV5RCx5REFBRyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9scy8uL3NyYy9TZWN0aW9uL0dhbWVTZXR1cC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9TZWN0aW9uL01lbnUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0FwcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvR2FtZS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1Bsb3QuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1JhbmRvbS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvU2hpcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9nYW1lLnNjc3M/Njg0OCIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9tZW51LnNjc3M/NjdjMCIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9scy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9hcmQgZnJvbSBcIi4uL2NvbXBvdW5kcy9HYW1lYm9hcmRcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2NvbXBvdW5kcy9HYW1lXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL2NvbXBvdW5kcy9QbGF5ZXJcIjtcclxuaW1wb3J0IHtyYW5kb21QbGFjZW1lbnR9IGZyb20gXCIuLi9jb21wb3VuZHMvUmFuZG9tXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgcGxvdEdhbWUsXHJcbiAgICBjbGVhckJvYXJkLFxyXG4gICAgdXBkYXRlQm9hcmQsXHJcbiAgICB1cGRhdGVQbG90Qm9hcmQsXHJcbiAgICBwbG90U2hpcHMsXHJcbiAgICBwbG90QWxsU2hpcHNSYW5kb21seSxcclxuICAgIGxvYWRQbGF5QWdhaW5NZW51LFxyXG4gICAgfSBmcm9tICcuLi9jb21wb3VuZHMvUGxvdCdcclxuXHJcbmNvbnN0IHJlbW92ZVdpbmRvdyA9IChpdGVtKSA9PntcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGl0ZW0pKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2V0dXB7XHJcbiAgICBzdGF0aWMgbG9hZCgpe1xyXG4gICAgICAgIHRoaXMuc2V0dXAoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBzZXR1cCgpe1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjFCb2FyZCA9IG5ldyBCb2FyZCgpO1xyXG4gICAgICAgIGNvbnN0IHBsYXllcjJCb2FyZCA9IG5ldyBCb2FyZCgpXHJcblxyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNDb21wdXRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidnNDb21wdXRlclwiKS5jaGVja2VkO1xyXG4gICAgICAgIGNvbnN0IGlzUGxheWVyVnNQbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZzUGxheWVyXCIpLmNoZWNrZWQ7XHJcblxyXG4gICAgICAgaWYoaXNQbGF5ZXJWc1BsYXllciB8fCBpc1BsYXllclZzQ29tcHV0ZXIpXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldFBsYXllcjFOYW1lID0gbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFOYW1lXCIpLnZhbHVlLCBwbGF5ZXIxQm9hcmQsIHBsYXllcjJCb2FyZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvL0RldGVybWluZXMgaWYgcGxheWVyIDIgaXMgaHVtYW4gb3IgY29tcHV0ZXJcclxuICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMk5hbWUgPSBpc1BsYXllclZzQ29tcHV0ZXIgPyBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyMkJvYXJkLCBwbGF5ZXIxQm9hcmQsIGZhbHNlKSA6IFxyXG4gICAgICAgICAgICAgICAgbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLnZhbHVlLCBwbGF5ZXIyQm9hcmQsIHBsYXllcjFCb2FyZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBnYW1lID0gbmV3IEdhbWUoZ2V0UGxheWVyMU5hbWUsIGdldFBsYXllcjJOYW1lKTtcclxuICAgICAgICAgICAgcmVtb3ZlV2luZG93KFwiLm1lbnUtYm94XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAxXCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGdhbWU7XHJcblxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIFwiZXJyb3JcIjtcclxuICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyB1c2VyU2VsZWN0U2hpcCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgIGxldCBkcmFnZ2VkU2hpcDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWJ0blwiKS5mb3JFYWNoKChidXR0b24pID0+e1xyXG4gICAgICAgICAgICAhcGxheWVyLmJvYXJkLmdldFNoaXAoYnV0dG9uLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKS5kZXBsb3kgPyBcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgdHJ1ZSkgOiBidXR0b24uc2V0QXR0cmlidXRlKFwiZHJhZ2dhYmxlXCIsIGZhbHNlKTtcclxuICAgICAgICB9KSBcclxuICAgICAgIFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZHJhZ2dhYmxlXCIpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoKFwiZHJhZ3N0YXJ0XCIpLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdnZWRTaGlwID0gcGxheWVyLmJvYXJkLmdldFNoaXAoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcInZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigoXCJkcmFnZW5kXCIpLCAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUmVtb3ZlcyB0aGUgcmVuZGVyIG9mIHRoZSBzZWxlY3RlZCBidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc3F1YXJlXCIpLmZvckVhY2goKHRhcmdldCkgPT57XHJcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIixcclxuICAgICAgICAgICAgICAgIChlKSA9PntcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLCAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTsgLy9yZXR1cm5zIHJvd1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wem9uZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmJvYXJkLmlzVmFsaWQoZHJhZ2dlZFNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIikgPyBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcInZhbGlkXCIpIDogZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJpbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnbGVhdmVcIiwgZSA9PntcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTsgLy9yZXR1cm5zIHJvd1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkcm9wem9uZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmJvYXJkLmlzVmFsaWQoZHJhZ2dlZFNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIikgPyBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZhbGlkXCIpIDogZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJpbnZhbGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gW1widmFsaWRcIiwgXCJpbnZhbGlkXCJdO1xyXG5cclxuICAgICAgICAgICAgICAgIGNoZWNrLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmFsaWRcIikgfHwgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImludmFsaWRcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpKTsgLy9yZXR1cm5zIHJvd1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5ncmlkW3Jvd11bY29sXSA9PT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy9wbGFjZSB0aGUgc2hpcCBhbmQgcGxvdHMgaXRcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gXCJob3Jpem9udGFsXCJcclxuICAgICAgICAgICAgICAgIHBsYXllci5wbGFjZVNoaXAoZHJhZ2dlZFNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJTZWxlY3RTaGlwKHBsYXllcik7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy9zZWxlY3RzIHRoZSBzaGlwXHJcbiAgICAgICAgICAgICAgICByZXR1cm4oXCJUaGVyZSBpcyBhIHNoaXAgbG9jYXRlZCB0aGVyZS4gIFBsYWNlIGFub3RoZXIgc3F1YXJlLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiBcclxuICAgICBzdGF0aWMgc2V0dXBHYW1lID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gICAgICAgIGNvbnN0IHBsYXllciA9IHBsYXllclR1cm4gPT09IFwicGxheWVyIDFcIiA/IGdhbWUucGxheWVyMSA6IGdhbWUucGxheWVyMjtcclxuICAgICAgICBnYW1lLmxvYWRTZXR1cFVJKHBsYXllcik7XHJcbiAgICAgICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb20tcGxhY2VtZW50XCIpO1xyXG4gICAgICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKTtcclxuICAgICAgICBjb25zdCBkb25lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1idG5cIik7XHJcblxyXG4gICAgICAgIC8vVXNlciBpcyBhbGxvd2VkIHRvIGNsaWNrIGFuZCBkcmFnIHRoZSBzaGlwIHRvIHRoZSBib2FyZFxyXG4gICAgICAgIHRoaXMudXNlclNlbGVjdFNoaXAocGxheWVyKTsgLy9hZGRzIGhhbmRsZXJcclxuICAgICAgICAgXHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHtcclxuICAgICAgICAgICAgcGxvdEFsbFNoaXBzUmFuZG9tbHkocGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codXBkYXRlUGxvdEJvYXJkKHBsYXllci5ib2FyZCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJCb2FyZChwbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJTZWxlY3RTaGlwKHBsYXllcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB0aGlzLmZpbmlzaGVkU2V0dXBCdG4oZ2FtZSwgcGxheWVyVHVybikpO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVyO1xyXG4gICAgIH1cclxuIFxyXG4gICAgIHN0YXRpYyBmaW5pc2hlZFNldHVwQnRuID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gXHJcbiAgICAgICAgIHJlbW92ZVdpbmRvdyhcIi5zZXR1cC1tZW51XCIpO1xyXG5cclxuICAgICAgICBpZihnYW1lLnBsYXllcjIuaXNIdW1hbiAmJiBwbGF5ZXJUdXJuID09PSBcInBsYXllciAxXCIpe1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAyXCIpXHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAvLyByYW5kb21QbGFjZW1lbnQoZ2FtZS5wbGF5ZXIyKTtcclxuICAgICAgICAgICAgLy9nZW5lcmF0ZSByYW5kb21QbGFjZW1lbnQgZm9yIHBsYXllciAyXHJcbiAgICAgICAgICAgIGdhbWUucGxheWVyMi5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PntcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudChnYW1lLnBsYXllcjIuYm9hcmQsIHNoaXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KGdhbWUpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgfVxyXG4gICAgIHN0YXRpYyByZXNldCA9IChnYW1lLCB3aW5kb3cpID0+IHtcclxuICAgICAgICBnYW1lLnBsYXllcjEuYm9hcmQucmVzZXQoKTtcclxuICAgICAgICBnYW1lLnBsYXllcjIuYm9hcmQucmVzZXQoKTtcclxuICAgICAgICBnYW1lLndpbm5lciA9IG51bGw7XHJcbiAgICAgICAgZ2FtZS50dXJuID0gMTtcclxuICAgICAgICByZW1vdmVXaW5kb3cod2luZG93KTtcclxuICAgICAgICAvL2xvYWRzIHNldHVwIG1lbnVcclxuICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAxXCIpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgc3RhdGljIHBsYXkgPShnYW1lKSA9PntcclxuICAgICAgICBjb25zdCBnZXRSb290ID0gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbiAgICAgICAgaWYoZ2FtZS53aW5uZXIgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIC8vIHJlbW92ZVdpbmRvdyhcIi5wbGF5ZXJCb2FyZFwiKTtcclxuICAgICAgICAgICAgLy9OZWVkIHRvIHRlc3QgdGhpcyBjb2RlLlxyXG4gICAgICAgICAgICBnZXRSb290LmFwcGVuZENoaWxkKGxvYWRQbGF5QWdhaW5NZW51KGdhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lLCBnYW1lLmdldFJlY2VpdmVyKCkubmFtZSkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXktYWdhaW5cIikuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCk9PiB0aGlzLnJlc2V0KGdhbWUsIFwiLm1lbnUtYm94XCIpKTsgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybjsgICAgIFxyXG4gICAgICAgIH1cclxuICAgXHJcbiAgICAgICAgLy9XaG9ldmVyIGlzIHRoZSBhdHRhY2tlclxyXG4gICAgICAgIGdldFJvb3QuYXBwZW5kQ2hpbGQocGxvdEdhbWUoZ2FtZSkpO1xyXG4gICAgICAgIHVwZGF0ZUJvYXJkKGdhbWUuZ2V0UmVjZWl2ZXIoKSk7XHJcbiAgICAgICAgaWYoZ2FtZS5nZXRBdHRhY2tlcigpLmlzSHVtYW4pXHJcbiAgICAgICAgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2xvYWQgcHJldmlvdXMgbW92ZXMgaWYgYW55XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNxdWFyZVwiKTtcclxuICAgICAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0RvZXNuJ3QgYWRkIGV2ZW50TGlzdGVuZXIgYmVjYXVzZSB0aGUgc3F1YXJlIGlzIG9jY3VwaWVkLlxyXG4gICAgICAgICAgICAgICAgaWYoZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLmdyaWRbcm93XVtjb2xdID09PSBcImhpdFwiIHx8IGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZC5ncmlkW3Jvd11bY29sXSA9PT0gXCJtaXNzXCIpeyBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIGUgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuZ2V0QXR0YWNrZXIoKS5hdHRhY2soZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUsIHJvdywgY29sKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSb290LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZC5pc0dhbWVPdmVyKCkgPyBnYW1lLnNldFdpbm5lcihnYW1lLmdldEF0dGFja2VyKCkubmFtZSkgOiBnYW1lLm5leHRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2FtZS5uZXh0VHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3JhbmRvbSBhdHRhY2tcclxuICAgICAgICAgICAgcGxvdFNoaXBzKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCBnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQpO1xyXG4gICAgICAgICAgICBnYW1lLmdldEF0dGFja2VyKCkucmFuZG9tQXR0YWNrKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgIGdldFJvb3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKSk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuaXNHYW1lT3ZlcigpID8gZ2FtZS5zZXRXaW5uZXIoZ2FtZS5nZXRBdHRhY2tlcigpLm5hbWUpIDogZ2FtZS5uZXh0VHVybigpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGdhbWUubmV4dFR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYW1lLmdldEN1cnJlbnRUdXJuT3Bwb25lbnQoKTtcclxuXHJcbiAgICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgJy4uL3N0eWxlL21lbnUuc2NzcydcclxuaW1wb3J0IEdhbWVTZXR1cCBmcm9tIFwiLi9HYW1lU2V0dXBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnV7XHJcbiAgICBzdGF0aWMgbG9hZCgpe1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLlVJKCkpO1xyXG4gICAgICAgIHRoaXMubG9hZEhhbmRsZXJzKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgVUkoKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm1lbnUtYm94XCI7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxoMSBjbGFzcz1cInRleHQtY2VudGVyZWRcIj5XZWxjb21lIHRvIEJhdHRsZXNoaXA8L2gxPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiZ2FtZUZvcm1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGxheWVyMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+UGxheWVyIDE6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBsYXllcjFOYW1lXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiBpZD1cInBsYXllcjJJbnB1dFwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGxheWVyMlwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+UGxheWVyIDI6PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInBsYXllcjJOYW1lXCIgZGlzYWJsZWQvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZ2FtZU1vZGVcIiBjbGFzcz1cImdhbWVNb2RlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkID1cInZzQ29tcHV0ZXJcIiBuYW1lPVwiZ2FtZU1vZGVcIiB2YWx1ZT1cImNvbXB1dGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInZzQ29tcHV0ZXJcIj5QbGF5ZXIgdnMgQ29tcHV0ZXI8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cInZzUGxheWVyXCIgbmFtZT1cImdhbWVNb2RlXCIgdmFsdWU9XCJwbGF5ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwidnNQbGF5ZXJcIj5QbGF5ZXIgdnMgUGxheWVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidXR0b25zLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzdWJtaXQtYnRuXCIgdHlwZT1cInN1Ym1pdFwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgYFxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgbG9hZEhhbmRsZXJzKCl7XHJcbiAgICAgICAgY29uc3QgZ2V0UmFkaW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lTW9kZSBpbnB1dFwiKTtcclxuICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1idG5cIik7XHJcblxyXG4gICAgICAgIGdldFJhZGlvcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjaGFuZ2VcIiksICgpID0+e1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSA9PT0gXCJ2c1BsYXllclwiKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyTmFtZVwiKS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiBHYW1lU2V0dXAubG9hZCgpKTtcclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IE1lbnUgZnJvbSAnLi4vU2VjdGlvbi9NZW51JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIE1lbnUubG9hZCgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge2FkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXJ9IGZyb20gJy4vRnVuY3Rpb25zJ1xyXG5pbXBvcnQge3Bsb3RNZXNzYWdlLCByYW5kb21QbGFjZW1lbnR9IGZyb20gJy4vUGxvdCdcclxuaW1wb3J0IFwiLi4vc3R5bGUvZ2FtZS5zY3NzXCJcclxuXHJcbmV4cG9ydCBjb25zdCBiYW5uZXIgPSAobWVzc2FnZSkgPT57XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBgPGgxPiR7bWVzc2FnZX08L2gxPmA7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5leHBvcnQgY29uc3QgbG9hZEJ1dHRvbnMgPShwbGF5ZXIpID0+e1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBidXR0b25zLmNsYXNzTmFtZSA9IFwiYnV0dG9ucy1jb250YWluZXJcIjtcclxuXHJcbiAgICBjb25zdCByYW5kb21QbGFjZW1lbnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgcmFuZG9tUGxhY2VtZW50QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgIHJhbmRvbVBsYWNlbWVudEJ0bi50ZXh0Q29udGVudD1cInJhbmRvbVwiO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNsZWFyQnRuLnRleHRDb250ZW50ID0gXCJjbGVhclwiO1xyXG4gICAgY2xlYXJCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjbGVhci1ib2FyZFwiKTtcclxuXHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKHJhbmRvbVBsYWNlbWVudEJ0bik7XHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKGNsZWFyQnRuKTtcclxuXHJcbiAgICByZXR1cm4gYnV0dG9ucztcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGxvYWRCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gcGxheWVyLmJvYXJkO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlIGRyb3B6b25lXCI7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwicm93XCIsIGkpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpfS0ke2l9LSR7an1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgdXBkYXRlQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZFJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRDb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcImhpdFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtwYXJzZWRSb3ddW3BhcnNlZENvbF0gPT09IFwibWlzc1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgbG9hZFN0YXJ0QnV0dG9uID0gKCkgPT57XHJcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBzdGFydEJ0bi5jbGFzc05hbWU9XCJzdGFydC1idG5cIjtcclxuICAgIHN0YXJ0QnRuLnRleHRDb250ZW50ID0gXCJEb25lXCI7XHJcbiAgICByZXR1cm4gc3RhcnRCdG47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzaGlwTWVudSA9IChwbGF5ZXIpID0+IHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG4gICBcclxuICAgICAgICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uY2xhc3NOYW1lID0gXCJzaGlwLWJ0biBkcmFnZ2FibGVcIjtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUJ0bik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVMb2FkU2hpcEJ0biA9IChlLCBwbGF5ZXIpID0+e1xyXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhzaGlwKTtcclxuICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKS5jaGlsZE5vZGVzO1xyXG4gXHJcbiAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgaGFuZGxlU3F1YXJlQ2xpY2sgPSAoZSwgc2hpcCwgcGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcblxyXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKTtcclxuICAgIH1cclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbmNsYXNzIEdhbWV7XHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGxheWVyMSA9IHBsYXllcjE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gcGxheWVyMjtcclxuICAgICAgICB0aGlzLndpbm5lciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50dXJuID0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvL3R1cm4gYmFzZSBwbGF5aW5nIGdhbWVcclxuXHJcbiAgICBnZXRBdHRhY2tlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJlY2VpdmVyKCl7XHJcbiAgICAgICAgaWYodGhpcy50dXJuICUgMiAhPT0gMCkge1xyXG4gICAgICAgICAgICAvL2lmIGl0J3MgcGxheWVyMSB0dXJuLCByZXR1cm5zIHBsYXllcjIgbmFtZS5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9yZXR1cm5zIHBsYXllcjEgYW5kIHBsYXllcjIgYXMgc3RyaW5nc1xyXG4gICAgZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dGFja2VyKCkubmFtZSA9PSB0aGlzLnBsYXllcjEubmFtZSA/IFwicGxheWVyMlwiIDogXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcbiAgICBuZXh0VHVybigpe1xyXG4gICAgICAgIHRoaXMudHVybisrO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR1cm47XHJcbiAgICB9XHJcbiAgICBzZXRXaW5uZXIod2lubmVyKXtcclxuICAgICAgICB0aGlzLndpbm5lciA9IHdpbm5lcjtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkU2V0dXBVSShwbGF5ZXIpe1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbnRlcmZhY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuY2xhc3NOYW1lID0gXCJzZXR1cC1tZW51XCI7XHJcbiAgICAgICAgLy9Mb2FkIFNldCBwaWVjZXMgYnkgcGxheWVyc1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQoYmFubmVyKHBsYXllci5uYW1lKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChsb2FkQnV0dG9ucyhwbGF5ZXIpKTtcclxuICAgICAgICBjb25zdCBzaGlwTWVudUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBzaGlwTWVudUJvYXJkQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYm9hcmQtY29udGFpbmVyXCI7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkQm9hcmQocGxheWVyKSk7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzaGlwTWVudShwbGF5ZXIpKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKHNoaXBNZW51Qm9hcmRDb250YWluZXIpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQobG9hZFN0YXJ0QnV0dG9uKCkpO1xyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodXNlckludGVyZmFjZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XHJcbmNsYXNzIEdhbWVib2FyZHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm93cyA9IDEwOyBcclxuICAgIHRoaXMuY29scyA9IDEwO1xyXG4gICAgdGhpcy5ncmlkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5yb3dzIH0sICgpID0+IEFycmF5KHRoaXMuY29scykuZmlsbChudWxsKSk7XHJcbiAgICB0aGlzLnNoaXBzID0gW1xyXG4gICAgICBuZXcgU2hpcChcIkFzc2F1bHQgU2hpcFwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJBaXJjcmFmdCBDYXJyaWVyXCIsIDUpLFxyXG4gICAgICBuZXcgU2hpcChcIkRlc3Ryb3llclwiLCA3KSxcclxuICAgICAgbmV3IFNoaXAoXCJDcnVpc2VyXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIlN1Ym1hcmluZVwiLCA0KSAgIFxyXG4gICAgXTtcclxuICB9XHJcbiAgcmVzZXQoKXtcclxuICAgIHRoaXMuY2xlYXJHcmlkKCk7XHJcbiAgICB0aGlzLmlzQWxsU2hpcHNEZXBsb3llZCgpO1xyXG4gIH1cclxuICAvL0NsZWFycyB0aGUgYm9hcmQuXHJcbiAgY2xlYXJHcmlkKCl7XHJcbiAgICB0aGlzLmdyaWQuZm9yRWFjaChyb3cgPT4gcm93LmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5jaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpO1xyXG4gIH1cclxuICAvL0NoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHNoaXBzIG9uIHRoZSBib2FyZCBhbmQgaWYgaXQgZml0cy5cclxuICBpc1ZhbGlkKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbil7XHJcbiAgICBpZihvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICBpZihjb2wgKyBzaGlwLmxlbmd0aCA+IHRoaXMuY29scylcclxuICAgICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSAvLyBcIkVycm9yOiBTaGlwIGRvZXNuJ3QgZml0IGhvcml6b250YWxseS5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IHNoaXAubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiRXJyb3I6IEEgc2hpcCBpcyBhbHJlYWR5IHByZXNlbnQgYXQgdGhpcyBsb2NhdGlvbiBob3Jpem9udGFsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5kZXggKys7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvL1Bhc3MgYWxsIHRlc3RcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSBlbHNlIGlmKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgICBpZihyb3cgKyBzaGlwLmxlbmd0aCA+IHRoaXMucm93cykge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJTaGlwIGRvZXNuJ3QgZml0IHZlcnRpY2FsbHlcIjsgLy9TaGlwIGRvZXNuJ3QgZml0LlxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUoaW5kZXggPCBzaGlwLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkEgc2hpcCBpcyBhbHJlYWR5IGF0IHRoaXMgbG9jYXRpb24gdmVydGljYWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgIC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZSAvL1wiSW52YWxpZCBkaXJlY3Rpb25cIjsgLy9pbnZhbGlkIG5hbWVcclxuICAgIH1cclxuICB9XHJcbi8vUGxhY2VzIHRoZSBzaGlwIG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKXtcclxuICAgIGlmKCF0aGlzLmlzVmFsaWQoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKSlcclxuICAgIHJldHVybiBzaGlwLmRlcGxveTsgLy9mYWxzZVxyXG4gICAgXHJcbiAgICBpZihvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpXHJcbiAgICAgIHtcclxuICAgICAgICAvL2NoZWNrcyBmb3Igb3ZlcmxhcHMgb3Igb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdID0gc2hpcDtcclxuICAgICAgICAgICBzaGlwLmNvb3JkaW5hdGUucHVzaChbcm93LCBjb2wgKyBpbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIil7IC8vZGlyZWN0aW9uIGlzIGhvcml6b250YWxcclxuICAgICAgICAvL2lmIGV2ZXJ5dGhpbmcgcGFzc2VzLCBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgdGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdID0gc2hpcDtcclxuICAgICAgICAgIHNoaXAuY29vcmRpbmF0ZS5wdXNoKFtyb3cgKyBpbmRleCwgY29sXSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gXHJcbiAgICBnZXRTaGlwKHNoaXBOYW1lKXtcclxuICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgaWYoc2hpcC5uYW1lID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIFwic2hpcCBub3QgZm91bmRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZGVsZXRlU2hpcChzaGlwTmFtZSl7XHJcbiAgICAgIHNoaXBOYW1lLmNvb3JkaW5hdGUuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgY29uc3Qgcm93ID0gaXRlbVswXTtcclxuICAgICAgICBjb25zdCBjb2wgPSBpdGVtWzFdO1xyXG4gICAgICAgIHRoaXMuZ3JpZFtyb3ddW2NvbF0gPSBudWxsO1xyXG4gICAgICB9KVxyXG4gICAgICByZXR1cm4gdGhpcy5ncmlkO1xyXG4gICAgfVxyXG4gIC8vUGxhY2VzIGFuIGF0dGFjayBvbiB0aGUgYm9hcmQuXHJcbiAgcmVjZWl2ZUF0dGFjayh4LCB5KXtcclxuICAgIFxyXG4gICAgaWYoeCA+PSB0aGlzLmNvbHMgfHwgeSA+PXRoaXMucm93cyApXHJcbiAgICAgIHJldHVybiBcIm91dCBvZiBib3VuZHNcIjtcclxuICAgIGlmKHRoaXMuZ3JpZFt4XVt5XSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJtaXNzXCI7IC8vbWFyayBkb3duIG1pc3NcclxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5ncmlkW3hdW3ldO1xyXG4gICAgICBzaGlwLmhpdCgpO1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcImhpdFwiO1xyXG4gICAgICByZXR1cm4gXCJoaXRcIjtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF4SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG4gIGdldEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAuaGl0cztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcblxyXG4gIGNoZWNrc0RpZmZlcmVuY2UoKXtcclxuICAgIHJldHVybiB0aGlzLmdldE1heEhpdHMoKSAtIHRoaXMuZ2V0SGl0cygpO1xyXG4gIH1cclxuXHJcbiAgLy9DaGVja3MgaWYgdGhlIGdhbWUgaXMgb3Zlci5cclxuICBpc0dhbWVPdmVyKCl7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSk7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVja3NEaWZmZXJlbmNlKCkgPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0FsbFNoaXBzRGVwbG95ZWQoKXtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGlmKCFzaGlwLmRlcGxveSlcclxuICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKXtcclxuICAgIHRoaXMuc2hpcHMubWFwKChzaGlwKSA9PiBzaGlwLmRlcGxveSA9IGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCB7Z2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudH0gZnJvbSAnLi9SYW5kb20nO1xyXG5pbXBvcnQge3Bsb3RTaGlwfSBmcm9tICcuL1Bsb3QnO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBnYW1lYm9hcmQsIG9wcG9uZW50Qm9hcmQsIGlzSHVtYW4pXHJcbiAge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQgPSBnYW1lYm9hcmQ7XHJcbiAgICB0aGlzLm9wcG9uZW50Qm9hcmQgPSBvcHBvbmVudEJvYXJkO1xyXG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcclxuXHJcbiAgfVxyXG4gIC8vUGxhY2VzIHNoaXBzIHJhbmRvbWx5IG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVJhbmRvbVRvQm9hcmQoKXtcclxuICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQodGhpcy5ib2FyZCwgc2hpcCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLm9wcG9uZW50Qm9hcmQuc2hpcHM7XHJcbiAgfVxyXG4vL0EgZnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gdGhlIGJvYXJkIG1hbnVhbGx5LlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pXHJcbiAge1xyXG4gICAgaWYgKCFzaGlwLmRlcGxveSAmJiB0aGlzLmJvYXJkLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pKXtcclxuICAgICAgcmV0dXJuIHBsb3RTaGlwKHRoaXMubmFtZSwgc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uLCB0aGlzLmJvYXJkKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCJTaGlwIGhhcyBhbHJlYWR5IGJlZW4gZGVwbG95ZWQuICBUcmllZCBhZ2FpblwiXHJcbiAgICB9XHJcblxyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCl7XHJcbiAgICBjb25zdCBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZW5lbXlCb2FyZE5hbWV9LSR7cm93fS0ke2NvbH1gKTtcclxuXHJcbiAgICBpZih0aGlzLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCkgPT09IFwiaGl0XCIpXHJcbiAgICB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgcmV0dXJuIHRydWU7IFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGxvdC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICB9XHJcbi8vUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIHJhbmRvbWx5IG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIHJhbmRvbUF0dGFjayhlbmVteUJvYXJkTmFtZSl7XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKHRoaXMub3Bwb25lbnRCb2FyZCk7XHJcbiAgICBjb25zdCByb3cgPSBjb29yZGluYXRlc1swXTtcclxuICAgIGNvbnN0IGNvbCA9IGNvb3JkaW5hdGVzWzFdO1xyXG4gICAgY29uc29sZS5sb2coXCJyYW5kb20gYXR0YWNrIGV4ZWN1dGVkXCIpO1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImltcG9ydCB7cmFuZG9tUGxhY2VtZW50fSBmcm9tIFwiLi9SYW5kb21cIjtcclxuXHJcbmNvbnN0IHBsb3RTaGlwcyA9IChib2FyZE5hbWUsIGdhbWVib2FyZCkgPT57XHJcbiAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9hcmROYW1lLnRvTG93ZXJDYXNlKCkpLmNoaWxkTm9kZXM7XHJcbiAgICBcclxuICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PntcclxuICAgICAgICBjb25zdCBjb2wgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgaWYoZ2FtZWJvYXJkLmdyaWRbcm93XVtjb2xdICE9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gZ2V0U3F1YXJlcztcclxufVxyXG5jb25zdCBwbG90U2hpcCA9IChuYW1lLCBzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24sIGJvYXJkKSA9PntcclxuXHJcbiAgICBpZihvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93fS0ke2NvbCArIGluZGV4fWApO1xyXG4gICAgICAgICAgICBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgICAgIGFkZEhhbmRsZXJPcmllbnRhdGlvbihzaGlwLCBzcXVhcmUsIGJvYXJkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtuYW1lOiBuYW1lLCByb3c6IHJvdywgY29sOiBjb2wsIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbn1cclxuXHJcbiAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93ICsgaW5kZXh9LSR7Y29sfWApO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICAgICAgYWRkSGFuZGxlck9yaWVudGF0aW9uKHNoaXAsIHNxdWFyZSwgYm9hcmQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge25hbWU6IG5hbWUsIHJvdzogcm93LCBjb2w6IGNvbCwgb3JpZW50YXRpb246IG9yaWVudGF0aW9ufTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiUGxvdHRpbmcgZGlkbid0IHdvcmsuXCJcclxuICAgIH1cclxufVxyXG5jb25zdCBhZGRIYW5kbGVyT3JpZW50YXRpb24gPSAoc2hpcCwgc3F1YXJlLCBib2FyZCkgPT57XHJcbiAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gdG9nZ2xlT3JpZW50YXRpb24oc2hpcCwgYm9hcmQpKTtcclxufVxyXG5cclxuY29uc3QgdG9nZ2xlT3JpZW50YXRpb24gPSAoc2hpcCwgYm9hcmQpID0+e1xyXG4gICAgY29uc3Qgcm93ID0gc2hpcC5jb29yZGluYXRlWzBdWzBdO1xyXG4gICAgY29uc3QgY29sID0gc2hpcC5jb29yZGluYXRlWzBdWzFdO1xyXG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIiA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiOyAvL3RvZ2dsZXMgb3JpZW50YXRpb25cclxuXHJcbiAgICBib2FyZC5kZWxldGVTaGlwKHNoaXApOyAvL2RlbGV0ZXMgdGhlIHNoaXAgZnJvbSBib2FyZFxyXG4gICAgaWYoYm9hcmQuaXNWYWxpZChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pKXtcclxuICAgICAgICBib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKTtcclxuICAgICAgICBzaGlwLnNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBzaGlwLm9yaWVudGF0aW9uKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBsb3RCb2FyZChib2FyZCk7XHJcblxyXG59XHJcblxyXG5jb25zdCB1cGRhdGVQbG90Qm9hcmQgPSAoYm9hcmQpID0+e1xyXG4gICAgYm9hcmQuZ3JpZC5mb3JFYWNoKChyb3csIHJvd051bSkgPT57XHJcbiAgICAgICAgcm93LmZvckVhY2goKGNvbHVtbiwgY29sTnVtKSA9PntcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGdhcnktJHtyb3dOdW19LSR7Y29sTnVtfWApO1xyXG4gICAgICAgICAgICBpZihjb2x1bW4gIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlIHNoaXBcIjtcclxuICAgICAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vc2VsZWN0cyB0aGUgc2hpcCBpZiB1c2VyIHdhbnRzIHRvIGNoYW5nZSBzaGlwJ3NvcmllbnRhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyoqKmNvZGUgZ29lcyBoZXJlICovXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0ZWRcIil9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmUgZHJvcHpvbmVcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgcGxvdE1lc3NhZ2UgPSAobWVzc2FnZSkgPT57XHJcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXktd3JhcHBlciBoMlwiKTtcclxuICAgIGJveC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbn1cclxuXHJcbmNvbnN0IHJlbW92ZVJlbmRlciA9IChwbGF5ZXIpID0+e1xyXG4gICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuY2hpbGROb2RlcztcclxuICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7c3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlIGRyb3B6b25lXCJ9KTtcclxuXHJcbn1cclxuY29uc3QgcGxvdEFsbFNoaXBzUmFuZG9tbHkgPSAocGxheWVyKSA9PiBcclxuICAgIHtcclxuICAgICAgICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT57XHJcbiAgICAgICAgICAgIGlmKCFzaGlwLmRlcGxveSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGRlcGxveWVkXCIpO1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50KHBsYXllci5ib2FyZCwgc2hpcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaGlwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVyLmJvYXJkO1xyXG4gICAgfVxyXG5cclxuY29uc3QgY2xlYXJCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgcGxheWVyLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgcGxheWVyLmJvYXJkLmNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCk7XHJcbiAgICByZW1vdmVSZW5kZXIocGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gcGxheWVyLmJvYXJkLmlzQWxsU2hpcHNEZXBsb3llZCgpOyAvL3JldHVybnMgZmFsc2VcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlQWxsQ2hpbGROb2RlcyA9IChwYXJlbnQpID0+e1xyXG4gICAgd2hpbGUocGFyZW50LmZpcnN0Q2hpbGQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmVudCk7XHJcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcclxuICAgIH1cclxufVxyXG5jb25zdCBwbG90QmFubmVyID0gKG1lc3NhZ2UpID0+e1xyXG5cclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyBjb250YWluZXIuY2xhc3NOYW1lPVwiYm90dG9tLXNwYWNpbmctMVwiO1xyXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGJveC5pbm5lckhUTUwgPSBgPGgyPiR7bWVzc2FnZX08L2gyPmBcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3gpO1xyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5jb25zdCBwbG90VGV4dEJveCA9ICh0ZXh0KSA9PntcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJ0ZXh0LWJveFwiO1xyXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGA8cD4ke3RleHR9PC9wPmA7XHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcbmNvbnN0IGxvYWRCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcImdhbWVib2FyZFwiO1xyXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICBjb25zdCBnZXRHYW1lYm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XHJcblxyXG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRHYW1lYm9hcmQucm93czsgaSsrKVxyXG4gICAgICAge1xyXG4gICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqPGdldEdhbWVib2FyZC5jb2xzOyBqKyspXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuXHJcbiAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpfS0ke2l9LSR7an1gKTtcclxuXHJcbiAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgIH1cclxuY29uc3QgdXBkYXRlQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgIGNvbnN0IHBhcnNlZFJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgIGNvbnN0IHBhcnNlZENvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJoaXRcIilcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgICAgICB9IGVsc2UgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcIm1pc3NcIilcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgICAgICAgfSBcclxuICAgICAgIH0pO1xyXG4gICB9XHJcbmNvbnN0IG1pZGRsZVNlY3Rpb24gPSAoc2hpcHMpID0+e1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc05hbWU9XCJzaGlwc0JveCB8IGRpc3BsYXktZmxleC1yb3cgYm90dG9tLXNwYWNpbmctMVwiO1xyXG5cclxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICBjb25zdCBjcmVhdGVCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNyZWF0ZUJveC5jbGFzc05hbWUgPSBcImRpc3BsYXktZmxleC1yb3dcIjtcclxuICAgICAgICBjcmVhdGVCb3guaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxwPiR7c2hpcC5uYW1lfTwvcD5cclxuICAgICAgICA8cD4ke3NoaXAubGVuZ3RoIC0gc2hpcC5oaXRzfTwvcD5gXHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVCb3gpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcclxufVxyXG5jb25zdCBwbG90R2FtZSA9IChnYW1lKSA9PntcclxuICAgIC8vZ2FtZSAtPiByZXR1cm5zIG9iamVjdCBvZiBwbGF5ZXIncyBib2FyZCBnYW1lLnJlY2VpdmVyKCk7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGxheWVyQm9hcmRcIjtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbG90QmFubmVyKGAke2dhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lfWApKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtaWRkbGVTZWN0aW9uKGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZC5zaGlwcykpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxvYWRCb2FyZChnYW1lLmdldFJlY2VpdmVyKCkpKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbG90VGV4dEJveChgJHtnYW1lLmdldEF0dGFja2VyKCkubmFtZX0ncyB0dXJuIHRvIGF0dGFjayAke2dhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lfWApKTtcclxuXHJcbnJldHVybiBjb250YWluZXI7XHJcblxyXG59XHJcblxyXG5jb25zdCBwbGF5QWdhaW5CdXR0b24gPSAoKSA9PntcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwbGF5LWFnYWluXCIpO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IGFnYWluXCI7XHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG59XHJcbmNvbnN0IGxvYWRQbGF5QWdhaW5NZW51ID0od2lubmVyLCBsb3NlcikgPT57XHJcblxyXG4gICAgY29uc3QgcGxheUFnYWluTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwbGF5QWdhaW5NZW51LmNsYXNzTmFtZSA9IFwibWVudS1ib3hcIjtcclxuICAgIHBsYXlBZ2Fpbk1lbnUuaW5uZXJIVE1MID0gYFxyXG4gICAgPGgyPiR7d2lubmVyfSBoYXMgZGVmZWF0ZWQgJHtsb3Nlcn08L2gyPlxyXG4gICAgPHA+V291bGQgeW91IGxpa2UgdG8gcGxheSBhZ2Fpbj88L3A+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiXCIgaWQ9XCJwbGF5LWFnYWluXCI+UGxheSBBZ2FpbjwvYnV0dG9uPlxyXG4gICAgYDtcclxuXHJcbiAgICByZXR1cm4gcGxheUFnYWluTWVudTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBwbG90U2hpcHMsIFxyXG4gICAgcGxvdFNoaXAsIFxyXG4gICAgcGxvdE1lc3NhZ2UsIFxyXG4gICAgcmVtb3ZlUmVuZGVyLFxyXG4gICAgcGxvdEFsbFNoaXBzUmFuZG9tbHksXHJcbiAgICByZW1vdmVBbGxDaGlsZE5vZGVzLCBcclxuICAgIGNsZWFyQm9hcmQsXHJcbiAgICBwbG90R2FtZSxcclxuICAgIHBsb3RUZXh0Qm94LFxyXG4gICAgcGxvdEJhbm5lcixcclxuICAgIHVwZGF0ZUJvYXJkLFxyXG4gICAgdXBkYXRlUGxvdEJvYXJkLFxyXG4gICAgbG9hZEJvYXJkLFxyXG4gICAgbG9hZFBsYXlBZ2Fpbk1lbnUsXHJcbn1cclxuIiwiLy9HZW5lcmF0ZXMgcmFuZG9tIG51bWJlciBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZiBjb2x1bW5zIGFuZCByb3dzLlxyXG5jb25zdCBnZW5lcmF0ZU51bWJlciA9IChtYXgpID0+e1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbn1cclxuXHJcbi8vR2VuZXJhdGUgcmFuZG9tIGNvb3JkaW5hdGVzIHdpdGhpbiB0aGUgZ2FtZSBib2FyZFxyXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICBsZXQgY29sID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLmNvbHMpO1xyXG4gICAgbGV0IHJvdyA9IGdlbmVyYXRlTnVtYmVyKGdhbWVib2FyZC5yb3dzKTtcclxuICBcclxuICAgIHJldHVybiBbY29sLCByb3ddO1xyXG59XHJcblxyXG4vL0dlbmVyYXRlIGEgcmFuZG9tIHBsYWNlbWVudCBvbiB0aGUgYm9hcmQuXHJcbmNvbnN0IHJhbmRvbVBsYWNlbWVudCA9IChnYW1lYm9hcmQsIHNoaXApID0+e1xyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7XHJcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInZlcnRpY2FsXCI6IFwiaG9yaXpvbnRhbFwiO1xyXG4gICBcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCBvcmllbnRhdGlvbikpXHJcbiAgICB7XHJcbiAgICAgIHJldHVybiBnYW1lYm9hcmQucGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSwgb3JpZW50YXRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWVib2FyZCwgc2hpcCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbi8vUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZFxyXG5jb25zdCBnZXRSYW5kb21Db29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+e1xyXG5cclxuICAgIGxldCByYW5kb21Db29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTsgLy9yZXR1cm5zIGFycmF5XHJcblxyXG4gICAgaWYgKGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwibWlzc1wiICYmIGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwiaGl0XCIgKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gcmFuZG9tQ29vcmRpbmF0ZXM7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHJldHVybiBnZXRSYW5kb21Db29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dldFJhbmRvbUNvb3JkaW5hdGVzLCByYW5kb21QbGFjZW1lbnR9IiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcbmNvbnN0IF9ERUZBVUxUX29yaWVudGF0aW9uICA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuY29vcmRpbmF0ZSA9IFtdO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IF9ERUZBVUxUX29yaWVudGF0aW9uO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5kZXBsb3kgPSBmYWxzZTtcclxuICB9XHJcbiAgXHJcbiAgaGl0ID0gKCkgPT4gdGhpcy5oaXRzKys7XHJcblxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMubGVuZ3RoIC0gdGhpcy5oaXRzID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICBkZWxldGVDb29yZGluYXRlcyA9ICgpID0+IHRoaXMuY29vcmRpbmF0ZS5zcGxpY2UoMCwgdGhpcy5jb29yZGluYXRlLmxlbmd0aCk7IC8vcmV0dXJucyBhbiBlbXB0eSBhcnJheSBcclxuICBcclxuICB0b2dnbGVPcmllbnRhdGlvbiA9ICgpID0+IHRoaXMub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiID8gdGhpcy5zZXRPcmllbnRhdGlvbihcInZlcnRpY2FsXCIpIDogdGhpcy5zZXRPcmllbnRhdGlvbihcImhvcml6b250YWxcIik7XHJcblxyXG4gIHNldE9yaWVudGF0aW9uID0gKG5ld09yaWVudGF0aW9uKSA9PiB0aGlzLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XHJcbiAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGUvc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvdW5kcy9BcHAuanNcIjtcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIEFwcC5sb2FkUGFnZSgpKTsiXSwibmFtZXMiOlsiQm9hcmQiLCJHYW1lIiwiUGxheWVyIiwicmFuZG9tUGxhY2VtZW50IiwicGxvdEdhbWUiLCJjbGVhckJvYXJkIiwidXBkYXRlQm9hcmQiLCJ1cGRhdGVQbG90Qm9hcmQiLCJwbG90U2hpcHMiLCJwbG90QWxsU2hpcHNSYW5kb21seSIsImxvYWRQbGF5QWdhaW5NZW51IiwicmVtb3ZlV2luZG93IiwiaXRlbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmVDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJHYW1lU2V0dXAiLCJsb2FkIiwic2V0dXAiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJpc1BsYXllclZzQ29tcHV0ZXIiLCJjaGVja2VkIiwiaXNQbGF5ZXJWc1BsYXllciIsImdldFBsYXllcjFOYW1lIiwidmFsdWUiLCJnZXRQbGF5ZXIyTmFtZSIsImdhbWUiLCJzZXR1cEdhbWUiLCJjb25zb2xlIiwibG9nIiwidXNlclNlbGVjdFNoaXAiLCJwbGF5ZXIiLCJkcmFnZ2VkU2hpcCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYnV0dG9uIiwiYm9hcmQiLCJnZXRTaGlwIiwiZ2V0QXR0cmlidXRlIiwiZGVwbG95Iiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjdXJyZW50VGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJ0YXJnZXQiLCJyb3ciLCJwYXJzZUludCIsImNvbCIsImNvbnRhaW5zIiwiaXNWYWxpZCIsImNoZWNrIiwiZ3JpZCIsIm9yaWVudGF0aW9uIiwicGxhY2VTaGlwIiwicGxheWVyVHVybiIsInBsYXllcjEiLCJwbGF5ZXIyIiwibG9hZFNldHVwVUkiLCJyYW5kb21QbGFjZW1lbnRCdG4iLCJjbGVhckJ0biIsImRvbmVCdG4iLCJmaW5pc2hlZFNldHVwQnRuIiwiaXNIdW1hbiIsInNoaXBzIiwic2hpcCIsInBsYXkiLCJyZXNldCIsIndpbmRvdyIsIndpbm5lciIsInR1cm4iLCJnZXRSb290IiwiYXBwZW5kQ2hpbGQiLCJnZXRBdHRhY2tlciIsIm5hbWUiLCJnZXRSZWNlaXZlciIsInNxdWFyZXMiLCJhdHRhY2siLCJpc0dhbWVPdmVyIiwic2V0V2lubmVyIiwibmV4dFR1cm4iLCJyYW5kb21BdHRhY2siLCJzZXRUaW1lb3V0IiwiZ2V0Q3VycmVudFR1cm5PcHBvbmVudCIsIk1lbnUiLCJyb290IiwiVUkiLCJsb2FkSGFuZGxlcnMiLCJjb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiaW5uZXJIVE1MIiwiZ2V0UmFkaW9zIiwic3VibWl0IiwiZGlzYWJsZWQiLCJBcHAiLCJsb2FkUGFnZSIsImFkZEhhbmRsZXIiLCJyZW1vdmVIYW5kbGVyIiwicGxvdE1lc3NhZ2UiLCJiYW5uZXIiLCJtZXNzYWdlIiwibG9hZEJ1dHRvbnMiLCJidXR0b25zIiwidGV4dENvbnRlbnQiLCJsb2FkQm9hcmQiLCJ0b0xvd2VyQ2FzZSIsImdldEdhbWVib2FyZCIsImkiLCJyb3dzIiwiaiIsImNvbHMiLCJzcXVhcmUiLCJnZXRTcXVhcmVzIiwiY2hpbGROb2RlcyIsInBhcnNlZFJvdyIsInBhcnNlZENvbCIsImxvYWRTdGFydEJ1dHRvbiIsInN0YXJ0QnRuIiwic2hpcE1lbnUiLCJjcmVhdGVCdG4iLCJpZCIsImhhbmRsZUxvYWRTaGlwQnRuIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJjb25zdHJ1Y3RvciIsInVzZXJJbnRlcmZhY2UiLCJzaGlwTWVudUJvYXJkQ29udGFpbmVyIiwiU2hpcCIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJjbGVhckdyaWQiLCJpc0FsbFNoaXBzRGVwbG95ZWQiLCJjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCIsImluZGV4IiwiY29vcmRpbmF0ZSIsInB1c2giLCJzaGlwTmFtZSIsInJlc3VsdCIsImRlbGV0ZVNoaXAiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJoaXQiLCJnZXRNYXhIaXRzIiwic3VtIiwiZ2V0SGl0cyIsImhpdHMiLCJjaGVja3NEaWZmZXJlbmNlIiwibWFwIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZXMiLCJwbG90U2hpcCIsImdhbWVib2FyZCIsIm9wcG9uZW50Qm9hcmQiLCJwbGFjZVJhbmRvbVRvQm9hcmQiLCJlbmVteUJvYXJkTmFtZSIsInBsb3QiLCJjb29yZGluYXRlcyIsImJvYXJkTmFtZSIsImFkZEhhbmRsZXJPcmllbnRhdGlvbiIsImNyZWF0ZUlkIiwidG9nZ2xlT3JpZW50YXRpb24iLCJzZXRPcmllbnRhdGlvbiIsInJvd051bSIsImNvbHVtbiIsImNvbE51bSIsImJveCIsInJlbW92ZVJlbmRlciIsInJlbW92ZUFsbENoaWxkTm9kZXMiLCJwYXJlbnQiLCJmaXJzdENoaWxkIiwicGxvdEJhbm5lciIsInBsb3RUZXh0Qm94IiwidGV4dCIsIm1pZGRsZVNlY3Rpb24iLCJjcmVhdGVCb3giLCJwbGF5QWdhaW5CdXR0b24iLCJsb3NlciIsInBsYXlBZ2Fpbk1lbnUiLCJnZW5lcmF0ZU51bWJlciIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlQ29vcmRpbmF0ZXMiLCJyYW5kb21Db29yZGluYXRlcyIsInY0IiwidXVpZHY0IiwiX0RFRkFVTFRfb3JpZW50YXRpb24iLCJpc1N1bmsiLCJkZWxldGVDb29yZGluYXRlcyIsInNwbGljZSIsIm5ld09yaWVudGF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==