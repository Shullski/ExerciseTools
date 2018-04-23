//COLORS
var pink = '#ff7979';
var lightPink = '#ff9393';
var orange = '#f89654';
var lightOrange = '#f9ab76'

//Used to determine if scrolling up or down
var lastScrollPosition = 0;

//Coefficients for one rep max
var maxCoeffecients = [1.0, .943, .906, .881, .856, .831, .807, .786, .765, .744, .723, .703, .688, .675, .662, .650, .638, .627, .616, .606];

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
  console.log(getRepMaxes(155,3));

  var expandedDiv;
  var prevExpandedDiv;
  console.log($('.input').css('display'));

  //Remove mobile nav overlay
  $(window).on('resize', function(){
  });

  $(document).scroll(function() {
    var position = $(this).scrollTop();
  });

  //Show more arrow on 1rm output
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
    $('.close').css('background', 'linear-gradient(to top right, ' + pink + ' 40%, ' + orange + ')');
    setTimeout(function(){
        $('.close').css({'height':'45px', 'width':'45px'});
        $('.expandedContent').fadeIn(400);
        $('.expandedContent').css('transform', 'translate(50%, 50%)');
      },600);
    });

  $('.close').click(function(){
    $('.expandedContent').fadeOut(200);
    $('.expandedContent').css('transform', 'translate(50%, 55%)');
    expandedDiv.css('height', '50%');
    expandedDiv.css('width', '50%');
    expandedDiv.find('span, .icon').fadeIn(500);
    expandedDiv.find('.content').animate({top: '50%'}, 400);
    $('.close').css({'height':'0px', 'width': '0px'});
    prevExpandedDiv = expandedDiv;
  });

  $('.calculate').click(function() {
    var counter = 0;
    var weight = $('#weight').val();
    var reps = $('#reps').val();
    if(!(reps && weight)) {
      $('.error').fadeIn(400);
      expandedDiv.find('input').css('border', '2px solid ' + pink);
      setTimeout(function(){
          $('.error').stop().fadeOut(400);
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

  //SMOOTH SCROLLING
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
