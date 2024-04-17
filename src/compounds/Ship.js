import {v4 as uuidv4} from 'uuid'

class Ship{
  constructor(name, length){
    this.id = uuidv4()
    this.name = name;
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
}

export default Ship;
