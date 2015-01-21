/**
 * EXAMPLE USAGE
 */

$(document).ready(function() {
	// Define the DOM elements that you need
	var selectors = {
		headline: 'h1#headline',
		pSecond: 'p#second'
	};
	
	// Create an instance of domcache and tell it about your selectors
	var dc = Object.create(domcache).setup(selectors);
	
	// Anytime you’d like to access a DOM element, do this:
	var myHeadline = dc.headline();
	// Or:
	var myParagraph = dc.pSecond();
});