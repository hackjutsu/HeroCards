var args = require('system').args;
var page = require('webpage').create();

var input = args[1];
var output = args[2];
var zoom_factor = args[3];

var view_width = 1000 * zoom_factor;
var view_height = 100;
page.viewportSize = { width: view_width, height: view_height };
page.zoomFactor = zoom_factor;

page.open(input, function() {

	var clipRect = page.evaluate(function() {
	  return document.querySelector(".outline").getBoundingClientRect();
    });

	var clipTop = clipRect.top * zoom_factor;
	var clipLeft = clipRect.left * zoom_factor;
	var clipWidth = clipRect.width * zoom_factor;
	var clipHeight = clipRect.height * zoom_factor;

    page.clipRect = {
		top:    clipTop,
		left:   clipLeft,
		width:  clipWidth,
		height: clipHeight
	};

    page.render(output);
    phantom.exit();
});
