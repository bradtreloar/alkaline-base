"use strict";

(function ($, Drupal) {
  Drupal.behaviors.foundation = {
    attach: function attach(context) {
      $(context).once("foundation").foundation();
    }
  };
})(jQuery, Drupal);