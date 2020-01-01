"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Make sure Alkaline container object is initialised while JS aggregator is turned off.
if (window.Alkaline === undefined) window.Alkaline = {};

(function ($) {
  Alkaline.ResponsiveMenu =
  /*#__PURE__*/
  function () {
    function _class(menu) {
      _classCallCheck(this, _class);

      var $menu = $(menu).data({
        "responsive-menu": "drilldown large-dropdown",
        backButton: "\n            <li class=\"js-drilldown-back\">\n              <a tabindex=\"0\">\n                <span>Back</span>\n              </a>\n            </li>\n          ",
        autoHeight: true,
        animateHeight: true
      }).addClass("vertical large-horizontal"); // Add Foundation menu classes

      $menu.find("ul.sub-menu").addClass("vertical");
      $menu.responsiveMenu = new Foundation.ResponsiveMenu($menu, {});
    }

    return _class;
  }();
})(jQuery);