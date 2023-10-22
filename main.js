// (function() { 
    
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

        cacheDom: function() {
            this.container = document.querySelector('.container'); // do I need to select the container?
            this.cells = document.querySelectorAll('.cell');
            this.dialog = document.querySelector('.modal');
            this.winningMsg = document.querySelector('#winning-msg');
            this.restartBtn = document.querySelector('#restart-btn');
        },

        render: function() {
            for(let i = 0; i < this.cells.length; i++) {
                this.cells[i].textContent = gameboard.board[i];
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
            displayController.render();
            gameController.currentTurn === player1 ? gameController.currentTurn = player2 : gameController.currentTurn = player1;
            gameController.checkWin();
        },

        render: function() {
            for(let i = 0; i < this.cells.length; i++) {
                this.cells[i].textContent = gameboard.board[i];
            }
        },

        restartGame: function() {
            gameboard.board = ["", "", "", "", "", "", "", "", ""];
            gameController.currentTurn = player1;
            gameController.gameOver = false;
            displayController.winningMsg.textContent = "";
            gameController.init();
            displayController.dialog.close();
        }
    }

    function createPlayer(name, sign) {
        //create factory
    };

    const player1 = {
        sign: "X"
    };

    const player2 = {
        sign: "O"
    };

    const gameController = {
        currentTurn: player1,
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
                    this.winner = "X"
                    this.endGame(this.winner);
                    return;
                } else if(gameboard.board[index1] === "O" && gameboard.board[index2] === "O" && gameboard.board[index3] === "O") {
                    this.winner = "O"
                    this.endGame(this.winner);
                    return;
                } else if(!gameboard.board.includes("")) {
                    this.winner = "tie"
                    this.endGame(this.winner);
                    return;
                }
            
        }
    },

        endGame: function(winner) {
            switch(winner){
                case "X":
                    displayController.winningMsg.textContent += `The winner is ${winner}`;
                    displayController.dialog.showModal();
                    return;
                case "O":
                    displayController.winningMsg.textContent += `The winner is ${winner}`;
                    displayController.dialog.showModal();
                    return;
                case "tie":
                    displayController.winningMsg.textContent = `It's a tie!`;
                    displayController.dialog.showModal();
                    return;
            }

        },

        init: function() {
            displayController.cacheDom();
            displayController.render();
            displayController.bindEvents();
            this.checkWin();
            
        }  
    };

    gameController.init();
// })();