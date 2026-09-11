const gameBoard = (() => {
    const gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    function placeMarker(index, marker) {
        gameBoardArray[index] = marker;
    };

    function checkSpaceAvailability(index) {
        if (gameBoardArray[index] === "")
            return "Empty";
        else {
            return "Full";
        };
    };

    function getBoardStatus() {
        return gameBoardArray;
    };

    function resetBoard() {
        gameBoardArray.fill("");
    };

    return {
        placeMarker: placeMarker,
        checkSpaceAvailability: checkSpaceAvailability,
        getBoardStatus: getBoardStatus,
        resetBoard: resetBoard,
    };

})();

function createPlayer(name, marker) {
    return { name, marker };
};

const gameFlow = (() => {
    let currentMarker = 'X';
    let gameOver = false;
    function checkWin() {
        const board = gameBoard.getBoardStatus();
        const winCon = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (const combination of winCon) {
            if (combination.every(index => board[index] === board[combination[0]]
                && board[index] !== "")) {
                return true;
            }
        }
        return false;
    };
    function checkTie() {
        const board = gameBoard.getBoardStatus();
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                return false;
            }
        }
        return checkWin() === false;
    };

    function switchTurn() {
        currentMarker = currentMarker === 'X' ? 'O' : 'X';
    };

    function playTurn(index) {
        if (gameOver) return "Game is already over!";
        if (gameBoard.checkSpaceAvailability(index) === "Full") {
            return "Space already taken!";
        }
        gameBoard.placeMarker(index, currentMarker);

        if (checkWin()) {
            gameOver = true;
        }
        else if (checkTie()) {
            gameOver = true;
        };

        switchTurn();
    };

    function resetGame() {
        gameBoard.resetBoard();
        gameOver = false;
        currentMarker = 'X';
    }

    return {
        checkWin: checkWin,
        checkTie: checkTie,
        switchTurn: switchTurn,
        playTurn: playTurn,
        resetGame: resetGame,
    }
})();

const gameDisplay = (() => {
    const boardContainer = document.querySelector("#gameboard");
    const wholeContainer = document.querySelector("#container");
    const player1Name = document.querySelector("#player1_name");
    const player2Name = document.querySelector("#player2_name");
    const startButton = document.querySelector("button[type='button']");

    startButton.addEventListener("click", () => {
        locationButtons.forEach(button => button.disabled = false);
        player1Name.disabled = true;
        player2Name.disabled = true;
        startButton.disabled = true;
    });

    gameBoard.getBoardStatus().forEach((space, index) => {
        const boardLocation = document.createElement("button");
        boardLocation.classList.add("location");
        boardContainer.append(boardLocation);
        boardLocation.addEventListener("click", () => {
            gameFlow.playTurn(index);
            boardLocation.innerText = gameBoard.getBoardStatus()[index];

            if (gameFlow.checkWin()) {
                const gameEndMsg = document.createElement("div");
                gameEndMsg.classList.add("gameEndDiv");
                wholeContainer.append(gameEndMsg);
                if (gameBoard.getBoardStatus()[index] === "X") {
                    gameEndMsg.innerText = `Game Over. ${player1Name.value || "Player 1"} Wins!`;
                }
                else if (gameBoard.getBoardStatus()[index] === "O") {
                    gameEndMsg.innerText = `Game Over. ${player2Name.value || "Player 2"} Wins!`;
                };
                document.querySelectorAll(".location").forEach(button => button.disabled = true);
            };

            if (gameFlow.checkTie()) {
                const gameEndMsg = document.createElement("div");
                gameEndMsg.classList.add("gameEndDiv");
                wholeContainer.append(gameEndMsg);
                gameEndMsg.innerText = "It's a Tie!";
            };
        });
    });
    const resetButton = document.createElement("button");
    resetButton.innerText = "Reset Board";
    resetButton.classList.add("resetButton");
    wholeContainer.append(resetButton);

    resetButton.addEventListener("click", () => {
        gameFlow.resetGame();
        document.querySelectorAll(".location").forEach(button => {
            button.disabled = false;
            button.innerText = "";
            player1Name.disabled = false;
            player2Name.disabled = false;
            startButton.disabled = false;
            player1Name.value = "";
            player2Name.value = "";
            locationButtons.forEach(button => button.disabled = true);
        });
        const existingMsg = document.querySelector(".gameEndDiv");
        if (existingMsg) existingMsg.remove();
    });

    const locationButtons = document.querySelectorAll(".location");
    locationButtons.forEach(button => button.disabled = true);
})();