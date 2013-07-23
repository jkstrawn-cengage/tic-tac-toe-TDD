var Minimax = function(playerController) {
	this.playerController = playerController;

	this.getBestSquare = function(board, player, depth, alpha, beta) {
		if (board.isGameOver() || depth > 6) {
			return {score: this.getScoreForGameOver(player, board)};
		}

		var emptySquares = board.getEmptySquares();
		var bestMove = {x: -1, y: -1};
		var otherPlayer = this.playerController.getOtherPlayer(player);

		for (var i = 0; i < emptySquares.length; i++) {
			var _square = emptySquares[i];
			var clonedBoard = board.clone();
			clonedBoard.setToken(player.getToken(), _square.x, _square.y);
			var alphaCandidate = -this.getBestSquare(clonedBoard, otherPlayer, depth + 1, -beta, -alpha).score;

			if (beta <= alpha)
				break;

			if (alphaCandidate > alpha) {
				alpha = alphaCandidate;
				bestMove = _square;
			}
		}

		return {score: alpha * .95, x: bestMove.x, y: bestMove.y};
	}

	this.getScoreForGameOver = function(player, board) {
		if (board.isWinner() == player.getToken()) {
			return 1;
		} else if (board.isWinner() == false) {
			return 0;
		} else {
			return -1;
		}
	}
}