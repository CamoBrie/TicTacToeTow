//setting whose tun it is to blue, false = blue, true = red
var turn = false;

//creating a new array of size 16
var gamedata = new Array(16);

//defining the current and winner variables so they can be used later on
var current, winner;

//this var keeps track if the gme is over or not
var game = false;

//the winconditions 2D array
var winConditions = [
	//the first 4 numbers are for the position of the other elements, the last 3 are for the verification of the position
	//diagonal 1
	[0, 5, 10, 15, 0],
	[-5, 0, 5, 10, 5],
	[-10, -5, 0, 5, 10],
	[-15, -10, -5, 0, 15],
	//diagonal 2
	[0, 3, 6, 9, 3],
	[-3, 0, 3, 6, 6],
	[-6, -3, 0, 3, 9],
	[-9, -6, -3, 0, 12],
	// x | x | 0 | 0
	// 0 | 0 | x | x
	[0, 1, 6, 7, 0, 4, 8],
	[-1, 0, 5, 6, 1, 5, 9],
	[-5, -6, 0, 1, 6, 10, 14],
	[-7, -6, -1, 0, 7, 11, 15],
	// 0 | 0 | x | x
	// x | x | 0 | 0
	[0, -1, -2, 1, 4, 8, 12],
	[-1, 0, -2, -3, 5, 9, 13],
	[3, 2, 0, 1, 2, 6, 10],
	[1, 2, -1, 0, 3, 7, 11],
	// x | 0 | 0 | x
	// 0 | x | x | 0
	[0, 5, 6, 3, 0, 4, 8],
	[-5, 0, -2, 1, 5, 9, 13],
	[-6, -1, 0, -3, 6, 10, 14],
	[-3, 2, 3, 0, 3, 7, 11],
	// 0 | x | x | 0
	// x | 0 | 0 | x
	[0, -3, -2, 3, 4, 8, 12],
	[3, 0, 1, 6, 1, 5, 9],
	[2, -1, 0, 5, 2, 6, 10],
	[-3, -6, -5, 0, 7, 11, 15],
	// x | 0 |
	// x | 0 |
	// 0 | x |
	// 0 | x |
	[0, 4, 9, 13, 0, 1, 2],
	[-4, 0, 5, 9, 4, 5, 6],
	[-9, -5, 0, 4, 9, 10, 11],
	[-13, -9, -4, 0, 13, 14, 15],
	// 0 | x |
	// 0 | x |
	// x | 0 |
	// x | 0 |
	[0, 4, 7, 11, 1, 2, 3],
	[-4, 0, 3, 7, 5, 6, 7],
	[-7, -3, 0, 4, 8, 9, 10],
	[-11, -7, -4, 0, 12, 13, 14],
	// x | 0 |
	// 0 | x |
	// 0 | x |
	// x | 0 |
	[0, 5, 9, 12, 0, 1, 2],
	[-5, 0, 4, 7, 5, 6, 7],
	[-9, -4, 0, 3, 9, 10, 11],
	[-12, -7, -3, 0, 12, 13, 14],
	// 0 | x |
	// x | 0 |
	// x | 0 |
	// 0 | x |
	[0, 3, 7, 12, 1, 2, 3],
	[-3, 0, 4, 9, 4, 5, 6],
	[-7, -4, 0, 5, 8, 9, 10],
	[-12, -9, -5, 0, 13, 14, 15]
];

var colors = [
	["FF0000", "FF8888", "0000FF", "8888FF"],
	["00FFFF", "88FFFF", "FF00FF", "FF88FF"],
	["BBBBBB", "888888", "000000", "444444"],
	["00FF00", "88FF88", "FFFF00", "FFFF88"]
];



var currentcolor = 0;


