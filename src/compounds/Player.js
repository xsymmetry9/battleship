import Ship from './Ship';
import {randomAttack} from './Random';

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
    return `${this.name} attacks and it ${this.opponentBoard.receiveAttack(row, col)} at [${row}, ${col}].`;
  }
  randomAttack(){
    // const findValidRandomCoordinates = (count = 0) =>{
    //   const randomCoordinates = this.generateCoordinates();

    //   if (this.opponentBoard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "miss" && this.opponentBoard.grid[randomCoordinates[0]][randomCoordinates[1]] !== "hit" )
    //   {
    //     console.log(count);
    //     return randomCoordinates;
    //   } else{
    //     count++;
    //     return findValidRandomCoordinates(count);
    //   }
    // }

    const coordinates = randomAttack(this.opponentBoard);
    // const coordinates = findValidRandomCoordinates();

    const row = coordinates[0];
    const col = coordinates[1];

    return this.attack(row, col);
  }
 
}

export default Player;
