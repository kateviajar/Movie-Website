/*****************************************
 *   Author: Manjinder Singh             |
 *   Student Number: 200455485           |
 *****************************************/

var slider = document.getElementById("guessSlider");
var sliderVal = document.getElementById("guessVal");


// use of DOM 
sliderVal.innerHTML = "Your Guessed Rating: " + (slider.value/10);

// use of event "oninput"
slider.oninput = function(){
    sliderVal.innerHTML = "Your Guessed Rating: "+ (slider.value/10);
}




