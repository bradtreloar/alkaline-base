(($, Drupal, Alkaline) => {
  Drupal.behaviors.alkalineGallery = {
    attach: () => {
      // Add lightbox to gallery.
      $(".gallery")
        .once("alkalineGallery")
        .each((index, gallery) => {
          const alkalineGallery = new Alkaline.Gallery(gallery);
        });
    }
  };
})(jQuery, Drupal, Alkaline);
