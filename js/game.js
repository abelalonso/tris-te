function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.speed = 1;

  this.reset();
  this.setListeners();

  this.keyboard = {
    up: 38,
    down: 40,
    left: 37,
    right: 39 
  }
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

Game.prototype.reset = function() {
  this.piece = new Piece(this);
  this.board = new Board(this);
  this.auxBoard = new Board(this);
};


Game.prototype.draw = function() {
  this.piece.draw();
  this.board.draw();
};

Game.prototype.moveAll = function() {
  this.piece.moveDown();
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

//start with setInterval
Game.prototype.start = function(){
    this.clear();
    this.interval = setInterval(function(){
      for (var i=0; i<this.piece.speed; i++){
        this.clear();
        this.draw();
        this.moveAll();
        if(this.checkCollision()){
        }
      }
    }.bind(this), 1000/(this.fps));
};

Game.prototype.checkCollision = function() {
  if ((this.piece.shape.length==4) && (this.piece.borderLeft.border[0]==-1) && this.piece.distanceFromBottom == 0){
    console.log("Stick horizontal");
    console.log("colision");
    this.auxBoard.clearBoard();
    this.piece.clearPiece();
    this.piece = new Piece(this);
    return true;
  }
  
  for (var i=1; i<this.auxBoard.shape.length; i++){
    this.auxBoard.shape[i].forEach(function (e, j){
      if(this.auxBoard.shape[i-1][j]*this.board.shape[i][j]!=0){
        console.log("colision");
        this.auxBoard.clearBoard();
        this.piece.clearPiece();
        this.piece = new Piece(this);
        return true;
      }
    }.bind(this));
  };
  return false;
};