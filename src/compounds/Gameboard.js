class Gameboard{
  constructor(rows, cols) {
    this.rows = rows; //y-axis
    this.cols = cols; //x-axis
    this.grid = this.createGrid();
  }

  createGrid(){
    let grid = [];

    for(let i = 0; i<this.rows; i++)
    {
      let row = [];
      for(let j = 0; j<this.cols; j++)
      {
        row.push(null); //blank space
      }
      grid.push(row);
    }
    return grid;
  }
  placeShip(ship, row, col, direction){
    //Cruiser, 3, horizontal
    //[[null, null, null], [battleship, battleship, battleship], [null, null, null]]


    if(direction === "horizontal")
    {
      //checks for overlaps or out of bounds
      for(let index = 0; index < ship.length; index++)
      {
        if(col + index >= this.col || this.grid[row][col + index] !== null)
          return false; //Cannot place ship
      }
      for(let index = 0; index < ship.length; index++)
       {
         this.grid[row][col + index] = ship;
      }
    } else if (direction === "vertical") {

      //checks for overlaps or out of bounds
      for(let index = 0; index < ship.length; index++)
      {
        if(row + index >= this.rows || this.grid[row + index][col] !== null)
          return false;
      }
      //if everything passes, place the ship vertically
      for(let index = 0; index < ship.length; index++){
        this.grid[row + index][col] = ship;
      }

    } else{
       return "Invalid input";
    }
  }

  receiveAttack(x, y){

    if(x >= this.cols || y >=this.rows )
      return "out of bounds";
    if(this.grid[x][y] === null)
    {
      this.grid[x][y] = "miss"; //mark down miss
      return "miss";
    } else{
      const ship = this.grid[x][y];
      ship.hit();
      this.grid[x][y] = "hit";

      if(ship.isSunk())
      {
        return `${ship.name} has been sunk`;
      } else {
        return "Hit! Opponent's turn";
      }

    }
  }
  checkBoats(){
    const boats = new Set();

    for(let i = 0; i<this.rows; i++)
    {
      for(let j = 0; j<this.cols; j++)
      {
        if(this.grid[i][j] !== null && this.grid[i][j] !== "hit" && this.grid[i][j] !== "miss")
        {
          boats.add(this.grid[i][j]);
        }
      }
    }

    if(boats.size != 0)
    {
      return true
    } else {
      return false
    }
  }
}

export default Gameboard;
