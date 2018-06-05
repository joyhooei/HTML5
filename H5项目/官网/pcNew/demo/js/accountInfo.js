


$(document).ready(function(){
	$('.customer_resetpsd').hide();
	//设置提示弹框的上下位置
	var winH = $(window).height()/2 - 250;
	$('.gxd_alert').css('margin-top',winH);
});

$(".company").hover(function(){
	$(".company ul").stop(true, false).slideToggle();
});
$(".ubk-person").hover(function(){
	$(".ubk_per_card").stop(true, false).slideToggle();
});

function toMoneyCenter(){
	window.location.href = "money.html";
	$(".data").removeClass("active_header");
	$('.money').addClass("active_header");
}
function toDataCenter(){
	window.location.href = "data.html";
	$(".money").removeClass("active_header");
	$('.data').addClass("active_header");
}

//点击基础资料
function toBaseData(){
	$('.customer_resetpsd').hide();
	$('.customer_message').show();
	$('.account_info_title').removeClass('active_title');
	$('#base_data').addClass('active_title');
}
//点击修改密码
function toResetPsd(){
	$('.customer_resetpsd').show();
	$('.customer_message').hide();
	$('.account_info_title').removeClass('active_title');
	$('#reset_psd').addClass('active_title');
}


   var $btn;   //开始上传图片按钮 

//提交数据
function clickToSubmitData(){

	layer.msg('此Demo暂不支持该操作');
}


//accountInfo2.js 校验是否重新输入时用,放在刷新完页面数据后
var oldAdd_2 = $('#selProvince').val() + $('#selCity').val() + $('#company_address').val();//旧地址
var oldName_2 = $('#customer_name').val();//旧名字
var oldPhone_2 = $('#customer_phone').val();//旧手机号
var oldAppName_2 = $('#product_name').val();//旧APP名称
var oldType_2 = $('#product_type').val();//旧APP名称

//审核通过后，重新修改信息提交事件
function clickToSubmitDataAgain(){
	var statusArray = [false,false,false,false];

	var customer_name = $('#customer_name').val();
	var customer_phone = $('#customer_phone').val();
	var product_name = $('#product_name').val();
	var product_type;
	var address = $('#selProvince').val() + $('#selCity').val() + $('#company_address').val();;
	
	if (customer_name.length == 0) {
		$('#customer_name').next().removeClass('error_msg_hide');
		statusArray[0] = false;
	}else{
		$('#customer_name').next().addClass('error_msg_hide');
		statusArray[0] = true;
	}
	
	if (customer_phone.length != 11) {
		$('#customer_phone').next().removeClass('error_msg_hide');
		statusArray[1] = false;
	}else{
		$('#customer_phone').next().addClass('error_msg_hide');
		statusArray[1] = true;
	}
	
	if (product_name.length == 0) {
		$('#product_name').next().removeClass('error_msg_hide');
		statusArray[2] = false;
	}else{
		$('#product_name').next().addClass('error_msg_hide');
		statusArray[2] = true;
	}
	
	//类别
	if ($('#product_type').val() == 0) {
		$('#product_type').next().removeClass('error_msg_hide');
		statusArray[3] = false;
	}else{
		$('#product_type').next().addClass('error_msg_hide');
		product_type = $('#product_type').val();
		statusArray[3] = true;
	}
	
	if (statusArray[0] && statusArray[1] && statusArray[2] && statusArray[3]) {
		//显示提示框
		$('.type-dialogBox').dialogBox({
			type: 'normal',
			title:"提示",
			width: 690,
			height: 310,
			hasMask: true,
			hasClose: true,
			hasBtn: true,
			content: '<img src="img/public/correct.png"/><span>公司信息和包名提交并审核通过后，后续只可以通过UBK工作人员修改。请再次确认。</span>',
			//点击确定后回调函数
			confirm: function(){
				
				$('.type-dialogBox2').dialogBox({
					type: 'normal',
					width: 690,
					title:"提示",
					height: 310,
					hasMask: true,
					hasClose: true,
					hasBtn: true,
					content: '<img src="img/public/correct.png"/><span></span>',
					//点击确定后回调函数
					confirm: function(){
						window.location.href = 'productData.html';
					},
				});
				
				$('.dialog-btn-cancel').css("display",'none');
				$('.dialog-box-content span').text('恭喜您提交成功，推广顾问已接收到您的信息！现在可以先准备推广资料了哦！');
				$('.dialog-btn-confirm').text("马上了解");
			},
		});
		
		$('.dialog-btn-confirm').text("确认提交");
		$('.dialog-box-content').css('width','100%');
	} else{

	}
	
	
}

