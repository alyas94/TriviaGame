//JS FOR TRIVIA GAME.

/*Things I Need:
object that has questions and answers,
a timer to display how much time is left.

function to display questions and answers
if statment to tell if guess is right or wrong.
*/

//variables to hold their scores:
var correct = 0;
var incorrect = 0;
var unguessed = 0;

var objectSize = 4;
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
	{
		question:"What is the capital of Ohio?",
		choices:["Columbus","Akron","Cincinatti","Cleveland"],
		answer: "Columbus"
	}
]

/*screen will first show: "press to start". once they press start, empty start div.*/

$(".btn-block").on("click", function(){
	$("#start-btn").html("");
	//next we need to ask questions and answers on screen.
	//call funcAtion to do this:
	questionsAnswers();
});
function questionsAnswers(){
		timer();
		for(var k = 0; k < qA.length; k++){
			$("#question-div").append("<div class = 'question'>"+qA[k].question+"<div>");

			for (var j = 0; j < 4; j++) {
				var temp = qA[k].choices[j]

				$("#question-div").append("<input type= 'radio' class='choice-radio radio-in-line' name ='question"+k+"' value ='"+temp+"'>"+temp);
				//EXAMPLE: in an html file: this ^ line would look like:
				// <input type = "radio" class = "choice-radio" name = "question1" value = "Las Vegas">Las Vegas
			}
		}
		$("#question-div").append("<p><button class='btn-sm submit-btn'>Submit</button></p>");

}

$(document).on("click",".submit-btn",checkGuess)

//timer function
function timer(){
	time = 15;
	intervalId = setInterval(count,1000);
	console.log(intervalId);
}

function count(){
	time--;
	$("#timer-div").text("Time remaining: " +time+ " seconds");
	if(time < 0){
		$("#timer-div").text("TIMES UP!");
		clearInterval(intervalId);
		checkGuess();

	}

}
function checkGuess(){
	for (var i = 0; i <qA.length; i++) {
		var userGuess = $('input[name = question'+i+']:checked').val();
		console.log(userGuess);
		if(userGuess == undefined){
			unguessed ++;
		}
		else if(userGuess == qA[i].answer){
			correct++;
		}
		else{
			incorrect++;
		}
	}
	results();
}

function results(){
	//empty out the divs
	$("#question-div").empty();
	$("#timer-div").empty();

	//display results in div
	$("#results-div").append("<h1>ALL DONE!</h1>");
	$("#results-div").append("<h3>Results: </h3>");
	$("#results-div").append("<div>You got " + correct + " right!</div>");
	$("#results-div").append("<div>You got "+ incorrect+ " wrong!</div>");
	if(unguessed != 0){
		$("#results-div").append("<div>You didnt answer: "+unguessed+"</div>");
	}
}








