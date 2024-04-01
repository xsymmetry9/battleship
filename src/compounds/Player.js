class Player {
  constructor(name, gameboard, opponentBoard, isHuman)
  {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
    this.ships = [];
  }
  generateCoordinates()
  {
    const random = (num) =>{
      return Math.floor(Math.random() * num);
    }

    let col = random(this.opponentBoard.cols);
    let row = random(this.opponentBoard.rows);

    if (this.opponentBoard.grid[col][row] !== "miss" && this.opponentBoard.grid[col][row] !== "hit" )
    {
      return [col, row];
    } else{
      return this.generateCoordinates();
    }

  }

  placeShip(ship, row, col, orientation)
  {
    this.ships.push(ship);
    return this.board.placeShip(ship, row, col, orientation);
  }

  attack(row, col){
    this.opponentBoard.receiveAttack(row, col);

    return this.opponentBoard.grid[row][col];
  }

  randomAttack(){
    const coordinates = this.generateCoordinates();
    const row = coordinates[0];
    const col = coordinates[1];

    this.attack(row, col);

    return `Coordindates: ${[row, col]} ${this.opponentBoard.grid[row][col]}`;
  }
 
}

export default Player;
