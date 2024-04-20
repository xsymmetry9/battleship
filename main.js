/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/compounds/App.js":
/*!******************************!*\
  !*** ./src/compounds/App.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/compounds/Ship.js");
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ "./src/compounds/Gameboard.js");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Player */ "./src/compounds/Player.js");



const gameboardPlayer1 = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
const gameboardPlayer2 = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
const player1 = new _Player__WEBPACK_IMPORTED_MODULE_2__["default"]("Gary", gameboardPlayer1, gameboardPlayer2, true);
const player2 = new _Player__WEBPACK_IMPORTED_MODULE_2__["default"]("computer", gameboardPlayer2, gameboardPlayer1, false);
class App {
  static loadPage() {
    const body = document.getElementById("root");
    body.appendChild(this.loadBanner());
    body.appendChild(this.loadButtons());
    body.appendChild(this.loadDOM());
    body.appendChild(this.loadMessageLog());
    this.handler();
  }
  static loadBanner() {
    const container = document.createElement("div");
    container.className = "banner";
    const wrapper = document.createElement("div");
    wrapper.className = "display-wrapper";
    const title = document.createElement("h2");
    title.textContent = "Battleship";
    wrapper.appendChild(title);
    container.appendChild(wrapper);
    return container;
  }
  static loadButtons() {
    const buttons = document.createElement("div");
    buttons.className = "buttons-container";
    buttons.innerHTML = `
            <button id="start-battleship" type="button">Start Game</button>
            <button id="random-placement" type="button">Random Placement</button>
            <button id= "clear-board" type="button">Clear</button>
            <button id="reset-battleship" class="hidden" type="button">Reset</button>
        `;
    return buttons;
  }
  static loadNewGameButton() {}
  static loadDOM() {
    const content = document.createElement("div");
    content.className = "boards-container";
    const handleBtnsContainer = document.createElement("div");
    handleBtnsContainer.className = "player-menu";
    handleBtnsContainer.appendChild(this.loadShips(player1));
    handleBtnsContainer.appendChild(this.loadOrientationBtns());
    content.appendChild(handleBtnsContainer);
    content.appendChild(this.loadBoard(player1, "player1"));
    content.appendChild(this.loadBoard(player2, "player2"));
    return content;
  }
  static loadMessageLog() {
    const container = document.createElement("div");
    container.className = "message-log-container";
    const box = document.createElement("div");
    box.className = "message-log-box";
    box.innerHTML = `<p id="message-log">Test</p>`;
    container.appendChild(box);
    return container;
  }

