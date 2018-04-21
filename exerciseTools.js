//Main colors
/* ============== */
var redHex = '#F75B54';
var greenHex = '#00E985';
var tealHex = '#10DBE8';
var blueHex = '#54A0F7';
var purpleHex = '#B954F7';
/* ============= */
//To simulate "passing by reference"
//to determine if scrolling up or down
var lastScrollPosition = 0;

//Returns how far down an element is on page
function getScrollPosition(element) {
  var position = $(element).position().top;
  return position;
}

///Determine which nav option the user is currently scrolled over

//Determines if the user is scrolling up (true) or down (false)
function isScrollingUp(pos) {
  if(lastScrollPosition > pos) {
    lastScrollPosition = pos;
    return true;
  }else{
    lastScrollPosition = pos;
    return false;
  }
}



function startLoadAnimation() {
    loadTimer = setInterval(loadAnimation, 300);
}



$(window).bind("load", function() {

});

/*===============*/
$(document).ready(function(){


  //Remove mobile nav overlay
  $(window).on('resize', function(){
  });

  $(document).scroll(function() {
    var position = $(this).scrollTop();
  });

  //=============== HOVER EFFECTS ON FEATURE BUTTONS =============
  $('#eventButton, #mapButton, #messagingButton, #groupsButton').hover(function() {
    }, function(){
  });

  //============== CLICKABLE PROTOTYPE ================
  $('.feature').mousedown(function(){
    console.log($(this));
    $(this).css('z-index', '2');
    $(this).addClass('expanded');
  });


  //SMOOTH SCROLLING
  $('a[href*="#"]').on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      // Store hash
      var hash = this.hash;
      $('html, body').stop().animate({
        scrollTop: ($(hash).offset().top - $('.nav').height() - 10)
      }, 800, function(){
        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
      });
    }
  });

});
