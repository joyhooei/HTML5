'use strict';
angular.module('mainApp')
    .controller('accountInfoCtr',function($scope,httpAJAX,$http,$interval){
        $('.product_select_box ').addClass('hide');
        utils.activeNavClass();
        
        $scope.payType=1;
        //事件处理
        $scope.changePayType=function(type){
            $scope.payType = type;
        };
        
        // 默认选中1000
        $scope.valType = 1000;
		$scope.choiceValType = function(val) {
			$scope.valType = val;
			if (val == 0) {
				$('.pay_btn').addClass('disabled');
			} else {
				$('.pay_btn').removeClass('disabled');
			}
		};
		
        // 选择其他金额时的逻辑
		$scope.price = '';
		$scope.choicePriceType = function(val) {
			$scope.valType = 0;
			$scope.price = val;
			if (val == '') {
				$('.pay_btn').addClass('disabled');
			} else {
				$('.pay_btn').removeClass('disabled');
			}
		};
        
        $scope.checkOtherVal=function(ele){
            var num=$(ele).val();
            if(num == '' || ! /^[1-9]*[1-9][0-9]*$/.test(num)){
                $('.pay_btn').addClass('disabled');
                $('.omb_error').removeClass('hide');
                $('.omb_error').css('color','#ff0000');
                $('.omb_tips').addClass('hide');
            }else if(num > 10000){
            	$('.pay_btn').addClass('disabled');
                $('.omb_tips').removeClass('hide');
                $('.omb_tips').css('color','#ff0000');
                $('.omb_error').addClass('hide');
            }else{
                $('.pay_btn').removeClass('disabled');
                $('.omb_tips').css('color','#999');
                $('.omb_error').addClass('hide');
            }
        };
        $scope.doPay=function(){
            if(! $('.pay_btn').hasClass('disabled')){
                var mj = new MxjAlert();
                var vaule=0;
                if($scope.valType == 0){
                    vaule=$('#price').val();
                }else{
                    vaule=$scope.valType;
                }
                var param={num:vaule};
                $('.loading_img').removeClass('hide');
                $http.post('pay',param).success(function(msg){
                    $('.loading_img').addClass('hide');
                    if(msg.retcode == 0){
                        var form_html=msg.form;
                        $('#form_data').html(form_html);
                    }else if(msg.retcode == 1){
                        mj.show('您的账户已超过充值限额');
                    }
                }).error(function(){
                        $('.loading_img').addClass('hide');
                        mj.show('支付发生错误');
                    });
            }
        };
        
        $scope.doWepay=function(){
            if(! $('.pay_btn').hasClass('disabled')){
                var mj = new MxjAlert();
                var vaule=0;
                if($scope.valType == 0){
                    vaule=$('#price').val();
                }else{
                    vaule=$scope.valType;
                }
                var param={appid:utils.getCookie('market_app_id'),num:vaule};
                $('.loading_img').removeClass('hide');
                $http.post('wepay',param).success(function(msg){
                    $('.loading_img').addClass('hide');
                    if(msg.retcode == 0){
                    	var url = './views/wepay.html?codeUrl='+msg.codeUrl+'&outTradeNo='+msg.outTradeNo+'&fee='+msg.fee;
                    	location.href = url;
                    }else if(msg.retcode == 1){
                        mj.show('您的账户已超过充值限额');
                    }
                }).error(function(){
                        $('.loading_img').addClass('hide');
                        mj.show('支付发生错误');
                    });
            }
        };
        
        //页面初始化加载
        var timer=$interval(function(){
                $interval.cancel(timer);
                $scope.getLendData();
        },100);
        
        // 获取后台数据
        $scope.getLendData=function(){
            // 账户余额
            httpAJAX.post('getUserLend',{appid:utils.getCookie('market_app_id')},function(msg){
               $scope.lend=msg.lend;
            });
            //充值记录
            httpAJAX.post('getLendRecord',{},function(msg){
                if(msg.recordList.length == 0){
                	$('#db_data1').data('db_data',null);//清空缓存
                    $('#data_body1').html('<tr class="even"><td colspan="4">没有数据</td></tr>');
                }else{
                    $('#db_data1').data('db_data',msg.recordList);
                    renderiTable1(1);
                }
            });
        }
    });

	// 绘制表格
	function renderiTable1(page){
	    var d = $('#db_data1').data('db_data');
	    var html = [];
	    var len = 20;
	    var i = (page-1) * len;
	    for(i;(i<d.length && i<page*len);i++){
	        var time=d[i].date;
	        html.push('<tr class="'+(i%2==0?'even':'odd')+'"><td>'+d[i].cTime+'</td><td>'+d[i].lendChange+'</td><td>'+d[i].lend+'</td><td>'+d[i].remark+'</td></tr>');
	    }
	    $('#data_body1').html(html.join(''));
	    var p = new Paginated(page,d.length,len,function(_page){
	        return " onclick='renderiTable1("+_page+")' ";
	    });
	    $('.tb_page').html(p.html());
	    p.turn(function(){
	        var _page = p.getInputValue()==0?1:p.getInputValue();
	        if(_page != '')
	            renderiTable1(_page);
	    });
	}