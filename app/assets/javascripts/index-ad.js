(function($){
	$.extend({
	    /*!
		 * 滑动门
		 * n tag对象
		 * c 内容块对象
		 * m 事件处理方式
		 * s 当前选中tag的class名
		 * i 初始化显示索引
		 */
		door:function(n,c,m,s,i){
			var n,c,center;
			n = $(n);
			c = $(c);
			var prevFlag,prevImg;
			var autoFlag = function(num){
			    if(prevFlag) prevFlag.removeClass(s);
				n.eq(num).addClass(s);
				prevFlag = n.eq(num);
				center = num;	
			};
			var autoImg = function(num){
				if(prevImg) prevImg.hide();
				c.eq(num).fadeIn("slow");
				prevImg = c.eq(num);
			};
			n.bind(m, function() {				
				if(center != n.index(this)){
				    autoFlag(n.index(this));
				    autoImg(n.index(this));
				}
		    });
			autoFlag(i);
			autoImg(i);
		},
		/*!
		 * 轮播图
		 * nx   tag对象
		 * c    内容块对象
		 * m    事件处理方式
		 * s    当前选中tag的class名
		 * i    初始化显示索引
		 * t    切换速度
		 * tl   延时
		 * tag  是否自动生成数字小标及小标的标签名字
		 */
		autoPlay:function(nx,c,m,s,i,t,tl,tag){
			var n,c,nb,center,val = null,st = null;
			c = $(c);
			if(tag){
				nb = $(nx);
				var tag = tag.split(".");
				if (c.size() > 1) {
				   for(var o = 1;o < c.size() + 1;o++){
					   $("<" + tag[0] + "/>").text(o).addClass(tag[1]).appendTo(nb);
				   }
				}
				n = $(nx + " " + tag);
			}
			else{
			    n = $(nx);
			}		
			c.hide();
			n.bind(m, function() {				
				var self = this; 
				if(st) clearTimeout(st);
				st = setTimeout(function(){
					autoFlag(n.index(self));
					autoImg(n.index(self));
					swfcheck(n.index(self));
				},tl);
		    });
			n.hover(
			    function(){if(val) clearInterval(val); swfcheck(center);},
				function(){autoAdd(); if(st) clearTimeout(st);}
			);
			c.hover(
			    function(){if(val) clearInterval(val); swfcheck(center);},
				function(){autoAdd();}
			);
			var prevFlag,prevImg;
			var autoFlag = function(num){
			    if(prevFlag) prevFlag.removeClass(s);
				n.eq(num).addClass(s);
				prevFlag = n.eq(num);
				center = num;	
			};
			var autoImg = function(num){
				if(prevImg) prevImg.hide();
				c.eq(num).fadeIn("slow");
				prevImg = c.eq(num);
			};
			var autoAdd = function(){
				if(val) clearInterval(val);
				val = setInterval(function(){
					autoFlag(center >= c.size()-1 ? 0 : ++center);
					autoImg(center);
					swfcheck(center);	
				},t);
				swfcheck(center);
			};
			var swfcheck = function(m){
				if(m == 0) {
					$(nx).hide();
				}
				else {
					$(nx).show();
				}
			};
			autoFlag(i);
			autoImg(i);
			if(c.size() > 1){
				autoAdd();
			}
		},
		/*!
		 * 腕表图库和品牌专卖店
		 */
		scrollPlay:function(id,boxId,tag){
			var c,nav,n,prev,next,boxWidth,speed,dataArr,box,center = 0;
			var prevEvent = true,nextEvent = true,playEvent = true,val = null;
			speed = 300;
			var reg1 = new RegExp("&lt;","g");
			var reg2 = new RegExp("&gt;","g");
			dataArr = $(boxId).html().replace(reg1,"<").replace(reg2,">").split(",");
			dataArr.pop();
			var boxCheck = function(){
			    box = $(id + " div.lis_pic " + tag);
			    boxWidth = box.eq(0).outerWidth();
				c.width(boxWidth*box.size());
			};
			c = $(id + " div.lis_pic");
			nav = $(id + " .nav_pic");
			prev = $(id + " div.prev");
			next = $(id + " div.next");
			if (dataArr.length > 1) {
			   for(var i = 0;i < dataArr.length;i++){
				   $("<b/>").appendTo(nav);
			   }
			}
			n = $(id + " .nav_pic b");
			var addbox = function(t,x){
				if(t == "load"){
					$(dataArr[0]).appendTo(c);
					boxCheck();
				}
				if(t == "prev"){					
					$(dataArr[x]).prependTo(c);
					boxCheck();
					c.css("left",-boxWidth+"px");
				}
				if(t == "next"){				
					$(dataArr[x]).appendTo(c);
					boxCheck();
				}
			};
			var removebox = function(o){
				if(o == "prev"){
					box.eq(1).remove();
					c.css("left","0px");
					boxCheck();
				}
				if(o == "next"){
					box.eq(0).remove();
					c.css("left","0px");
					boxCheck();
				}
			};
			n.click(function(){  
				if(playEvent){
					playEvent = false;
					var m = center;
					var self = this;
					autoFlag(n.index(self));
					if(m>center){
						addbox("prev",center);
				        prevScroll(1);
				        removebox("prev");
					}
					if(m<center){
						addbox("next",center);
				        nextScroll(1);
				        removebox("next");
					}
				}
			});
			prev.click(function(){
				if(prevEvent){
					prevEvent = false;
					prevPlay();
				}
			});
			next.click(function(){
				if(nextEvent){
					nextEvent = false;
					nextPlay();
				}
			});
			n.hover(
			    function(){clearInterval(val);},
				function(){autoAdd();}
			);
			c.hover(
			    function(){clearInterval(val);},
				function(){autoAdd();}
			);
			prev.hover(
			    function(){$(this).addClass("prev_hover");clearInterval(val);},
				function(){$(this).removeClass("prev_hover");autoAdd();}
			);
			next.hover(
			    function(){$(this).addClass("next_hover");clearInterval(val);},
				function(){$(this).removeClass("next_hover");autoAdd();}
			);
			var prevFlag;
			var autoFlag = function(num){
			    if(prevFlag) prevFlag.removeClass("hover");
				n.eq(num).addClass("hover");
				prevFlag = n.eq(num);
				center = num;
			};
			var prevPlay = function(){
				center <= 0 ? center = dataArr.length -1 : --center;
				addbox("prev",center);
				prevScroll(1);
				
				autoFlag(center);
			};
			var nextPlay = function(){
				center >= dataArr.length-1 ? center = 0 : ++center;
				addbox("next",center);
				nextScroll(1);
				
				autoFlag(center);
			};
			var prevScroll = function(s){
				c.animate({left:"+=" + boxWidth*s},speed,function(){
					removebox("prev");
					prevEvent = true;
					playEvent = true;
				});
			};
			var nextScroll = function(s){
			    c.animate({left:"-=" + boxWidth*s},speed,function(){
					removebox("next");
					nextEvent = true;
					playEvent = true;
				});
			};
			var autoAdd = function(){
				if(val) clearInterval(val);
				val = setInterval(function(){
					nextPlay();
				},7000);
			};
			autoAdd();
            autoFlag(0);
			addbox("load");
		},
		scrollPlay_:function(id,boxId,tag){
			var c,nav,n,prev,next,boxWidth,speed,dataArr,box,center = 0;
			var prevEvent = true,nextEvent = true,playEvent = true,val = null;
			speed = 300;
			dataArr = $(boxId + " " + tag);
			var boxCheck = function(){
			    box = $(id + " div.lis_pic " + tag);
			    boxWidth = box.eq(0).outerWidth();
				c.width(boxWidth*box.size());
			};
			c = $(id + " div.lis_pic");
			nav = $(id + " .nav_pic");
			prev = $(id + " div.prev");
			next = $(id + " div.next");
			if (dataArr.length > 1) {
			   for(var i = 0;i < dataArr.length;i++){
				   $("<b/>").appendTo(nav);
			   }
			}
			n = $(id + " .nav_pic b");
			var addbox = function(t,x){
				if(t == "load"){
					dataArr.eq(0).clone().appendTo(c);
					boxCheck();
				}
				if(t == "prev"){					
					dataArr.eq(x).clone().prependTo(c);
					boxCheck();
					c.css("left",-boxWidth+"px");
				}
				if(t == "next"){				
					dataArr.eq(x).clone().appendTo(c);
					boxCheck();
				}
			};
			var removebox = function(o){
				if(o == "prev"){
					box.eq(1).remove();
					c.css("left","0px");
					boxCheck();
				}
				if(o == "next"){
					box.eq(0).remove();
					c.css("left","0px");
					boxCheck();
				}
			};
			n.click(function(){  
				if(playEvent){
					playEvent = false;
					var m = center;
					var self = this;
					autoFlag(n.index(self));
					if(m>center){
						addbox("prev",center);
				        prevScroll(1);
					}
					if(m<center){
						addbox("next",center);
				        nextScroll(1);
					}
				}
			});
			prev.click(function(){
				if(prevEvent){
					prevEvent = false;
					prevPlay();
				}
			});
			next.click(function(){
				if(nextEvent){
					nextEvent = false;
					nextPlay();
				}
			});
			n.hover(
			    function(){clearInterval(val);},
				function(){autoAdd();}
			);
			c.hover(
			    function(){clearInterval(val);},
				function(){autoAdd();}
			);
			prev.hover(
			    function(){$(this).addClass("prev_hover");clearInterval(val);},
				function(){$(this).removeClass("prev_hover");autoAdd();}
			);
			next.hover(
			    function(){$(this).addClass("next_hover");clearInterval(val);},
				function(){$(this).removeClass("next_hover");autoAdd();}
			);
			var prevFlag;
			var autoFlag = function(num){
			    if(prevFlag) prevFlag.removeClass("hover");
				n.eq(num).addClass("hover");
				prevFlag = n.eq(num);
				center = num;
			};
			var prevPlay = function(){
				center <= 0 ? center = dataArr.length -1 : --center;
				addbox("prev",center);
				prevScroll(1);
				autoFlag(center);
			};
			var nextPlay = function(){
				center >= dataArr.length-1 ? center = 0 : ++center;
				addbox("next",center);
				nextScroll(1);
				autoFlag(center);
			};
			var prevScroll = function(s){
				c.animate({left:"+=" + boxWidth*s},speed,function(){
					removebox("prev");
					prevEvent = true;
					playEvent = true;
				});
			};
			var nextScroll = function(s){
			    c.animate({left:"-=" + boxWidth*s},speed,function(){
					removebox("next");
					nextEvent = true;
					playEvent = true;
				});
			};
			var autoAdd = function(){
				if(val) clearInterval(val);
				val = setInterval(function(){
					nextPlay();
				},7000);
			};
			autoAdd();
            autoFlag(0);
			addbox("load");
		}
		
	});
})(jQuery);


$(document).ready(function(){
	// tags
	$.door("#navRandId1 li","#lisRandId1 ul","click","hover",0);
	$.door("#navRandId2 li","#lisRandId2 ul","click","hover",0);
	$.door("#navRandId3 li","#lisRandId3 ul","click","hover",0);
	//$.door("#navRandId4 li","#lisRandId4 ul","click","hover",0);
	// focus
	$.autoPlay("#imgNavId","#imgConId div.focus_img_lis","click","hover",0,12000,200,"b");
	//picture
	$.scrollPlay_("#contentScroolId1","#boxScroolId1","dl");
	//brand
	$.scrollPlay_("#contentScroolId2","#boxScroolId2","ul");
});