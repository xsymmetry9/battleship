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
  static play = game => {
    const getRoot = document.getElementById("root");
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
      (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_5__.plotShips)(game.getReceiver().name, game.getReceiver().board);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ1M7QUFFckM1RixnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRXlELHlEQUFHLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xzLy4vc3JjL1NlY3Rpb24vR2FtZVNldHVwLmpzIiwid2VicGFjazovL2xzLy4vc3JjL1NlY3Rpb24vTWVudS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvQXBwLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxheWVyLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbG90LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvZ2FtZS5zY3NzPzY4NDgiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvbWVudS5zY3NzPzY3YzAiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJvYXJkIGZyb20gXCIuLi9jb21wb3VuZHMvR2FtZWJvYXJkXCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuLi9jb21wb3VuZHMvR2FtZVwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9jb21wb3VuZHMvUGxheWVyXCI7XHJcbmltcG9ydCB7cmFuZG9tUGxhY2VtZW50fSBmcm9tIFwiLi4vY29tcG91bmRzL1JhbmRvbVwiO1xyXG5pbXBvcnQge2FkZEJvYXJkSGFuZGxlcn0gZnJvbSBcIi4uL2NvbXBvdW5kcy9GdW5jdGlvbnNcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBwbG90R2FtZSxcclxuICAgIGNsZWFyQm9hcmQsXHJcbiAgICB1cGRhdGVCb2FyZCxcclxuICAgIHVwZGF0ZVBsb3RCb2FyZCxcclxuICAgIHBsb3RTaGlwcyxcclxuICAgIHBsb3RBbGxTaGlwc1JhbmRvbWx5LFxyXG4gICAgbG9hZFBsYXlBZ2Fpbk1lbnUsXHJcbiAgICB9IGZyb20gJy4uL2NvbXBvdW5kcy9QbG90J1xyXG5cclxuY29uc3QgcmVtb3ZlV2luZG93ID0gKGl0ZW0pID0+e1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaXRlbSkpO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTZXR1cHtcclxuICAgIHN0YXRpYyBsb2FkKCl7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldHVwKCl7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMUJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMkJvYXJkID0gbmV3IEJvYXJkKClcclxuXHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJWc0NvbXB1dGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2c0NvbXB1dGVyXCIpLmNoZWNrZWQ7XHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJWc1BsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidnNQbGF5ZXJcIikuY2hlY2tlZDtcclxuXHJcbiAgICAgICBpZihpc1BsYXllclZzUGxheWVyIHx8IGlzUGxheWVyVnNDb21wdXRlcilcclxuICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMU5hbWUgPSBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMU5hbWVcIikudmFsdWUsIHBsYXllcjFCb2FyZCwgcGxheWVyMkJvYXJkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vRGV0ZXJtaW5lcyBpZiBwbGF5ZXIgMiBpcyBodW1hbiBvciBjb21wdXRlclxyXG4gICAgICAgICAgICBjb25zdCBnZXRQbGF5ZXIyTmFtZSA9IGlzUGxheWVyVnNDb21wdXRlciA/IG5ldyBQbGF5ZXIoXCJjb21wdXRlclwiLCBwbGF5ZXIyQm9hcmQsIHBsYXllcjFCb2FyZCwgZmFsc2UpIDogXHJcbiAgICAgICAgICAgICAgICBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikudmFsdWUsIHBsYXllcjJCb2FyZCwgcGxheWVyMUJvYXJkLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShnZXRQbGF5ZXIxTmFtZSwgZ2V0UGxheWVyMk5hbWUpO1xyXG4gICAgICAgICAgICByZW1vdmVXaW5kb3coXCIubWVudS1ib3hcIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBHYW1lKGdhbWUsIFwicGxheWVyIDFcIik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2FtZTtcclxuXHJcbiAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gXCJlcnJvclwiO1xyXG4gICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHVzZXJTZWxlY3RTaGlwID0gKHBsYXllcikgPT57XHJcbiAgICAgICAgbGV0IGRyYWdnZWRTaGlwO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXAtYnRuXCIpLmZvckVhY2goKGJ1dHRvbikgPT57XHJcbiAgICAgICAgICAgICFwbGF5ZXIuYm9hcmQuZ2V0U2hpcChidXR0b24uZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpLmRlcGxveSA/IFxyXG4gICAgICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCB0cnVlKSA6IGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgZmFsc2UpO1xyXG4gICAgICAgIH0pIFxyXG4gICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kcmFnZ2FibGVcIikuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcigoXCJkcmFnc3RhcnRcIiksIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dlZFNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKFwidmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKChcImRyYWdlbmRcIiksIChlKSA9PntcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9SZW1vdmVzIHRoZSByZW5kZXIgb2YgdGhlIHNlbGVjdGVkIGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwidmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIikuZm9yRWFjaCgodGFyZ2V0KSA9PntcclxuICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLFxyXG4gICAgICAgICAgICAgICAgKGUpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH0sIFxyXG4gICAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VudGVyXCIsIChlKSA9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpOyAvL3JldHVybnMgcm93XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTsgLy9yZXR1cm5zIGNvbHVtblxyXG4gICAgICAgICAgICAgICAgaWYoZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3B6b25lXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYm9hcmQuaXNWYWxpZChkcmFnZ2VkU2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKSA/IGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKFwidmFsaWRcIikgOiBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcImludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCBlID0+e1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpOyAvL3JldHVybnMgcm93XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTsgLy9yZXR1cm5zIGNvbHVtblxyXG4gICAgICAgICAgICAgICAgaWYoZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRyb3B6b25lXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYm9hcmQuaXNWYWxpZChkcmFnZ2VkU2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKSA/IGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwidmFsaWRcIikgOiBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcImludmFsaWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBbXCJ2YWxpZFwiLCBcImludmFsaWRcIl07XHJcblxyXG4gICAgICAgICAgICAgICAgY2hlY2suZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2YWxpZFwiKSB8fCBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW52YWxpZFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpOyAvL3JldHVybnMgcm93XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpKTsgLy9yZXR1cm5zIGNvbHVtblxyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmdyaWRbcm93XVtjb2xdID09PSBudWxsICYmIHBsYXllci5ib2FyZC5pc1ZhbGlkKGRyYWdnZWRTaGlwLCByb3csIGNvbCwgZHJhZ2dlZFNoaXAub3JpZW50YXRpb24pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL3BsYWNlIHRoZSBzaGlwIGFuZCBwbG90cyBpdFxyXG4gICAgICAgICAgICAgICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChkcmFnZ2VkU2hpcCwgcm93LCBjb2wsIGRyYWdnZWRTaGlwLm9yaWVudGF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVBsb3RCb2FyZChwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy51c2VyU2VsZWN0U2hpcChwbGF5ZXIpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2YWxpZFwiKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3NlbGVjdHMgdGhlIHNoaXBcclxuICAgICAgICAgICAgICAgIHJldHVybihcIlRoZXJlIGlzIGEgc2hpcCBsb2NhdGVkIHRoZXJlLiAgUGxhY2UgYW5vdGhlciBzcXVhcmUuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuIFxyXG4gICAgIHN0YXRpYyBzZXR1cEdhbWUgPSAoZ2FtZSwgcGxheWVyVHVybikgPT57XHJcbiAgICAgICAgY29uc3QgcGxheWVyID0gcGxheWVyVHVybiA9PT0gXCJwbGF5ZXIgMVwiID8gZ2FtZS5wbGF5ZXIxIDogZ2FtZS5wbGF5ZXIyO1xyXG4gICAgICAgIGdhbWUubG9hZFNldHVwVUkocGxheWVyKTtcclxuICAgICAgICAvL2FkZCBnYW1lIGhhbmRsZXJcclxuICAgICAgICBhZGRCb2FyZEhhbmRsZXIocGxheWVyKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmFuZG9tUGxhY2VtZW50QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyYW5kb20tcGxhY2VtZW50XCIpO1xyXG4gICAgICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKTtcclxuICAgICAgICBjb25zdCBkb25lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1idG5cIik7XHJcblxyXG4gICAgICAgIC8vVXNlciBpcyBhbGxvd2VkIHRvIGNsaWNrIGFuZCBkcmFnIHRoZSBzaGlwIHRvIHRoZSBib2FyZFxyXG4gICAgICAgIHRoaXMudXNlclNlbGVjdFNoaXAocGxheWVyKTsgLy9hZGRzIGhhbmRsZXJcclxuICAgICAgICAgXHJcbiAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHtcclxuICAgICAgICAgICAgcGxvdEFsbFNoaXBzUmFuZG9tbHkocGxheWVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codXBkYXRlUGxvdEJvYXJkKHBsYXllcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsZWFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJCb2FyZChwbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJTZWxlY3RTaGlwKHBsYXllcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9uZUJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiB0aGlzLmZpbmlzaGVkU2V0dXBCdG4oZ2FtZSwgcGxheWVyVHVybikpO1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVyO1xyXG4gICAgIH1cclxuIFxyXG4gICAgIHN0YXRpYyBmaW5pc2hlZFNldHVwQnRuID0gKGdhbWUsIHBsYXllclR1cm4pID0+e1xyXG4gXHJcbiAgICAgICAgIHJlbW92ZVdpbmRvdyhcIi5zZXR1cC1tZW51XCIpO1xyXG5cclxuICAgICAgICBpZihnYW1lLnBsYXllcjIuaXNIdW1hbiAmJiBwbGF5ZXJUdXJuID09PSBcInBsYXllciAxXCIpe1xyXG4gICAgICAgICAgICB0aGlzLnNldHVwR2FtZShnYW1lLCBcInBsYXllciAyXCIpXHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAvL2dlbmVyYXRlIHJhbmRvbVBsYWNlbWVudCBmb3IgcGxheWVyIDJcclxuICAgICAgICAgICAgZ2FtZS5wbGF5ZXIyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+e1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWUucGxheWVyMi5ib2FyZCwgc2hpcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgfSBcclxuICAgICB9XHJcbiAgICAgc3RhdGljIHJlc2V0ID0gKGdhbWUsIHdpbmRvdykgPT4ge1xyXG4gICAgICAgIGdhbWUucGxheWVyMS5ib2FyZC5yZXNldCgpO1xyXG4gICAgICAgIGdhbWUucGxheWVyMi5ib2FyZC5yZXNldCgpO1xyXG4gICAgICAgIGdhbWUud2lubmVyID0gbnVsbDtcclxuICAgICAgICBnYW1lLnR1cm4gPSAxO1xyXG4gICAgICAgIHJlbW92ZVdpbmRvdyh3aW5kb3cpO1xyXG4gICAgICAgIC8vbG9hZHMgc2V0dXAgbWVudVxyXG4gICAgICAgIHRoaXMuc2V0dXBHYW1lKGdhbWUsIFwicGxheWVyIDFcIik7XHJcbiAgICAgfVxyXG5cclxuICAgICBzdGF0aWMgcGxheSA9KGdhbWUpID0+e1xyXG4gICAgICAgIGNvbnN0IGdldFJvb3QgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICBpZihnYW1lLndpbm5lciAhPSBudWxsKXtcclxuICAgICAgICAgICAgZ2V0Um9vdC5hcHBlbmRDaGlsZChsb2FkUGxheUFnYWluTWVudShnYW1lLmdldEF0dGFja2VyKCkubmFtZSwgZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUpKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5LWFnYWluXCIpLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpPT4gdGhpcy5yZXNldChnYW1lLCBcIi5tZW51LWJveFwiKSk7ICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm47ICAgICBcclxuICAgICAgICB9XHJcbiAgIFxyXG4gICAgICAgIC8vV2hvZXZlciBpcyB0aGUgYXR0YWNrZXJcclxuICAgICAgICBnZXRSb290LmFwcGVuZENoaWxkKHBsb3RHYW1lKGdhbWUpKTtcclxuICAgICAgICB1cGRhdGVCb2FyZChnYW1lLmdldFJlY2VpdmVyKCkpO1xyXG4gICAgICAgIGlmKGdhbWUuZ2V0QXR0YWNrZXIoKS5pc0h1bWFuKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9sb2FkIHByZXZpb3VzIG1vdmVzIGlmIGFueVxyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XHJcbiAgICAgICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Eb2Vzbid0IGFkZCBldmVudExpc3RlbmVyIGJlY2F1c2UgdGhlIHNxdWFyZSBpcyBvY2N1cGllZC5cclxuICAgICAgICAgICAgICAgIGlmKGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZC5ncmlkW3Jvd11bY29sXSA9PT0gXCJoaXRcIiB8fCBnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gPT09IFwibWlzc1wiKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBlID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLmdldEF0dGFja2VyKCkuYXR0YWNrKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCByb3csIGNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0Um9vdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuaXNHYW1lT3ZlcigpID8gZ2FtZS5zZXRXaW5uZXIoZ2FtZS5nZXRBdHRhY2tlcigpLm5hbWUpIDogZ2FtZS5uZXh0VHVybigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdhbWUubmV4dFR1cm4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9yYW5kb20gYXR0YWNrXHJcbiAgICAgICAgICAgIHBsb3RTaGlwcyhnYW1lLmdldFJlY2VpdmVyKCkubmFtZSwgZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkKTtcclxuICAgICAgICAgICAgZ2FtZS5nZXRBdHRhY2tlcigpLnJhbmRvbUF0dGFjayhnYW1lLmdldFJlY2VpdmVyKCkubmFtZSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICBnZXRSb290LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIikpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLmlzR2FtZU92ZXIoKSA/IGdhbWUuc2V0V2lubmVyKGdhbWUuZ2V0QXR0YWNrZXIoKS5uYW1lKSA6IGdhbWUubmV4dFR1cm4oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBnYW1lLm5leHRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoZ2FtZSk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZ2FtZS5nZXRDdXJyZW50VHVybk9wcG9uZW50KCk7XHJcblxyXG4gICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0ICcuLi9zdHlsZS9tZW51LnNjc3MnXHJcbmltcG9ydCBHYW1lU2V0dXAgZnJvbSBcIi4vR2FtZVNldHVwXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZW51e1xyXG4gICAgc3RhdGljIGxvYWQoKXtcclxuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy5VSSgpKTtcclxuICAgICAgICB0aGlzLmxvYWRIYW5kbGVycygpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIFVJKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJtZW51LWJveFwiO1xyXG5cclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ0ZXh0LWNlbnRlcmVkXCI+V2VsY29tZSB0byBCYXR0bGVzaGlwPC9oMT5cclxuICAgICAgICAgICAgPGRpdiBpZD1cImdhbWVGb3JtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBsYXllcjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNjcmlwdGlvblwiPlBsYXllciAxOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwbGF5ZXIxTmFtZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJwbGF5ZXIySW5wdXRcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBsYXllcjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNjcmlwdGlvblwiPlBsYXllciAyOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwbGF5ZXIyTmFtZVwiIGRpc2FibGVkLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImdhbWVNb2RlXCIgY2xhc3M9XCJnYW1lTW9kZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZCA9XCJ2c0NvbXB1dGVyXCIgbmFtZT1cImdhbWVNb2RlXCIgdmFsdWU9XCJjb21wdXRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ2c0NvbXB1dGVyXCI+UGxheWVyIHZzIENvbXB1dGVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJ2c1BsYXllclwiIG5hbWU9XCJnYW1lTW9kZVwiIHZhbHVlPVwicGxheWVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInZzUGxheWVyXCI+UGxheWVyIHZzIFBsYXllcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic3VibWl0LWJ0blwiIHR5cGU9XCJzdWJtaXRcIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRIYW5kbGVycygpe1xyXG4gICAgICAgIGNvbnN0IGdldFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZU1vZGUgaW5wdXRcIik7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnRuXCIpO1xyXG5cclxuICAgICAgICBnZXRSYWRpb3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2hhbmdlXCIpLCAoKSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IFwidnNQbGF5ZXJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gR2FtZVNldHVwLmxvYWQoKSk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCBNZW51IGZyb20gJy4uL1NlY3Rpb24vTWVudSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHB7XHJcbiAgICBzdGF0aWMgbG9hZFBhZ2UoKXtcclxuICAgICAgICBNZW51LmxvYWQoKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgdXBkYXRlUGxvdEJvYXJkIH0gZnJvbSBcIi4vUGxvdFwiO1xyXG5cclxuY29uc3QgYWRkQm9hcmRIYW5kbGVyID0gKHBsYXllcikgPT57XHJcbiAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XHJcbiAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4gc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIChlKSA9PiBoYW5kbGVPcmllbnRhdGlvbihlLCBwbGF5ZXIpKSk7XHJcbn1cclxuY29uc3QgaGFuZGxlT3JpZW50YXRpb24gPSAoZSwgcGxheWVyKSA9PntcclxuICAgIGUuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpID8gc2V0T3JpZW50YXRpb24oZSwgcGxheWVyKSA6IGZhbHNlO1xyXG59XHJcbmNvbnN0IHNldE9yaWVudGF0aW9uID0gKGUsIHBsYXllcikgPT57XHJcbiAgICBjb25zdCByb3cgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgY29uc3QgY29sID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcEluZm8ocm93LCBjb2wpO1xyXG5cclxuICAgIGNvbnN0IHN0YXJ0ID0gc2hpcC5jb29yZGluYXRlWzBdOyAvL3R5cGUgb2YgYXJyYXlcclxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjsgLy90b2dnbGVzIG9yaWVudGF0aW9uXHJcbiAgICBcclxuICAgIHBsYXllci5ib2FyZC5kZWxldGVTaGlwKHNoaXApO1xyXG5cclxuICAgIGlmKHBsYXllci5ib2FyZC5pc1ZhbGlkKHNoaXAsIHN0YXJ0WzBdLCBzdGFydFsxXSwgb3JpZW50YXRpb24pKXtcclxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHN0YXJ0WzBdLCBzdGFydFsxXSwgb3JpZW50YXRpb24pO1xyXG4gICAgICAgIHNoaXAuc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHN0YXJ0WzBdLCBzdGFydFsxXSwgc2hpcC5vcmllbnRhdGlvbik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJub3QgY2hhbmdlZFwiKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBsb3RCb2FyZChwbGF5ZXIpO1xyXG5cclxufVxyXG5leHBvcnQge2FkZEJvYXJkSGFuZGxlcn0iLCJpbXBvcnQgXCIuLi9zdHlsZS9nYW1lLnNjc3NcIlxyXG5cclxuZXhwb3J0IGNvbnN0IGJhbm5lciA9IChtZXNzYWdlKSA9PntcclxuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICBpdGVtLmlubmVySFRNTCA9IGA8aDE+JHttZXNzYWdlfTwvaDE+YDtcclxuICAgIHJldHVybiBpdGVtO1xyXG59XHJcbmV4cG9ydCBjb25zdCBsb2FkQnV0dG9ucyA9KHBsYXllcikgPT57XHJcbiAgICBjb25zdCBidXR0b25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiO1xyXG5cclxuICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICByYW5kb21QbGFjZW1lbnRCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJyYW5kb20tcGxhY2VtZW50XCIpO1xyXG4gICAgcmFuZG9tUGxhY2VtZW50QnRuLnRleHRDb250ZW50PVwicmFuZG9tXCI7XHJcblxyXG4gICAgY29uc3QgY2xlYXJCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgY2xlYXJCdG4udGV4dENvbnRlbnQgPSBcImNsZWFyXCI7XHJcbiAgICBjbGVhckJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImNsZWFyLWJvYXJkXCIpO1xyXG5cclxuICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQocmFuZG9tUGxhY2VtZW50QnRuKTtcclxuICAgIGJ1dHRvbnMuYXBwZW5kQ2hpbGQoY2xlYXJCdG4pO1xyXG5cclxuICAgIHJldHVybiBidXR0b25zO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgbG9hZEJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJnYW1lYm9hcmRcIjtcclxuICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0R2FtZWJvYXJkLnJvd3M7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqPGdldEdhbWVib2FyZC5jb2xzOyBqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmUgZHJvcHpvbmVcIjtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiY29sXCIsIGopO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRSb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJoaXRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcIm1pc3NcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGxvYWRTdGFydEJ1dHRvbiA9ICgpID0+e1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc3RhcnRCdG4uY2xhc3NOYW1lPVwic3RhcnQtYnRuXCI7XHJcbiAgICBzdGFydEJ0bi50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xyXG4gICAgcmV0dXJuIHN0YXJ0QnRuO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2hpcE1lbnUgPSAocGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJzaGlwLWJ1dHRvbnNcIjtcclxuICAgXHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG4gZHJhZ2dhYmxlXCI7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzaGlwLmlkKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNoaXAubmFtZSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoYW5kbGVMb2FkU2hpcEJ0bihlLCBwbGF5ZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVCdG4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG5leHBvcnQgY29uc3QgaGFuZGxlTG9hZFNoaXBCdG4gPSAoZSwgcGxheWVyKSA9PntcclxuICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChlLmN1cnJlbnRUYXJnZXQudmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSkuY2hpbGROb2RlcztcclxuIFxyXG4gICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiBoYW5kbGVTcXVhcmVDbGljayhlLCBzaGlwLCBwbGF5ZXIpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGhhbmRsZVNxdWFyZUNsaWNrID0gKGUsIHNoaXAsIHBsYXllcikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG5cclxuICAgICAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBcImhvcml6b250YWxcIik7XHJcbiAgICB9XHJcbmNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG5jbGFzcyBHYW1le1xyXG4gICAgY29uc3RydWN0b3IocGxheWVyMSwgcGxheWVyMilcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBsYXllcjEgPSBwbGF5ZXIxO1xyXG4gICAgICAgIHRoaXMucGxheWVyMiA9IHBsYXllcjI7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudHVybiA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy90dXJuIGJhc2UgcGxheWluZyBnYW1lXHJcblxyXG4gICAgZ2V0QXR0YWNrZXIoKXtcclxuICAgICAgICBpZih0aGlzLnR1cm4gJSAyICE9PSAwKSB7XHJcbiAgICAgICAgICAgIC8vaWYgaXQncyBwbGF5ZXIxIHR1cm4sIHJldHVybnMgcGxheWVyMiBuYW1lLlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRSZWNlaXZlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjI7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vcmV0dXJucyBwbGF5ZXIxIGFuZCBwbGF5ZXIyIGFzIHN0cmluZ3NcclxuICAgIGdldEN1cnJlbnRUdXJuT3Bwb25lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRhY2tlcigpLm5hbWUgPT0gdGhpcy5wbGF5ZXIxLm5hbWUgPyBcInBsYXllcjJcIiA6IFwicGxheWVyMVwiO1xyXG4gICAgfVxyXG4gICAgbmV4dFR1cm4oKXtcclxuICAgICAgICB0aGlzLnR1cm4rKztcclxuICAgICAgICByZXR1cm4gdGhpcy50dXJuO1xyXG4gICAgfVxyXG4gICAgc2V0V2lubmVyKHdpbm5lcil7XHJcbiAgICAgICAgdGhpcy53aW5uZXIgPSB3aW5uZXI7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFNldHVwVUkocGxheWVyKXtcclxuICAgICAgICBjb25zdCB1c2VySW50ZXJmYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmNsYXNzTmFtZSA9IFwic2V0dXAtbWVudVwiO1xyXG4gICAgICAgIC8vTG9hZCBTZXQgcGllY2VzIGJ5IHBsYXllcnNcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGJhbm5lcihwbGF5ZXIubmFtZSkpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQobG9hZEJ1dHRvbnMocGxheWVyKSk7XHJcbiAgICAgICAgY29uc3Qgc2hpcE1lbnVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImJvYXJkLWNvbnRhaW5lclwiO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKHBsYXllcikpO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcE1lbnUocGxheWVyKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChzaGlwTWVudUJvYXJkQ29udGFpbmVyKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGxvYWRTdGFydEJ1dHRvbigpKTtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVzZXJJbnRlcmZhY2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xyXG5jbGFzcyBHYW1lYm9hcmR7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvd3MgPSAxMDsgXHJcbiAgICB0aGlzLmNvbHMgPSAxMDtcclxuICAgIHRoaXMuZ3JpZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoKSA9PiBBcnJheSh0aGlzLmNvbHMpLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5zaGlwcyA9IFtcclxuICAgICAgbmV3IFNoaXAoXCJBc3NhdWx0IFNoaXBcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQWlyY3JhZnQgQ2FycmllclwiLCA1KSxcclxuICAgICAgbmV3IFNoaXAoXCJEZXN0cm95ZXJcIiwgNyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQ3J1aXNlclwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJTdWJtYXJpbmVcIiwgNCkgICBcclxuICAgIF07XHJcbiAgfVxyXG4gIHJlc2V0KCl7XHJcbiAgICB0aGlzLmNsZWFyR3JpZCgpO1xyXG4gICAgdGhpcy5pc0FsbFNoaXBzRGVwbG95ZWQoKTtcclxuICB9XHJcbiAgLy9DbGVhcnMgdGhlIGJvYXJkLlxyXG4gIGNsZWFyR3JpZCgpe1xyXG4gICAgdGhpcy5ncmlkLmZvckVhY2gocm93ID0+IHJvdy5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKTtcclxuICB9XHJcbiAgLy9DaGVja3MgaWYgdGhlcmUgYXJlIGFueSBzaGlwcyBvbiB0aGUgYm9hcmQgYW5kIGlmIGl0IGZpdHMuXHJcbiAgaXNWYWxpZChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pe1xyXG4gICAgaWYob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgaWYoY29sICsgc2hpcC5sZW5ndGggPiB0aGlzLmNvbHMpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgLy8gXCJFcnJvcjogU2hpcCBkb2Vzbid0IGZpdCBob3Jpem9udGFsbHkuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPCBzaGlwLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZih0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gIT09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkVycm9yOiBBIHNoaXAgaXMgYWxyZWFkeSBwcmVzZW50IGF0IHRoaXMgbG9jYXRpb24gaG9yaXpvbnRhbGx5LlwiOyAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGluZGV4ICsrOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTsgLy9QYXNzIGFsbCB0ZXN0XHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgaWYocm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLnJvd3MpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiU2hpcCBkb2Vzbid0IGZpdCB2ZXJ0aWNhbGx5XCI7IC8vU2hpcCBkb2Vzbid0IGZpdC5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKGluZGV4IDwgc2hpcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBpZih0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJBIHNoaXAgaXMgYWxyZWFkeSBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2UgLy9cIkludmFsaWQgZGlyZWN0aW9uXCI7IC8vaW52YWxpZCBuYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4vL1BsYWNlcyB0aGUgc2hpcCBvbiB0aGUgYm9hcmQuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbil7XHJcbiAgICBpZighdGhpcy5pc1ZhbGlkKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikpXHJcbiAgICByZXR1cm4gc2hpcC5kZXBsb3k7IC8vZmFsc2VcclxuICAgIFxyXG4gICAgaWYob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAgICB7XHJcbiAgICAgICAgLy9jaGVja3MgZm9yIG92ZXJsYXBzIG9yIG91dCBvZiBib3VuZHNcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKylcclxuICAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSA9IHNoaXA7XHJcbiAgICAgICAgICAgc2hpcC5jb29yZGluYXRlLnB1c2goW3JvdywgY29sICsgaW5kZXhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5kZXBsb3kgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfSBlbHNlIGlmKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpeyAvL2RpcmVjdGlvbiBpcyBob3Jpem9udGFsXHJcbiAgICAgICAgLy9pZiBldmVyeXRoaW5nIHBhc3NlcywgcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgIHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgICBzaGlwLmNvb3JkaW5hdGUucHVzaChbcm93ICsgaW5kZXgsIGNvbF0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5kZXBsb3kgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IFxyXG4gIGdldFNoaXBJbmZvKHJvdywgY29sKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gdGhpcy5ncmlkW3Jvd11bY29sXTtcclxuICAgIH1cclxuICBnZXRTaGlwKHNoaXBOYW1lKXtcclxuICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgaWYoc2hpcC5uYW1lID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIFwic2hpcCBub3QgZm91bmRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIGRlbGV0ZVNoaXAoc2hpcE5hbWUpe1xyXG4gICAgICBzaGlwTmFtZS5jb29yZGluYXRlLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IGl0ZW1bMF07XHJcbiAgICAgICAgY29uc3QgY29sID0gaXRlbVsxXTtcclxuICAgICAgICB0aGlzLmdyaWRbcm93XVtjb2xdID0gbnVsbDtcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIHRoaXMuZ3JpZDtcclxuICAgIH1cclxuICAvL1BsYWNlcyBhbiBhdHRhY2sgb24gdGhlIGJvYXJkLlxyXG4gIHJlY2VpdmVBdHRhY2soeCwgeSl7XHJcbiAgICBcclxuICAgIGlmKHggPj0gdGhpcy5jb2xzIHx8IHkgPj10aGlzLnJvd3MgKVxyXG4gICAgICByZXR1cm4gXCJvdXQgb2YgYm91bmRzXCI7XHJcbiAgICBpZih0aGlzLmdyaWRbeF1beV0gPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwibWlzc1wiOyAvL21hcmsgZG93biBtaXNzXHJcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcclxuICAgIH0gZWxzZXtcclxuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZ3JpZFt4XVt5XTtcclxuICAgICAgc2hpcC5oaXQoKTtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJoaXRcIjtcclxuICAgICAgcmV0dXJuIFwiaGl0XCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE1heEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAubGVuZ3RoO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuICBnZXRIaXRzKCl7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+e1xyXG4gICAgICBzdW0rPSBzaGlwLmhpdHM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG5cclxuICBjaGVja3NEaWZmZXJlbmNlKCl7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRNYXhIaXRzKCkgLSB0aGlzLmdldEhpdHMoKTtcclxuICB9XHJcblxyXG4gIC8vQ2hlY2tzIGlmIHRoZSBnYW1lIGlzIG92ZXIuXHJcbiAgaXNHYW1lT3Zlcigpe1xyXG4gICAgY29uc29sZS5sb2codGhpcy5jaGVja3NEaWZmZXJlbmNlKCkpO1xyXG4gICAgcmV0dXJuIHRoaXMuY2hlY2tzRGlmZmVyZW5jZSgpID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaXNBbGxTaGlwc0RlcGxveWVkKCl7XHJcbiAgICBsZXQgcmVzdWx0ID0gdHJ1ZTtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBpZighc2hpcC5kZXBsb3kpXHJcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4gIGNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCl7XHJcbiAgICB0aGlzLnNoaXBzLm1hcCgoc2hpcCkgPT4gc2hpcC5kZXBsb3kgPSBmYWxzZSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgeyBnZXRSYW5kb21Db29yZGluYXRlcyB9IGZyb20gJy4vUmFuZG9tJztcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZ2FtZWJvYXJkLCBvcHBvbmVudEJvYXJkLCBpc0h1bWFuKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZCA9IGdhbWVib2FyZDtcclxuICAgIHRoaXMub3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50Qm9hcmQ7XHJcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xyXG4gIH1cclxuXHJcbiAgLy8gUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIGF0dGFjayhlbmVteUJvYXJkTmFtZSwgcm93LCBjb2wpIHtcclxuICAgIGNvbnN0IHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlbmVteUJvYXJkTmFtZX0tJHtyb3d9LSR7Y29sfWApO1xyXG5cclxuICAgIGlmICghcGxvdCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBwbG90IElEXCIpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpIHx8IHBsb3QuY2xhc3NMaXN0LmNvbnRhaW5zKFwibWlzc1wiKSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJBbHJlYWR5IGF0dGFja2VkIHRoaXMgcG9zaXRpb25cIik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhdHRhY2tSZXN1bHQgPSB0aGlzLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCk7XHJcblxyXG4gICAgdGhpcy51cGRhdGVBdHRhY2tSZXN1bHQocGxvdCwgYXR0YWNrUmVzdWx0KTtcclxuICAgIHJldHVybiBhdHRhY2tSZXN1bHQgPT09IFwiaGl0XCI7XHJcbiAgfVxyXG5cclxuICAvLyBQbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgcmFuZG9tbHkgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgcmFuZG9tQXR0YWNrKGVuZW15Qm9hcmROYW1lKSB7XHJcbiAgICBjb25zdCBbcm93LCBjb2xdID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXModGhpcy5vcHBvbmVudEJvYXJkKTtcclxuICAgIGNvbnNvbGUubG9nKFwiUmFuZG9tIGF0dGFjayBleGVjdXRlZFwiKTtcclxuICAgIHJldHVybiB0aGlzLmF0dGFjayhlbmVteUJvYXJkTmFtZSwgcm93LCBjb2wpO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBVSSBiYXNlZCBvbiB0aGUgYXR0YWNrIHJlc3VsdFxyXG4gIHVwZGF0ZUF0dGFja1Jlc3VsdChwbG90LCByZXN1bHQpIHtcclxuICAgIGlmIChyZXN1bHQgPT09IFwiaGl0XCIpIHtcclxuICAgICAgcGxvdC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwibWlzc1wiKSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImltcG9ydCB7IHJhbmRvbVBsYWNlbWVudCB9IGZyb20gXCIuL1JhbmRvbVwiO1xyXG5cclxuY29uc3QgcGxvdFNoaXAgPSAobmFtZSwgc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uLCBib2FyZCkgPT4ge1xyXG4gIGNvbnN0IGFkZFNoaXBDbGFzcyA9IChlbGVtZW50SWQpID0+IHtcclxuICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZCk7XHJcbiAgICBpZiAoc3F1YXJlKSBzcXVhcmUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgfTtcclxuXHJcbiAgaWYgKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIikge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGFkZFNoaXBDbGFzcyhgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93fS0ke2NvbCArIGluZGV4fWApO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGFkZFNoaXBDbGFzcyhgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93ICsgaW5kZXh9LSR7Y29sfWApO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBvcmllbnRhdGlvblwiKTtcclxuICAgIHJldHVybiBcIlBsb3R0aW5nIGRpZG4ndCB3b3JrLlwiO1xyXG4gIH1cclxuICByZXR1cm4geyBuYW1lOiBuYW1lLCByb3c6IHJvdywgY29sOiBjb2wsIG9yaWVudGF0aW9uOiBvcmllbnRhdGlvbiB9O1xyXG59O1xyXG5cclxuY29uc3QgcGxvdFNoaXBzID0gKGJvYXJkTmFtZSwgZ2FtZWJvYXJkKSA9PiB7XHJcbiAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJvYXJkTmFtZS50b0xvd2VyQ2FzZSgpKS5jaGlsZE5vZGVzO1xyXG5cclxuICBnZXRTcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xyXG4gICAgY29uc3QgY29sID0gc3F1YXJlLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIGNvbnN0IHJvdyA9IHNxdWFyZS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICBpZiAoZ2FtZWJvYXJkLmdyaWRbcm93XVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgIH1cclxuICB9KTtcclxuICByZXR1cm4gZ2V0U3F1YXJlcztcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZVBsb3RCb2FyZCA9IChwbGF5ZXIpID0+IHtcclxuICBjb25zdCBnZXROYW1lID0gcGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKTtcclxuICBwbGF5ZXIuYm9hcmQuZ3JpZC5mb3JFYWNoKChyb3csIHJvd051bSkgPT4ge1xyXG4gICAgcm93LmZvckVhY2goKGNvbHVtbiwgY29sTnVtKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2dldE5hbWV9LSR7cm93TnVtfS0ke2NvbE51bX1gKTtcclxuICAgICAgaWYgKHNxdWFyZSkge1xyXG4gICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBjb2x1bW4gIT09IG51bGwgPyBcInNxdWFyZSBzaGlwXCIgOiBcInNxdWFyZSBkcm9wem9uZVwiO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZVJlbmRlciA9IChwbGF5ZXIpID0+IHtcclxuICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyKS5jaGlsZE5vZGVzO1xyXG4gIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7IHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZSBkcm9wem9uZVwiOyB9KTtcclxufTtcclxuXHJcbmNvbnN0IHBsb3RBbGxTaGlwc1JhbmRvbWx5ID0gKHBsYXllcikgPT4ge1xyXG4gIHBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICBpZiAoIXNoaXAuZGVwbG95KSB7XHJcbiAgICAgIHJhbmRvbVBsYWNlbWVudChwbGF5ZXIuYm9hcmQsIHNoaXApO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIHJldHVybiBwbGF5ZXIuYm9hcmQ7XHJcbn07XHJcblxyXG5jb25zdCBjbGVhckJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gIHBsYXllci5ib2FyZC5jbGVhckdyaWQoKTtcclxuICBwbGF5ZXIuYm9hcmQuY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKTtcclxuICByZW1vdmVSZW5kZXIocGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgcmV0dXJuIHBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKTsgLy8gcmV0dXJucyBmYWxzZVxyXG59O1xyXG5cclxuY29uc3QgbG9hZEJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllci5ib2FyZC5yb3dzOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGxheWVyLmJvYXJkLmNvbHM7IGorKykge1xyXG4gICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIjtcclxuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3F1YXJlKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNvbnRhaW5lcjtcclxufTtcclxuXHJcbmNvbnN0IHVwZGF0ZUJvYXJkID0gKHBsYXllcikgPT4ge1xyXG4gIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZFJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICBpZiAocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcImhpdFwiKSB7XHJcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgIH0gZWxzZSBpZiAocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcIm1pc3NcIikge1xyXG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQbG90cyBHYW1lIGJvYXJkIFVJIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5jb25zdCBwbG90QmFubmVyID0gKG1lc3NhZ2UpID0+IHtcclxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgYm94LmlubmVySFRNTCA9IGA8aDI+JHttZXNzYWdlfTwvaDI+YDtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcclxuICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuY29uc3QgcGxvdEdhbWUgPSAoZ2FtZSkgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGxheWVyQm9hcmRcIjtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQocGxvdEJhbm5lcihgJHtnYW1lLmdldEF0dGFja2VyKCkubmFtZX1gKSk7XHJcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxvYWRCb2FyZChnYW1lLmdldFJlY2VpdmVyKCkpKTtcclxuICByZXR1cm4gY29udGFpbmVyO1xyXG59O1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVBsYXkgYWdhaW4gTWVudSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmNvbnN0IGxvYWRQbGF5QWdhaW5NZW51ID0gKHdpbm5lciwgbG9zZXIpID0+IHtcclxuICBjb25zdCBwbGF5QWdhaW5NZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICBwbGF5QWdhaW5NZW51LmNsYXNzTmFtZSA9IFwibWVudS1ib3hcIjtcclxuICBwbGF5QWdhaW5NZW51LmlubmVySFRNTCA9IGBcclxuICAgIDxoMj4ke3dpbm5lcn0gaGFzIGRlZmVhdGVkICR7bG9zZXJ9PC9oMj5cclxuICAgIDxwPldvdWxkIHlvdSBsaWtlIHRvIHBsYXkgYWdhaW4/PC9wPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIlwiIGlkPVwicGxheS1hZ2FpblwiPlBsYXkgQWdhaW48L2J1dHRvbj5cclxuICBgO1xyXG4gIHJldHVybiBwbGF5QWdhaW5NZW51O1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBjbGVhckJvYXJkLFxyXG4gIGxvYWRQbGF5QWdhaW5NZW51LFxyXG4gIHBsb3RHYW1lLFxyXG4gIHBsb3RTaGlwLFxyXG4gIHBsb3RTaGlwcyxcclxuICBwbG90QWxsU2hpcHNSYW5kb21seSxcclxuICB1cGRhdGVCb2FyZCxcclxuICB1cGRhdGVQbG90Qm9hcmQsXHJcbn07XHJcbiIsIi8vIEdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2YgY29sdW1ucyBhbmQgcm93cy5cclxuY29uc3QgZ2VuZXJhdGVOdW1iZXIgPSAobWF4KSA9PiB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgd2l0aGluIHRoZSBnYW1lIGJvYXJkLlxyXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKGdhbWVib2FyZCkgPT4ge1xyXG4gIGxldCBjb2wgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQuY29scyk7XHJcbiAgbGV0IHJvdyA9IGdlbmVyYXRlTnVtYmVyKGdhbWVib2FyZC5yb3dzKTtcclxuXHJcbiAgcmV0dXJuIFtyb3csIGNvbF07XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSBhIHJhbmRvbSBwbGFjZW1lbnQgb24gdGhlIGJvYXJkLlxyXG5jb25zdCByYW5kb21QbGFjZW1lbnQgPSAoZ2FtZWJvYXJkLCBzaGlwKSA9PiB7XHJcbiAgbGV0IHBsYWNlZCA9IGZhbHNlO1xyXG4gIHdoaWxlICghcGxhY2VkKSB7XHJcbiAgICAgIGNvbnN0IFtyb3csIGNvbF0gPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7XHJcbiAgICAgIGNvbnN0IG9yaWVudGF0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuICAgICAgaWYgKGdhbWVib2FyZC5pc1ZhbGlkKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikpIHtcclxuICAgICAgICAgIHBsYWNlZCA9IGdhbWVib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKTtcclxuICAgICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIFBlcmZvcm0gYSByYW5kb20gYXR0YWNrIG9uIHRoZSBnYW1lYm9hcmQuXHJcbmNvbnN0IGdldFJhbmRvbUNvb3JkaW5hdGVzID0gKGdhbWVib2FyZCkgPT4ge1xyXG4gIGxldCB2YWxpZENvb3JkaW5hdGVzID0gZmFsc2U7XHJcbiAgbGV0IGNvb3JkaW5hdGVzO1xyXG5cclxuICB3aGlsZSAoIXZhbGlkQ29vcmRpbmF0ZXMpIHtcclxuICAgICAgY29vcmRpbmF0ZXMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7XHJcblxyXG4gICAgICBpZiAoZ2FtZWJvYXJkLmdyaWRbY29vcmRpbmF0ZXNbMF1dW2Nvb3JkaW5hdGVzWzFdXSAhPT0gXCJtaXNzXCIgJiZcclxuICAgICAgICAgIGdhbWVib2FyZC5ncmlkW2Nvb3JkaW5hdGVzWzBdXVtjb29yZGluYXRlc1sxXV0gIT09IFwiaGl0XCIpIHtcclxuICAgICAgICAgIHZhbGlkQ29vcmRpbmF0ZXMgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjb29yZGluYXRlcztcclxufTtcclxuXHJcbmV4cG9ydCB7IGdldFJhbmRvbUNvb3JkaW5hdGVzLCByYW5kb21QbGFjZW1lbnQgfTtcclxuIiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcbmNvbnN0IF9ERUZBVUxUX29yaWVudGF0aW9uICA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuY29vcmRpbmF0ZSA9IFtdO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IF9ERUZBVUxUX29yaWVudGF0aW9uO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5kZXBsb3kgPSBmYWxzZTtcclxuICB9XHJcbiAgXHJcbiAgaGl0ID0gKCkgPT4gdGhpcy5oaXRzKys7XHJcblxyXG4gIGlzU3VuayA9ICgpID0+IHRoaXMubGVuZ3RoIC0gdGhpcy5oaXRzID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICBkZWxldGVDb29yZGluYXRlcyA9ICgpID0+IHRoaXMuY29vcmRpbmF0ZS5zcGxpY2UoMCwgdGhpcy5jb29yZGluYXRlLmxlbmd0aCk7IC8vcmV0dXJucyBhbiBlbXB0eSBhcnJheSBcclxuICBcclxuICB0b2dnbGVPcmllbnRhdGlvbiA9ICgpID0+IHRoaXMub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiID8gdGhpcy5zZXRPcmllbnRhdGlvbihcInZlcnRpY2FsXCIpIDogdGhpcy5zZXRPcmllbnRhdGlvbihcImhvcml6b250YWxcIik7XHJcblxyXG4gIHNldE9yaWVudGF0aW9uID0gKG5ld09yaWVudGF0aW9uKSA9PiB0aGlzLm9yaWVudGF0aW9uID0gbmV3T3JpZW50YXRpb247XHJcbiAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlL3N0eWxlLnNjc3NcIjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9jb21wb3VuZHMvQXBwLmpzXCI7XHJcblxyXG5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBBcHAubG9hZFBhZ2UoKSk7Il0sIm5hbWVzIjpbIkJvYXJkIiwiR2FtZSIsIlBsYXllciIsInJhbmRvbVBsYWNlbWVudCIsImFkZEJvYXJkSGFuZGxlciIsInBsb3RHYW1lIiwiY2xlYXJCb2FyZCIsInVwZGF0ZUJvYXJkIiwidXBkYXRlUGxvdEJvYXJkIiwicGxvdFNoaXBzIiwicGxvdEFsbFNoaXBzUmFuZG9tbHkiLCJsb2FkUGxheUFnYWluTWVudSIsInJlbW92ZVdpbmRvdyIsIml0ZW0iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlQ2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwiR2FtZVNldHVwIiwibG9hZCIsInNldHVwIiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwiaXNQbGF5ZXJWc0NvbXB1dGVyIiwiY2hlY2tlZCIsImlzUGxheWVyVnNQbGF5ZXIiLCJnZXRQbGF5ZXIxTmFtZSIsInZhbHVlIiwiZ2V0UGxheWVyMk5hbWUiLCJnYW1lIiwic2V0dXBHYW1lIiwiY29uc29sZSIsImxvZyIsInVzZXJTZWxlY3RTaGlwIiwicGxheWVyIiwiZHJhZ2dlZFNoaXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsImJ1dHRvbiIsImJvYXJkIiwiZ2V0U2hpcCIsImdldEF0dHJpYnV0ZSIsImRlcGxveSIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY3VycmVudFRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwidGFyZ2V0Iiwicm93IiwicGFyc2VJbnQiLCJjb2wiLCJjb250YWlucyIsImlzVmFsaWQiLCJjaGVjayIsImdyaWQiLCJvcmllbnRhdGlvbiIsInBsYWNlU2hpcCIsInBsYXllclR1cm4iLCJwbGF5ZXIxIiwicGxheWVyMiIsImxvYWRTZXR1cFVJIiwicmFuZG9tUGxhY2VtZW50QnRuIiwiY2xlYXJCdG4iLCJkb25lQnRuIiwiZmluaXNoZWRTZXR1cEJ0biIsImlzSHVtYW4iLCJzaGlwcyIsInNoaXAiLCJwbGF5IiwicmVzZXQiLCJ3aW5kb3ciLCJ3aW5uZXIiLCJ0dXJuIiwiZ2V0Um9vdCIsImFwcGVuZENoaWxkIiwiZ2V0QXR0YWNrZXIiLCJuYW1lIiwiZ2V0UmVjZWl2ZXIiLCJzcXVhcmVzIiwiYXR0YWNrIiwiaXNHYW1lT3ZlciIsInNldFdpbm5lciIsIm5leHRUdXJuIiwicmFuZG9tQXR0YWNrIiwic2V0VGltZW91dCIsImdldEN1cnJlbnRUdXJuT3Bwb25lbnQiLCJNZW51Iiwicm9vdCIsIlVJIiwibG9hZEhhbmRsZXJzIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImlubmVySFRNTCIsImdldFJhZGlvcyIsInN1Ym1pdCIsImRpc2FibGVkIiwiQXBwIiwibG9hZFBhZ2UiLCJzcXVhcmUiLCJoYW5kbGVPcmllbnRhdGlvbiIsInNldE9yaWVudGF0aW9uIiwiZ2V0U2hpcEluZm8iLCJzdGFydCIsImNvb3JkaW5hdGUiLCJkZWxldGVTaGlwIiwiYmFubmVyIiwibWVzc2FnZSIsImxvYWRCdXR0b25zIiwiYnV0dG9ucyIsInRleHRDb250ZW50IiwibG9hZEJvYXJkIiwidG9Mb3dlckNhc2UiLCJnZXRHYW1lYm9hcmQiLCJpIiwicm93cyIsImoiLCJjb2xzIiwiZ2V0U3F1YXJlcyIsImNoaWxkTm9kZXMiLCJwYXJzZWRSb3ciLCJwYXJzZWRDb2wiLCJsb2FkU3RhcnRCdXR0b24iLCJzdGFydEJ0biIsInNoaXBNZW51IiwiY3JlYXRlQnRuIiwiaWQiLCJoYW5kbGVMb2FkU2hpcEJ0biIsImhhbmRsZVNxdWFyZUNsaWNrIiwiY29uc3RydWN0b3IiLCJ1c2VySW50ZXJmYWNlIiwic2hpcE1lbnVCb2FyZENvbnRhaW5lciIsIlNoaXAiLCJHYW1lYm9hcmQiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiY2xlYXJHcmlkIiwiaXNBbGxTaGlwc0RlcGxveWVkIiwiY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQiLCJpbmRleCIsInB1c2giLCJzaGlwTmFtZSIsInJlc3VsdCIsInJlY2VpdmVBdHRhY2siLCJ4IiwieSIsImhpdCIsImdldE1heEhpdHMiLCJzdW0iLCJnZXRIaXRzIiwiaGl0cyIsImNoZWNrc0RpZmZlcmVuY2UiLCJtYXAiLCJnZXRSYW5kb21Db29yZGluYXRlcyIsImdhbWVib2FyZCIsIm9wcG9uZW50Qm9hcmQiLCJlbmVteUJvYXJkTmFtZSIsInBsb3QiLCJlcnJvciIsIndhcm4iLCJhdHRhY2tSZXN1bHQiLCJ1cGRhdGVBdHRhY2tSZXN1bHQiLCJwbG90U2hpcCIsImFkZFNoaXBDbGFzcyIsImVsZW1lbnRJZCIsImJvYXJkTmFtZSIsImdldE5hbWUiLCJyb3dOdW0iLCJjb2x1bW4iLCJjb2xOdW0iLCJyZW1vdmVSZW5kZXIiLCJwbG90QmFubmVyIiwiYm94IiwibG9zZXIiLCJwbGF5QWdhaW5NZW51IiwiZ2VuZXJhdGVOdW1iZXIiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZUNvb3JkaW5hdGVzIiwicGxhY2VkIiwidmFsaWRDb29yZGluYXRlcyIsImNvb3JkaW5hdGVzIiwidjQiLCJ1dWlkdjQiLCJfREVGQVVMVF9vcmllbnRhdGlvbiIsImlzU3VuayIsImRlbGV0ZUNvb3JkaW5hdGVzIiwic3BsaWNlIiwidG9nZ2xlT3JpZW50YXRpb24iLCJuZXdPcmllbnRhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=