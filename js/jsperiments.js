/**
* jsperiments, JavaScript experiments
*
* Copyright 2011, Julian Klotz 
* version 1.0
* date 2011-12-01
* Released under the MIT License.
**/

/**
* domCache is a caching function for dom elements.
* It is initialized with a set of selectors, passed as an object.
* After calling the setup function, for each selector a function is available.
* When one of the functions is called, the object is either created or the cached
* object is returned. An example can be found below the function.
**/
var domCache = {
    /**
    * setup creates functions that return DOM elements dynamically, depending on the selector
    * @param selectors          {Object}   Object w/ key-value pairs. The keys will be used as function names
    * @param selectorFunction   function}  Function to which the selector is passed when the element is requested
    *                                      for the first time. Default is the jQuery "$" function.
    * @return                   {void}    
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

/**************
* EXAMPLE
**************/

$(document).ready(function() {
    /**
    * Object with selector strings
    **/
    var selectors = {
        headline:    'h1#headline',
        pSecond:     '#p-second',
        third:       '#p-third'
    }
    // Initialize domCache
    domCache.setup(selectors);

    // All functions have been created now. Time to use them!
    domCache.headline(); // creation
    domCache.headline(); // return from cache
    domCache.pSecond(); // creation
    domCache.pSecond(); // return from cache
});
