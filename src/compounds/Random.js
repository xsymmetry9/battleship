//Generates random number depending on the number of columns and rows.
const generateNumber = (max) =>{
    return Math.floor(Math.random() * max);
}

//Generate random coordinates within the game board
const generateCoordinates = (gameboard) =>{
    let col = generateNumber(gameboard.cols);
    let row = generateNumber(gameboard.rows);
  
    return [col, row];
}

//Generate a random placement on the board.
const randomPlacement = (gameboard, ship) =>{
    const coordinates = generateCoordinates(gameboard);
    const orientation = Math.random() < 0.5 ? "vertical": "horizontal";
   

    if (gameboard.isValid(ship, coordinates[0], coordinates[1], orientation))
    {
      return gameboard.placeShip(ship, coordinates[0], coordinates[1], orientation);
    } else {
      randomPlacement(gameboard, ship);
    }
  };

//Perform a random attack on the gameboard
const getRandomCoordinates = (gameboard) =>{

    let randomCoordinates = generateCoordinates(gameboard); //returns array

    if (gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && gameboard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit" )
    {
      return randomCoordinates;
    } else{
      return getRandomCoordinates(gameboard);
    }
}

export {getRandomCoordinates, randomPlacement}