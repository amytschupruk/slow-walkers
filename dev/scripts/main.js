$(function () {
	//saving HTML objects as variables for JS
	var container = $('#container');
	var player = $('#player');
	var walker = $('.walker');
	var walker1 = $('#walker1');
	var score = $('#score');
	var speed_span = $('#speed');
	var restart = $('#restart');

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

	var the_game = setInterval(function () {
		var walker_current_position = parseInt(walker.css('right'));
		//check if walker is out of container to reset position
		if(walker_current_position > container_width) {
			//***19:40 check for math.random function, may be able to change background img
			walker_current_position = walker_initial_position;

			//increase speed
			speed = speed + 1;
			//print to DOM in speed span
			speed_span.text(speed);

		}
		//CSS right property to increase 10px ever 40 milliseconds
		walker.css('right', walker_current_position + speed);	
			// if (go_up === false) {
			// 	go_down();
			// }
	}, 60);

	// $(document).on('keydown', function (e){
	// 		var key = e.keyCode;
	// 		if (key === 32 && go_up === false) {
	// 			go_up = setInterval(up);
	// 		}
	// });

	$(container).on('click', function (e){
		player.addClass('jump');
		player.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    function(e) {
    
    // code to execute after animation ends

    player.removeClass('jump');

	});
	});

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