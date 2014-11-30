var prevRes=null;
var prevMsg=null;
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
$(document).ready(function() {
	var paraM = getQueryString("m");
	if(paraM != null){
		$("#originalMsg").val(paraM);
	}
	$("#MD4Encode").click(function(){
	
		//$("#afterMsg").val($.md5($("#originalMsg").val()));
		$("#testP").text("prevMsg:"+prevMsg+" prevRes:"+ prevRes);
		
		var oriMsgVal = hex_md4($("#originalMsg").val());
		$("#afterMsg").val(oriMsgVal);	
		if(prevRes && prevMsg != $("#originalMsg").val() && oriMsgVal == prevRes){
			if(prevRes){
				$("#collision").css({"color":"#ff4433","font-size":"200%"})
						   .fadeTo('fast',0.5)
						   .text("find collision!!!").fadeTo('slow',1);
			}
			else{
				$("#collision").css({"color":"#ff4433","font-size":"200%"})
							   .animate({height:'+=20px'},'slow')
							   .text("find collision!!!");
			}
		}else{
			if(prevRes){
				$("#collision").css({"color":"#66ccff","font-size":"200%"}).
				fadeTo('fast',0.5).text("no collision").fadeTo('slow',1);
			}
			else{
				$("#collision").css({"color":"#66ccff","font-size":"200%"}).
				animate({height:'+=20px'},'slow').text("no collision");
			}
		}
		prevMsg = $("#originalMsg").val();
		prevRes = oriMsgVal;
	
  });
  $("#stepDemo").click(function(){
	  var mMsg = $("#originalMsg").val();
	  location.href="stepDemo.html?m="+mMsg;
  });
});
