"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Make sure Alkaline container object is initialised while JS aggregator is turned off.
if (window.Alkaline === undefined) Alkaline = {};

(function ($) {
  Alkaline.Gallery =
  /*#__PURE__*/
  function () {
    function _class(gallery) {
      var _this = this;

      _classCallCheck(this, _class);

      this.gallery = $(gallery); // Create the modal.

      this.reveal = $("\n        <div class=\"lightbox\">\n          <button class=\"close-button\" data-close aria-label=\"Close modal\" type=\"button\">\n            <svg class=\"icon\" aria-hidden=\"true\">\n              <use xlink:href=\"#times\" />\n            </svg>\n          </button>\n        </div>\n      ").appendTo(this.gallery); // // Initialise the Foundation Reveal component.

      this.reveal.addClass("reveal full");
      this.revealPlugin = new Foundation.Reveal(this.reveal, {}); // Build the slider.

      this.slider = $("<div class=\"slider\">").appendTo(this.reveal); // Add the Foundation Orbit component element.

      this.orbit = $("\n        <div class=\"orbit\" role=\"region\"\n          data-orbit\n          data-options=\"animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;\"\n        >\n          <div class=\"orbit-controls\">\n            <button class=\"previous orbit-previous\">\n              <svg aria-hidden=\"true\" class=\"icon\">\n                <use xlink:href=\"#caret-left\" />\n              </svg>\n            </button>\n            <button class=\"next orbit-next\">\n              <svg aria-hidden=\"true\" class=\"icon\">\n                <use xlink:href=\"#caret-right\" />\n              </svg>\n            </button>\n          </div>\n        </div>\n      ").appendTo(this.slider); // Add the Orbits slides.

      var orbitContainer = $("<ul class=\"orbit-container\">").appendTo(this.orbit);
      this.gallery.find("a").each(function (index, link) {
        var $link = $(link);
        var src = $link.attr("href");
        var caption = $link.parent().siblings("figcaption").html();
        var slide = $("\n          <li class=\"orbit-slide\">\n            <figure class=\"orbit-figure\">\n              <picture>\n                <img src=\"".concat(src, "\" />\n              </picture>\n              <figcaption class=\"orbit-caption\">\n                ").concat(caption, "\n              </figcaption>\n            </figure>\n          </li>\n        "));
        slide.appendTo(orbitContainer);
        $link.click(function (event) {
          event.preventDefault();

          _this.openSlide(slide);
        });
      });
      this.reveal.on("open.zf.reveal", function () {
        // Initialise the Foundation Orbit plugin.
        _this.initOrbitPlugin();
      });
      this.reveal.on("closed.zf.reveal", function () {
        // Reset all slides.
        _this.orbitPlugin.$slides.removeClass("is-active").removeAttr("aria-live").hide(); // For some reason, the plugin will only reinitialise properly if
        // both of these deletions are here.


        delete _this.orbitPlugin.$slides;
        delete _this.orbitPlugin; // Reset the page scroll position.

        $("html").scrollTop(_this.originalScrollPos);
        _this.originalScrollPos = null;
      });
    }

    _createClass(_class, [{
      key: "openSlide",
      value: function openSlide(slide) {
        var _this2 = this;

        // Set the active slide then open the lightbox.
        slide.addClass("is-active").show().queue(function (next) {
          // Save the scroll position.
          _this2.originalScrollPos = window.pageYOffset; // Open the lightbox.

          _this2.revealPlugin.open();

          next();
        });
      }
    }, {
      key: "initOrbitPlugin",
      value: function initOrbitPlugin() {
        if (!this.orbitPlugin) this.orbitPlugin = new Foundation.Orbit(this.orbit, {
          animInFromLeft: "fade-in",
          animInFromRight: "fade-in",
          animOutToLeft: "fade-out",
          animOutToRight: "fade-out",
          autoPlay: false
        });else this.orbitPlugin._init();
      }
    }]);

    return _class;
  }();
})(jQuery);