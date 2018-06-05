// anfeng.uc
// @xiaoFei(daipengfei@qq.com)

var afuc_alert;

(function () {
    4
    $(":input[name='mobile']").keyup(function(){
        mobile_length = $(this).val().length;
        if(mobile_length == 11){
            if (!AFUC.is_mobile($(this).val())) {
                $(this).focus();
                alert('手机号格式错误');
                return;
            }

        }
    });

    var AFUC = window.AFUC = window.AFUC || {};
	
	(function () {

        AFUC.is_mobile = function (value) {
            var partten = /^1[3,5,8,7,5]\d{9}$/;
            return partten.test(value);
        };
		
		AFUC.init = function (){
			
			AFUC.is_login();			
		};
		
		AFUC.is_login = function() {	
			
			$('#afuc_login .login_close,#afuc_mask').click(function(){
				AFUC.login_close();
			});
			
			$('#afuc_reg .reg_close,#afuc_mask').click(function(){
				AFUC.reg_close();
			});	
		};
		
		AFUC.login_out = function() {
			
			$.ajax({
			   type: 'POST',
			  async: false,
		  dataType : 'json',
				url: '/ajax/users/login_out',
			   data: '',
			success: function (request) {
						location.reload();							
					},
			  cache: false
			});	
		};
		
		AFUC.login = function(form_id) {
						
			AFUC.reg_close();
			
			if (!form_id) {
				form_id = 'afuc_login_form';	
			}

			$('#'+ form_id)[0].reset();
			
			if (form_id == 'afuc_login_form') {								
				$('#afuc_mask').fadeIn(500);
				$('#afuc_login').fadeIn(500);
			}
			
			$('#'+ form_id +' #sub').val('登录').attr('disabled',false);
			
			$('#'+ form_id).unbind('submit').bind('submit', function(event){
				
				event.preventDefault();
				
				var username = $('#'+ form_id +' #username').val();
				if (username=='') {
					alert('手机/邮箱/用户名不能为空！');
					$('#'+ form_id +' #username').focus();
					return false;	
				}
				
				var password = $('#'+ form_id +' #password').val();
				if (password=='') {
					alert('密码不能为空！');
					$('#'+ form_id +' #password').focus();
					return false;	
				}	
			
				$.ajax({
				   type: 'POST',
				  async: true,
			  dataType : 'json',
					url: '/ajax/users/login',
				   data: $('#'+ form_id +'').serialize(),
			 beforeSend: function(){
				 			$('#'+ form_id +' #sub').val('登录中').attr('disabled',true);
				 		},
				success: function (request) {
							console.log(request);
							switch (parseInt(request.status)) {
								case 1:
									
									var reurl = $('#'+ form_id).data('reurl');
									if (reurl) {
										location.href = reurl;
									} else {										
										location.reload();
									}
	
									break;
	
								default:	
									alert(request.info);
									$('#'+ form_id +' #sub').val('登录').attr('disabled',false);	
									break;	
							}
	
							return false;
						},
				  error: function () {
					  		alert('服务器故障，稍后再试')
							$('#'+ form_id +' #sub').val('登录').attr('disabled',false);
						},
				  cache: false
				});
				
				return false;
			});
			
		};
		
		AFUC.login_close = function() {
			
			$('#afuc_mask').hide();
			$('#afuc_login').hide();
			
		};
		
		AFUC.reg = function(form_id) {
			
			AFUC.login_close();
			
			if (!form_id) {
				form_id = 'afuc_reg_form';	
			}
			
			$('#'+ form_id)[0].reset();
			
			if (form_id=='afuc_reg_form') {
				$('#afuc_mask').fadeIn(500);
				$('#afuc_reg').fadeIn(500);	
			}
			
			$('#'+ form_id +' #sub').val('注册').attr('disabled',false);
			
			$('#'+ form_id).unbind('submit').bind('submit', function(event){
				
				event.preventDefault();
				
				var username = $('#'+ form_id +' #username').val();
				if (username=='') {
					alert('手机/邮箱/用户名不能为空！');
					$('#'+ form_id +' #username').focus();
					return false;	
				}
				
				var password = $('#'+ form_id +' #password').val();
				if (password=='') {
					alert('密码不能为空！');
					$('#'+ form_id +' #password').focus();
					return false;	
				}	
				var verifycode = $('#'+ form_id +' #verifycode').val();
				if (verifycode=='') {
					alert('验证码密码不能为空！');
					$('#'+ form_id +' #verifycode').focus();
					return false;	
				}
				if (!$('#'+ form_id +' #reg_is_ok').attr('checked')) {
					alert('还没有同意注册协议呢！');
					return false;	
				}
				
				$.ajax({
				   type: 'POST',
				  async: true,
			  dataType : 'json',
					url: '/ajax/users/reg',
				   data: $('#'+ form_id +'').serialize(),
			 beforeSend: function(){
				 			$('#'+ form_id +' #sub').val('注册中').attr('disabled',true);
				 		},
				success: function (request) {
                    console.log(request)
							switch (parseInt(request.status)) {
								case 1:
									
									var reurl = $('#'+ form_id).data('reurl');
									if (reurl) {
										location.href = reurl;
									} else {										
										location.reload();
									}
	
									break;
	
								default:	
									alert(request.info);
									$('#'+ form_id +' #sub').val('注册').attr('disabled',false);	
									break;	
							}
						},
				  error: function () {
					  		alert('服务器故障，稍后再试')
							$('#'+ form_id +' #sub').val('注册').attr('disabled',false);
						},
				  cache: false
				});
				
				return false;
			});
		};
		
		AFUC.reg_close = function() {
			
			$('#afuc_mask').hide();
			$('#afuc_reg').hide();			
		};
		
		AFUC.get_game_gift = function(gift_id, gift_name) {
			
			if (!gift_id) {
				alert('礼包不存在'); return;	
			}
			
			$.ajax({
				   type: 'POST',
				  async: true,
			  dataType : 'json',
					url: '/ajax/users/get_game_gift',
				   data: {gift_id:gift_id},
			 beforeSend: function(){
				 			
				 		},
				success: function (request) {
							switch (parseInt(request.status)) {
								case 1:

                                    var h = '<div class="wx_gift_ok">';
                                    h +=  '<div class="mask_layer"></div>';
                                    h +=  '<div class="box">';
                                    h +=  '<div class="close">×</div>';
                                    h +=  ' <div class="cons">';

                                    if (request.info == 'ok') {


                                        h +=  ' <h5>您领取的【'+ gift_name +'】礼包码为：</h5>';
                                        h +=  ' <div><p>'+request.data+'</p><div class="btns" id="copy_code" data-url="'+request.data+'">复制</div></div>';
                                        h +=  ' <span>礼包领取成功 (:</span>';

                                    } else {

                                        h +=  ' <h5>您领取的【'+ gift_name +'】礼包码为：</h5>';
                                        h +=  ' <div><p>'+request.data+'</p><div class="btns" id="copy_code" data-url="'+request.data+'">复制</div></div>';
                                        h +=  ' <span>当前礼包您已经领取过了 (:</span>';
                                    }

                                    h +=  ' </div>';
                                    h +=  ' </div>';
                                    h +=  '</div>';

                                    $('body').append(h);

                                    $('.mask_layer').css({ opacity: 0.8 });

                                    $('.wx_gift_ok').find('.close').bind('click', function(){
                                        $('.wx_gift_ok').remove();
                                    });

                                    $("#copy_code").zclip({
                                        path: "../../lib/jquery.zclip/ZeroClipboard.swf"/*tpa=http://www.yongyizr.com/res/lib/jquery.zclip/ZeroClipboard.swf*/,
                                        copy: function(){
                                            return $(this).data('url');
                                        },
                                        beforeCopy:function(){
                                            $(this).css("color","orange");
                                        },
                                        afterCopy:function(){
                                            $(this).text('已经复制');
                                        }
                                    });
	
									break;
	
								default:	
									
									if (request.info == 'no_login') {
										AFUC.login();
										return;
									} else {
										alert(request.info);
									}
									break;	
							}
						},
				  error: function () {
					  		alert('服务器故障，稍后再试')
						},
				  cache: false
			});			
		}; 

		AFUC.uc_content_avatar = function () {
            var $pick = $('#uc-avatar-bnt'),uploader;

            uploader = WebUploader.create({
                auto: true,
                pick: {
                    id: $pick,
                    innerHTML: '<div class="btnok">点击选择截图</div>',
                    multiple: false
                },
                formData: {
                    'type' :'avatar'
                },
                swf: '../../lib/webuploader/Uploader.swf'/*tpa=http://www.yongyizr.com/res/lib/webuploader/Uploader.swf*/,
                chunked: false,
                chunkSize: 512 * 1024,
                server: '/service/upload_avatar',
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                compress : {
                    width: 1024,
                    height: 1024,
                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 90,
                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: false,
                    // 是否允许裁剪。
                    crop: true,
                    // 是否保留头部meta信息。
                    preserveHeaders: true,
                    // 如果发现压缩后文件大小比原来还大，则使用原来图片
                    // 此属性可能会影响图片自动纠正功能
                    noCompressIfLarger: false,
                    // 单位字节，如果图片大小小于此值，不会采用压缩。
                    compressSize: 2 * 1024 * 1024
                },
                disableGlobalDnd: true,
                fileNumLimit: 1, // 最多文件个数
                fileSizeLimit: 2 * 1024 * 1024,    // 2 M
                fileSingleSizeLimit: 2 * 1024 * 1024    // 2 M
            });

            // 文件上传成功
            uploader.on( 'uploadSuccess', function( file, ret) {

                if (ret.state == 'SUCCESS') {

                    alert('上传成功');
					$('#thumb').val(ret.url);
                    $('#users-avatar-src').attr('src',ret.url+'?'+Math.random());
					uploader.removeFile( file );
                } else {
                   alert(ret.state);
                }
            });
        };

        //获得跳转url参数
        AFUC.get_url_param = function(vhref, name) {
            // 如果链接没有参数，或者链接中不存在我们要获取的参数，直接返回空
            if (vhref.indexOf("?") == -1 || vhref.indexOf(name + '=') == -1) {
                return '';
            }
            // 获取链接中参数部分
            var queryString = vhref.substring(vhref.indexOf("?") + 1);
            // 分离参数对 ?key=value&key2=value2
            var parameters = queryString.split("&");
            var pos, paraName, paraValue;
            for (var i = 0; i < parameters.length; i++) {
                // 获取等号位置
                pos = parameters[i].indexOf('=');
                if (pos == -1) {
                    continue;
                }
                // 获取name 和 value
                paraName = parameters[i].substring(0, pos);
                paraValue = parameters[i].substring(pos + 1);

                if (paraName == name) {
//                    return unescape(paraValue.replace(/\+/g, " "));
                    return paraValue;
                }
            }
            return '';
        }

        AFUC.alert = function(msg, complete){

            complete = complete?complete:function(){};

            AFUC.dialog({
                msg:msg,
                timeout:3000,
                close:function(){ },
                complete:function(){ complete(); }
            });
        };

        AFUC.dialog = function (ox){

            if (afuc_alert) {
                clearTimeout(afuc_alert);
                $("#af-dialog").remove();
            }

            var options={
                msg:'数据加载中,请稍后...',
                timeout:3000,
                close:function(){ },
                complete:function(){ }
            };

            ox=ox||{};
            $.extend(options,ox);

            $("#hc-dialog").remove();

            var html=$('<div id="af-dialog" class="af-dialog"><div class="af-dialog-ui"><div class="af-dialog-ui-tip" id="af-dialog-ui-tip"><span id="af-dialog-msg">'+options.msg+'</span></div></div></div>');

            $("body").append(html);

            var obj = $('#af-dialog');

            obj.css('marginTop',-obj.height()/2);
            obj.css('marginLeft',-obj.width()/2);
            obj.fadeIn(200);

            $(document).on('tap',function(){

                $("#hc-dialog").remove();
                options.close();
            });

            setTimeout(
                options.complete, 1000);

            if (options.timeout) {
                afuc_alert = setTimeout(function(){ $("#af-dialog").remove(); }, options.timeout);
            }
        };

        //找回密码
        AFUC.uc_forgotten_password = function(){
            AFUC.form_input_tools();

            $('#mobile').blur(function() {

                var mob = $('#mobile').val().trim();

                if (mob=='') {

                    $('#mob_msg').html('手机号不能为空');
                    $('#mob_msg').show();
                    return;
                }

                if (!AFUC.is_mobile(mob)) {

                    $('#mob_msg').html('手机号格式错误');
                    $('#mob_msg').show();
                    return;
                }
                $('#mob_msg').hide();
            });

            $('$code').blur(function() {
                var code = $('#code').val();

                if (code == "") {
                    $('#code_msg').html('图形验证码不能为空');
                    $('#code_msg').show();
                    return;
                }
                $('#code_msg').hide();
            });

            $('#repassword').blur(function() {

                var password = $('#password').val();
                var repassword = $('#repassword').val();

                if (password !== repassword) {

                    $('#pw_msg').html('两次输入的密码不一致');
                    $('#pw_msg').show();
                    return;
                }
                $('#pw_msg').hide();
            });

            //发送手机验证码
            $('#send_code_btn').click(function(){

                var mob = $('#mobile').val().trim();

                if (mob=='') {
                    $('#mobile').focus();
                    alert('手机号不能为空');
                    return;
                }

                if (!AFUC.is_mobile(mob)) {

                    $('#mobile').focus();
                    alert('手机号格式错误');
                    return;
                }

                AFUC.send_mobile_sms('uc_forgotten_password', $('#mobile'), $(this), $('#send_code_msg'));
            });

            $('#uc_forgotten_password_bnt').click(function () {

                var mob = $('#mobile').val().trim();

                if (mob=='') {

                    $('#mobile').focus();
                    alert('手机号不能为空');
                    return;
                }

                if (!AFUC.is_mobile(mob)) {

                    $('#mobile').focus();
                    alert('手机号格式错误');
                    return;
                }

                var vcode = $('#mobi_code').val().trim();

                if (vcode=='') {

                    $('#mobi_code').focus();
                    alert('验证码不能为空');
                    return;
                }

                var password = $('#password').val();
                var repassword = $('#repassword').val();

                if (password !== repassword) {
                    $('#repassword').focus();
                    alert('两次输入的密码不一致');
                    return;
                }

                var code = $('#code').val();

                if (code == "") {
                    alert('图形验证码不能为空');
                    return;
                }

                $.ajax({
                    type: 'POST',
                    async: true,
                    dataType : 'json',
                    url: '/ajax/users/forgotten',
                    data: $('#uc_forgotten_form').serialize(),
                    beforeSend: function(){
                        $('#uc_forgotten_password_bnt').val('提交中').attr('disabled',true);
                    },
                    success: function (request) {
                        switch (parseInt(request.status)) {
                            case 1:
                                var reurl = $('#uc_forgotten_form').data('reurl');

                                alert('修改成功', function (){

                                    if (reurl) {
                                        location.href = reurl;
                                    } else {
                                        location.href = 'http://www.yongyizr.com/me';
                                    }
                                });

                                break;

                            default:
                                alert(request.info);
                                $('#uc_forgotten_password_bnt').val('修改').attr('disabled',false);
                                break;
                        }
                    },
                    error: function () {

                        alert('服务器故障，稍后再试');

                        $('#uc_forgotten_password_bnt').val('修改').attr('disabled',false);
                    },
                    cache: false
                });
            });

        }

        AFUC.form_input_tools = function () {

            $('.clear').click(function(){
                $(this).parent().find('input').val('');
            });

            $('.dispassword').click(function(){

                if ($(this).hasClass('password—bnt')) {
                    $(this).removeClass('password—bnt').text('显示');
                    $(this).parent().find('input').attr('type','password');
                } else {
                    $(this).addClass('password—bnt').text('隐藏');
                    $(this).parent().find('input').attr('type','text');
                }
            });
        };

        //发送手机验证码
        AFUC.send_mobile_sms = function (type, mobile_obj, mobile_btn_obj, mobile_msg_obj) {

            $(mobile_obj).attr('disabled',true);
            $(mobile_btn_obj).hide();
            $(mobile_msg_obj).html('<font id="send_code_num">60</font>秒后可重发验证码').show();

            $.ajax({
                type: 'POST',
                async: true,
                dataType : 'json',
                url: '/ajax_users/send_mobile_sms',
                data: 'submit=submit&mobile='+$(mobile_obj).val()+'&type='+type,
                success: function (request) {
                        console.log(request);alert(request);alert(111);
                    switch(parseInt(request.status)) {
                        case 1:
                            //$('#mobi_code').val(request.info); // 测试

                            var resend_num = 60;

                            var resend_num_timer = setInterval(function(){

                                if(resend_num==0) {

                                    $(mobile_msg_obj).html('').hide();

                                    $(mobile_btn_obj).show();

                                    clearInterval(resend_num_timer);
                                    return false;
                                }

                                resend_num--;

                                $('#send_code_num').text(resend_num);

                            },1000);

                            $(mobile_obj).attr('disabled',false);

                            break;
                        default:

                            alert(request.info);
                            $(mobile_msg_obj).html('').hide();
                            $(mobile_obj).attr('disabled',false);
                            $(mobile_btn_obj).show();
                            break;
                    }
                },
                error: function () {
                    console.log('短信发送失败，请稍后再试');
                    $(mobile_msg_obj).html('').hide();
                    $(mobile_obj).attr('disabled',false);
                    $(mobile_btn_obj).show();
                },
                cache: false
            });
        };

        //绑定手机
        AFUC.bind_mobile = function () {

            $('#mobile').blur(function() {
                var mob = $('#mobile').val();
                if (mob=='') {

                    $('#mob_msg').html('手机号不能为空');
                    $('#mob_msg').show();
                    return;
                }

                if (!AFUC.is_mobile(mob)) {

                    $('#mob_msg').html('手机号格式错误');
                    $('#mob_msg').show();
                    return;
                }
                $('#mob_msg').hide();
            });

            $('#verifycode').blur(function() {
                var code = $('#verifycode').val();

                if (code == "") {
                    $('#code_msg').html("图形验证码不能为空");
                    $('#code_msg').show();
                    return;
                }
                $('#code_msg').hide();
            });

            $('#mob_code').blur(function() {
                var code = $('#mob_code').val();

                if (code == "") {
                    $('#send_code_msg').html("手机验证码不能为空");
                    $('#send_code_msg').show();
                    return;
                }
                $('#send_code_msg').hide();
            });

            $('#bind_mobile_btn').click(function() {

                var mob = $('#mobile').val();
                if (mob=='') {
                    alert('手机号不能为空');
                    return;
                }
                if (!AFUC.is_mobile(mob)) {

                    alert('手机号格式错误');
                    return;
                }

                var code = $('#verifycode').val();

                if (code == "") {
                    alert("图形验证码不能为空");
                    return;
                }

                var code = $('#mob_code').val();

                if (code == "") {
                    alert("手机验证码不能为空");
                    return;
                }

                $.ajax({
                    type: 'POST',
                    async: true,
                    dataType : 'json',
                    url: '/ajax/users/bind_mobile',
                    data: $('#af_bind_mobile_form').serialize(),
                    beforeSend: function(){
                        $('#bind_mobile_btn').val('提交中').attr('disabled',true);
                    },
                    success: function (request) {
                        switch (parseInt(request.status)) {
                            case 1:
                                var reurl = $('#uc_forgotten_form').data('reurl');

                                alert(request.info);

                                alert('修改成功', function (){

                                    if (reurl) {
                                        location.href = reurl;
                                    } else {
                                        location.href = 'http://www.yongyizr.com/me';
                                    }
                                });

                                break;

                            default:
                                alert(request.info);
                                $('#bind_mobile_btn').val('提交').attr('disabled',false);
                                break;
                        }
                    },
                    error: function () {

                        alert('服务器故障，稍后再试');

                        $('#bind_mobile_btn').val('提交').attr('disabled',false);
                    },
                    cache: false
                });
            });
        }

	})();
	
})();

window.onload = function (){
	AFUC.init();	
}