(function($) {
  //caches a jQuery object containing the navbar element
  var navbar = $('.sticky-navbar');

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 500) {
      navbar.fadeIn(400).addClass('fixed-top');
    } else {
      navbar.stop().fadeOut(100);
    }
  });

  //Toogle switch icon
  $('.navbar-toggler').click(function() {
    $('.navbar-toggler-icon').toggle();
    $('.close-toggler').toggle();
    $('.close-toggler:visible').css('display', 'inline-block');
  });

})(jQuery);