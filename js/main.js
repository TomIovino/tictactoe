const ticTacToe = {
    winCons : [ [0,1,2],[3,4,5],[6,7,8],[0,3,6],
                [1,4,7],[2,5,8],[0,4,8],[2,4,6] ],
    board : ['','','','','','','','',''],
    player : 1,
    winner : '',
    currentSquare : {},

    addEventListeners(){
        const squares = Array.from(document.querySelectorAll('.square'), square => square.addEventListener('click',this.checkValidSquare.bind(this)));
    },

    checkValidSquare(e){
        const squareId = e.target.id;
        this.currentSquare = e.srcElement;

        if(this.board[squareId] !== '' || this.winner) 
            return;
        else
            this.assignSquare(squareId);
    },

    assignSquare(squareId){ 
        this.board[squareId] = this.player === 1 ? 'x' : 'o';

        if(this.player === 1) 
            this.currentSquare.innerText = 'X';
        else 
            this.currentSquare.innerText = 'O';

        this.checkEndConditions();
    },

    checkEndConditions(){
        ticTacToe.winCons.forEach((x)=>{
            if(this.board[x[0]] ==='x' 
            && this.board[x[1]] ==='x' 
            && this.board[x[2]] ==='x'){
                this.winner = 'Player 1';
            }
            else if(this.board[x[0]] ==='o' 
            && this.board[x[1]] ==='o' 
            && this.board[x[2]] ==='o'){
                this.winner = 'Player 2';
            }
        });

        if(this.winner)
            this.placeText(`${this.winner} is the Winner!`);
        else if(!this.board.includes('') && !this.winner)
            this.placeText(`It is a Draw!`);
        else
            this.toggleTurn();
    },

    toggleTurn(){
        this.player === 1 ? this.player = 2 : this.player = 1;
        this.placeText(`Player ${this.player} Turn`);
    },

    resetBoard(){
        Array.from(document.querySelectorAll('.square'), square => square.innerText = '');
        this.board = ['','','','','','','','',''];
        this.player = 1;
        this.winner = '';
        this.placeText(`Player ${this.player} Turn`)
    },

    placeText(str){
        document.querySelector('span').innerText = `${str}`;
    }
};

ticTacToe.addEventListeners();

const newGame = document.querySelector('.restart').addEventListener('click',e=>ticTacToe.resetBoard());