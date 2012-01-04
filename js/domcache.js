/**
* A general purpose DOM object caching function
*
* Copyright 2011, Julian Klotz 
* version 1.0
* date 2011-12-01
* Released under the MIT License.
**/


/**
* Prototypal inheritence in Douglas Crockford style ;-)
* cp. http://javascript.crockford.com/prototypal.html
* @param {Object}     o Object that you would like to extend
* @return {Function}  returns a function object; the returned function’s prototype is linked to
*                     the object that you supplied as argument to Object.create()
**/
if( typeof Object.create !== 'function'){
  Object.create = function(o){
    function F() {}
    F.prototype = o;
    return new F();
  };
}

var domCache = {
  /**
  * setup creates functions that return DOM elements dynamically, depending on the selector
  * @param selectors      {Object}   Object w/ key-value pairs. The keys will be used as function names
  * @param selectorFunction   {function}  Function to which the selector is passed when the element is requested
  *                    for the first time. Default is the jQuery "$" function.
  * @return           {void}  
  **/
  setup: function(selectors, selectorFunction) {
    // The domcache object is "abstract". This is what happens when you try to call domCache directly:
    if(this.hasOwnProperty('setup')) {
      throw new Error('domCache is "abstract". You need to copy it by calling Object.create(domCache) first.');
    }
    
    selectorFunction = selectorFunction || $;
    var domElement,
        escapedKey;
    for(key in selectors) {
      // check for collisions with method names used by domCache itself, e.g. setup
      if(typeof this[key] != 'undefined') {
        throw ('You cannot use "' +  key + '" as selector, because this name is used by domCache internally.');
      }
      
      if(selectors.hasOwnProperty(key)) {
        escapedKey = encodeURI(key.replace(/\s/g, ''));
        domCache[escapedKey] = function(key, selectors, domElement) {
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
