var dpi;
var mph = 1;
var fts; // feet per second
var fps = 0; //frames per second
var lastCalledTime = new Date().getTime();
var screenHeight;
var screenWidth;
var windowHeight;
var windowWidth;
var inchesInMile = 63360;
var feetInMile = 5280;
var secondsInHour = 3600;
var oneMphInFts = 1.466;

function render(){
	
	element = $('.dot');
	
	// reset element position
	if( parseInt(element.css('left').split('px')[0]) >= parseInt(windowWidth - element.width()) ){
		element.css('left', '0px');
		element.attr('data-decimal-left', '0');
	}
	
	currentDecimalLeft = parseFloat(element.attr('data-decimal-left'));	
	increment = parseFloat( (mphToPixelPerSecond(mph) / fps).toFixed(2) );
	updatedDecimalLeft = currentDecimalLeft + increment;
	element.attr('data-decimal-left', currentDecimalLeft + increment);
	element.css( 'left', parseInt(currentDecimalLeft) )
	//log( "currentDecimalLeft: ", currentDecimalLeft );
	//log( "increment: ", typeof increment, increment );
	//log( "updatedDecimalLeft: ", updatedDecimalLeft );
	//log()
}

$(function(){
	
	getDimensions();
	$(window).resize(function() { getDimensions() });
	
	updateFps();
	 
	$( "#slider" ).slider({ 
		max: 10, 
		value: mph,
		change: function(event, ui) { 
			mph = $('#slider').slider( "value" )
			$( "#mph" ).html( mph  )
			
			fts = mphToFeetPerSecond(mph)
			$( "#fts" ).html( fts  )
		} 
	});
	$( "#mph" ).html( $('#slider').slider( "value" )  );
	fts = mphToFeetPerSecond(mph)
	$( "#fts" ).html( fts  )
	
	
	// animloop() calls render() at window.requestAnimationFrame or 60fps
	animloop();
	
	// logTests();
	
})




function logTests(){
	
	// Test figures based on 96 pixels per inch
	 
	log('mphToPixelPerSecond(1) should == 1689')
	log( mphToPixelPerSecond(1) == 1689, mphToPixelPerSecond(1) )
	log()
	
	log('mphToPixelPerSecond(2) should == 3379')
	log( mphToPixelPerSecond(2) == 3379 , mphToPixelPerSecond(2) )
	log()
	
	log('test 0.5 should == 844')
	log( mphToPixelPerSecond(0.5) == 844 , mphToPixelPerSecond(0.5) )
	log()
	
}
