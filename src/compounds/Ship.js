import {v4 as uuidv4} from 'uuid'

class Ship{
  constructor(name, length){
    this.id = uuidv4()
    this.name = name;
    this.length = length;
    this.hits = 0;
  }

  hit(){
    this.hits++;
  }

  isSunk(){
    if(this.hits >= this.length){
      return true;
    } else {
      return false;
    }
  }
}

export default Ship;
