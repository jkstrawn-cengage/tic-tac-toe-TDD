var MoveStrategy = function(game) {
	this.game = game;

	this.takeTurn = function(player) {}

	this.makeMove = function(player, x, y) {}
}

var AIStrategy = function(game, minimax) {
	this.prototype = new MoveStrategy();
	MoveStrategy.call(this, game);

	this.minimax = minimax;

	this.takeTurn = function(player) {
		var depth = 1;
		var infinity = 100000;
		var result = this.minimax.getBestSquare(this.game.board, player, depth, -infinity, infinity);
		this.game.placeTokenOnSquare(player.getToken(), result.x, result.y);
		this.game.nextPlayersTurn();		
	}

	this.makeMove = function(player, x, y) {}
}

var UIStrategy = function(game) {
	this.prototype = new MoveStrategy();
	MoveStrategy.call(this, game);

	this.takeTurn = function(player) {}

	this.makeMove = function(player, x, y) {
		// this.game.advanceTurn(this, x, y);
		this.game.placeTokenOnSquare(player.getToken(), x, y);
		this.game.nextPlayersTurn();
	}
}