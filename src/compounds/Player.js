import { getRandomCoordinates } from './Random';

class Player {
  constructor(name, gameboard, opponentBoard, isHuman) {
    this.name = name;
    this.board = gameboard;
    this.opponentBoard = opponentBoard;
    this.isHuman = isHuman;
  }

  // Player chooses to attack on the opponent's board.
  attack(enemyBoardName, row, col) {
    const plot = document.getElementById(`${enemyBoardName}-${row}-${col}`);

    if (plot.classList.contains("hit") || plot.classList.contains("miss")) {
      console.warn("Already attacked this position");
      return false;
    }

    const attackResult = this.opponentBoard.receiveAttack(row, col);

    this.updateAttackResult(plot, attackResult);
    return attackResult === "hit";
  }

  // Player chooses to attack randomly on the opponent's board.
  randomAttack(enemyBoardName) {
    const [row, col] = getRandomCoordinates(this.opponentBoard);
    console.log("Random attack executed");
    return this.attack(enemyBoardName, row, col);
  }

  // Update the UI based on the attack result
  updateAttackResult(plot, result) {
    if (result === "hit") {
      plot.classList.add("hit");
    } else if (result === "miss") {
      plot.classList.add("miss");
    }
  }
}

export default Player;
