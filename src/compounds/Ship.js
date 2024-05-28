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
  
  hit = () => this.hits++;

  isSunk = () => this.length - this.hits === 0 ? true : false;

  deleteCoordinates = () => this.coordinate.splice(0, this.coordinate.length); //returns an empty array 
  
  toggleOrientation = () => this.orientation === "horizontal" ? this.setOrientation("vertical") : this.setOrientation("horizontal");

  setOrientation = (newOrientation) => this.orientation = newOrientation;
  
}

export default Ship;
