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



const gameboardPlayer1 = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"](10, 10);
const gameboardPlayer2 = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__["default"](10, 10);
const player1 = new _Player__WEBPACK_IMPORTED_MODULE_2__["default"]("Gary", gameboardPlayer1, gameboardPlayer2, true);
const player2 = new _Player__WEBPACK_IMPORTED_MODULE_2__["default"]("computer", gameboardPlayer2, gameboardPlayer1, false);
class App {
  static loadPage() {
    const body = document.getElementById("root");
    body.appendChild(this.loadContent());
  }
  static loadContent() {
    const content = document.createElement("div");
    content.innerHTML = "<div>Hello</div>";
    return content;
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
  constructor(rows, cols) {
    this.rows = rows; //y-axis
    this.cols = cols; //x-axis
    this.grid = this.createGrid();
  }
  createGrid() {
    let grid = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(null); //blank space
      }
      grid.push(row);
    }
    return grid;
  }
  placeShip(ship, row, col, direction) {
    //Cruiser, 3, horizontal
    //[[null, null, null], [battleship, battleship, battleship], [null, null, null]]

    if (direction === "horizontal") {
      //checks for overlaps or out of bounds
      for (let index = 0; index < ship.length; index++) {
        if (col + index >= this.col || this.grid[row][col + index] !== null) return false; //Cannot place ship
      }
      for (let index = 0; index < ship.length; index++) {
        this.grid[row][col + index] = ship;
      }
    } else if (direction === "vertical") {
      //checks for overlaps or out of bounds
      for (let index = 0; index < ship.length; index++) {
        if (row + index >= this.rows || this.grid[row + index][col] !== null) return false;
      }
      //if everything passes, place the ship vertically
      for (let index = 0; index < ship.length; index++) {
        this.grid[row + index][col] = ship;
      }
    } else {
      return "Invalid input";
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
      if (ship.isSunk()) {
        return `${ship.name} has been sunk`;
      } else {
        return "Hit! Opponent's turn";
      }
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
    if (boats.size != 0) {
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
class Player {
  constructor(name, gameboard, opponentBoard, isHuman) {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
    this.ships = [];
  }
  generateCoordinates() {
    const random = num => {
      return Math.floor(Math.random() * num);
    };
    let col = random(this.opponentBoard.cols);
    let row = random(this.opponentBoard.rows);
    if (this.opponentBoard.grid[col][row] !== "miss" && this.opponentBoard.grid[col][row] !== "hit") {
      return [col, row];
    } else {
      return this.generateCoordinates();
    }
  }
  placeShip(ship, row, col, orientation) {
    this.ships.push(ship);
    return this.board.placeShip(ship, row, col, orientation);
  }
  attack(row, col) {
    this.opponentBoard.receiveAttack(row, col);
    return this.opponentBoard.grid[row][col];
  }
  randomAttack() {
    const coordinates = this.generateCoordinates();
    const row = coordinates[0];
    const col = coordinates[1];
    this.attack(row, col);
    return `Coordindates: ${[row, col]} ${this.opponentBoard.grid[row][col]}`;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QjtBQUNTO0FBRXJDNkQsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUV0RCx5REFBRyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvQXBwLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9HYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1BsYXllci5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvU2hpcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9scy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hpcCBmcm9tIFwiLi9TaGlwXCJcclxuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCdcclxuaW1wb3J0IFBsYXllciBmcm9tICcuL1BsYXllcidcclxuXHJcbmNvbnN0IGdhbWVib2FyZFBsYXllcjEgPSBuZXcgR2FtZWJvYXJkKDEwLDEwKTtcclxuY29uc3QgZ2FtZWJvYXJkUGxheWVyMiA9IG5ldyBHYW1lYm9hcmQoMTAsMTApO1xyXG5cclxuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoXCJHYXJ5XCIsIGdhbWVib2FyZFBsYXllcjEsIGdhbWVib2FyZFBsYXllcjIsIHRydWUpO1xyXG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIGdhbWVib2FyZFBsYXllcjIsIGdhbWVib2FyZFBsYXllcjEsIGZhbHNlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQ29udGVudCgpKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIGxvYWRDb250ZW50KCl7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gXCI8ZGl2PkhlbGxvPC9kaXY+XCI7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImNsYXNzIEdhbWVib2FyZHtcclxuICBjb25zdHJ1Y3Rvcihyb3dzLCBjb2xzKSB7XHJcbiAgICB0aGlzLnJvd3MgPSByb3dzOyAvL3ktYXhpc1xyXG4gICAgdGhpcy5jb2xzID0gY29sczsgLy94LWF4aXNcclxuICAgIHRoaXMuZ3JpZCA9IHRoaXMuY3JlYXRlR3JpZCgpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlR3JpZCgpe1xyXG4gICAgbGV0IGdyaWQgPSBbXTtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpPHRoaXMucm93czsgaSsrKVxyXG4gICAge1xyXG4gICAgICBsZXQgcm93ID0gW107XHJcbiAgICAgIGZvcihsZXQgaiA9IDA7IGo8dGhpcy5jb2xzOyBqKyspXHJcbiAgICAgIHtcclxuICAgICAgICByb3cucHVzaChudWxsKTsgLy9ibGFuayBzcGFjZVxyXG4gICAgICB9XHJcbiAgICAgIGdyaWQucHVzaChyb3cpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGdyaWQ7XHJcbiAgfVxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgZGlyZWN0aW9uKXtcclxuICAgIC8vQ3J1aXNlciwgMywgaG9yaXpvbnRhbFxyXG4gICAgLy9bW251bGwsIG51bGwsIG51bGxdLCBbYmF0dGxlc2hpcCwgYmF0dGxlc2hpcCwgYmF0dGxlc2hpcF0sIFtudWxsLCBudWxsLCBudWxsXV1cclxuXHJcblxyXG4gICAgaWYoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgIHtcclxuICAgICAgLy9jaGVja3MgZm9yIG92ZXJsYXBzIG9yIG91dCBvZiBib3VuZHNcclxuICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgIHtcclxuICAgICAgICBpZihjb2wgKyBpbmRleCA+PSB0aGlzLmNvbCB8fCB0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gIT09IG51bGwpXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vQ2Fubm90IHBsYWNlIHNoaXBcclxuICAgICAgfVxyXG4gICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKylcclxuICAgICAgIHtcclxuICAgICAgICAgdGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdID0gc2hpcDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xyXG5cclxuICAgICAgLy9jaGVja3MgZm9yIG92ZXJsYXBzIG9yIG91dCBvZiBib3VuZHNcclxuICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgIHtcclxuICAgICAgICBpZihyb3cgKyBpbmRleCA+PSB0aGlzLnJvd3MgfHwgdGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdICE9PSBudWxsKVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIC8vaWYgZXZlcnl0aGluZyBwYXNzZXMsIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcclxuICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgIHRoaXMuZ3JpZFtyb3cgKyBpbmRleF1bY29sXSA9IHNoaXA7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IGVsc2V7XHJcbiAgICAgICByZXR1cm4gXCJJbnZhbGlkIGlucHV0XCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKHgsIHkpe1xyXG5cclxuICAgIGlmKHggPj0gdGhpcy5jb2xzIHx8IHkgPj10aGlzLnJvd3MgKVxyXG4gICAgICByZXR1cm4gXCJvdXQgb2YgYm91bmRzXCI7XHJcbiAgICBpZih0aGlzLmdyaWRbeF1beV0gPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwibWlzc1wiOyAvL21hcmsgZG93biBtaXNzXHJcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcclxuICAgIH0gZWxzZXtcclxuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZ3JpZFt4XVt5XTtcclxuICAgICAgc2hpcC5oaXQoKTtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJoaXRcIjtcclxuXHJcbiAgICAgIGlmKHNoaXAuaXNTdW5rKCkpXHJcbiAgICAgIHtcclxuICAgICAgICByZXR1cm4gYCR7c2hpcC5uYW1lfSBoYXMgYmVlbiBzdW5rYDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJIaXQhIE9wcG9uZW50J3MgdHVyblwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuICBjaGVja0JvYXRzKCl7XHJcbiAgICBjb25zdCBib2F0cyA9IG5ldyBTZXQoKTtcclxuXHJcbiAgICBmb3IobGV0IGkgPSAwOyBpPHRoaXMucm93czsgaSsrKVxyXG4gICAge1xyXG4gICAgICBmb3IobGV0IGogPSAwOyBqPHRoaXMuY29sczsgaisrKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYodGhpcy5ncmlkW2ldW2pdICE9PSBudWxsICYmIHRoaXMuZ3JpZFtpXVtqXSAhPT0gXCJoaXRcIiAmJiB0aGlzLmdyaWRbaV1bal0gIT09IFwibWlzc1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGJvYXRzLmFkZCh0aGlzLmdyaWRbaV1bal0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKGJvYXRzLnNpemUgIT0gMClcclxuICAgIHtcclxuICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJjbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGdhbWVib2FyZCwgb3Bwb25lbnRCb2FyZCwgaXNIdW1hbilcclxuICB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZCA9IGdhbWVib2FyZDtcclxuICAgIHRoaXMub3Bwb25lbnRCb2FyZCA9IG9wcG9uZW50Qm9hcmQ7XHJcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xyXG4gICAgdGhpcy5zaGlwcyA9IFtdO1xyXG4gIH1cclxuICBnZW5lcmF0ZUNvb3JkaW5hdGVzKClcclxuICB7XHJcbiAgICBjb25zdCByYW5kb20gPSAobnVtKSA9PntcclxuICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbCA9IHJhbmRvbSh0aGlzLm9wcG9uZW50Qm9hcmQuY29scyk7XHJcbiAgICBsZXQgcm93ID0gcmFuZG9tKHRoaXMub3Bwb25lbnRCb2FyZC5yb3dzKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHBvbmVudEJvYXJkLmdyaWRbY29sXVtyb3ddICE9PSBcIm1pc3NcIiAmJiB0aGlzLm9wcG9uZW50Qm9hcmQuZ3JpZFtjb2xdW3Jvd10gIT09IFwiaGl0XCIgKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gW2NvbCwgcm93XTtcclxuICAgIH0gZWxzZXtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVDb29yZGluYXRlcygpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgb3JpZW50YXRpb24pXHJcbiAge1xyXG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgcmV0dXJuIHRoaXMuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sLCBvcmllbnRhdGlvbik7XHJcbiAgfVxyXG5cclxuICBhdHRhY2socm93LCBjb2wpe1xyXG4gICAgdGhpcy5vcHBvbmVudEJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLm9wcG9uZW50Qm9hcmQuZ3JpZFtyb3ddW2NvbF07XHJcbiAgfVxyXG5cclxuICByYW5kb21BdHRhY2soKXtcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5nZW5lcmF0ZUNvb3JkaW5hdGVzKCk7XHJcbiAgICBjb25zdCByb3cgPSBjb29yZGluYXRlc1swXTtcclxuICAgIGNvbnN0IGNvbCA9IGNvb3JkaW5hdGVzWzFdO1xyXG5cclxuICAgIHRoaXMuYXR0YWNrKHJvdywgY29sKTtcclxuXHJcbiAgICByZXR1cm4gYENvb3JkaW5kYXRlczogJHtbcm93LCBjb2xdfSAke3RoaXMub3Bwb25lbnRCb2FyZC5ncmlkW3Jvd11bY29sXX1gO1xyXG4gIH1cclxuIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImltcG9ydCB7djQgYXMgdXVpZHY0fSBmcm9tICd1dWlkJ1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpXHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gIH1cclxuXHJcbiAgaGl0KCl7XHJcbiAgICB0aGlzLmhpdHMrKztcclxuICB9XHJcblxyXG4gIGlzU3Vuaygpe1xyXG4gICAgaWYodGhpcy5oaXRzID49IHRoaXMubGVuZ3RoKXtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjb25zdCByYW5kb21VVUlEID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLnJhbmRvbVVVSUQgJiYgY3J5cHRvLnJhbmRvbVVVSUQuYmluZChjcnlwdG8pO1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kb21VVUlEXG59OyIsImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbmxldCBnZXRSYW5kb21WYWx1ZXM7XG5jb25zdCBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0byk7XG5cbiAgICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKCkgbm90IHN1cHBvcnRlZC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZCNnZXRyYW5kb212YWx1ZXMtbm90LXN1cHBvcnRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xufSIsImltcG9ydCB2YWxpZGF0ZSBmcm9tICcuL3ZhbGlkYXRlLmpzJztcbi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xuXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgcmV0dXJuIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCF2YWxpZGF0ZSh1dWlkKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignU3RyaW5naWZpZWQgVVVJRCBpcyBpbnZhbGlkJyk7XG4gIH1cblxuICByZXR1cm4gdXVpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5naWZ5OyIsImltcG9ydCBuYXRpdmUgZnJvbSAnLi9uYXRpdmUuanMnO1xuaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgeyB1bnNhZmVTdHJpbmdpZnkgfSBmcm9tICcuL3N0cmluZ2lmeS5qcyc7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIGlmIChuYXRpdmUucmFuZG9tVVVJRCAmJiAhYnVmICYmICFvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5hdGl2ZS5yYW5kb21VVUlEKCk7XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3Qgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7IC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiB1bnNhZmVTdHJpbmdpZnkocm5kcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHY0OyIsImltcG9ydCBSRUdFWCBmcm9tICcuL3JlZ2V4LmpzJztcblxuZnVuY3Rpb24gdmFsaWRhdGUodXVpZCkge1xuICByZXR1cm4gdHlwZW9mIHV1aWQgPT09ICdzdHJpbmcnICYmIFJFR0VYLnRlc3QodXVpZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHZhbGlkYXRlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZS9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vY29tcG91bmRzL0FwcC5qc1wiO1xyXG5cclxuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgQXBwLmxvYWRQYWdlKCkpOyJdLCJuYW1lcyI6WyJTaGlwIiwiR2FtZWJvYXJkIiwiUGxheWVyIiwiZ2FtZWJvYXJkUGxheWVyMSIsImdhbWVib2FyZFBsYXllcjIiLCJwbGF5ZXIxIiwicGxheWVyMiIsIkFwcCIsImxvYWRQYWdlIiwiYm9keSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJhcHBlbmRDaGlsZCIsImxvYWRDb250ZW50IiwiY29udGVudCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJjb25zdHJ1Y3RvciIsInJvd3MiLCJjb2xzIiwiZ3JpZCIsImNyZWF0ZUdyaWQiLCJpIiwicm93IiwiaiIsInB1c2giLCJwbGFjZVNoaXAiLCJzaGlwIiwiY29sIiwiZGlyZWN0aW9uIiwiaW5kZXgiLCJsZW5ndGgiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJoaXQiLCJpc1N1bmsiLCJuYW1lIiwiY2hlY2tCb2F0cyIsImJvYXRzIiwiU2V0IiwiYWRkIiwic2l6ZSIsImdhbWVib2FyZCIsIm9wcG9uZW50Qm9hcmQiLCJpc0h1bWFuIiwiYm9hcmQiLCJzaGlwcyIsImdlbmVyYXRlQ29vcmRpbmF0ZXMiLCJyYW5kb20iLCJudW0iLCJNYXRoIiwiZmxvb3IiLCJvcmllbnRhdGlvbiIsImF0dGFjayIsInJhbmRvbUF0dGFjayIsImNvb3JkaW5hdGVzIiwidjQiLCJ1dWlkdjQiLCJpZCIsImhpdHMiLCJhZGRFdmVudExpc3RlbmVyIl0sInNvdXJjZVJvb3QiOiIifQ==