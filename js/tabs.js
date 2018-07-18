
(function ($) {
"use strict";
  
$.fn.tabs = function () {
  // collect the tabs before adding the button wrapper
  var $tabs = this.children();
  // abort if there are no tabs
  if ($tabs.length == 0) return;

  // need a div to hold the buttons
  var $btnWrapper = $('<div>', {
    class: 'tabs',
  }).prependTo(this);

  // add tab buttons
  $.each($tabs, function (index, tab) {
    var $tab = $(tab);
    // add a button for this tab
    $('<button>', {
      html: $tab.attr('title'),
    })
    .on('click', function (e) {
      e.preventDefault();
      $(this).siblings().removeClass('active');
      $tabs.hide();
      $(this).addClass('active');
      $tab.show();
    })
    .appendTo($btnWrapper);
  });

  // make the first tab active
  $btnWrapper.children().eq(0).click();
}

})(jQuery);
  