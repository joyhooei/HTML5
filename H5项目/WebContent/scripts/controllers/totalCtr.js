'use strict';
angular.module('mainApp')
    .controller('totalCtr',function($scope,httpAJAX,$interval){
        $('.product_select_box ').removeClass('hide');
        var funs={
            init:function(){
                //初始化双日历
                var _date = new Date();
                funs.dateRange = new pickerDateRange('date_input', {
                    isTodayValid : false,
                    startDate : new Date(_date.getTime()-(1000*60*60*24*7)).format('yyyy-MM-dd'),
                    endDate : new Date(_date.getTime()-(1000*60*60*24*1)).format('yyyy-MM-dd'),
                    defaultText : ' 至 ',
                    inputTrigger : 'day',
                    minValidDate:(new Date().getTime()/1000)-(60*60*24*90),
                    theme : 'ta',
                    success : function(obj) {
                        $('#date_input').data('startDate',obj.startDate);
                        $('#date_input').data('endDate',obj.endDate);
                        $scope.getAllData();
                    }
                });
                
            },
            drawLine:function(){
                var chart = $('#chart').highcharts()?$('#chart').highcharts():utils.initChat();
                while(chart.series.length > 0){
                    chart.series[0].remove()
                }
                var data = $('#db_data').data('db_data');
                var x = [],d = [];
                for(var i=data.length-1;i>=0;i--){
                    x.push(data[i].date);
                    d.push(data[i].download);
                }
                if(data.length > 10){
                    var len = data.length;
                    var interval = ((len-1)/6).toFixed(0);
                    chart.xAxis[0].update({
                        tickInterval: interval
                    });
                }else{
                    chart.xAxis[0].update({
                        tickInterval: 1
                    });
                }
                chart.options.tooltip.formatter = function(){
                    return '<b>'+ this.series.name +'</b><br/>'+
                        this.x +': '+ this.y ;
                }
                chart.xAxis[0].setCategories(x);
                chart.addSeries({
                    name: '数据',
                    data: d
                });
            },
            formatNum:function(num){
                var ns=num.split('/');
                var resu_n=0;
                if(ns.length == 1){
                    resu_n=parseInt(ns[0]);
                }else{
                    for(var i=0;i<ns.length;i++){
                        resu_n+=parseInt(ns[i]);
                    }
                }
                return resu_n;
            }
        };
        //页面初始化加载
        var timer=$interval(function(){
            if($('#select_app a').attr('value') != 0){
                $interval.cancel(timer);
                $scope.getAllData();
            }
        },100);
        $scope.TimeType=1;
        $scope.getAllData=function(){
            var d=utils.getTimeParam($scope.TimeType);
            var param={appid:utils.getCookie('market_app_id'),s_time:d[0],e_time:d[1]};
            // 查询app信息
            httpAJAX.post('getAppInfo',param,function(msg){
                var mj=new MxjAlert();
            	if(msg.retcode == 0){
                    $scope.total=msg;  
            	}else if(msg.retcode == -3){
            		mj.show('请求的app不存在！');
            	}
            });   
            // 查询app下载记录
            httpAJAX.post('getDownloadRecord',param,function(msg){
                if(msg.recordList.length == 0){
                    //无流量数据
                	$('#db_data').data('db_data',null);//清空缓存
                    var div=$('<div id="no-data-tips">没有数据</div>');
                    div.css({
                        'textAlign':'center',
                        'fontSize':'14px',
                        'position':'absolute',
                        'top':'170px',
                        'width':'100%',
                        'zIndex':'2'
                    });
                    $('#chart').html(div).css({
                        'width':'100%',
                        'position':'relative'
                    });
                    $('#table_data').css('paddingBottom','10px');
                    $('#data_body').html('<tr class="even"><td colspan="3">没有数据</td></tr>');
                    $(window).on('resize',function(){
                        $('#chart').html(div).css({
                            'width':'100%',
                            'position':'relative'
                        });
                    });
                }else{
                    $(window).off('resize');
                    $('#no-data-tips').remove();
                    $('#db_data').data('db_data',msg.recordList);
                    funs.drawLine();
                    renderiTable(1);
                }          
            });        
        };
        
        //产品选择之后
        utils.initAppListSelect(function(){
            $scope.getAllData();
        });
        //do it ..
        funs.init();
    });
    function renderiTable(page){
        var d = $('#db_data').data('db_data');
        var html = [];
        var len = 20;
        var i = (page-1) * len;
        for(i;(i<d.length && i<page*len);i++){
            var time=d[i].date;
            html.push('<tr class="'+(i%2==0?'even':'odd')+'"><td>'+(time)+'</td><td>'+$('#select_app a').text()+'</td><td>'+d[i].download+'</td></tr>');
        }
        $('#data_body').html(html.join(''));
        var p = new Paginated(page,d.length,len,function(_page){
            return " onclick='renderiTable("+_page+")' ";
        });
        $('.tb_page').html(p.html());
        p.turn(function(){
            var _page = p.getInputValue()==0?1:p.getInputValue();
            if(_page != '')
                renderiTable(_page);
        });
    }