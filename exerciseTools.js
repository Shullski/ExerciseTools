//Used to determine if scrolling up or down
var lastScrollPosition = 0;

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

//Returns how far down an element is on page
function getScrollPosition(element) {
  var position = $(element).position().top;
  return position;
}

function startLoadAnimation() {
    loadTimer = setInterval(loadAnimation, 300);
}

$(window).bind("load", function() {

});

/*===============*/
$(document).ready(function(){
  var expandedDiv;
  var prevExpandedDiv;
  console.log($('.input').css('display'));
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
  $('.feature').click(function(){
    expandedDiv = $(this);
    var theid = expandedDiv.attr('id');
    var thisid;
    console.log(theid);
    //console.log('here: ' + $(expandedDiv));
    if(prevExpandedDiv) prevExpandedDiv.css('z-index', '2');
    expandedDiv.css('height', '100%');
    expandedDiv.css('width', '100%');
    expandedDiv.css('z-index', '3');
    expandedDiv.find('span, .icon').fadeOut(200);
    expandedDiv.find('.content').animate({top: '55px'}, 400);

    setTimeout(function(){
        $('.close').css({'height':'45px', 'width':'45px'});
        $('.expandedContent').fadeIn(400);
        $('.expandedContent > .container').css('transform', 'translate(-50%, -50%)');
      },600);
    });

  $('.close').click(function(){
    $('.expandedContent').fadeOut(200);
    $('.expandedContent > .container').css('transform', 'translate(-50%, -35%)');
    expandedDiv.css('height', '50%');
    expandedDiv.css('width', '50%');
    expandedDiv.find('span, .icon').fadeIn(500);
    expandedDiv.find('.content').animate({top: '50%'}, 400);
    $('.close').css({'height':'0px', 'width': '0px'});
    prevExpandedDiv = expandedDiv;

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
