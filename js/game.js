function Game(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.ctx = this.canvas.getContext("2d");

  this.reset();
}

Game.prototype.reset = function() {
  this.piece = new Piece(this);
};

Game.prototype.draw = function() {
  this.piece.draw();
};

Game.prototype.moveAll = function() {};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

//start with requestAnimationFrame
Game.prototype.start = function(){
    var lastTime = 0;
    this.clear();
    update = function(time){
      this.clear();
      var delta = time-lastTime;
      lastTime = time;
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
      this.draw();
      this.moveAll(delta);
      window.requestAnimationFrame(update);
    }.bind(this);
  window.requestAnimationFrame(update);
}