
(function ($) {
"use strict";

/**
 * Displays a simple lightbox popup
 * 
 * @param [jQuery object] figure 
 *   a jQuery object for the <a> elements that link to images
 */
$.fn.lightbox = function () {
  // make sure the link element gets the pointer click
  this.children('img').css('pointer-events', 'none');
  // create lightbox on click
  this.on('click', function (e) {
    e.preventDefault();
    // freeze scrolling on the page body
    $('body').css({'overflow-y': 'hidden'});
    // create the lightbox
    $('<figure>', {
      class: 'lightbox', 
      css: { 
        'background': 'rgba(0, 0, 0, 0.50)',
        'cursor': 'pointer',
        'height': '100%',
        'left': '0',
        'opacity': '0',
        'padding': '16px',
        'position': 'fixed',
        'top': '0',
        'width': '100%',
      }
    })
    .append($('<img>', { 
      src: $(this).attr('href'),
      css: { 
        'background': 'white',
        'display': 'block',
        'left': '50%',
        'max-height': '100%',
        'max-width': '100%',
        'pointer-events': 'none',
        'position': 'relative',
        'top': '50%',
        'transform': 'translate(-50%, -50%)',
      }
    }))
    .appendTo(document.body)
    .animate({
      'opacity': '1'
    }, 300)
    .on('click', function (e) {
      $(this).animate({
        'opacity': '0'
      }, 300,
      function () {
        $(this).remove();
        // un-freeze scrolling on the page body
        $('body').css({'overflow-y': 'visible'});
      });
    });
  });
};

})(jQuery);