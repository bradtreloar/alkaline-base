
(function ($){
"use strict";

/**
 * Edited version of debouncing function from John Hann.
 * http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
 */
var debounce = function (func, threshold, execAsap) {
  var timeout;

  return function debounced() {
    var obj = this, args = arguments;
    var delayed = function () {
      if (!execAsap)
        func.apply(obj, args);
      timeout = null;
    };

    if (timeout)
      clearTimeout(timeout);
    else if (execAsap)
      func.apply(obj, args);

    timeout = setTimeout(delayed, threshold || 100);
  };
};

// Debounced resize event trigger.
jQuery.fn.doneResizing = function (callback){
  return callback ? this.bind('resize', debounce(callback)) : this.trigger('doneResizing');
};
  
})(jQuery);