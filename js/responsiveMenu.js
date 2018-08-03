
(function ($, Drupal) {
"use strict";

$(document).foundation();

Drupal.behaviors.alkalineResponsiveMenu = {
  attach: function (context, settings) {
    // Convert Navbar menus to Foundation drilldown menus.
    $('.navbar nav > ul.menu').once('alkalineResponsiveMenu').each(function (index, menu) {
      var $menu = $(menu);

      $menu.attr({
        'data-back-button': '<li class="js-drilldown-back"><a tabindex="0"><span>Back</span></a></li>',
        'data-wrapper': '<div class="menu-wrapper"></div>',
        'data-auto-height': 'true',
        'data-animate-height': 'true',
      });

      // Add Foundation menu classes
      $menu.addClass('vertical large-horizontal');
      $menu.find('ul').addClass('vertical');

      var $responsiveMenu = new Foundation.ResponsiveMenu($menu);

      // Add plugin rules to the responsive menu so that
      // it knows which types of menus we want.
      $responsiveMenu.rules = {
        small: {
          cssClass: 'drilldown',
          plugin: Foundation.Drilldown
        },
        large: {
          cssClass: 'dropdown',
          plugin: Foundation.DropdownMenu
        },
      }
        
      // Tell plugin to check the rules we just set.
      $responsiveMenu._checkMediaQueries();
    });
  },
}

})(jQuery, Drupal);