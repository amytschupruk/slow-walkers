$(function () {
	//saving HTML objects as variables for JS
	var container = $('#container');
	var player = $('#player');
	var walker = $('.walker');
	var buildings = $('#buildings');

	//sprite settings with Spritely plugin
	$('#player').sprite({fps: 7, no_of_frames: 4}); //Spritely plugin frame per second + number of frames
	$('#buildings').pan({fps: 35, speed: 4, dir: 'left'});


	var score = $('#score');
	// var speed_span = $('#speed');
	var restart = $('#restart');
	var restart_button = $('#restart_button');
	var win = $('#win');

	//saving some initial setup
	var container_width = parseInt(container.width());
	var container_height = parseInt(container.height());
	var walker_initial_position = parseInt(walker.css('right'));
	var walker_initial_height = parseInt(walker.css('height'));
	var player_left = parseInt(player.css('left'));
	var player_height = parseInt(player.height());
	var speed = 10;

	//array of background images 
	var image_array = ["blue", "red", "green"];

	//player declarations 
	var go_up = false;
	var score_updated = false;
	var game_over = false;
	window.setInterval(score_update, 6500);


	var the_game = setInterval(function () {
		//call collision function
		if(collision(player, walker)) { 
			stop_the_game();
		} else if(Number((score.text())) === 1.0) {
			win_the_game();
		} else {
		var walker_current_position = parseInt(walker.css('right'));
		//check if walker is out of container to reset position
		if(walker_current_position > container_width) {

			walker_current_position = walker_initial_position;
			//increase speed
			speed = speed + 1;
			//change background color
			walker.css({"background-color": image_array[1]});
			//default score updated back to false 
			score_updated = false;

		}
		//CSS right property to increase 10px ever 50 milliseconds
		walker.css('right', walker_current_position + speed);	

		}	
	}, 50);

	$(window).on('click', function (e){
		//add "jump" class for CSS animation on click
		if (game_over === false) {
			player.addClass('jump');
		    // remove "jump" class once animation is complete
			player.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
		    function(e) {
		    player.removeClass('jump');

			});
		}
	});

	//called when player runs into slow-walker, stops game and show "restart" box
	function stop_the_game() {
		clearInterval(the_game);
		game_over = true;
		restart.slideDown();
		$('#wtf').show();
		//stop sprite animations
		$('#player').destroy();
		$('#buildings').destroy();
	}

	restart_button.click(function() {
		location.reload();
	});

	//stop game + show "win" box when player wins
	function win_the_game() {
		clearInterval(the_game);
		game_over = true;
		win.slideDown();
		//stop sprite animations
		$('#player').destroy();
		$('#buildings').destroy();
	}

	// function walker_sprite_change {
	// 	i = 0
	// }

	//collision function if player runs into slow-walker
   function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
 
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
     }

     //updating score + 0.1 (km) to one decimal point
     function score_update () {
     	if (score_updated === false) {
			score.text((parseFloat(score.text()) + 0.1).toFixed(1));
			score_updated = true;
		}
     }
});