//onclick, onhoverin, onhoverout function
$("table div").on({

	//onhoverin function
	mouseover: function () {

		//if it isn't a used space and it is red's turn.
		if ((!($(this).hasClass("use"))) && turn && game === false) {

			//changing the background color to red.
			$(this).css("background-color", colors[currentcolor][1]);

			//if it isn't a used space and it is blue's turn.
		} else if ((!($(this).hasClass("use"))) && !turn && game === false) {

			//changing the background color to blue.
			$(this).css("background-color", colors[currentcolor][3]);
		}
	},

	//onhoverout function
	mouseout: function () {

		//if it isn't a used space
		if (!($(this).hasClass("use"))) {

			//changing the background color to white or grey if game is over.
			if (game === true) {
				//set the background color to grey
				$(this).css("background-color", "#888");

				// else set the background color to white
			} else {
				$(this).css("background-color", "#FFF");
			}
		}
	},

	//onclick function
	click: function () {

		//check if it is red's turn and if the square is empty.
		if (!($(this).hasClass("use")) && turn && game === false) {

			//flipping the turn variable
			turn = !turn;

			//setting the color of the text of whose turn it is to blue.
			$("#turn").html("Player 1").css("color", colors[currentcolor][3]);

			//changing the background color to red.
			$(this).css("background-color", colors[currentcolor][0]);

			//adding the 'use' class to the div element so it gets marked as used.
			$(this).addClass("use");

			//setting the index of the clicked element in gamedata to false
			gamedata[$("table div").index($(this))] = false;

			//check if it is red's turn and if the square is empty.
		} else if (!($(this).hasClass("use")) && !turn && game === false) {

			//flipping the turn variable
			turn = !turn;

			//setting the color of the text of whose turn it is to red.
			$("#turn").html("Player 2").css("color", colors[currentcolor][1]);

			//changing the background color to blue.
			$(this).css("background-color", colors[currentcolor][2]);

			//adding the 'use' class to the div element so it gets marked as used.
			$(this).addClass("use");

			//setting the index of the clicked element in gamedata to true
			gamedata[$("table div").index($(this))] = true;

			//else if the game isnt over
		} else if (game === false) {

			//adding the class 'fade' to the body, delaying the next action by 401 milliseconds.
			$("body").addClass("fade").delay(401).queue(function () {

				//removing the class 'fade' from the body.
				$(this).removeClass("fade").dequeue();
			});
		}

		//if all the squares are filled
		if ($(".use").length == 16 && game === false) {

			//setting the top text to 'Game Completed' and changing it's color to white
			$(".text").html("Game Draw").css("color", "#FFF");

			//changing the bottom text to a link which will reload the page, styling it green and giving it the value 'Rematch?'
			$(".hidecomp").html("<a class='rematch' href='javascript:history.go(0)'>Rematch?</a>").css("color", "#8F8");

			//adding the class 'fadec' to the body, delaying the next action by 401 milliseconds.
			$("body").addClass("fadec").delay(401).queue(function () {

				//removing the class 'fadec' from the body.
				$(this).removeClass("fadec").dequeue();
			})
		}

		//setting the current variable to the index of the clicked item
		current = $("table div").index($(this));

		//looping through the win conditions
		for (i = 0; i < winConditions.length; i++) {

			//if the conditions relative pos is valid
			if (gamedata[current + winConditions[i][0]] == turn && gamedata[current + winConditions[i][1]] == turn && gamedata[current + winConditions[i][2]] == turn && gamedata[current + winConditions[i][3]] == turn && game === false) {
				//if the condition is valid, no warping through walls
				if (current == winConditions[i][4] || current == winConditions[i][5] || current == winConditions[i][6] || current == winConditions[i][7]) {

					//looping through the win tiles to set the border color to green
					for (j = 0; j < 4; j++) {
						document.getElementById(($("table div").index($(this)) + winConditions[i][j])).className += " win";
					}

					//updating variables
					game = true;
					winner = turn ? 'Player 1' : 'Player 2';

					//setting the top text to Game Completed + the winner
					$(".text").html("Game Completed<br><span id='winner'>" + winner + "</span> won").css("color", "#FFF");

					//setting the winner text to blue or red
					if (winner == "Blue" && game === true) {
						$("#winner").css("color", colors[currentcolor][1]);
					} else {
						$("#winner").css("color", colors[currentcolor][3]);
					}

					//playing the green complete background animation
					$("body").addClass("fadec").delay(401).queue(function () {
						//removing the class 'fadec' from the body.
						$(this).removeClass("fadec").dequeue();
					});

					//setting the bottom text to Rematch?
					$(".hidecomp").html("<a class='rematch' href='javascript:history.go(0)'>Rematch?</a>").css("color", "#8F8");

					//setting the not used tiles to grey
					$("table div").not(".use").css("backgroundColor", "#888");
				}
			}
		}
	}
});

//change the color of the game to one of the templates.
function changecolor(number) {
	currentcolor = number;
	localStorage.setItem('currentnumber', currentcolor);
	location.reload();
}

//check if cookie is present, and get values from it
if (!localStorage.getItem("currentnumber")) {
	currentcolor = 0;
} else {
	currentcolor = parseInt(localStorage.getItem("currentnumber"));
}

//updating the color of the current player after the webpage is loaded, so the cookie is used from the start.
$("#turn").html("Player 1").css("color", colors[currentcolor][3]);


//fancybox popup 
$('[data-fancybox]').fancybox({
	toolbar: false,
	smallBtn: true,
	margin: [250, 250],
	protect: true,
	height: 150,
	animationEffect: "fade",
	iframe: {
		preload: false,
		css: {
			width: '600px',
			height: '35%'
		}
	}
});
