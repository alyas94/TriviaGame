//JS FOR TRIVIA GAME.

/*Things I Need:
object that has questions and answers,
a timer to display how much time is left.

function to display questions and answers
if statment to tell if guess is right or wrong.
*/

//variables to hold their scores:
var i = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var time = 5;
var clockRunning = false;
//object to hold our questions, answer choices and correct answer
var qA = [
		{
			question: "What is the capital of Nevada?",
			choices:["Reno","Carson City","Las Vegas", "Boulder City"],
			answer: "Carson City"
		},
		{
			question: "What is the capital of Oregon?",
			choices:["Salem","Portland","Eugene","Bend"],
			answer: "Salem"
		},
		{
			question: "What is the capital of Vermont?",
			choices:["Burlington","Bennington","Stowe","Montpelier"],
			answer: "Montpelier"
		},
	]

/*screen will first show: "press to start". once they press start, empty start div.*/

$(".btn-block").on("click", function(){
	$("#start-btn").html("");
	//next we need to ask questions and answers on screen.
	//call funcAtion to do this:
	questionsAnswers();
	timer();
});

function questionsAnswers(){
		$("#question-div").text(qA[i].question);
		for (var j = 0; j < 4; j++) {
			$("#choices-div").append("<p><button class='btn-sm choice-btn' value = '" + qA[i].choices[j]+ "'>"+qA[i].choices[j]+"</button></p>");
		}
	}

$(document).on("click",".choice-btn",checkGuess)

function timer(){
	time = 15;
	intervalId = setTimeout(count,1000);
	console.log(intervalId);
}
function count(){
	time--;
	console.log(time);
	$("#timer-div").text("Time remaining: " +time+ " seconds");
	if(time < 0){
		$("#timer-div").text("TIMES UP!");
		clearTimeout(intervalId);

}

}
function checkGuess(){
	var userGuess = $(this).attr("value");
	console.log(userGuess);
	if(userGuess == qA[i].answer){
		//they got it right
		//call function to clear and reset
		nextQuestion();
	}
	else if(userGuess != qA[i].answer){
		//wrong
		//call function to clear and reset
		nextQuestion();
	}
}

function nextQuestion(){
	i++
	$("#choices-div").empty();
	questionsAnswers();
}









