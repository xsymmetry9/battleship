import {randomAttack, randomPlacement} from './Random';
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

    console.log(`${row}-${col}`);
    console.log(plot);


    if(this.opponentBoard.receiveAttack(this.opponentBoard, row, col) === "hit")
    {
      plot.classList.add("hit");
      return `${this.name} had a good hit`; 
    } else {
      plot.classList.add("miss");
      return `${this.name} missed`;
    };
  }
//Player chooses to attack randomly on the opponent's board.
  randomAttack(){
    const coordinates = randomAttack(this.opponentBoard);
    const row = coordinates[0];
    const col = coordinates[1];

    return this.attack(row, col);
  }
}

export default Player;
