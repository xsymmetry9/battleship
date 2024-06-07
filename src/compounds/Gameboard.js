import Ship from './Ship';
class Gameboard{
  constructor() {
    this.rows = 10; 
    this.cols = 10;
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
    this.ships = [
      new Ship("Assault Ship", 3),
      new Ship("Aircraft Carrier", 5),
      new Ship("Destroyer", 7),
      new Ship("Cruiser", 3),
      new Ship("Submarine", 4)   
    ];
  }
  reset(){
    this.clearGrid();
    this.isAllShipsDeployed();
  }
  //Clears the board.
  clearGrid(){
    this.grid.forEach(row => row.fill(null));
    this.changeAllShiptoNotDeployed();
  }
  //Checks if there are any ships on the board and if it fits.
  isValid(ship, row, col, orientation){
    if(orientation === "horizontal"){
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
        
    } else if(orientation === "vertical") {
        if(row + ship.length > this.rows) {
          return false //"Ship doesn't fit vertically"; //Ship doesn't fit.
          } else {
            let index = 0;
            while(index < ship.length) {
              if(this.grid[row + index][col] !== null) {
                
                return false //"A ship is already at this location vertically."; //A ship is current in that location
               //A ship is current in that location
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
//Places the ship on the board.
  placeShip(ship, row, col, orientation){
    if(!this.isValid(ship, row, col, orientation))
    return ship.deploy; //false
    
    if(orientation === "horizontal")
      {
        //checks for overlaps or out of bounds
        for(let index = 0; index < ship.length; index++)
         {
           this.grid[row][col + index] = ship;
           ship.coordinate.push([row, col + index]);
        }
        ship.deploy = true;
        return ship.deploy;
      } else if(orientation === "vertical"){ //direction is horizontal
        //if everything passes, place the ship vertically
        for(let index = 0; index < ship.length; index++){
          this.grid[row + index][col] = ship;
          ship.coordinate.push([row + index, col]);

        }
        ship.deploy = true;
        return ship.deploy;
      } else {
        return ship.deploy;
      }

    } 
  getShipInfo(row, col)
    {
      return this.grid[row][col];
    }
  getShip(shipName){
      let result;
      this.ships.forEach((ship) => {
        if(ship.name === shipName) {
          result = ship;
        } else {
          return "ship not found";
        }
      });
      return result;
    }
  deleteShip(shipName){
      shipName.coordinate.forEach((item) =>{
        const row = item[0];
        const col = item[1];
        this.grid[row][col] = null;
      })
      return this.grid;
    }
  //Places an attack on the board.
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
  getMaxHits(){
    let sum = 0;
    this.ships.forEach(ship =>{
      sum+= ship.length;
    });
    return sum;
  }
  getHits(){
    let sum = 0;
    this.ships.forEach(ship =>{
      sum+= ship.hits;
    });
    return sum;
  }

  checksDifference(){
    return this.getMaxHits() - this.getHits();
  }

  //Checks if the game is over.
  isGameOver(){
    console.log(this.checksDifference());
    return this.checksDifference() === 0 ? true : false;
  }

  isAllShipsDeployed(){
    let result = true;
    this.ships.forEach((ship) => {
      if(!ship.deploy)
        result = false;
    });
    return result;
  }
  changeAllShiptoNotDeployed(){
    this.ships.map((ship) => 
      {
        ship.deploy = false;
        ship.deleteCoordinates();
        ship.setOrientation("horizontal");
    });
  }

}

export default Gameboard;
