/**
   Return a number of pixels to move (per second or per frame) to simulate mph on screen
 
 * @author <a href="mailto:andy@andyweber.info">Andy Weber</a>
 * @version 0.2

 * @param {Number} mph
 * @param {Number} [fps=60] Frames per second (default 60)

 * @returns {Object} Object with keys: pixelsPerFrame (if fps was provided), pixelsPerSecond, ppi. All values are Integers

 * @example
 * mphPxObj = mphToPx.init(5, 24);
 * pxIncrement = mphPxObj.pixelsPerFrame;
 */

var mphToPx = {
	
	init: function(mph, fps){
		var mph = mph;
		var fps = typeof fps !== 'undefined' ? fps : 60;
		var ppi = this.getPpi();
		var inchesInMile = 63360;
		var secondsInHour = 3600;
		var pixelsPerSecond = parseInt( mph * ( (inchesInMile / secondsInHour) * ppi) );
		var pixelsPerFrame = parseInt( ( pixelsPerSecond / fps) );
		return {
			pixelsPerFrame: pixelsPerFrame,
			pixelsPerSecond: pixelsPerSecond,
			ppi: ppi,
		};
	},
	
	getPpi: function(){
			e = document.body.appendChild(document.createElement('DIV'));
			e.style.width = '1in';
			e.style.padding = '0';
			result = e.offsetWidth;
			e.parentNode.removeChild(e);
			return result;
	}
}