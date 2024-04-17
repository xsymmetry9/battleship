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
            <button id="reset-battleship" class="hidden" type="button">Reset</button>
        `;
    return buttons;
  }
  static loadNewGameButton() {}
  static loadDOM() {
    const content = document.createElement("div");
    content.className = "boards-container";
    content.appendChild(this.loadShips(player1));
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
  static handleLoadShipBtn = (e, player) => {
    const ship = player.board.getShip(e.currentTarget.value);
    const getSquares = document.getElementById("player1").childNodes;
    getSquares.forEach(item => {
      item.addEventListener("click", e => this.handleSquareClick(e, ship, player));
    });
  };
  static loadShips(player) {
    const container = document.createElement("div");
    container.className = "ship-buttons";
    const horizontalBtn = document.createElement("button");
    const verticalBtn = document.createElement("button");
    horizontalBtn.textContent = "Horizontal";
    verticalBtn.textContent = "Vertical";
    horizontalBtn.classList.add("disabled");
    verticalBtn.classList.add("disabled");
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
    container.appendChild(horizontalBtn);
    container.appendChild(verticalBtn);
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
    const resetBtn = document.getElementById("reset-battleship");
    const content = document.querySelector(".boards-container");
    const getShipBtns = document.querySelector(".ship-buttons");
    const move = e => {
      const square = e.currentTarget;
      const col = square.getAttribute("col");
      const row = square.getAttribute("row");
      this.sendMessage(player1.attack(row, col)); //players chooses to go
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
      player1.placeRandomToBoard();
      player2.placeRandomToBoard();
      this.plotShips(player1.board);
      startBtn.removeEventListener("click", start);
      startBtn.classList.add("hidden");
      resetBtn.classList.remove("hidden");
    };
    const removeRender = player => {
      const squares = document.getElementById(player).childNodes;
      squares.forEach(square => {
        square.className = "square";
      });
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
    };
    startBtn.addEventListener("click", start);
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
  isValid(ship, row, col, direction) {
    if (direction === "horizontal") {
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
    } else if (direction === "vertical") {
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
  placeShip(ship, row, col, direction) {
    if (!this.isValid(ship, row, col, direction)) return ship.deploy;
    if (direction === "horizontal") {
      //checks for overlaps or out of bounds
      for (let index = 0; index < ship.length; index++) {
        this.grid[row][col + index] = ship;
      }
      ship.deploy = true;
      return ship.deploy;
    } else if (direction === "vertical") {
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
  receiveAttack(receiver, x, y) {
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
  placeShip(ship, row, col, orientation) {
    if (!ship.deploy && this.board.placeShip(ship, row, col, orientation)) {
      (0,_Plot__WEBPACK_IMPORTED_MODULE_1__.plotShip)(this.name, row, col, ship.length, orientation);
      return this.board.grid;
    } else {
      return "Ship has already been deployed.  Tried again";
    }
  }
  //Player chooses to attack on the opponent's board.
  attack(row, col) {
    const plot = document.getElementById(`${this.name}-${row}-${col}`);
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
  } else {
    for (let index = 0; index < length; index++) {
      const createId = document.getElementById(`${name.toLowerCase()}-${row + index}`);
      createId.classList.add("ship");
    }
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
  if (gameboard.isValid(ship, coordinates[0], coordinates[1], direction)) {
    gameboard.placeShip(ship, coordinates[0], coordinates[1], direction);
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

class Ship {
  constructor(name, length) {
    this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.deploy = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ1M7QUFFckN3RCxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRWpELHlEQUFHLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9BcHAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxheWVyLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbG90LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcFwiXHJcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXHJcblxyXG5jb25zdCBnYW1lYm9hcmRQbGF5ZXIxID0gbmV3IEdhbWVib2FyZCgpO1xyXG5jb25zdCBnYW1lYm9hcmRQbGF5ZXIyID0gbmV3IEdhbWVib2FyZCgpO1xyXG5cclxuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoXCJHYXJ5XCIsIGdhbWVib2FyZFBsYXllcjEsIGdhbWVib2FyZFBsYXllcjIsIHRydWUpO1xyXG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIGdhbWVib2FyZFBsYXllcjIsIGdhbWVib2FyZFBsYXllcjEsIGZhbHNlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQmFubmVyKCkpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQnV0dG9ucygpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZERPTSgpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZE1lc3NhZ2VMb2coKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlcigpO1xyXG5cclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkQmFubmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJiYW5uZXJcIjtcclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSBcImRpc3BsYXktd3JhcHBlclwiO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpXHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkQnV0dG9ucygpe1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiXHJcblxyXG4gICAgICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwic3RhcnQtYmF0dGxlc2hpcFwiIHR5cGU9XCJidXR0b25cIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZXNldC1iYXR0bGVzaGlwXCIgY2xhc3M9XCJoaWRkZW5cIiB0eXBlPVwiYnV0dG9uXCI+UmVzZXQ8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICAgICAgcmV0dXJuIGJ1dHRvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWROZXdHYW1lQnV0dG9uKCl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkRE9NKCl7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGVudC5jbGFzc05hbWUgPSBcImJvYXJkcy1jb250YWluZXJcIlxyXG5cclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZFNoaXBzKHBsYXllcjEpKTtcclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkKHBsYXllcjEsIFwicGxheWVyMVwiKSk7XHJcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRCb2FyZChwbGF5ZXIyLCBcInBsYXllcjJcIikpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGVudDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbG9hZE1lc3NhZ2VMb2coKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcIm1lc3NhZ2UtbG9nLWNvbnRhaW5lclwiO1xyXG5cclxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGJveC5jbGFzc05hbWUgPSBcIm1lc3NhZ2UtbG9nLWJveFwiO1xyXG4gICAgICAgIGJveC5pbm5lckhUTUwgPSBgPHAgaWQ9XCJtZXNzYWdlLWxvZ1wiPlRlc3Q8L3A+YDtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RhdGljIHNlbmRNZXNzYWdlKG1lc3NhZ2Upe1xyXG4gICAgLy8gICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVzc2FnZS1sb2ctYm94XCIpO1xyXG4gICAgLy8gICAgIGJveC5pbm5lckhUTUwgKz0gYDxwPiR7bWVzc2FnZX08L3A+YDtcclxuICAgIC8vIH1cclxuICAgIHN0YXRpYyBzZW5kTWVzc2FnZShtZXNzYWdlKXtcclxuICAgICAgICBjb25zdCBib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXktd3JhcHBlciBoMlwiKTtcclxuICAgICAgICBib3gudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkQm9hcmQocGxheWVyLCBpZCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubG9hZEdyaWQocGxheWVyLCBpZCkpO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikge1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJjb2xcIikpO1xyXG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIikpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllci5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZUxvYWRTaGlwQnRuID0gKGUsIHBsYXllcikgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRTaGlwcyhwbGF5ZXIpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG5cclxuICAgICAgICBjb25zdCBob3Jpem9udGFsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICBjb25zdCB2ZXJ0aWNhbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgaG9yaXpvbnRhbEJ0bi50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xyXG4gICAgICAgIHZlcnRpY2FsQnRuLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xyXG5cclxuICAgICAgICBob3Jpem9udGFsQnRuLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICB2ZXJ0aWNhbEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XHJcblxyXG4gICAgXHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlU2hpcHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICBjcmVhdGVTaGlwcy5jbGFzc05hbWUgPSBcInNoaXAtYnRuLWNvbnRhaW5lclwiO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5jbGFzc05hbWUgPSBcInNoaXAtYnRuXCI7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBzaGlwLmlkKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIHNoaXAubmFtZSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi50ZXh0Q29udGVudCA9IHNoaXAubmFtZTtcclxuXHJcbiAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuaGFuZGxlTG9hZFNoaXBCdG4oZSwgcGxheWVyKSk7XHJcbiAgICBcclxuICAgICBcclxuICAgICAgICAgICAgY3JlYXRlU2hpcHMuYXBwZW5kQ2hpbGQoY3JlYXRlQnRuKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVNoaXBzKTtcclxuICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhvcml6b250YWxCdG4pO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh2ZXJ0aWNhbEJ0bik7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIFxyXG5cclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkR3JpZChwbGF5ZXIsIGlkKXtcclxuICAgICAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRHYW1lYm9hcmQucm93czsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiY29sXCIsIGopO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHBsb3RTaGlwcyhnYW1lYm9hcmQpe1xyXG4gICAgICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgICAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgICBpZihnYW1lYm9hcmQuZ3JpZFtyb3ddW2NvbF0gIT09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIHVwZGF0ZUdhbWVCb2FyZCgpe1xyXG4gICAgICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgaWYocGxheWVyMS5ib2FyZC5ncmlkW2NvbF1bcm93XSA9PSBcImhpdFwiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwXCIpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYocGxheWVyMS5ib2FyZC5ncmlkW2NvbF1bcm93XSA9PSBcIm1pc3NcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZXIoKXtcclxuICAgICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYmF0dGxlc2hpcFwiKTtcclxuICAgICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXQtYmF0dGxlc2hpcFwiKTtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZHMtY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGNvbnN0IGdldFNoaXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWJ1dHRvbnNcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IG1vdmUgPSAoZSkgPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICAgICAgY29uc3QgY29sID0gc3F1YXJlLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gc3F1YXJlLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UocGxheWVyMS5hdHRhY2socm93LCBjb2wpKTsgLy9wbGF5ZXJzIGNob29zZXMgdG8gZ29cclxuICAgICAgICAgICAgaWYocGxheWVyMS5vcHBvbmVudEJvYXJkLmdyaWRbY29sXVtyb3ddID09PSBcImhpdFwiKXtcclxuICAgICAgICAgICAgICAgICAvL2NoZWNrcyBpZiBnYW1lIG92ZXJcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcjEub3Bwb25lbnRCb2FyZC5pc0dhbWVPdmVyKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKHBsYXllcjIucmFuZG9tQXR0YWNrKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lQm9hcmQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHBsYXllcjEub3Bwb25lbnRCb2FyZC5ncmlkW2NvbF1bcm93XSA9PT0gXCJtaXNzXCIpXHJcbiAgICAgICAgICAgIHsgICAgXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKHBsYXllcjIucmFuZG9tQXR0YWNrKCkpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVCb2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBtb3ZlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGFkZEhhbmRsZXIgPSAoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyXCIpLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PntcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBtb3ZlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW1vdmVIYW5kbGVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBnZXRDaGlsZHJlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMlwiKS5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICBnZXRDaGlsZHJlbi5mb3JFYWNoKChzcXVhcmUpID0+e1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIG1vdmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gKCkgPT57XHJcblxyXG5cclxuICAgICAgICAgICAgYWRkSGFuZGxlcigpO1xyXG4gICAgICAgICAgICBnZXRTaGlwQnRucy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFwiUGxheWVyIDEgbW92ZXMgZmlyc3RcIik7XHJcbiAgICAgICAgICAgIHBsYXllcjEucGxhY2VSYW5kb21Ub0JvYXJkKCk7XHJcbiAgICAgICAgICAgIHBsYXllcjIucGxhY2VSYW5kb21Ub0JvYXJkKCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxvdFNoaXBzKHBsYXllcjEuYm9hcmQpOyAgIFxyXG4gICAgICAgICAgICBzdGFydEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHJlc2V0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZW1vdmVSZW5kZXIgPSAocGxheWVyKSA9PntcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBsYXllcikuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIn0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc2V0ID0gKCkgPT57XHJcbiAgICAgICAgICAgIHBsYXllcjEuYm9hcmQuY2xlYXJHcmlkKCk7XHJcbiAgICAgICAgICAgIHBsYXllcjIuYm9hcmQuY2xlYXJHcmlkKCk7XHJcbiAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgcmVtb3ZlUmVuZGVyKFwicGxheWVyMVwiKTtcclxuICAgICAgICAgICAgcmVtb3ZlUmVuZGVyKFwicGxheWVyMlwiKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoXCJQcmVzcyBTdGFydC5cIilcclxuXHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHN0YXJ0KTtcclxuICAgICAgICAgICAgc3RhcnRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgZ2V0U2hpcEJ0bnMuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAgICAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcmVzZXQpO1xyXG5cclxuICAgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xyXG5jbGFzcyBHYW1lYm9hcmR7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvd3MgPSAxMDsgXHJcbiAgICB0aGlzLmNvbHMgPSAxMDtcclxuICAgIHRoaXMuZ3JpZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoKSA9PiBBcnJheSh0aGlzLmNvbHMpLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5zaGlwcyA9IFtcclxuICAgICAgbmV3IFNoaXAoXCJBc3NhdWx0IFNoaXBcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQWlyY3JhZnQgQ2FycmllclwiLCA1KSxcclxuICAgICAgbmV3IFNoaXAoXCJEZXN0cm95ZXJcIiwgNyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQ3J1aXNlclwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJDb21iYXQgU2hpcFwiLCAxKSAgIFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8vQ2xlYXJzIHRoZSBib2FyZC5cclxuICBjbGVhckdyaWQoKXtcclxuICAgIHRoaXMuZ3JpZC5mb3JFYWNoKHJvdyA9PiByb3cuZmlsbChudWxsKSk7XHJcbiAgfVxyXG4gIC8vQ2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgc2hpcHMgb24gdGhlIGJvYXJkIGFuZCBpZiBpdCBmaXRzLlxyXG4gIGlzVmFsaWQoc2hpcCwgcm93LCBjb2wsIGRpcmVjdGlvbil7XHJcbiAgICBpZihkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKXtcclxuICAgICAgaWYoY29sICsgc2hpcC5sZW5ndGggPiB0aGlzLmNvbHMpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgLy8gXCJFcnJvcjogU2hpcCBkb2Vzbid0IGZpdCBob3Jpem9udGFsbHkuXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICB3aGlsZSAoaW5kZXggPCBzaGlwLmxlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZih0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gIT09IG51bGwpe1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkVycm9yOiBBIHNoaXAgaXMgYWxyZWFkeSBwcmVzZW50IGF0IHRoaXMgbG9jYXRpb24gaG9yaXpvbnRhbGx5LlwiOyAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGluZGV4ICsrOyAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTsgLy9QYXNzIGFsbCB0ZXN0XHJcbiAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGlmKHJvdyArIHNoaXAubGVuZ3RoID4gdGhpcy5yb3dzKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIlNoaXAgZG9lc24ndCBmaXQgdmVydGljYWxseVwiOyAvL1NoaXAgZG9lc24ndCBmaXQuXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB3aGlsZShpbmRleCA8IHNoaXAubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgaWYodGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJBIHNoaXAgaXMgYWxyZWFkeSBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZSAvL1wiSW52YWxpZCBkaXJlY3Rpb25cIjsgLy9pbnZhbGlkIG5hbWVcclxuICAgIH1cclxuICB9XHJcbi8vUGxhY2VzIHRoZSBzaGlwIG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIGRpcmVjdGlvbil7XHJcbiAgICBpZighdGhpcy5pc1ZhbGlkKHNoaXAsIHJvdywgY29sLCBkaXJlY3Rpb24pKVxyXG4gICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgXHJcbiAgICBpZihkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAgICB7XHJcbiAgICAgICAgLy9jaGVja3MgZm9yIG92ZXJsYXBzIG9yIG91dCBvZiBib3VuZHNcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKylcclxuICAgICAgICAge1xyXG4gICAgICAgICAgIHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNoaXAuZGVwbG95ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIil7IC8vZGlyZWN0aW9uIGlzIGhvcml6b250YWxcclxuICAgICAgICAvL2lmIGV2ZXJ5dGhpbmcgcGFzc2VzLCBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgdGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5kZXBsb3kgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IFxyXG4gICAgZ2V0U2hpcChzaGlwTmFtZSl7XHJcbiAgICAgIGxldCByZXN1bHQ7XHJcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGlmKHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBcInNoaXAgbm90IGZvdW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAvL1BsYWNlcyBhbiBhdHRhY2sgb24gdGhlIGJvYXJkLlxyXG4gIHJlY2VpdmVBdHRhY2socmVjZWl2ZXIsIHgsIHkpe1xyXG4gICAgXHJcbiAgICBpZih4ID49IHRoaXMuY29scyB8fCB5ID49dGhpcy5yb3dzIClcclxuICAgICAgcmV0dXJuIFwib3V0IG9mIGJvdW5kc1wiO1xyXG4gICAgaWYodGhpcy5ncmlkW3hdW3ldID09PSBudWxsKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcIm1pc3NcIjsgLy9tYXJrIGRvd24gbWlzc1xyXG4gICAgICByZXR1cm4gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmdyaWRbeF1beV07XHJcbiAgICAgIHNoaXAuaGl0KCk7XHJcbiAgICAgIHNoaXAuaXNTdW5rKCk7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwiaGl0XCI7XHJcbiAgICAgIHJldHVybiBcImhpdFwiO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRNYXhIaXRzKCl7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+e1xyXG4gICAgICBzdW0rPSBzaGlwLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcbiAgZ2V0SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5oaXRzO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tzRGlmZmVyZW5jZSgpe1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TWF4SGl0cygpIC0gdGhpcy5nZXRIaXRzKCk7XHJcbiAgfVxyXG5cclxuICAvL0NoZWNrcyBpZiB0aGUgZ2FtZSBpcyBvdmVyLlxyXG4gIGlzR2FtZU92ZXIoKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuY2hlY2tzRGlmZmVyZW5jZSgpKTtcclxuICAgIHJldHVybiB0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSA9PT0gMCA/IHRydWUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8vUGxvdHMgaGl0c1xyXG5cclxuICAvL1Bsb3RzIG1pc3NcclxufVxyXG5cclxuIFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQge3JhbmRvbUF0dGFjaywgcmFuZG9tUGxhY2VtZW50fSBmcm9tICcuL1JhbmRvbSc7XHJcbmltcG9ydCB7cGxvdFNoaXB9IGZyb20gJy4vUGxvdCc7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGdhbWVib2FyZCwgb3Bwb25lbnRCb2FyZCwgaXNIdW1hbilcclxuICB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZCA9IGdhbWVib2FyZDtcclxuICAgIHRoaXMub3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50Qm9hcmQ7XHJcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xyXG5cclxuICB9XHJcbiAgLy9QbGFjZXMgc2hpcHMgcmFuZG9tbHkgb24gdGhlIGJvYXJkLlxyXG4gIHBsYWNlUmFuZG9tVG9Cb2FyZCgpe1xyXG4gICAgdGhpcy5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIHJhbmRvbVBsYWNlbWVudCh0aGlzLmJvYXJkLCBzaGlwKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMub3Bwb25lbnRCb2FyZC5zaGlwcztcclxuICB9XHJcbi8vQSBmdW5jdGlvbiB0aGF0IHBsYWNlcyBzaGlwcyBvbiB0aGUgYm9hcmQgbWFudWFsbHkuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbilcclxuICB7XHJcbiAgICBpZiAoIXNoaXAuZGVwbG95ICYmIHRoaXMuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbikpe1xyXG4gICAgICBwbG90U2hpcCh0aGlzLm5hbWUsIHJvdywgY29sLCBzaGlwLmxlbmd0aCwgb3JpZW50YXRpb24pO1xyXG4gICAgICByZXR1cm4gdGhpcy5ib2FyZC5ncmlkO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIlNoaXAgaGFzIGFscmVhZHkgYmVlbiBkZXBsb3llZC4gIFRyaWVkIGFnYWluXCJcclxuICAgIH1cclxuXHJcbiAgfVxyXG4vL1BsYXllciBjaG9vc2VzIHRvIGF0dGFjayBvbiB0aGUgb3Bwb25lbnQncyBib2FyZC5cclxuICBhdHRhY2socm93LCBjb2wpe1xyXG4gICAgY29uc3QgcGxvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3RoaXMubmFtZX0tJHtyb3d9LSR7Y29sfWApO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGAke3Jvd30tJHtjb2x9YCk7XHJcbiAgICBjb25zb2xlLmxvZyhwbG90KTtcclxuXHJcblxyXG4gICAgaWYodGhpcy5vcHBvbmVudEJvYXJkLnJlY2VpdmVBdHRhY2sodGhpcy5vcHBvbmVudEJvYXJkLCByb3csIGNvbCkgPT09IFwiaGl0XCIpXHJcbiAgICB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0gaGFkIGEgZ29vZCBoaXRgOyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9IG1pc3NlZGA7XHJcbiAgICB9O1xyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgcmFuZG9tbHkgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgcmFuZG9tQXR0YWNrKCl7XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IHJhbmRvbUF0dGFjayh0aGlzLm9wcG9uZW50Qm9hcmQpO1xyXG4gICAgY29uc3Qgcm93ID0gY29vcmRpbmF0ZXNbMF07XHJcbiAgICBjb25zdCBjb2wgPSBjb29yZGluYXRlc1sxXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2socm93LCBjb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJjb25zdCBwbG90U2hpcCA9IChuYW1lLCByb3csIGNvbCwgbGVuZ3RoLCBvcmllbnRhdGlvbikgPT57XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICBjb2w6IGNvbCxcclxuICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cclxuICAgIH0pXHJcblxyXG4gICAgaWYob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3Jvd30tJHtjb2wgKyBpbmRleH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgZSA9Pntjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQpfSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93ICtpbmRleH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBwbG90SGl0ID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCBwbG90TWlzcyA9ICgpID0+e1xyXG5cclxufVxyXG5cclxuY29uc3QgcmVtb3ZlUGxvdCA9ICgpID0+e1xyXG5cclxufVxyXG5cclxuY29uc3QgY2xlYXJCb2FyZCA9ICgpID0+e1xyXG5cclxufVxyXG5cclxuZXhwb3J0IHtwbG90U2hpcCwgcGxvdEhpdCwgcGxvdE1pc3MsIHJlbW92ZVBsb3R9IiwiLy9HZW5lcmF0ZXMgcmFuZG9tIG51bWJlciBkZXBlbmRpbmcgb24gdGhlIG51bWJlciBvZiBjb2x1bW5zIGFuZCByb3dzLlxyXG5jb25zdCBnZW5lcmF0ZU51bWJlciA9IChtYXgpID0+e1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbn1cclxuXHJcbi8vR2VuZXJhdGUgcmFuZG9tIGNvb3JkaW5hdGVzIHdpdGhpbiB0aGUgZ2FtZSBib2FyZFxyXG5jb25zdCBnZW5lcmF0ZUNvb3JkaW5hdGVzID0gKGdhbWVib2FyZCkgPT57XHJcbiAgICBsZXQgY29sID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLmNvbHMpO1xyXG4gICAgbGV0IHJvdyA9IGdlbmVyYXRlTnVtYmVyKGdhbWVib2FyZC5yb3dzKTtcclxuICBcclxuICAgIHJldHVybiBbY29sLCByb3ddO1xyXG59XHJcblxyXG4vL0dlbmVyYXRlIGEgcmFuZG9tIHBsYWNlbWVudCBvbiB0aGUgYm9hcmQuXHJcbmNvbnN0IHJhbmRvbVBsYWNlbWVudCA9IChnYW1lYm9hcmQsIHNoaXApID0+e1xyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7XHJcbiAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJ2ZXJ0aWNhbFwiOiBcImhvcml6b250YWxcIjtcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCBkaXJlY3Rpb24pKVxyXG4gICAge1xyXG4gICAgICBnYW1lYm9hcmQucGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSwgZGlyZWN0aW9uKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJhbmRvbVBsYWNlbWVudChnYW1lYm9hcmQsIHNoaXApO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4vL1BlcmZvcm0gYSByYW5kb20gYXR0YWNrIG9uIHRoZSBnYW1lYm9hcmRcclxuY29uc3QgcmFuZG9tQXR0YWNrID0gKGdhbWVib2FyZCkgPT57XHJcblxyXG4gICAgbGV0IHJhbmRvbUNvb3JkaW5hdGVzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhnYW1lYm9hcmQpOyAvL3JldHVybnMgYXJyYXlcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmdyaWRbcmFuZG9tQ29vcmRpbmF0ZXNbMF1dW3JhbmRvbUNvb3JkaW5hdGVzWzFdXSAhPT0gXCJtaXNzXCIgJiYgZ2FtZWJvYXJkLmdyaWRbcmFuZG9tQ29vcmRpbmF0ZXNbMF1dW3JhbmRvbUNvb3JkaW5hdGVzWzFdXSAhPT0gXCJoaXRcIiApXHJcbiAgICB7XHJcbiAgICAgIHJldHVybiByYW5kb21Db29yZGluYXRlcztcclxuICAgIH0gZWxzZXtcclxuICAgICAgcmV0dXJuIHJhbmRvbUF0dGFjayhnYW1lYm9hcmQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge3JhbmRvbUF0dGFjaywgcmFuZG9tUGxhY2VtZW50fSIsImltcG9ydCB7djQgYXMgdXVpZHY0fSBmcm9tICd1dWlkJ1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpXHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5kZXBsb3kgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGhpdCgpe1xyXG4gICAgdGhpcy5oaXRzKys7XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKXtcclxuXHJcbiAgICBpZigodGhpcy5sZW5ndGggLSB0aGlzLmhpdHMpID09PSAwKVxyXG4gICAge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGhhcyBiZWVuIHN1bmtgKTtcclxuICAgICAgcmV0dXJuIHRydWUgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGhhcyBiZWVuIGhpdCAke3RoaXMuaGl0c30gdGltZS5gKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiBieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vc3R5bGUvc3R5bGUuc2Nzc1wiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvdW5kcy9BcHAuanNcIjtcclxuXHJcbmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIEFwcC5sb2FkUGFnZSgpKTsiXSwibmFtZXMiOlsiU2hpcCIsIkdhbWVib2FyZCIsIlBsYXllciIsImdhbWVib2FyZFBsYXllcjEiLCJnYW1lYm9hcmRQbGF5ZXIyIiwicGxheWVyMSIsInBsYXllcjIiLCJBcHAiLCJsb2FkUGFnZSIsImJvZHkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXBwZW5kQ2hpbGQiLCJsb2FkQmFubmVyIiwibG9hZEJ1dHRvbnMiLCJsb2FkRE9NIiwibG9hZE1lc3NhZ2VMb2ciLCJoYW5kbGVyIiwiY29udGFpbmVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsIndyYXBwZXIiLCJ0aXRsZSIsInRleHRDb250ZW50IiwiYnV0dG9ucyIsImlubmVySFRNTCIsImxvYWROZXdHYW1lQnV0dG9uIiwiY29udGVudCIsImxvYWRTaGlwcyIsImxvYWRCb2FyZCIsImJveCIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5ZXIiLCJpZCIsImxvYWRHcmlkIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJlIiwic2hpcCIsImNvbCIsInBhcnNlSW50IiwiY3VycmVudFRhcmdldCIsImdldEF0dHJpYnV0ZSIsInJvdyIsImNvbnNvbGUiLCJsb2ciLCJwbGFjZVNoaXAiLCJoYW5kbGVMb2FkU2hpcEJ0biIsImJvYXJkIiwiZ2V0U2hpcCIsInZhbHVlIiwiZ2V0U3F1YXJlcyIsImNoaWxkTm9kZXMiLCJmb3JFYWNoIiwiaXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJob3Jpem9udGFsQnRuIiwidmVydGljYWxCdG4iLCJjbGFzc0xpc3QiLCJhZGQiLCJzaGlwcyIsImNyZWF0ZVNoaXBzIiwiY3JlYXRlQnRuIiwic2V0QXR0cmlidXRlIiwibmFtZSIsImdldEdhbWVib2FyZCIsImkiLCJyb3dzIiwiaiIsImNvbHMiLCJzcXVhcmUiLCJ0b0xvd2VyQ2FzZSIsInBsb3RTaGlwcyIsImdhbWVib2FyZCIsImdyaWQiLCJ1cGRhdGVHYW1lQm9hcmQiLCJyZW1vdmUiLCJzdGFydEJ0biIsInJlc2V0QnRuIiwiZ2V0U2hpcEJ0bnMiLCJtb3ZlIiwiYXR0YWNrIiwib3Bwb25lbnRCb2FyZCIsImlzR2FtZU92ZXIiLCJhbGVydCIsInJlbW92ZUhhbmRsZXIiLCJzZXRUaW1lb3V0IiwicmFuZG9tQXR0YWNrIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEhhbmRsZXIiLCJzcXVhcmVzIiwiZ2V0Q2hpbGRyZW4iLCJzdGFydCIsInBsYWNlUmFuZG9tVG9Cb2FyZCIsInJlbW92ZVJlbmRlciIsInJlc2V0IiwiY2xlYXJHcmlkIiwiY29uc3RydWN0b3IiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJmaWxsIiwiaXNWYWxpZCIsImRpcmVjdGlvbiIsImluZGV4IiwiZGVwbG95Iiwic2hpcE5hbWUiLCJyZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwicmVjZWl2ZXIiLCJ4IiwieSIsImhpdCIsImlzU3VuayIsImdldE1heEhpdHMiLCJzdW0iLCJnZXRIaXRzIiwiaGl0cyIsImNoZWNrc0RpZmZlcmVuY2UiLCJyYW5kb21QbGFjZW1lbnQiLCJwbG90U2hpcCIsImlzSHVtYW4iLCJvcmllbnRhdGlvbiIsInBsb3QiLCJjb29yZGluYXRlcyIsImNyZWF0ZUlkIiwicGxvdEhpdCIsInBsb3RNaXNzIiwicmVtb3ZlUGxvdCIsImNsZWFyQm9hcmQiLCJnZW5lcmF0ZU51bWJlciIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImdlbmVyYXRlQ29vcmRpbmF0ZXMiLCJyYW5kb21Db29yZGluYXRlcyIsInY0IiwidXVpZHY0Il0sInNvdXJjZVJvb3QiOiIifQ==