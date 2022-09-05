console.log('new game...');
var safariGame = {};
var intId
var imageWidth = 7203
var imageHeight = 4190
var imageTop = -2095
var imageLeft = -3311

// for BG movement
var topLimit = -1*(imageHeight/2)
var leftLimit = -1*(imageWidth/2)
//2095 -3601.5

// check if the html page is ready
$(document).ready(function(){
	
	//load the json file.
	$('#cityBg').css('width', imageWidth+'px')
	$('#cityBg').css('height', imageHeight+'px')
	$('#cityBg').css('left', imageLeft+'px');
	$('#cityBg').css('top', imageTop+'px');
	function move(_speed, _dir) {
	$('.btn').removeClass('selected');
  var box = document.getElementById('cityBg'),
      top = parseInt($('#cityBg').css('top')),
      left = parseInt($('#cityBg').css('left')),
      angle = _dir * Math.PI / 180, // 30 degrees
      speed = 3*_speed,
      deltaX = Math.cos(angle) * speed,
      deltaY = Math.sin(angle) * speed;
	  clearInterval(intId);
	  console.log($('#cityBg').css('top'))
  intId = setInterval(function() {
	var newTop = (top += deltaY)
	var newLeft = (left += deltaX)
	
	console.log(topLimit, leftLimit);
	console.log(newTop, newLeft);
	
	if((newTop <= 0) && (newTop > topLimit)){
		box.style.top = (top += deltaY) + 'px';
	}else{
		$('.btn').removeClass('selected');
		clearInterval(intId);
	}
	
	if((newLeft <= 0) && (newLeft > leftLimit)){
		box.style.left = (left += deltaX) + 'px';
	}else{
		$('.btn').removeClass('selected');
		clearInterval(intId);
	}
  }, 60);
  
  
};

function collision(){
/*A.X < B.X + B.Width
A.X + A.Width > B.X
A.Y < B.Y + B.Height
A.Y + A.Height > B.Y*/
var bL = parseInt($('#boy').css('left')),
	bW = parseInt($('#boy').css('left')) + parseInt($('#boy').css('width')),
	bT = parseInt($('#boy').css('top')),
	bH = parseInt($('#boy').css('top')) + parseInt($('#boy').css('height'));

var b1L = parseInt($('#block1').css('left')),
	b1W = parseInt($('#block1').css('left')) + parseInt($('#block1').css('width')),
	b1T = parseInt($('#block1').css('top')),
	b1H = parseInt($('#block1').css('top')) + parseInt($('#block1').css('height'));
	

}

// document.getElementById('cityBg').onmousedown = function(event){
// 	console.log(event.pageX);
// }
var iskeyPressed = false
 document.onkeydown = function (event) {
	if(iskeyPressed){
		return
	}
	iskeyPressed = true
      switch (event.keyCode) {
         case 37:
			
            console.log("Left key is pressed.");
			move(1, -30);
			$('#left').addClass('selected');
            break;
         case 38:
            console.log("Up key is pressed.");
			move(1, 30);
			$('#up').addClass('selected');
            break;
         case 39:
            console.log("Right key is pressed.");
			move(-1, -30);
			$('#right').addClass('selected');
            break;
         case 40:
            console.log("Down key is pressed.");
			move(-1, 30);
			$('#down').addClass('selected');
            break;
		case 32:
            console.log("Space bar key is pressed.");
			$('.btn').removeClass('selected');
			clearInterval(intId);
            break;
      }
   };
   
   document.onkeyup = function (event) {
	if(!iskeyPressed){
		return
	}
	
      switch (event.keyCode) {
         case 37:
            console.log("Left key is pressed.");
			iskeyPressed = false;
			$('.btn').removeClass('selected');
			clearInterval(intId);
            break;
         case 38:
            console.log("Up key is pressed.");
			iskeyPressed = false;
			$('.btn').removeClass('selected');
			clearInterval(intId);
            break;
         case 39:
            console.log("Right key is pressed.");
			iskeyPressed = false;
			$('.btn').removeClass('selected');
			clearInterval(intId);
            break;
         case 40:
            console.log("Down key is pressed.");
			iskeyPressed = false;
			$('.btn').removeClass('selected');
			clearInterval(intId);
            break;
		case 32:
            console.log("Space bar key is pressed.");
			//$('.btn').removeClass('selected');
			//clearInterval(intId);
            break;
      }
   };

$('.btn').off().on('click', function(){
	var _btn = $(this).attr('id');
	$('.btn').removeClass('selected');
	if(_btn == 'up'){

		this.physics.velocityFromAngle(30, -300, player.body.velocity);
		player.anims.play('up', true);
		// move(1, 30)
	}else if(_btn == 'down'){
		move(-1, 30)
	}else if(_btn == 'left'){
		move(1, -30)
	}else if(_btn == 'right'){
		move(-1, -30)
	}
	else if(_btn == 'stop'){
		clearInterval(intId);
	}
	$(this).addClass('selected');
})

//move(1, 30) // move up
//move(-1, 30) // move down
//move(1, -30)  // move left
//move(-1, -30) // move right
})