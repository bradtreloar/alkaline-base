(($, Drupal) => {
  Drupal.behaviors.foundation = {
    attach: context => {
      $(context)
        .once("foundation")
        .foundation();
    }
  };
})(jQuery, Drupal);
