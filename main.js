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
            <button id="reset-battleship" type="button">Reset</button>
        `;
    return buttons;
  }
  static loadNewGameButton() {}
  static loadDOM() {
    const content = document.createElement("div");
    content.className = "boards-container";
    content.appendChild(this.loadPlayer(player1, "player1"));
    content.appendChild(this.loadPlayer(player2, "player2"));
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
  static sendMessage(message) {
    const p = document.getElementById("message-log");
    p.textContent = message;
  }
  static loadPlayer(player, id) {
    const container = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = player.name;
    container.appendChild(this.loadGrid(player, id));
    container.appendChild(title);
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
        square.setAttribute("id", `${player.name}-${i}-${j}`);
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
      } else if (player1.board.grid[col][row] == "miss") {
        item.classList.add("miss");
      }
    });
  }
  static handler() {
    const move = e => {
      const square = e.currentTarget;
      const col = square.getAttribute("col");
      const row = square.getAttribute("row");
      this.sendMessage(player1.attack(col, row));
      if (player1.opponentBoard.grid[col][row] === "hit") {
        square.classList.add("hit");
        console.log(player2.ships);
        //checks if game over
        if (!player1.opponentBoard.isGameOver()) {
          this.sendMessage(player2.randomAttack());
          this.updateGameBoard();
        } else {
          removeHandler();
        }
      } else if (player1.opponentBoard.grid[col][row] === "miss") {
        square.classList.add("miss");
        this.sendMessage(player2.randomAttack());
        this.updateGameBoard();
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
    const startBtn = document.getElementById("start-battleship");
    const resetBtn = document.getElementById("reset-battleship");
    const start = () => {
      addHandler();
      this.sendMessage("Player 1 moves first");
      player1.placeRandomToBoard();
      player2.placeRandomToBoard();
      this.plotShips(player1.board);
      startBtn.removeEventListener("click", start);
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
class Gameboard {
  constructor() {
    this.rows = 10;
    this.cols = 10;
    this.grid = this.createGrid();
    this.boats = this.checkBoats();
  }
  createGrid() {
    return Array.from({
      length: this.rows
    }, () => Array(this.cols).fill(null));
  }
  clearGrid() {
    this.grid.forEach(row => row.fill(null));
  }
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
  placeShip(ship, row, col, direction) {
    if (!this.isValid(ship, row, col, direction)) return;
    if (direction === "horizontal") {
      //checks for overlaps or out of bounds
      for (let index = 0; index < ship.length; index++) {
        this.grid[row][col + index] = ship;
      }
    } else if (direction === "vertical") {
      //direction is horizontal
      //if everything passes, place the ship vertically
      for (let index = 0; index < ship.length; index++) {
        this.grid[row + index][col] = ship;
      }
    }
  }
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
  checkBoats() {
    const boats = new Set();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j] !== null && this.grid[i][j] !== "hit" && this.grid[i][j] !== "miss") {
          boats.add(this.grid[i][j]);
        }
      }
    }
    return boats;
  }
  isGameOver() {
    if (this.checkBoats().size == 0) {
      return true;
    } else {
      return false;
    }
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
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/compounds/Ship.js");
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Random */ "./src/compounds/Random.js");


const generateNumber = num => {
  return Math.floor(Math.random() * num);
};
class Player {
  constructor(name, gameboard, opponentBoard, isHuman) {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
    this.ships = [new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Assault Ship", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Aircraft Carrier", 5), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Destroyer", 7), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Cruiser", 3), new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Combat Ship", 1)];
  }
  generateCoordinates() {
    let col = generateNumber(this.opponentBoard.cols);
    let row = generateNumber(this.opponentBoard.rows);
    return [col, row];
  }
  placeRandomToBoard() {
    const array = [];
    const placeShip = ship => {
      const coordinates = this.generateCoordinates();
      const direction = Math.random() < 0.5 ? "vertical" : "horizontal";
      if (this.board.isValid(ship, coordinates[0], coordinates[1], direction)) {
        this.placeShip(ship, coordinates[0], coordinates[1], direction);
        array.push({
          "ship": ship.name,
          "row": coordinates[0],
          "col": coordinates[1],
          "direction": direction
        });
      } else {
        placeShip(ship);
      }
    };
    this.ships.forEach(placeShip);
    return array;
  }
  placeShip(ship, row, col, orientation) {
    return this.board.placeShip(ship, row, col, orientation);
  }
  attack(row, col) {
    return this.opponentBoard.receiveAttack(row, col);
  }
  randomAttack() {
    // const findValidRandomCoordinates = () =>{
    //   const randomCoordinates = this.generateCoordinates();

    //   if (this.opponentBoard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && this.opponentBoard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit" )
    //   {
    //     return randomCoordinates;
    //   } else{
    //     return findValidRandomCoordinates();
    //   }
    // }

    const coordinates = (0,_Random__WEBPACK_IMPORTED_MODULE_1__.randomAttack)(this.opponentBoard);
    const row = coordinates[0];
    const col = coordinates[1];
    this.attack(row, col);
    return `Coordindates: ${[row, col]} ${this.opponentBoard.grid[row][col]}`;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/compounds/Random.js":
/*!*********************************!*\
  !*** ./src/compounds/Random.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const generateNumber = max => {
  return Math.floor(Math.random() * max);
};

//Generate random coordinates within the game board
const generateCoordinates = gameboard => {
  let col = generateNumber(gameboard.cols);
  let row = generateNumber(gameboard.rows);
  return [col, row];
};

//Perform a random attack on the gameboard
const randomAttack = gameboard => {
  let randomCoordinates = generateCoordinates(gameboard); //returns array

  if (gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit") {
    return randomCoordinates;
  } else {
    return randomAttack();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomAttack
});

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
  }
  hit() {
    this.hits++;
  }
  isSunk() {
    if (this.hits >= this.length) {
      return true;
    } else {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQnFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGdCQUFnQixTQUFTO0FBQ3pCO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPLHdEQUFRO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlFQUFlLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENTO0FBQ047QUFDc0I7O0FBRWpEO0FBQ0EsTUFBTSxrREFBTTtBQUNaLFdBQVcsa0RBQU07QUFDakI7O0FBRUE7QUFDQSxpREFBaUQsK0NBQUcsS0FBSzs7QUFFekQ7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsOERBQWU7QUFDeEI7O0FBRUEsaUVBQWUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0FDNUJjOztBQUUvQjtBQUNBLHFDQUFxQyxpREFBSztBQUMxQzs7QUFFQSxpRUFBZSxRQUFROzs7Ozs7VUNOdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONEI7QUFDUztBQUVyQ3lFLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFbEUseURBQUcsQ0FBQ0MsUUFBUSxDQUFDLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0FwcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1JhbmRvbS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvU2hpcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9scy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwXCJcclxuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCdcclxuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcidcclxuXHJcbmNvbnN0IGdhbWVib2FyZFBsYXllcjEgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbmNvbnN0IGdhbWVib2FyZFBsYXllcjIgPSBuZXcgR2FtZWJvYXJkKCk7XHJcblxyXG5jb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcihcIkdhcnlcIiwgZ2FtZWJvYXJkUGxheWVyMSwgZ2FtZWJvYXJkUGxheWVyMiwgdHJ1ZSk7XHJcbmNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgZ2FtZWJvYXJkUGxheWVyMiwgZ2FtZWJvYXJkUGxheWVyMSwgZmFsc2UpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwe1xyXG4gICAgc3RhdGljIGxvYWRQYWdlKCl7XHJcbiAgICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLmxvYWRCYW5uZXIoKSk7XHJcbiAgICAgICAgYm9keS5hcHBlbmRDaGlsZCh0aGlzLmxvYWRCdXR0b25zKCkpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkRE9NKCkpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkTWVzc2FnZUxvZygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVyKCk7XHJcblxyXG5cclxuICAgICBcclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkQmFubmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJiYW5uZXJcIjtcclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSBcImRpc3BsYXktd3JhcHBlclwiO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpXHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkQnV0dG9ucygpe1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiXHJcblxyXG4gICAgICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwic3RhcnQtYmF0dGxlc2hpcFwiIHR5cGU9XCJidXR0b25cIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyZXNldC1iYXR0bGVzaGlwXCIgdHlwZT1cImJ1dHRvblwiPlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgICAgIHJldHVybiBidXR0b25zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkTmV3R2FtZUJ1dHRvbigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbG9hZERPTSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gXCJib2FyZHMtY29udGFpbmVyXCJcclxuXHJcbiAgICAgICAgY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRQbGF5ZXIocGxheWVyMSwgXCJwbGF5ZXIxXCIpKTtcclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZFBsYXllcihwbGF5ZXIyLCBcInBsYXllcjJcIikpO1xyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkTWVzc2FnZUxvZygpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctY29udGFpbmVyXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgYm94LmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctYm94XCI7XHJcbiAgICAgICAgYm94LmlubmVySFRNTCA9IGA8cCBpZD1cIm1lc3NhZ2UtbG9nXCI+VGVzdDwvcD5gO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2VuZE1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZS1sb2dcIik7XHJcbiAgICAgICAgcC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRQbGF5ZXIocGxheWVyLCBpZCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IHBsYXllci5uYW1lO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkR3JpZChwbGF5ZXIsIGlkKSk7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkR3JpZChwbGF5ZXIsIGlkKXtcclxuICAgICAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWV9LSR7aX0tJHtqfWApXHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGxvdFNoaXBzKGdhbWVib2FyZCl7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgIGlmKGdhbWVib2FyZC5ncmlkW3Jvd11bY29sXSAhPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgdXBkYXRlR2FtZUJvYXJkKCl7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIxLmJvYXJkLmdyaWRbY29sXVtyb3ddID09IFwiaGl0XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNoaXBcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIxLmJvYXJkLmdyaWRbY29sXVtyb3ddID09IFwibWlzc1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZXIoKXtcclxuXHJcbiAgICAgICAgY29uc3QgbW92ZSA9IChlKSA9PntcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShwbGF5ZXIxLmF0dGFjayhjb2wsIHJvdykpO1xyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyMS5vcHBvbmVudEJvYXJkLmdyaWRbY29sXVtyb3ddID09PSBcImhpdFwiKXtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBsYXllcjIuc2hpcHMpO1xyXG4gICAgICAgICAgICAgICAgIC8vY2hlY2tzIGlmIGdhbWUgb3ZlclxyXG4gICAgICAgICAgICAgICAgaWYoIXBsYXllcjEub3Bwb25lbnRCb2FyZC5pc0dhbWVPdmVyKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShwbGF5ZXIyLnJhbmRvbUF0dGFjaygpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVCb2FyZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHBsYXllcjEub3Bwb25lbnRCb2FyZC5ncmlkW2NvbF1bcm93XSA9PT0gXCJtaXNzXCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UocGxheWVyMi5yYW5kb21BdHRhY2soKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWVCb2FyZCgpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcnJvclwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgbW92ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBhZGRIYW5kbGVyID0gKCk9PntcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMlwiKS5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT57XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgbW92ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVtb3ZlSGFuZGxlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZ2V0Q2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJcIikuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgZ2V0Q2hpbGRyZW4uZm9yRWFjaCgoc3F1YXJlKSA9PntcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBtb3ZlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnQtYmF0dGxlc2hpcFwiKTtcclxuICAgICAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXQtYmF0dGxlc2hpcFwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAoKSA9PntcclxuICAgICAgICAgICAgYWRkSGFuZGxlcigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZShcIlBsYXllciAxIG1vdmVzIGZpcnN0XCIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIxLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsb3RTaGlwcyhwbGF5ZXIxLmJvYXJkKTsgICBcclxuICAgICAgICAgICAgc3RhcnRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVtb3ZlUmVuZGVyID0gKHBsYXllcikgPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIpLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7c3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCJ9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNldCA9ICgpID0+e1xyXG4gICAgICAgICAgICBwbGF5ZXIxLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgICAgICAgICByZW1vdmVIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIHJlbW92ZVJlbmRlcihcInBsYXllcjFcIik7XHJcbiAgICAgICAgICAgIHJlbW92ZVJlbmRlcihcInBsYXllcjJcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFwiUHJlc3MgU3RhcnQuXCIpXHJcblxyXG4gICAgICAgICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAgICAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcmVzZXQpO1xyXG5cclxuICAgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJjbGFzcyBHYW1lYm9hcmR7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvd3MgPSAxMDsgXHJcbiAgICB0aGlzLmNvbHMgPSAxMDtcclxuICAgIHRoaXMuZ3JpZCA9IHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gICAgdGhpcy5ib2F0cyA9IHRoaXMuY2hlY2tCb2F0cygpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JpZCgpe1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoKSA9PiBBcnJheSh0aGlzLmNvbHMpLmZpbGwobnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgY2xlYXJHcmlkKCl7XHJcbiAgICB0aGlzLmdyaWQuZm9yRWFjaChyb3cgPT4gcm93LmZpbGwobnVsbCkpO1xyXG4gIH1cclxuXHJcbiAgaXNWYWxpZChzaGlwLCByb3csIGNvbCwgZGlyZWN0aW9uKXtcclxuICAgIGlmKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpe1xyXG4gICAgICBpZihjb2wgKyBzaGlwLmxlbmd0aCA+IHRoaXMuY29scylcclxuICAgICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZSAvLyBcIkVycm9yOiBTaGlwIGRvZXNuJ3QgZml0IGhvcml6b250YWxseS5cIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG4gICAgICAgIHdoaWxlIChpbmRleCA8IHNoaXAubGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmKHRoaXMuZ3JpZFtyb3ddW2NvbCArIGluZGV4XSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiRXJyb3I6IEEgc2hpcCBpcyBhbHJlYWR5IHByZXNlbnQgYXQgdGhpcyBsb2NhdGlvbiBob3Jpem9udGFsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaW5kZXggKys7ICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlOyAvL1Bhc3MgYWxsIHRlc3RcclxuICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgaWYocm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLnJvd3MpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiU2hpcCBkb2Vzbid0IGZpdCB2ZXJ0aWNhbGx5XCI7IC8vU2hpcCBkb2Vzbid0IGZpdC5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKGluZGV4IDwgc2hpcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBpZih0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkEgc2hpcCBpcyBhbHJlYWR5IGF0IHRoaXMgbG9jYXRpb24gdmVydGljYWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlIC8vXCJJbnZhbGlkIGRpcmVjdGlvblwiOyAvL2ludmFsaWQgbmFtZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBkaXJlY3Rpb24pe1xyXG4gICAgaWYoIXRoaXMuaXNWYWxpZChzaGlwLCByb3csIGNvbCwgZGlyZWN0aW9uKSlcclxuICAgIHJldHVybjtcclxuICAgIFxyXG4gICAgaWYoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgICAge1xyXG4gICAgICAgIC8vY2hlY2tzIGZvciBvdmVybGFwcyBvciBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKXsgLy9kaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxyXG4gICAgICAgIC8vaWYgZXZlcnl0aGluZyBwYXNzZXMsIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBcclxuICAgIH0gXHJcblxyXG4gIHJlY2VpdmVBdHRhY2soeCwgeSl7XHJcbiAgICBcclxuICAgIGlmKHggPj0gdGhpcy5jb2xzIHx8IHkgPj10aGlzLnJvd3MgKVxyXG4gICAgICByZXR1cm4gXCJvdXQgb2YgYm91bmRzXCI7XHJcbiAgICBpZih0aGlzLmdyaWRbeF1beV0gPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwibWlzc1wiOyAvL21hcmsgZG93biBtaXNzXHJcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcclxuICAgIH0gZWxzZXtcclxuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZ3JpZFt4XVt5XTtcclxuICAgICAgc2hpcC5oaXQoKTtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJoaXRcIjtcclxuICAgICAgcmV0dXJuIFwiaGl0XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0JvYXRzKCl7XHJcbiAgICBjb25zdCBib2F0cyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpPHRoaXMucm93czsgaSsrKVxyXG4gICAge1xyXG4gICAgICBmb3IobGV0IGogPSAwOyBqPHRoaXMuY29sczsgaisrKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYodGhpcy5ncmlkW2ldW2pdICE9PSBudWxsICYmIHRoaXMuZ3JpZFtpXVtqXSAhPT0gXCJoaXRcIiAmJiB0aGlzLmdyaWRbaV1bal0gIT09IFwibWlzc1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJvYXRzLmFkZCh0aGlzLmdyaWRbaV1bal0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBib2F0cztcclxuICB9XHJcblxyXG4gIGlzR2FtZU92ZXIoKXtcclxuICAgIGlmKHRoaXMuY2hlY2tCb2F0cygpLnNpemUgPT0gMClcclxuICAgIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4gXHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XHJcbmltcG9ydCB7cmFuZG9tQXR0YWNrfSBmcm9tICcuL1JhbmRvbSc7XHJcblxyXG5jb25zdCBnZW5lcmF0ZU51bWJlciA9IChudW0pID0+e1xyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBudW0pO1xyXG59XHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSwgZ2FtZWJvYXJkLCBvcHBvbmVudEJvYXJkLCBpc0h1bWFuKVxyXG4gIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmJvYXJkID0gZ2FtZWJvYXJkO1xyXG4gICAgdGhpcy5vcHBvbmVudEJvYXJkID0gb3Bwb25lbnRCb2FyZDtcclxuICAgIHRoaXMuaXNIdW1hbiA9IGlzSHVtYW47XHJcbiAgICB0aGlzLnNoaXBzID0gW1xyXG4gICAgICBuZXcgU2hpcChcIkFzc2F1bHQgU2hpcFwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJBaXJjcmFmdCBDYXJyaWVyXCIsIDUpLFxyXG4gICAgICBuZXcgU2hpcChcIkRlc3Ryb3llclwiLCA3KSxcclxuICAgICAgbmV3IFNoaXAoXCJDcnVpc2VyXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIkNvbWJhdCBTaGlwXCIsIDEpICAgXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgZ2VuZXJhdGVDb29yZGluYXRlcygpXHJcbiAge1xyXG4gICAgbGV0IGNvbCA9IGdlbmVyYXRlTnVtYmVyKHRoaXMub3Bwb25lbnRCb2FyZC5jb2xzKTtcclxuICAgIGxldCByb3cgPSBnZW5lcmF0ZU51bWJlcih0aGlzLm9wcG9uZW50Qm9hcmQucm93cyk7XHJcblxyXG4gICAgcmV0dXJuIFtjb2wsIHJvd107XHJcbiAgfVxyXG5cclxuICBwbGFjZVJhbmRvbVRvQm9hcmQoKXtcclxuICAgIGNvbnN0IGFycmF5ID0gW107XHJcblxyXG4gICAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXApID0+e1xyXG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IHRoaXMuZ2VuZXJhdGVDb29yZGluYXRlcygpO1xyXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gXCJ2ZXJ0aWNhbFwiOiBcImhvcml6b250YWxcIjtcclxuXHJcbiAgICAgIGlmICh0aGlzLmJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCBkaXJlY3Rpb24pKVxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5wbGFjZVNoaXAoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdLCBkaXJlY3Rpb24pO1xyXG4gICAgICAgIGFycmF5LnB1c2goe1wic2hpcFwiOiBzaGlwLm5hbWUsIFwicm93XCI6IGNvb3JkaW5hdGVzWzBdLCBcImNvbFwiOiBjb29yZGluYXRlc1sxXSwgXCJkaXJlY3Rpb25cIjogZGlyZWN0aW9ufSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGxhY2VTaGlwKHNoaXApO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHBsYWNlU2hpcCk7XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIG9yaWVudGF0aW9uKVxyXG4gIHtcclxuICAgIHJldHVybiB0aGlzLmJvYXJkLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNrKHJvdywgY29sKXtcclxuICAgIHJldHVybiB0aGlzLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCk7XHJcbiAgfVxyXG4gIHJhbmRvbUF0dGFjaygpe1xyXG4gICAgLy8gY29uc3QgZmluZFZhbGlkUmFuZG9tQ29vcmRpbmF0ZXMgPSAoKSA9PntcclxuICAgIC8vICAgY29uc3QgcmFuZG9tQ29vcmRpbmF0ZXMgPSB0aGlzLmdlbmVyYXRlQ29vcmRpbmF0ZXMoKTtcclxuXHJcbiAgICAvLyAgIGlmICh0aGlzLm9wcG9uZW50Qm9hcmQuZ3JpZFtyYW5kb21Db29yZGluYXRlc1swXV1bcmFuZG9tQ29vcmRpbmF0ZXNbMV1dICE9PSBcIm1pc3NcIiAmJiB0aGlzLm9wcG9uZW50Qm9hcmQuZ3JpZFtyYW5kb21Db29yZGluYXRlc1swXV1bcmFuZG9tQ29vcmRpbmF0ZXNbMV1dICE9PSBcImhpdFwiIClcclxuICAgIC8vICAge1xyXG4gICAgLy8gICAgIHJldHVybiByYW5kb21Db29yZGluYXRlcztcclxuICAgIC8vICAgfSBlbHNle1xyXG4gICAgLy8gICAgIHJldHVybiBmaW5kVmFsaWRSYW5kb21Db29yZGluYXRlcygpO1xyXG4gICAgLy8gICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSByYW5kb21BdHRhY2sodGhpcy5vcHBvbmVudEJvYXJkKTtcclxuXHJcbiAgICBjb25zdCByb3cgPSBjb29yZGluYXRlc1swXTtcclxuICAgIGNvbnN0IGNvbCA9IGNvb3JkaW5hdGVzWzFdO1xyXG5cclxuICAgIHRoaXMuYXR0YWNrKHJvdywgY29sKTtcclxuXHJcbiAgICByZXR1cm4gYENvb3JkaW5kYXRlczogJHtbcm93LCBjb2xdfSAke3RoaXMub3Bwb25lbnRCb2FyZC5ncmlkW3Jvd11bY29sXX1gO1xyXG4gIH1cclxuIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImNvbnN0IGdlbmVyYXRlTnVtYmVyID0gKG1heCkgPT57XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgd2l0aGluIHRoZSBnYW1lIGJvYXJkXHJcbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBjb2wgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQuY29scyk7XHJcbiAgICBsZXQgcm93ID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLnJvd3MpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjb2wsIHJvd107XHJcbn1cclxuXHJcbi8vUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZFxyXG5jb25zdCByYW5kb21BdHRhY2sgPSAoZ2FtZWJvYXJkKSA9PntcclxuXHJcbiAgICBsZXQgcmFuZG9tQ29vcmRpbmF0ZXMgPSBnZW5lcmF0ZUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7IC8vcmV0dXJucyBhcnJheVxyXG5cclxuICAgIGlmIChnYW1lYm9hcmQuZ3JpZFtyYW5kb21Db29yZGluYXRlc1swXV1bcmFuZG9tQ29vcmRpbmF0ZXNbMV1dICE9PSBcIm1pc3NcIiAmJiBnYW1lYm9hcmQuZ3JpZFtyYW5kb21Db29yZGluYXRlc1swXV1bcmFuZG9tQ29vcmRpbmF0ZXNbMV1dICE9PSBcImhpdFwiIClcclxuICAgIHtcclxuICAgICAgcmV0dXJuIHJhbmRvbUNvb3JkaW5hdGVzO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICByZXR1cm4gcmFuZG9tQXR0YWNrKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtyYW5kb21BdHRhY2t9IiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcblxyXG5jbGFzcyBTaGlwe1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCl7XHJcbiAgICB0aGlzLmlkID0gdXVpZHY0KClcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgfVxyXG5cclxuICBoaXQoKXtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCl7XHJcbiAgICBpZih0aGlzLmhpdHMgPj0gdGhpcy5sZW5ndGgpe1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlL3N0eWxlLnNjc3NcIjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9jb21wb3VuZHMvQXBwLmpzXCI7XHJcblxyXG5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBBcHAubG9hZFBhZ2UoKSk7Il0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJnYW1lYm9hcmRQbGF5ZXIxIiwiZ2FtZWJvYXJkUGxheWVyMiIsInBsYXllcjEiLCJwbGF5ZXIyIiwiQXBwIiwibG9hZFBhZ2UiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFwcGVuZENoaWxkIiwibG9hZEJhbm5lciIsImxvYWRCdXR0b25zIiwibG9hZERPTSIsImxvYWRNZXNzYWdlTG9nIiwiaGFuZGxlciIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ3cmFwcGVyIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsImJ1dHRvbnMiLCJpbm5lckhUTUwiLCJsb2FkTmV3R2FtZUJ1dHRvbiIsImNvbnRlbnQiLCJsb2FkUGxheWVyIiwiYm94Iiwic2VuZE1lc3NhZ2UiLCJtZXNzYWdlIiwicCIsInBsYXllciIsImlkIiwibmFtZSIsImxvYWRHcmlkIiwiZ2V0R2FtZWJvYXJkIiwiYm9hcmQiLCJzZXRBdHRyaWJ1dGUiLCJpIiwicm93cyIsImoiLCJjb2xzIiwic3F1YXJlIiwicGxvdFNoaXBzIiwiZ2FtZWJvYXJkIiwiZ2V0U3F1YXJlcyIsImNoaWxkTm9kZXMiLCJmb3JFYWNoIiwiaXRlbSIsImNvbCIsImdldEF0dHJpYnV0ZSIsInJvdyIsImdyaWQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ1cGRhdGVHYW1lQm9hcmQiLCJyZW1vdmUiLCJtb3ZlIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJhdHRhY2siLCJvcHBvbmVudEJvYXJkIiwiY29uc29sZSIsImxvZyIsInNoaXBzIiwiaXNHYW1lT3ZlciIsInJhbmRvbUF0dGFjayIsInJlbW92ZUhhbmRsZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkSGFuZGxlciIsInNxdWFyZXMiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0Q2hpbGRyZW4iLCJzdGFydEJ0biIsInJlc2V0QnRuIiwic3RhcnQiLCJwbGFjZVJhbmRvbVRvQm9hcmQiLCJyZW1vdmVSZW5kZXIiLCJyZXNldCIsImNsZWFyR3JpZCIsImNvbnN0cnVjdG9yIiwiY3JlYXRlR3JpZCIsImJvYXRzIiwiY2hlY2tCb2F0cyIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJpc1ZhbGlkIiwic2hpcCIsImRpcmVjdGlvbiIsImluZGV4IiwicGxhY2VTaGlwIiwicmVjZWl2ZUF0dGFjayIsIngiLCJ5IiwiaGl0IiwiU2V0Iiwic2l6ZSIsImdlbmVyYXRlTnVtYmVyIiwibnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaXNIdW1hbiIsImdlbmVyYXRlQ29vcmRpbmF0ZXMiLCJhcnJheSIsImNvb3JkaW5hdGVzIiwicHVzaCIsIm9yaWVudGF0aW9uIiwibWF4IiwicmFuZG9tQ29vcmRpbmF0ZXMiLCJ2NCIsInV1aWR2NCIsImhpdHMiLCJpc1N1bmsiXSwic291cmNlUm9vdCI6IiJ9