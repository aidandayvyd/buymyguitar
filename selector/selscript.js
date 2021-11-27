let choices = ["Code", "Animation", "Music", "Design", "Game"];
// choices = ["X", "Y", "Z", "Q", "R", "P", "Q"];
var display = document.getElementById("printResult");
let cycle = 4;
var audio = new Audio('bongo pattern.wav');

// from https://www.tutorialrepublic.com/faq/how-to-get-the-value-of-text-input-field-using-javascript.php
function getInputValue(){
    // Selecting the input element and get its value 
    var inVal = document.getElementById("myInput").value;
    if (inVal === '') {
        choices = [1, 2, 3, 4, 5, 6];
        // choices = ["Code", "Animation", "Music", "Design", "Game"];
        // choices = ["X", "Y", "Z", "Q", "R", "P", "Q"];
    } else {
        choices = inVal.split(",").map(function (value) { return value.trim() });
    }
    PickOne();
}

const PickOne = (ms) => {
    let n = Math.floor(Math.random() * choices.length);
    // display.value = `${choices[n]}`;
    // console.log(choices[n]);
    GenerateAnimation(choices[n]);
    ani();
}

const GenerateAnimation = (final) => {
    //generates the keyframes for the animation cycle
    let output =
        `<style>
        #display:before{content: '?????';animation: cycleAnim 3.22s 1 forwards;}
        @keyframes cycleAnim{
            0%{content: '${choices[0]}';}`;
    
    let stages = [40, 30, 20, 10];
    let s = 0;

    for (let i = 0; i < stages.length; i++) {
        for (let j = 0; j < choices.length; j++) {
            var equ = (stages[i] / choices.length);
            output += `${(equ * j) + s}%{content: '${choices[j]}';}`
        }
        s += stages[i];
    }
    
    //last, final value is always the randomly chosen one
    output +=
        `100%{content: '${final}';}}</style>`;
    
    document.getElementById("animatedText").innerHTML = output;
}

// controls the stupid sound effect if user clicks 'again?' mid-animation
function play() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
        audio.currentTime = 0
    }
}

// a very simplistic way to control the animation between rolling and not rolling
function ani() {
    if (document.getElementById("display").style.display === "none") {
        document.getElementById("display").style.display = "block";
        document.getElementById("splash").style.display = "none";
        document.getElementById("clickMe").value = " again?  ";
        play();
    } else {
        document.getElementById("display").style.display = "none";
        document.getElementById("splash").style.display = "block";
        document.getElementById("clickMe").value = "click me!";
        audio.pause();
        audio.currentTime = 0
    }
}

// PickOne();
