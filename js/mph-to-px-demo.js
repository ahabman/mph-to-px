var lastLoopTime = new Date().getTime();
var windowWidth = $(window).width();
var fps = 1;
var mph = 1;
var windowWidth = $(window).width();
var requestAnimFps;


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


function loop(){
	// get frames per second
	delta = (new Date().getTime() - lastLoopTime)/1000;
	lastLoopTime = new Date().getTime();
	requestAnimFps = 1/delta;
	
	// loop
  requestAnimFrame(loop);
  render(requestAnimFps);
}


function render(requestAnimFps){
	element = $('.dot');
	
	// reset element position if offscreen
	if( parseInt(element.css('left')) >= (windowWidth - element.width()) ){
		element.css('left', '0px'); 
	}
	
	// get current position
	currentLeft = parseInt(element.css('left')); 
	
	// convert mph to pixels (per second, and per frame are returned)
	mphPxObj = mphToPx.init(mph, requestAnimFps); 
	
	// choose pixelsPerFrame
	// increment = mphPxObj.pixelsPerSecond; 
	increment = mphPxObj.pixelsPerFrame; 

	// update the integer position
	element.css( 'left', currentLeft + increment );
}


function updateStats(){
	ppiObj = mphToPx.init(1, requestAnimFps); 
	$('#ppi').html( ppiObj.ppi );
	$( ".mph" ).html( mph  );
	$('#fts').html( mph * 1.4667 );
	$('#window-width').html(windowWidth);
	updateFps();
}


function updateFps(){
	fpsTimeout = setTimeout("$('#fps').html(parseInt(requestAnimFps));updateFps();", 1000);
}


$(function(){
	// loop() calls render() at the rate of
	// window.requestAnimationFrame, or 60fps
	loop();
	
	updateStats();
	
	$( "#mph-slider" ).slider({ 
		max: 10, 
		value: mph,
		change: function(event, ui) { 
			mph = $('#mph-slider').slider( "value" )
			updateStats();
		} 
	});
	
	$(window).resize(function() {
	  windowWidth = $(window).width();
		$('#window-width').html(windowWidth);
	});
})