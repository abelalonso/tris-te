
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
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  this.x = 0;
  this.y = 0;
  this.skyLine = this.getSkyline(this.shape);
}

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

Board.prototype.insertPiece = function(piece, x, y){
  y = this.shape.length-y-piece.length;
  piece.forEach(function(row, i){
    row.forEach(function(e, j){
      this.shape[y+i][x+j]=e;
    }.bind(this));
  }.bind(this));
  this.draw();
};