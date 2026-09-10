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
        if (gameBoard.checkSpaceAvailability(index) === "Full") {
            return "Space already taken!";
        }
        gameBoard.placeMarker(index, currentMarker);

        if (checkWin()) {
            return "Game Over. You Win!";
        }
        else if (checkTie()) {
            return "It's a Tie!";
        };

        if(switchTurn(currentMarker)){
            return `Next player: ${currentMarker}`;
        };
    };

    return {
        checkWin: checkWin,
        checkTie: checkTie,
        switchTurn: switchTurn,
        playTurn: playTurn,

    }
})();

const gameDisplay = (() => {

    })();

const player1 = createPlayer("Player!", "X");
const player2 = createPlayer("Player2", "O");