  // static sendMessage(message){
  //     const box = document.querySelector(".message-log-box");
  //     box.innerHTML += `<p>${message}</p>`;
  // }
  static sendMessage(message) {
    const box = document.querySelector(".display-wrapper h2");
    box.textContent = message;
  }
  static loadBoard(player, id) {
    const container = document.createElement("div");
    container.appendChild(this.loadGrid(player, id));
    return container;
  }
  static handleSquareClick(e, ship, player) {
    const col = parseInt(e.currentTarget.getAttribute("col"));
    const row = parseInt(e.currentTarget.getAttribute("row"));
    console.log(player.placeShip(ship, row, col, "horizontal"));
  }
  static handleOrientation = ship => {
    const orientationBtns = document.querySelectorAll(".orientation-btns");
    orientationBtns.forEach(item => {
      if (item.value !== ship.orientation) {
        item.classList.remove("disabled");
        item.addEventListener("click", e => this.handleOrientationBtn(e, ship));
      } else {
        item.classList.add("disabled");
      }
    });
  };
  static handleLoadShipBtn = (e, player) => {
    const ship = player.board.getShip(e.currentTarget.value);
    const getSquares = document.getElementById("player1").childNodes;
    this.handleOrientation(ship);
    getSquares.forEach(item => {
      item.addEventListener("click", e => this.handleSquareClick(e, ship, player));
    });
  };
  static handleOrientationBtn = (e, ship) => {
    // ship.setOrientation = e.currentTarget.value;
    ship.orientation = e.currentTarget.value;
    console.log(ship);
    e.currentTarget.classList.add("disabled");
    const orientationBtns = document.querySelectorAll(".orientation-btns");
    orientationBtns.forEach(item => {
      if (item.value !== ship.orientation) {
        item.classList.remove("disabled");
        item.addEventListener("click", e => this.handleOrientation(e, ship));
      }
    });
    return e.currentTarget.value;
  };
  static loadOrientationBtns = () => {
    const container = document.createElement("div");
    container.className = "orientation-container";
    container.innerHTML = `
        <button class="orientation-btns" id="horizontal-btn" value="horizontal">horizontal</button>
        <button class="orientation-btns" id="vertical-btn" value="vertical">vertical</button>
        `;
    return container;
  };
  static loadShips(player) {
    const container = document.createElement("div");
    container.className = "ship-buttons";
    player.board.ships.forEach(ship => {
      const createShips = document.createElement("div");
      createShips.className = "ship-btn-container";
      const createBtn = document.createElement("button");
      createBtn.className = "ship-btn";
      createBtn.setAttribute("id", ship.id);
      createBtn.setAttribute("value", ship.name);
      createBtn.textContent = ship.name;
      createBtn.addEventListener("click", e => this.handleLoadShipBtn(e, player));
      createShips.appendChild(createBtn);
      container.appendChild(createShips);
    });
    return container;
  }
  static loadGrid(player, id) {
    const getGameboard = player.board;
    const container = document.createElement("div");
    container.className = "gameboard";
    container.setAttribute("id", id);
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
  }
  static plotShips(gameboard) {
    const getSquares = document.getElementById("player1").childNodes;
    getSquares.forEach(item => {
      const col = item.getAttribute("col");
      const row = item.getAttribute("row");
      if (gameboard.grid[row][col] !== null) {
        item.classList.add("ship");
      }
    });
  }
  static updateGameBoard() {
    const getSquares = document.getElementById("player1").childNodes;
    getSquares.forEach(item => {
      const col = item.getAttribute("col");
      const row = item.getAttribute("row");
      if (player1.board.grid[col][row] == "hit") {
        item.classList.remove("ship");
        item.classList.add("hit");
      } else if (player1.board.grid[col][row] == "miss") {}
    });
  }
  static handler() {
    const startBtn = document.getElementById("start-battleship");
    const randomPlacementBtn = document.getElementById("random-placement");
    const clearBoardBtn = document.getElementById("clear-board");
    const resetBtn = document.getElementById("reset-battleship");
    const content = document.querySelector(".boards-container");
    const getShipBtns = document.querySelector(".ship-buttons");
    const playerMenu = document.querySelector(".player-menu");
    const move = e => {
      const square = e.currentTarget;
      const col = square.getAttribute("col");
      const row = square.getAttribute("row");
      this.sendMessage(player1.attack(player2.name, row, col)); //players chooses to go
      if (player1.opponentBoard.grid[col][row] === "hit") {
        //checks if game over
        if (player1.opponentBoard.isGameOver()) {
          alert("Game over");
          removeHandler();
        } else {
          setTimeout(() => {
            this.sendMessage(player2.randomAttack());
            this.updateGameBoard();
          }, 3000);
        }
      } else if (player1.opponentBoard.grid[col][row] === "miss") {
        setTimeout(() => {
          this.sendMessage(player2.randomAttack());
          this.updateGameBoard();
        }, 3000);
      } else {
        console.log("error");
      }
      square.removeEventListener("click", move);
    };
    const addHandler = () => {
      const squares = document.getElementById("player2").childNodes;
      squares.forEach(square => {
        square.addEventListener("click", move);
      });
    };
    const removeHandler = () => {
      const getChildren = document.getElementById("player2").childNodes;
      getChildren.forEach(square => {
        square.removeEventListener("click", move);
      });
    };
    const start = () => {
      addHandler();
      getShipBtns.classList.add("hidden");
      this.sendMessage("Player 1 moves first");
      player2.placeRandomToBoard();
      startBtn.removeEventListener("click", start);
      startBtn.classList.add("hidden");
      randomPlacementBtn.classList.add("hidden");
      clearBoardBtn.classList.add("hidden");
      resetBtn.classList.remove("hidden");
    };
    const removeRender = player => {
      const squares = document.getElementById(player).childNodes;
      squares.forEach(square => {
        square.className = "square";
      });
    };
    const randomPlacement = player => {
      player1.placeRandomToBoard();
      this.plotShips(player1.board);
    };
    const clearBoard = player => {
      console.log("clear");
      player.board.clearGrid();
      player.board.changeAllShiptoNotDeployed();
      removeRender("player1");
    };
    const reset = () => {
      player1.board.clearGrid();
      player2.board.clearGrid();
      removeHandler();
      removeRender("player1");
      removeRender("player2");
      this.sendMessage("Press Start.");
      startBtn.addEventListener("click", start);
      startBtn.classList.remove("hidden");
      resetBtn.classList.add("hidden");
      getShipBtns.classList.remove("hidden");
      randomPlacementBtn.classList.remove("hidden");
      clearBoardBtn.classList.remove("hidden");
    };
    startBtn.addEventListener("click", start);
    randomPlacementBtn.addEventListener("click", () => randomPlacement(player1));
    clearBoardBtn.addEventListener("click", () => clearBoard(player1));
    resetBtn.addEventListener("click", reset);
  }
}

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
    this.ships = [new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Assault Ship", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Aircraft Carrier", 5), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Destroyer", 7), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Cruiser", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Combat Ship", 1)];
  }

  //Clears the board.
  clearGrid() {
    this.grid.forEach(row => row.fill(null));
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
      ship.isSunk();
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
  changeAllShiptoNotDeployed() {
    this.ships.map(ship => ship.deploy = false);
  }

  //Plots hits

  //Plots miss
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
    console.log(`${row}-${col}`);
    console.log(plot);
    if (this.opponentBoard.receiveAttack(this.opponentBoard, row, col) === "hit") {
      plot.classList.add("hit");
      return `${this.name} had a good hit`;
    } else {
      plot.classList.add("miss");
      return `${this.name} missed`;
    }
    ;
  }
  //Player chooses to attack randomly on the opponent's board.
  randomAttack() {
    const coordinates = (0,_Random__WEBPACK_IMPORTED_MODULE_0__.randomAttack)(this.opponentBoard);
    const row = coordinates[0];
    const col = coordinates[1];
    return this.attack(row, col);
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
/* harmony export */   plotHit: () => (/* binding */ plotHit),
/* harmony export */   plotMiss: () => (/* binding */ plotMiss),
/* harmony export */   plotShip: () => (/* binding */ plotShip),
/* harmony export */   removePlot: () => (/* binding */ removePlot)
/* harmony export */ });
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
      createId.addEventListener("click", e => {
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
const plotHit = () => {};
const plotMiss = () => {};
const removePlot = () => {};
const clearBoard = () => {};


/***/ }),

