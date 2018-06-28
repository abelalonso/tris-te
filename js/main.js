window.onload = function(){
    var game=new Game("triste");
    var soundID = "Thunder";

    $("#start").click(function (e){
        $("#start").text("Pause");
        $("#stop").text("Resume");
        $("#start").toggleClass("btn-danger");
        $("#start").toggleClass("btn-primary");
        $("#start").attr("id", "stop");
        $("#stop").attr("id", "start");
        game.start();
    });
    
    $("#classic").click(function (e){
        $(".level").prop("disable", false);
        $("#classic").prop("disable", true);
        console.log("classic");
        var audio = new Audio("resources/tetristheme.mp3");
        audio.play();
        //
    })
    $("#relaxed").click(function (e){
        $(".level").prop("disable", false);
        $("#relaxed").prop("disable", true);
        console.log("relaxed");
        var audio = new Audio("resources/tetrisreggae.mp3");
        audio.play();
        //
    })
    $("#exciting").click(function (e){
        $(".level").prop("disable", false);
        $("#exciting").prop("disable", true);
        console.log("exciting");
        var audio = new Audio("resources/tetrismetal.mp3");
        audio.play();
    })

};
