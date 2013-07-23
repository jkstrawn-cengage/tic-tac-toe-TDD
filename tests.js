describe('tic tac toe', function() {
	var gameRunner;

	beforeEach(function() {
		gameRunner = new Controller();
	});

	it('has a token on the top left square of the board when X chooses that location', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 0, 0);
		expect(gameRunner.getTokenOnSquare(0, 0)).toEqual("X");
	});

	it('has an X token on the middle square of the board when X chooses that location', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 1, 1);
		expect(gameRunner.getTokenOnSquare(1, 1)).toEqual("X");
	});

	it('has an O token on the middle square of the board when O chooses that location', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('O', 1, 1);
		expect(gameRunner.getTokenOnSquare(1, 1)).toEqual("O");
	});

	it('interprets no win with only one X token on the board', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 0, 0);
		gameRunner.placeTokenOnSquare('O', 0, 1);
		expect(gameRunner.isWinner()).toEqual(false);
	});

	it('interprets X as the winner if X has three tokens on top', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 0, 0);
		gameRunner.placeTokenOnSquare('X', 0, 1);
		gameRunner.placeTokenOnSquare('X', 0, 2);
		expect(gameRunner.isWinner()).toEqual("X");
	});

	it('interprets X as the winner if X has three tokens on bottom', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 2, 0);
		gameRunner.placeTokenOnSquare('X', 2, 1);
		gameRunner.placeTokenOnSquare('X', 2, 2);
		expect(gameRunner.isWinner()).toEqual("X");
	});

	it('interprets X as the winner if X has reverse diagonal', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 0, 2);
		gameRunner.placeTokenOnSquare('X', 1, 1);
		gameRunner.placeTokenOnSquare('X', 2, 0);
		expect(gameRunner.isWinner()).toEqual("X");
	});
	
	it('places the computer token in the middle if it is the last spot (depth: 1)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('O', 0, 2);
		gameRunner.placeTokenOnSquare('X', 1, 2);
		gameRunner.placeTokenOnSquare('O', 0, 1);
		gameRunner.placeTokenOnSquare('X', 0, 0);
		gameRunner.placeTokenOnSquare('O', 1, 0);
		gameRunner.placeTokenOnSquare('X', 2, 0);
		gameRunner.placeTokenOnSquare('O', 2, 2);
		gameRunner.makeMove(2, 1);
		expect(gameRunner.getTokenOnSquare(1, 1)).toEqual('O');
	});

	it('places the computer token in the winning-square with 2 squares open (depth: 1)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 2, 0);
		gameRunner.placeTokenOnSquare('O', 1, 1);
		gameRunner.placeTokenOnSquare('X', 2, 2);
		gameRunner.placeTokenOnSquare('O', 2, 1);
		gameRunner.placeTokenOnSquare('X', 0, 1);
		gameRunner.placeTokenOnSquare('O', 1, 2);
		gameRunner.makeMove(0, 2);
		expect(gameRunner.isWinner()).toEqual('O');
	});

	it('places the computer token in the winning-square with 3 squares open (depth: 1)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('O', 1, 1);
		gameRunner.placeTokenOnSquare('X', 0, 0);
		gameRunner.placeTokenOnSquare('O', 2, 0);
		gameRunner.placeTokenOnSquare('X', 1, 0);
		gameRunner.placeTokenOnSquare('O', 2, 2);
		gameRunner.makeMove(2, 1);
		expect(gameRunner.getTokenOnSquare(0, 2)).toEqual('O');
	});

	it('places the computer token in the not-losing-square with 2 squares open (1st square, depth: 2)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 0, 0);
		gameRunner.placeTokenOnSquare('O', 1, 0);
		gameRunner.placeTokenOnSquare('X', 0, 1);
		gameRunner.placeTokenOnSquare('O', 1, 1);
		gameRunner.placeTokenOnSquare('X', 1, 2);
		gameRunner.placeTokenOnSquare('O', 2, 1);
		gameRunner.makeMove(2, 0);
		expect(gameRunner.getTokenOnSquare(0, 2)).toEqual('O');
	});

	it('places the computer token in the not-losing square with 2 squares open (2nd square, depth: 2)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('X', 0, 0);
		gameRunner.placeTokenOnSquare('O', 0, 1);
		gameRunner.placeTokenOnSquare('X', 0, 2);
		gameRunner.placeTokenOnSquare('O', 1, 1);
		gameRunner.placeTokenOnSquare('X', 1, 0);
		gameRunner.placeTokenOnSquare('O', 2, 2);
		gameRunner.makeMove(2, 1);
		expect(gameRunner.getTokenOnSquare(2, 0)).toEqual('O');
	});

