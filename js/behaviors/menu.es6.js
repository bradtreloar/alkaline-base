(($, Drupal) => {
  Drupal.behaviors.alkalineResponsiveMenu = {
    attach: () => {
      // Convert Navbar menus to Foundation drilldown menus.
      $(".navbar nav > ul.menu")
        .once("alkalineResponsiveMenu")
        .each((index, menu) => {
          const $menu = $(menu)
            .data({
              "responsive-menu": "drilldown large-dropdown",
              backButton: `
                <li class="js-drilldown-back">
                  <a tabindex="0">
                    <span>Back</span>
                  </a>
                </li>
              `,
              autoHeight: true,
              animateHeight: true
            })
            .addClass("vertical large-horizontal");

          // Add Foundation menu classes
          $menu.find("ul.sub-menu").addClass("vertical");

          $menu.responsiveMenu = new Foundation.ResponsiveMenu($menu, {});
        });
    }
  };
})(jQuery, Drupal);
