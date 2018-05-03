//======= NEEDED GLOBALS =======
//Colors
var pink = '#ff7979';
var lightPink = '#ff9393';
var orange = '#f89654';
var lightOrange = '#f9ab76'

var mobileBreakpoint = 600;
var tabletBreakpoint = 768;
//Tracking scroll position
var lastScrollPosition = 0;
//Tracking which feature is open
var expandedDiv;
var prevExpandedDiv;
//Coefficients for one rep max
var maxCoeffecients = [1.0, .943, .906, .881, .856, .831, .807, .786, .765, .744, .723, .703, .688, .675, .662, .650, .638, .627, .616, .606];

//=== FUCTIONALITY ===
function getRepMaxes(weight, reps) {
  var results = [];
  var oneRepMax = 1.0278 - (0.0278 * reps);
  oneRepMax = weight / oneRepMax;
  oneRepMax = Math.floor(oneRepMax);
  for(var i = 0; i < maxCoeffecients.length; i++) {
    results[i] = Math.floor(oneRepMax * maxCoeffecients[i]);
  }
  return results;
}

//Determines scroll direction
function isScrollingUp(pos) {
  if(lastScrollPosition > pos) {
    lastScrollPosition = pos;
    return true;
  }else{
    lastScrollPosition = pos;
    return false;
  }
}

function isMobile(width) {
  if(width < mobileBreakpoint) return true;
}

function isTablet(width) {
  if(width < tabletBreakpoint && width > mobileBreakpoint) return true;
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
  $(window).on('resize', function(){
  });

  $(document).scroll(function() {
    var position = $(this).scrollTop();
  });

  //========Show/hide scroll arrow on 1rm output=======
  $('.output').scroll(function() {
    var outputPosition = $(this).scrollTop();
    if(outputPosition > 40 ) {
      $('.output').find('.scrolldown').fadeOut('fast')
    }else {
      $('.output').find('.scrolldown').fadeIn('fast')
    }
  });

  //=============== HOVER EFFECTS ON FEATURE BUTTONS =============
  $('#eventButton, #mapButton, #messagingButton, #groupsButton').hover(function() {
    }, function(){
  });

  //============== Expanding a feature ================
  $('.feature').click(function(){
    expandedDiv = $(this);
    //Put old overlay behind new one if it exists
    if(prevExpandedDiv) prevExpandedDiv.css('z-index', '2');
    //Expand Div
    expandedDiv.css({'height': '100%', 'width':'100%', 'z-index': '3'});
    expandedDiv.find('.content').fadeOut(200);
    expandedDiv.find('.darkOverlay').removeClass('overlayHover');
    //Color exit button
    $('.close').css('background', 'linear-gradient(to top right, ' + pink + ' 40%, ' + orange + ')');
    setTimeout(function(){
      $('.close').css({'height':'45px', 'width':'45px'});
      $(expandedDiv).find('.expandedContent').fadeIn(400);
      $(expandedDiv).find('.expandedContent').css('transform', 'translate(50%, 50%)');
    },600);
  });

  //============== Closing a feature ================
  $('.close').click(function(){
    $('.expandedContent').fadeOut(200);
    $('.expandedContent').css('transform', 'translate(50%, 55%)');
    expandedDiv.css({'height': '50%', 'width': '50%'});
    expandedDiv.find('.darkOverlay').addClass('overlayHover');
    $('.close').css({'height':'0px', 'width': '0px'});
    setTimeout(function(){
      expandedDiv.find('.content').fadeIn(200);
    },600);
    //This div is now the previous
    prevExpandedDiv = expandedDiv;
  });

  //=========== Calculate 1rm and fill chart =========
  $('.calculate').click(function() {
    var counter = 0;
    var weight = $('#weight').val();
    var reps = $('#reps').val();
    if(!(reps && weight)) {
      //$('.error').fadeIn(400);
      expandedDiv.find('input').css('border', '2px solid ' + pink);
      setTimeout(function(){
          //$('.error').fadeOut(400);
          expandedDiv.find('input').css('border', 'none');
        },3000);
    }else {
      var maxes = getRepMaxes(weight, reps);
      $('#oneRepMaxOutput > #max').each(function() {
        $(this).html(maxes[counter]);
        counter++;
      });
    }
  });

  //===== SMOOTH SCROLLING =====
  $('a[href*="#"]').on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').stop().animate({
        scrollTop: ($(hash).offset().top - $('.nav').height() - 10)
      }, 800, function(){
        //window.location.hash = hash;
      });
    }
  });
});
