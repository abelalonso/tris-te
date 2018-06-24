function Piece(game) {
  var shapes = [
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
    [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
    [[1, 0, 0], [1, 0, 0], [1, 1, 0]],
    [[0, 0, 1], [0, 0, 1], [0, 1, 1]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[1, 1], [1, 1]]
  ];
  var colors = [
    "rgb(102, 0, 204)",
    "rgb(0, 255, 255)",
    "rgb(255, 153, 0)",
    "rgb(0, 0, 255)",
    "rgb(0, 255, 0)",
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)"
  ];
  this.index = parseInt(Math.random() * colors.length);
  this.shape = shapes[this.index];
  this.color = colors[this.index];
  this.x = 50;
  this.y = 50;
  this.squareWidth = 20;

  this.game = game;
  this.setListeners();
}

Piece.prototype.rotate = function() {
  var result = this.shape.map(function(row) {
    return row.map(function(e) {
      return 0;
    });
  });

  this.shape.forEach(function(row, rowIndex) {
    row.forEach(function(e, colIndex) {
      result[colIndex][row.length - 1 - rowIndex] = e;
    });
  });
  this.shape = result;
};

Piece.prototype.draw = function() {
  that = this;
  this.shape.forEach(function(row, rowIndex) {
    row.forEach(function(e, colIndex) {
      if (e == 1) {
        that.drawSquare(
          that.x + that.squareWidth * colIndex,
          that.y + that.squareWidth * rowIndex,
          that.squareWidth,
          that.squareWidth
        );
      }
    });
  });
};

Piece.prototype.drawSquare = function(x, y, width, height) {
  this.game.ctx.save();
  this.game.ctx.fillStyle = this.color;
  this.game.ctx.fillRect(x, y, width, height);
  this.game.ctx.restore();
};

Piece.prototype.moveRight = function() {
  if (this.x+(this.shape.length*this.squareWidth)<this.game.canvas.width){
    this.x+=this.squareWidth;
  }
};

Piece.prototype.moveLeft = function() {
  if(this.x>0){
    this.x-=this.squareWidth;
  }
};

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
