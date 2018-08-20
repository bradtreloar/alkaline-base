
(function ($, Drupal) {
"use strict";

Drupal.behaviors.alkalineStickyHeader = {
  attach: function (context, settings) {
    $('.layer.header.sticky').once('alkalineStickyHeader').each(function (header) {
      var $h = $(header);
      $h.css({top: '0'});
      var didScroll = false;
    
      // on scroll, let the interval function know the user has scrolled
      $(window).scroll(function (event){
        didScroll = true;
      });
    
      // run hasScrolled() and reset didScroll status
      setInterval(function () {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 250);
    
      var lastScrollTop = 0;
      var delta = 5;
      var headerHeight = $h.outerHeight();
    
      function hasScrolled() {
        var st = $(window).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
          return;
    
        if (st > lastScrollTop && st > headerHeight) {
          $h.css({top: -headerHeight + 'px'});
        }
        else {
          $h.css({top: '0'});
        }
        lastScrollTop = st;
      }
    
      $(window).doneResizing(hasScrolled);
    });
  },
}

})(jQuery, Drupal);
    