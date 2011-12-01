/**
* domCache is a caching function for dom elements.
* It is initialized with a set of selectors, passed as an object.
* After calling the setup function, for each selector a function is available.
* When one of the functions is called, the object is either created or the cached
* object is returned. An example can be found below the function.
**/

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
    domCache.headline(); // create and return
    domCache.headline(); // return
    domCache.pSecond(); // create and return
    domCache.pSecond(); // return
    domCache.headline().html('The text just changed.');
});

