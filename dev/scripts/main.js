$(function () {
	//saving HTML objects as variables for JS
	var container = $('#container');
	var player = $('#player');
	$('#player').sprite({fps: 7, no_of_frames: 4}); //Spritely plugin
	var walker = $('.walker');
	var walker1 = $('#walker1');
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
		//update Distance walked when player successfully jumps over pedestrian
		// if(walker_current_position > container_width - player_left) {
			// if (score_updated === false) {
			// 	score.text((parseFloat(score.text()) + 0.1).toFixed(1));
			// 	score_updated = true;
			// }
		// }

		//check if walker is out of container to reset position
		if(walker_current_position > container_width) {
			//***19:40 check for math.random function, may be able to change background img
			walker_current_position = walker_initial_position;
			//increase speed
			speed = speed + 1;
			//default score updated back to false 
			score_updated = false;

		}
		//CSS right property to increase 10px ever 52 milliseconds
		walker.css('right', walker_current_position + speed);	

		}	
	}, 52);

	// $(document).on('keydown', function (e){
	// 		var key = e.keyCode;
	// 		if (key === 32 && go_up === false) {
	// 			go_up = setInterval(up);
	// 		}
	// });

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

	function stop_the_game() {
		clearInterval(the_game);
		game_over = true;
		restart.slideDown();
		$('#player').hide();
	}

	restart_button.click(function() {
		location.reload();
	});

	function win_the_game() {
		clearInterval(the_game);
		$('#player').hide();
		win.slideDown();
		game_over = true;
	}

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

     function score_update () {
     	if (score_updated === false) {
     		// var current_score = score.text((parseFloat(score.text()) + 0.1).toFixed(1));
			score.text((parseFloat(score.text()) + 0.1).toFixed(1));
			score_updated = true;
		}
     }


	// $(document).on('keyup', function (e){
	// 		var key = e.keyCode;
	// 		if (key === 32) {
	// 			clearInterval(go_up);
	// 			go_up = false;
	// 		}
	// });



	// function go_down() {
	// 	// player.animate({bottom: "20%"}, 'fast');
	// 	player.css({bottom: "20%"});
	// }

	// function up() {
	// 	player.css({bottom: "60%"});
	// }
});