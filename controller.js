var Controller = function() {
	this.game = null;
	this.players = [];

	this.initiate = function() {
		var board = new Board();
		board.initialize();
		this.game = new Game(board);

		var playerController = new PlayerController();
		var minimax = new Minimax(playerController);
		playerController.addPlayer(new Player("X", new UIStrategy(this.game)));
		playerController.addPlayer(new Player("O", new AIStrategy(this.game, minimax)));
		playerController.initiate();
		this.game.setPlayerController(playerController);
	}

	this.makeMove = function(x, y) {
		this.game.makeMove(x, y);
	}

	this.startGame = function() {
		this.game.startGame()
	}

	this.placeTokenOnSquare = function(token, x, y) {
		this.game.placeTokenOnSquare(token, x, y);
	}

	this.getTokenOnSquare = function(x, y) {
		return this.game.getTokenAtSquare(x, y);
	}

	this.isWinner = function() {
		return this.game.isWinner();
	}

	this.getBoard = function() {
		return this.game.getBoard();
	}

	this.isGameOver = function() {
		return this.game.isGameOver();
	}
}