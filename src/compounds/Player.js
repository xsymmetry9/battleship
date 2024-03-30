class Player {
  constructor(name, gameBoard)
  {
    this.name = name;
    this.board = gameBoard;
    this.ships = [];
  }

  placeShip(ship, row, col, orientation)
  {
    return this.board.placeShip(ship, row, col, orientation);
  }

  attack(row, col)
  {
    return this.board.receiveAttack(row, col);
  }
}

export default Player;
