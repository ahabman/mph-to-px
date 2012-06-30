mph-to-px
=========

Convert mph (miles per hour) to px (pixels)


Return a number of pixels to move (per second or per frame) to simulate mph on screen

@param {Number} mph
@param {Number} [fps=60] Frames per second (default 60)

@returns {Object} Object with keys: pixelsPerFrame (if fps was provided), pixelsPerSecond, ppi. All values are Integers

@example
mphPxObj = mphToPx.init(5, 24);
pxIncrement = mphPxObj.pixelsPerFrame;
