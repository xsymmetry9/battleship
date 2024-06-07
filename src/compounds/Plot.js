import { randomPlacement } from "./Random";

const plotShip = (name, ship, row, col, orientation, board) => {
  const addShipClass = (elementId) => {
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
  return { name: name, row: row, col: col, orientation: orientation };
};

const plotShips = (boardName, gameboard) => {
  const getSquares = document.getElementById(boardName.toLowerCase()).childNodes;

  getSquares.forEach((square) => {
    const col = square.getAttribute("col");
    const row = square.getAttribute("row");
    if (gameboard.grid[row][col] !== null) {
      square.classList.add("ship");
    }
  });
  return getSquares;
};

const updatePlotBoard = (player) => {
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

const removeRender = (player) => {
  const squares = document.getElementById(player).childNodes;
  squares.forEach((square) => { square.className = "square dropzone"; });
};

const plotAllShipsRandomly = (player) => {
  player.board.ships.forEach((ship) => {
    if (!ship.deploy) {
      randomPlacement(player.board, ship);
    }
  });
  return player.board;
};

const clearBoard = (player) => {
  player.board.clearGrid();
  player.board.changeAllShiptoNotDeployed();
  updatePlotBoard(player);
  return player.board; // returns false
};

const loadBoard = (player) => {
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

const updateBoard = (player) => {
  const getSquares = document.querySelector(".gameboard").childNodes;

  getSquares.forEach((item) => {
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
const plotBanner = (message) => {
  const container = document.createElement("div");
  const box = document.createElement("div");
  box.innerHTML = `<h2>${message}</h2>`;
  container.appendChild(box);
  return container;
};

// ------------------------------ Play next turn button ---------------------------------------------
const loadNextTurnSection = () =>{
  const container = document.createElement("div");
  container.className = "next-btn";
  return container;
}

const nextTurnBtn = () =>{
  const button = document.createElement("button");
  button.textContent = "next";
  button.className = "next";
  return button;
}
const plotGame = (game) => {
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

export {
  clearBoard,
  loadPlayAgainMenu,
  plotGame,
  plotShip,
  plotShips,
  plotAllShipsRandomly,
  updateBoard,
  updatePlotBoard,
  nextTurnBtn
};
