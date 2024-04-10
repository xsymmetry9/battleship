const generateNumber = (max) =>{
    return Math.floor(Math.random() * max);
}

//Generate random coordinates within the game board
const generateCoordinates = (gameboard) =>{
    let col = generateNumber(gameboard.cols);
    let row = generateNumber(gameboard.rows);
  
    return [col, row];
}

//Perform a random attack on the gameboard
const randomAttack = (gameboard) =>{

    let randomCoordinates = generateCoordinates(gameboard); //returns array

    if (gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit" )
    {
      return randomCoordinates;
    } else{
      return randomAttack(gameboard);
    }
}

export {randomAttack}