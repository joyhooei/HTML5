;(function(w){
    var utils={
        setCookie:function(name,value,time){
            var exp  = new Date();
            exp.setTime(exp.getTime() + (typeof(time)=='undefined'?(360*24*60*60*1000):time));
            document.cookie = name + "="+ escape (value) + ";path=/;expires=" + exp.toGMTString();
        },
        getCookie:function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null) {
                var tmp = unescape(arr[2]);
                if(tmp.indexOf('"') == 0){
                    tmp = tmp.substr(1,tmp.length-2);
                }
                return tmp;
            }
            return null;
        },
        delCookie:function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=utils.getCookie(name);
            if(cval!=null) document.cookie= name + "="+cval+";path=/;expires="+exp.toGMTString();
        },
        getBrowserInfo:function(){
            var agent = navigator.userAgent.toLowerCase() ;
            var regStr_ie = /msie [\d.]+;/gi ;
            if(agent.indexOf("msie") > 0)
            {
                return (agent.match(regStr_ie)+'').replace(/[^0-9.]/ig,"") ;
            }
        },
        initUserInfoBox:function(){
            $('div.right-person').off('click').on('click',function(e){
                e.stopPropagation();
                $('div.rpc-box').toggleClass('hide');
            });
            $('body').click(function(){
                $('div.rpc-box').addClass('hide');
            });
        },
        initAppListSelect:function(callBack){
            $('#select_app a').off('click').on('click',function(e){
                e.stopPropagation();
                if($(this).attr('value')){
                    $('#select_app .input_bg2_ul').toggleClass('hide');
                }
            });
            $('body').click(function(){
                $('#select_app .input_bg2_ul').addClass('hide');
            });
            $('#select_app').undelegate('.input_bg2_ul li','click').delegate('.input_bg2_ul li','click',function(){
                $('#select_app a').text($(this).text());
                $('#select_app a').attr('value',$(this).attr('value'));
                //选择后将产品存入cookie中
                utils.setCookie('market_app_id',$(this).attr('value'));
                utils.setCookie('market_app_name',$(this).text());
                callBack && callBack();
            });
        },
        initChat:function(){
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart', //指定图片的容器 id
                    type: 'area',
                    marginRight: 100,
                    marginBottom: 25
                },
                credits: {text: '',href: '#'},//底布链接 置空
                title: {text: '',x: -20},
                subtitle: {text: '',x: -20},
                xAxis: {categories: [],lineColor:'#086291',labels: {
                    style: {color: '#086291',fontFamily:'arial',fontSize:'12px'}
                },tickColor: '#086291',tickWidth: 3,tickLength:5,tickmarkPlacement:'on'},
                yAxis: {id:'yAxis',title: {text: ' '}},
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.series.name +'</b><br/>'+
                            this.x +': '+ this.y ;
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: 10,
                    y: 100,
                    borderWidth: 0
                },
                plotOptions: {
                    area:{
                        fillOpacity:0.2,
                        marker: {
                            lineWidth: 2,
                            lineColor: '#fff',
                            radius:4,
                            symbol: 'circle'//设置为圆形
                        }
                    }
                },
                series: []
            });
            return chart;
        },
        getPreMonthStr:function(date){
            var m = date.getMonth();
            var y = date.getFullYear();
            if (m == 0) {
                y = y - 1;
                m = 11;
            } else {
                m = m - 1;
            }
            return new Date(y, m, 1);
        },
        getTimeParam:function(type){
            var start_date=null,end_date=null;
            var time_type = type;
            if(time_type == '1'){
                //day
                if($('#date_input').data('startDate') != undefined){
                    start_date = $('#date_input').data('startDate');
                    end_date = $('#date_input').data('endDate');
                }else{
                    var _date = new Date();
                    start_date = new Date(_date.getTime()-(1000*60*60*24*7)).format('yyyy-MM-dd');
                    end_date = new Date(_date.getTime()-(1000*60*60*24*1)).format('yyyy-MM-dd');
                }
            }else{
                //moth
                if($('#mon_input').data('startDate') != undefined){
                    start_date = $('#mon_input').data('startDate');
                    end_date = $('#mon_input').data('endDate');
                }else{
                    var _date = new Date();
                    start_date = utils.getPreMonthStr(_date).format('yyyy-MM-dd');
                    end_date = _date.format('yyyy-MM-dd');
                }
            }
            return [start_date,end_date];
        },
        activeNavClass:function(){
            var id=$('.bbli_son.active').attr('nav-id');
            $('.bbli_head').removeClass('active').siblings('a').addClass('hide');
            $('#nav_'+id).addClass('active').siblings('a').removeClass('hide');
        },
        logout:function(){
            //清除cookie
            utils.delCookie('market_user_email');
            utils.delCookie('market_app_id');
            utils.delCookie('market_app_name');
            location.href='login.html';
        },
        ajaxDomain:'./'
    };
    w.utils=utils;
})(window);

