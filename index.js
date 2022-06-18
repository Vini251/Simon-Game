var gamePattern = [];
var userClickedPattern =[];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);  
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern= [];

    $("#level-title").text("Level " + level);
    level++;

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" +randomChosenColor).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);
}


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100)
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        console.log("Success!");

        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("Wrong!");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").text("Game Over, Press Any Key to Restart!")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}