//修改密码
function clickToResetPsd(){
	var old_psd = $('#old_psd').val();
	var new_psd1 = $('#new_psd1').val();
	var new_psd2 = $('#new_psd2').val();
	var psdStatus = [false,false,false];
	if (old_psd.length < 6) {
		if (old_psd.length == 0) {
			$('#old_psd').next().text('旧密码不能为空').css('display','inline-block');
		} else{
			$('#old_psd').next().text('请输入6-20位密码').css('display','inline-block');
		}
		psdStatus[0] = false;
	}else{
		$('#old_psd').next().hide();
		psdStatus[0] = true;
	}
	
	if (new_psd1.length < 6) {
		if (new_psd1.length == 0) {
			$('#new_psd1').next().text('新密码不能为空').css('display','inline-block');
		} else{
			$('#new_psd1').next().text('请输入6-20位密码').css('display','inline-block');
		}
		psdStatus[1] = false;
	}else{
		$('#new_psd1').next().hide();
		psdStatus[1] = true;
	}
	
	if (new_psd2.length < 6) {
		if (new_psd1.length == 0) {
			$('#new_psd2').next().text('新密码不能为空').css('display','inline-block');
		} else{
			$('#new_psd2').next().text('请输入6-20位密码').css('display','inline-block');
		}
		psdStatus[2] = false;
	}else{
		$('#new_psd2').next().hide();
		psdStatus[2] = true;
	}
	
	if (psdStatus[0] && psdStatus[1] && psdStatus[2]) {
		
		if(new_psd1 != new_psd2){
			$('#new_psd1').next().text('两次密码输入不一致').css('display','inline-block');
			$('#new_psd2').next().text('两次密码输入不一致').css('display','inline-block');
		}else{
			
			layer.msg('此Demo暂不支持该操作');
		}
	}
}

//填写包名的两种方式点击radio事件
function changeWays(way){
	if (way == 1) {
		$("#package_name1").removeAttr('disabled');
		$('#way1').attr('checked','checked');
		$("#package_name2").attr('disabled','disabled').val('').next().css('display','none');
		$('#way2').removeAttr('checked');
	} else{
		$("#package_name2").removeAttr('disabled').attr('checked','checked');
		$('#way1').removeAttr('checked');
		$("#package_name1").removeAttr('checked').attr('disabled','disabled').val('').next().css('display','none');
		$('#way2').attr('checked','checked');
	}
};

//鼠标移入问号时tips小提示框交互
$('#icon_question1').mouseenter(function(){
	layer.tips('询问安卓开发同事，“我们产品包名是什么？”，得出一个类似“com.abc.efg”的包名，填入即可。', '#icon_question1', {tips: [2, '#FFF'],time:222220});
	$('.layui-layer-content').css({'color':"#2f7ff0","width":"500px","height":"52px","box-shadow": "0px 3px 25px rgba(0,0,0,0.2)","text-align": "left"});
}).mouseleave(function(){layer.close(layer.index)});

$('#icon_question2').mouseenter(function(){
	layer.tips('在PC端应用宝（http://sj.qq.com/myapp/）搜索产品名字，在搜索结果中点击进入对应产品的详情页，此时复制浏览器的页面链接，填入即可。\n例如：http://sj.qq.com/myapp/detail.htm?apkName=com.tencent.android.qqdownloader', '#icon_question2', {tips: [2, '#FFF'],time:222220});
	$('.layui-layer-content').css({'color':"#2f7ff0","width":"500px","height":"95px","box-shadow": "0px 3px 25px rgba(0,0,0,0.2)","text-align": "left"});
}).mouseleave(function(){layer.close(layer.index)});


//上传图片
/*init webuploader*/  
   var $list=$(".uploader-list");   //这个初始化全局的百度文档上没说明。  
   
	// 初始化Web Uploader
var uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: false,
    compress:false,
    // swf文件路径
    swf:'js/Uploader.swf',
    // 文件接收服务端。
    server: 'http://webuploader.duapp.com/server/fileupload.php',
    // 选择文件的按钮。可选。
    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
    pick: '#imgPicker',
    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'gif,jpg,jpeg,bmp,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});

// 当有文件添加进来的时候
uploader.on( 'fileQueued', function( file ) {
	//移除上一个file使其不在提交的时候上传
	var fileArr = uploader.getFiles();
	for (var i=0;i<fileArr.length-1;i++) {
		uploader.removeFile( fileArr[i] );
	}
	$list.html('');
	$('.company_card_small').css('opacity',0);
	
	// webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于 uploader.onFileueued = function(file){...} ，类似js的事件定义。  
    var $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' +'<img></div>'
            ),
        $img = $li.find('img');

    // $list为容器jQuery实例
    $list.append( $li );
	//缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档  
	var thumbnailWidth = 350;   
   	var thumbnailHeight = 130;
	
    // 创建缩略图
    // 如果为非图片文件，可以不用调用此方法。
    // thumbnailWidth x thumbnailHeight 为 100 x 100
    uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }

        $img.attr( 'src', src );
    }, thumbnailWidth, thumbnailHeight );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
uploader.on( 'uploadSuccess', function( file ,response) {
	//file {File}File对象
	//response {Object}服务端返回的数据
});

// 文件上传失败，显示上传出错。
uploader.on( 'uploadError', function( file ) {
    var $li = $( '#'+file.id ),
        $error = $li.find('div.error');

    // 避免重复创建
    if ( !$error.length ) {
        $error = $('<div class="error"></div>').appendTo( $li );
    }

//  $error.text('上传失败');
});

// 完成上传完了，成功或者失败，先删除进度条。
uploader.on( 'uploadComplete', function( file ) {
    $( '#'+file.id ).find('.progress').remove();
});


//输入应用宝链接，下方直接显示包名
function showPackageName(value){
	$('#package_name2').val(value.replace(/[^\w\.\:\?\=\&\/]/g, ''));
	if(value.indexOf('?apkName=') == -1){
		$('#package_name2').next().next().addClass('visibility');
	}else{
		$('#package_name2').next().next().text("包名为：" + value.split('apkName=')[1]).removeClass('visibility');
	}
}
