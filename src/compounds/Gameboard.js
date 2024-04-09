class Gameboard{
  constructor() {
    this.rows = 10; 
    this.cols = 10;
    this.grid = this.createGrid();
    this.boats = this.checkBoats();
  }

  createGrid(){
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
  }

  clearGrid(){
    this.grid.forEach(row => row.fill(null));
  }

  isValid(ship, row, col, direction){
    if(direction === "horizontal"){
      if(col + ship.length > this.cols)
      {
        return false // "Error: Ship doesn't fit horizontally.";
      } else {
        let index = 0;
        while (index < ship.length)
        {
          if(this.grid[row][col + index] !== null){
            return false //"Error: A ship is already present at this location horizontally."; //A ship is current in that location
          }
          index ++;         
        }
        return true; //Pass all test
      }
        
    } else if(direction === "vertical") {
        if(row + ship.length > this.rows) {
          return false //"Ship doesn't fit vertically"; //Ship doesn't fit.
          } else {
            let index = 0;
            while(index < ship.length) {
              if(this.grid[row + index][col] !== null) {
              return false //"A ship is already at this location vertically."; //A ship is current in that location
                }
              index++;
              }
            return true;

            } 
          }
    else {
    return false //"Invalid direction"; //invalid name
    }
  }

  placeShip(ship, row, col, direction){
    if(!this.isValid(ship, row, col, direction))
    return;
    
    if(direction === "horizontal")
      {
        //checks for overlaps or out of bounds
        for(let index = 0; index < ship.length; index++)
         {
           this.grid[row][col + index] = ship;
        }
      } else if(direction === "vertical"){ //direction is horizontal
        //if everything passes, place the ship vertically
        for(let index = 0; index < ship.length; index++){
          this.grid[row + index][col] = ship;
        }
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
      return "hit";
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

    return boats;
  }

  isGameOver(){
    if(this.checkBoats().size == 0)
    {
      return true;
    }
    else{
      return false;
    }
  }
}

 

export default Gameboard;
