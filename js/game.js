function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.speed = 1;

  this.reset();
  this.setListeners();
}

Game.prototype.reset = function() {
  this.piece = new Piece(this);
  this.board = new Board(this);
  console.log(this.board.skyLine);
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

//start with requestAnimationFrame
Game.prototype.start = function(){
    var lastTime = 0;
    this.clear();
    this.interval = setInterval(function(){
      this.clear();
      this.draw();
      this.moveAll();
    }.bind(this), 1000/this.fps);
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
        this.speed = 25;
        break;
    }
  }.bind(this);
};