/*
	it('places the human token in the not-losing square with 2 squares open (2nd square, depth: 2)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('O', 0, 0);
		gameRunner.placeTokenOnSquare('X', 0, 1);
		gameRunner.placeTokenOnSquare('O', 0, 2);
		gameRunner.placeTokenOnSquare('X', 1, 1);
		gameRunner.placeTokenOnSquare('O', 1, 0);
		gameRunner.placeTokenOnSquare('X', 2, 2);
		gameRunner.placeTokenOnSquare('O', 2, 1);
		gameRunner.TESTMakeHumanMove();
		expect(gameRunner.getTokenOnSquare(2, 0)).toEqual('X');
	});

	it('places the human token in the not-losing-square with 2 squares open (1st square, depth: 2)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('O', 0, 0);
		gameRunner.placeTokenOnSquare('X', 1, 0);
		gameRunner.placeTokenOnSquare('O', 0, 1);
		gameRunner.placeTokenOnSquare('X', 1, 1);
		gameRunner.placeTokenOnSquare('O', 1, 2);
		gameRunner.placeTokenOnSquare('X', 2, 1);
		gameRunner.placeTokenOnSquare('O', 2, 0);
		gameRunner.TESTMakeHumanMove();
		expect(gameRunner.getTokenOnSquare(0, 2)).toEqual('X');
	});
*/
	it('has the computer win with the human making 1 bad moves (depth: 5)', function() {
		gameRunner.initiate();
		gameRunner.placeTokenOnSquare('O', 0, 0);
		gameRunner.placeTokenOnSquare('X', 0, 1);
		var minimax = new Minimax(gameRunner.game.playerController);
		var player1 = new Player("O", new AIStrategy(gameRunner.game, minimax));
		var player2 = new Player("X", new AIStrategy(gameRunner.game, minimax));
		gameRunner.game.playerController.setPlayer(player1, 0);
		gameRunner.game.playerController.setPlayer(player2, 1);
		gameRunner.game.playerController.initiate();
		gameRunner.startGame();

		expect(gameRunner.isWinner()).toEqual('O');
	});

	it('has two players with tokens', function() {
		gameRunner.initiate();
		expect(gameRunner.game.playerController.getPlayer(1).getToken()).toEqual('X');
		expect(gameRunner.game.playerController.getPlayer(2).getToken()).toEqual('O');
	});

	it('returns an X token for the current player if the human starts first', function() {
		gameRunner.initiate();
		expect(gameRunner.game.playerController.getCurrentPlayer().getToken()).toEqual("X");
	});
/*
	it('returns an O token for the current player if the computer starts first', function() {
		gameRunner.initiate();
		expect(gameRunner.game.playerController.getCurrentPlayer().getToken()).toEqual("O");
	});
*/

	it('allows the first player to make a move when the game starts', function() {
		gameRunner.initiate();
		gameRunner.startGame();
		gameRunner.makeMove(0, 0);
		expect(gameRunner.getTokenOnSquare(0, 0)).toEqual("X");
	});

	it('makes the computer take a move after the human plays first', function() {
		gameRunner.initiate();
		gameRunner.startGame();
		gameRunner.makeMove(0, 0);
		expect(gameRunner.getTokenOnSquare(1, 1)).toEqual("O");
	});

});