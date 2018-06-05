
		mTouch('.cehua_page-mask,.cehua_close').on('tap',  function () {
			$("#icon_7724").show();
			$(".cehua_page").animate({left:"-100%"},100);
			$('.cehua_page-mask').hide();
			$('.news_box').hide();
		})
	 	//关闭侧滑页面
		mTouch('.cehua_close .close_button').on('tap',  function () {
			$("#icon_7724").show();
			$(".cehua_page").animate({left:"-100%"},100);
			$('.cehua_page-mask').hide();
		})
		//显示消息弹框
		mTouch('.cehua_close .news_button').on('tap',  function () {
			$(".cehua_page").animate({left:"-100%"},100);
			setTimeout(function(){
				$('.news_box').show();
			},120)
		})
		//关闭消息弹框
		mTouch('.news_box .news_close_button').on('tap',  function () {
			$('.news_box').hide();
			$("#icon_7724").show();
			$('.cehua_page-mask').hide();
		})

		
		//悬浮球
		var assistiveLeft, assistiveRight, timerid;
		var stickEdge = function (el) { 
			var left = parseInt(el.style.left) || 0,
				width = parseInt(el.offsetWidth) || 0,
				windowWith = (document.documentElement || document.body).offsetWidth;
			if (left > (windowWith - width) / 2) {
				left = windowWith - width+10 ;
			} else {
				left = -10;
			}
			el.style.transition = 'all .2s';
			el.style['transition'] = 'all .2s';
			el.style.left = left + 'px';
			timerid = setTimeout(function () {
				el.style.transition = 'all .5s';
				el.style['transition'] = 'all .5s';
				 
			}, 2000);
		};
		mTouch('#icon_7724').on('swipestart', function (e) {
			clearTimeout(timerid);
			e.stopPropagation();
			this.style.transition = 'none';
			this.style['transition'] = 'none';
			assistiveLeft = parseInt(this.style.left) || 0;
			assistiveTop = parseInt(this.style.top) || 0;
			return false;
		})
		.on('swiping', function (e) {
			e.stopPropagation();
			this.style.left =  assistiveLeft + e.mTouchEvent.moveX + 'px';
			this.style.top = assistiveTop + e.mTouchEvent.moveY + 'px';
		})
		.on('swipeend', function () {
			stickEdge(this);
		});
		
		(function(){
			console.log(navigator.control)
			var control = navigator.control || {};
			if (control.gesture) {
					control.gesture(false);
			}
			})();