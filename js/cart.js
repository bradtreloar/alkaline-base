
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.commerceCartBlock = {
    attach: function (context) {
      var $context = $(context);
      var $cart = $context.find('.cart--cart-block');
      var $cartButton = $context.find('.cart-block--link__expand');
      var $cartContents = $cart.find('.cart-block--contents');

      if ($cartContents.length > 0) {
        // Expand the block when the link is clicked.
        $cartButton.on('click', function (e) {

          // Prevent it from going to the cart.
          e.preventDefault();

          // Toggle the active class.
          $cartContents
            .toggleClass('active')
        });
      }
    }
  };
})(jQuery, Drupal);
