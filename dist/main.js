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
  static reset = game => {
    console.log("reset");
    game.player1.board.reset();
    game.player2.board.reset();
    console.log(game.player1.board);
    game.winner = null;
    game.turn = 1;
    document.getElementById("root").removeChild(document.querySelector(".playerBoard"));
    //loads setup menu
    this.setupGame(game, "player 1");
  };
  static play = game => {
    const getRoot = document.getElementById("root");
    if (game.winner != null) {
      console.log(game.winner);
      alert(game.winner);
      getRoot.removeChild(document.querySelector(".playerBoard"));
      //Need to test this code.
      getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.loadPlayAgainMenu)(game.getAttacker().name, game.getReceiver().name));
      document.getElementById("play-again").addEventListener("click", () => this.reset(game));
    }
    if (game.getReceiver().board.isGameOver()) {
      game.winner = game.getAttacker();
      this.play(game);
    }

    //Whoever is the attacker
    getRoot.appendChild((0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.plotGame)(game));
    (0,_compounds_Plot__WEBPACK_IMPORTED_MODULE_4__.updateBoard)(game.getReceiver());
    if (game.getAttacker().isHuman) {
      document.getElementById("play-again").addEventListener("click", () => this.reset(game));

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
  container.appendChild(playAgainButton());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRTtJQUNiWixxREFBSSxDQUFDcEUsSUFBSSxDQUFDLENBQUM7RUFFZjs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7O0VBRUE7RUFDQTs7RUFFQTs7RUFFQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFHQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTtFQUNBOztFQUVBOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFD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QVE7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENTO0FBQ047QUFDc0I7O0FBRWpEO0FBQ0EsTUFBTSxrREFBTTtBQUNaLFdBQVcsa0RBQU07QUFDakI7O0FBRUE7QUFDQSxpREFBaUQsK0NBQUcsS0FBSzs7QUFFekQ7QUFDQSxtQ0FBbUM7O0FBRW5DO0FBQ0E7O0FBRUEsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFNBQVMsOERBQWU7QUFDeEI7O0FBRUEsaUVBQWUsRUFBRTs7Ozs7Ozs7Ozs7Ozs7OztBQzVCYzs7QUFFL0I7QUFDQSxxQ0FBcUMsaURBQUs7QUFDMUM7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7O1VDTnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040QjtBQUNTO0FBRXJDM0UsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUwQyx5REFBRyxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9scy8uL3NyYy9TZWN0aW9uL0dhbWVTZXR1cC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9TZWN0aW9uL01lbnUuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL0FwcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvR2FtZS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2xzLy4vc3JjL2NvbXBvdW5kcy9QbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1Bsb3QuanMiLCJ3ZWJwYWNrOi8vbHMvLi9zcmMvY29tcG91bmRzL1JhbmRvbS5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9jb21wb3VuZHMvU2hpcC5qcyIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9nYW1lLnNjc3M/Njg0OCIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9tZW51LnNjc3M/NjdjMCIsIndlYnBhY2s6Ly9scy8uL3NyYy9zdHlsZS9zdHlsZS5zY3NzPzQ1NmQiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL25hdGl2ZS5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vbHMvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL2xzLy4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly9scy8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2xzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbHMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9scy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQm9hcmQgZnJvbSBcIi4uL2NvbXBvdW5kcy9HYW1lYm9hcmRcIjtcclxuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL2NvbXBvdW5kcy9HYW1lXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4uL2NvbXBvdW5kcy9QbGF5ZXJcIjtcclxuaW1wb3J0IHtyYW5kb21QbGFjZW1lbnR9IGZyb20gXCIuLi9jb21wb3VuZHMvUmFuZG9tXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgcGxvdEdhbWUsXHJcbiAgICBjbGVhckJvYXJkLFxyXG4gICAgdXBkYXRlQm9hcmQsXHJcbiAgICBwbG90U2hpcHMsXHJcbiAgICBwbG90QWxsU2hpcHNSYW5kb21seSxcclxuICAgIGxvYWRQbGF5QWdhaW5NZW51LFxyXG4gICAgfSBmcm9tICcuLi9jb21wb3VuZHMvUGxvdCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTZXR1cHtcclxuICAgIHN0YXRpYyBsb2FkKCl7XHJcbiAgICAgICAgdGhpcy5zZXR1cCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldHVwKCl7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMUJvYXJkID0gbmV3IEJvYXJkKCk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyMkJvYXJkID0gbmV3IEJvYXJkKClcclxuXHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJWc0NvbXB1dGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2c0NvbXB1dGVyXCIpLmNoZWNrZWQ7XHJcbiAgICAgICAgY29uc3QgaXNQbGF5ZXJWc1BsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidnNQbGF5ZXJcIikuY2hlY2tlZDtcclxuXHJcbiAgICAgICBpZihpc1BsYXllclZzUGxheWVyIHx8IGlzUGxheWVyVnNDb21wdXRlcilcclxuICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMU5hbWUgPSBuZXcgUGxheWVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMU5hbWVcIikudmFsdWUsIHBsYXllcjFCb2FyZCwgcGxheWVyMkJvYXJkLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc3QgZ2V0UGxheWVyMk5hbWUgPSBpc1BsYXllclZzQ29tcHV0ZXIgPyBuZXcgUGxheWVyKFwiY29tcHV0ZXJcIiwgcGxheWVyMkJvYXJkLCBwbGF5ZXIxQm9hcmQsIGZhbHNlKSA6IFxyXG4gICAgICAgICAgICAgICAgbmV3IFBsYXllcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLnZhbHVlLCBwbGF5ZXIyQm9hcmQsIHBsYXllcjFCb2FyZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShnZXRQbGF5ZXIxTmFtZSwgZ2V0UGxheWVyMk5hbWUpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIikucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LWJveFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0dXBHYW1lKGdhbWUsIFwicGxheWVyIDFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBnYW1lO1xyXG5cclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyb3JcIik7XHJcbiAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIHN0YXRpYyBhY3RpdmF0ZVNxdWFyZSA9IChwbGF5ZXIsIG5hbWUpID0+e1xyXG4gICAgICAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIikuY2hpbGROb2RlcztcclxuIFxyXG4gICAgICAgICBjb25zdCBwbGFjZVNoaXBUb0JvYXJkID0gKGUpID0+IHtcclxuICAgICAgICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7IC8vcmV0dXJucyByb3dcclxuICAgICAgICAgICAgIGNvbnN0IGNvbCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7IC8vcmV0dXJucyBjb2x1bW5cclxuICAgICAgICAgICAgIGNvbnN0IHNoaXAgPSBwbGF5ZXIuYm9hcmQuZ2V0U2hpcChuYW1lKTsgLy9yZXR1cm5zIHNoaXBcclxuICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcGFyc2VJbnQocm93KSwgcGFyc2VJbnQoY29sKSkpO1xyXG4gXHJcbiAgICAgICAgICAgICBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gPT09IG51bGwpXHJcbiAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgLy9wbGFjZSB0aGUgc2hpcFxyXG4gICAgICAgICAgICAgICAgIHJldHVybiBwbGF5ZXIucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKTtcclxuIFxyXG4gICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAvL3NlbGVjdHMgdGhlIHNoaXBcclxuICAgICAgICAgICAgICAgICByZXR1cm4oXCJUaGVyZSBpcyBhIHNoaXAgbG9jYXRlZCB0aGVyZS4gIFBsYWNlIGFub3RoZXIgc3F1YXJlLlwiKTtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgICAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+e1xyXG5cclxuICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcGxhY2VTaGlwVG9Cb2FyZCk7XHJcbiAgICAgICAgIH0pXHJcbiAgICAgfVxyXG4gXHJcbiAgICAgc3RhdGljIHNldHVwR2FtZSA9IChnYW1lLCBwbGF5ZXJUdXJuKSA9PntcclxuICAgICAgICBjb25zdCBwbGF5ZXIgPSBwbGF5ZXJUdXJuID09PSBcInBsYXllciAxXCIgPyBnYW1lLnBsYXllcjEgOiBnYW1lLnBsYXllcjI7XHJcbiAgICAgICAgZ2FtZS5sb2FkU2V0dXBVSShwbGF5ZXIpO1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgICAgICBjb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xlYXItYm9hcmRcIik7XHJcbiAgICAgICAgY29uc3QgZG9uZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtYnRuXCIpO1xyXG4gICAgICAgIGNvbnN0IHNoaXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwLWJ0blwiKTtcclxuICAgICAgICBzaGlwQnRucy5mb3JFYWNoKChzaGlwQnRuID0+IHNoaXBCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gdGhpcy5hY3RpdmF0ZVNxdWFyZShwbGF5ZXIsIHNoaXBCdG4udmFsdWUpKSkpO1xyXG4gICAgICAgICBcclxuICAgICAgICByYW5kb21QbGFjZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gcGxvdEFsbFNoaXBzUmFuZG9tbHkocGxheWVyKSk7XHJcbiAgICAgICAgY2xlYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gY2xlYXJCb2FyZChwbGF5ZXIpKTtcclxuICAgICAgICBkb25lQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHRoaXMuZmluaXNoZWRTZXR1cEJ0bihnYW1lLCBwbGF5ZXJUdXJuKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllcjtcclxuICAgICB9XHJcbiBcclxuICAgICBzdGF0aWMgZmluaXNoZWRTZXR1cEJ0biA9IChnYW1lLCBwbGF5ZXJUdXJuKSA9PntcclxuICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2V0dXAtbWVudVwiKSk7XHJcbiAgICAgICAgaWYoZ2FtZS5wbGF5ZXIyLmlzSHVtYW4gJiYgcGxheWVyVHVybiA9PT0gXCJwbGF5ZXIgMVwiKXtcclxuICAgICAgICAgICAgdGhpcy5zZXR1cEdhbWUoZ2FtZSwgXCJwbGF5ZXIgMlwiKVxyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICAgICAgLy8gcmFuZG9tUGxhY2VtZW50KGdhbWUucGxheWVyMik7XHJcbiAgICAgICAgICAgIC8vZ2VuZXJhdGUgcmFuZG9tUGxhY2VtZW50IGZvciBwbGF5ZXIgMlxyXG4gICAgICAgICAgICBnYW1lLnBsYXllcjIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT57XHJcbiAgICAgICAgICAgICAgICByYW5kb21QbGFjZW1lbnQoZ2FtZS5wbGF5ZXIyLmJvYXJkLCBzaGlwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICB9IFxyXG4gICAgIH1cclxuICAgICBzdGF0aWMgcmVzZXQgPSAoZ2FtZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzZXRcIik7XHJcblxyXG4gICAgICAgIGdhbWUucGxheWVyMS5ib2FyZC5yZXNldCgpO1xyXG4gICAgICAgIGdhbWUucGxheWVyMi5ib2FyZC5yZXNldCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdhbWUucGxheWVyMS5ib2FyZCk7XHJcbiAgICAgICAgZ2FtZS53aW5uZXIgPSBudWxsO1xyXG4gICAgICAgIGdhbWUudHVybiA9IDE7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpLnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIikpO1xyXG4gICAgICAgIC8vbG9hZHMgc2V0dXAgbWVudVxyXG4gICAgICAgIHRoaXMuc2V0dXBHYW1lKGdhbWUsIFwicGxheWVyIDFcIik7XHJcbiAgICAgfVxyXG5cclxuICAgICBzdGF0aWMgcGxheSA9KGdhbWUpID0+e1xyXG4gICAgICAgIGNvbnN0IGdldFJvb3QgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xyXG5cclxuICAgICAgICBpZihnYW1lLndpbm5lciAhPSBudWxsKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZS53aW5uZXIpO1xyXG4gICAgICAgICAgICBhbGVydChnYW1lLndpbm5lcik7XHJcbiAgICAgICAgICAgIGdldFJvb3QucmVtb3ZlQ2hpbGQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKSk7XHJcbiAgICAgICAgICAgIC8vTmVlZCB0byB0ZXN0IHRoaXMgY29kZS5cclxuICAgICAgICAgICAgZ2V0Um9vdC5hcHBlbmRDaGlsZChsb2FkUGxheUFnYWluTWVudShnYW1lLmdldEF0dGFja2VyKCkubmFtZSwgZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUpKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5LWFnYWluXCIpLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpPT4gdGhpcy5yZXNldChnYW1lKSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZC5pc0dhbWVPdmVyKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGdhbWUud2lubmVyID0gZ2FtZS5nZXRBdHRhY2tlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5KGdhbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vV2hvZXZlciBpcyB0aGUgYXR0YWNrZXJcclxuICAgICAgICBnZXRSb290LmFwcGVuZENoaWxkKHBsb3RHYW1lKGdhbWUpKTtcclxuICAgICAgICB1cGRhdGVCb2FyZChnYW1lLmdldFJlY2VpdmVyKCkpO1xyXG4gICAgICAgIGlmKGdhbWUuZ2V0QXR0YWNrZXIoKS5pc0h1bWFuKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5LWFnYWluXCIpLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IHRoaXMucmVzZXQoZ2FtZSkpO1xyXG5cclxuICAgICAgICAgICAgLy9sb2FkIHByZXZpb3VzIG1vdmVzIGlmIGFueVxyXG4gICAgICAgICAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zcXVhcmVcIik7XHJcbiAgICAgICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb2wgPSBwYXJzZUludChpdGVtLmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb3cgPSBwYXJzZUludChpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Eb2Vzbid0IGFkZCBldmVudExpc3RlbmVyIGJlY2F1c2UgdGhlIHNxdWFyZSBpcyBvY2N1cGllZC5cclxuICAgICAgICAgICAgICAgIGlmKGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZC5ncmlkW3Jvd11bY29sXSA9PT0gXCJoaXRcIiB8fCBnYW1lLmdldFJlY2VpdmVyKCkuYm9hcmQuZ3JpZFtyb3ddW2NvbF0gPT09IFwibWlzc1wiKXsgXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBlID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sID0gZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLmdldEF0dGFja2VyKCkuYXR0YWNrKGdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCByb3csIGNvbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0Um9vdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLm5leHRUdXJuKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5KGdhbWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vcmFuZG9tIGF0dGFja1xyXG4gICAgICAgICAgICBwbG90U2hpcHMoZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUsIGdhbWUuZ2V0UmVjZWl2ZXIoKS5ib2FyZCk7XHJcbiAgICAgICAgICAgIGdhbWUuZ2V0QXR0YWNrZXIoKS5yYW5kb21BdHRhY2soZ2FtZS5nZXRSZWNlaXZlcigpLm5hbWUpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+e1xyXG4gICAgICAgICAgICAgICAgZ2V0Um9vdC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpKTtcclxuICAgICAgICAgICAgICAgIGdhbWUubmV4dFR1cm4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheShnYW1lKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYW1lLmdldEN1cnJlbnRUdXJuT3Bwb25lbnQoKTtcclxuXHJcbiAgICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgJy4uL3N0eWxlL21lbnUuc2NzcydcclxuaW1wb3J0IEdhbWVTZXR1cCBmcm9tIFwiLi9HYW1lU2V0dXBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lbnV7XHJcbiAgICBzdGF0aWMgbG9hZCgpe1xyXG4gICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIik7XHJcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLlVJKCkpO1xyXG5cclxuICAgICAgICB0aGlzLmxvYWRIYW5kbGVycygpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIFVJKCl7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJtZW51LWJveFwiO1xyXG5cclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJ0ZXh0LWNlbnRlcmVkXCI+V2VsY29tZSB0byBCYXR0bGVzaGlwPC9oMT5cclxuICAgICAgICAgICAgPGRpdiBpZD1cImdhbWVGb3JtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBsYXllcjFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNjcmlwdGlvblwiPlBsYXllciAxOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwbGF5ZXIxTmFtZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCIgaWQ9XCJwbGF5ZXIySW5wdXRcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBsYXllcjJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkZXNjcmlwdGlvblwiPlBsYXllciAyOjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwbGF5ZXIyTmFtZVwiIGRpc2FibGVkLz5cclxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImdhbWVNb2RlXCIgY2xhc3M9XCJnYW1lTW9kZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZCA9XCJ2c0NvbXB1dGVyXCIgbmFtZT1cImdhbWVNb2RlXCIgdmFsdWU9XCJjb21wdXRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ2c0NvbXB1dGVyXCI+UGxheWVyIHZzIENvbXB1dGVyPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJ2c1BsYXllclwiIG5hbWU9XCJnYW1lTW9kZVwiIHZhbHVlPVwicGxheWVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInZzUGxheWVyXCI+UGxheWVyIHZzIFBsYXllcjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnV0dG9ucy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic3VibWl0LWJ0blwiIHR5cGU9XCJzdWJtaXRcIj5TdGFydCBHYW1lPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIGBcclxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGxvYWRIYW5kbGVycygpe1xyXG4gICAgICAgIGNvbnN0IGdldFJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZU1vZGUgaW5wdXRcIik7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtYnRuXCIpO1xyXG5cclxuICAgICAgICBnZXRSYWRpb3MuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2hhbmdlXCIpLCAoKSA9PntcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW0uZ2V0QXR0cmlidXRlKFwiaWRcIikgPT09IFwidnNQbGF5ZXJcIilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjJOYW1lXCIpLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyMk5hbWVcIikuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gR2FtZVNldHVwLmxvYWQoKSk7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCBNZW51IGZyb20gJy4uL1NlY3Rpb24vTWVudSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHB7XHJcbiAgICBzdGF0aWMgbG9hZFBhZ2UoKXtcclxuICAgICAgICBNZW51LmxvYWQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRCdXR0b25zKCl7XHJcbiAgICAvLyAgICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgYnV0dG9ucy5jbGFzc05hbWUgPSBcImJ1dHRvbnMtY29udGFpbmVyXCJcclxuXHJcbiAgICAvLyAgICAgYnV0dG9ucy5pbm5lckhUTUwgPSBgXHJcbiAgICAvLyAgICAgICAgIDxidXR0b24gaWQ9XCJzdGFydC1iYXR0bGVzaGlwXCIgdHlwZT1cImJ1dHRvblwiPlN0YXJ0IEdhbWU8L2J1dHRvbj5cclxuICAgIC8vICAgICAgICAgPGJ1dHRvbiBpZD1cInJhbmRvbS1wbGFjZW1lbnRcIiB0eXBlPVwiYnV0dG9uXCI+UmFuZG9tIFBsYWNlbWVudDwvYnV0dG9uPlxyXG4gICAgLy8gICAgICAgICA8YnV0dG9uIGlkPSBcImNsZWFyLWJvYXJkXCIgdHlwZT1cImJ1dHRvblwiPkNsZWFyPC9idXR0b24+XHJcbiAgICAvLyAgICAgICAgIDxidXR0b24gaWQ9XCJyZXNldC1iYXR0bGVzaGlwXCIgY2xhc3M9XCJoaWRkZW5cIiB0eXBlPVwiYnV0dG9uXCI+UmVzZXQ8L2J1dHRvbj5cclxuICAgIC8vICAgICBgXHJcbiAgICAvLyAgICAgcmV0dXJuIGJ1dHRvbnM7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRCb2FyZHMoKXtcclxuICAgIC8vICAgICBjb25zdCBib2FyZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGJvYXJkcy5jbGFzc05hbWUgPSBcImJvYXJkcy1jb250YWluZXJcIjtcclxuICAgIC8vICAgICBib2FyZHMuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQm9hcmQocGxheWVyMSwgXCJteUJvYXJkXCIpKTtcclxuICAgIC8vICAgICBib2FyZHMuYXBwZW5kQ2hpbGQodGhpcy5sb2FkQm9hcmQocGxheWVyMiwgXCJvcHBvbmVudEJvYXJkXCIpKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGJvYXJkcztcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZERPTSgpe1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRlbnQuY2xhc3NOYW1lID0gXCJnYW1lLWNvbnRhaW5lclwiO1xyXG5cclxuICAgIC8vICAgICBjb25zdCBoYW5kbGVCdG5zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBoYW5kbGVCdG5zQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwicGxheWVyLW1lbnVcIjtcclxuICAgICAgICBcclxuICAgIC8vICAgICBoYW5kbGVCdG5zQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubG9hZFNoaXBzKHBsYXllcjEpKTtcclxuICAgIC8vICAgICBoYW5kbGVCdG5zQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubG9hZE9yaWVudGF0aW9uQnRucygpKTtcclxuICAgIC8vICAgICBjb250ZW50LmFwcGVuZENoaWxkKGhhbmRsZUJ0bnNDb250YWluZXIpO1xyXG5cclxuICAgIC8vICAgICBjb250ZW50LmFwcGVuZENoaWxkKHRoaXMubG9hZEJvYXJkcygpKTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRNZXNzYWdlTG9nKCl7XHJcbiAgICAvLyAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJtZXNzYWdlLWxvZy1jb250YWluZXJcIjtcclxuXHJcbiAgICAvLyAgICAgY29uc3QgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICBib3guY2xhc3NOYW1lID0gXCJtZXNzYWdlLWxvZy1ib3hcIjtcclxuICAgIC8vICAgICBib3guaW5uZXJIVE1MID0gYDxwIGlkPVwibWVzc2FnZS1sb2dcIj5UZXN0PC9wPmA7XHJcblxyXG4gICAgLy8gICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3gpO1xyXG5cclxuICAgIC8vICAgICByZXR1cm4gY29udGFpbmVyO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gc3RhdGljIHNlbmRNZXNzYWdlKG1lc3NhZ2Upe1xyXG4gICAgLy8gICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheS13cmFwcGVyIGgyXCIpO1xyXG4gICAgLy8gICAgIGJveC50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRCb2FyZChwbGF5ZXIsIGlkKXtcclxuICAgICAgICBcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5sb2FkR3JpZChwbGF5ZXIsIGlkKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlU3F1YXJlQ2xpY2soZSwgc2hpcCwgcGxheWVyKSB7XHJcbiAgICAvLyAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAvLyAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2cocGxheWVyLnBsYWNlU2hpcChzaGlwLCByb3csIGNvbCwgXCJob3Jpem9udGFsXCIpKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlT3JpZW50YXRpb24gPSAoc2hpcCkgPT57XHJcbiAgICAvLyAgICAgY29uc3Qgb3JpZW50YXRpb25CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5vcmllbnRhdGlvbi1idG5zXCIpO1xyXG4gICAgLy8gICAgIG9yaWVudGF0aW9uQnRucy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgIC8vICAgICAgICAgaWYoaXRlbS52YWx1ZSAhPT0gc2hpcC5vcmllbnRhdGlvbilcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIChlKSA9PiB0aGlzLmhhbmRsZU9yaWVudGF0aW9uQnRuKGUsIHNoaXApKTtcclxuICAgIC8vICAgICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGhhbmRsZUxvYWRTaGlwQnRuID0gKGUsIHBsYXllcikgPT57XHJcbiAgICAvLyAgICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICAvLyAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlCb2FyZFwiKS5jaGlsZE5vZGVzO1xyXG5cclxuICAgIC8vICAgICB0aGlzLmhhbmRsZU9yaWVudGF0aW9uKHNoaXApO1xyXG4gXHJcbiAgICAvLyAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB0aGlzLmhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHN0YXRpYyBoYW5kbGVPcmllbnRhdGlvbkJ0biA9IChlLCBzaGlwKSA9PntcclxuICAgIC8vICAgICAvLyBzaGlwLnNldE9yaWVudGF0aW9uID0gZS5jdXJyZW50VGFyZ2V0LnZhbHVlO1xyXG4gICAgLy8gICAgIHNoaXAub3JpZW50YXRpb24gPSBlLmN1cnJlbnRUYXJnZXQudmFsdWU7XHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coc2hpcCk7XHJcbiAgICAvLyAgICAgZS5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuXHJcblxyXG4gICAgLy8gICAgIGNvbnN0IG9yaWVudGF0aW9uQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3JpZW50YXRpb24tYnRuc1wiKTtcclxuICAgIC8vICAgICBvcmllbnRhdGlvbkJ0bnMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAvLyAgICAgICAgIGlmKGl0ZW0udmFsdWUgIT09IHNoaXAub3JpZW50YXRpb24pXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCAoZSkgPT4gdGhpcy5oYW5kbGVPcmllbnRhdGlvbihlLCBzaGlwKSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuXHJcbiAgICAvLyAgICAgcmV0dXJuIGUuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBzdGF0aWMgbG9hZE9yaWVudGF0aW9uQnRucyA9ICgpID0+e1xyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwib3JpZW50YXRpb24tY29udGFpbmVyXCI7XHJcblxyXG4gICAgLy8gICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAvLyAgICAgPGJ1dHRvbiBjbGFzcz1cIm9yaWVudGF0aW9uLWJ0bnNcIiBpZD1cImhvcml6b250YWwtYnRuXCIgdmFsdWU9XCJob3Jpem9udGFsXCI+aG9yaXpvbnRhbDwvYnV0dG9uPlxyXG4gICAgLy8gICAgIDxidXR0b24gY2xhc3M9XCJvcmllbnRhdGlvbi1idG5zXCIgaWQ9XCJ2ZXJ0aWNhbC1idG5cIiB2YWx1ZT1cInZlcnRpY2FsXCI+dmVydGljYWw8L2J1dHRvbj5cclxuICAgIC8vICAgICBgO1xyXG4gICAgLy8gICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIGxvYWRTaGlwcyhwbGF5ZXIpIHtcclxuICAgIC8vICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgLy8gICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInNoaXAtYnV0dG9uc1wiO1xyXG4gICBcclxuICAgIC8vICAgICBwbGF5ZXIuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBjb25zdCBjcmVhdGVTaGlwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZVNoaXBzLmNsYXNzTmFtZSA9IFwic2hpcC1idG4tY29udGFpbmVyXCI7XHJcbiAgICBcclxuICAgIC8vICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG5cIjtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgLy8gICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgIC8vICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAvLyAgICAgICAgIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHRoaXMuaGFuZGxlTG9hZFNoaXBCdG4oZSwgcGxheWVyKSk7XHJcblxyXG4gICAgLy8gICAgICAgICBjcmVhdGVTaGlwcy5hcHBlbmRDaGlsZChjcmVhdGVCdG4pO1xyXG4gICAgLy8gICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlU2hpcHMpO1xyXG4gICAgICAgXHJcbiAgICAvLyAgICAgfSk7XHJcblxyXG4gICAgLy8gICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICBcclxuICAgIC8vIH1cclxuICAgIC8vIHN0YXRpYyBsb2FkR3JpZChwbGF5ZXIsIGlkKXtcclxuICAgIC8vICAgICBjb25zdCBnZXRHYW1lYm9hcmQgPSBwbGF5ZXIuYm9hcmQ7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICAvLyAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIGlkKTtcclxuXHJcbiAgICAvLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRHYW1lYm9hcmQucm93czsgaSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgIC8vICAgICAgICAge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJyb3dcIiwgaSk7XHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiY29sXCIsIGopO1xyXG4gICAgLy8gICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcXVhcmUpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIHJldHVybiBjb250YWluZXI7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gc3RhdGljIHBsb3RTaGlwcyhnYW1lYm9hcmQpe1xyXG4gICAgLy8gICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllcjFcIikuY2hpbGROb2RlcztcclxuXHJcbiAgICAvLyAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PntcclxuICAgIC8vICAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJvdyA9IGl0ZW0uZ2V0QXR0cmlidXRlKFwicm93XCIpO1xyXG4gICAgLy8gICAgICAgICBpZihnYW1lYm9hcmQuZ3JpZFtyb3ddW2NvbF0gIT09IG51bGwpXHJcbiAgICAvLyAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfVxyXG5cclxuXHJcbiAgICAvLyBzdGF0aWMgaGFuZGxlcigpe1xyXG4gICAgLy8gICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFydC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IHJhbmRvbVBsYWNlbWVudEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgIC8vICAgICBjb25zdCBjbGVhckJvYXJkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbGVhci1ib2FyZFwiKVxyXG4gICAgLy8gICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldC1iYXR0bGVzaGlwXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWUtY29udGFpbmVyXCIpO1xyXG4gICAgLy8gICAgIGNvbnN0IGdldFNoaXBCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWJ1dHRvbnNcIik7XHJcbiAgICAvLyAgICAgY29uc3QgcGxheWVyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLW1lbnVcIik7XHJcblxyXG4gICAgLy8gICAgIGNvbnN0IG1vdmUgPSAoZSkgPT57XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGUuY3VycmVudFRhcmdldDtcclxuICAgIC8vICAgICAgICAgY29uc3QgY29sID0gc3F1YXJlLmdldEF0dHJpYnV0ZShcImNvbFwiKTtcclxuICAgIC8vICAgICAgICAgY29uc3Qgcm93ID0gc3F1YXJlLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICBpZihwbGF5ZXIxLmF0dGFjayhwbGF5ZXIyLm5hbWUsIHJvdywgY29sKSA9PT0gXCJoaXRcIil7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgLy8gIGNoZWNrcyBpZiBnYW1lIG92ZXJcclxuICAgIC8vICAgICAgICAgICAgIGlmKHBsYXllcjEub3Bwb25lbnRCb2FyZC5pc0dhbWVPdmVyKCkpXHJcbiAgICAvLyAgICAgICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgYWxlcnQoXCJHYW1lIG92ZXJcIik7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgLy8gICAgICAgICAgICAgfSBlbHNle1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKHBsYXllcjIucmFuZG9tQXR0YWNrKHBsYXllcjEubmFtZSkpKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgfSBlbHNlIFxyXG4gICAgLy8gICAgICAgICB7ICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcclxuICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKChwbGF5ZXIyLnJhbmRvbUF0dGFjayhwbGF5ZXIxLm5hbWUpKSk7XHJcbiAgICAvLyAgICAgICAgICAgICB9LCAzMDAwKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgc3F1YXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIG1vdmUpO1xyXG4gICAgLy8gICAgIH1cclxuXHJcbiAgICAvLyAgICAgY29uc3Qgc3RhcnQgPSAoKSA9PntcclxuICAgIC8vICAgICAgICAgY29uc3QgcGxheWVyTW92ZXMgPSAoKSA9PntcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgb3Bwb25lbnRCb2FyZGApLmNoaWxkTm9kZXM7XHJcbiAgICAvLyAgICAgICAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBwbGF5KTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJlbW92ZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBoYW5kbGVycyB3ZXJlIHJlbW92ZWQgc3VjY2Vzc2Z1bGx5LlwiKVxyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgZ2V0Q2hpbGRyZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgb3Bwb25lbnRCb2FyZGApLmNoaWxkTm9kZXM7XHJcbiAgICAvLyAgICAgICAgICAgICBnZXRDaGlsZHJlbi5mb3JFYWNoKChzcXVhcmUpID0+e1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHNxdWFyZS5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBwbGF5KTtcclxuICAgIC8vICAgICAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHBsYXkgPSAoZSkgPT57XHJcbiAgICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHJvdyA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBjb2wgPSBlLmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKFwiY29sXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYmF0dGxlU2hpcEdhbWUuZ2V0QXR0YWNrZXIoKSAhPT0gXCJjb21wdXRlclwiID8gYmF0dGxlU2hpcEdhbWUuZ2V0QXR0YWNrZXIoKS5hdHRhY2soYmF0dGxlU2hpcEdhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lLCByb3csIGNvbCkgOiBiYXR0bGVTaGlwR2FtZS5nZXRBdHRhY2tlcigpLnJhbmRvbUF0dGFjayhiYXR0bGVTaGlwR2FtZS5nZXRSZWNlaXZlcigpKTtcclxuICAgIC8vICAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gXCJoaXRcIilcclxuICAgIC8vICAgICAgICAgICAgIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImhpdFwiKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICAvL2NoZWNrcyBmb3Igc3RhdHVzXHJcbiAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIHJlbW92ZUhhbmRsZXIoKTtcclxuICAgIC8vICAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR2FtZS5uZXh0VHVybigpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJhdHRsZVNoaXBHYW1lLnR1cm4pO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgICAgICBwbGF5ZXJNb3ZlcygpO1xyXG4gICAgLy8gICAgICAgICAgICAgfTtcclxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJhdHRsZVNoaXBHYW1lLmlzR2FtZU92ZXIpO1xyXG4gICAgLy8gICAgICAgICAgICAgLy8gcmVtb3ZlSGFuZGxlcigpO1xyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgLy8gICAgICAgICBwbG90TWVzc2FnZShcIlBsYXllciAxIGdvZXMgZmlyc3RcIilcclxuICAgIC8vICAgICAgICAgY29uc3QgYmF0dGxlU2hpcEdhbWUgPSBuZXcgR2FtZShwbGF5ZXIxLCBwbGF5ZXIyLCBmYWxzZSk7XHJcbiAgICAvLyAgICAgICAgIGJhdHRsZVNoaXBHYW1lLnBsYXllcjIucGxhY2VSYW5kb21Ub0JvYXJkKCk7XHJcblxyXG4gICAgLy8gICAgICAgICBpZighYmF0dGxlU2hpcEdhbWUuaXNHYW1lT3ZlciAmJlxyXG4gICAgLy8gICAgICAgICAgICAgYmF0dGxlU2hpcEdhbWUucGxheWVyMS5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSAmJiBiYXR0bGVTaGlwR2FtZS5wbGF5ZXIyLmJvYXJkLmlzQWxsU2hpcHNEZXBsb3llZCgpKVxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgICAvL0FkZCBoYW5kbGVyIHRvIGVhY2ggc3F1YXJlXHJcbiAgICAvLyAgICAgICAgICAgICBzdGFydEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAvLyAgICAgICAgICAgICBzdGFydEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmFuZG9tUGxhY2VtZW50QnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICBjbGVhckJvYXJkQnRuLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgICAgICByZXNldEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICAgICAgcmVtb3ZlQWxsQ2hpbGROb2RlcyhwbGF5ZXJNZW51KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICAvL0dhbWUgc3RhcnRzIGhlcmVcclxuICAgIC8vICAgICAgICAgICAgIHBsYXllck1vdmVzKCk7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhiYXR0bGVTaGlwR2FtZS50dXJuKTtcclxuXHJcbiAgICAvLyAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhmYWxzZSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vICAgICBjb25zdCByZXNldCA9ICgpID0+e1xyXG4gICAgLy8gICAgICAgICBwbGF5ZXIxLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgLy8gICAgICAgICBwbGF5ZXIyLmJvYXJkLmNsZWFyR3JpZCgpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnVwZGF0ZUdhbWVCb2FyZChcIm15Qm9hcmRcIik7XHJcbiAgICAvLyAgICAgICAgIC8vIHJlbW92ZVJlbmRlcihcIm15Qm9hcmRcIik7XHJcbiAgICAvLyAgICAgICAgIC8vIHJlbW92ZVJlbmRlcihcIm9wcG9uZW50Qm9hYXJkXCIpO1xyXG5cclxuXHJcblxyXG4gICAgLy8gICAgICAgICByZXNldEJ0bi5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKChcImNsaWNrXCIpLCBzdGFydCk7XHJcbiAgICAvLyAgICAgICAgIHN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgIGdldFNoaXBCdG5zLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAvLyAgICAgICAgIHJhbmRvbVBsYWNlbWVudEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgLy8gICAgICAgICBjbGVhckJvYXJkQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcblxyXG4gICAgLy8gICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKFwiUHJlc3MgU3RhcnQuXCIpXHJcblxyXG5cclxuICAgIC8vICAgICB9XHJcblxyXG4gICAgLy8gICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIHN0YXJ0KTtcclxuICAgIC8vICAgICByYW5kb21QbGFjZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgKCkgPT4gcmFuZG9tUGxhY2VtZW50KHBsYXllcjEpKTtcclxuICAgIC8vICAgICBjbGVhckJvYXJkQnRuLmFkZEV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksICgpID0+IGNsZWFyQm9hcmQocGxheWVyMSkpXHJcbiAgICAvLyAgICAgcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcigoXCJjbGlja1wiKSwgcmVzZXQpO1xyXG5cclxuICAgXHJcbiAgICAvLyB9XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQge2FkZEhhbmRsZXIsIHJlbW92ZUhhbmRsZXJ9IGZyb20gJy4vRnVuY3Rpb25zJ1xyXG5pbXBvcnQge3Bsb3RNZXNzYWdlLCByYW5kb21QbGFjZW1lbnR9IGZyb20gJy4vUGxvdCdcclxuaW1wb3J0IFwiLi4vc3R5bGUvZ2FtZS5zY3NzXCJcclxuXHJcbmV4cG9ydCBjb25zdCBiYW5uZXIgPSAobWVzc2FnZSkgPT57XHJcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxyXG4gICAgaXRlbS5pbm5lckhUTUwgPSBgPGgxPiR7bWVzc2FnZX08L2gxPmA7XHJcbiAgICByZXR1cm4gaXRlbTtcclxufVxyXG5leHBvcnQgY29uc3QgbG9hZEJ1dHRvbnMgPShwbGF5ZXIpID0+e1xyXG4gICAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBidXR0b25zLmNsYXNzTmFtZSA9IFwiYnV0dG9ucy1jb250YWluZXJcIjtcclxuXHJcbiAgICBjb25zdCByYW5kb21QbGFjZW1lbnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgcmFuZG9tUGxhY2VtZW50QnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIFwicmFuZG9tLXBsYWNlbWVudFwiKTtcclxuICAgIHJhbmRvbVBsYWNlbWVudEJ0bi50ZXh0Q29udGVudD1cInJhbmRvbVwiO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgIGNsZWFyQnRuLnRleHRDb250ZW50ID0gXCJjbGVhclwiO1xyXG4gICAgY2xlYXJCdG4uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjbGVhci1ib2FyZFwiKTtcclxuXHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKHJhbmRvbVBsYWNlbWVudEJ0bik7XHJcbiAgICBidXR0b25zLmFwcGVuZENoaWxkKGNsZWFyQnRuKTtcclxuXHJcbiAgICByZXR1cm4gYnV0dG9ucztcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGxvYWRCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImlkXCIsIHBsYXllci5uYW1lLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgY29uc3QgZ2V0R2FtZWJvYXJkID0gcGxheWVyLmJvYXJkO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgajxnZXRHYW1lYm9hcmQuY29sczsgaisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcXVhcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTmFtZSA9IFwic3F1YXJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgIHNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJjb2xcIiwgaik7XHJcbiAgICAgICAgICAgICAgICBzcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYCR7cGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKX0tJHtpfS0ke2p9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRSb3cgPSBpdGVtLmdldEF0dHJpYnV0ZShcInJvd1wiKTtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5ib2FyZC5ncmlkW3BhcnNlZFJvd11bcGFyc2VkQ29sXSA9PT0gXCJoaXRcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcIm1pc3NcIilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuZXhwb3J0IGNvbnN0IGxvYWRTdGFydEJ1dHRvbiA9ICgpID0+e1xyXG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xyXG4gICAgc3RhcnRCdG4uY2xhc3NOYW1lPVwic3RhcnQtYnRuXCI7XHJcbiAgICBzdGFydEJ0bi50ZXh0Q29udGVudCA9IFwiRG9uZVwiO1xyXG4gICAgcmV0dXJuIHN0YXJ0QnRuO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2hpcE1lbnUgPSAocGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJzaGlwLWJ1dHRvbnNcIjtcclxuICAgXHJcbiAgICAgICAgcGxheWVyLmJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLmNsYXNzTmFtZSA9IFwic2hpcC1idG5cIjtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImlkXCIsIHNoaXAuaWQpO1xyXG4gICAgICAgICAgICBjcmVhdGVCdG4uc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgc2hpcC5uYW1lKTtcclxuICAgICAgICAgICAgY3JlYXRlQnRuLnRleHRDb250ZW50ID0gc2hpcC5uYW1lO1xyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZUxvYWRTaGlwQnRuKGUsIHBsYXllcikpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUJ0bik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbmV4cG9ydCBjb25zdCBoYW5kbGVMb2FkU2hpcEJ0biA9IChlLCBwbGF5ZXIpID0+e1xyXG4gICAgY29uc3Qgc2hpcCA9IHBsYXllci5ib2FyZC5nZXRTaGlwKGUuY3VycmVudFRhcmdldC52YWx1ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhzaGlwKTtcclxuICAgIGNvbnN0IGdldFNxdWFyZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKS5jaGlsZE5vZGVzO1xyXG4gXHJcbiAgICBnZXRTcXVhcmVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IGhhbmRsZVNxdWFyZUNsaWNrKGUsIHNoaXAsIHBsYXllcikpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5leHBvcnQgY29uc3QgaGFuZGxlU3F1YXJlQ2xpY2sgPSAoZSwgc2hpcCwgcGxheWVyKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcImNvbFwiKSk7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZShcInJvd1wiKSk7XHJcblxyXG4gICAgICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgcm93LCBjb2wsIFwiaG9yaXpvbnRhbFwiKTtcclxuICAgIH1cclxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcclxuXHJcbmNsYXNzIEdhbWV7XHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGxheWVyMSA9IHBsYXllcjE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIyID0gcGxheWVyMjtcclxuICAgICAgICB0aGlzLndpbm5lciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50dXJuID0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvL3R1cm4gYmFzZSBwbGF5aW5nIGdhbWVcclxuXHJcbiAgICBnZXRBdHRhY2tlcigpe1xyXG4gICAgICAgIGlmKHRoaXMudHVybiAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgLy9pZiBpdCdzIHBsYXllcjEgdHVybiwgcmV0dXJucyBwbGF5ZXIyIG5hbWUuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldFJlY2VpdmVyKCl7XHJcbiAgICAgICAgaWYodGhpcy50dXJuICUgMiAhPT0gMCkge1xyXG4gICAgICAgICAgICAvL2lmIGl0J3MgcGxheWVyMSB0dXJuLCByZXR1cm5zIHBsYXllcjIgbmFtZS5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyMjtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBsYXllcjE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9yZXR1cm5zIHBsYXllcjEgYW5kIHBsYXllcjIgYXMgc3RyaW5nc1xyXG4gICAgZ2V0Q3VycmVudFR1cm5PcHBvbmVudCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dGFja2VyKCkubmFtZSA9PSB0aGlzLnBsYXllcjEubmFtZSA/IFwicGxheWVyMlwiIDogXCJwbGF5ZXIxXCI7XHJcbiAgICB9XHJcbiAgICBuZXh0VHVybigpe1xyXG4gICAgICAgIHRoaXMudHVybisrO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZFNldHVwVUkocGxheWVyKXtcclxuICAgICAgICBjb25zdCB1c2VySW50ZXJmYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmNsYXNzTmFtZSA9IFwic2V0dXAtbWVudVwiO1xyXG4gICAgICAgIC8vTG9hZCBTZXQgcGllY2VzIGJ5IHBsYXllcnNcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGJhbm5lcihwbGF5ZXIubmFtZSkpO1xyXG4gICAgICAgIHVzZXJJbnRlcmZhY2UuYXBwZW5kQ2hpbGQobG9hZEJ1dHRvbnMocGxheWVyKSk7XHJcbiAgICAgICAgY29uc3Qgc2hpcE1lbnVCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgc2hpcE1lbnVCb2FyZENvbnRhaW5lci5jbGFzc05hbWUgPSBcImJvYXJkLWNvbnRhaW5lclwiO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKHBsYXllcikpO1xyXG4gICAgICAgIHNoaXBNZW51Qm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoc2hpcE1lbnUocGxheWVyKSk7XHJcbiAgICAgICAgdXNlckludGVyZmFjZS5hcHBlbmRDaGlsZChzaGlwTWVudUJvYXJkQ29udGFpbmVyKTtcclxuICAgICAgICB1c2VySW50ZXJmYWNlLmFwcGVuZENoaWxkKGxvYWRTdGFydEJ1dHRvbigpKTtcclxuICAgICAgICByb290LmFwcGVuZENoaWxkKHVzZXJJbnRlcmZhY2UpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgU2hpcCBmcm9tICcuL1NoaXAnO1xyXG5jbGFzcyBHYW1lYm9hcmR7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnJvd3MgPSAxMDsgXHJcbiAgICB0aGlzLmNvbHMgPSAxMDtcclxuICAgIHRoaXMuZ3JpZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRoaXMucm93cyB9LCAoKSA9PiBBcnJheSh0aGlzLmNvbHMpLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5zaGlwcyA9IFtcclxuICAgICAgbmV3IFNoaXAoXCJBc3NhdWx0IFNoaXBcIiwgMyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQWlyY3JhZnQgQ2FycmllclwiLCA1KSxcclxuICAgICAgbmV3IFNoaXAoXCJEZXN0cm95ZXJcIiwgNyksXHJcbiAgICAgIG5ldyBTaGlwKFwiQ3J1aXNlclwiLCAzKSxcclxuICAgICAgbmV3IFNoaXAoXCJDb21iYXQgU2hpcFwiLCAxKSAgIFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCl7XHJcbiAgICB0aGlzLmNsZWFyR3JpZCgpO1xyXG4gICAgdGhpcy5pc0FsbFNoaXBzRGVwbG95ZWQoKTtcclxuICB9XHJcbiAgLy9DbGVhcnMgdGhlIGJvYXJkLlxyXG4gIGNsZWFyR3JpZCgpe1xyXG4gICAgdGhpcy5ncmlkLmZvckVhY2gocm93ID0+IHJvdy5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKTtcclxuICB9XHJcbiAgLy9DaGVja3MgaWYgdGhlcmUgYXJlIGFueSBzaGlwcyBvbiB0aGUgYm9hcmQgYW5kIGlmIGl0IGZpdHMuXHJcbiAgaXNWYWxpZChzaGlwLCByb3csIGNvbCl7XHJcbiAgICBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIil7XHJcbiAgICAgIGlmKGNvbCArIHNoaXAubGVuZ3RoID4gdGhpcy5jb2xzKVxyXG4gICAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIC8vIFwiRXJyb3I6IFNoaXAgZG9lc24ndCBmaXQgaG9yaXpvbnRhbGx5LlwiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGluZGV4IDwgc2hpcC5sZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYodGhpcy5ncmlkW3Jvd11bY29sICsgaW5kZXhdICE9PSBudWxsKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJFcnJvcjogQSBzaGlwIGlzIGFscmVhZHkgcHJlc2VudCBhdCB0aGlzIGxvY2F0aW9uIGhvcml6b250YWxseS5cIjsgLy9BIHNoaXAgaXMgY3VycmVudCBpbiB0aGF0IGxvY2F0aW9uXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpbmRleCArKzsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7IC8vUGFzcyBhbGwgdGVzdFxyXG4gICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9IGVsc2UgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgICAgaWYocm93ICsgc2hpcC5sZW5ndGggPiB0aGlzLnJvd3MpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZSAvL1wiU2hpcCBkb2Vzbid0IGZpdCB2ZXJ0aWNhbGx5XCI7IC8vU2hpcCBkb2Vzbid0IGZpdC5cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKGluZGV4IDwgc2hpcC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICBpZih0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlIC8vXCJBIHNoaXAgaXMgYWxyZWFkeSBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuXCI7IC8vQSBzaGlwIGlzIGN1cnJlbnQgaW4gdGhhdCBsb2NhdGlvblxyXG4gICAgICAgICAgICAgICAvL0Egc2hpcCBpcyBjdXJyZW50IGluIHRoYXQgbG9jYXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2UgLy9cIkludmFsaWQgZGlyZWN0aW9uXCI7IC8vaW52YWxpZCBuYW1lXHJcbiAgICB9XHJcbiAgfVxyXG4vL1BsYWNlcyB0aGUgc2hpcCBvbiB0aGUgYm9hcmQuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKXtcclxuICAgIGlmKCF0aGlzLmlzVmFsaWQoc2hpcCwgcm93LCBjb2wpKVxyXG4gICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgXHJcbiAgICBpZihzaGlwLm9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgICAge1xyXG4gICAgICAgIC8vY2hlY2tzIGZvciBvdmVybGFwcyBvciBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2hpcC5sZW5ndGg7IGluZGV4KyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICB0aGlzLmdyaWRbcm93XVtjb2wgKyBpbmRleF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2UgaWYoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKXsgLy9kaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxyXG4gICAgICAgIC8vaWYgZXZlcnl0aGluZyBwYXNzZXMsIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaGlwLmxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICB0aGlzLmdyaWRbcm93ICsgaW5kZXhdW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzaGlwLmRlcGxveSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHNoaXAuZGVwbG95O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBzaGlwLmRlcGxveTtcclxuICAgICAgfVxyXG5cclxuICAgIH0gXHJcbiAgICBnZXRTaGlwKHNoaXBOYW1lKXtcclxuICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgICAgaWYoc2hpcC5uYW1lID09PSBzaGlwTmFtZSkge1xyXG4gICAgICAgICAgcmVzdWx0ID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIFwic2hpcCBub3QgZm91bmRcIjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gIC8vUGxhY2VzIGFuIGF0dGFjayBvbiB0aGUgYm9hcmQuXHJcbiAgcmVjZWl2ZUF0dGFjayh4LCB5KXtcclxuICAgIFxyXG4gICAgaWYoeCA+PSB0aGlzLmNvbHMgfHwgeSA+PXRoaXMucm93cyApXHJcbiAgICAgIHJldHVybiBcIm91dCBvZiBib3VuZHNcIjtcclxuICAgIGlmKHRoaXMuZ3JpZFt4XVt5XSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgdGhpcy5ncmlkW3hdW3ldID0gXCJtaXNzXCI7IC8vbWFyayBkb3duIG1pc3NcclxuICAgICAgcmV0dXJuIFwibWlzc1wiO1xyXG4gICAgfSBlbHNle1xyXG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5ncmlkW3hdW3ldO1xyXG4gICAgICBzaGlwLmhpdCgpO1xyXG4gICAgICB0aGlzLmdyaWRbeF1beV0gPSBcImhpdFwiO1xyXG4gICAgICByZXR1cm4gXCJoaXRcIjtcclxuICAgIH1cclxuICB9XHJcbiAgZ2V0TWF4SGl0cygpe1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICB0aGlzLnNoaXBzLmZvckVhY2goc2hpcCA9PntcclxuICAgICAgc3VtKz0gc2hpcC5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBzdW07XHJcbiAgfVxyXG4gIGdldEhpdHMoKXtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKHNoaXAgPT57XHJcbiAgICAgIHN1bSs9IHNoaXAuaGl0cztcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHN1bTtcclxuICB9XHJcblxyXG4gIGNoZWNrc0RpZmZlcmVuY2UoKXtcclxuICAgIHJldHVybiB0aGlzLmdldE1heEhpdHMoKSAtIHRoaXMuZ2V0SGl0cygpO1xyXG4gIH1cclxuXHJcbiAgLy9DaGVja3MgaWYgdGhlIGdhbWUgaXMgb3Zlci5cclxuICBpc0dhbWVPdmVyKCl7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmNoZWNrc0RpZmZlcmVuY2UoKSk7XHJcbiAgICByZXR1cm4gdGhpcy5jaGVja3NEaWZmZXJlbmNlKCkgPT09IDAgPyB0cnVlIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc0FsbFNoaXBzRGVwbG95ZWQoKXtcclxuICAgIGxldCByZXN1bHQgPSB0cnVlO1xyXG4gICAgdGhpcy5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGlmKCFzaGlwLmRlcGxveSlcclxuICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKXtcclxuICAgIHRoaXMuc2hpcHMubWFwKChzaGlwKSA9PiBzaGlwLmRlcGxveSA9IGZhbHNlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCB7Z2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudH0gZnJvbSAnLi9SYW5kb20nO1xyXG5pbXBvcnQge3Bsb3RTaGlwfSBmcm9tICcuL1Bsb3QnO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lLCBnYW1lYm9hcmQsIG9wcG9uZW50Qm9hcmQsIGlzSHVtYW4pXHJcbiAge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQgPSBnYW1lYm9hcmQ7XHJcbiAgICB0aGlzLm9wcG9uZW50Qm9hcmQgPSBvcHBvbmVudEJvYXJkO1xyXG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcclxuXHJcbiAgfVxyXG4gIC8vUGxhY2VzIHNoaXBzIHJhbmRvbWx5IG9uIHRoZSBib2FyZC5cclxuICBwbGFjZVJhbmRvbVRvQm9hcmQoKXtcclxuICAgIHRoaXMuYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQodGhpcy5ib2FyZCwgc2hpcCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0aGlzLm9wcG9uZW50Qm9hcmQuc2hpcHM7XHJcbiAgfVxyXG4vL0EgZnVuY3Rpb24gdGhhdCBwbGFjZXMgc2hpcHMgb24gdGhlIGJvYXJkIG1hbnVhbGx5LlxyXG4gIHBsYWNlU2hpcChzaGlwLCByb3csIGNvbClcclxuICB7XHJcbiAgICBpZiAoIXNoaXAuZGVwbG95ICYmIHRoaXMuYm9hcmQucGxhY2VTaGlwKHNoaXAsIHJvdywgY29sKSl7XHJcbiAgICAgIHBsb3RTaGlwKHRoaXMubmFtZSwgcm93LCBjb2wsIHNoaXAubGVuZ3RoLCBzaGlwLm9yaWVudGF0aW9uKTtcclxuICAgICAgcmV0dXJuIHRoaXMuYm9hcmQuZ3JpZDtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCJTaGlwIGhhcyBhbHJlYWR5IGJlZW4gZGVwbG95ZWQuICBUcmllZCBhZ2FpblwiXHJcbiAgICB9XHJcblxyXG4gIH1cclxuLy9QbGF5ZXIgY2hvb3NlcyB0byBhdHRhY2sgb24gdGhlIG9wcG9uZW50J3MgYm9hcmQuXHJcbiAgYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCl7XHJcbiAgICBjb25zdCBwbG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZW5lbXlCb2FyZE5hbWV9LSR7cm93fS0ke2NvbH1gKTtcclxuXHJcbiAgICBpZih0aGlzLm9wcG9uZW50Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCkgPT09IFwiaGl0XCIpXHJcbiAgICB7XHJcbiAgICAgIHBsb3QuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcclxuICAgICAgcmV0dXJuIHRydWU7IFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGxvdC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfTtcclxuICB9XHJcbi8vUGxheWVyIGNob29zZXMgdG8gYXR0YWNrIHJhbmRvbWx5IG9uIHRoZSBvcHBvbmVudCdzIGJvYXJkLlxyXG4gIHJhbmRvbUF0dGFjayhlbmVteUJvYXJkTmFtZSl7XHJcbiAgICBjb25zdCBjb29yZGluYXRlcyA9IGdldFJhbmRvbUNvb3JkaW5hdGVzKHRoaXMub3Bwb25lbnRCb2FyZCk7XHJcbiAgICBjb25zdCByb3cgPSBjb29yZGluYXRlc1swXTtcclxuICAgIGNvbnN0IGNvbCA9IGNvb3JkaW5hdGVzWzFdO1xyXG4gICAgY29uc29sZS5sb2coXCJyYW5kb20gYXR0YWNrIGV4ZWN1dGVkXCIpO1xyXG4gICAgcmV0dXJuIHRoaXMuYXR0YWNrKGVuZW15Qm9hcmROYW1lLCByb3csIGNvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XHJcbiIsImNvbnN0IHBsb3RTaGlwcyA9IChib2FyZE5hbWUsIGdhbWVib2FyZCkgPT57XHJcbiAgICBjb25zdCBnZXRTcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYm9hcmROYW1lLnRvTG93ZXJDYXNlKCkpLmNoaWxkTm9kZXM7XHJcbiAgICBcclxuICAgIGdldFNxdWFyZXMuZm9yRWFjaCgoaXRlbSkgPT57XHJcbiAgICAgICAgY29uc3QgY29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgY29uc3Qgcm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgaWYoZ2FtZWJvYXJkLmdyaWRbcm93XVtjb2xdICE9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGdldFNxdWFyZXM7XHJcbn1cclxuY29uc3QgcGxvdFNoaXAgPSAobmFtZSwgcm93LCBjb2wsIGxlbmd0aCwgb3JpZW50YXRpb24pID0+e1xyXG4gICAgY29uc29sZS5sb2coe1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgcm93OiByb3csXHJcbiAgICAgICAgY29sOiBjb2wsXHJcbiAgICAgICAgb3JpZW50YXRpb246IG9yaWVudGF0aW9uXHJcbiAgICB9KVxyXG5cclxuICAgIGlmKG9yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIilcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4Kyspe1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVJZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke25hbWUudG9Mb3dlckNhc2UoKX0tJHtyb3d9LSR7Y29sICsgaW5kZXh9YCk7XHJcbiAgICAgICAgICAgIGNyZWF0ZUlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoKFwiY2xpY2tcIiksIGUgPT57Y29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0KX0pO1xyXG4gICAgICAgICAgICBjcmVhdGVJZC5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYob3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xyXG4gICAgICAgIGZvcihsZXQgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7bmFtZS50b0xvd2VyQ2FzZSgpfS0ke3JvdyArIGluZGV4fS0ke2NvbH1gKTtcclxuICAgICAgICAgICAgY3JlYXRlSWQuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJQbG90dGluZyBkaWRuJ3Qgd29yay5cIlxyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBwbG90TWVzc2FnZSA9IChtZXNzYWdlKSA9PntcclxuICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheS13cmFwcGVyIGgyXCIpO1xyXG4gICAgYm94LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxufVxyXG5cclxuY29uc3QgcmVtb3ZlUmVuZGVyID0gKHBsYXllcikgPT57XHJcbiAgICBjb25zdCBzcXVhcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGxheWVyKS5jaGlsZE5vZGVzO1xyXG4gICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtzcXVhcmUuY2xhc3NOYW1lID0gXCJzcXVhcmVcIn0pO1xyXG5cclxufVxyXG5jb25zdCBwbG90QWxsU2hpcHNSYW5kb21seSA9IChwbGF5ZXIpID0+IHBsYXllci5ib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBwbG90UmFuZG9tUGxhY2VtZW50KHBsYXllciwgc2hpcCkpO1xyXG5cclxuY29uc3QgcGxvdFJhbmRvbVBsYWNlbWVudCA9IChwbGF5ZXIpID0+eyAgIFxyXG4gICAgaWYoIXBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKSl7XHJcbiAgICAgICAgcGxheWVyLnBsYWNlUmFuZG9tVG9Cb2FyZCgpO1xyXG4gICAgICAgIHBsb3RTaGlwcyhwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpLCBwbGF5ZXIuYm9hcmQpOyAgXHJcbiAgICAgICAgcmV0dXJuIHBsYXllci5ib2FyZC5pc0FsbFNoaXBzRGVwbG95ZWQoKTsgLy9yZXR1cm5zIHRydWVcclxuICAgIH0gZWxzZXtcclxuICAgICAgICBjbGVhckJvYXJkKHBsYXllcik7XHJcbiAgICAgICAgcGxvdFJhbmRvbVBsYWNlbWVudChwbGF5ZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBjbGVhckJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICBwbGF5ZXIuYm9hcmQuY2xlYXJHcmlkKCk7XHJcbiAgICBwbGF5ZXIuYm9hcmQuY2hhbmdlQWxsU2hpcHRvTm90RGVwbG95ZWQoKTtcclxuICAgIHJlbW92ZVJlbmRlcihwbGF5ZXIubmFtZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIHJldHVybiBwbGF5ZXIuYm9hcmQuaXNBbGxTaGlwc0RlcGxveWVkKCk7IC8vcmV0dXJucyBmYWxzZVxyXG59XHJcblxyXG5jb25zdCByZW1vdmVBbGxDaGlsZE5vZGVzID0gKHBhcmVudCkgPT57XHJcbiAgICB3aGlsZShwYXJlbnQuZmlyc3RDaGlsZCl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyZW50KTtcclxuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IHBsb3RCYW5uZXIgPSAobWVzc2FnZSkgPT57XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIC8vIGNvbnRhaW5lci5jbGFzc05hbWU9XCJib3R0b20tc3BhY2luZy0xXCI7XHJcbiAgICBjb25zdCBib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgYm94LmlubmVySFRNTCA9IGA8aDI+JHttZXNzYWdlfTwvaDI+YFxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveCk7XHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcbmNvbnN0IHBsb3RUZXh0Qm94ID0gKHRleHQpID0+e1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSBcInRleHQtYm94XCI7XHJcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYDxwPiR7dGV4dH08L3A+YDtcclxuICAgIHJldHVybiBjb250YWluZXI7XHJcbn1cclxuY29uc3QgbG9hZEJvYXJkID0gKHBsYXllcikgPT57XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IFwiZ2FtZWJvYXJkXCI7XHJcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgcGxheWVyLm5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgIGNvbnN0IGdldEdhbWVib2FyZCA9IHBsYXllci5ib2FyZDtcclxuXHJcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldEdhbWVib2FyZC5yb3dzOyBpKyspXHJcbiAgICAgICB7XHJcbiAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGo8Z2V0R2FtZWJvYXJkLmNvbHM7IGorKylcclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIGNvbnN0IHNxdWFyZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc05hbWUgPSBcInNxdWFyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcInJvd1wiLCBpKTtcclxuICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImNvbFwiLCBqKTtcclxuICAgICAgICAgICAgICAgc3F1YXJlLnNldEF0dHJpYnV0ZShcImlkXCIsIGAke3BsYXllci5uYW1lLnRvTG93ZXJDYXNlKCl9LSR7aX0tJHtqfWApO1xyXG5cclxuICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNxdWFyZSk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgfVxyXG4gICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcclxuICAgfVxyXG5jb25zdCB1cGRhdGVCb2FyZCA9IChwbGF5ZXIpID0+e1xyXG4gICAgICAgY29uc3QgZ2V0U3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkXCIpLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgICAgZ2V0U3F1YXJlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgY29uc3QgcGFyc2VkUm93ID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJyb3dcIik7XHJcbiAgICAgICAgICAgY29uc3QgcGFyc2VkQ29sID0gaXRlbS5nZXRBdHRyaWJ1dGUoXCJjb2xcIik7XHJcbiAgICAgICAgICAgaWYocGxheWVyLmJvYXJkLmdyaWRbcGFyc2VkUm93XVtwYXJzZWRDb2xdID09PSBcImhpdFwiKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICAgICAgIH0gZWxzZSBpZihwbGF5ZXIuYm9hcmQuZ3JpZFtwYXJzZWRSb3ddW3BhcnNlZENvbF0gPT09IFwibWlzc1wiKVxyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgICAgICB9IFxyXG4gICAgICAgfSk7XHJcbiAgIH1cclxuY29uc3QgbWlkZGxlU2VjdGlvbiA9IChzaGlwcykgPT57XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY29udGFpbmVyLmNsYXNzTmFtZT1cInNoaXBzQm94IHwgZGlzcGxheS1mbGV4LXJvdyBib3R0b20tc3BhY2luZy0xXCI7XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgY3JlYXRlQm94LmNsYXNzTmFtZSA9IFwiZGlzcGxheS1mbGV4LXJvd1wiO1xyXG4gICAgICAgIGNyZWF0ZUJveC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPHA+JHtzaGlwLm5hbWV9PC9wPlxyXG4gICAgICAgIDxwPiR7c2hpcC5sZW5ndGggLSBzaGlwLmhpdHN9PC9wPmBcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUJveCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyO1xyXG59XHJcbmNvbnN0IHBsb3RHYW1lID0gKGdhbWUpID0+e1xyXG4gICAgLy9nYW1lIC0+IHJldHVybnMgb2JqZWN0IG9mIHBsYXllcidzIGJvYXJkIGdhbWUucmVjZWl2ZXIoKTtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWluZXIuY2xhc3NOYW1lID0gXCJwbGF5ZXJCb2FyZFwiO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsb3RCYW5uZXIoYCR7Z2FtZS5nZXRBdHRhY2tlcigpLm5hbWV9YCkpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1pZGRsZVNlY3Rpb24oZ2FtZS5nZXRSZWNlaXZlcigpLmJvYXJkLnNoaXBzKSk7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobG9hZEJvYXJkKGdhbWUuZ2V0UmVjZWl2ZXIoKSkpO1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXlBZ2FpbkJ1dHRvbigpKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwbG90VGV4dEJveChgJHtnYW1lLmdldEF0dGFja2VyKCkubmFtZX0ncyB0dXJuIHRvIGF0dGFjayAke2dhbWUuZ2V0UmVjZWl2ZXIoKS5uYW1lfWApKTtcclxuXHJcbnJldHVybiBjb250YWluZXI7XHJcblxyXG59XHJcblxyXG5jb25zdCBwbGF5QWdhaW5CdXR0b24gPSAoKSA9PntcclxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XHJcbiAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwbGF5LWFnYWluXCIpO1xyXG4gICAgYnV0dG9uLnRleHRDb250ZW50ID0gXCJQbGF5IGFnYWluXCI7XHJcbiAgICByZXR1cm4gYnV0dG9uO1xyXG59XHJcbmNvbnN0IGxvYWRQbGF5QWdhaW5NZW51ID0od2lubmVyLCBsb3NlcikgPT57XHJcblxyXG4gICAgY29uc3QgcGxheUFnYWluTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwbGF5QWdhaW5NZW51LmNsYXNzTmFtZSA9IFwibWVudS1ib3hcIjtcclxuICAgIHBsYXlBZ2Fpbk1lbnUuaW5uZXJIVE1MID0gYFxyXG4gICAgPGgyPiR7d2lubmVyfSBoYXMgZGVmZWF0ZWQgJHtsb3Nlcn08L2gyPlxyXG4gICAgPHA+V291bGQgeW91IGxpa2UgdG8gcGxheSBhZ2Fpbj88L3A+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiXCIgaWQ9XCJwbGF5LWFnYWluXCI+UGxheSBBZ2FpbjwvYnV0dG9uPlxyXG4gICAgYDtcclxuXHJcbiAgICByZXR1cm4gcGxheUFnYWluTWVudTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCB7XHJcbiAgICBwbG90U2hpcHMsIFxyXG4gICAgcGxvdFNoaXAsIFxyXG4gICAgcGxvdE1lc3NhZ2UsIFxyXG4gICAgcmVtb3ZlUmVuZGVyLFxyXG4gICAgcGxvdEFsbFNoaXBzUmFuZG9tbHksXHJcbiAgICBwbG90UmFuZG9tUGxhY2VtZW50LCBcclxuICAgIHJlbW92ZUFsbENoaWxkTm9kZXMsIFxyXG4gICAgY2xlYXJCb2FyZCxcclxuICAgIHBsb3RHYW1lLFxyXG4gICAgcGxvdFRleHRCb3gsXHJcbiAgICBwbG90QmFubmVyLFxyXG4gICAgdXBkYXRlQm9hcmQsXHJcbiAgICBsb2FkQm9hcmQsXHJcbiAgICBsb2FkUGxheUFnYWluTWVudVxyXG59XHJcbiIsIi8vR2VuZXJhdGVzIHJhbmRvbSBudW1iZXIgZGVwZW5kaW5nIG9uIHRoZSBudW1iZXIgb2YgY29sdW1ucyBhbmQgcm93cy5cclxuY29uc3QgZ2VuZXJhdGVOdW1iZXIgPSAobWF4KSA9PntcclxuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG59XHJcblxyXG4vL0dlbmVyYXRlIHJhbmRvbSBjb29yZGluYXRlcyB3aXRoaW4gdGhlIGdhbWUgYm9hcmRcclxuY29uc3QgZ2VuZXJhdGVDb29yZGluYXRlcyA9IChnYW1lYm9hcmQpID0+e1xyXG4gICAgbGV0IGNvbCA9IGdlbmVyYXRlTnVtYmVyKGdhbWVib2FyZC5jb2xzKTtcclxuICAgIGxldCByb3cgPSBnZW5lcmF0ZU51bWJlcihnYW1lYm9hcmQucm93cyk7XHJcbiAgXHJcbiAgICByZXR1cm4gW2NvbCwgcm93XTtcclxufVxyXG5cclxuLy9HZW5lcmF0ZSBhIHJhbmRvbSBwbGFjZW1lbnQgb24gdGhlIGJvYXJkLlxyXG5jb25zdCByYW5kb21QbGFjZW1lbnQgPSAoZ2FtZWJvYXJkLCBzaGlwKSA9PntcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhnYW1lYm9hcmQpO1xyXG4gICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA8IDAuNSA/IFwidmVydGljYWxcIjogXCJob3Jpem9udGFsXCI7XHJcbiAgICBzaGlwLm9yaWVudGF0aW9uID0gZGlyZWN0aW9uO1xyXG5cclxuICAgIGlmIChnYW1lYm9hcmQuaXNWYWxpZChzaGlwLCBjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pKVxyXG4gICAge1xyXG4gICAgICBnYW1lYm9hcmQucGxhY2VTaGlwKHNoaXAsIGNvb3JkaW5hdGVzWzBdLCBjb29yZGluYXRlc1sxXSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByYW5kb21QbGFjZW1lbnQoZ2FtZWJvYXJkLCBzaGlwKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuLy9QZXJmb3JtIGEgcmFuZG9tIGF0dGFjayBvbiB0aGUgZ2FtZWJvYXJkXHJcbmNvbnN0IGdldFJhbmRvbUNvb3JkaW5hdGVzID0gKGdhbWVib2FyZCkgPT57XHJcblxyXG4gICAgbGV0IHJhbmRvbUNvb3JkaW5hdGVzID0gZ2VuZXJhdGVDb29yZGluYXRlcyhnYW1lYm9hcmQpOyAvL3JldHVybnMgYXJyYXlcclxuXHJcbiAgICBpZiAoZ2FtZWJvYXJkLmdyaWRbcmFuZG9tQ29vcmRpbmF0ZXNbMF1dW3JhbmRvbUNvb3JkaW5hdGVzWzFdXSAhPT0gXCJtaXNzXCIgJiYgZ2FtZWJvYXJkLmdyaWRbcmFuZG9tQ29vcmRpbmF0ZXNbMF1dW3JhbmRvbUNvb3JkaW5hdGVzWzFdXSAhPT0gXCJoaXRcIiApXHJcbiAgICB7XHJcbiAgICAgIHJldHVybiByYW5kb21Db29yZGluYXRlcztcclxuICAgIH0gZWxzZXtcclxuICAgICAgcmV0dXJuIGdldFJhbmRvbUNvb3JkaW5hdGVzKGdhbWVib2FyZCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7Z2V0UmFuZG9tQ29vcmRpbmF0ZXMsIHJhbmRvbVBsYWNlbWVudH0iLCJpbXBvcnQge3Y0IGFzIHV1aWR2NH0gZnJvbSAndXVpZCdcclxuY29uc3QgX0RFRkFVTFRfb3JpZW50YXRpb24gID0gXCJob3Jpem9udGFsXCI7XHJcblxyXG5jbGFzcyBTaGlwe1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxlbmd0aCl7XHJcbiAgICB0aGlzLmlkID0gdXVpZHY0KCk7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IF9ERUZBVUxUX29yaWVudGF0aW9uO1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5kZXBsb3kgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHNldE9yaWVudGF0aW9uKGl0ZW0pe1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IGl0ZW07XHJcbiAgICByZXR1cm4gdGhpcy5vcmllbnRhdGlvbjtcclxuICB9XHJcblxyXG4gIGhpdCgpe1xyXG4gICAgdGhpcy5oaXRzKys7XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKXtcclxuXHJcbiAgICBpZigodGhpcy5sZW5ndGggLSB0aGlzLmhpdHMpID09PSAwKVxyXG4gICAge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGhhcyBiZWVuIHN1bmtgKTtcclxuICAgICAgcmV0dXJuIHRydWUgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLm5hbWV9IGhhcyBiZWVuIGhpdCAke3RoaXMuaGl0c30gdGltZS5gKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiY29uc3QgcmFuZG9tVVVJRCA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5yYW5kb21VVUlEICYmIGNyeXB0by5yYW5kb21VVUlELmJpbmQoY3J5cHRvKTtcbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZG9tVVVJRFxufTsiLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gSW4gdGhlIGJyb3dzZXIgd2UgdGhlcmVmb3JlXG4vLyByZXF1aXJlIHRoZSBjcnlwdG8gQVBJIGFuZCBkbyBub3Qgc3VwcG9ydCBidWlsdC1pbiBmYWxsYmFjayB0byBsb3dlciBxdWFsaXR5IHJhbmRvbSBudW1iZXJcbi8vIGdlbmVyYXRvcnMgKGxpa2UgTWF0aC5yYW5kb20oKSkuXG5sZXQgZ2V0UmFuZG9tVmFsdWVzO1xuY29uc3Qgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxuY29uc3QgYnl0ZVRvSGV4ID0gW107XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4LnB1c2goKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2FmZVN0cmluZ2lmeShhcnIsIG9mZnNldCA9IDApIHtcbiAgLy8gTm90ZTogQmUgY2FyZWZ1bCBlZGl0aW5nIHRoaXMgY29kZSEgIEl0J3MgYmVlbiB0dW5lZCBmb3IgcGVyZm9ybWFuY2VcbiAgLy8gYW5kIHdvcmtzIGluIHdheXMgeW91IG1heSBub3QgZXhwZWN0LiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkL3B1bGwvNDM0XG4gIHJldHVybiBieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFyciwgb2Zmc2V0ID0gMCkge1xuICBjb25zdCB1dWlkID0gdW5zYWZlU3RyaW5naWZ5KGFyciwgb2Zmc2V0KTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgbmF0aXZlIGZyb20gJy4vbmF0aXZlLmpzJztcbmltcG9ydCBybmcgZnJvbSAnLi9ybmcuanMnO1xuaW1wb3J0IHsgdW5zYWZlU3RyaW5naWZ5IH0gZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBpZiAobmF0aXZlLnJhbmRvbVVVSUQgJiYgIWJ1ZiAmJiAhb3B0aW9ucykge1xuICAgIHJldHVybiBuYXRpdmUucmFuZG9tVVVJRCgpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gdW5zYWZlU3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZS9zdHlsZS5zY3NzXCI7XHJcbmltcG9ydCBBcHAgZnJvbSBcIi4vY29tcG91bmRzL0FwcC5qc1wiO1xyXG5cclxuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgQXBwLmxvYWRQYWdlKCkpOyJdLCJuYW1lcyI6WyJCb2FyZCIsIkdhbWUiLCJQbGF5ZXIiLCJyYW5kb21QbGFjZW1lbnQiLCJwbG90R2FtZSIsImNsZWFyQm9hcmQiLCJ1cGRhdGVCb2FyZCIsInBsb3RTaGlwcyIsInBsb3RBbGxTaGlwc1JhbmRvbWx5IiwibG9hZFBsYXlBZ2Fpbk1lbnUiLCJHYW1lU2V0dXAiLCJsb2FkIiwic2V0dXAiLCJwbGF5ZXIxQm9hcmQiLCJwbGF5ZXIyQm9hcmQiLCJpc1BsYXllclZzQ29tcHV0ZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2hlY2tlZCIsImlzUGxheWVyVnNQbGF5ZXIiLCJnZXRQbGF5ZXIxTmFtZSIsInZhbHVlIiwiZ2V0UGxheWVyMk5hbWUiLCJnYW1lIiwicmVtb3ZlQ2hpbGQiLCJxdWVyeVNlbGVjdG9yIiwic2V0dXBHYW1lIiwiY29uc29sZSIsImxvZyIsImFjdGl2YXRlU3F1YXJlIiwicGxheWVyIiwibmFtZSIsImdldFNxdWFyZXMiLCJjaGlsZE5vZGVzIiwicGxhY2VTaGlwVG9Cb2FyZCIsImUiLCJyb3ciLCJwYXJzZUludCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImNvbCIsInNoaXAiLCJib2FyZCIsImdldFNoaXAiLCJncmlkIiwicGxhY2VTaGlwIiwiZm9yRWFjaCIsIml0ZW0iLCJhZGRFdmVudExpc3RlbmVyIiwicGxheWVyVHVybiIsInBsYXllcjEiLCJwbGF5ZXIyIiwibG9hZFNldHVwVUkiLCJyYW5kb21QbGFjZW1lbnRCdG4iLCJjbGVhckJ0biIsImRvbmVCdG4iLCJzaGlwQnRucyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaGlwQnRuIiwiZmluaXNoZWRTZXR1cEJ0biIsImlzSHVtYW4iLCJzaGlwcyIsInBsYXkiLCJyZXNldCIsIndpbm5lciIsInR1cm4iLCJnZXRSb290IiwiYWxlcnQiLCJhcHBlbmRDaGlsZCIsImdldEF0dGFja2VyIiwiZ2V0UmVjZWl2ZXIiLCJpc0dhbWVPdmVyIiwic3F1YXJlcyIsImN1cnJlbnRUYXJnZXQiLCJhdHRhY2siLCJuZXh0VHVybiIsInJhbmRvbUF0dGFjayIsInNldFRpbWVvdXQiLCJnZXRDdXJyZW50VHVybk9wcG9uZW50IiwiTWVudSIsInJvb3QiLCJVSSIsImxvYWRIYW5kbGVycyIsImNvbnRhaW5lciIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJpbm5lckhUTUwiLCJnZXRSYWRpb3MiLCJzdWJtaXQiLCJkaXNhYmxlZCIsIkFwcCIsImxvYWRQYWdlIiwiYWRkSGFuZGxlciIsInJlbW92ZUhhbmRsZXIiLCJwbG90TWVzc2FnZSIsImJhbm5lciIsIm1lc3NhZ2UiLCJsb2FkQnV0dG9ucyIsImJ1dHRvbnMiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImxvYWRCb2FyZCIsInRvTG93ZXJDYXNlIiwiZ2V0R2FtZWJvYXJkIiwiaSIsInJvd3MiLCJqIiwiY29scyIsInNxdWFyZSIsInBhcnNlZFJvdyIsInBhcnNlZENvbCIsImNsYXNzTGlzdCIsImFkZCIsImxvYWRTdGFydEJ1dHRvbiIsInN0YXJ0QnRuIiwic2hpcE1lbnUiLCJjcmVhdGVCdG4iLCJpZCIsImhhbmRsZUxvYWRTaGlwQnRuIiwiaGFuZGxlU3F1YXJlQ2xpY2siLCJjb25zdHJ1Y3RvciIsInVzZXJJbnRlcmZhY2UiLCJzaGlwTWVudUJvYXJkQ29udGFpbmVyIiwiU2hpcCIsIkdhbWVib2FyZCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImZpbGwiLCJjbGVhckdyaWQiLCJpc0FsbFNoaXBzRGVwbG95ZWQiLCJjaGFuZ2VBbGxTaGlwdG9Ob3REZXBsb3llZCIsImlzVmFsaWQiLCJvcmllbnRhdGlvbiIsImluZGV4IiwiZGVwbG95Iiwic2hpcE5hbWUiLCJyZXN1bHQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJoaXQiLCJnZXRNYXhIaXRzIiwic3VtIiwiZ2V0SGl0cyIsImhpdHMiLCJjaGVja3NEaWZmZXJlbmNlIiwibWFwIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZXMiLCJwbG90U2hpcCIsImdhbWVib2FyZCIsIm9wcG9uZW50Qm9hcmQiLCJwbGFjZVJhbmRvbVRvQm9hcmQiLCJlbmVteUJvYXJkTmFtZSIsInBsb3QiLCJjb29yZGluYXRlcyIsImJvYXJkTmFtZSIsImNyZWF0ZUlkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImJveCIsInJlbW92ZVJlbmRlciIsInBsb3RSYW5kb21QbGFjZW1lbnQiLCJyZW1vdmVBbGxDaGlsZE5vZGVzIiwicGFyZW50IiwiZmlyc3RDaGlsZCIsInBsb3RCYW5uZXIiLCJwbG90VGV4dEJveCIsInRleHQiLCJtaWRkbGVTZWN0aW9uIiwiY3JlYXRlQm94IiwicGxheUFnYWluQnV0dG9uIiwiYnV0dG9uIiwibG9zZXIiLCJwbGF5QWdhaW5NZW51IiwiZ2VuZXJhdGVOdW1iZXIiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJnZW5lcmF0ZUNvb3JkaW5hdGVzIiwiZGlyZWN0aW9uIiwicmFuZG9tQ29vcmRpbmF0ZXMiLCJ2NCIsInV1aWR2NCIsIl9ERUZBVUxUX29yaWVudGF0aW9uIiwic2V0T3JpZW50YXRpb24iLCJpc1N1bmsiXSwic291cmNlUm9vdCI6IiJ9