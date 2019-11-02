"use strict";

(function ($, Drupal) {
  Drupal.behaviors.alkalineGallery = {
    attach: function attach() {
      // Add lightbox to gallery.
      $(".gallery").once("alkalineGallery").each(function (index, gallery) {
        return new Alkaline.Gallery(gallery);
      });
    }
  };
})(jQuery, Drupal);