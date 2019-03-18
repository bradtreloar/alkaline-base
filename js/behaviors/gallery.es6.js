(($, Drupal) => {
  class AlkalineGallery {
    constructor(gallery) {
      this.gallery = $(gallery);
      // Create the modal.
      this.reveal = $(`
        <div class="lightbox">
          <button class="close-button" data-close aria-label="Close modal" type="button">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#times" />
            </svg>
          </button>
        </div>
      `).appendTo(this.gallery);

      // // Initialise the Foundation Reveal component.
      this.reveal.addClass("reveal full");
      this.revealPlugin = new Foundation.Reveal(this.reveal, {
        fullScreen: true
      });

      // Build the carousel
      this.carousel = $(`<div class="carousel">`).appendTo(this.reveal);

      // Add the Foundation Orbit component element.
      this.orbit = $(`
        <div class="orbit" role="region"
          data-orbit
          data-options="animInFromLeft:fade-in; animInFromRight:fade-in; animOutToLeft:fade-out; animOutToRight:fade-out;"
        >
          <div class="orbit-controls">
            <button class="previous orbit-previous">
              <svg aria-hidden="true" class="icon">
                <use xlink:href="#caret-left" />
              </svg>
            </button>
            <button class="next orbit-next">
              <svg aria-hidden="true" class="icon">
                <use xlink:href="#caret-right" />
              </svg>
            </button>
          </div>
        </div>
      `).appendTo(this.carousel);

      // Add the Orbits slides.
      const orbitContainer = $(`<ul class="orbit-container">`).appendTo(
        this.orbit
      );

      this.gallery.find("a").each((index, link) => {
        const $link = $(link);

        const src = $link.attr("href");

        const caption = $link
          .parent()
          .siblings("figcaption")
          .html();

        const slide = $(`
          <li class="orbit-slide">
            <figure class="orbit-figure">
              <picture>
                <img src="${src}" />
              </picture>
              <figcaption class="orbit-caption">
                ${caption}
              </figcaption>
            </figure>
          </li>
        `);

        slide.appendTo(orbitContainer);

        $link.click(event => {
          event.preventDefault();
          this.openSlide(slide);
        });
      });

      this.reveal.on("open.zf.reveal", () => {
        // Initialise the Foundation Orbit plugin.
        this.initOrbitPlugin();
      });

      this.reveal.on("closed.zf.reveal", () => {
        // Reset all slides.
        this.orbitPlugin.$slides
          .removeClass("is-active")
          .removeAttr("aria-live")
          .hide();

        // For some reason, the plugin will only reinitialise properly if
        // both of these deletions are here.
        delete this.orbitPlugin.$slides;
        delete this.orbitPlugin;
      });
    }

    openSlide(slide) {
      // Set the active slide then open the lightbox.
      slide
        .addClass("is-active")
        .show()
        .queue(next => {
          this.revealPlugin.open();
          next();
        });
    }

    initOrbitPlugin() {
      if (!this.orbitPlugin)
        this.orbitPlugin = new Foundation.Orbit(this.orbit, {
          animInFromLeft: "fade-in",
          animInFromRight: "fade-in",
          animOutToLeft: "fade-out",
          animOutToRight: "fade-out",
          autoPlay: false
        });
      else this.orbitPlugin._init();
    }
  }

  Drupal.behaviors.alkalineGallery = {
    attach: () => {
      // Add lightbox to gallery.
      $(".gallery")
        .once("alkalineGallery")
        .each((index, gallery) => {
          const alkalineGallery = new AlkalineGallery(gallery);
        });
    }
  };
})(jQuery, Drupal);
