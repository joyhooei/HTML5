/**
 * 完善用户资料弹窗组件
 *
 * 使用方法见这个目录下的index.html文件
 * @author zhoushen
 * @since 2016/11/30
 */
;(function($, window){

	WanshanWidget = function(option){
		/**
		 * version history
		 * 1.0 
		 * 2.0 增加取消按钮回调
		 * 2.1 增加完善成功回调
		 */
		this.version = 2.1;
		this.option = option;
		this.wanshan_wrap  = $(option.wanshanWrapId);
		this.sendMobileApi = 'http://i.7724.com/rest/api/sendmobilecode';
		//FIXME:更改成新接口
		this.wanshanApi    = '/usercrazy/improve';
		//按钮点击状态 true可以点击
		this.commitBtnStatus = true; 
	}

	WanshanWidget.prototype.init = function(){
		//TODO:模板是通过script方式引入， 可以改成用打包把模板文件打包成变量放进来
		var html = $("#finish_user_guide_template").html();

		var wanthis = this;

		//节点初始化
		this.wanshan_wrap.html(html);
		//完善资料引导初始化
		if(this.option.guideTipText){
			this.wanshan_wrap.find(".tip_msg").text(this.option.guideTipText);
		}
		if(this.option.guideCancleBtnText){
			this.wanshan_wrap.find(".returngame_btn").text(this.option.guideCancleBtnText);
		}
		this.wanshan_wrap.find(".returngame_btn").click(function(){
			//取消按钮回调
			if(wanthis.option.guideCancleBtnCall){
				wanthis.option.guideCancleBtnCall();
				return true;
			}
			wanthis.returnGame();
		});
		this.wanshan_wrap.find('.quit').click(function(){
			wanthis.returnGame();
		});
		this.wanshan_wrap.find(".go_wanshan_btn").click(function(){
			//初始化完善资料弹窗
			var html = $("#finish_user_info_template").html();
			//节点初始化
			wanthis.wanshan_wrap.html(html); 
			//debugger;
			//事件绑定
			wanthis.wanshan_wrap.find('input').focus(function(){
				wanthis.hidetip();
			})
			wanthis.wanshan_wrap.find(".returngame_btn").click(function(){

				if(wanthis.option.wanshanCancleBtnCall){
					wanthis.option.wanshanCancleBtnCall();
				}else{
					wanthis.returnGame();
				}
			});
			wanthis.wanshan_wrap.find(".quit").click(function(){
				wanthis.returnGame();
			});
			wanthis.wanshan_wrap.find(".commit_btn").click(function(){
				wanthis.commit();
			})
			wanthis.wanshan_wrap.find(".sendmobilecode_btn").click(function(){
				wanthis.sendMobileCode();
			})
		});
	}
	WanshanWidget.prototype.checkMoble = function(mobile){
		if(! /1\d{10}$/.test(mobile)){
			this.showtip('请输入正确的手机号码');
			throw new Error('请输入正确的手机号码');
		}
	}
	WanshanWidget.prototype.checkYzm = function(code){
		if(! code){
			this.showtip('图片验证码不能留空');
			throw new Error('图片验证码不能留空');
		}
	}
	WanshanWidget.prototype.checkCode = function(code){
		if(! code){
			this.showtip('手机验证码不能留空');
			throw new Error('手机验证码不能留空');
		}
	}
	WanshanWidget.prototype.checkPwd = function(pwd){
		if(pwd.length < 6){
			this.showtip('密码不能小于6位');
			throw new Error('密码不能小于6位');
		}
	}
	WanshanWidget.prototype.showtip = function(msg) {
		this.wanshan_wrap.find('.tishi').show();
		this.wanshan_wrap.find('.tishi span').text(msg);
	};
	WanshanWidget.prototype.hidetip = function() {
		this.wanshan_wrap.find('.tishi').hide();
	};
	//返回游戏
	WanshanWidget.prototype.returnGame = function() {
		this.wanshan_wrap.html('');
	};
	//完善提交
	WanshanWidget.prototype.commit = function() { 
		var mobile  = this.wanshan_wrap.find('.mobile_field').val();
		var code    = this.wanshan_wrap.find('.code_field').val();
		var pwd     = this.wanshan_wrap.find('.pwd_field').val();
        
        var username = this.wanshan_wrap.find('.username_field').val();
        var username_sign = this.wanshan_wrap.find('.username_sign_field').val();
        
		this.checkMoble(mobile);
		this.checkCode(code);
		this.checkPwd(pwd);

		var data = {
			'mobile' : mobile,
			'code' : code,
			'pwd' : pwd,
			'responType' : 'json',
            'username' : username,
            'username_sign' : username_sign
		};

		var wanthis = this;

		$.ajax(  
            {  
                type:'post',  
                url : wanthis.wanshanApi,  
                data: data,
                dataType : 'json',  
                // crossDomain:true,
                beforeSend : function(){
                	if(wanthis.commitBtnStatus === false){
                		return false;
                	}
                	//按钮禁点
					wanthis.commitBtnClose();
                },
                success : function(respon) {
                	if(respon.code < 1){
                		wanthis.showtip(respon.msg);
                		return false;
                	}
                	wanthis.returnGame();
                	//完善资料成功回调
                	if(wanthis.option.commitSuccCall){
                		wanthis.option.commitSuccCall(respon);
                	}
                	alert(respon.msg);
                },  
                error : function(respon) {  
                    alert('接口请求错误');
                },
                complete : function(respon) {  
                	wanthis.commitBtnOpen();
                }   
            }  
        );   

	};
	//禁止点击完善按钮
	WanshanWidget.prototype.commitBtnClose = function()
	{	//debugger;
		this.wanshan_wrap.find(".commit_btn").text('处理中..').css('background', 'gray');
		this.commitBtnStatus = false;
	}
	//开放点击完善按钮
	WanshanWidget.prototype.commitBtnOpen = function()
	{
		this.wanshan_wrap.find(".commit_btn").text('完善提交').css('background', '');
		this.commitBtnStatus = true;
	}
	//发送短信验证码
	WanshanWidget.prototype.sendMobileCode = function() {

		var mobile  = this.wanshan_wrap.find('.mobile_field').val();
		var imgcode = this.wanshan_wrap.find('.imgcode_field').val();

		this.checkMoble(mobile);
		// 去掉图片验证码的验证
		 this.checkYzm(imgcode);

		var data = {
			'mobile' : mobile,
			'imgcode' : imgcode,
			'responType' : 'jsonp',
		};

		var wanthis = this;

		$.ajax(  
            {  
                type:'get',  
                url : wanthis.sendMobileApi,  
                data: data,
                dataType : 'jsonp',  
                jsonp:"jsoncallback",  
                // crossDomain:true,
                success : function(respon) { 
                	//wanthis.wanshan_wrap.find('.imgcode_field').val('');
            		wanthis.showtip(respon.msg);
                },  
                error : function(respon) {  
                    alert('接口请求错误');
                }  
            }  
        );   
	};

	//return
	window.WanshanWidget = WanshanWidget;

})(jQuery, window);