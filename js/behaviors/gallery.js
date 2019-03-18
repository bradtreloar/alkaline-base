/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function ($, Drupal) {
  var AlkalineGallery = function () {
    function AlkalineGallery(gallery) {
      var _this = this;

      _classCallCheck(this, AlkalineGallery);

      this.gallery = $(gallery);

      this.reveal = $("\n        <div class=\"lightbox\">\n          <button class=\"close-button\" data-close aria-label=\"Close modal\" type=\"button\">\n            <svg class=\"icon\" aria-hidden=\"true\">\n              <use xlink:href=\"#times\" />\n            </svg>\n          </button>\n        </div>\n      ").appendTo(this.gallery);

      this.reveal.addClass("reveal full");
      this.revealPlugin = new Foundation.Reveal(this.reveal, {});

      this.carousel = $("<div class=\"carousel\">").appendTo(this.reveal);

      this.orbit = $("\n        <div class=\"orbit\" role=\"region\"\n          data-orbit\n          data-options=\"animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;\"\n        >\n          <div class=\"orbit-controls\">\n            <button class=\"previous orbit-previous\">\n              <svg aria-hidden=\"true\" class=\"icon\">\n                <use xlink:href=\"#caret-left\" />\n              </svg>\n            </button>\n            <button class=\"next orbit-next\">\n              <svg aria-hidden=\"true\" class=\"icon\">\n                <use xlink:href=\"#caret-right\" />\n              </svg>\n            </button>\n          </div>\n        </div>\n      ").appendTo(this.carousel);

      var orbitContainer = $("<ul class=\"orbit-container\">").appendTo(this.orbit);

      this.gallery.find("a").each(function (index, link) {
        var $link = $(link);

        var src = $link.attr("href");

        var caption = $link.parent().siblings("figcaption").html();

        var slide = $("\n          <li class=\"orbit-slide\">\n            <figure class=\"orbit-figure\">\n              <picture>\n                <img src=\"" + src + "\" />\n              </picture>\n              <figcaption class=\"orbit-caption\">\n                " + caption + "\n              </figcaption>\n            </figure>\n          </li>\n        ");

        slide.appendTo(orbitContainer);

        $link.click(function (event) {
          event.preventDefault();
          _this.openSlide(slide);
        });
      });

      this.reveal.on("open.zf.reveal", function () {
        _this.initOrbitPlugin();
      });

      this.reveal.on("closed.zf.reveal", function () {
        _this.orbitPlugin.$slides.removeClass("is-active").removeAttr("aria-live").hide();

        delete _this.orbitPlugin.$slides;
        delete _this.orbitPlugin;

        $("html").scrollTop(_this.originalScrollPos);
        _this.originalScrollPos = null;
      });
    }

    _createClass(AlkalineGallery, [{
      key: "openSlide",
      value: function openSlide(slide) {
        var _this2 = this;

        slide.addClass("is-active").show().queue(function (next) {
          _this2.originalScrollPos = window.pageYOffset;

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

    return AlkalineGallery;
  }();

  Drupal.behaviors.alkalineGallery = {
    attach: function attach() {
      $(".gallery").once("alkalineGallery").each(function (index, gallery) {
        var alkalineGallery = new AlkalineGallery(gallery);
      });
    }
  };
})(jQuery, Drupal);