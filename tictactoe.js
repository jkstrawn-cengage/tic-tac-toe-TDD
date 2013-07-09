var Manager = function() {
	this.board = [];
	this.players = [];
	this.currentPlayer = null;
	this.minimax = null;

	this.initiate = function(firstPlayerNumber) {
		this.board = new Board();
		this.board.initialize();
		this.minimax = new Minimax(this);
		this.players.push(new Human(this, "X"));
		this.players.push(new Computer(this, "O")); 
		this.currentPlayer = this.getPlayer(firstPlayerNumber || 1);
	}

	this.startGame = function() {
		this.makeCurrentPlayerTakeTurn();
	}

	this.placeTokenOnSquare = function(token, x, y) {
		this.board.setToken(token, x, y);
	}

	this.getTokenAtSquare = function(x, y) {
		return this.board.getToken(x, y);
	}

	this.makeComputerMove = function() {
		var result = this.minimax.getBestSquare(this.board, this.getPlayer(2));
		this.placeTokenOnSquare(this.getPlayer(2).getToken(), result.square.x, result.square.y);
	}

	this.makeHumanMove = function() {
		var result = this.minimax.getBestSquare(this.board, this.getPlayer(1));
		this.placeTokenOnSquare(this.getPlayer(1).getToken(), result.square.x, result.square.y);
	}

	this.isThereAWinner = function() {
		return this.board.isThereAWinner();
	}

	this.getPlayer = function(playerNumber) {
		return this.players[playerNumber - 1];
	}

	this.getCurrentPlayer = function() {
		return this.currentPlayer;
	}

	this.makeCurrentPlayerTakeTurn = function() {
		this.currentPlayer.takeTurn();
	}

	this.sendHumanMove = function(x, y) {
		this.currentPlayer.makeMove(x, y);
	}
	
	this.nextPlayersTurn = function() {
		if (!this.isGameOver()) {
			this.currentPlayer = this.getOtherPlayer(this.currentPlayer);
			this.makeCurrentPlayerTakeTurn();
		}
	}

	this.getOtherPlayer = function(player) {
		if (player.getToken() == this.getPlayer(1).getToken()) {
			return this.getPlayer(2);
		} else {
			return this.getPlayer(1);
		}
	}

	this.getBoard = function() {
		return this.board.squares;
	}

	this.isGameOver = function() {
		return this.board.isGameOver();
	}
}

var Minimax = function(_manager) {
	this.manager = _manager;

	this.getBestSquare = function(board, player) {
		if (board.isGameOver()) {
			return {score: this.getScoreForGameOver(board)};
		}

		var emptySquares = board.getEmptySquares();
		var bestSquareAndScore = {score: -1};

		for (var i = 0; i < emptySquares.length; i++) {
			var _square = emptySquares[i];
			var clonedBoard = board.clone();
			clonedBoard.setToken(player.getToken(), _square.x, _square.y);
			var otherPlayer = this.manager.getOtherPlayer(player);
			var possibleBestScore = this.getBestSquare(clonedBoard, otherPlayer).score;
			possibleBestScore = this.reverseScoreIfForOtherPlayer(player, possibleBestScore);
			if (possibleBestScore >= bestSquareAndScore.score) {
				bestSquareAndScore = {square: _square, score: possibleBestScore};
			}
		}

		bestSquareAndScore.score *= .9;
		bestSquareAndScore.score = this.reverseScoreIfForOtherPlayer(player, bestSquareAndScore.score);
		return bestSquareAndScore;
	}

	this.getScoreForGameOver = function(board) {
		if (board.isThereAWinner() == "O") {
			return 1;
		} else if (board.isThereAWinner() == "X") {
			return -1;
		} else {
			return 0;
		}
	}

	this.reverseScoreIfForOtherPlayer = function(player, score) {
		if (player.getToken() == "X") {
			return score * -1;
		} else {
			return score;
		}
	}
}

