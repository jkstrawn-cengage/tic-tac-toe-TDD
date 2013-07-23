var PlayerController = function() {
	this.players = [];
	this.currentPlayer = null;

	this.initiate = function() {
		this.currentPlayer = this.getPlayer(1);
	}

	this.addPlayer = function(player) {
		this.players.push(player);
	}

	this.setPlayer = function(player, index) {
		this.players[index] = player;
	}

	this.getPlayer = function(playerNumber) {
		return this.players[playerNumber - 1];
	}

	this.getOtherPlayer = function(player) {
		if (player.getToken() == this.getPlayer(1).getToken()) {
			return this.getPlayer(2);
		} else {
			return this.getPlayer(1);
		}
	}

	this.takeTurn = function() {
		this.currentPlayer.takeTurn();
	}

	this.makeMove = function(x, y) {
		this.currentPlayer.makeMove(x, y);
	}

	this.switchPlayers = function() {
		this.currentPlayer = this.getOtherPlayer(this.currentPlayer);
	}

	this.getCurrentPlayer = function() {
		return this.currentPlayer;
	}
}