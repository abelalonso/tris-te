function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = this.canvas.getContext("2d");
  this.fps = 60;
  this.speed = 1;

  this.reset();
}

Game.prototype.reset = function() {
  this.piece = new Piece(this);
};

Game.prototype.draw = function() {
  this.piece.draw();
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