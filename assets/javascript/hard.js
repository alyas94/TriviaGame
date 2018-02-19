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
var time;
var clockRunning = false;
//object to hold our questions, answer choices and correct answer
var qA = [
		{
			question: "What is the capital of Nevada?",
			choices:["Reno","Carson City","Las Vegas", "Boulder City"],
			answer: "Carson City",
			gif:"assets/images/Nevada-flag.gif"
		},
		{
			question: "What is the capital of Oregon?",
			choices:["Salem","Portland","Eugene","Bend"],
			answer: "Salem",
			gif:"assets/images/Oregon.gif"
		},
		{
			question: "What is the capital of Vermont?",
			choices:["Burlington","Bennington","Stowe","Montpelier"],
			answer: "Montpelier",
			gif:"assets/images/Vermont.gif"
		},
		{
			question: "What is the capital of Missouri?",
			choices:["Springfield","St. Louis","Jefferson City","Kansas City"],
			answer: "Jefferson City",
			gif:"assets/images/Missouri.gif"
		},
		{
			question: "What is the capital of Hawaii?",
			choices:["Wailea","Honolulu","Kailua","Oahu"],
			answer: "Honolulu",
			gif:"assets/images/Hawaii.gif"
		},
	]

/*screen will first show: "press to start". once they press start, empty start div.*/

$(".start-btn").on("click", function(){
	$("#start-btn-div").html("");
	//next we need to ask questions and answers on screen.
	//call funcAtion to do this:
	questionsAnswers();
});

function questionsAnswers(){
	if (i < qA.length){
		timer();
		$("#question-div").text(qA[i].question);
		for (var j = 0; j < 4; j++) {
			$("#choices-div").append("<p><button class='btn-sm choice-btn btn-block' value = '" + qA[i].choices[j]+ "'>"+qA[i].choices[j]+"</button></p>");
		}
	}
	else{
		endScreen();
	}
}

$(document).on("click",".choice-btn",checkGuess)

function timer(){
	time = 3;
	intervalId = setInterval(count,1000);
}
function count(){
	time--;
	console.log(time);
	$("#timer-div").text("Time remaining: " +time+ " seconds");
	if(time < 0){
		$("#timer-div").text("TIMES UP!");
		clearInterval(intervalId);
		checkGuess();

	}
}
function checkGuess(){
	var userGuess = $(this).attr("value");
	console.log(userGuess);
	if (userGuess == undefined){
		unanswered++;
		wait();
		$("#results-div").append("<img class ='results-gif'src='assets/images/Judge-Judy.gif'/>");
		$("#results-div").append("<p class = 'waiting-screen'>Dude, you ran out of time!</p>");
		$("#results-div").append("<p class = 'oot-answer'>"+qA[i].answer+" is the capital!</p>");
	}
	else if(userGuess == qA[i].answer){
		//they got it right
		//call function to clear and reset
		correct++;
		clearInterval(intervalId);
		wait();
		$("#results-div").append("<p class = 'waiting-screen'>Great Job!</p>");
		$("#results-div").append("<img class ='results-gif'src='"+qA[i].gif+ "'/>");
	}
	else{
		//wrong
		//call function to clear and reset
		incorrect++;
		clearInterval(intervalId);
		wait();
		$("#results-div").append("<img class ='results-gif'src='assets/images/Trump.gif'/>");
		$("#results-div").append("<p class = 'waiting-screen wrong-answer'>"+qA[i].answer+" is the capital!</p>");
	}
}

function nextQuestion(){
	$("#results-div").empty();
	i++
	questionsAnswers();
}

function wait(){
	$("#choices-div").empty();
	$("#question-div").empty();
	$("#timer-div").empty();
	console.log("waiting...");
	timerId = setTimeout(nextQuestion,3000);
}

function endScreen(){
	$("#results-div").empty();
	$("#results-div").append("<h1>ALL DONE!</h1>");
	// $("#results-div").append("<h3>Results: </h3>");
	if(correct == qA.length){
		$("#results-div").append("<div>You got all " + correct + " right!</div>");
		$("#results-div").append("<div class = 'comment'>You know a lot about 'Murica</div>");
		$("#results-div").append("<img class ='results-gif'src='assets/images/Murica.gif'/>");
	}
	else if(incorrect == qA.length){
		$("#results-div").append("<div>You got all "+ incorrect+ " wrong...</div>");
		$("#results-div").append("<img class ='results-gif'src='assets/images/idiot-sandwich.gif'/>");
		$("#results-div").append("<div class = 'comment'>C'mon, Dude.</div>");
	}
	else{
		$("#results-div").append("<div>You got " + correct + " right!</div>");
		$("#results-div").append("<div>You got "+ incorrect+ " wrong!</div>");
		if(unanswered != 0){
			$("#results-div").append("<div>You didnt answer: "+unanswered+"</div>");
		}
	}
}