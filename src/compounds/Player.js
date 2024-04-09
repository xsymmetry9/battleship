import Ship from './Ship';

const generateNumber = (num) =>{
  return Math.floor(Math.random() * num);
}
class Player {
  constructor(name, gameboard, opponentBoard, isHuman)
  {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
    this.ships = [
      new Ship("Assault Ship", 3),
      new Ship("Aircraft Carrier", 5),
      new Ship("Destroyer", 7),
      new Ship("Cruiser", 3),
      new Ship("Combat Ship", 1)   
    ];
  }

  generateCoordinates()
  {
    let col = generateNumber(this.opponentBoard.cols);
    let row = generateNumber(this.opponentBoard.rows);

    return [col, row];
  }

  placeRandomToBoard(){
    const array = [];

    const placeShip = (ship) =>{
      const coordinates = this.generateCoordinates();
      const direction = Math.random() < 0.5 ? "vertical": "horizontal";

      if (this.board.isValid(ship, coordinates[0], coordinates[1], direction))
      {
        this.placeShip(ship, coordinates[0], coordinates[1], direction);
        array.push({"ship": ship.name, "row": coordinates[0], "col": coordinates[1], "direction": direction});
      } else {
        placeShip(ship);
      }
    };
    this.ships.forEach(placeShip);
    return array;
  }

  placeShip(ship, row, col, orientation)
  {
    return this.board.placeShip(ship, row, col, orientation);
  }

  attack(row, col){
    return this.opponentBoard.receiveAttack(row, col);
  }
  randomAttack(){
    const findValidRandomCoordinates = () =>{
      const randomCoordinates = this.generateCoordinates();

      if (this.opponentBoard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && this.opponentBoard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit" )
      {
        return randomCoordinates;
      } else{
        return findValidRandomCoordinates();
      }
    }

    const coordinates = findValidRandomCoordinates();

    const row = coordinates[0];
    const col = coordinates[1];

    this.attack(row, col);

    return `Coordindates: ${[row, col]} ${this.opponentBoard.grid[row][col]}`;
  }
 
}

export default Player;
