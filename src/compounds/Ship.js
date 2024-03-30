class Ship{
  constructor(name, length){
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
