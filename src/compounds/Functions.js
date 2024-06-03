import { updatePlotBoard } from "./Plot";

const addBoardHandler = (player) =>{
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.addEventListener(("click"), (e) => handleOrientation(e, player)));
}
const handleOrientation = (e, player) =>{
    e.currentTarget.classList.contains("ship") ? setOrientation(e, player) : false;
}
const setOrientation = (e, player) =>{
    const row = e.currentTarget.getAttribute("row");
    const col = e.currentTarget.getAttribute("col");
    const ship = player.board.getShipInfo(row, col);

    const start = ship.coordinate[0]; //type of array
    const orientation = ship.orientation === "horizontal" ? "vertical" : "horizontal"; //toggles orientation
    
    player.board.deleteShip(ship);

    if(player.board.isValid(ship, start[0], start[1], orientation)){
        player.board.placeShip(ship, start[0], start[1], orientation);
        ship.setOrientation(orientation);
    } else {
        player.board.placeShip(ship, start[0], start[1], ship.orientation);
        console.log("not changed");
    }
    updatePlotBoard(player);

}
export {addBoardHandler}