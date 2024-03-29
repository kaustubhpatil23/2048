var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

function setGame() {
    board = Array.from({ length: rows }, () => Array(columns).fill(0));

    createBoard();

    setTwo();
    setTwo();

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);
}

function createBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = '';

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            boardElement.appendChild(tile);
        }
    }
}

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
    touchEndY = event.touches[0].clientY;
}

function handleTouchEnd() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            slideRight();
        } else {
            slideLeft();
        }
    } else {
        if (deltaY > 0) {
            slideDown();
        } else {
            slideUp();
        }
    }

    setTwo();
    document.getElementById("score").innerText = score;
}

function updateTile(tile, num) {
    tile.innerText = num > 0 ? num.toString() : "";
    tile.className = "tile x" + (num <= 8192 ? num.toString() : "8192");
}
var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
setGame();
}

function setGame() {
// board = [
//     [2, 2, 2, 2],
//     [2, 2, 2, 2],
//     [4, 4, 8, 8],
//     [4, 4, 8, 8]
// ];

board = [
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0]
]

for (let r = 0; r < rows; r++) {
for (let c = 0; c < columns; c++) {
    let tile = document.createElement("div");
    tile.id = r.toString() + "-" + c.toString();
    let num = board[r][c];
    updateTile(tile, num);
    document.getElementById("board").append(tile);
}
}
//create 2 to begin the game
setTwo();
setTwo();

}

function updateTile(tile, num) {
tile.innerText = "";
tile.classList.value = ""; //clear the classList
tile.classList.add("tile");
if (num > 0) {
tile.innerText = num.toString();
if (num <= 4096) {
    tile.classList.add("x"+num.toString());
} else {
    tile.classList.add("x8192");
}                
}
}

document.addEventListener('keyup', (e) => {
if (e.code == "ArrowLeft") {
slideLeft();
setTwo();
}
else if (e.code == "ArrowRight") {
slideRight();
setTwo();
}
else if (e.code == "ArrowUp") {
slideUp();
setTwo();

}
else if (e.code == "ArrowDown") {
slideDown();
setTwo();
}
document.getElementById("score").innerText = score;
})

function filterZero(row){
return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
//[0, 2, 2, 2] 
row = filterZero(row); //[2, 2, 2]
for (let i = 0; i < row.length-1; i++){
if (row[i] == row[i+1]) {
    row[i] *= 2;
    row[i+1] = 0;
    score += row[i];
}
} //[4, 0, 2]
row = filterZero(row); //[4, 2]
//add zeroes
while (row.length < columns) {
row.push(0);
} //[4, 2, 0, 0]
return row;
}

function slideLeft() {
for (let r = 0; r < rows; r++) {
let row = board[r];
row = slide(row);
board[r] = row;
for (let c = 0; c < columns; c++){
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    let num = board[r][c];
    updateTile(tile, num);
}
}
}

function slideRight() {
for (let r = 0; r < rows; r++) {
let row = board[r];         //[0, 2, 2, 2]
row.reverse();              //[2, 2, 2, 0]
row = slide(row)            //[4, 2, 0, 0]
board[r] = row.reverse();   //[0, 0, 2, 4];
for (let c = 0; c < columns; c++){
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    let num = board[r][c];
    updateTile(tile, num);
}
}
}

function slideUp() {
for (let c = 0; c < columns; c++) {
let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
row = slide(row);
// board[0][c] = row[0];
// board[1][c] = row[1];
// board[2][c] = row[2];
// board[3][c] = row[3];
for (let r = 0; r < rows; r++){
    board[r][c] = row[r];
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    let num = board[r][c];
    updateTile(tile, num);
}
}
}

function slideDown() {
for (let c = 0; c < columns; c++) {
let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
row.reverse();
row = slide(row);
row.reverse();
// board[0][c] = row[0];
// board[1][c] = row[1];
// board[2][c] = row[2];
// board[3][c] = row[3];
for (let r = 0; r < rows; r++){
    board[r][c] = row[r];
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    let num = board[r][c];
    updateTile(tile, num);
}
}
}

function setTwo() {
if (!hasEmptyTile()) {
return;
}
let found = false;
while (!found) {
//find random row and column to place a 2 in
let r = Math.floor(Math.random() * rows);
let c = Math.floor(Math.random() * columns);
if (board[r][c] == 0) {
    board[r][c] = 2;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    tile.innerText = "2";
    tile.classList.add("x2");
    found = true;
}
}
}

function hasEmptyTile() {
let count = 0;
for (let r = 0; r < rows; r++) {
for (let c = 0; c < columns; c++) {
    if (board[r][c] == 0) { //at least one zero in the board
        return true;
    }
}
}
return false;
}
