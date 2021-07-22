document.addEventListener("DOMContentLoaded", function () {

    let reset = document.querySelector(".reset");
    let squares = document.querySelectorAll(".square");
    let displayTurn = document.querySelector(".displayTurn");
    let count = 0;
  
  // for removing borders from grid - Js Style
    for (let i = 0; i < 3; i++) {

        squares[i].style.borderTop = 0;
        squares[i + 6].style.borderBottom = 0;
        squares[3 * i].style.borderLeft = 0;
        squares[2 + (3 * i)].style.borderRight = 0;
    }


    let game = true,
        state = ["", "", "", "", "", "", "", "", ""],
        currentPlayer = "X";

    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function clickedSquare(e) {
        console.log(e.target.getAttribute("square-no"))

        if (state[e.target.getAttribute("square-no")] === "") {
            e.target.innerText = currentPlayer
            state[e.target.getAttribute("square-no")] = currentPlayer;
            count++;

            if (count >= 5) {
                checkForWin(e.target.getAttribute("square-no"), currentPlayer);

            }

            if (count >= 9) {
                
                game = false;
                displayTurn.innerText = " Ooops! Its a tie ~ \n Game Resets in 5 secs"
                setTimeout(resetGame, 5000);
                
            }

            if (game) {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                displayTurn.innerText = "Current Player : " + currentPlayer;
            }

        }





        console.log(state)

    }

    function checkForWin(squareX, player) {

       
        console.log("inside...")
        for (let i = 0; i < winConditions.length; i++) {
          
            if (winConditions[i].includes(Number(squareX))) {
                console.log(squares[winConditions[i][1]])
                if (state[winConditions[i][0]] === state[winConditions[i][1]] && state[winConditions[i][1]] === state[winConditions[i][2]]) {
                    console.log("wonnnnnn")
                    game = false;
                    
                    displayTurn.innerText = player + " wins the Game ~ \n Game Resets in 5 secs"
                    setTimeout(resetGame, 5000);
                    break
                }
                
            }
            if(game===false)break
        }

    }

    function resetGame() {
        game = true
        count = 0;
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerText = ""
            state[i] = ""
        }
        displayTurn.innerText = "Welcome"

        console.log(state)
    }

    reset.addEventListener("click", resetGame);



    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", clickedSquare)
    }


})
