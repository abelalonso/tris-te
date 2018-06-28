window.onload = function(){
    var game=new Game("triste");
    var soundID = "Thunder";
    var audio = new Audio("resources/tetristheme.mp3");

    $(".btn").click(function (e){
        if(game.interval!=undefined){
            clearInterval(game.interval);
        }
        game.start();
        audio.play();
    });
    
    $("#classic").click(function (e){
        audio.pause();
        $(".level").prop("disable", false);
        $("#classic").prop("disable", true);
        audio = new Audio("resources/tetristheme.mp3");
        audio.play();
        $("body").css({
            "background-image": "url(resources/tetris.jpg)",
            "background-repeat": "no-repeat",
            "background-size": "cover"});
        $("label").css({color: "white"});
        //
    })
    $("#relaxed").click(function (e){
        audio.pause();
        $(".level").prop("disable", false);
        $("#relaxed").prop("disable", true);
        audio = new Audio("resources/tetrisreggae.mp3");
        audio.play();
        $("body").css({
            "background-image": "url(resources/bigphotoformaspalomas.jpg)",
            "background-repeat": "no-repeat",
            "background-size": "cover"});
        $("label").css({color: "white"});
        //
    });
    $("#exciting").click(function (e){
        audio.pause();
        $(".level").prop("disable", false);
        $("#exciting").prop("disable", true);
        audio = new Audio("resources/tetrismetal.mp3");
        audio.play();
        $("body").css({
            "background-image": "url(resources/heavymetal.jpg)",
            "background-repeat": "no-repeat",
            "background-size": "cover"});
        $("label").css({color: "white"});
    })
    $("#again").click(function (e){
        location.reload();
    })
};
