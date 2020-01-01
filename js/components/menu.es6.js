// Make sure Alkaline container object is initialised while JS aggregator is turned off.
if (window.Alkaline === undefined) window.Alkaline = {};

($ => {
  Alkaline.ResponsiveMenu = class {
    constructor(menu) {
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
    }
  };
})(jQuery);
