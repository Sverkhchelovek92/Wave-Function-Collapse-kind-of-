const startBtn = document.querySelector(".start-btn");
const field = document.querySelector(".field");

const tilesObjects = [
  {
    id: "01",
    src: "tiles/01.png",
    up: 1,
    right: 1,
    down: 1,
    left: 1,
  },
  {
    id: "02",
    src: "tiles/02.png",
    up: 0,
    right: 1,
    down: 1,
    left: 1,
  },
  {
    id: "03",
    src: "tiles/03.png",
    up: 1,
    right: 0,
    down: 1,
    left: 1,
  },
  {
    id: "04",
    src: "tiles/04.png",
    up: 1,
    right: 1,
    down: 0,
    left: 1,
  },
  {
    id: "05",
    src: "tiles/05.png",
    up: 1,
    right: 1,
    down: 1,
    left: 0,
  },
  {
    id: "06",
    src: "tiles/06.png",
    up: 1,
    right: 0,
    down: 1,
    left: 0,
  },
  {
    id: "07",
    src: "tiles/07.png",
    up: 0,
    right: 1,
    down: 0,
    left: 1,
  },
  {
    id: "08",
    src: "tiles/08.png",
    up: 0,
    right: 1,
    down: 1,
    left: 0,
  },
  {
    id: "09",
    src: "tiles/09.png",
    up: 0,
    right: 0,
    down: 1,
    left: 1,
  },
  {
    id: "10",
    src: "tiles/10.png",
    up: 1,
    right: 0,
    down: 0,
    left: 1,
  },
  {
    id: "11",
    src: "tiles/11.png",
    up: 1,
    right: 1,
    down: 0,
    left: 0,
  },
  {
    id: "12",
    src: "tiles/12.png",
    up: 0,
    right: 0,
    down: 0,
    left: 0,
  },
];

// Function to create field

function createField() {
  for (let i = 0; i < 16; i++) {
    const emptySquare = document.createElement("div");
    emptySquare.classList = "empty_square";
    emptySquare.id = i;
    field.appendChild(emptySquare);
  }
}

createField();

// Choose random first Tile

const randomNum = Math.floor(Math.random() * tilesObjects.length);

const startTile = tilesObjects[randomNum];
console.log(startTile);
console.log(startTile.src);

// Create an array of Collapsed Tiles

let collapsedTilesArr = [];
collapsedTilesArr.push(startTile);
console.log(collapsedTilesArr);

for (let i = 1; i < 16; i++) {
  if (i == 1) {
    const condition = (obj) => obj.left === startTile.right;
    const randomObj = getRandomTile(tilesObjects, condition);
    collapsedTilesArr.push(randomObj);
  } else if (i >= 2 && i <= 3) {
    const condition = (obj) => obj.left === collapsedTilesArr[i - 1].right;
    const randomObj = getRandomTile(tilesObjects, condition);
    collapsedTilesArr.push(randomObj);
  } else if (i % 4 === 0) {
    const condition = (obj) => obj.up === collapsedTilesArr[i - 4].down;
    const randomObj = getRandomTile(tilesObjects, condition);
    collapsedTilesArr.push(randomObj);
  } else {
    const condition = (obj) =>
      obj.up === collapsedTilesArr[i - 4].down &&
      obj.left === collapsedTilesArr[i - 1].right;
    const randomObj = getRandomTile(tilesObjects, condition);
    collapsedTilesArr.push(randomObj);
  }
}

console.log(collapsedTilesArr);

// Function to get Random tile

function getRandomTile(arr, condition) {
  const filteredArray = arr.filter(condition);

  const randomIndex = Math.floor(Math.random() * filteredArray.length);

  return filteredArray[randomIndex];
}

// Filling the Field

const emptySquares = document.querySelectorAll(".empty_square");

collapsedTilesArr.forEach((item, index) => {
  if (emptySquares[index]) {
    const tileImg = document.createElement("img");
    tileImg.src = item.src;

    emptySquares[index].appendChild(tileImg);
  }
});
