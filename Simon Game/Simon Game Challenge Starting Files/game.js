
let gamePattern = []
let buttonColors = ["red", "blue", "green", "yellow"]
let userClickedPattern = []

let started = false
let level = 0

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("Level - " + level);
    }
    nextSequence()
    started = true
});


$('.btn').click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1)
})


function nextSequence() {
    userClickedPattern = []
    level++
    $("#level-title").text("Level - " + level);
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColors[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
    animatePress(randomChosenColour)
}

function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3")
    audio.play()

}
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('Success')

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);

        }
    } else {
        $('#level-title').text('Game Over 😪, Press Any Key To Restart!');
        $('body').addClass('game-over')
        let newAudio = new Audio('sounds/wrong.mp3')
        newAudio.play()
        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 200);
        startOver()
        console.log('Wrong')
    }
}

function startOver() {
    started = false
    level = 0
    gamePattern = []
}