function Piece(game) {
  var shapes = [
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
    [[0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0], [0, 2, 0, 0]],
    [[3, 0, 0], [3, 0, 0], [3, 3, 0]],
    [[0, 0, 4], [0, 0, 4], [0, 4, 4]],
    [[0, 0, 0], [5, 5, 0], [0, 5, 5]],
    [[0, 0, 0], [0, 6, 6], [6, 6, 0]],
    [[7, 7], [7, 7]]
  ];
  this.colors = [,
    "rgb(102, 0, 204)",
    "rgb(0, 255, 255)",
    "rgb(255, 153, 0)",
    "rgb(0, 0, 255)",
    "rgb(0, 255, 0)",
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)"
  ];
  this.game = game;

  //phisycal properties
  this.index = parseInt(Math.random() * this.colors.length);
  this.shape = shapes[this.index];
  this.x = (this.game.canvas.width)/2;
  this.y = 50;
  this.squareWidth = 35;

  this.setListeners();
  this.calculateBorders();
}
//Calculates the borders of each piece
Piece.prototype.calculateBorders = function (){
  getBorder = function(matrix){
    return matrix.map(function (e){
      if (matrix.length<4){
        return e.indexOf(matrix[1].filter(function (e2){return e2!=0})[0]);
      } else {
        return e.indexOf(2);
      }
    });
  };
  //border Left
  matrix = this.shape;
  this.borderLeft = getBorder(matrix);
  // border Top
  matrix = this.transformMatrix(matrix);
  this.borderBottom = getBorder(matrix);
  // border Right
  matrix = this.transformMatrix(matrix);
  this.borderRight = getBorder(matrix);
  // border Bottom
  matrix = this.transformMatrix(matrix);
  this.borderTop = getBorder(matrix);
}
//turns a matrix to right
Piece.prototype.transformMatrix = function(matrix){
  var result = matrix.map(function(row) {
    return row.map(function(e) {
      return 0;
    });
  });
  matrix.forEach(function(row, rowIndex) {
    row.forEach(function(e, colIndex) {
      result[colIndex][row.length - 1 - rowIndex] = e;
    });
  });
  return result;
}
//Rotate the piece
Piece.prototype.rotate = function() {
  var aux = this.borderTop;
  this.borderTop = this.borderLeft;
  this.borderLeft = this.borderBottom;
  this.borderBottom = this.borderRight;
  this.borderRight = aux;
  //Checks if the piece is out of bounds from the left when turning
  this.shape = this.transformMatrix(this.shape);
  while (this.x + Math.min.apply(null, this.borderLeft.filter(function (e){return e!=-1})) * this.squareWidth<0){
    this.moveRight();
  }
  //Checks if the piece is out of bounds from the right when turning
  while ((this.x + 
        (this.shape.length - 
        (Math.min.apply(null, this.borderLeft.filter(function (e){return e != -1})))) * 
        this.squareWidth) >  this.game.canvas.width){
    this.moveLeft();
  }
};
//Draws the piece
Piece.prototype.draw = function() {
  this.shape.forEach(function(row, rowIndex) {
    row.forEach(function(e, colIndex) {
      if (e != 0) {
        this.drawSquare(
          this.x + this.squareWidth * colIndex,
          this.y + this.squareWidth * rowIndex,
          this.squareWidth,
          this.squareWidth
        );
      }
    }.bind(this));
  }.bind(this));
};
//Draws the little square
Piece.prototype.drawSquare = function(x, y, width, height) {
  this.game.ctx.save();
  if (this.shape.length<4){
    this.game.ctx.fillStyle = this.colors[this.shape[1].filter(function (e){return e!=0})[0]];
  } else {
    this.game.ctx.fillStyle = this.colors[2];
  }
  this.game.ctx.fillRect(x, y, width, height);
  this.game.ctx.restore();
};
//Moves the piece to the left
Piece.prototype.moveLeft = function() {
  if(this.x + Math.min.apply(null, this.borderLeft.filter(function (e){return e != -1})) * this.squareWidth > 0){
    this.x -= this.squareWidth;
  }
};
//Moves the piece to the right
Piece.prototype.moveRight = function() {
  if (this.x + (this.shape.length * this.squareWidth) - Math.min.apply(null, this.borderRight.filter(function (e){return e != -1})) * this.squareWidth < this.game.canvas.width){
    this.x += this.squareWidth;
  }
};
//Moves the piece down
Piece.prototype.moveDown = function() {
  if((this.y+(this.shape.length*this.squareWidth))<this.game.canvas.height){
    this.y+=this.game.speed;
  }
}
//Set the listeners for every key
Piece.prototype.setListeners = function() {
  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38:
        this.rotate();
        break;
      case 37:
        this.moveLeft();
        break;
      case 39:
        this.moveRight();
        break;
    }
  }.bind(this);
};
