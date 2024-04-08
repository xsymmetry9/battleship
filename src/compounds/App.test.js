import Ship from "./Ship"
import Gameboard from './Gameboard'
import Player from './Player'

describe("Gameboard", () =>{
  let player1Board;
  let computerBoard;
  let player1;
  let computer;

  let ship;
  let ship2;
  let ship3;

  beforeEach(() =>{
    player1Board = new Gameboard();
    computerBoard = new Gameboard();

    player1 = new Player("Gary",player1Board, computerBoard, true);
    computer = new Player("Computer", computerBoard, player1Board, false);

    ship = player1.ships[0];
    ship2 = player1.ships[1];
    ship3 = player1.ships[2];

  });

  test("Creates grid", ()=>{
    expect(player1Board.grid.length).toBe(10);
    expect(player1Board.grid[1].length).toBe(10);
  });

  test("Creates Player 1", () =>{
    expect(player1.board.grid.length).toBe(10);
    expect(player1.ships.length).toBe(5);
    expect(player1.ships[0].name).toBe("Assault Ship");
  })
  test("Creates Computer", () =>{
    expect(computer.board.grid.length).toBe(10);
    expect(computer.ships.length).toBe(5);
    expect(computer.ships[1].name).toBe("Aircraft Carrier");
  })
  test("Test ships if invalid horizontally", () =>{

    expect(player1.board.isValid(ship, 0, 9, "horizontal")).toBe(false);
    // expect(player1.board.isValid(ship, 0, 5, "horizontal")).toEqual("Error: A ship is already present at this location horizontally.");
    expect(player1.board.isValid(ship, 5, 5, "horizontal")).toBe(true);
  });

  test("Test vertical ships if it is invalid", () =>{
    player1.placeShip(ship2, 0, 0, "horizontal");
    expect(player1.board.isValid(ship, 0, 6, "vertical")).toBe(true);
    expect(player1.board.isValid(ship, 0, 0, "vertical")).toBe(false);
    expect(player1.board.isValid(ship, 0, 2, "vertical")).toBe(false);
    expect(player1.board.isValid(ship, 0, 1, "vertical")).toBe(false);
    expect(player1.board.isValid(ship, 9, 1, "vertical")).toBe(false);
  });

  test("Placement of ships", () =>{
    expect(player1.placeRandomToBoard().length).toBe(5); 
    expect(player1.placeRandomToBoard().length).toBe(5); 
  
  })

});


