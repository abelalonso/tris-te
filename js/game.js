function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.speed = 1;
  this.score = 0;
  this.level = 1;

  this.reset();
  this.setListeners();

  this.keyboard = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
  };
}

//Set the listeners for every key
Game.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case this.keyboard.up:
        this.piece.rotate();
        break;
      case this.keyboard.left:
        this.piece.moveLeft();
        break;
      case this.keyboard.right:
        this.piece.moveRight();
        break;
      case this.keyboard.down:
        this.piece.speed = 25;
        break;
    }
  }.bind(this);
};
//Resets the game
Game.prototype.reset = function() {
  this.piece = new Piece(this);
  this.nextPiece = new Piece(this);
  this.nextPiece.speed = 0;
  this.board = new Board(this);
  this.auxBoard = new Board(this);
};
//Draws every component
Game.prototype.draw = function() {
  this.piece.draw();
  this.board.draw();
};
//moves the piece
Game.prototype.moveAll = function() {
  this.piece.moveDown();
};
//Clear the canvas
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
//start with setInterval
Game.prototype.start = function() {
  this.clear();
  this.interval = setInterval(
    function() {
      for (var i = 0; i < this.piece.speed; i++) {
        this.clear();
        this.draw();
        this.moveAll();
        if (this.checkCollision()) {
        }
        console.log(this.nextPiece.shape);
      }
    }.bind(this),
    1000 / this.fps
  );
};
//Check if the piece is going to occupate a fill position
Game.prototype.checkCollision = function() {
  //Solves the problem with 1 square' width piece
  if (
    this.piece.shape.length == 4 &&
    this.piece.borderLeft.border[0] == -1 &&
    this.piece.distanceFromBottom == 0
  ) {
    this.auxBoard.clearBoard();
    this.piece.clearPiece();
    this.piece = new Piece(this);
    return true;
  }
  //Regular case
  for (var i = 1; i < this.auxBoard.shape.length; i++) {
    this.auxBoard.shape[i].forEach(
      function(e, j) {
        if (this.auxBoard.shape[i - 1][j] * this.board.shape[i][j] != 0) {
          this.auxBoard.clearBoard();
          this.piece.clearPiece();
          this.piece = this.nextPiece;
          this.piece.speed = this.speed;
          this.nextPiece = new Piece(this);
          return true;
        }
      }.bind(this)
    );
  }
  return false;
};
//Updates the game data
Game.prototype.updateData = function() {
  this.score += 100;
  if (this.score % 1000 == 0) {
    this.level++;
    this.speed++;
    $("#level").text("Level: " + this.level);
  }
  $("#score").text("Score: " + this.score);
};
