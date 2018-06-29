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
        this.canMoveLeft = true;
        this.canMoveRight = true;
        this.lateralCollision(1);
        this.lateralCollision(-1);
        if (this.canMoveLeft && this.canMoveRight) {
          this.piece.rotate();
        }
        break;
      case this.keyboard.left:
        this.canMoveLeft = true;
        this.lateralCollision(1);
        if (this.canMoveLeft) {
          this.piece.moveLeft();
        }
        break;
      case this.keyboard.right:
        this.canMoveRight = true;
        this.lateralCollision(-1);
        if (this.canMoveRight) {
          this.piece.moveRight();
        }
        break;
      case this.keyboard.down:
        this.piece.speed = 25;
        break;
    }
  }.bind(this);
};
//Resets the game
Game.prototype.reset = function() {
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
  this.piece = new Piece(this);
  this.nextPiece = new Piece(this);
  this.nextPiece.speed = 0;
  this.drawNextPiece();
  this.clear();
  this.interval = setInterval(
    function() {
      for (var i = 0; i < this.piece.speed; i++) {
        this.clear();
        this.draw();
        this.moveAll();
        if (this.checkCollision()) {
        }
      }
    }.bind(this),
    1000 / this.fps
  );
};
//Updates the game data
Game.prototype.updateData = function() {
  this.score += 100;
  if (this.score % 1000 == 0) {
    var audio = new Audio("resources/yeah.mp3");
    audio.play();
    this.level++;
    this.speed++;
    $("#level").text("Level: " + this.level);
  }
  $("#score").text("Score: " + this.score);
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
    this.piece = this.nextPiece;
    this.piece.speed = this.speed;
    this.nextPiece = new Piece(this);
    this.drawNextPiece();
    return true;
  }
  //Regular case
  for (var i = 1; i < this.auxBoard.shape.length; i++) {
    this.auxBoard.shape[i].forEach(
      function(e, j) {
        if (this.auxBoard.shape[i - 1][j] * this.board.shape[i][j] != 0) {
          if (this.piece.distanceFromBottom == 18) {
            this.gameOver();
          }
          this.auxBoard.clearBoard();
          this.piece.clearPiece();
          this.piece = this.nextPiece;
          this.piece.speed = this.speed;
          this.nextPiece = new Piece(this);
          this.drawNextPiece();
          return true;
        }
      }.bind(this)
    );
  }
  return false;
};

Game.prototype.gameOver = function() {
  clearInterval(this.interval);
  var audio = new Audio("resources/error.mp3");
  audio.play();
  $(".btn").prop("disabled", true);
  $("#again").prop("disabled", false);
  this.audio.pause();
  var timeoutId = setTimeout(function() {
    var audio = new Audio("resources/gameover.mp3");
    $("#play-msg")
      .text("GAME OVER")
      .css({
        "font-size": "7.5em",
        top: "20%"
      });
    $("#play-msg").fadeIn(500);
    audio.play();
  }, 1000);
};

Game.prototype.lateralCollision = function(direction) {
  //direction = -1 left
  for (var i = 1; i < this.auxBoard.shape.length; i++) {
    this.auxBoard.shape[i].forEach(
      function(e, j) {
        if (
          j > 0 &&
          j < this.board.shape[0].length - 1 &&
          this.auxBoard.shape[i][j + 1 * direction] * this.board.shape[i][j] !=
            0
        ) {
          if (direction == 1) {
            this.canMoveLeft = false;
          } else {
            this.canMoveRight = false;
          }
          return true;
        }
      }.bind(this)
    );
  }
  return false;
};
//Draws the next piece on the DOM
Game.prototype.drawNextPiece = function() {
  $(".little-square").css({ background: "rgba(0,0,0,0)" });
  $(".little-square").css({ border: "none" });
  this.nextPiece.shape.forEach(
    function(row, i) {
      row.forEach(
        function(e, j) {
          if (e != 0) {
            document.getElementById(
              i + "-" + j
            ).style.background = this.nextPiece.color;
            document.getElementById(i + "-" + j).style.border =
              "1px solid rgba(255, 255, 255, 0.5)";
          }
        }.bind(this)
      );
    }.bind(this)
  );
};
