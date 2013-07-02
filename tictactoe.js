var Manager = function() {
	this.board = [];

	this.initiate = function() {
		this.board = new Board();
		this.board.initialize();
	}

	this.placeTokenOnSquare = function(token, x, y) {
		this.board.setToken(token, x, y);
	}

	this.getTokenAtSquare = function(x, y) {
		return this.board.getToken(x, y);
	}

	this.makeComputerMove = function() {
		var result = oPlaysAtBestSquare(this.board, 1);
		var square = result.square;
		this.board.setToken("O", square.x, square.y);
		console.log("made move at (" + square.x + ", " + square.y + ")");
	}


	this.isThereAWinner = function() {
		return this.board.isThereAWinner();
	}
}

var oPlaysAtBestSquare = function(board, depth) {
	if (board.isGameOver()) {
		if (board.isThereAWinner() == "X") {
			return {score: -1};
		} else if (board.isThereAWinner() == "O") {
			return {score: 1};
		} else {
			return {score: 0};
		}
	}
	var emptySquares = board.getEmptySquares();
	var bestSquare = {score: -1};

	for (var i = 0; i < emptySquares.length; i++) {
		var thisSquare = emptySquares[i];
		var clonedBoard = board.clone();
		clonedBoard.setToken("O", thisSquare.x, thisSquare.y);
		console.log("Assuming O played at... " + thisSquare.x + ", " + thisSquare.y);
		var result = xPlaysAtBestSquare(clonedBoard);
		if (result.score >= bestSquare.score) {
			if (depth == 2) {
				console.log("Set new best square: Score = (" + result.score + "), old = (" + bestSquare.score);
				console.log("O goes at (" + thisSquare.x + ", " + thisSquare.y + ")");
				if (result.square) console.log("X goes at (" + result.square.x + ", " + result.square.y + ")");
			}
			bestSquare =  {square: thisSquare, score: result.score};
		}		
	}
	return bestSquare;
}

var xPlaysAtBestSquare = function(board) {
	if (board.isGameOver()) {
		console.log("game over");
		if (board.isThereAWinner() == "O") {
			return {score: 1};
		} else {
			return {score: 0};
		}
	}
	var emptySquares = board.getEmptySquares();
	var bestSquare = {score: 1};
	
	for (var k = 0; k < emptySquares.length; k++) {
		var thisSquare = emptySquares[k];
		var clonedBoard = board.clone();
		clonedBoard.setToken("X", thisSquare.x, thisSquare.y);
		var result = oPlaysAtBestSquare(clonedBoard);
		if (result.square) {
			//console.log("Option: " + result.score + " at (" + result.square.x + ", " + result.square.y + ")");
			//clonedBoard.print();
		}
		if (result.score <= bestSquare.score) {
			bestSquare = {square: thisSquare, score: result.score};	
		}		
	}
	console.log("Best square for X was... (" + bestSquare.square.x + ", " + bestSquare.square.y + ")");
	bestSquare.score *= .9;
	return bestSquare;
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