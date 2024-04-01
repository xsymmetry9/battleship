import Ship from "./Ship"
import Gameboard from './Gameboard'
import Player from './Player'

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
    expect(gameBoard.receiveAttack(0,0)).toEqual("Hit! Opponent's turn");
    expect(gameBoard.receiveAttack(2,2)).toEqual("miss");
  });
  test("Should test for out of bounds and missed attacks", ()=>{
    expect(gameBoard.receiveAttack(3,3)).toEqual("out of bounds");
  });
  test("Should test for the ship if it has been sunk", ()=>{
    gameBoard.receiveAttack(0,0);
    expect(gameBoard.receiveAttack(0,1)).toEqual("Destroyer has been sunk");
  });
  test("How many boats are left in the grid", ()=>{
    gameBoard.receiveAttack(0,0);
    expect(gameBoard.checkBoats()).toEqual(true);
  });
});

describe ("Number of boats after serveral attacks", () =>{
 
  const gameboardPlayer1 = new Gameboard(5,5);
  const gameboardPlayer2 = new Gameboard(5,5);

  //creates player
  const player1 = new Player("Gary", gameboardPlayer1, gameboardPlayer2, true);
  const player2 = new Player("computer", gameboardPlayer2, gameboardPlayer1, false)

  //player1 places their ship
  const ship1 = new Ship("Destroyer", 3);
  const ship2 = new Ship("Destroyer", 3);
  const ship3 = new Ship("Destroyer", 3);
  player1.placeShip(ship1, 0, 0, "horizontal");
  player1.placeShip(ship3, 1, 0, "horizontal");
  test("Add ship in player1 inventory", () =>{
    expect(player1.ships).toEqual([ship1, ship3]);
  });

  //player2 places its ship
  player2.placeShip(ship2, 1,1, "vertical");

  test("Checks if the player is human", () =>{
    expect(player2.isHuman).toEqual(false);
  });

  test("player1 places the ship on (0,0) horizontal", () =>{
    expect(gameboardPlayer1.grid[0][0]).toEqual(ship1);
    expect(gameboardPlayer1.grid[0][1]).toEqual(ship1);
  });
  test("player2 places the ship on (1,1) vertical", () =>{
    expect(gameboardPlayer2.grid[1][1]).toEqual(ship2);
    expect(gameboardPlayer2.grid[2][1]).toEqual(ship2);
    expect(gameboardPlayer2.grid[3][1]).toEqual(ship2);
  });
  test("player 1 attacks player 2 gameboard. Sets the coordinate (0,0) and (1,1)", () =>{
    expect(player1.attack(1,1)).toBe("hit");

  });
  test("All ships have been sunk", () =>{
    expect(ship2.hits).toBe(1);
  });

  test(("Computer generates coordinates"), ()=>{
    player2.randomAttack();
    player2.randomAttack();
    player2.randomAttack();
    player2.randomAttack();
    player2.randomAttack();
    player2.randomAttack();
    player2.randomAttack();
    player2.randomAttack();
    expect(gameboardPlayer1.grid).toBe(true);
  })

});
