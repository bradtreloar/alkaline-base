/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.alkalineGallery = {
    attach: function attach() {
      $(".gallery").once("alkalineGallery").each(function (index, gallery) {
        return new Alkaline.Gallery(gallery);
      });
    }
  };
})(jQuery, Drupal);
