const figlet = require("figlet");
const nReadlines = require("n-readlines");
const data = new nReadlines("..\\data.txt");
const data2 = new nReadlines("..\\data_example2.txt");

class BoardPosition {
  x: number;
  y: number;

  isStart: boolean;

  wasVisitedByTail = false;
  wasVisitedByHead = false;

  isHeadOnPosition = false;
  isTailOnPosition = false;

  constructor(x: number, y: number, isStart: boolean = false) {
    this.x = x;
    this.y = y;
    this.isStart = isStart;
    if (isStart) {
      this.wasVisitedByHead = true;
      this.wasVisitedByTail = true;
      this.isHeadOnPosition = true;
      this.isTailOnPosition = true;
    }
  }
  moveHeadOnPosition() {
    this.wasVisitedByHead = true;
    this.isHeadOnPosition = true;
  }
  moveHeadOffPosition() {
    this.isHeadOnPosition = false;
  }

  moveTailOnPosition() {
    this.wasVisitedByTail = true;
    this.isTailOnPosition = true;
  }
  moveTailOffPosition() {
    this.isTailOnPosition = false;
  }

  getSign() {
    if (this.isHeadOnPosition) return "H";
    else if (this.isTailOnPosition) return "T";
    else if (this.isStart) return "s";
    // else if (this.wasVisitedByHead) return "x";
    else if (this.wasVisitedByTail) return "#";
    else return ".";
  }

  getFinalSign() {
    if (this.isStart) return "s";
    else if (this.wasVisitedByTail) return "#";
    else return ".";
  }
}

class Board {
  startingPosition = {
    x: 0,
    y: 0,
  };

  headPosition = {
    x: 0,
    y: 0,
  };

  tailPosition = {
    x: 0,
    y: 0,
  };

  board: BoardPosition[][] = [];

  isPart2 : boolean;

