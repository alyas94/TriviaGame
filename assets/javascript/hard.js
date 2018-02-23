//JS FOR TRIVIA GAME.

/*Things I Need:
object that has questions and answers,a timer to display how much time is left, function to display questions and answers & if statment to tell if guess is right or wrong.*/

//variables Needed:
var i = 0; //index for displaying qA array
var correct = 0;
var incorrect = 0;
var unanswered = 0; //if they didnt guess in time
var time; //global for use in 2 functions

//object to hold our questions, answer choices and correct answer
var qA = [
{
	question: "What is the capital of Nevada?",
	choices: ["Reno", "Carson City", "Las Vegas", "Boulder City"],
	answer: "Carson City",
	gif: "assets/images/Nevada-flag.gif"
},
{
	question: "What is the capital of Oregon?",
	choices: ["Salem", "Portland", "Eugene", "Bend"],
	answer: "Salem",
	gif: "assets/images/Oregon.gif"
},
{
	question: "What is the capital of Vermont?",
	choices: ["Burlington", "Bennington", "Stowe", "Montpelier"],
	answer: "Montpelier",
	gif: "assets/images/Vermont.gif"
},
{
	question: "What is the capital of Missouri?",
	choices: ["Springfield", "St. Louis", "Jefferson City", "Kansas City"],
	answer: "Jefferson City",
	gif: "assets/images/Missouri.gif"
},
{
	question: "What is the capital of Hawaii?",
	choices: ["Wailea", "Honolulu", "Kailua", "Oahu"],
	answer: "Honolulu",
	gif: "assets/images/Hawaii.gif"
}, ]

//screen will first show: "press to start". once they press start, empty start div.
$(".start-btn").on("click", function ()
{
	$("#start-btn-div").html("");
	/*once clicked start, display questions and answers on screen.
	Call function questionAnswers() to do this:*/
	questionsAnswers();
});

//this function will display questions and Answers to the screen.
function questionsAnswers()
{
	//if our index is smaller than our array:
	if (i < qA.length)
	{
		timer(); //start the timer
		//display questions & choices to the screen
		$("#question-div").text(qA[i].question);
		for (var j = 0; j < 4; j++)
		{
			$("#choices-div").append("<p><button class='btn-sm choice-btn btn-block' value = '" + qA[i].choices[j] + "'>" + qA[i].choices[j] + "</button></p>");
		}
	}
	else
	{
		//if index is larger than our array, we're out of questions, display their results.
		endScreen();
	}
}
//when user clicks an answer, checkGuess() is called
$(document).on("click", ".choice-btn", checkGuess)

function timer()
{
	time = 10;
	intervalId = setInterval(count, 1000);
}

function count()
{
	time--;
	console.log(time);
	$("#timer-div").text("Time remaining: " + time + " seconds");
	if (time < 0)
	{ //they ran out of time
		$("#timer-div").text("TIMES UP!");
		clearInterval(intervalId);
		checkGuess();

	}
}

function checkGuess()
{
	var userGuess = $(this).attr("value");
	console.log(userGuess);
	//if userguess is undefined, they didnt answer in time
	if (userGuess == undefined)
	{
		unanswered++;
		wait();
		$("#results-div").append("<img class ='results-gif'src='assets/images/Judge-Judy.gif'/>");
		$("#results-div").append("<p class = 'waiting-screen'>Dude, you ran out of time!</p>");
		$("#results-div").append("<p class = 'oot-answer'>" + qA[i].answer + " is the capital!</p>");
	}
	else if (userGuess == qA[i].answer)
	{
		//they got it right
		//call function to clear and reset
		correct++;
		clearInterval(intervalId);
		wait();
		$("#results-div").append("<p class = 'waiting-screen'>Great Job!</p>");
		$("#results-div").append("<img class ='results-gif'src='" + qA[i].gif + "'/>");
	}
	else
	{
		//wrong
		//call function to clear and reset
		incorrect++;
		clearInterval(intervalId);
		wait();
		$("#results-div").append("<img class ='results-gif'src='assets/images/Trump.gif'/>");
		$("#results-div").append("<p class = 'waiting-screen wrong-answer'>" + qA[i].answer + " is the capital!</p>");
	}
}
//clear divs, displays results for 3.5 seconds.
function wait()
{
	$("#choices-div").empty();
	$("#question-div").empty();
	$("#timer-div").empty();
	console.log("waiting...");
	timerId = setTimeout(nextQuestion, 3500);
}

//nextQuestion clears out results div, adds one to index and calls function to display next question.
function nextQuestion()
{
	$("#results-div").empty();
	i++
	questionsAnswers();
}

//once questions are done, display users results.
function endScreen()
{
	$("#results-div").empty();
	if (correct == qA.length)
	{
		$("#results-div").append("<div>You got all " + correct + " right!</div>");
		$("#results-div").append("<div class = 'comment'>You know a lot about 'Murica</div>");
		$("#results-div").append("<img class ='results-gif'src='assets/images/Murica.gif'/>");
	}
	else if (incorrect == qA.length)
	{
		$("#results-div").append("<div>You got all " + incorrect + " wrong...</div>");
		$("#results-div").append("<img class ='results-gif'src='assets/images/idiot-sandwich.gif'/>");
		$("#results-div").append("<div class = 'comment'>C'mon, Dude.</div>");
	}
	else
	{
		$("#results-div").append("<h1>ALL DONE!</h1>");
		$("#results-div").append("<div>You got " + correct + " right!</div>");
		$("#results-div").append("<div>You got " + incorrect + " wrong!</div>");
		if (unanswered != 0)
		{
			$("#results-div").append("<div>You didnt answer: " + unanswered + "</div>");
		}
	}
}