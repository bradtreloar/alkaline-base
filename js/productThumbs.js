(function ($) {
"use strict";

Drupal.behaviors.alkalineOverlayNav = {
  attach: function (context, settings) {
    $('.product-thumbs').once('alkalineProductThumbs').each(function (header) {
      var $figure = $(this);

      // Create the container for the active image.
      var $activeImageContainer = $('<div>');
      $figure.prepend($activeImageContainer);

      // Initialise the gallery thumbs.
      var $thumbs = $figure.find('li a');
      for (var i = 0; i < $thumbs.length; i++) {
        // Make sure the link element gets the pointer click.
        $thumbs.eq(i).children('img').css('pointer-events', 'none');
        $thumbs.eq(i).on('click', function (e) {
          e.preventDefault();
          
          // Replace the active thumb and (re)initialise the lightbox.
          var $thumb = $(e.target).clone();
          $activeImageContainer.empty();
          $activeImageContainer.append($thumb);
          $thumb.lightbox();
        });
      }

      // Make the first thumb active.
      $thumbs.eq(0).click();
    });
  },
}

$.fn.productThumbs = function () {
};

})(jQuery);