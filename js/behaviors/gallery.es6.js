(($, Drupal) => {
  Drupal.behaviors.alkalineGallery = {
    attach: () => {
      // Add lightbox to gallery.
      $(".gallery")
        .once("alkalineGallery")
        .each((index, gallery) => new AlkalineGallery(gallery));
    }
  };
})(jQuery, Drupal);
