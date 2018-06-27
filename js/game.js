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
  isCollision = function(){
    var widthWithoutSpaces = this.piece.borderBottom.border.filter(function(e){return e!=-1}).length;
    console.log(this.board.skyLine);
    console.log(this.piece.borderBottom.border);
    var aux = 0;
/*     if((this.piece.shape.length<4) && (this.piece.borderBottom.border[0]==-1)){
      aux++;
      console.log(aux)
    } */
    for (var i=0; i<widthWithoutSpaces; i++){
        if (this.piece.distanceFromBottom+aux+(this.piece.borderBottom.border[i]>0?this.piece.borderBottom.border[i]:0) == this.board.skyLine[i+this.piece.distanceFromLeft]+this.piece.borderBottom.min-aux){
        return true;
      }
    }
    return false;
  }.bind(this); 
/* 
  isCollision2 = function(){
    var x = this.piece.distanceFromLeft;
    var y = this.board.shape.length-this.piece.distanceFromBottom-this.piece.shape.length+1;
    this.piece.shape.forEach(function(row, i){
      row.forEach(function(e, j){
        if ((e!=0) && (this.board.shape[j+y][i+x]) !=0){
          console.log("collision");
          console.log(this.board.shape[j+y][i+x])
        }else{
          console.log("ok");
        }
      }.bind(this))
    }.bind(this))
  }.bind(this)
   */
  if (isCollision()){
    this.piece.clearPiece();
  } 
 
};
