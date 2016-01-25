/**
*  通用JS tab切换 
*  
*/

(function($){
	$.fn.lazyNavi=function(nor,act,tm,flag){
		var navi_over = '';
		$(this).children().mouseover(function(){
			var self = this;
			navi_over = setTimeout(function(){
			if($(self) == null || $(self).attr("rel") == null) return;
			if($(self).hasClass(nor) || !$(self).hasClass(act)){
				if(act) {
					act_class = '.'+act;
				} else {
					act_class = '[class="'+act+'"]';
				}
			    var act_navi = $(self).siblings(act_class);
			    if(act) {
			    	act_navi.removeClass(act);
			    }
			    if(nor) {
			    	act_navi.addClass(nor);
			    }
		 	    var rel_div = act_navi.attr("rel");
			    $("#"+rel_div).hide();
			    var now_div =$(self).attr("rel");
			    if(nor) {
			    	$(self).removeClass(nor);
			    }
			    if(act) {
		 	    	$(self).addClass(act);
			    }
		 	    if(flag) {
					$("#"+now_div).getLazyArea();
		 	    }
			    $("#"+now_div).show();	
	        }
			},tm);	
		});
		$(this).children().mouseout(function(){
			if(navi_over) {
				clearTimeout(navi_over);
			}
		});

 	};
 	$.fn.autoNavi=function(nor,act,tm,flag,clear_auto){
 		var self = this;
 		function navi_auto(){
			if(act) {
				act_class = '.'+act;
			} else {
				act_class = '[class="'+act+'"]';
			}
 			var act_navi = $(self).children(act_class);
			if(act) {
			    act_navi.removeClass(act);
			}
			if(nor) {
			    act_navi.addClass(nor);
			}
 			var rel_div = act_navi.attr("rel");
 			if(!rel_div) {
 				return;
 			}
 			$("#"+rel_div).hide();
 			while(1) {
 				var next_navi = act_navi.next();
 				if(next_navi.html() == null) {
 					next_navi = $(self).children().eq(0);
 				}
 				act_navi = next_navi;
 				if(next_navi.attr("rel")) {
 					break;
 				}
 			}
			if(nor) {
			    next_navi.removeClass(nor);
			}
			if(act) {
		 	    next_navi.addClass(act);
			}
 			var next_div = next_navi.attr("rel");
 			if(flag) {
 				$("#"+next_div).getLazyArea();
 			}
 			$("#"+next_div).show();
 		}
 		var auto_navi = setInterval(navi_auto,tm);
 		if(clear_auto) {
 			$(clear_auto).hover(
    			function(){clearInterval(auto_navi);},
    			function(){auto_navi = setInterval(navi_auto,tm);});
 		}
 	};
 	$.fn.getLazyArea=function(){
		var lazyarea = $(this).children('textarea');
	    if(lazyarea.length == 1) {			
			lazyarea.hide();
			var lazyhtml = lazyarea.val();
			$(this).html(lazyhtml);
		}
 	};
 })(jQuery);

//焦点图  
$(document).ready(function() {
	$(".swict").lazyNavi("","cur",200,0,0);
	$(".swict").autoNavi("","cur",5000,0,".head-news > div");
});

function tabsclass(type,id){
	$("#"+type+"classtop").removeClass();
	$("#"+type+"classlux").removeClass();
	$("#"+type+"classdlux").removeClass();
	$("#"+type+"classpfp").removeClass();
	
	$("#"+id).attr("class","cur");
	
	$("#tabs"+type+"classtop").css("display","none");
	$("#tabs"+type+"classlux").css("display","none");
	$("#tabs"+type+"classdlux").css("display","none");
	$("#tabs"+type+"classpfp").css("display","none");
	
	$("#tabs"+id).css("display","block");
}

function brandtabs(type,id){
	$("#product").removeClass();
	$("#lseries").removeClass();
	$("#series").removeClass();
	
	$("#"+id).attr("class","cur");
	
	$("#productlist").css("display","none");
	$("#lserieslist").css("display","none");
	$("#serieslist").css("display","none");
	
	$("#"+type).css("display","block");
}

