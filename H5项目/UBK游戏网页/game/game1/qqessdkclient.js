/**
 * 提供给cp引入
 * @author zhoushen
 * @since 2016/11/23
 * @since 2017/4/14 add pay method
 */
(function($, window){
    QqesSdk = function(option){

    }

    /**
     * 3.0 添加支付不刷新页面方法（pay()）
     * 2.0 去掉不必要接口
     */
    QqesSdk.version = '3.0';

    QqesSdk.eventCalls = {};

    //微信分享是否初始化过
    QqesSdk.isWeixinShareConfiged = false;

    var debug = function(title, msg){
        // return true;
        console.log(title);
        console.log(msg);
    }

    /**
     * 7724发起支付
     * @param  {[type]} payUrl [description]
     * @return {[type]}        [description]
     */
    QqesSdk.pay = function(payUrl){

        //暂未开放。
        return false;

        if(!payUrl){
            alert('支付链接缺失!');
        }

        payUrl += '&sdkversion=' + QqesSdk.version;

        var iframe_id = '7724pay_iframe_wrap';
        var pay_iframe = document.createElement('iframe');
        pay_iframe.id                    = iframe_id;
        pay_iframe.src                   = payUrl;
        pay_iframe.scrolling             = 'no';
        pay_iframe.width                 = '100%';
        pay_iframe.height                = '100%';
        pay_iframe.frameBorder           = 0;
        pay_iframe.marginWidth           = 0;
        pay_iframe.marginHeight          = 0;
        pay_iframe.style.height          = '100%';
        pay_iframe.style.position        = 'absolute';
        pay_iframe.style.top             = 0;
        pay_iframe.style.left            = 0;
        pay_iframe.style.width           = '100%';
        pay_iframe.style['z-index']      = 9;
        pay_iframe.style['margin-left'] = 0;
        pay_iframe.style['overflow-y']  =  'hidden';
        document.body.appendChild(pay_iframe);

        // add event listen
        window.addEventListener('message', closePanel, false);
        function closePanel(e) {
            debug('7724sdk-接收支付页面关闭事件', e.data);
            if (e.data.hasOwnProperty("7724sdk_stat") && e.data['7724sdk_stat'] === "close") {
                var el = document.getElementById(iframe_id);
                el.parentNode.removeChild(el);
                //remove listen hander
                window.removeEventListener('message', closePanel);
            }
        }
    }


    //接受接口消息通知
    var receive = function(e){

        debug('接受接口返回数据', e.data);

        if( e.data.event &&  QqesSdk.eventCalls[e.data.event] ){
            var data = '';
            if( e.data.data ){
                data = e.data.data;
            }
            QqesSdk.eventCalls[e.data.event](data);
        }
    }

    //private function
    //显示微信分享引导
    var _showWeixinGuide = function(){
        var data = {
            'event'  : 'showWeixinGuide'
        };
        window.parent.postMessage(data, '*');
    }

    /**
     * 读取cookie
     * http://www.jb51.net/article/64330.htm
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    var getCookie = function(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }


    /**
     * 分享关注是否可用（系统会员只有是内部渠道的才显示分享按钮）
     * @return {Int} 1|开启分享关注，2|关闭分享关注
     */
    QqesSdk.isShareAvaliable = function(callback) {
        var data = {
            'event'  : 'checkChannelType'
        };
        QqesSdk.eventCalls['checkChannelback'] = callback;

        window.parent.postMessage(data, '*');
    }

    /**
     * 微信分享初始化
     * @param  {[type]}   appkey           [description]
     * @param  {Function} callback         [description]
     * @param  {[type]}   customerParams cp自定义参数
     * @return {[type]}                    [description]
     */
    QqesSdk.shareConfig = function(appkey, callback, customerParams){

        if(!customerParams){
            customerParams = {};
        }

        //XXX: 兼容代码
        //初始化微信分享
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {

            customerParams.hideGuide = true;

            QqesSdk.share(appkey, callback, customerParams);

            QqesSdk.isWeixinShareConfiged = true;
        }
    }

    /**
     * 点击分享
     * @param  {[type]}   appkey   sdk游戏appkey
     * @param  {Function} callback 分享成功回调
     * @param  json cpCustomerParams cp自定义分享参数
     */
    QqesSdk.share = function(appkey, callback, customerParams){

        if(!customerParams){
            customerParams = {};
        }

        //XXX: 兼容代码
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger"
            && QqesSdk.isWeixinShareConfiged === true) { //微信已经初始化过分享,直接显示引导
            _showWeixinGuide();
            return true;
        }

        var data = {
            'event'  : 'share',
            'appkey' : appkey,
            'customerParams' : customerParams
        };

        QqesSdk.eventCalls['shareback'] = callback;

        window.parent.postMessage(data, '*');
    }

    //弹出关注弹窗
    QqesSdk.follow = function(){
        var data = {
            'event'  : 'follow'
        };

        window.parent.postMessage(data, '*');
    }

    //out
    window.QqesSdk = QqesSdk;

    window.addEventListener('message', receive, false);

})(null, window);