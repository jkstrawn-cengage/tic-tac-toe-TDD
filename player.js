var Player = function(token, moveStrategy) {
	this.token = token;
	this.moveStrategy = moveStrategy;

	this.getToken = function() {
		return this.token;
	}

	this.takeTurn = function() {
		this.moveStrategy.takeTurn(this);
	}

	this.makeMove = function(x, y) {
		this.moveStrategy.makeMove(this, x, y);
	}
}