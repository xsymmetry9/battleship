const plotShips = (boardName, gameboard) =>{
    const getSquares = document.getElementById(boardName.toLowerCase()).childNodes;
    
    getSquares.forEach((item) =>{
        const col = item.getAttribute("col");
        const row = item.getAttribute("row");
        if(gameboard.grid[row][col] !== null)
        {
            item.classList.add("ship");
        }
    })
    return getSquares;
}
const plotShip = (name, row, col, length, orientation) =>{
    console.log({
        name: name,
        row: row,
        col: col,
        orientation: orientation
    })

    if(orientation === "horizontal")
    {
        for(let index = 0; index < length; index++){
            const createId = document.getElementById(`${name.toLowerCase()}-${row}-${col + index}`);
            createId.removeEventListener(("click"), e =>{console.log(e.currentTarget)});
            createId.classList.add("ship");
        }
    } else if(orientation === "vertical") {
        for(let index = 0; index < length; index++){
            const createId = document.getElementById(`${name.toLowerCase()}-${row + index}-${col}`);
            createId.classList.add("ship");
        }
    } else {
        return "Plotting didn't work."
    }
}

const plotMessage = (message) =>{
    const box = document.querySelector(".display-wrapper h2");
    box.textContent = message;
}

const removeRender = (player) =>{
    const squares = document.getElementById(player).childNodes;
    squares.forEach((square) => {square.className = "square"});

}
const randomPlacement = (player) =>{   
    if(!player.board.isAllShipsDeployed()){
        player.placeRandomToBoard();
        plotShips(player.name.toLowerCase(), player.board);  
        return player.board.isAllShipsDeployed(); //returns true
    } else{
        clearBoard(player);
        randomPlacement(player);
    }
}

const clearBoard = (player) =>{
    player.board.clearGrid();
    player.board.changeAllShiptoNotDeployed();
    removeRender(player.name.toLowerCase());
    return player.board.isAllShipsDeployed(); //returns false
}

//Adds ships on Menu
const addAllChildNodes = () =>{
    const getMenu = document.querySelector(".player-menu");
}
const removeAllChildNodes = (parent) =>{
    while(parent.firstChild){
        console.log(parent);
        parent.removeChild(parent.firstChild);
    }
}


export {plotShips, plotShip, plotMessage, removeRender, randomPlacement, addAllChildNodes, removeAllChildNodes, clearBoard}