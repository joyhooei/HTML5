/**
 * 不同页面的拓展需要自己的js里调用
 */
// window.onload = function () {
var TAB = new Tab();

// };

function Tab() {
    this.obj = null;
}

Tab.prototype.init = function (opt) {
    this.obj = document.getElementById(opt.oul);
    if(this.obj!==null){
           this.oLi = this.obj.getElementsByTagName('li');
       }else{
        return;
       };
    this.oDiv = document.getElementsByClassName(opt.odiv);
    this.changeStyle();
};

Tab.prototype.changeStyle = function () {
    for (var i = 0; i < this.oLi.length; i++) {
        this.oLi[i].index = i;
        var that = this;
        this.oLi[i].onclick = function () {
            that.revertStyle(that);
            if (that.oDiv.length > 1) {
                that.oDiv[this.index].style.display = 'block';
            }
            this.className = 'on';
        }
    }
};

Tab.prototype.revertStyle = function (that) {
    for (var j = 0; j < that.oLi.length; j++) {
        that.oDiv[j].style.display = 'none';
        that.oLi[j].className = '';
    }
};

// 参数位置
TAB.init({
    oul: 'tabUl',
    odiv: 'present-tab-con',
});


$(function(){
    $("#changeId").click(function(){
    	userLogout();
      //$(".black-bg,#quitTi").show();
    });
    $(".quit-close").click(function(){
      $(".black-bg,.quit-tishi").hide();
      $("#downloadTi").hide();
    });
    $(".in2").click(function(){
      $(".black-bg,.quit-tishi").hide();
    });
    /*$(".get-more").click(function(){
      $(".black-bg,#downloadTi").show();
    })*/
    $(".black-bg").click(function(){
      $(this).hide();
      $("#quitTi,#downloadTi").hide();
    })
    $(".back-left").click(function(){
      $(".index-box").animate({left:"-100%"},300);
      $(this).hide();
    })
  })

function showMsg(msg,btnName){
	  layer.open({
		title: [
          '温馨提示',
          'background-color:#f5f5f5; color:#333;'
       ],
       anim: 'up',
	    content: msg,
	    btn: btnName
	  });	
}

function showMsgWitchOpen(msg,btn,url)
{
	  layer.open({
		title: [
          '温馨提示',
          'background-color:#f5f5f5; color:#333;'
       ],
       anim: 'up',
	    content: msg,
	    btn: btn,
	    yes: function(index){
	        window.parent.open(url);
	        layer.close(index);
	      }	    
	  });
}
function showLoginOutOther(msg,url)
{
	  layer.open({
		title: [
          '温馨提示',
          'background-color:#f5f5f5; color:#333;'
       ],
       anim: 'up',
	    content: msg,
	    btn: ['完善帐号','继续退出'],
	    yes: function(index){
	    	showPerfection();
	    	layer.close(index);
	      },
	  	no:function(index){
	        window.parent.location =url;
	        layer.close(index);
	  	}
	  });	
}
function showLoginOut(msg,url)
{
	  layer.open({
		title: [
          '温馨提示',
          'background-color:#f5f5f5; color:#333;'
       ],
       anim: 'up',
	    content: msg,
	    btn: ['确定','取消'],
	    yes: function(index){
	        window.parent.location = url;
	        layer.close(index);
	      },
	  	no:function(index){
	        layer.close(index);
	  	}
	  });	
}
function showPerfectionMsg(msg,btnName){
	  layer.open({
		title: [
          '温馨提示',
          'background-color:#f5f5f5; color:#333;'
       ],
       anim: 'up',
	    content: msg,
	    btn: btnName,
	    yes: function(index){
	    	showPerfection();
	    	layer.close(index);
	      }
	  });	
}
function myCardUrl(){
	var url = window.document.location.host;
	var main = url.replace('.7724.com','');
	var goUrl = '';
	if(main=='www'){
		goUrl = "http://www.7724.com/user/cardbox";
	}else{
		goUrl = 'http://m.7724.com/user/card';
	}
	return goUrl;					
}

function showPerfection(){
	var perfection = new WanshanWidget({
		"wanshanWrapId":"#wanshan_wrap",
		"guideTipText":"您当前是试玩账号，继续退出会丢失账号哦，请完善资料！",
		"guideCancleBtnText":"继续退出",
		"guideCancleBtnCall":function(){
			//goLoginOut();
		},
		"commitSuccCall":function(res){
			window.location.reload(true);
		}
	});
	// debugger;
	perfection.init();
	$("#wanshan").click();
}