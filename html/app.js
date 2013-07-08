var controller;

$(function() {
	console.log("started");

	var model = new Manager();
	controller = new TicTacToe(model);
	controller.initiate();

	// Set click event for each cell in the html board
	$("#boardTable div").each(function(){
		this.addEventListener("click", function(e){
			controller.clickedCell(this);
		}, false);
	});

});

var TicTacToe = function(_manager) {
	this.manager = _manager;
	this.isOver = false;

	this.initiate = function() {
		this.clearBoard();

		this.manager.initiate(1);
		this.manager.startGame();

		this.drawBoard();
		
		$("#status").html("");
		this.isOver = false;
	};

	this.clearBoard = function() {
		var that = this;
		this.forEachSquare(function(x, y) {
			var htmlSquare = that.getHtmlSquare(x, y);
			htmlSquare.html("");
			htmlSquare.addClass("open");
		});
	};

	this.isSquareOpen = function(square) {
		return (square.token != "");
	};

	this.drawBoard = function() {
		var board = this.manager.getBoard();
		var that = this;
		this.forEachSquare(function(x, y) {
			var htmlSquare = that.getHtmlSquare(x, y);
			htmlSquare.html(board[x][y].token);
			if (that.isSquareOpen(board[x][y])) {
				htmlSquare.removeClass("open");
			}
		});			
	};

	this.getHtmlSquare = function(x, y) {
		var htmlId = x + "_" + y;
		return $('#' + htmlId);
	};

	this.forEachSquare = function(forEach) {
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				forEach(x, y);
			}
		}
	};

	this.makeMove = function(x, y) {
		this.manager.sendHumanMove(x, y);
		if (this.manager.isGameOver()) {
			this.isOver = true;
			this.setGameOverStatus(this.manager.isThereAWinner());
		}
		this.drawBoard();
	}

	this.clickedCell = function(htmlSquare) {
		var jquerySquare = $('#' + htmlSquare.id);
		if (jquerySquare.hasClass("open") && !this.isOver) {
			var coordinates = htmlSquare.id.split('_');
			this.makeMove(coordinates[0], coordinates[1]);
		}
	};

	this.playAgain = function(manager) {
		this.initiate();
	}

	this.setGameOverStatus = function(winnerToken) {
		if (winnerToken == false) {
			$('#status').html("There is a tie!");
		}
	    if (winnerToken == "O") {
	        $('#status').html("The computer has won!");
	    }
	}
}

var playAgain = function() {
	var manager = new Manager();
	controller.playAgain(manager);
}