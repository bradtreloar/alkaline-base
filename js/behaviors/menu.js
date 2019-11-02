"use strict";

(function ($, Drupal) {
  Drupal.behaviors.alkalineResponsiveMenu = {
    attach: function attach(context) {
      // Convert Navbar menus to Foundation drilldown menus.
      $(".navbar nav > ul.menu", context).once("alkalineResponsiveMenu").each(function (index, menu) {
        return new Alkaline.ResponsiveMenu(menu);
      });
    }
  };
})(jQuery, Drupal);