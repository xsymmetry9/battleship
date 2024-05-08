import {getRandomCoordinates, randomPlacement} from './Random';
import {plotShip} from './Plot';

class Player {
  constructor(name, gameboard, opponentBoard, isHuman)
  {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;

  }
  //Places ships randomly on the board.
  placeRandomToBoard(){
    this.board.ships.forEach((ship) => {
      randomPlacement(this.board, ship);
    });
    return this.opponentBoard.ships;
  }
//A function that places ships on the board manually.
  placeShip(ship, row, col)
  {
    if (!ship.deploy && this.board.placeShip(ship, row, col)){
      plotShip(this.name, row, col, ship.length, ship.orientation);
      return this.board.grid;

    } else {
      return "Ship has already been deployed.  Tried again"
    }

  }
//Player chooses to attack on the opponent's board.
  attack(enemyBoardName, row, col){
    const plot = document.getElementById(`${enemyBoardName}-${row}-${col}`);

    if(this.opponentBoard.receiveAttack(row, col) === "hit")
    {
      plot.classList.add("hit");
      return true; 
    } else {
      plot.classList.add("miss");
      return false;
    };
  }
//Player chooses to attack randomly on the opponent's board.
  randomAttack(enemyBoardName){
    const coordinates = getRandomCoordinates(this.opponentBoard);
    const row = coordinates[0];
    const col = coordinates[1];
    console.log("random attack executed");
    return this.attack(enemyBoardName, row, col);
  }
}

export default Player;
