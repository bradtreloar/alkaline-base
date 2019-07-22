(($, Drupal) => {
  Drupal.behaviors.alkalineResponsiveMenu = {
    attach: context => {
      // Convert Navbar menus to Foundation drilldown menus.
      $(".navbar nav > ul.menu", context)
        .once("alkalineResponsiveMenu")
        .each((index, menu) => new Alkaline.ResponsiveMenu(menu));
    }
  };
})(jQuery, Drupal);
