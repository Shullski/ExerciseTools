//======= NEEDED GLOBALS =======
//Colors
var pink = '#ff7979';
var lightPink = '#ff9393';
var orange = '#f89654';
var lightOrange = '#f9ab76'
var green = '#6CAB19';
var yellow = '#CEE24A';
var red = '#e04141';
var greyRed = '#992f2f';
var blue = '#4298f4';
var blueDark = '#3469a3';

var _weight;
var _height;


var fadeinTimer; //Timer for animations
var mobileBreakpoint = 600;
var tabletBreakpoint = 768;
//Tracking scroll position
var lastScrollPosition = 0;
//Tracking which feature is open
var expandedDiv;
var prevExpandedDiv;
var expandedDivID
var prevExpandedDivID;
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

function getLBM(weight, bodyFat) {
  var result = weight * (bodyFat/100);
  result = weight - result;
  result = Math.floor(result);
  return result;
}

function getBMR(feet, inches, weight, age){
  var height = (feet * 12) + inches;
  var BMR = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
  return BMR;
}

function getBMI(feet, inches, weight) {
  var inches = (feet * 12) + inches;
  var result = (703) * (weight/(Math.pow(inches, 2)));
  result = result.toFixed(1);
  return result;
}

function generateOutput(feature){
  var theID = feature.find('.calculate').attr('id');
  var counter = 0;

  if(theID == 'calculateOneRM') {
    var weight = $('#weight').val();
    var reps = $('#reps').val();
    var maxes = getRepMaxes(weight, reps);
    $('#oneRepMaxOutput > #max').each(function() {
      $(this).html(maxes[counter]);
      counter++;
    });

  }else if (theID == 'calculateTDE') {
    var inches = $('#TDEinchesInput').val();
    inches = parseInt(inches);
    var feet = $('#TDEfeetInput').val();;
    feet = parseInt(feet);
    var weight = $('#TDEweightInput').val();
    weight = parseInt(weight);
    var age = $('#TDEageInput').val();
    age = parseInt(age);
    var BMR = getBMR(feet, inches, weight, age);
    BMR = Math.floor(BMR);
    $('#BMRoutput').html(BMR);

  }else if (theID == 'calculateLBM') {
    var weight = $('#LBMweightInput').val();
    var bodyfat = $('#LBMbodyFatInput').val();
    var LBM = getLBM(weight, bodyfat);
    $('#LBMoutput').find('.output').html(LBM);

  }else if (theID == 'calculateBMI') {
    var feet = $('#BMIfeetInput').val();
    feet = parseInt(feet);
    var inches = $('#BMIinchesInput').val();
    inches = parseInt(inches);
    var weight = $('#BMIweightInput').val();
    weight = parseInt(weight);
    var BMI = getBMI(feet, inches, weight);
    $('#BMIoutput').html(BMI);

  }
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

//Changes accent colors of expanded features
function updateButtonColors(element) {
  var closeButton = $('.close');
  var calculateButton = $('.calculate');
  if((element).hasClass('oneRM')) {
    closeButton.css('background', 'linear-gradient(to top right, ' + pink + ' 40%, ' + orange + ')');
    calculateButton.css('background', 'linear-gradient(to right, ' + pink + ' 40%, ' + orange + ')');
  }else if ((element).hasClass('tdee')) {
    closeButton.css('background', 'linear-gradient(to top right, ' + green + ' 40%, ' + yellow + ')');
    calculateButton.css('background', 'linear-gradient(to right, ' + green + ' 40%, ' + yellow + ')');
  }else if ((element).hasClass('lbm')) {
    closeButton.css('background', 'linear-gradient(to top right, ' + red + ', ' + greyRed + ')');
    calculateButton.css('background', 'linear-gradient(to right, ' + red + ', ' + greyRed + ')');
  }else if ((element).hasClass('bmi')) {
    closeButton.css('background', 'linear-gradient(to top right, ' + blue + ' 40%, ' + blueDark + ')');
    calculateButton.css('background', 'linear-gradient(to right, ' + blue + ' 40%, ' + blueDark + ')');
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

function getFeatureID(element) {
  var theID = $(element).attr('id');
  return theID;
}

$(window).bind("load", function() {
});

/*===============*/
$(document).ready(function(){

  //========Show/hide scroll arrow on 1rm output=======
  $('.userOutput').scroll(function() {
    var outputPosition = $(this).scrollTop();
    if(outputPosition > 40 ) {
      $(this).find('.scrolldown').fadeOut('fast')
    }else {
      $(this).find('.scrolldown').fadeIn('fast')
    }
  });

  //============== MORE FEATURE INFO ================
  $('.infoIcon').click(function(){
    expandedDiv.find('.expandedInfo').toggleClass('expandInfo');
  });

  //============== Expanding a feature ================
  $('.feature').click(function(){
    expandedDiv = $(this);
    expandedDivID = getFeatureID(expandedDiv);
    updateButtonColors(expandedDiv);
    //Cancel fade in if feature is double clicked
    if(expandedDivID == prevExpandedDivID) {
      clearTimeout(fadeinTimer);
    }
    if(expandedDiv.hasClass('clickable')) {
      //Stop fadein of content if double clicked
      //Put old overlay behind new one if it exists
      if(prevExpandedDiv) prevExpandedDiv.css('z-index', '2');
      //Expand Div
      expandedDiv.css({'height': '100%', 'width':'100%', 'z-index': '3'});
      expandedDiv.find('.content').fadeOut(200);
      expandedDiv.find('.darkOverlay').removeClass('overlayHover');
      expandedDiv.removeClass('clickable');
      $('.feature').each(function(){
        if($(this).hasClass('clickable')) {
          $(this).addClass('notClickable')
        }
      });
      //Fade back in tooltip
      setTimeout(function(){
        $('.close').css({'height':'45px', 'width':'45px'});
        $(expandedDiv).find('.expandedContent').fadeIn(400);
        $(expandedDiv).find('.expandedContent').css('transform', 'translate(50%, 50%)');
      },600);
    }
  });

  //============== Closing a feature ================
  $('.close').click(function(){

    $('.expandedContent').fadeOut(200);
    $('.expandedContent').css('transform', 'translate(50%, 55%)');
    expandedDiv.css({'height': '50%', 'width': '50%'});
    expandedDiv.find('.darkOverlay').addClass('overlayHover');
    $('.feature').each(function(){
      if($(this).hasClass('notClickable')) {
        $(this).removeClass('notClickable')
      }
    });
    expandedDiv.addClass('clickable');
    $('.close').css({'height':'0px', 'width': '0px'});
    fadeinTimer = setTimeout(function(){
      prevExpandedDiv.find('.content').fadeIn(200);
    },600);
    //This div is now the previous
    prevExpandedDiv = expandedDiv;
    prevExpandedDivID = getFeatureID(prevExpandedDiv);
  });

  //=========== Calculate 1rm and fill chart =========
  $('.calculate').click(function() {
    generateOutput(expandedDiv);
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
