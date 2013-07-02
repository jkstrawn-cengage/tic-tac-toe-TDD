describe('tic tac toe', function() {
	var manager;

	beforeEach(function() {
		manager = new Manager();
	});

	it('has a token on the top left square of the board when X chooses that location', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 0, 0);
		expect(manager.getTokenAtSquare(0, 0)).toEqual("X");
	});

	it('has an X token on the middle square of the board when X chooses that location', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 1, 1);
		expect(manager.getTokenAtSquare(1, 1)).toEqual("X");
	});

	it('has an O token on the middle square of the board when O chooses that location', function() {
		manager.initiate();
		manager.placeTokenOnSquare('O', 1, 1);
		expect(manager.getTokenAtSquare(1, 1)).toEqual("O");
	});

	it('interprets no win with only one X token on the board', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 0, 0);
		manager.placeTokenOnSquare('O', 0, 1);
		expect(manager.isThereAWinner()).toEqual(false);
	});

	it('interprets X as the winner if X has three tokens on top', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 0, 0);
		manager.placeTokenOnSquare('X', 0, 1);
		manager.placeTokenOnSquare('X', 0, 2);
		expect(manager.isThereAWinner()).toEqual("X");
	});

	it('interprets X as the winner if X has three tokens on bottom', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 2, 0);
		manager.placeTokenOnSquare('X', 2, 1);
		manager.placeTokenOnSquare('X', 2, 2);
		expect(manager.isThereAWinner()).toEqual("X");
	});

	it('interprets X as the winner if X has reverse diagonal', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 0, 2);
		manager.placeTokenOnSquare('X', 1, 1);
		manager.placeTokenOnSquare('X', 2, 0);
		expect(manager.isThereAWinner()).toEqual("X");
	});

	it('places the computer token in the middle if it is the last spot (depth: 0)', function() {
		manager.initiate();
		manager.placeTokenOnSquare('O', 0, 2);
		manager.placeTokenOnSquare('X', 1, 2);
		manager.placeTokenOnSquare('O', 0, 1);
		manager.placeTokenOnSquare('X', 0, 0);
		manager.placeTokenOnSquare('O', 1, 0);
		manager.placeTokenOnSquare('X', 2, 0);
		manager.placeTokenOnSquare('O', 2, 2);
		manager.placeTokenOnSquare('X', 2, 1);
		manager.makeComputerMove();
		expect(manager.getTokenAtSquare(1, 1)).toEqual('O');
	});

	it('places the computer token in the winning square with 2 squares open (depth: 1)', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 2, 0);
		manager.placeTokenOnSquare('O', 1, 1);
		manager.placeTokenOnSquare('X', 2, 2);
		manager.placeTokenOnSquare('O', 2, 1);
		manager.placeTokenOnSquare('X', 0, 1);
		manager.placeTokenOnSquare('O', 1, 2);
		manager.placeTokenOnSquare('X', 0, 2);
		manager.makeComputerMove();
		expect(manager.isThereAWinner()).toEqual('O');
	});

	it('places the computer token in the not-losing square with 2 squares open (depth: 2)', function() {
		manager.initiate();
		manager.placeTokenOnSquare('X', 0, 0);
		manager.placeTokenOnSquare('O', 0, 1);
		manager.placeTokenOnSquare('X', 0, 2);
		manager.placeTokenOnSquare('O', 1, 1);
		manager.placeTokenOnSquare('X', 1, 0);
		manager.placeTokenOnSquare('O', 2, 2);
		manager.placeTokenOnSquare('X', 2, 1);
		manager.makeComputerMove();
		expect(manager.getTokenAtSquare(2, 0)).toEqual('O');
	});

});