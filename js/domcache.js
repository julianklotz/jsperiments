/**
* domcache helps you separate selectors from code and handles caching for you.
*
* Copyright 2011, 2015 Julian Klotz
* Version 1.1
* Date 2015-01-21
* Released under the MIT License.
**/


(function () {
	/**
	* Polyfill for Object.create()
	**/
	if(typeof Object.create != 'function'){
		Object.create = function(o){
			function F() {}
			F.prototype = o;
			return new F();
		};
	}
	window.domCache = {
		/**
		* Setup creates functions that return DOM elements dynamically, based on the selectors param
		* @param selectors {Object}	 Object w/ key-value pairs.
		* @example
		* 	Doing this: `var dc = Object.create(domCache); dc.setup({chapterHeadline: 'chapter-headline'})`,
		* 	you can get the element by calling `dc.chapterHeadline()`
		**/
		setup: function(selectors) {
			if(this.hasOwnProperty('setup')) {
				// The domcache object is "abstract". This is what happens when you try to call domCache directly:
				throw new Error('domCache is "abstract". You need to copy it by calling Object.create(domCache) first.');
			}

			var	escapedKey,
				that = this;

			for(key in selectors) {
				if(selectors.hasOwnProperty(key)) {
					escapedKey = encodeURI(key.replace(/\s/g, ''));

					// Create a closure that keeps a reference to its selector.
					// As soon as the returned function is called, a reference to the DOM element is stored.
					that[escapedKey] = (function(selector) {
						var domElement = undefined;
						return function() {
							if(typeof domElement == 'undefined') {
								domElement = $(selector);
							}
							return domElement;
						};
					})(selectors[key]);
				}
			}

			return this
		}
	}
}).call(this);
