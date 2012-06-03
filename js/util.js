window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

// shim layer with setTimeout fallback
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

function animloop(){
	delta = (new Date().getTime() - lastCalledTime)/1000;
	lastCalledTime = new Date().getTime();
	fps = 1/delta;
	
  requestAnimFrame(animloop);
  render();
}

function mphToPixelPerSecond(mph){	
	return parseInt( mph * (inchesInMile / secondsInHour * dpi) )
}

function mphToFeetPerSecond(mph) {
	result =  mph * (feetInMile / secondsInHour);
	resultRounded = Math.round(1000*result)/1000;	// round to thousandth
	return resultRounded;
}

function updateFps(){
	$('#fps').html( Math.round(fps) )
	setTimeout("updateFps();", 500)
}

function getDpi(){
	e = document.body.appendChild(document.createElement('DIV'));
	e.style.width = '1in';
	e.style.padding = '0';
	dpi = e.offsetWidth;
	e.parentNode.removeChild(e);
	return dpi;
}

function getDimensions(){
	
	$('#dpi').html( getDpi() );
	
	screenHeight = screen.height;
	$('#screen-height').html( screenHeight );
	
	screenWidth = screen.width;
	$('#screen-width').html( screenWidth );
	
	windowHeight = $(window).height();
	$('#window-height').html( windowHeight );
	
	windowWidth = $(window).width();
	$('#window-width').html( windowWidth );
}

