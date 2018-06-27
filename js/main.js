window.onload = function(){
    var game=new Game("triste");
    $(".btn").click(function (e){
        $("#start").text("Stop");
        $("#stop").text("Start");
        $("#start").toggleClass("btn-danger");
        $("#start").toggleClass("btn-primary");
        $("#start").attr("id", "stop");
        $("#stop").attr("id", "start");
        game.start();
    });
};