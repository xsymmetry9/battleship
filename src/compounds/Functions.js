import { updatePlotBoard } from "./Plot";

const addBoardHandler = (player) => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.addEventListener("click", (e) => handleOrientation(e, player)));
}

const handleOrientation = (e, player) => {
    if (e.currentTarget.classList.contains("ship")) {
        setOrientation(e, player);
    }
}

const setOrientation = (e, player) => {
    const row = parseInt(e.currentTarget.getAttribute("row"));
    const col = parseInt(e.currentTarget.getAttribute("col"));
    const ship = player.board.getShipInfo(row, col);

    const start = ship.coordinates[0]; // Ensure 'coordinates' is correctly named
    const newOrientation = ship.orientation === "horizontal" ? "vertical" : "horizontal"; // Toggle orientation

    player.board.deleteShip(ship);

    if (player.board.isValid(ship, start[0], start[1], newOrientation)) {
        player.board.placeShip(ship, start[0], start[1], newOrientation);
        ship.setOrientation(newOrientation);
    } else {
        player.board.placeShip(ship, start[0], start[1], ship.orientation);
        console.log("Orientation change not valid, reverting to original orientation.");
    }
    
    updatePlotBoard(player);
}

export { addBoardHandler }