var minimax = function(board, token) {

}

var Square = function(x, y) {
	this.x = x;
	this.y = y;
	this.token = '';

	this.isEmpty = function() {
		if (this.token == '') {
			return true;
		}
		return false;
	}

	this.setToken = function(token) {
		this.token = token;
	}
}

var Board = function() {
	this.squares = [];

	this.setToken = function(token, x, y) {
		this.squares[x][y].setToken(token);
	}

	this.getToken = function(x, y) {
		return this.squares[x][y].token;
	}

	this.initialize = function() {
		for (var x = 0; x < 3; x++) {
			this.squares[x] = [];
			for (var y = 0; y < 3; y++) {
				this.squares[x][y] = new Square(x, y);
			}
		}
	}

	this.forEach = function(doForEach) {
		var squares = [];
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				var returned = doForEach(this.squares[x][y]);
				if (returned) squares.push(returned);
			}
		}
		return squares;
	}

	this.isThereAWinner = function() {
		var winner = '';
		var rows = [];
		rows[0] = [this.squares[0][0].token, this.squares[0][1].token, this.squares[0][2].token];
		rows[1] = [this.squares[1][0].token, this.squares[1][1].token, this.squares[1][2].token];
		rows[2] = [this.squares[2][0].token, this.squares[2][1].token, this.squares[2][2].token];
		rows[3] = [this.squares[0][0].token, this.squares[1][0].token, this.squares[2][0].token];
		rows[4] = [this.squares[0][1].token, this.squares[1][1].token, this.squares[2][1].token];
		rows[5] = [this.squares[0][2].token, this.squares[1][2].token, this.squares[2][2].token];
		rows[6] = [this.squares[0][0].token, this.squares[1][1].token, this.squares[2][2].token];
		rows[7] = [this.squares[0][2].token, this.squares[1][1].token, this.squares[2][0].token];

		for (var i = 0; i < rows.length; i++) {
			if (rows[i][1] == rows[i][0] && rows[i][2] == rows[i][0] && rows[i][0] != '') {
				winner = rows[i][0];
			}
		}
		if (winner.length) {
			return winner;
		}
		return false;
	}

	this.clone = function() {
		var newBoard = new Board();
		newBoard.initialize();
		this.forEach(function(square) {
			newBoard.setToken(square.token, square.x, square.y);
		});
		return newBoard;
	}

	this.getEmptySquares = function() {
		return this.forEach(function(square){
			if (square.isEmpty()) {
				return square;
			}
			return false;
		});
	}

	this.isGameOver = function() {
		var emptySquares = this.getEmptySquares();
		if (emptySquares.length == 0 || this.isThereAWinner()) {
			return true;
		}
		return false;
	}

	this.print = function() {
		for (var x = 0; x < 3; x++) {
			var row = "";
			for (var y = 0; y < 3; y++) {
				if (this.squares[x][y].token == "") {
					row += "  ";
				} else {
					row += this.squares[x][y].token + " ";
				}
			}
			console.log(row);
		}
		console.log("winner: ",this.isThereAWinner());
		console.log("-----------------");
	}
}

var Player = function(_game, _token) {
	this.game = _game;
	this.token = _token;

	this.getToken = function() {
		return this.token;
	}

	this.takeTurn = function() {}

	this.makeMove = function() {}
}

var Computer = function(game, token) {
	this.prototype = new Player();
	Player.call(this, game, token);

	this.takeTurn = function() {
		console.log("computer take turn");
		this.game.makeComputerMove();
		this.game.nextPlayersTurn();
	}
}

var Human = function(game, token) {
	this.prototype = new Player();
	Player.call(this, game, token);

	this.takeTurn = function() {
		console.log("human take turn");
		//notify the UI that it is this players turn
	}

	this.makeMove = function(x, y) {
		this.game.placeTokenOnSquare(this.token, x, y);
		this.game.nextPlayersTurn();
	}
}