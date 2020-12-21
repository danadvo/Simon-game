var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level =0;

$(document).keydown(function(){
  if (!started){
    started = true;
    nextSequence();
  }
});


$(".btn").click(function() {
                          if(started){
                            var userChosenColour = $(this).attr("id");
                            userClickedPattern.push(userChosenColour);

                            playSound(userChosenColour);
                            animatePress(userChosenColour);
                            checkAnswer(userClickedPattern.length-1);

                          }

                          });


function nextSequence(){
  userClickedPattern = [];
  $("h1").text ("Level " + level);
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed"), 100
  });
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      if(userClickedPattern.length===gamePattern.length){
        userClickedPattern=[];
        setTimeout(function(){
                  nextSequence();
                  },1000);
      }
  }else{
      playSound("wrong");
      $("h1").text ("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern= [];
  started = false; 
}
