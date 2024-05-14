import {v4 as uuidv4} from 'uuid'
const _DEFAULT_orientation  = "horizontal";

class Ship{
  constructor(name, length){
    this.id = uuidv4();
    this.name = name;
    this.coordinate = [];
    this.orientation = _DEFAULT_orientation;
    this.length = length;
    this.hits = 0;
    this.deploy = false;
  }
  
  hit(){
    this.hits++;
  }

  isSunk(){

    if((this.length - this.hits) === 0)
    {
      console.log(`${this.name} has been sunk`);
      return true 
    } else {
      console.log(`${this.name} has been hit ${this.hits} time.`);
      return false;
    }
  }
  deleteCoordinates(){
    return this.coordinate.splice(0, this.coordinate.length); //returns an empty array 
  }
  toggleOrientation(){
    this.orientation = this.orientation === "horizontal" ? "vertical" : "horizontal";
    
    return this.orientation;
  }
}

export default Ship;