//低版本浏览器提示
if(utils.getBrowserInfo() <  8){
    $('#tips_low_box_bg,#tips_low_box').removeClass('hide');
}
//兼容ie8没有滚动条
if(utils.getBrowserInfo() ==  8){
    $('html').css('height','auto');
}
//其他初始化函数
Date.prototype.format = function(format){
    var o =
    {
        "M+" : this.getMonth()+1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth()+3)/3),
        "S" : this.getMilliseconds()
    }
    if(/(y+)/.test(format))
        format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};
Date.prototype.toStr = function() {
    return this.getFullYear() + "-" + ((this.getMonth() + 1)<10?("0"+(this.getMonth() + 1)):(this.getMonth() + 1))
        + "-" + (this.getDate()<10?("0"+this.getDate()):this.getDate());
};
String.prototype.toDate = function() {
    var _tmp = this.split("-");
    return new Date(parseInt(_tmp[0], 10), parseInt(_tmp[1], 10) - 1, parseInt(
        _tmp[2], 10))
};
/**
 * ajax  分页页码
 * @param page
 * @param count
 * @param eachPageNum
 * @param click
 * @return
 */
function Paginated(page,count,eachPageNum,click){
    this.page = page;
    this.count = count;
    this.eachPageNum = eachPageNum;
    this._num = 8;
    this.maxNum = -1;
    this.url = "";
    this.geUrl = function(page){
        return this.url+(this.url.indexOf("?")>0?"&":"?")+"page="+page;
    };
    this.html = function(){
        var _s = [];
        _s.push("<div class=\"pagination\">");
        if(this.getTotalPage()>1){
            if(this.page==1){
                _s.push("<span class=\"disabled prev_page\"></span>");
                _s.push(this.pagebar());
                _s.push("<a class=\"next_page\" href='javascript:;'  "+click(this.getNextPage())+"></a>&nbsp;");
            }else if(this.page>1 && this.page<this.getTotalPage()){
                _s.push("<a class=\"prev_page\" href='javascript:;' "+click(this.getPrePage())+"></a>");
                _s.push(this.pagebar());
                _s.push("<a class=\"next_page\" href='javascript:;' "+click(this.getNextPage())+"></a>&nbsp;");
            }else{
                _s.push("<a class=\"prev_page\" href='javascript:;' "+click(this.getPrePage())+"></a>&nbsp;");
                _s.push(this.pagebar());
                _s.push("<span class=\"disabled next_page\"></span>");
            }
            _s.push("跳转至&nbsp;<span><input type='text' size='4' id='turn_page' onkeydown=\"if(event.keyCode==13){document.getElementById('__turn_page').click();}\" onkeyup=\"this.value=this.value.replace(/\\D/g,'');\" onblur=\"this.value=this.value.replace(/\\D/g,'');\" /></span>");
            _s.push("&nbsp;<a class=\"a_no\" href='javascript:;' id=\"__turn_page\" >确定</a>");
        }
        _s.push("</div>");
        return _s.join('');
    };
    this.turn = function(func){
        var button = document.getElementById('__turn_page')
        if(button != null){
            if(button.addEventListener){
                button.addEventListener("click",func,false);
            }else if(button.attachEvent){
                button.attachEvent("onclick",func);
            }
        }
    };
    this.getInputValue = function(){
        //判断是否有超出最大页码
        var _el = document.getElementById('turn_page');
        if(_el.value.trim() != ''){
            if(parseInt(_el.value)>this.getTotalPage()){
                _el.value = this.getTotalPage();
            }
        }
        return _el.value.trim();
    };
    this.getTotalPage = function() {
        return Math.floor((this.count+this.eachPageNum-1)/this.eachPageNum);
    };
    this.pagebar = function(){
        var _bar = [];
        var _startPos = this.page-(this._num/2)>0?this.page-(this._num/2):1;
        if(_startPos>1){
            _bar.push("<a class='page_num' href='javascript:;' "+click(1)+">"+1+" ..."+"</a>");
        }
        var _endPos = (_startPos+this._num)>this.getTotalPage()?this.getTotalPage():(_startPos+this._num);
        if(_endPos-this._num>0)  _startPos = _endPos-this._num;
        for(;_startPos<=_endPos;_startPos++){
            if(_startPos == this.page){
                _bar.push("<span class=\"current\">"+_startPos+"</span>");
            }else{
                _bar.push("<a class='page_num' href='javascript:;' "+click(_startPos)+">"+_startPos+"</a>");
            }
        }
        if(_endPos<this.getTotalPage()){
            _bar.push("<a class='page_num' href='javascript:;' "+click(this.getTotalPage())+">"+" ..."+this.getTotalPage()+"</a>");
        }
        return _bar.join('');
    };
    this.getNextPage = function(){
        return this.page+1;
    };
    this.getPrePage = function(){
        return this.page-1;
    };
}
