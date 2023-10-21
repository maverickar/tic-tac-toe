(function() { 
    
    const gameboard = {
        board : ["X", "O", "X", "X", "O", "X", "X", "O", "X"],
        // maybe somebody else has to be responsible for the rendering of the gameboard?
        init: function() {
            this.cacheDom();
            this.render();
        },
        render: function() {
            this.container.textContent = this.board;
            // actually loop through the data and render it to different items to create the grid.
        },

        cacheDom: function() {
            this.container = document.querySelector('.container');
        }
    };


    function playerFactory(name) {
        // a player has a name + array of positions they have
        return {
    
        }
    };

    const gameControl = {

    };

    gameboard.init();

})();