/***/ "./src/compounds/Random.js":
/*!*********************************!*\
  !*** ./src/compounds/Random.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   randomAttack: () => (/* binding */ randomAttack),
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
const randomAttack = gameboard => {
  let randomCoordinates = generateCoordinates(gameboard); //returns array

  if (gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit") {
    return randomCoordinates;
  } else {
    return randomAttack(gameboard);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTyx3REFBUTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDUztBQUNOO0FBQ3NCOztBQUVqRDtBQUNBLE1BQU0sa0RBQU07QUFDWixXQUFXLGtEQUFNO0FBQ2pCOztBQUVBO0FBQ0EsaURBQWlELCtDQUFHLEtBQUs7O0FBRXpEO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTLDhEQUFlO0FBQ3hCOztBQUVBLGlFQUFlLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztBQzVCYzs7QUFFL0I7QUFDQSxxQ0FBcUMsaURBQUs7QUFDMUM7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7O1VDTnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ1M7QUFFckMyRCxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRXBELHlEQUFHLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9BcHAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxheWVyLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbG90LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcFwiXHJcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXHJcblxyXG5jb25zdCBnYW1lYm9hcmRQbGF5ZXIxID0gbmV3IEdhbWVib2FyZCgpO1xyXG5jb25zdCBnYW1lYm9hcmRQbGF5ZXIyID0gbmV3IEdhbWVib2FyZCgpO1xyXG5cclxuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoXCJHYXJ5XCIsIGdhbWVib2FyZFBsYXllcjEsIGdhbWVib2FyZFBsYXllcjIsIHRydWUpO1xyXG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIGdhbWVib2FyZFBsYXllcjIsIGdhbWVib2FyZFBsYXllcjEsIGZhbHNlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQmFubmVyKCkpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQnV0dG9ucygpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZERPTSgpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZE1lc3NhZ2VMb2coKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlcigpO1xyXG5cclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkQmFubmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJiYW5uZXJcIjtcclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSBcImRpc3BsYXktd3JhcHBlclwiO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpXHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkQnV0dG9ucygpe1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiXHJcblxyXG4gICAgICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwic3RhcnQtYmF0dGxlc2hpcFwiIHR5cGU9XCJidXR0b25cIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyYW5kb20tcGxhY2VtZW50XCIgdHlwZT1cImJ1dHRvblwiPlJhbmRvbSBQbGFjZW1lbnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD0gXCJjbGVhci1ib2FyZFwiIHR5cGU9XCJidXR0b25cIj5DbGVhcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicmVzZXQtYmF0dGxlc2hpcFwiIGNsYXNzPVwiaGlkZGVuXCIgdHlwZT1cImJ1dHRvblwiPlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgICAgIHJldHVybiBidXR0b25zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkTmV3R2FtZUJ1dHRvbigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbG9hZERPTSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gXCJib2FyZHMtY29udGFpbmVyXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZUJ0bnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGhhbmRsZUJ0bnNDb250YWluZXIuY2xhc3NOYW1lID0gXCJwbGF5ZXItbWVudVwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGhhbmRsZUJ0bnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkU2hpcHMocGxheWVyMSkpO1xyXG4gICAgICAgIGhhbmRsZUJ0bnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkT3JpZW50YXRpb25CdG5zKCkpO1xyXG5cclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKGhhbmRsZUJ0bnNDb250YWluZXIpO1xyXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQm9hcmQocGxheWVyMSwgXCJwbGF5ZXIxXCIpKTtcclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkKHBsYXllcjIsIFwicGxheWVyMlwiKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkTWVzc2FnZUxvZygpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctY29udGFpbmVyXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgYm94LmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctYm94XCI7XHJcbiAgICAgICAgYm94LmlubmVySFRNTCA9IGA8cCBpZD1cIm1lc3NhZ2UtbG9nXCI+VGVzdDwvcD5gO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgc2VuZE1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgICAvLyAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLWxvZy1ib3hcIik7XHJcbiAgICAvLyAgICAgYm94LmlubmVySFRNTCArPSBgPHA+JHttZXNzYWdlfTwvcD5gO1xyXG4gICAgLy8gfVxyXG4gICAgc3RhdGljIHNlbmRNZXNzYWdlKG1lc3NhZ2Upe1xyXG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheS13cmFwcGVyIGgyXCIpO1xyXG4gICAgICAgIGJveC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRCb2FyZChwbGF5ZXIsIGlkKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkR3JpZChwbGF5ZXIsIGlkKSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSB7XHJcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgXCJob3Jpem9udGFsXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlT3JpZW50YXRpb24gPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmllbnRhdGlvbi1idG5zXCIpO1xyXG4gICAgICAgIG9yaWVudGF0aW9uQnRucy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgICAgICAgICAgaWYoaXRlbS52YWx1ZSAhPT0gc2hpcC5vcmllbnRhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIChlKSA9PiB0aGlzLmhhbmRsZU9yaWVudGF0aW9uQnRuKGUsIHNoaXApKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZUxvYWRTaGlwQnRuID0gKGUsIHBsYXllcikgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZU9yaWVudGF0aW9uKHNoaXApO1xyXG4gXHJcbiAgICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLmhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoYW5kbGVPcmllbnRhdGlvbkJ0biA9IChlLCBzaGlwKSA9PntcclxuICAgICAgICAvLyBzaGlwLnNldE9yaWVudGF0aW9uID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHNoaXAub3JpZW50YXRpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JpZW50YXRpb24tYnRuc1wiKTtcclxuICAgICAgICBvcmllbnRhdGlvbkJ0bnMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgICAgIGlmKGl0ZW0udmFsdWUgIT09IHNoaXAub3JpZW50YXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoZSkgPT4gdGhpcy5oYW5kbGVPcmllbnRhdGlvbihlLCBzaGlwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGUuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbG9hZE9yaWVudGF0aW9uQnRucyA9ICgpID0+e1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwib3JpZW50YXRpb24tY29udGFpbmVyXCI7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm9yaWVudGF0aW9uLWJ0bnNcIiBpZD1cImhvcml6b250YWwtYnRuXCIgdmFsdWU9XCJob3Jpem9udGFsXCI+aG9yaXpvbnRhbDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJvcmllbnRhdGlvbi1idG5zXCIgaWQ9XCJ2ZXJ0aWNhbC1idG5cIiB2YWx1ZT1cInZlcnRpY2FsXCI+dmVydGljYWw8L2J1dHRvbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRTaGlwcyhwbGF5ZXIpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG4gICBcclxuICAgICAgICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXBzLmNsYXNzTmFtZSA9IFwic2hpcC1idG4tY29udGFpbmVyXCI7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG5cIjtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuaGFuZGxlTG9hZFNoaXBCdG4oZSwgcGxheWVyKSk7XHJcblxyXG4gICAgICAgICAgICBjcmVhdGVTaGlwcy5hcHBlbmRDaGlsZChjcmVhdGVCdG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlU2hpcHMpO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgXHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRHcmlkKHBsYXllciwgaWQpe1xyXG4gICAgICAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJnYW1lYm9hcmRcIjtcclxuICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKX0tJHtpfS0ke2p9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGxvdFNoaXBzKGdhbWVib2FyZCl7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgIGlmKGdhbWVib2FyZC5ncmlkW3Jvd11bY29sXSAhPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgdXBkYXRlR2FtZUJvYXJkKCl7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIxLmJvYXJkLmdyaWRbY29sXVtyb3ddID09IFwiaGl0XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNoaXBcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIxLmJvYXJkLmdyaWRbY29sXVtyb3ddID09IFwibWlzc1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlcigpe1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgICAgICBjb25zdCBjbGVhckJvYXJkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKVxyXG4gICAgICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkcy1jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3QgZ2V0U2hpcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtYnV0dG9uc1wiKTtcclxuICAgICAgICBjb25zdCBwbGF5ZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbWVudVwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW92ZSA9IChlKSA9PntcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyLm5hbWUsIHJvdywgY29sKSk7IC8vcGxheWVycyBjaG9vc2VzIHRvIGdvXHJcbiAgICAgICAgICAgIGlmKHBsYXllcjEub3Bwb25lbnRCb2FyZC5ncmlkW2NvbF1bcm93XSA9PT0gXCJoaXRcIil7XHJcbiAgICAgICAgICAgICAgICAgLy9jaGVja3MgaWYgZ2FtZSBvdmVyXHJcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXIxLm9wcG9uZW50Qm9hcmQuaXNHYW1lT3ZlcigpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiR2FtZSBvdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjaygpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlR2FtZUJvYXJkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIxLm9wcG9uZW50Qm9hcmQuZ3JpZFtjb2xdW3Jvd10gPT09IFwibWlzc1wiKVxyXG4gICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjaygpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lQm9hcmQoKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMDApO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgbW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhZGRIYW5kbGVyID0gKCk9PntcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMlwiKS5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT57XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgbW92ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVtb3ZlSGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZ2V0Q2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJcIikuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgZ2V0Q2hpbGRyZW4uZm9yRWFjaCgoc3F1YXJlKSA9PntcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBtb3ZlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdGFydCA9ICgpID0+e1xyXG4gICAgICAgICAgICBhZGRIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIGdldFNoaXBCdG5zLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoXCJQbGF5ZXIgMSBtb3ZlcyBmaXJzdFwiKTtcclxuICAgICAgICAgICAgcGxheWVyMi5wbGFjZVJhbmRvbVRvQm9hcmQoKTtcclxuICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICByYW5kb21QbGFjZW1lbnRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICByZXNldEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVtb3ZlUmVuZGVyID0gKHBsYXllcikgPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIpLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7c3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCJ9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgICAgICBwbGF5ZXIxLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsb3RTaGlwcyhwbGF5ZXIxLmJvYXJkKTsgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNsZWFyQm9hcmQgPSAocGxheWVyKSA9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGVhclwiKVxyXG4gICAgICAgICAgICBwbGF5ZXIuYm9hcmQuY2xlYXJHcmlkKCk7XHJcbiAgICAgICAgICAgIHBsYXllci5ib2FyZC5jaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpO1xyXG4gICAgICAgICAgICByZW1vdmVSZW5kZXIoXCJwbGF5ZXIxXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzZXQgPSAoKSA9PntcclxuICAgICAgICAgICAgcGxheWVyMS5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgICAgICAgICAgcGxheWVyMi5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgICAgICAgICByZW1vdmVSZW5kZXIoXCJwbGF5ZXIxXCIpO1xyXG4gICAgICAgICAgICByZW1vdmVSZW5kZXIoXCJwbGF5ZXIyXCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShcIlByZXNzIFN0YXJ0LlwiKVxyXG5cclxuICAgICAgICAgICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICByZXNldEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICBnZXRTaGlwQnRucy5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICByYW5kb21QbGFjZW1lbnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgY2xlYXJCb2FyZEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHN0YXJ0KTtcclxuICAgICAgICByYW5kb21QbGFjZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gcmFuZG9tUGxhY2VtZW50KHBsYXllcjEpKTtcclxuICAgICAgICBjbGVhckJvYXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IGNsZWFyQm9hcmQocGxheWVyMSkpXHJcbiAgICAgICAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcmVzZXQpO1xyXG5cclxuICAgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xyXG5jbGFzcyBHYW1lYm9hcmR7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvd3MgPSAxMDsgXHJcbiAgICB0aGlzLmNvbHMgPSAxMDtcclxuICAgIHRoaXMuZ3JpZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoKSA9PiBBcnJheSh0aGlzLmNvbHMpLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5zaGlwcyA9IFtcclxuICAgICAgbmV3IFNoaXAoXCJBc3NhdWx0IFNoaXBcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQWlyY3JhZnQgQ2FycmllclwiLCA1KSxcclxuICAgICAgbmV3IFNoaXAoXCJEZXN0cm95ZXJcIiwgNyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQ3J1aXNlclwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJDb21iYXQgU2hpcFwiLCAxKSAgIFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8vQ2xlYXJzIHRoZSBib2FyZC5cclxuICBjbGVhckdyaWQoKXtcclxuICAgIHRoaXMuZ3JpZC5mb3JFYWNoKHJvdyA9PiByb3cuZmlsbChudWxsKSk7XHJcbiAgfVxyXG4gIC8vQ2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgc2hpcHMgb24gdGhlIGJvYXJkIGFuZCBpZiBpdCBmaXRzLlxyXG4gIGlzVmFsaWQoc2hpcCwgcm93LCBjb2wpe1xyXG4gICAgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICBpZihjb2wgKyBzaGlwLmxlbmd0aCA+IHRoaXMuY29scylcclxuICAgICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSAvLyBcIkVycm9yOiBTaGlwIGRvZXNuJ3QgZml0IGhvcml6b250YWxseS5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IHNoaXAubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiRXJyb3I6IEEgc2hpcCBpcyBhbHJlYWR5IHByZXNlbnQgYXQgdGhpcyBsb2NhdGlvbiBob3Jpem9udGFsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5kZXggKys7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvL1Bhc3MgYWxsIHRlc3RcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSBlbHNlIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGlmKHJvdyArIHNoaXAubGVuZ3RoID4gdGhpcy5yb3dzKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIlNoaXAgZG9lc24ndCBmaXQgdmVydGljYWxseVwiOyAvL1NoaXAgZG9lc24ndCBmaXQuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB3aGlsZShpbmRleCA8IHNoaXAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgaWYodGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJBIHNoaXAgaXMgYWxyZWFkeSBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZSAvL1wiSW52YWxpZCBkaXJlY3Rpb25cIjsgLy9pbnZhbGlkIG5hbWVcclxuICAgIH1cclxuICB9XHJcbi8vUGxhY2VzIHRoZSBzaGlwIG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wpe1xyXG4gICAgaWYoIXRoaXMuaXNWYWxpZChzaGlwLCByb3csIGNvbCkpXHJcbiAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICBcclxuICAgIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAgICB7XHJcbiAgICAgICAgLy9jaGVja3MgZm9yIG92ZXJsYXBzIG9yIG91dCBvZiBib3VuZHNcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKylcclxuICAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH0gZWxzZSBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpeyAvL2RpcmVjdGlvbiBpcyBob3Jpem9udGFsXHJcbiAgICAgICAgLy9pZiBldmVyeXRoaW5nIHBhc3NlcywgcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgIHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9XHJcblxyXG4gICAgfSBcclxuICAgIGdldFNoaXAoc2hpcE5hbWUpe1xyXG4gICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICB0aGlzLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICBpZihzaGlwLm5hbWUgPT09IHNoaXBOYW1lKSB7XHJcbiAgICAgICAgICByZXN1bHQgPSBzaGlwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gXCJzaGlwIG5vdCBmb3VuZFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgLy9QbGFjZXMgYW4gYXR0YWNrIG9uIHRoZSBib2FyZC5cclxuICByZWNlaXZlQXR0YWNrKHgsIHkpe1xyXG4gICAgXHJcbiAgICBpZih4ID49IHRoaXMuY29scyB8fCB5ID49dGhpcy5yb3dzIClcclxuICAgICAgcmV0dXJuIFwib3V0IG9mIGJvdW5kc1wiO1xyXG4gICAgaWYodGhpcy5ncmlkW3hdW3ldID09PSBudWxsKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcIm1pc3NcIjsgLy9tYXJrIGRvd24gbWlzc1xyXG4gICAgICByZXR1cm4gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmdyaWRbeF1beV07XHJcbiAgICAgIHNoaXAuaGl0KCk7XHJcbiAgICAgIHNoaXAuaXNTdW5rKCk7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwiaGl0XCI7XHJcbiAgICAgIHJldHVybiBcImhpdFwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNYXhIaXRzKCl7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+e1xyXG4gICAgICBzdW0rPSBzaGlwLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcbiAgZ2V0SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5oaXRzO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tzRGlmZmVyZW5jZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TWF4SGl0cygpIC0gdGhpcy5nZXRIaXRzKCk7XHJcbiAgfVxyXG5cclxuICAvL0NoZWNrcyBpZiB0aGUgZ2FtZSBpcyBvdmVyLlxyXG4gIGlzR2FtZU92ZXIoKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY2hlY2tzRGlmZmVyZW5jZSgpKTtcclxuICAgIHJldHVybiB0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcbiAgY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKXtcclxuICAgIHRoaXMuc2hpcHMubWFwKChzaGlwKSA9PiBzaGlwLmRlcGxveSA9IGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8vUGxvdHMgaGl0c1xyXG5cclxuICAvL1Bsb3RzIG1pc3NcclxufVxyXG5cclxuIFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQge3JhbmRvbUF0dGFjaywgcmFuZG9tUGxhY2VtZW50fSBmcm9tICcuL1JhbmRvbSc7XHJcbmltcG9ydCB7cGxvdFNoaXB9IGZyb20gJy4vUGxvdCc7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGdhbWVib2FyZCwgb3Bwb25lbnRCb2FyZCwgaXNIdW1hbilcclxuICB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZCA9IGdhbWVib2FyZDtcclxuICAgIHRoaXMub3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50Qm9hcmQ7XHJcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xyXG5cclxuICB9XHJcbiAgLy9QbGFjZXMgc2hpcHMgcmFuZG9tbHkgb24gdGhlIGJvYXJkLlxyXG4gIHBsYWNlUmFuZG9tVG9Cb2FyZCgpe1xyXG4gICAgdGhpcy5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIHJhbmRvbVBsYWNlbWVudCh0aGlzLmJvYXJkLCBzaGlwKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMub3Bwb25lbnRCb2FyZC5zaGlwcztcclxuICB9XHJcbi8vQSBmdW5jdGlvbiB0aGF0IHBsYWNlcyBzaGlwcyBvbiB0aGUgYm9hcmQgbWFudWFsbHkuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKVxyXG4gIHtcclxuICAgIGlmICghc2hpcC5kZXBsb3kgJiYgdGhpcy5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wpKXtcclxuICAgICAgcGxvdFNoaXAodGhpcy5uYW1lLCByb3csIGNvbCwgc2hpcC5sZW5ndGgsIHNoaXAub3JpZW50YXRpb24pO1xyXG4gICAgICByZXR1cm4gdGhpcy5ib2FyZC5ncmlkO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIlNoaXAgaGFzIGFscmVhZHkgYmVlbiBkZXBsb3llZC4gIFRyaWVkIGFnYWluXCJcclxuICAgIH1cclxuXHJcbiAgfVxyXG4vL1BsYXllciBjaG9vc2VzIHRvIGF0dGFjayBvbiB0aGUgb3Bwb25lbnQncyBib2FyZC5cclxuICBhdHRhY2soZW5lbXlCb2FyZE5hbWUsIHJvdywgY29sKXtcclxuICAgIGNvbnN0IHBsb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlbmVteUJvYXJkTmFtZX0tJHtyb3d9LSR7Y29sfWApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGAke3Jvd30tJHtjb2x9YCk7XHJcbiAgICBjb25zb2xlLmxvZyhwbG90KTtcclxuXHJcblxyXG4gICAgaWYodGhpcy5vcHBvbmVudEJvYXJkLnJlY2VpdmVBdHRhY2sodGhpcy5vcHBvbmVudEJvYXJkLCByb3csIGNvbCkgPT09IFwiaGl0XCIpXHJcbiAgICB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gaGFkIGEgZ29vZCBoaXRgOyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IG1pc3NlZGA7XHJcbiAgICB9O1xyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgcmFuZG9tbHkgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgcmFuZG9tQXR0YWNrKCl7XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHJhbmRvbUF0dGFjayh0aGlzLm9wcG9uZW50Qm9hcmQpO1xyXG4gICAgY29uc3Qgcm93ID0gY29vcmRpbmF0ZXNbMF07XHJcbiAgICBjb25zdCBjb2wgPSBjb29yZGluYXRlc1sxXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2socm93LCBjb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJjb25zdCBwbG90U2hpcCA9IChuYW1lLCByb3csIGNvbCwgbGVuZ3RoLCBvcmllbnRhdGlvbikgPT57XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICBjb2w6IGNvbCxcclxuICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cclxuICAgIH0pXHJcblxyXG4gICAgaWYob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3Jvd30tJHtjb2wgKyBpbmRleH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgZSA9Pntjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQpfSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93ICsgaW5kZXh9LSR7Y29sfWApO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlBsb3R0aW5nIGRpZG4ndCB3b3JrLlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHBsb3RIaXQgPSAoKSA9PntcclxuXHJcbn1cclxuXHJcbmNvbnN0IHBsb3RNaXNzID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCByZW1vdmVQbG90ID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCBjbGVhckJvYXJkID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5leHBvcnQge3Bsb3RTaGlwLCBwbG90SGl0LCBwbG90TWlzcywgcmVtb3ZlUGxvdH0iLCIvL0dlbmVyYXRlcyByYW5kb20gbnVtYmVyIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYW5kIHJvd3MuXHJcbmNvbnN0IGdlbmVyYXRlTnVtYmVyID0gKG1heCkgPT57XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgd2l0aGluIHRoZSBnYW1lIGJvYXJkXHJcbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBjb2wgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQuY29scyk7XHJcbiAgICBsZXQgcm93ID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLnJvd3MpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjb2wsIHJvd107XHJcbn1cclxuXHJcbi8vR2VuZXJhdGUgYSByYW5kb20gcGxhY2VtZW50IG9uIHRoZSBib2FyZC5cclxuY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKGdhbWVib2FyZCwgc2hpcCkgPT57XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInZlcnRpY2FsXCI6IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc2hpcC5vcmllbnRhdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdKSlcclxuICAgIHtcclxuICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWVib2FyZCwgc2hpcCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbi8vUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZFxyXG5jb25zdCByYW5kb21BdHRhY2sgPSAoZ2FtZWJvYXJkKSA9PntcclxuXHJcbiAgICBsZXQgcmFuZG9tQ29vcmRpbmF0ZXMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7IC8vcmV0dXJucyBhcnJheVxyXG5cclxuICAgIGlmIChnYW1lYm9hcmQuZ3JpZFtyYW5kb21Db29yZGluYXRlc1swXV1bcmFuZG9tQ29vcmRpbmF0ZXNbMV1dICE9PSBcIm1pc3NcIiAmJiBnYW1lYm9hcmQuZ3JpZFtyYW5kb21Db29yZGluYXRlc1swXV1bcmFuZG9tQ29vcmRpbmF0ZXNbMV1dICE9PSBcImhpdFwiIClcclxuICAgIHtcclxuICAgICAgcmV0dXJuIHJhbmRvbUNvb3JkaW5hdGVzO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICByZXR1cm4gcmFuZG9tQXR0YWNrKGdhbWVib2FyZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7cmFuZG9tQXR0YWNrLCByYW5kb21QbGFjZW1lbnR9IiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcbmNvbnN0IF9ERUZBVUxUX29yaWVudGF0aW9uICA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBfREVGQVVMVF9vcmllbnRhdGlvbjtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuZGVwbG95ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRPcmllbnRhdGlvbihpdGVtKXtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb247XHJcbiAgfVxyXG5cclxuICBoaXQoKXtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCl7XHJcblxyXG4gICAgaWYoKHRoaXMubGVuZ3RoIC0gdGhpcy5oaXRzKSA9PT0gMClcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBzdW5rYCk7XHJcbiAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBoaXQgJHt0aGlzLmhpdHN9IHRpbWUuYCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlL3N0eWxlLnNjc3NcIjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9jb21wb3VuZHMvQXBwLmpzXCI7XHJcblxyXG5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBBcHAubG9hZFBhZ2UoKSk7Il0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJnYW1lYm9hcmRQbGF5ZXIxIiwiZ2FtZWJvYXJkUGxheWVyMiIsInBsYXllcjEiLCJwbGF5ZXIyIiwiQXBwIiwibG9hZFBhZ2UiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFwcGVuZENoaWxkIiwibG9hZEJhbm5lciIsImxvYWRCdXR0b25zIiwibG9hZERPTSIsImxvYWRNZXNzYWdlTG9nIiwiaGFuZGxlciIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ3cmFwcGVyIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsImJ1dHRvbnMiLCJpbm5lckhUTUwiLCJsb2FkTmV3R2FtZUJ1dHRvbiIsImNvbnRlbnQiLCJoYW5kbGVCdG5zQ29udGFpbmVyIiwibG9hZFNoaXBzIiwibG9hZE9yaWVudGF0aW9uQnRucyIsImxvYWRCb2FyZCIsImJveCIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5ZXIiLCJpZCIsImxvYWRHcmlkIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJlIiwic2hpcCIsImNvbCIsInBhcnNlSW50IiwiY3VycmVudFRhcmdldCIsImdldEF0dHJpYnV0ZSIsInJvdyIsImNvbnNvbGUiLCJsb2ciLCJwbGFjZVNoaXAiLCJoYW5kbGVPcmllbnRhdGlvbiIsIm9yaWVudGF0aW9uQnRucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaXRlbSIsInZhbHVlIiwib3JpZW50YXRpb24iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlT3JpZW50YXRpb25CdG4iLCJhZGQiLCJoYW5kbGVMb2FkU2hpcEJ0biIsImJvYXJkIiwiZ2V0U2hpcCIsImdldFNxdWFyZXMiLCJjaGlsZE5vZGVzIiwic2hpcHMiLCJjcmVhdGVTaGlwcyIsImNyZWF0ZUJ0biIsInNldEF0dHJpYnV0ZSIsIm5hbWUiLCJnZXRHYW1lYm9hcmQiLCJpIiwicm93cyIsImoiLCJjb2xzIiwic3F1YXJlIiwidG9Mb3dlckNhc2UiLCJwbG90U2hpcHMiLCJnYW1lYm9hcmQiLCJncmlkIiwidXBkYXRlR2FtZUJvYXJkIiwic3RhcnRCdG4iLCJyYW5kb21QbGFjZW1lbnRCdG4iLCJjbGVhckJvYXJkQnRuIiwicmVzZXRCdG4iLCJnZXRTaGlwQnRucyIsInBsYXllck1lbnUiLCJtb3ZlIiwiYXR0YWNrIiwib3Bwb25lbnRCb2FyZCIsImlzR2FtZU92ZXIiLCJhbGVydCIsInJlbW92ZUhhbmRsZXIiLCJzZXRUaW1lb3V0IiwicmFuZG9tQXR0YWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEhhbmRsZXIiLCJzcXVhcmVzIiwiZ2V0Q2hpbGRyZW4iLCJzdGFydCIsInBsYWNlUmFuZG9tVG9Cb2FyZCIsInJlbW92ZVJlbmRlciIsInJhbmRvbVBsYWNlbWVudCIsImNsZWFyQm9hcmQiLCJjbGVhckdyaWQiLCJjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCIsInJlc2V0IiwiY29uc3RydWN0b3IiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiaXNWYWxpZCIsImluZGV4IiwiZGVwbG95Iiwic2hpcE5hbWUiLCJyZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJoaXQiLCJpc1N1bmsiLCJnZXRNYXhIaXRzIiwic3VtIiwiZ2V0SGl0cyIsImhpdHMiLCJjaGVja3NEaWZmZXJlbmNlIiwibWFwIiwicGxvdFNoaXAiLCJpc0h1bWFuIiwiZW5lbXlCb2FyZE5hbWUiLCJwbG90IiwiY29vcmRpbmF0ZXMiLCJjcmVhdGVJZCIsInBsb3RIaXQiLCJwbG90TWlzcyIsInJlbW92ZVBsb3QiLCJnZW5lcmF0ZU51bWJlciIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlQ29vcmRpbmF0ZXMiLCJkaXJlY3Rpb24iLCJyYW5kb21Db29yZGluYXRlcyIsInY0IiwidXVpZHY0IiwiX0RFRkFVTFRfb3JpZW50YXRpb24iLCJzZXRPcmllbnRhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=