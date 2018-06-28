var gameMode;
window.onload = function() {
  $("#classic").click(function(e) {
    gameMode = "classic";
    console.log("hola");
  });
  $("#relaxing").click(function(e) {
    gameMode = "relaxing";
  });
  $("#exciting").click(function(e) {
    gameMode = "exciting";
  });
};
