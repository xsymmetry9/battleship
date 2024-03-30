import Ship from "./Ship"
import Gameboard from './Gameboard'
import Player from './Player'

test("Test the first ship", () =>{

  const battleship = new Ship("battleship", 2);

  expect(battleship).toEqual(
    {
      name: "battleship",
      length: 2,
      hits: 0,
    }
  );
})

describe("Gameboard", () =>{
  let gameBoard;

  beforeEach(() =>{
    gameBoard = new Gameboard(3,3)
  });

  test("Should create a grid", ()=>{
    expect(gameBoard.grid.length).toBe(3);
    expect(gameBoard.grid[1].length).toBe(3);
  });

  test("Should fail to place the ship horizontally", () =>{
    const cruiser = new Ship("Cruiser", 5);
    expect(gameBoard.placeShip(cruiser, 1, 1, "horizontal")).toBe(false);
  })

  test("Should place the ship horizontally", () =>{
    const ship = new Ship("Destroyer", 2);

    gameBoard.placeShip(ship, 0, 0, "horizontal");
    expect(gameBoard.grid[0][0]).toEqual(ship);
    expect(gameBoard.grid[0][1]).toEqual(ship);
  })

  test("Should fail to place the ship vertically", () =>{
    const cruiser = new Ship("Cruiser", 5);
    expect(gameBoard.placeShip(cruiser, 1, 1, "vertical")).toBe(false);
  })

  test("Should place the ship vertically", () =>{
    const ship = new Ship("Destroyer", 2);

    gameBoard.placeShip(ship, 0, 0, "vertical");
    expect(gameBoard.grid[0][0]).toEqual(ship);
    expect(gameBoard.grid[1][0]).toEqual(ship);
  })
});

describe ("Gameboard for attacking", () =>{
  let gameBoard;
  beforeEach(() =>{
    gameBoard = new Gameboard(3,3);
    const ship1 = new Ship("Destroyer", 2);
    gameBoard.placeShip(ship1, 0, 0, "horizontal");
  });
  test("Should return either hit or miss", ()=>{
    expect(gameBoard.receiveAttack(0,0)).toEqual("hit");
    expect(gameBoard.receiveAttack(2,2)).toEqual("missed");
  });
  test("Should test for out of bounds and missed attacks", ()=>{
    expect(gameBoard.receiveAttack(3,3)).toEqual("out of bounds");
  });
  test("Should test for the ship to be sunk", ()=>{
    gameBoard.receiveAttack(0,0);
    expect(gameBoard.receiveAttack(0,1)).toEqual("sunk");
  });
  test("How many boats are left in the grid", ()=>{
    gameBoard.receiveAttack(0,0);
    expect(gameBoard.checkBoats()).toEqual(true);
  });
});

describe ("Number of boats after serveral attacks", () =>{
  let gameboard;
  gameboard = new Gameboard(5,5);

  const player1 = new Player("Gary", gameboard);

  const ship1 = new Ship("Destroyer", 2);
  player1.placeShip(ship1, 0, 0, "horizontal");
  player1.receiveAttack(0,0);

  test("Checks if the player is human", () =>{
    expect(player1.name).toBe("Gary");
    expect(player1.board.cols).toBe(5);
    expect(player1.board.rows).toBe(5);
    // expect(player1.board.grid[0][0]).toEqual(ship1);
    expect(player1.board.grid[0][0]).toEqual("hit");
  });
});
