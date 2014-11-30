var step1Res,step3Res,paraM;
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
function calStepRes(){
	paraM = getQueryString("m");
	var temp = str2binl(paraM);
	var len = paraM.length * chrsz;
	temp[len >> 5] |= 0x80 << (len % 32);
	temp[(((len + 64) >>> 9) << 4) + 14] = len;
	step1Res = binl2str(temp);
	
	step3Res = hex_md4(paraM);
}
$(document).ready(function() {
  calStepRes();
  $("#pstep1").text("M:"+paraM+" ==> "+"M:"+step1Res);
  $("#pstep3").text("hash(M)="+step3Res);
  
  var h = document.getElementsByTagName('head')[0],
      link = document.createElement('link');

  link.href = 'ui-themes/le-frog/jquery-ui-1.10.0.custom.css';
  link.rel = 'stylesheet';
  h.appendChild(link);

  var $allSteps = $('#allSteps').cycle({
    timeout: 10000,
    speed: 200,
    pause: true,
    before: function() {
      $('#slider').slider('value', $('#allSteps li').index(this));
    }
  });
  if ( $.cookie('cyclePaused') ) {
    $allSteps.cycle('pause');
  }
  var $controls = $('<div id="allSteps-controls"></div>').insertAfter($allSteps);
  $('<button>Pause</button>').click(function(event) {
    event.preventDefault();
    $allSteps.cycle('pause');
    $.cookie('cyclePaused', 'y');
  }).button({
    icons: {primary: 'ui-icon-pause'}
  }).appendTo($controls);

  $('<button>Resume</button>').click(function(event) {
    event.preventDefault();
    var $paused = $('ul:paused');
    if ($paused.length) {
      $paused.cycle('resume');
      $.cookie('cyclePaused', null);
    }
    else {
      $(this).effect('shake', {
        distance: 10
      });
    }
  }).button({
    icons: {primary: 'ui-icon-play'}
  }).appendTo($controls);

  $('<button>Return</button>').click(function(event) {
    event.preventDefault();
    location.href="MD4Demo.html?m="+paraM;
  }).button({
    icons: {primary: 'ui-icon-arrowreturnthick-1-w'}
  }).appendTo($controls);


  $('<div id="slider"></div>').slider({
    min: 0,
    max: $('#allSteps li').length - 1,
    slide: function(event, ui) {
      $allSteps.cycle(ui.value);
    }
  }).appendTo($controls);

  $allSteps.hover(function() {
    $allSteps.find('.title').animate({
      backgroundColor: '#eee',
      color: '#000'
    }, 1000);
  }, function() {
    $allSteps.find('.title').animate({
      backgroundColor: '#000',
      color: '#fff'
    }, 1000);
  });

  $('h1').click(function() {
    $(this).toggleClass('highlighted', 'slow', 'easeInExpo');
  });

  $allSteps.find('.title').resizable({
    handles: 's'
  });
});
