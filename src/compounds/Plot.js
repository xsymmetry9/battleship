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
const plotAllShipsRandomly = (player) => player.board.ships.forEach((ship) => plotRandomPlacement(player, ship));

const plotRandomPlacement = (player) =>{   
    if(!player.board.isAllShipsDeployed()){
        player.placeRandomToBoard();
        plotShips(player.name.toLowerCase(), player.board);  
        return player.board.isAllShipsDeployed(); //returns true
    } else{
        clearBoard(player);
        plotRandomPlacement(player);
    }
}

const clearBoard = (player) =>{
    player.board.clearGrid();
    player.board.changeAllShiptoNotDeployed();
    removeRender(player.name.toLowerCase());
    return player.board.isAllShipsDeployed(); //returns false
}

const removeAllChildNodes = (parent) =>{
    while(parent.firstChild){
        console.log(parent);
        parent.removeChild(parent.firstChild);
    }
}
const plotBanner = (message) =>{

    const container = document.createElement("div");
    // container.className="bottom-spacing-1";
    const box = document.createElement("div");
    box.innerHTML = `<h2>${message}</h2>`
    container.appendChild(box);
    return container;
}
const plotTextBox = (text) =>{
    const container = document.createElement("div");
    container.className = "text-box";
    container.innerHTML = `<p>${text}</p>`;
    return container;
}
const loadBoard = (player) =>{
    const container = document.createElement("div");
    container.className = "gameboard";
    container.setAttribute("id", player.name.toLowerCase());
   const getGameboard = player.board;

       for (let i = 0; i < getGameboard.rows; i++)
       {
           for (let j = 0; j<getGameboard.cols; j++)
           {
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
const updateBoard = (player) =>{
       const getSquares = document.querySelector(".gameboard").childNodes;

       getSquares.forEach((item) => {
           const parsedRow = item.getAttribute("row");
           const parsedCol = item.getAttribute("col");
           if(player.board.grid[parsedRow][parsedCol] === "hit")
           {
               item.classList.add("hit");
           } else if(player.board.grid[parsedRow][parsedCol] === "miss")
           {
               item.classList.add("miss");
           } 
       });
   }
const middleSection = (ships) =>{
    const container = document.createElement("div");
    container.className="shipsBox | display-flex-row bottom-spacing-1";

    ships.forEach((ship) => {
        const createBox = document.createElement("div");
        createBox.className = "display-flex-row";
        createBox.innerHTML = `
        <p>${ship.name}</p>
        <p>${ship.length - ship.hits}</p>`

        container.appendChild(createBox);
    });

    return container;
}
const plotGame = (game) =>{
    //game -> returns object of player's board game.receiver();
    const container = document.createElement("div");
    container.className = "playerBoard";
    container.appendChild(plotBanner(`${game.getAttacker().name}`));
    container.appendChild(middleSection(game.getReceiver().board.ships));
    container.appendChild(loadBoard(game.getReceiver()));
    container.appendChild(playAgainButton());
    container.appendChild(plotTextBox(`${game.getAttacker().name}'s turn to attack ${game.getReceiver().name}`));

return container;

}

const playAgainButton = () =>{
    const button = document.createElement("button");
    button.setAttribute("id", "play-again");
    button.textContent = "Play again";
    return button;
}
const loadPlayAgainMenu =(winner, loser) =>{

    const playAgainMenu = document.createElement("div");
    playAgainMenu.className = "menu-box";
    playAgainMenu.innerHTML = `
    <h2>${winner} has defeated ${loser}</h2>
    <p>Would you like to play again?</p>
    <button class="" id="play-again">Play Again</button>
    `;

    return playAgainMenu;
}


export {
    plotShips, 
    plotShip, 
    plotMessage, 
    removeRender,
    plotAllShipsRandomly,
    plotRandomPlacement, 
    removeAllChildNodes, 
    clearBoard,
    plotGame,
    plotTextBox,
    plotBanner,
    updateBoard,
    loadBoard,
    loadPlayAgainMenu
}
