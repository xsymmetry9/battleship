import "../style/game.scss"

export const banner = (message) => {
    const item = document.createElement("div");
    item.innerHTML = `<h1>${message}</h1>`;
    return item;
};

export const loadButtons = (player) => {
    const buttons = document.createElement("div");
    buttons.className = "buttons-container";

    const randomPlacementBtn = document.createElement("button");
    randomPlacementBtn.setAttribute("id", "random-placement");
    randomPlacementBtn.textContent = "Random";

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear";
    clearBtn.setAttribute("id", "clear-board");

    buttons.appendChild(randomPlacementBtn);
    buttons.appendChild(clearBtn);

    return buttons;
};

export const loadBoard = (player) => {
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

export const updateBoard = (player) => {
    const getSquares = document.querySelectorAll(".gameboard .square");

    getSquares.forEach((item) => {
        const parsedRow = item.getAttribute("row");
        const parsedCol = item.getAttribute("col");
        const gridValue = player.board.grid[parsedRow][parsedCol];

        item.classList.remove("hit", "miss");
        if (gridValue === "hit") {
            item.classList.add("hit");
        } else if (gridValue === "miss") {
            item.classList.add("miss");
        }
    });
};

export const loadStartButton = () => {
    const startBtn = document.createElement("button");
    startBtn.className = "start-btn";
    startBtn.textContent = "Done";
    return startBtn;
};

export const shipMenu = (player) => {
    const container = document.createElement("div");
    container.className = "ship-buttons";

    player.board.ships.forEach((ship) => {
        const createBtn = document.createElement("div");
        createBtn.className = "ship-btn draggable";
        createBtn.setAttribute("id", ship.id);
        createBtn.setAttribute("value", ship.name);
        createBtn.setAttribute("draggable", true);
        createBtn.textContent = ship.name;

        createBtn.addEventListener("click", (e) => handleLoadShipBtn(e, player));

        container.appendChild(createBtn);
    });
    return container;
};

export const handleLoadShipBtn = (e, player) => {
    const ship = player.board.getShip(e.currentTarget.getAttribute("value"));
    console.log(ship);
    const getSquares = document.getElementById(player.name.toLowerCase()).childNodes;

    getSquares.forEach((item) => {
        item.addEventListener("click", (e) => handleSquareClick(e, ship, player));
    });
};

export const handleSquareClick = (e, ship, player) => {
    const col = parseInt(e.currentTarget.getAttribute("col"));
    const row = parseInt(e.currentTarget.getAttribute("row"));

    if (player.board.placeShip(ship, row, col, "horizontal")) {
        updateBoard(player);
    } else {
        console.error("Invalid placement");
    }
};

const root = document.getElementById("root");

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.winner = null;
        this.turn = 1;
    }

    getAttacker() {
        return this.turn % 2 !== 0 ? this.player1 : this.player2;
    }

    getReceiver() {
        return this.turn % 2 !== 0 ? this.player2 : this.player1;
    }

    getCurrentTurnOpponent() {
        return this.getAttacker().name === this.player1.name ? "player2" : "player1";
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

export default Game;
