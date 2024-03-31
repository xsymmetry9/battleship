class Player {
  constructor(name, gameboard, opponentBoard, isHuman)
  {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
    this.ships = [];
  }

  placeShip(ship, row, col, orientation)
  {
    this.ships.push(ship);
    return this.board.placeShip(ship, row, col, orientation);
  }

  attack(row, col)
  {
    return this.opponentBoard.receiveAttack(row, col);
  }
}

export default Player;
