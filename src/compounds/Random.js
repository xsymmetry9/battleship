// Generates a random number depending on the number of columns and rows.
const generateNumber = (max) => {
  return Math.floor(Math.random() * max);
};

// Generate random coordinates within the game board.
const generateCoordinates = (gameboard) => {
  let col = generateNumber(gameboard.cols);
  let row = generateNumber(gameboard.rows);

  return [row, col];
};

// Generate a random placement on the board.
const randomPlacement = (gameboard, ship) => {
  let placed = false;
  while (!placed) {
      const [row, col] = generateCoordinates(gameboard);
      const orientation = Math.random() < 0.5 ? "vertical" : "horizontal";

      if (gameboard.isValid(ship, row, col, orientation)) {
          placed = gameboard.placeShip(ship, row, col, orientation);
      }
  }
};

// Perform a random attack on the gameboard.
const getRandomCoordinates = (gameboard) => {
  let validCoordinates = false;
  let coordinates;

  while (!validCoordinates) {
      coordinates = generateCoordinates(gameboard);

      if (gameboard.grid[coordinates[0]][coordinates[1]] !== "miss" &&
          gameboard.grid[coordinates[0]][coordinates[1]] !== "hit") {
          validCoordinates = true;
      }
  }
  return coordinates;
};

export { getRandomCoordinates, randomPlacement };
