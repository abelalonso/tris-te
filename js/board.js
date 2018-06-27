
Board.prototype = Object.create(Piece.prototype);
Board.prototype.constructor = Board;

function Board(game) {
  Piece.call(this, game);
  this.shape = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  this.x = 0;
  this.y = 0;
  this.skyLine = this.getSkyline(this.shape);
}
//Gets the highest position occupied on every column
 Board.prototype.getSkyline = function(matrix) {
  answer = [0,0,0,0,0,0,0,0,0,0]
  for (var i = 0; i<matrix.length; i++){
   for (j=0; j<matrix.length; j++){
     if (matrix[i][j]!=0 && answer[j]<matrix.length-i){
       answer[j]=matrix.length-i;
     }
   }
  }
  return answer;
};
//Inserts the values of a piece in the board
Board.prototype.insertPiece = function(piece, x, y){
  y = this.shape.length-y-piece.shape.length + piece.borderBottom.min;
  x = x-piece.borderLeft.min;
  piece.shape.forEach(function(row, i){
    row.forEach(function(e, j){
      if (e!=0){
        this.shape[y+i][x+j]=e;
      }
    }.bind(this));
  }.bind(this));
  this.draw();
  this.skyLine = this.getSkyline(this.shape);
  this.clearLine();
};

Board.prototype.clearLine = function(){
  var matrixAux=[];
  for(var i= this.shape.length-1; i>=0; i--){
    if (this.shape[i].filter(function(e){return e == 0}).length != 0){
      matrixAux.unshift(this.shape[i]);
    }
  }
  console.log(matrixAux.length)
  for(var i=matrixAux.length; i<20; i++){
    console.log("in")
    matrixAux.unshift([0,0,0,0,0,0,0,0,0,0]);
  }
  this.shape = matrixAux
}

