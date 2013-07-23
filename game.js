var Game = function(board) {
	this.board = board;
	this.playerController = null;

	this.startGame = function() {
		this.makeCurrentPlayerTakeTurn();
	}

	this.placeTokenOnSquare = function(token, x, y) {
		this.board.setToken(token, x, y);
	}

	this.getTokenAtSquare = function(x, y) {
		return this.board.getToken(x, y);
	}

	this.isWinner = function() {
		return this.board.isWinner();
	}

	this.makeCurrentPlayerTakeTurn = function() {
		this.playerController.takeTurn();
	}

	this.makeMove = function(x, y) {
		this.playerController.makeMove(x, y);
	}
	
	this.nextPlayersTurn = function() {
		if (!this.isGameOver()) {
			this.playerController.switchPlayers();
			this.makeCurrentPlayerTakeTurn();
		}
	}

	this.getBoard = function() {
		return this.board.squares;
	}

	this.isGameOver = function() {
		return this.board.isGameOver();
	}

	this.setPlayerController = function(playerController) {
		this.playerController = playerController;
	}
}