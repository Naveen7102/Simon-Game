var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level+1;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){ $("."+currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("right");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){ nextSequence()}, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over") }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
        playSound("wrong");
        console.log("wrong");
    }
}

$("body").keydown(function (){
    if(!started){
        nextSequence();
        started = true;
    }
})