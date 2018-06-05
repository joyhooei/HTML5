/**
 * 我方游戏页面top层引入
 * @author zhoushen
 * @since 2016/11/23
 */
(function($, window){

    var getshareinfoApi   = 'http://i.7724.com/sdkshare/getshareinfo';
    var getWxShareInitApi = 'http://i.7724.com/sdkshare/jswxsdk';
    var reportShareEventApi = 'http://i.7724.com/sdkshare/reportshareevent';
    var getChannelTypeInfoApi = 'http://i.7724.com/sdkshare/checkchannel';

    var debug = function(title, msg){
        // return true;
        console.log(title);
        console.log(msg);
    }

    //游戏窗体，
    var game_if_name = 'game_if';

    var shareInfo = undefined;
    var shareCpCustomerParams = {}; //cp分享自定义参数

    var receive = function(e){

        debug('接受子窗体数据', e.data);

        var event  = e.data.event;

        if(event == 'share'){ 
            share(e.data.appkey, 'share', e.data.customerParams);
        }else if(event == 'follow'){
            follow();
        }else if(event == 'showWeixinGuide'){
            wxShare();
        }else if (event == 'checkChannelType'){
            checkChannel(e.data.referrerUrl);
        }
    }

    /**
     * 分享
     * @param  {[type]} appkey 游戏appkey
     * @param  {[type]} type share
     * @param  {[type]} customerParams 自定义参数
     * @return {[type]}        [description]
     */
    var share = function(appkey, type, customerParams){ 
        if(!appkey){
            alert('缺失参数appkey!');
        }

        var hideGuide = false;
        if(customerParams && customerParams.hideGuide){
            hideGuide = customerParams.hideGuide;
            delete customerParams['hideGuide'];
        }

        shareCpCustomerParams = customerParams;

        $.ajax(  
            {  
                type:'get',  
                url : getshareinfoApi,  
                data: {appkey:appkey,type:type},
                dataType : 'jsonp', 
                jsonp:"jsoncallback",
                success : function(respon) {  
                    debug('请求分享数据', respon);

                    if(respon.code < 1){
                        alert(respon.msg);
                        return false;
                    }

                    shareInfo = respon.data;
                    
                    var ua = navigator.userAgent.toLowerCase();
                    if (ua.match(/MicroMessenger/i) == "micromessenger") {
                        // debug('微信分享');
                        // 弹层提示
                        if(window.QqesShareSdk.configShowShareGuide === true 
                            && hideGuide === false){
                            wxShare();
                        }
                        //微信分享初始化
                        wxShareInit(shareInfo);

                    }else if (ua.match(/7724hezi/i) == "7724hezi") {
                        location = "SHARESDK:://title="+shareInfo.shareTitle+"|||url="+ shareInfo.shareUrl+"|||img="+shareInfo.shareImg+"|||desc="+shareInfo.shareDesc+'|||type='+shareInfo.type;
                    } else {
                        showPc();
                    }
                },  
                error : function() {  
                    alert('发起接口请求错误！');  
                }  
            }  
        );   
    }
    
    
    //关注二维码
    var follow = function () {
        
        if(window.channelQrcodeBlock != '1')
        {
            var html = '<div id="qqes_followwrap" style="z-index:9999; width: 100%;left: 0;position: fixed;top: 0;background: rgba(0, 0, 0, 0.8) none repeat scroll 0 0;height: 100%;">';
            html += '<div style="width:280px;text-align: center;transform: translate(-50%,-50%); -webkit-transform: translate(-50%,-50%);position: absolute; left: 50%;top: 50%;-moz-transform: translate(-50%,-50%);">';
            html += '<img style="border-radius:10px;width:100%;" src="http://img.7724.com/7724/img/2016/11/28/20161128144612_88122.jpg" >';
            html += '</div></div>';
            $("#qqes_followwrap").remove();
            $("body").append(html);
            document.getElementById("qqes_followwrap").onclick = function () {
                $("#qqes_followwrap").remove();
            };
        }
    }

    //document http://www.jb51.net/article/59664.htm 
    //微信分享回调初始化
    var wxShareInit = function(shareInfo){

        //top frame url
        var url = location.href.split('#')[0];
        url = encodeURIComponent(url);
        
        $.ajax(  
            {  
                type:'get',  
                url : getWxShareInitApi,  
                data: {'url':url},
                dataType : 'jsonp', 
                jsonp:"jsoncallback",
                success : function(respon) { 
                    debug('获取微信分享初始化参数', respon);

                    if(respon.code < 1){
                        alert(respon.msg);
                        return false;
                    }

                    var jsApp = respon.data;

                    wx.config({
                        debug: false,
                        appId: jsApp.appId, // 必填，公众号的唯一标识
                        timestamp: jsApp.timestamp, // 必填，生成签名的时间戳
                        nonceStr: jsApp.nonceStr, // 必填，生成签名的随机串
                        signature: jsApp.signature,// 必填，签名，见附录1
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ'
                            ]
                    });

                    wx.ready(function(res){

                        wx.onMenuShareTimeline({ //分享到朋友圈
                            'title' : shareInfo.shareTitle,
                            'link'  : shareInfo.shareUrl,
                            'imgUrl' : shareInfo.shareImg,

                            'success' : function(){
                                // 用户确认分享后执行的回调函数
                                wxShareSuccessCallback(shareInfo);
                            },
                            'cancel' : function(){
                            }
                        });

                        wx.onMenuShareAppMessage({ //分享到朋友
                            title: shareInfo.shareTitle, // 分享标题
                            desc: shareInfo.shareDesc, // 分享描述
                            link: shareInfo.shareUrl, // 分享链接
                            imgUrl: shareInfo.shareImg, // 分享图标
                            // type: shareInfo.type, // 分享类型,music、video或link，不填默认为link
                            // dataUrl: shareInfo.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                wxShareSuccessCallback(shareInfo);
                            },
                            cancel: function () { 
                                // 用户取消分享后执行的回调函数
                            }
                        });
                        wx.onMenuShareQQ({ //分享到qq
                            title : shareInfo.shareTitle, // 分享标题
                            desc: shareInfo.shareDesc, // 分享描述
                            link: shareInfo.shareUrl, // 分享链接
                            imgUrl: shareInfo.shareImg, // 分享图标
                            success: function () { 
                               // 用户确认分享后执行的回调函数
                               wxShareSuccessCallback(shareInfo);
                            },
                            cancel: function () { 
                               // 用户取消分享后执行的回调函数
                            }
                        });

                        debug('微信分享初始化完毕');
                    });

                    // alert('微信初始化完毕');
                    
                },  
                error : function() {  
                    alert('发起接口请求错误！');  
                }  
            }  
        ); 
    }

    //记录分享成功日志
    var _logShareEvent = function(data){

          $.ajax(  
            {  
                type:'get',  
                url : reportShareEventApi,  
                data: data,
                dataType : 'jsonp', 
                jsonp:"jsoncallback",
                success : function(ret) { 
                    if(ret.code < 0){
                        alert('分享失败:' + ret.msg);
                    }
                }
            });
    }

    //微信分享成功回调
    var wxShareSuccessCallback = function(){
    	$("#share-square").remove();
        //report
        var data = {
            'appkey' : shareInfo.appkey,
            'shareId' : shareInfo.shareId,
            'source' : 1,
            'cpCustomerParams' : shareCpCustomerParams
        };
        _logShareEvent(data);
        //分享成功后回调
        var event = 'shareback';
        document.getElementById(game_if_name).contentWindow.postMessage({'event':event}, '*');
    }

    //app端分享成功通知
    var appShareCallback = function(type, source){
        $("#share-square").remove();
        //report
        var data = {
            'appkey' : shareInfo.appkey,
            'shareId' : shareInfo.shareId,
            'source' : 2, //游戏盒
            'cpCustomerParams' : shareCpCustomerParams
        };
        _logShareEvent(data);
        //分享成功后回调
        var event = 'shareback';
        document.getElementById(game_if_name).contentWindow.postMessage({'event':event}, '*');
    }

    //微信分享提示
    var wxShare = function() {
        var img = '';
        img = "";
        b = '<style id="share-square-css">'; 
        b += ".share-square{position:fixed;background:rgba(0,0,0,.4);width:100%;height:100%;left:0;top:0;font-size:14px;color:#fff;z-index:110000;font-weight:bold;}"; 
        b += ".share-square .share-box{position:relative;top:5px;}"; 
        b += ".share-square .share-box>img{position:absolute;-moz-animation: icon-bounce .2s ease-in-out infinite alternate;-webkit-animation: icon-bounce .2s ease-in-out infinite alternate;animation: icon-bounce .2s ease-in-out infinite alternate;right:10px;}";
        b += ".share-square span{position:absolute;right:5px;top:50px;}";
        b += ".share-square span img{position:relative;top:5px;vertical-align:baseline;}";
        b += "@-moz-keyframes icon-bounce {0%{top:5px;}50%{top:0px;}100%{top:-5px;}}";
        b += "@-webkit-keyframes icon-bounce {0%{top:5px;}50%{top:0px;}100%{top:-5px;}}";
        b += "@keyframes icon-bounce {0%{top:5px;}50%{top:0px;}100%{top:-5px;}}";
        b += "</style>";
        $("head").append(b);
        var c = '<div id="share-square" class="share-square"><div class="share-box"><img src="http://img.7724.com/7724/img/2016/11/23/20161123164117_87715.png"><span><img class="z" src="http://img.7724.com/7724/img/2016/11/23/20161123164206_27479.png" alt="">发送朋友圈或朋友</span></div></div>';
        $("body").append(c);
     	//绑定浮层的点击事件
        document.getElementById("share-square").onclick = function () {
            $("#share-square").remove();
            $("#share-square-css").remove();
        };
    }
    
    var showTryPlay = function() {
    	var wanshan = new WanshanWidget({
		"wanshanWrapId":"#wanshan_wrap"
		});
		wanshan.init();
    }

    //pc端分享提示（只有微信端和盒子端才能分享奖励）
	var showPc = function() {
		var b = '<style id="share-square-css">'; 
        b += ".code-white-box{width: 84%; max-width:300px; background: #eee;position: absolute;top: 50%;margin-top: -160px;z-index: 1000;}";
         b += "@media all and (min-width: 240px) and (max-width: 358px) {.code-white-box{left: 8%;}}";
         b += "@media all and (min-width: 358px) { ";
         b += ".code-white-box{left: 50%; margin-left: -150px;}";
         b += "}";
        b += "</style>";
        $("head").append(b);
		var html = '<div class="code-black-bg" style="background: rgba(0,0,0,0.6);position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;"></div>';
		html += '<div class="code-white-box" >';
	  	html += '<h2 style="font-size: 16px; height: 48px;line-height: 48px;text-align: center; color: #333;font-weight: normal; background: #f5f5f5; border-bottom: 1px solid #d9d9d9;	 position: relative;">分享有礼<span id="close_share" style="display: block;width: 24px;height: 24px;position: absolute;top: -12px;right: -12px;	background: url(http://img.7724.com/7724/img/2016/12/08/20161208092914_85122.png) no-repeat top center;background-size: 24px auto;cursor: pointer;"></span></h2>';
	 	html += '<p class="p1" style="font-size: 14px; color: #666; width: 84%;margin: 12px auto 0 auto;">需在7724游戏盒中分享才能获得邀请奖励</p>';
	 	html += ' <p class="p2" style="width: 180px;margin: 12px auto 0 auto;"><img style="width: 180px;" src="http://img.7724.com/7724/img/2016/12/09/20161209165136_52514.jpg"></p>';
	 	html += ' <a style="display: block;width: 160px;height: 38px;line-height: 38px;font-size: 16px; background: #00b1fd;margin: 12px auto 20px auto;	color: #fff;text-align: center;text-decoration: none;border-radius:6px;-webkit-border-radius:6px; -moz-border-radius:6px;-o-border-radius:6px;" href="http://app.7724.com/">下载 7724 游戏盒</a>';
		html += '</div>';
        $("body").append(html);
        document.getElementById("close_share").onclick = function () {
			$(".code-black-bg").remove();
			$(".code-white-box").remove();
            $("#share-square-css").remove();
        };
    
	}

    /**
     * 获取qquerystring
     * @return {[type]} [description]
     */
    function getQueryObject() {
        var url = location.search;
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }

    //TODO
    window.addEventListener('message', receive, false);

    //export to global
    window.QqesShareSdk = {
        'configShowShareGuide' : true, //是否显示微信分享引导遮照        
        'appShareCallback' : appShareCallback,    
        'wxShareInit' : wxShareInit //微信分享初始化 
    };

    // 判断分享渠道是内部渠道还是外部渠道
    var checkChannel = function () {
        $.ajax({
            type: 'post',
            url: getChannelTypeInfoApi,
            dataType: 'jsonp',
            jsonp: "jsoncallback",
            success: function (json) {
                if (json.code > 0) {
                    var status = json.data['status'];
                    checkChannelCallback(status);
                } else {
                    alert(json.msg);
                }
            }
        });

    }
    // 判断分享渠道回调
    var checkChannelCallback = function (status) {
        var event = 'checkChannelback';
        document.getElementById(game_if_name).contentWindow.postMessage({'event':event, 'data':{'status':status}}, '*');
    }
})(jQuery, window);