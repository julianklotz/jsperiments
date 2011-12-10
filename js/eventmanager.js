/**
* Mediator is currently not in use.
* All systems events should be fired and received through this object.
**/
mediator = (function() {
  var events = {}; 
  function subscribe(eventType, fn) {
    if(!events[eventType]) {
      events[eventType] = [];
    }
    if(!fn) {
      throw('The subscribe function requires a callback parameter.');
      return;
    }
    if(typeof(fn) != 'function') {
      throw('Trying to use a non-function as callback in mediator.');
      return;
    }
    events[eventType].push({context: this, callback: fn});
  }
  function publish(eventType) {
    var args = Array.prototype.slice.call(arguments, 1);
    var evt = events[eventType];
    if(!evt) { return }
    for(var i = 0, len = evt.length; i < len; i++) {
      evt[i].callback.apply(evt[i].context, args);
    }
  }
  return {
    subscribe:  subscribe,
    publish:  publish
  }
}());

