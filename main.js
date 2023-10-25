const gameboard = {
    // make the board array private
    board: ["", "", "", "", "", "", "", "", ""],

    setCell: function(index) {
        let player = gameController.currentTurn;
        this.board[index] = player.sign;       
    },

    // getBoard: function() {
    //     return this.board;
    // }
};

const displayController = {

    removePreviousClasses: function() {
        for(let i = 0; i < this.cells.length; i++) {
            this.cells[i].className = "cell";
        }
    },

    fillCell: function(targetCell) {
        switch(gameController.currentTurn) {
            case player1:
                this.cells[targetCell].classList.add('.alpaca-fill');
            case player2:
                this.cells[targetCell].classList.add('.crab-fill');   
        }
    },

    toggleClassEmptyCells: function() {
        for(let i = 0; i < this.cells.length; i++) {
            if(this.cells[i].classList.contains("alpaca-fill") || this.cells[i].classList.contains("crab-fill")) {
                continue;
            }
            if(gameController.currentTurn === player1) {
                this.cells[i].classList.add("alpaca-outline");
            } else if(gameController.currentTurn === player2) {
                this.cells[i].classList.add("crab-outline");
            }
        }
    },
    
    cacheDom: function() {
        this.cells = document.querySelectorAll('.cell');
        this.dialog = document.querySelector('.modal');
        this.winningMsg = document.querySelector('#winning-msg');
        this.restartBtn = document.querySelector('#restart-btn');
    },

    renderBoard: function() {
        for(let i = 0; i < this.cells.length; i++) {
            if(gameboard.board[i] === "X") {
                this.cells[i].classList.add("alpaca-fill");
            } else if(gameboard.board[i] === "O") {
                this.cells[i].classList.add("crab-fill");
            }
        }
    },

    bindEvents: function() {
        for(let i = 0; i < this.cells.length; i++) {
            this.cells[i].addEventListener('click', this.handleClick, { once: true });
        }

        this.restartBtn.addEventListener('click', this.restartGame) 
    },

    handleClick: function(e) {
        gameboard.setCell(e.target.id);
        // displayController.fillCell(e.target.id)
        displayController.fillCell(e.target.id);
        gameController.roundCount++;
        gameController.changeTurns(); // is it OK if these two go here?
        displayController.removePreviousClasses();
        displayController.renderBoard();
        displayController.toggleClassEmptyCells();

        gameController.checkWin();
    },

    restartGame: function() {
        gameboard.board = ["", "", "", "", "", "", "", "", ""];
        gameController.currentTurn = player1;
        gameController.gameOver = false;
        gameController.roundCount = 0;
        for(let i = 0; i < displayController.cells.length; i++) {
            displayController.cells[i].className = "cell alpaca-outline";
        }
        displayController.winningMsg.textContent = "";
        gameController.init();
        displayController.dialog.close();
    }
}

// CREATE PLAYER FACTORY?

const player1 = {
    sign: "X"
};

const player2 = {
    sign: "O"
};

const gameController = {
    currentTurn: player1,
    roundCount: 0,
    gameOver: false,

    checkWin: function() {
        let winConditions = [[0, 1, 2],
                             [3, 4, 5],
                             [6, 7, 8],
                             [0, 3, 6],
                             [1, 4, 7],
                             [2, 5, 8],
                             [0, 4, 8],
                             [2, 4, 6]];

        for(let i = 0; i < winConditions.length; i++) {
            let j = 0;
            let index1 = winConditions[i][j];
            let index2 = winConditions[i][j+1];
            let index3 = winConditions[i][j+2];
            if(gameboard.board[index1] === "X" && gameboard.board[index2] === "X" && gameboard.board[index3] === "X") {
                this.winner = "Alpacas"
                this.endGame(this.winner);
                return;
            } else if(gameboard.board[index1] === "O" && gameboard.board[index2] === "O" && gameboard.board[index3] === "O") {
                this.winner = "Crabs"
                this.endGame(this.winner);
                return;
            } 
        }

         if(gameController.roundCount === 9) {
            this.winner = "tie"
            this.endGame(this.winner);
            return;
        }
},

    endGame: function(winner) {
        switch(winner){
            case "Alpacas":
                displayController.winningMsg.textContent += `${winner} win!`;
                displayController.dialog.showModal();
                return;
            case "Crabs":
                displayController.winningMsg.textContent += `${winner} win!`;
                displayController.dialog.showModal();
                return;
            case "tie":
                displayController.winningMsg.textContent = `It's a tie!`;
                displayController.dialog.showModal();
                return;
        }

    },

    changeTurns: function() {
        if(this.currentTurn === player1) {
            gameController.currentTurn = player2;
        } else {
            gameController.currentTurn = player1;
        }
    }, 

    init: function() {
        displayController.cacheDom();
        displayController.renderBoard();
        displayController.bindEvents();
    },

};

gameController.init();