//to do
//check for stable pattern?
//sliders
//classes
// spawn with white fields

let cols;
let rows;

let resolution = 10;
let grid;
let next;
let isGameRunning = false;
let fadeIndex = 8;
let mutatetionIndex = 150;

function setup() {
  createCanvas(600, 600);

  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = {
        state: 0,
        isAlive: false,
        cellColor: makeRandomColor()
      };
    }
  }
}

function draw() {
  background(0);
  fadeIndex = document.getElementById("fadeIndex").value;
  mutatetionIndex = document.getElementById("mutatetionIndex").value;

  if (mouseButton == LEFT && mouseIsPressed == true) {
    handleMouseClick();
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j].state == 0) {
        fill(0);
      } else {
        fill(
          grid[i][j].cellColor.red,
          grid[i][j].cellColor.green,
          grid[i][j].cellColor.blue,
          255 - floor(grid[i][j].state * fadeIndex)
        );
        
      }
      strokeWeight(0);
      rect(x, y, resolution, resolution);
    }
  }

  if (isGameRunning) {
    let next = make2DArray(cols, rows);

    //compute next grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j].state;
        let isAlive = grid[i][j].isAlive;
        let cellColor = grid[i][j].cellColor;

        let neighbors = countNeighbors(grid, i, j);

        if (isAlive == false && neighbors == 3) {
          neighborColors = getNeighborColors(grid, i, j);
          next[i][j] = {
            state: 1,
            isAlive: true,
            cellColor: calculateColor(neighborColors)
          };
        } else if (isAlive == true && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = {
            state: state + 1,
            isAlive: false,
            cellColor: cellColor
          };
        } else if (state > 1) {
          next[i][j] = {
            state: state + 1,
            isAlive: false,
            cellColor: cellColor
          };
        } else {
          next[i][j] = {
            state: state,
            isAlive: isAlive,
            cellColor: cellColor
          };
        }
       
      }
    }
    grid = next;
  }
}

function calculateColor(colors) {
  let randomNumber = Math.floor(Math.random() * (mutatetionIndex - 1) + 1);

  if (randomNumber == 1) {
    outputColor = makeRandomColor();
  } else {
    outputColor = colors[Math.floor(Math.random() * colors.length)];
  }

  return outputColor;
}

function getNeighborColors(grid, x, y) {
  let outputColors = [];

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;

      let row = (y + j + rows) % rows;

      if (grid[col][row].isAlive == true) {
        let red = grid[col][row].cellColor.red;
        let green = grid[col][row].cellColor.green;
        let blue = grid[col][row].cellColor.blue;
        outputColors.push({ red: red, green: green, blue: blue });
      }
    }
  }
  return outputColors;
}

function makeRandomColor() {
  var randomColor;

  randomColor = {
    red: floor(random() * 255),
    green: floor(random() * 255),
    blue: floor(random() * 255),
  };
  return randomColor;
}

function countNeighbors(grid, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;

      let row = (y + j + rows) % rows;

      if (grid[col][row].isAlive == true) {
        sum += 1;
      }
    }
  }
  if (grid[x][y].isAlive == true) {
    sum = sum - 1;
  }
  if (sum < 0) {
    sum = 0;
  }
  return sum;
}

function StartGame() {
  isGameRunning = true;
}

function StopGame() {
  isGameRunning = false;
}

function Randomize() {
  isGameRunning = false;
  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (floor(random(2)) == 1) {
        next[i][j] = {
          state: 1,
          isAlive: true,
          cellColor: makeRandomColor(),
        };
      } else {
        next[i][j] = {
          state: 0,
          isAlive: false,
          cellColor: makeRandomColor(),
        };
      }
    }
  }
  grid = next;
}

function RestartGame() {
  isGameRunning = false;
  currentColorRed = floor(random() * 255);
  currentColorGreen = floor(random() * 255);
  currentColorBlue = floor(random() * 255);
  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      next[i][j] = { state: 0, isAlive: false};
    }
  }
  grid = next;
}
function handleMouseClick() {
  let xCor = Math.floor(mouseX / resolution);
  let yCor = Math.floor(mouseY / resolution);
  if (xCor >= 0 && xCor < cols && yCor >= 0 && rows) {
    grid[xCor][yCor] = {
      state: 1,
      isAlive: true,
      cellColor: makeRandomColor(),
    };
  }
}
function makeWhiteColor() {
  return { red: 255, green: 255, blue: 255 };
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}
