var dc;

$(document).ready(function() {

  /**
  * BAD EXAMPLE WITH A TYPICAL jQuery EVENT HANDLER
  * Problem: the '#p-second' is queried anytime the headline is clicked.
  * Though, this is in most cases not necessary. Querying it after the first click
  * and then caching it is sufficient.
  **/
  console.log('Test case: Assign a click handler to a DOM element 10.000 times. How long does it take?');
  var time = Date.now();
  for(var i = 0; i < 10000; i++) {
    $('h1#headline').click(function() {
      $('#p-second').html('I just changed.');
    });
  }
  var diff = Date.now() - time;
  console.log('Without domCache: ' + diff + "ms");
  
  /**
  * SAME EXAMPLE WITH domCache
  * It helps you to remove selector strings from you code and put them in a single
  * object. Moreover, the dom objects are created when first accessed and on all subsequent
  * requests returned from cache.
  **/
  
  // Selectors needed during program runtime
  var selectors = {
    headline:  'h1#headline',
    pSecond:   '#p-second',
    'asd asd ': '#id'
  }

  // Initialize domCache
  dc = Object.create(domCache);
  dc.setup(selectors);

  time = Date.now();
  
  for(var i = 0; i < 10000; i++) {
    dc.headline().click(function() {
      dc.pSecond().html('I just changed');
    })
  }
  diff = Date.now() - time;
  console.log('With domCache: ' + diff + "ms");
  console.log('If you want to find out how to use domCache in your code, take a look at js/domcache-example.js');
});
