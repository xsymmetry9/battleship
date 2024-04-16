import {randomAttack, randomPlacement} from './Random';

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
  placeShip(ship, row, col, orientation)
  {
    return this.board.placeShip(ship, row, col, orientation);
  }
//Player chooses to attack on the opponent's board.
  attack(row, col){
    const plot = document.getElementById(`${this.name}-${row}-${col}`);

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
