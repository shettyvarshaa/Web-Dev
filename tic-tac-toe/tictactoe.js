
var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]
/*3x3 array with a black string */
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            //create a div tag
            let tile = document.createElement("div");
            //toString() is a method that converts the numeric values of r and c into strings.
            tile.id = r.toString() + "-" + c.toString();
            //<div id="0-0,1,2,..."></div>
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click",setTile);
            document.getElementById("board").append(tile);
            //takes <div id="0-0"></div> and inserts in html file within the board id, it's going to do it 9 times
        }
    }
}

//defining function setTile
function setTile(){
    if(gameOver){
        return;
        //each tile unclickable
    }
    //to get coordinates of each tile
    let coords = this.id.split("-"); //"1-1" -> ["1","1"]
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);
    //convert string into integer

    if(board[r][c]!=' ')
        return;
    
        board[r][c] = currPlayer;
    this.innerText = currPlayer;
    //marks the board and update the html

    if(currPlayer == playerO)
        currPlayer = playerX;
    else
        currPlayer = playerO;
    
    checkWinner();
}

function checkWinner(){
    //horizontally
    for(let r=0;r<3;r++){
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[0][r] != ' '){
          for(let i=0;i<3;i++){
            let tile = document.getElementById(r.toString() + "-"+i.toString());
            tile.classList.add("winner");
          }
          gameOver = true;
          return;
        }
    }
    //vertically
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }
    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }
    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}