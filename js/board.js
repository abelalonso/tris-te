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
}
//Clears the whole matrix
Board.prototype.clearBoard = function() {
  this.shape.forEach(
    function(row, i) {
      row.forEach(
        function(e, j) {
          this.shape[i][j] = 0;
        }.bind(this)
      );
    }.bind(this)
  );
  return matrix;
};

//Inserts the values of a piece in the board
Board.prototype.insertPiece = function(piece, x, y) {
  y = this.shape.length - y - piece.shape.length + piece.borderBottom.min;
  x = x - piece.borderLeft.min;
  piece.shape.forEach(
    function(row, i) {
      row.forEach(
        function(e, j) {
          if (e != 0) {
            this.shape[y + i][x + j] = e;
          }
        }.bind(this)
      );
    }.bind(this)
  );
  this.clearLine();
};
//Clear the line if its completed
Board.prototype.clearLine = function() {
  var matrixAux = [];
  for (var i = this.shape.length - 1; i >= 0; i--) {
    if (
      this.shape[i].filter(function(e) {
        return e == 0;
      }).length != 0
    ) {
      matrixAux.unshift(this.shape[i]);
    }
  }
  for (var i = matrixAux.length; i < 20; i++) {
    matrixAux.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    this.game.updateData();
    if(this.game.score % 1000 == 0){
      console.log("level up")
      $("#play-msg").text("Level up!!!");
      $("#play-msg").fadeIn(500).delay(500).fadeOut(1000);
    }else{
      var audio = new Audio('resources/linea.mp3');
      $("#play-msg").text("Line up!!!");
      $("#play-msg").fadeIn(500).delay(500).fadeOut(1000);
      audio.play();
    }
  }
  this.shape = matrixAux;
};
