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
    // const content = document.querySelector(".boards-container");
    const getShipBtns = document.querySelector(".ship-buttons");
    // const playerMenu = document.querySelector(".player-menu");

    const move = e => {
      const square = e.currentTarget;
      const col = square.getAttribute("col");
      const row = square.getAttribute("row");
      if (player1.attack(player2.name, row, col) === "hit") {
        //  checks if game over
        if (player1.opponentBoard.isGameOver()) {
          alert("Game over");
          removeHandler();
        } else {
          setTimeout(() => {
            this.sendMessage(player2.randomAttack(player1.name));
          }, 3000);
        }
      } else {
        setTimeout(() => {
          this.sendMessage(player2.randomAttack(player1.name));
        }, 3000);
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
      player.placeRandomToBoard();
      this.plotShips(player.board);
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
    return this.attack(enemyBoardName.toLowerCase(), row, col);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjRCO0FBQ1M7QUFFckMyRCxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRXBELHlEQUFHLENBQUNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9BcHAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvUGxheWVyLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbG90LmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9SYW5kb20uanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvc3R5bGUvc3R5bGUuc2Nzcz80NTZkIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdjQuanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3ZhbGlkYXRlLmpzIiwid2VicGFjazovL2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9scy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSBcIi4vU2hpcFwiXHJcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9HYW1lYm9hcmQnXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSAnLi9QbGF5ZXInXHJcblxyXG5jb25zdCBnYW1lYm9hcmRQbGF5ZXIxID0gbmV3IEdhbWVib2FyZCgpO1xyXG5jb25zdCBnYW1lYm9hcmRQbGF5ZXIyID0gbmV3IEdhbWVib2FyZCgpO1xyXG5cclxuY29uc3QgcGxheWVyMSA9IG5ldyBQbGF5ZXIoXCJHYXJ5XCIsIGdhbWVib2FyZFBsYXllcjEsIGdhbWVib2FyZFBsYXllcjIsIHRydWUpO1xyXG5jb25zdCBwbGF5ZXIyID0gbmV3IFBsYXllcihcImNvbXB1dGVyXCIsIGdhbWVib2FyZFBsYXllcjIsIGdhbWVib2FyZFBsYXllcjEsIGZhbHNlKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcHtcclxuICAgIHN0YXRpYyBsb2FkUGFnZSgpe1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcblxyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQmFubmVyKCkpO1xyXG4gICAgICAgIGJvZHkuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQnV0dG9ucygpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZERPTSgpKTtcclxuICAgICAgICBib2R5LmFwcGVuZENoaWxkKHRoaXMubG9hZE1lc3NhZ2VMb2coKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlcigpO1xyXG5cclxuICAgIH1cclxuICAgIHN0YXRpYyBsb2FkQmFubmVyKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJiYW5uZXJcIjtcclxuXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc05hbWUgPSBcImRpc3BsYXktd3JhcHBlclwiO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpXHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcclxuICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkQnV0dG9ucygpe1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGJ1dHRvbnMuY2xhc3NOYW1lID0gXCJidXR0b25zLWNvbnRhaW5lclwiXHJcblxyXG4gICAgICAgIGJ1dHRvbnMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwic3RhcnQtYmF0dGxlc2hpcFwiIHR5cGU9XCJidXR0b25cIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJyYW5kb20tcGxhY2VtZW50XCIgdHlwZT1cImJ1dHRvblwiPlJhbmRvbSBQbGFjZW1lbnQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD0gXCJjbGVhci1ib2FyZFwiIHR5cGU9XCJidXR0b25cIj5DbGVhcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicmVzZXQtYmF0dGxlc2hpcFwiIGNsYXNzPVwiaGlkZGVuXCIgdHlwZT1cImJ1dHRvblwiPlJlc2V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgICAgIHJldHVybiBidXR0b25zO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkTmV3R2FtZUJ1dHRvbigpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbG9hZERPTSgpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gXCJib2FyZHMtY29udGFpbmVyXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGhhbmRsZUJ0bnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGhhbmRsZUJ0bnNDb250YWluZXIuY2xhc3NOYW1lID0gXCJwbGF5ZXItbWVudVwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGhhbmRsZUJ0bnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkU2hpcHMocGxheWVyMSkpO1xyXG4gICAgICAgIGhhbmRsZUJ0bnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkT3JpZW50YXRpb25CdG5zKCkpO1xyXG5cclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKGhhbmRsZUJ0bnNDb250YWluZXIpO1xyXG4gICAgICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQm9hcmQocGxheWVyMSwgXCJwbGF5ZXIxXCIpKTtcclxuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkKHBsYXllcjIsIFwicGxheWVyMlwiKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBsb2FkTWVzc2FnZUxvZygpe1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctY29udGFpbmVyXCI7XHJcblxyXG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgYm94LmNsYXNzTmFtZSA9IFwibWVzc2FnZS1sb2ctYm94XCI7XHJcbiAgICAgICAgYm94LmlubmVySFRNTCA9IGA8cCBpZD1cIm1lc3NhZ2UtbG9nXCI+VGVzdDwvcD5gO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgc2VuZE1lc3NhZ2UobWVzc2FnZSl7XHJcbiAgICAvLyAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZXNzYWdlLWxvZy1ib3hcIik7XHJcbiAgICAvLyAgICAgYm94LmlubmVySFRNTCArPSBgPHA+JHttZXNzYWdlfTwvcD5gO1xyXG4gICAgLy8gfVxyXG4gICAgc3RhdGljIHNlbmRNZXNzYWdlKG1lc3NhZ2Upe1xyXG4gICAgICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheS13cmFwcGVyIGgyXCIpO1xyXG4gICAgICAgIGJveC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRCb2FyZChwbGF5ZXIsIGlkKXtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5sb2FkR3JpZChwbGF5ZXIsIGlkKSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSB7XHJcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgXCJob3Jpem9udGFsXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlT3JpZW50YXRpb24gPSAoc2hpcCkgPT57XHJcbiAgICAgICAgY29uc3Qgb3JpZW50YXRpb25CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmllbnRhdGlvbi1idG5zXCIpO1xyXG4gICAgICAgIG9yaWVudGF0aW9uQnRucy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgICAgICAgICAgaWYoaXRlbS52YWx1ZSAhPT0gc2hpcC5vcmllbnRhdGlvbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIChlKSA9PiB0aGlzLmhhbmRsZU9yaWVudGF0aW9uQnRuKGUsIHNoaXApKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGhhbmRsZUxvYWRTaGlwQnRuID0gKGUsIHBsYXllcikgPT57XHJcbiAgICAgICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZU9yaWVudGF0aW9uKHNoaXApO1xyXG4gXHJcbiAgICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLmhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBoYW5kbGVPcmllbnRhdGlvbkJ0biA9IChlLCBzaGlwKSA9PntcclxuICAgICAgICAvLyBzaGlwLnNldE9yaWVudGF0aW9uID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHNoaXAub3JpZW50YXRpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAgICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0IG9yaWVudGF0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JpZW50YXRpb24tYnRuc1wiKTtcclxuICAgICAgICBvcmllbnRhdGlvbkJ0bnMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgICAgIGlmKGl0ZW0udmFsdWUgIT09IHNoaXAub3JpZW50YXRpb24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoZSkgPT4gdGhpcy5oYW5kbGVPcmllbnRhdGlvbihlLCBzaGlwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGUuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgbG9hZE9yaWVudGF0aW9uQnRucyA9ICgpID0+e1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwib3JpZW50YXRpb24tY29udGFpbmVyXCI7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm9yaWVudGF0aW9uLWJ0bnNcIiBpZD1cImhvcml6b250YWwtYnRuXCIgdmFsdWU9XCJob3Jpem9udGFsXCI+aG9yaXpvbnRhbDwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJvcmllbnRhdGlvbi1idG5zXCIgaWQ9XCJ2ZXJ0aWNhbC1idG5cIiB2YWx1ZT1cInZlcnRpY2FsXCI+dmVydGljYWw8L2J1dHRvbj5cclxuICAgICAgICBgO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGxvYWRTaGlwcyhwbGF5ZXIpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG4gICBcclxuICAgICAgICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgIGNyZWF0ZVNoaXBzLmNsYXNzTmFtZSA9IFwic2hpcC1idG4tY29udGFpbmVyXCI7XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG5cIjtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuaGFuZGxlTG9hZFNoaXBCdG4oZSwgcGxheWVyKSk7XHJcblxyXG4gICAgICAgICAgICBjcmVhdGVTaGlwcy5hcHBlbmRDaGlsZChjcmVhdGVCdG4pO1xyXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlU2hpcHMpO1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgXHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRHcmlkKHBsYXllciwgaWQpe1xyXG4gICAgICAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJnYW1lYm9hcmRcIjtcclxuICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgaWQpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKX0tJHtpfS0ke2p9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgcGxvdFNoaXBzKGdhbWVib2FyZCl7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgY29uc3Qgcm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgIGlmKGdhbWVib2FyZC5ncmlkW3Jvd11bY29sXSAhPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgdXBkYXRlR2FtZUJvYXJkKCl7XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMVwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIxLmJvYXJkLmdyaWRbY29sXVtyb3ddID09IFwiaGl0XCIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcInNoaXBcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIxLmJvYXJkLmdyaWRbY29sXVtyb3ddID09IFwibWlzc1wiKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaGFuZGxlcigpe1xyXG4gICAgICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgICAgICBjb25zdCBjbGVhckJvYXJkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKVxyXG4gICAgICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgICAgIC8vIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkcy1jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3QgZ2V0U2hpcEJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtYnV0dG9uc1wiKTtcclxuICAgICAgICAvLyBjb25zdCBwbGF5ZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXItbWVudVwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW92ZSA9IChlKSA9PntcclxuICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgICAgICBjb25zdCBjb2wgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgICAgICAgICBjb25zdCByb3cgPSBzcXVhcmUuZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyLm5hbWUsIHJvdywgY29sKSA9PT0gXCJoaXRcIil7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIGNoZWNrcyBpZiBnYW1lIG92ZXJcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllcjEub3Bwb25lbnRCb2FyZC5pc0dhbWVPdmVyKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKHBsYXllcjIucmFuZG9tQXR0YWNrKHBsYXllcjEubmFtZSkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSBlbHNlIFxyXG4gICAgICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjayhwbGF5ZXIxLm5hbWUpKSk7XHJcbiAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIG1vdmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYWRkSGFuZGxlciA9ICgpPT57XHJcbiAgICAgICAgICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJcIikuY2hpbGROb2RlcztcclxuICAgICAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+e1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIG1vdmUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdldENoaWxkcmVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXIyXCIpLmNoaWxkTm9kZXM7XHJcbiAgICAgICAgICAgIGdldENoaWxkcmVuLmZvckVhY2goKHNxdWFyZSkgPT57XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUucmVtb3ZlRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgbW92ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAoKSA9PntcclxuICAgICAgICBcclxuICAgICAgICAgICAgYWRkSGFuZGxlcigpO1xyXG4gICAgICAgICAgICBnZXRTaGlwQnRucy5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFwiUGxheWVyIDEgbW92ZXMgZmlyc3RcIik7XHJcbiAgICAgICAgICAgIHBsYXllcjIucGxhY2VSYW5kb21Ub0JvYXJkKCk7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHN0YXJ0KTtcclxuICAgICAgICAgICAgc3RhcnRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIGNsZWFyQm9hcmRCdG4uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgcmVzZXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbW92ZVJlbmRlciA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyKS5jaGlsZE5vZGVzO1xyXG4gICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge3NxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwifSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByYW5kb21QbGFjZW1lbnQgPSAocGxheWVyKSA9PntcclxuICAgICAgICAgICAgcGxheWVyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsb3RTaGlwcyhwbGF5ZXIuYm9hcmQpOyAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2xlYXJCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsZWFyXCIpXHJcbiAgICAgICAgICAgIHBsYXllci5ib2FyZC5jbGVhckdyaWQoKTtcclxuICAgICAgICAgICAgcGxheWVyLmJvYXJkLmNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkKCk7XHJcbiAgICAgICAgICAgIHJlbW92ZVJlbmRlcihcInBsYXllcjFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNldCA9ICgpID0+e1xyXG4gICAgICAgICAgICBwbGF5ZXIxLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgICAgICAgICBwbGF5ZXIyLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgICAgICAgICByZW1vdmVIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIHJlbW92ZVJlbmRlcihcInBsYXllcjFcIik7XHJcbiAgICAgICAgICAgIHJlbW92ZVJlbmRlcihcInBsYXllcjJcIik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFwiUHJlc3MgU3RhcnQuXCIpXHJcblxyXG4gICAgICAgICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAgICAgICAgIHN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHJlc2V0QnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIGdldFNoaXBCdG5zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICBjbGVhckJvYXJkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgc3RhcnQpO1xyXG4gICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoKSA9PiByYW5kb21QbGFjZW1lbnQocGxheWVyMSkpO1xyXG4gICAgICAgIGNsZWFyQm9hcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gY2xlYXJCb2FyZChwbGF5ZXIxKSlcclxuICAgICAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCByZXNldCk7XHJcblxyXG4gICBcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vU2hpcCc7XHJcbmNsYXNzIEdhbWVib2FyZHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMucm93cyA9IDEwOyBcclxuICAgIHRoaXMuY29scyA9IDEwO1xyXG4gICAgdGhpcy5ncmlkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogdGhpcy5yb3dzIH0sICgpID0+IEFycmF5KHRoaXMuY29scykuZmlsbChudWxsKSk7XHJcbiAgICB0aGlzLnNoaXBzID0gW1xyXG4gICAgICBuZXcgU2hpcChcIkFzc2F1bHQgU2hpcFwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJBaXJjcmFmdCBDYXJyaWVyXCIsIDUpLFxyXG4gICAgICBuZXcgU2hpcChcIkRlc3Ryb3llclwiLCA3KSxcclxuICAgICAgbmV3IFNoaXAoXCJDcnVpc2VyXCIsIDMpLFxyXG4gICAgICBuZXcgU2hpcChcIkNvbWJhdCBTaGlwXCIsIDEpICAgXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgLy9DbGVhcnMgdGhlIGJvYXJkLlxyXG4gIGNsZWFyR3JpZCgpe1xyXG4gICAgdGhpcy5ncmlkLmZvckVhY2gocm93ID0+IHJvdy5maWxsKG51bGwpKTtcclxuICB9XHJcbiAgLy9DaGVja3MgaWYgdGhlcmUgYXJlIGFueSBzaGlwcyBvbiB0aGUgYm9hcmQgYW5kIGlmIGl0IGZpdHMuXHJcbiAgaXNWYWxpZChzaGlwLCByb3csIGNvbCl7XHJcbiAgICBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgIGlmKGNvbCArIHNoaXAubGVuZ3RoID4gdGhpcy5jb2xzKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIC8vIFwiRXJyb3I6IFNoaXAgZG9lc24ndCBmaXQgaG9yaXpvbnRhbGx5LlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgc2hpcC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYodGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJFcnJvcjogQSBzaGlwIGlzIGFscmVhZHkgcHJlc2VudCBhdCB0aGlzIGxvY2F0aW9uIGhvcml6b250YWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbmRleCArKzsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vUGFzcyBhbGwgdGVzdFxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9IGVsc2UgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgaWYocm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLnJvd3MpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiU2hpcCBkb2Vzbid0IGZpdCB2ZXJ0aWNhbGx5XCI7IC8vU2hpcCBkb2Vzbid0IGZpdC5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKGluZGV4IDwgc2hpcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBpZih0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2UgLy9cIkEgc2hpcCBpcyBhbHJlYWR5IGF0IHRoaXMgbG9jYXRpb24gdmVydGljYWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlIC8vXCJJbnZhbGlkIGRpcmVjdGlvblwiOyAvL2ludmFsaWQgbmFtZVxyXG4gICAgfVxyXG4gIH1cclxuLy9QbGFjZXMgdGhlIHNoaXAgb24gdGhlIGJvYXJkLlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbCl7XHJcbiAgICBpZighdGhpcy5pc1ZhbGlkKHNoaXAsIHJvdywgY29sKSlcclxuICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgIFxyXG4gICAgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpXHJcbiAgICAgIHtcclxuICAgICAgICAvL2NoZWNrcyBmb3Igb3ZlcmxhcHMgb3Igb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNoaXAubGVuZ3RoOyBpbmRleCsrKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgdGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5kZXBsb3kgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfSBlbHNlIGlmKHNoaXAub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIil7IC8vZGlyZWN0aW9uIGlzIGhvcml6b250YWxcclxuICAgICAgICAvL2lmIGV2ZXJ5dGhpbmcgcGFzc2VzLCBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgdGhpcy5ncmlkW3JvdyArIGluZGV4XVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2hpcC5kZXBsb3kgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gc2hpcC5kZXBsb3k7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9IFxyXG4gICAgZ2V0U2hpcChzaGlwTmFtZSl7XHJcbiAgICAgIGxldCByZXN1bHQ7XHJcbiAgICAgIHRoaXMuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGlmKHNoaXAubmFtZSA9PT0gc2hpcE5hbWUpIHtcclxuICAgICAgICAgIHJlc3VsdCA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBcInNoaXAgbm90IGZvdW5kXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAvL1BsYWNlcyBhbiBhdHRhY2sgb24gdGhlIGJvYXJkLlxyXG4gIHJlY2VpdmVBdHRhY2soeCwgeSl7XHJcbiAgICBcclxuICAgIGlmKHggPj0gdGhpcy5jb2xzIHx8IHkgPj10aGlzLnJvd3MgKVxyXG4gICAgICByZXR1cm4gXCJvdXQgb2YgYm91bmRzXCI7XHJcbiAgICBpZih0aGlzLmdyaWRbeF1beV0gPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IFwibWlzc1wiOyAvL21hcmsgZG93biBtaXNzXHJcbiAgICAgIHJldHVybiBcIm1pc3NcIjtcclxuICAgIH0gZWxzZXtcclxuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuZ3JpZFt4XVt5XTtcclxuICAgICAgc2hpcC5oaXQoKTtcclxuICAgICAgc2hpcC5pc1N1bmsoKTtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJoaXRcIjtcclxuICAgICAgcmV0dXJuIFwiaGl0XCI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldE1heEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAubGVuZ3RoO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3VtO1xyXG4gIH1cclxuICBnZXRIaXRzKCl7XHJcbiAgICBsZXQgc3VtID0gMDtcclxuICAgIHRoaXMuc2hpcHMuZm9yRWFjaChzaGlwID0+e1xyXG4gICAgICBzdW0rPSBzaGlwLmhpdHM7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG5cclxuICBjaGVja3NEaWZmZXJlbmNlKCl7XHJcbiAgICByZXR1cm4gdGhpcy5nZXRNYXhIaXRzKCkgLSB0aGlzLmdldEhpdHMoKTtcclxuICB9XHJcblxyXG4gIC8vQ2hlY2tzIGlmIHRoZSBnYW1lIGlzIG92ZXIuXHJcbiAgaXNHYW1lT3Zlcigpe1xyXG4gICAgY29uc29sZS5sb2codGhpcy5jaGVja3NEaWZmZXJlbmNlKCkpO1xyXG4gICAgcmV0dXJuIHRoaXMuY2hlY2tzRGlmZmVyZW5jZSgpID09PSAwID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuICBjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCgpe1xyXG4gICAgdGhpcy5zaGlwcy5tYXAoKHNoaXApID0+IHNoaXAuZGVwbG95ID0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgLy9QbG90cyBoaXRzXHJcblxyXG4gIC8vUGxvdHMgbWlzc1xyXG59XHJcblxyXG4gXHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCB7Z2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudH0gZnJvbSAnLi9SYW5kb20nO1xyXG5pbXBvcnQge3Bsb3RTaGlwfSBmcm9tICcuL1Bsb3QnO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBnYW1lYm9hcmQsIG9wcG9uZW50Qm9hcmQsIGlzSHVtYW4pXHJcbiAge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQgPSBnYW1lYm9hcmQ7XHJcbiAgICB0aGlzLm9wcG9uZW50Qm9hcmQgPSBvcHBvbmVudEJvYXJkO1xyXG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcclxuXHJcbiAgfVxyXG4gIC8vUGxhY2VzIHNoaXBzIHJhbmRvbWx5IG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVJhbmRvbVRvQm9hcmQoKXtcclxuICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQodGhpcy5ib2FyZCwgc2hpcCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLm9wcG9uZW50Qm9hcmQuc2hpcHM7XHJcbiAgfVxyXG4vL0EgZnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gdGhlIGJvYXJkIG1hbnVhbGx5LlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbClcclxuICB7XHJcbiAgICBpZiAoIXNoaXAuZGVwbG95ICYmIHRoaXMuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKSl7XHJcbiAgICAgIHBsb3RTaGlwKHRoaXMubmFtZSwgcm93LCBjb2wsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKTtcclxuICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ3JpZDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCJTaGlwIGhhcyBhbHJlYWR5IGJlZW4gZGVwbG95ZWQuICBUcmllZCBhZ2FpblwiXHJcbiAgICB9XHJcblxyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCl7XHJcbiAgICBjb25zdCBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZW5lbXlCb2FyZE5hbWV9LSR7cm93fS0ke2NvbH1gKTtcclxuXHJcbiAgICBpZih0aGlzLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCkgPT09IFwiaGl0XCIpXHJcbiAgICB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgcmV0dXJuIGBoaXRgOyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcIm1pc3NcIik7XHJcbiAgICAgIHJldHVybiBgbWlzc2A7XHJcbiAgICB9O1xyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgcmFuZG9tbHkgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgcmFuZG9tQXR0YWNrKGVuZW15Qm9hcmROYW1lKXtcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXModGhpcy5vcHBvbmVudEJvYXJkKTtcclxuICAgIGNvbnN0IHJvdyA9IGNvb3JkaW5hdGVzWzBdO1xyXG4gICAgY29uc3QgY29sID0gY29vcmRpbmF0ZXNbMV07XHJcbiAgICByZXR1cm4gdGhpcy5hdHRhY2soZW5lbXlCb2FyZE5hbWUudG9Mb3dlckNhc2UoKSwgcm93LCBjb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJjb25zdCBwbG90U2hpcCA9IChuYW1lLCByb3csIGNvbCwgbGVuZ3RoLCBvcmllbnRhdGlvbikgPT57XHJcbiAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICByb3c6IHJvdyxcclxuICAgICAgICBjb2w6IGNvbCxcclxuICAgICAgICBvcmllbnRhdGlvbjogb3JpZW50YXRpb25cclxuICAgIH0pXHJcblxyXG4gICAgaWYob3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3Jvd30tJHtjb2wgKyBpbmRleH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgZSA9Pntjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQpfSk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZihvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKXtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlSWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtuYW1lLnRvTG93ZXJDYXNlKCl9LSR7cm93ICsgaW5kZXh9LSR7Y29sfWApO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIlBsb3R0aW5nIGRpZG4ndCB3b3JrLlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHBsb3RIaXQgPSAoKSA9PntcclxuXHJcbn1cclxuXHJcbmNvbnN0IHBsb3RNaXNzID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCByZW1vdmVQbG90ID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5jb25zdCBjbGVhckJvYXJkID0gKCkgPT57XHJcblxyXG59XHJcblxyXG5leHBvcnQge3Bsb3RTaGlwLCBwbG90SGl0LCBwbG90TWlzcywgcmVtb3ZlUGxvdH0iLCIvL0dlbmVyYXRlcyByYW5kb20gbnVtYmVyIGRlcGVuZGluZyBvbiB0aGUgbnVtYmVyIG9mIGNvbHVtbnMgYW5kIHJvd3MuXHJcbmNvbnN0IGdlbmVyYXRlTnVtYmVyID0gKG1heCkgPT57XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSByYW5kb20gY29vcmRpbmF0ZXMgd2l0aGluIHRoZSBnYW1lIGJvYXJkXHJcbmNvbnN0IGdlbmVyYXRlQ29vcmRpbmF0ZXMgPSAoZ2FtZWJvYXJkKSA9PntcclxuICAgIGxldCBjb2wgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQuY29scyk7XHJcbiAgICBsZXQgcm93ID0gZ2VuZXJhdGVOdW1iZXIoZ2FtZWJvYXJkLnJvd3MpO1xyXG4gIFxyXG4gICAgcmV0dXJuIFtjb2wsIHJvd107XHJcbn1cclxuXHJcbi8vR2VuZXJhdGUgYSByYW5kb20gcGxhY2VtZW50IG9uIHRoZSBib2FyZC5cclxuY29uc3QgcmFuZG9tUGxhY2VtZW50ID0gKGdhbWVib2FyZCwgc2hpcCkgPT57XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTtcclxuICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPCAwLjUgPyBcInZlcnRpY2FsXCI6IFwiaG9yaXpvbnRhbFwiO1xyXG4gICAgc2hpcC5vcmllbnRhdGlvbiA9IGRpcmVjdGlvbjtcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmlzVmFsaWQoc2hpcCwgY29vcmRpbmF0ZXNbMF0sIGNvb3JkaW5hdGVzWzFdKSlcclxuICAgIHtcclxuICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChzaGlwLCBjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmFuZG9tUGxhY2VtZW50KGdhbWVib2FyZCwgc2hpcCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbi8vUGVyZm9ybSBhIHJhbmRvbSBhdHRhY2sgb24gdGhlIGdhbWVib2FyZFxyXG5jb25zdCBnZXRSYW5kb21Db29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+e1xyXG5cclxuICAgIGxldCByYW5kb21Db29yZGluYXRlcyA9IGdlbmVyYXRlQ29vcmRpbmF0ZXMoZ2FtZWJvYXJkKTsgLy9yZXR1cm5zIGFycmF5XHJcblxyXG4gICAgaWYgKGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwibWlzc1wiICYmIGdhbWVib2FyZC5ncmlkW3JhbmRvbUNvb3JkaW5hdGVzWzBdXVtyYW5kb21Db29yZGluYXRlc1sxXV0gIT09IFwiaGl0XCIgKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gcmFuZG9tQ29vcmRpbmF0ZXM7XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHJldHVybiBnZXRSYW5kb21Db29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQge2dldFJhbmRvbUNvb3JkaW5hdGVzLCByYW5kb21QbGFjZW1lbnR9IiwiaW1wb3J0IHt2NCBhcyB1dWlkdjR9IGZyb20gJ3V1aWQnXHJcbmNvbnN0IF9ERUZBVUxUX29yaWVudGF0aW9uICA9IFwiaG9yaXpvbnRhbFwiO1xyXG5cclxuY2xhc3MgU2hpcHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBsZW5ndGgpe1xyXG4gICAgdGhpcy5pZCA9IHV1aWR2NCgpO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBfREVGQVVMVF9vcmllbnRhdGlvbjtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuZGVwbG95ID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBzZXRPcmllbnRhdGlvbihpdGVtKXtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSBpdGVtO1xyXG4gICAgcmV0dXJuIHRoaXMub3JpZW50YXRpb247XHJcbiAgfVxyXG5cclxuICBoaXQoKXtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCl7XHJcblxyXG4gICAgaWYoKHRoaXMubGVuZ3RoIC0gdGhpcy5oaXRzKSA9PT0gMClcclxuICAgIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBzdW5rYCk7XHJcbiAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfSBoYXMgYmVlbiBoaXQgJHt0aGlzLmhpdHN9IHRpbWUuYCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJhbmRvbVVVSURcbn07IiwiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcm5nKCkge1xuICAvLyBsYXp5IGxvYWQgc28gdGhhdCBlbnZpcm9ubWVudHMgdGhhdCBuZWVkIHRvIHBvbHlmaWxsIGhhdmUgYSBjaGFuY2UgdG8gZG8gc29cbiAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAvLyBnZXRSYW5kb21WYWx1ZXMgbmVlZHMgdG8gYmUgaW52b2tlZCBpbiBhIGNvbnRleHQgd2hlcmUgXCJ0aGlzXCIgaXMgYSBDcnlwdG8gaW1wbGVtZW50YXRpb24uXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbmNvbnN0IGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zbGljZSgxKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgY29uc3QgdXVpZCA9IHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IG5hdGl2ZSBmcm9tICcuL25hdGl2ZS5qcyc7XG5pbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCB7IHVuc2FmZVN0cmluZ2lmeSB9IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKG5hdGl2ZS5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmF0aXZlLnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHVuc2FmZVN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlL3N0eWxlLnNjc3NcIjtcclxuaW1wb3J0IEFwcCBmcm9tIFwiLi9jb21wb3VuZHMvQXBwLmpzXCI7XHJcblxyXG5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBBcHAubG9hZFBhZ2UoKSk7Il0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJnYW1lYm9hcmRQbGF5ZXIxIiwiZ2FtZWJvYXJkUGxheWVyMiIsInBsYXllcjEiLCJwbGF5ZXIyIiwiQXBwIiwibG9hZFBhZ2UiLCJib2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImFwcGVuZENoaWxkIiwibG9hZEJhbm5lciIsImxvYWRCdXR0b25zIiwibG9hZERPTSIsImxvYWRNZXNzYWdlTG9nIiwiaGFuZGxlciIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ3cmFwcGVyIiwidGl0bGUiLCJ0ZXh0Q29udGVudCIsImJ1dHRvbnMiLCJpbm5lckhUTUwiLCJsb2FkTmV3R2FtZUJ1dHRvbiIsImNvbnRlbnQiLCJoYW5kbGVCdG5zQ29udGFpbmVyIiwibG9hZFNoaXBzIiwibG9hZE9yaWVudGF0aW9uQnRucyIsImxvYWRCb2FyZCIsImJveCIsInNlbmRNZXNzYWdlIiwibWVzc2FnZSIsInF1ZXJ5U2VsZWN0b3IiLCJwbGF5ZXIiLCJpZCIsImxvYWRHcmlkIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJlIiwic2hpcCIsImNvbCIsInBhcnNlSW50IiwiY3VycmVudFRhcmdldCIsImdldEF0dHJpYnV0ZSIsInJvdyIsImNvbnNvbGUiLCJsb2ciLCJwbGFjZVNoaXAiLCJoYW5kbGVPcmllbnRhdGlvbiIsIm9yaWVudGF0aW9uQnRucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaXRlbSIsInZhbHVlIiwib3JpZW50YXRpb24iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiaGFuZGxlT3JpZW50YXRpb25CdG4iLCJhZGQiLCJoYW5kbGVMb2FkU2hpcEJ0biIsImJvYXJkIiwiZ2V0U2hpcCIsImdldFNxdWFyZXMiLCJjaGlsZE5vZGVzIiwic2hpcHMiLCJjcmVhdGVTaGlwcyIsImNyZWF0ZUJ0biIsInNldEF0dHJpYnV0ZSIsIm5hbWUiLCJnZXRHYW1lYm9hcmQiLCJpIiwicm93cyIsImoiLCJjb2xzIiwic3F1YXJlIiwidG9Mb3dlckNhc2UiLCJwbG90U2hpcHMiLCJnYW1lYm9hcmQiLCJncmlkIiwidXBkYXRlR2FtZUJvYXJkIiwic3RhcnRCdG4iLCJyYW5kb21QbGFjZW1lbnRCdG4iLCJjbGVhckJvYXJkQnRuIiwicmVzZXRCdG4iLCJnZXRTaGlwQnRucyIsIm1vdmUiLCJhdHRhY2siLCJvcHBvbmVudEJvYXJkIiwiaXNHYW1lT3ZlciIsImFsZXJ0IiwicmVtb3ZlSGFuZGxlciIsInNldFRpbWVvdXQiLCJyYW5kb21BdHRhY2siLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkSGFuZGxlciIsInNxdWFyZXMiLCJnZXRDaGlsZHJlbiIsInN0YXJ0IiwicGxhY2VSYW5kb21Ub0JvYXJkIiwicmVtb3ZlUmVuZGVyIiwicmFuZG9tUGxhY2VtZW50IiwiY2xlYXJCb2FyZCIsImNsZWFyR3JpZCIsImNoYW5nZUFsbFNoaXB0b05vdERlcGxveWVkIiwicmVzZXQiLCJjb25zdHJ1Y3RvciIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJpc1ZhbGlkIiwiaW5kZXgiLCJkZXBsb3kiLCJzaGlwTmFtZSIsInJlc3VsdCIsInJlY2VpdmVBdHRhY2siLCJ4IiwieSIsImhpdCIsImlzU3VuayIsImdldE1heEhpdHMiLCJzdW0iLCJnZXRIaXRzIiwiaGl0cyIsImNoZWNrc0RpZmZlcmVuY2UiLCJtYXAiLCJnZXRSYW5kb21Db29yZGluYXRlcyIsInBsb3RTaGlwIiwiaXNIdW1hbiIsImVuZW15Qm9hcmROYW1lIiwicGxvdCIsImNvb3JkaW5hdGVzIiwiY3JlYXRlSWQiLCJwbG90SGl0IiwicGxvdE1pc3MiLCJyZW1vdmVQbG90IiwiZ2VuZXJhdGVOdW1iZXIiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZUNvb3JkaW5hdGVzIiwiZGlyZWN0aW9uIiwicmFuZG9tQ29vcmRpbmF0ZXMiLCJ2NCIsInV1aWR2NCIsIl9ERUZBVUxUX29yaWVudGF0aW9uIiwic2V0T3JpZW50YXRpb24iXSwic291cmNlUm9vdCI6IiJ9