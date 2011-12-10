$(document).ready(function() {

  /**
  * BAD EXAMPLE WITH A TYPICAL jQuery EVENT HANDLER
  * Problem: the '#p-second' is queried anytime the headline is clicked.
  * Though, this is in most cases not necessary. Querying it after the first click
  * and then caching it is sufficient.
  **/
  console.dir('badexample');
  var time = Date.now();
  for(var i = 0; i < 10000; i++) {
    $('h1#headline').click(function() {
      $('#p-second').html('I just changed.');
    });
  }
  var diff = Date.now() - time;
  console.dir(diff);
  
  /**
  * SAME EXAMPLE WITH domCache
  * It helps you to remove selector strings from you code and put them in a single
  * object. Moreover, the dom objects are created when first accessed and on all subsequent
  * requests returned from cache.
  **/
  
  // Selectors needed during program runtime
  var selectors = {
    headline:  'h1#headline',
    pSecond:   '#p-second'
  }

  // Initialize domCache
  domCache.setup(selectors);
  time = Date.now();
  for(var i = 0; i < 10000; i++) {
    domCache.headline().click(function() {
      domCache.pSecond().html('I just changed');
    })
  }
  diff = Date.now() - time;
  console.dir(diff);
});
