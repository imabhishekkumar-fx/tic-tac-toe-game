const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
//1.

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//2.let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

     //5.UI pr empty bhi karna padega boxes ko
     boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
}

initGame();

function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";

    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

// 5. check game over function
function checkGameover(){
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //8.disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //6 now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //7. it means we have a winner
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //8. We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}


function handleClick(index){
    if(gameGrid[index] ===""){
        // for changing in UI
        boxes[index].innerHTML = currentPlayer;
        // for inner logic that we want to specify how over game work
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap the turn
        swapTurn();
        checkGameover();
    }
}

//3 upper

boxes.forEach((box, index) => {
    box.addEventListener("click",() => {
    handleClick(index);
})
});

// 4. 
newGameBtn.addEventListener("click", initGame);