  part2Tails = [
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: false
    },
    {
        position: {x: 0, y: 0},
        isFinalTail: true
    }
  ];

  constructor(
    boardWidth: number,
    boardHeight: number,
    isPart2: boolean,
    startingPosition: { x: number; y: number } = { x: 0, y: boardHeight - 1 }
  ) {
    for (let y = 0; y < boardHeight; y++) {
      this.board[y] = [];
      for (let x = 0; x < boardWidth; x++) {
        this.board[y][x] = new BoardPosition(
          x,
          y,
          x === startingPosition.x && y === startingPosition.y
        );
      }
    }

    this.isPart2 = isPart2;
    this.startingPosition = startingPosition;
    this.headPosition = Object.create(startingPosition);
    this.tailPosition = Object.create(startingPosition);

    if(isPart2) {
        this.part2Tails = [
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: false
            },
            {
                position: Object.create(startingPosition),
                isFinalTail: true
            }
        ]
    }
  }

  calculateDistanceBetweenHeadAndTail(
    possiblePosX: number = this.tailPosition.x,
    possiblePosY: number = this.tailPosition.y
  ) {
    return Math.sqrt(
      Math.pow(this.headPosition.x - possiblePosX, 2) +
        Math.pow(this.headPosition.y - possiblePosY, 2)
    );
  }

  static calculateDistanceBetweenObjects(objA_x : number, objA_y : number, objB_x : number, objB_y : number) {
    return Math.sqrt(
        Math.pow(objA_x - objB_x, 2) +
          Math.pow(objA_y - objB_y, 2)
      );
  }

  isHeadOnTail() {
    return (
      this.headPosition.x === this.tailPosition.x &&
      this.headPosition.y === this.tailPosition.y
    );
  }

  moveHead(direction: string) {
    const distanceToMove = Number(direction.split(" ")[1]);
    const directionToMove = direction.split(" ")[0];

    switch (directionToMove) {
      case "R":
        for (let i = 0; i < distanceToMove; i++) {
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOffPosition();
          this.headPosition.x++;
          if (this.headPosition.x >= this.board[0].length) {
            this.headPosition.x = 0;
          }
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOnPosition();
        //   board.printBoard();
        //   console.log("");
          this.moveTailCloserToHead();
        //   board.printBoard();
        //   console.log("");
        }
        break;
      case "L":
        for (let i = 0; i < distanceToMove; i++) {
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOffPosition();
          this.headPosition.x--;
          if (this.headPosition.x < 0) {
            this.headPosition.x = this.board[0].length - 1;
          }
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOnPosition();
        //   board.printBoard();
        //   console.log("");
          this.moveTailCloserToHead();
        //   board.printBoard();
        //   console.log("");
        }
        break;
      case "U":
        for (let i = 0; i < distanceToMove; i++) {
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOffPosition();
          this.headPosition.y--;
          if (this.headPosition.y < 0) {
            this.headPosition.y = this.board.length - 1;
          }
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOnPosition();
        //   board.printBoard();
        //   console.log("");
          this.moveTailCloserToHead();
        //   board.printBoard();
        //   console.log("");
        }
        break;
      case "D":
        for (let i = 0; i < distanceToMove; i++) {
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOffPosition();
          this.headPosition.y++;
          if (this.headPosition.y >= this.board.length) {
            this.headPosition.y = 0;
          }
          this.board[this.headPosition.y][
            this.headPosition.x
          ].moveHeadOnPosition();
        //   board.printBoard();
        //   console.log("");
          this.moveTailCloserToHead();
        //   board.printBoard();
        //   console.log("");
        }
        break;
      default:
        throw new Error("Unknown direction!");
        break;
    }
  }

  moveObjectToObject(requiredDistance: number = 2, objA_x : number, objA_y : number, objB_x : number, objB_y : number) {
    if (Board.calculateDistanceBetweenObjects(objA_x, objB_x, objA_y, objB_y) >= requiredDistance) {
        if (
            Board.calculateDistanceBetweenObjects(
            objA_x + 1, objA_y,
            objB_x, objB_y
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.x++;
          if (this.tailPosition.x >= this.board[0].length) {
            this.tailPosition.x = 0;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        } else if (
          this.calculateDistanceBetweenHeadAndTail(
            this.tailPosition.x - 1,
            this.tailPosition.y
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.x--;
          if (this.tailPosition.x < 0) {
            this.tailPosition.x = this.board[0].length - 1;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        } else if (
          this.calculateDistanceBetweenHeadAndTail(
            this.tailPosition.x,
            this.tailPosition.y + 1
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.y++;
          if (this.tailPosition.y >= this.board.length) {
            this.tailPosition.y = 0;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        } else if (
          this.calculateDistanceBetweenHeadAndTail(
            this.tailPosition.x,
            this.tailPosition.y - 1
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.y--;
          if (this.tailPosition.y < 0) {
            this.tailPosition.y = this.board.length - 1;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        } else if (
          this.calculateDistanceBetweenHeadAndTail(
            this.tailPosition.x + 1,
            this.tailPosition.y + 1
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.x++;
          this.tailPosition.y++;
          if (this.tailPosition.x >= this.board[0].length) {
            this.tailPosition.x = 0;
          }
          if (this.tailPosition.y >= this.board.length) {
            this.tailPosition.y = 0;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        } else if (
          this.calculateDistanceBetweenHeadAndTail(
            this.tailPosition.x - 1,
            this.tailPosition.y - 1
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.x--;
          this.tailPosition.y--;
          if (this.tailPosition.x < 0) {
            this.tailPosition.x = this.board[0].length - 1;
          }
          if (this.tailPosition.y < 0) {
            this.tailPosition.y = this.board.length - 1;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        } else if (
          this.calculateDistanceBetweenHeadAndTail(
            this.tailPosition.x + 1,
            this.tailPosition.y - 1
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.x++;
          this.tailPosition.y--;
          if (this.tailPosition.x >= this.board[0].length) {
            this.tailPosition.x = 0;
          }
          if (this.tailPosition.y < 0) {
            this.tailPosition.y = this.board.length - 1;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        } else if (
          this.calculateDistanceBetweenHeadAndTail(
            this.tailPosition.x - 1,
            this.tailPosition.y + 1
          ) <= 1
        ) {
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOffPosition();
          this.tailPosition.x--;
          this.tailPosition.y++;
          if (this.tailPosition.x < 0) {
            this.tailPosition.x = this.board[0].length - 1;
          }
          if (this.tailPosition.y >= this.board.length) {
            this.tailPosition.y = 0;
          }
          this.board[this.tailPosition.y][
            this.tailPosition.x
          ].moveTailOnPosition();
        }
      }
  }

  moveTailCloserToHead(requiredDistance: number = 2) {
    if(!this.isPart2) {
        if (this.calculateDistanceBetweenHeadAndTail() >= requiredDistance) {
            if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x + 1,
                this.tailPosition.y
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.x++;
              if (this.tailPosition.x >= this.board[0].length) {
                this.tailPosition.x = 0;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            } else if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x - 1,
                this.tailPosition.y
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.x--;
              if (this.tailPosition.x < 0) {
                this.tailPosition.x = this.board[0].length - 1;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            } else if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x,
                this.tailPosition.y + 1
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.y++;
              if (this.tailPosition.y >= this.board.length) {
                this.tailPosition.y = 0;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            } else if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x,
                this.tailPosition.y - 1
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.y--;
              if (this.tailPosition.y < 0) {
                this.tailPosition.y = this.board.length - 1;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            } else if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x + 1,
                this.tailPosition.y + 1
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.x++;
              this.tailPosition.y++;
              if (this.tailPosition.x >= this.board[0].length) {
                this.tailPosition.x = 0;
              }
              if (this.tailPosition.y >= this.board.length) {
                this.tailPosition.y = 0;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            } else if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x - 1,
                this.tailPosition.y - 1
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.x--;
              this.tailPosition.y--;
              if (this.tailPosition.x < 0) {
                this.tailPosition.x = this.board[0].length - 1;
              }
              if (this.tailPosition.y < 0) {
                this.tailPosition.y = this.board.length - 1;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            } else if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x + 1,
                this.tailPosition.y - 1
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.x++;
              this.tailPosition.y--;
              if (this.tailPosition.x >= this.board[0].length) {
                this.tailPosition.x = 0;
              }
              if (this.tailPosition.y < 0) {
                this.tailPosition.y = this.board.length - 1;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            } else if (
              this.calculateDistanceBetweenHeadAndTail(
                this.tailPosition.x - 1,
                this.tailPosition.y + 1
              ) <= 1
            ) {
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOffPosition();
              this.tailPosition.x--;
              this.tailPosition.y++;
              if (this.tailPosition.x < 0) {
                this.tailPosition.x = this.board[0].length - 1;
              }
              if (this.tailPosition.y >= this.board.length) {
                this.tailPosition.y = 0;
              }
              this.board[this.tailPosition.y][
                this.tailPosition.x
              ].moveTailOnPosition();
            }
          }
    }
    else {
        let keysOfTail = Object.keys(this.part2Tails);
        for(let i=0; i < keysOfTail.length; i++) {
            if(i === 0)
            {
                if(Board.calculateDistanceBetweenObjects(this.headPosition.x, this.part2Tails[i].position.x, this.headPosition.y, this.part2Tails[i].position.y) >= 2)
                {

                }
            }
        }

    }
  }

  printBoard() {
    this.board.forEach((element) => {
      console.log(element.map((element) => element.getSign()).join(""));
    });
  }

  printFinalBoard() {
    this.board.forEach((element) => {
      console.log(element.map((element) => element.getFinalSign()).join(""));
    });
  }

  getVisitedAtLeastOnce() {
    let visitedAtLeastOnce = 0;
    this.board.forEach((element) => {
      element.forEach((element) => {
        if (element.wasVisitedByTail) {
          visitedAtLeastOnce++;
        }
      });
    });
    return visitedAtLeastOnce;
  }
}

console.log(figlet.textSync("Day 9 - Rope Bridge"));

let line;
let lines = [];
while ((line = data.next())) {
  lines.push(line.toString("ascii"));
}

let board = new Board(4000, 4000, false, { x: 2000, y: 2000 });

for (let i = 0; i < lines.length; i++) {
  board.moveHead(lines[i]);
}
console.log("Part 1: ");
let visitedAtLeastOnce = board.getVisitedAtLeastOnce();
console.log("Visited at least once: " + visitedAtLeastOnce);
// 6256

lines = [];
while ((line = data2.next())) {
    lines.push(line.toString("ascii"));
}

console.log("Part 2: ");
console.log("Not implemented yet");
// let newBoard = new Board(100, 100, false, { x: 50, y: 50 });

// for (let i = 0; i < lines.length; i++) {
//     newBoard.moveHead(lines[i]);
// }
// let visitedAtLeastOnce2 = newBoard.getVisitedAtLeastOnce();
// console.log("Visited at least once: " + visitedAtLeastOnce2);
// newBoard.printFinalBoard();

