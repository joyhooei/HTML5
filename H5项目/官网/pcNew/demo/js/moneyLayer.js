$(document).ready(function(){
	$(".select_no_msg").css('display','none');
	if (location.hash.split('#')[1] >= 3) {
		$('.alert_msg_red').css('visibility','visible');
		$('input').attr('disabled','disabled');
		$('.upload_img_card_small').removeAttr('id');
		$('.layui-layer-button a').css('opacity','0.5');
		$('#button_opacity').show();
	} else{
		$('.alert_msg_red').css('visibility','hidden');
		$('#button_opacity').hide();
	}
});
//选择是
function selectTrue(){
	$(".select_no_msg").css('display','none');
	$('#upload_img_card_layer').css('display','inline-block');
	$('.huikuan_demo_jpg').css('display','inline-block');
	$('#radio1').attr('checked','checked');
	$('#radio2').removeAttr('checked');
}
//选择否
function selectFalse(){
	$(".select_no_msg").css('display','inline-block');
	$('#upload_img_card_layer').css('display','none');
	$('.huikuan_demo_jpg').css('display','none');
	$('#radio2').attr('checked','checked');
	$('#radio1').removeAttr('checked');
	$('#alert2').css('display','none');
}



//上传图片
/*init webuploader*/  
   var $list=$(".uploader-list");   //这几个初始化全局的百度文档上没说明。  
   
	// 初始化Web Uploader
var uploader = WebUploader.create({
    // 选完文件后，是否自动上传。
    auto: false,
    //禁止压缩图片
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
});

// 当有文件添加进来的时候
uploader.on( 'fileQueued', function( file ) {
	//移除上一个file使其不在提交的时候上传
	var fileArr = uploader.getFiles();
	for (var i=0;i<fileArr.length-1;i++) {
		uploader.removeFile( fileArr[i] );
	}
	$list.html('');
	$('.upload_img_card_small').css('opacity',0);
	
	// webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于 uploader.onFileueued = function(file){...} ，类似js的事件定义。  
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $list为容器jQuery实例
    $list.append( $li );
	//缩略图高度和宽度 （单位是像素），当宽高度是0~1的时候，是按照百分比计算，具体可以看api文档  
	var thumbnailWidth = 285;   
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
uploader.on( 'uploadSuccess', function( file ) {
	
	var money = $('#huikuan_number').val();
    $.ajax({
	    type:'POST',
	    dataType:'json',
	    contentType:'application/json',
	    url:'./post_user_info',
	    data:JSON.stringify(param),
	    success:function(data){
	        if(data.retcode == 0){
	   		
	        }else{
	               
	        }
	    },
	    error:function(){
	       
	    }
	});
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


//提交按钮
$('.layui-layer-btn0').on('click', function() {  
//	layer.msg('正在上传，请耐心等候...', {
//	  icon: 18,
//	  shade: [0.3 , '#000' , true],
//	  time:0,
//	  zIndex:99910505,
//	  shadeClose:false,
//	});
//	return;
	
	var checkStatus = [false,false];
	if ($('#huikuan_number').val() > 0 && !isNaN($('#huikuan_number').val()) && $('#huikuan_number').val().substring(0,2) != '00') {
		if ($('#huikuan_number').val().indexOf('0') == 0 && $('#huikuan_number').val().indexOf('.') == -1) {
			checkStatus[0] = false;
			$('#alert1').text('请输入正确的汇款金额').css('display','inline-block');
			return;
		}
		if ($('#huikuan_number').val().indexOf('.') != -1) {
			if($('#huikuan_number').val().split('.')[1].length > 2){
				checkStatus[0] = false;
				$('#alert1').text('汇款金额最多两位小数').css('display','inline-block');
				return;
			}
		}
		checkStatus[0] = true;
		$('#alert1').text('请输入正确的汇款金额').css('display','none');
	}else{
		checkStatus[0] = false;
		$('#alert1').text('请输入正确的汇款金额').css('display','inline-block');
	}
	
	if ($("#radio1").attr('checked') == 'checked') {
		if ($('.uploader-list').html().length != 0) {
			checkStatus[1] = true;
		}
	}else{
		//请求后端提交数据
		checkStatus[1] = true;
	}
	
	if (checkStatus[0] == false) {
		$('#alert1').text('请输入正确的汇款金额').css('display','inline-block');
	}else{
		$('#alert1').text('请输入正确的汇款金额').css('display','none');
	}
	if (checkStatus[1] == false) {
		$('#alert2').css('display','inline-block');
	}else{
		$('#alert2').css('display','none');
	}
	if (checkStatus[0] && checkStatus[1]) {
		$('#alert1').css('display','none');
		$('#alert2').css('display','none');
		//上传
		uploader.upload();
		layer.msg('此Demo暂不支持该操作');
	}
	
});
//取消按钮
$('.layui-layer-btn1').on('click', function() {  
	
	//关闭moneyLayer
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.close(index);
});

