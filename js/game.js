function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.speed = 1;

  this.reset();
  this.setListeners();
}

Game.prototype.reset = function() {
  this.frameCounter=0;
  this.piece = new Piece(this);
  this.board = new Board(this);

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
        this.checkColision();
      }
    }.bind(this), 1000/(this.fps));
};

//Set the listeners for every key
Game.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38:
        this.piece.rotate();
        break;
      case 37:
        this.piece.moveLeft();
        break;
      case 39:
        this.piece.moveRight();
        break;
      case 40:
        this.piece.speed = 25;
        break;
    }
  }.bind(this);
};

Game.prototype.checkColision = function(e) {
    if (this.piece.distanceFromBottom+this.piece.borderBottom.border[i] == this.board.skyLine[i+this.piece.distanceFromLeft]){
      this.piece.clearPiece();
    }
  var i=0;
  console.log(this.piece.shape.length)
  console.log(this.piece.distanceFromBottom+this.piece.borderBottom.border[i], this.board.skyLine[i+this.piece.distanceFromLeft]);
}
