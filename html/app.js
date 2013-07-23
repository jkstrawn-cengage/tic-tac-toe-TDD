var view;

var playAgain = function() {
	var controller = new Controller();
	view.playAgain(controller);
}

$(function() {
	console.log("started");

	var controller = new Controller();
	view = new View(controller);
	view.initiate();

	// Set click event for each cell in the html board
	$("#boardTable div").each(function(){
		this.addEventListener("click", function(e){
			view.clickedCell(this);
		}, false);
	});

});

var View = function(_controller) {
	this.controller = _controller;
	this.isOver = false;

	this.initiate = function() {
		this.clearBoard();

		this.controller.initiate();
		this.controller.startGame();

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
		var board = this.controller.getBoard();
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
		this.controller.makeMove(x, y);
		if (this.controller.isGameOver()) {
			this.isOver = true;
			this.setGameOverStatus(this.controller.isWinner());
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

	this.playAgain = function(controller) {
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