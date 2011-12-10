/**
* A general purpose DOM object caching function
*
* Copyright 2011, Julian Klotz 
* version 1.0
* date 2011-12-01
* Released under the MIT License.
**/

var domCache = {
  /**
  * setup creates functions that return DOM elements dynamically, depending on the selector
  * @param selectors      {Object}   Object w/ key-value pairs. The keys will be used as function names
  * @param selectorFunction   {function}  Function to which the selector is passed when the element is requested
  *                    for the first time. Default is the jQuery "$" function.
  * @return           {void}  
  **/
  setup: function(selectors, selectorFunction) {
    selectorFunction = selectorFunction || $;
    var domElement;
    for(key in selectors) {
      if(selectors.hasOwnProperty(key)) {
        domCache[key] = function(key, selectors, domElement) {
          return function() {
            if(typeof domElement == 'undefined') {
              domElement = selectorFunction(selectors[key]);
            }
            return(domElement);
          };
        }(key, selectors, domElement);
      }
    }
  }
}
