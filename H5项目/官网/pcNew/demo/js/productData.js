//头
$(".company").hover(function(){
	$(".company ul").stop(true, false).slideToggle();
});
$(".ubk-person").hover(function(){
	$(".ubk_per_card").stop(true, false).slideToggle();
});

function toMoneyCenter(){
	window.location.href = "money.html";
	$(".data").removeClass("active");
	$('.money').addClass("active");
}
function toDataCenter(){
	window.location.href = "data.html";
	$(".money").removeClass("active");
	$('.data').addClass("active");
}

//应用市场资料右边问号的提示文案
$('.market_question').mouseenter(function(){
	layer.tips('根据产品类型提交对应资质，UBK帮您对接各个应用市场进行审核。提交资质前，请先保证产品已在对应应用市场上架', '.market_question', {tips: [4, '#FFF'],time:222220});
	$('.layui-layer-content').css({'color':"#777","width":"420px","height":"90px","lineHeight":"25px","box-shadow": "0px 3px 25px rgba(0,0,0,0.2)","text-align": "left","top":"-10px","right":"210px","padding-top":"21px"});
}).mouseleave(function(){layer.close(layer.index)});
//});


function openOrCloseMarketBox(stasus_id,data_id,btn_id,box_id,boxH){
	if ($("#"+stasus_id).hasClass('hide')) {
		//折叠---显示资料状态，隐藏提交数据box
		$('#'+stasus_id).removeClass('hide');
		$('#'+data_id).addClass('hide');
		$('#'+box_id).css('height','197px');
		$('#'+btn_id).css('top','67px');
		$('#'+btn_id).children('span').text('查看详情');
		$('#'+btn_id).children('img').attr('src','img/market/icon_down.png')
	} else{
		//展开---显示提交数据box，隐藏资料状态
		$('#'+data_id).removeClass('hide');
		$('#'+stasus_id).addClass('hide');
		$('#'+box_id).css('height',boxH);
		switch (btn_id){
			case 'xiaomi_detail_btn':$('#'+btn_id).css('top','-17px');break;
			case 'oppo_detail_btn':$('#'+btn_id).css('top','-17px');break;
			case 'vivo_detail_btn':$('#'+btn_id).css('top','-17px');break;
			case 'meizu_detail_btn':$('#'+btn_id).css('top','-17px');break;
		}
		$('#'+btn_id).children('span').text('收起详情');
		$('#'+btn_id).children('img').attr('src','img/market/icon_up.png');
	}
}

//封装显示提示框函数
/*
 classSelect：div的class
 msg：提示信息
 confirmFun：点击确认执行的函数
 cancelFun：点击取消执行的函数
 * */
function showDialogBox(classSelect,msg,confirmFun,cancelFun){
	//显示提示框
	$(classSelect).dialogBox({
		type: 'normal',
		title:"提示",
		width: 690,
		height: 310,
		hasMask: true,
		hasClose: true,
		hasBtn: true,
		content: '<img src="img/public/correct.png"/><span>'+msg+'</span>',
		//点击确定后回调函数
		confirm: confirmFun,
		cancel:cancelFun,
	});
	$('.dialog-btn-confirm').text("确认提交");
	$('.dialog-box-content').css('width','100%');
}

var baseGdtJson,baseOppoJson,baseVivoJson,baseXiaomiJson,baseInfoJson;

/*请求后台数据及渲染数据---------------------开始-----------------------------------*/
$(function() {
	//渲染content的高度
	var wrapperH = $(document).height() - 180;
	$('.wrapper1200').css('min-height',wrapperH);
	
	var JSONObject = {
	    "success": 1,
	    "msg": null,
	    "appInfo": {
	        "id": 0,
	        "devUserId": 3,
	        "appName": "Demo",
	        "status": "投放中",
	        "category": "社交",
	        "createDate": 1501227692000,
	        "originalFileName": 'appubk.apk',
	        "fileName": "appubk.apk",
	        "pkgName": "com.appubk",
	        "pkgSize": "19.06MB",
	        "appVer": "2.2.1",
        		"reviewStatus": 2
	    },
	    "appGdt": {
	        "id": 40,
	        "devUserId": 9,
	        "gdtId": "20151118",
	        "gdtIdStatus": 1,
	        "gdtIdContent": null,
	        "ipcUrl": "img/demo/ICP.png",
	        "ipcUrlStatus": 1,
	        "ipcUrlContent": null,
	        "gdtPkgUrl": "http://ad.feelwx.com/cpd/cpdFiles/9/channel/gdt/apk/2017082119572574700000324.apk",
	        "gdtPkgStatus": 1,
	        "gdtPkgContent": null,
	        "reviewStatus": 1,
	        "createDate": 1503316645000,
	        "updateDate": 1503316645000
	    },
	    "appMeizu": {
	        "id": 2,
	        "devUserId": 123,
	        "meizuBinding": 123123123,
	        "meizuBindingStatus": 3,
	        "meizuBindingContent": "绑定失败",
	        "reviewStatus": 3,
	        "createDate": 1503316645000,
	        "updateDate": 1503316645000
	    },
	    "appMi": {
	        "id": null,
	        "devUserId": null,
	        "miId": null,
	        "miIdStatus": null,
	        "miIdContent": null,
	        "ipcUrl": null,
	        "ipcUrlStatus": null,
	        "ipcUrlContent": null,
	        "miLicenseUrl": null,
	        "miLicenseUrlStatus": null,
	        "miLicenseUrlContent": null,
	        "miConfirmationUrl": null,
	        "miConfirmationUrlStatus": null,
	        "miConfirmationUrlContent": null,
	        "miCopyrightUrl": null,
	        "miCopyrightUrlStatus": null,
	        "miCopyrightUrlContent": null,
	        "reviewStatus": null,
	        "createDate": null,
	        "updateDate": null
	    },
	    "appOppo": {
	        "id": 2,
	        "devUserId": 3,
	        "oppoId": "20151118",
	        "oppoIdStatus": 2,
	        "oppoIdContent": null,
	        "oppoLevel": "A",
	        "oppoLevelStatus": 2,
	        "oppoLevelContent": null,
	        "oppoCommitmentUrl": "img/demo/OPPO_promise.png",
	        "oppoCommitmentUrlStatus": 2,
	        "oppoCommitmentUrlContent": null,
	        "reviewStatus": 2,
	        "createDate": 1501233011000,
	        "updateDate": 1501242315000
	    },
	    "appVivo": {
	        "id": null,
	        "devUserId": null,
	        "vivoName": null,
	        "vivoNameStatus": null,
	        "vivoNameContent": null,
	        "vivoEmail": null,
	        "vivoEmailStatus": null,
	        "vivoEmailContent": null,
	        "vivoLicenseUrl": null,
	        "vivoLicenseUrlStatus": null,
	        "vivoLicenseUrlContent": null,
	        "vivoIdcard": null,
	        "vivoIdcardStatus":null,
	        "vivoIdcardContent": null,
	        "vivoIdcardUrl": null,
	        "vivoIdcardUrlStatus": null,
	        "vivoIdcardUrlContent": null,
	        "vivoConfirmationUrl": null,
	        "vivoConfirmationUrlStatus": null,
	        "vivoConfirmationUrlContent": null,
	        "reviewStatus": null,
	        "createDate": null,
	        "updateDate": null
	    }
	};
	//赋值给全局变量，方便后面数据对比
	baseGdtJson = JSONObject.appGdt;
	baseOppoJson = JSONObject.appOppo;
	baseVivoJson = JSONObject.appVivo;
	baseXiaomiJson = JSONObject.appMi;
	
	//	基础资料状态字段(账户信息)：12种状态
	//	渠道资料状态字段(5个应用市场)：审核状态：null未提交 1审核中 2审核通过 3审核不通过 4已保存
	
	//从appInfo中获取信息填充APP信息
	$('#app_name').text(JSONObject.appInfo.appName == null ? "暂无产品":JSONObject.appInfo.appName);
	setAppStatus(JSONObject.appInfo.status);
	$('#app_package_name').text("包名："+(JSONObject.appInfo.pkgName == null ? "暂无":JSONObject.appInfo.pkgName));
	$('#app_type').text("类别："+ (JSONObject.appInfo.category == null ? "暂无":JSONObject.appInfo.category));
	$('#app_time').text("添加时间："+ (JSONObject.appInfo.createDate == null ? "暂无":getLocalTime(JSONObject.appInfo.createDate)));
	
	//应用宝
	setYingyongbaoInfo(JSONObject.appGdt,JSONObject.appInfo);
	
	//OPPO
	setOppoInfo(JSONObject.appOppo);
	
	//vivo
	setVivoInfo(JSONObject.appVivo);
	
	//小米
	setXiaomiInfo(JSONObject.appMi);
	
	//魅族
	setChannelStatus('meizu_status',JSONObject.appMeizu.reviewStatus);
	setChannelSubStatus('status_meizu_tied',JSONObject.appMeizu.meizuBindingStatus);
	if(JSONObject.appMeizu.reviewStatus == 1){
    		$('#meizu_bangding_btn').attr("disabled",'disabled').removeClass('color_blue_bg').addClass('color_blue_bg_disable');
    	}
    	if(JSONObject.appMeizu.reviewStatus == 3){
    		$('#alert_meizu_tied').css('visibility','visible').text(JSONObject.appMeizu.meizuBindingContent);
    	}
	
	//如果没有基础资料，产品资料里面的提交按钮不能点击
	if (JSONObject.appInfo.reviewStatus != 2) {
		//未提交、审核中、审核不通过 显示该文案（注：完善账户信息并审核通过后才能上传资料）
		$('.alert_title_red').css('display','block');
		setGdtDisable();
		setOppoDisable();
		setVivoDisable();
		setXiaomiDisable();
		$('#meizu_bangding_btn').attr('disabled','disabled').css('background-color','rgb(162,195,235)');
	}else{
		//只有审核通过之后才不显示该文案（注：完善账户信息并审核通过后才能上传资料）
		$('.alert_title_red').css('display','none');
	}
	
});

//设置应用宝各项信息
function setYingyongbaoInfo(gdtJSON,appInfo){
	//信息审核状态
	setChannelStatus('gdt_status',gdtJSON.reviewStatus);
	setChannelSubStatus('status_gdt_appid',gdtJSON.gdtIdStatus);
	setChannelSubStatus('status_gdt_icp',gdtJSON.ipcUrlStatus);
	setChannelSubStatus('status_gdt_package',gdtJSON.gdtPkgStatus);
	
	//应用宝APP ID
	setInput(gdtJSON.gdtIdStatus,gdtJSON.gdtId,'alert_gdt_appid',gdtJSON.gdtIdContent);
	//根据渠道状态更改相应操作——审核中
	if (gdtJSON.reviewStatus == 1) {
		setGdtDisable();
	} else{
		
	}
	//设置ICP截图
	setImgBox(gdtJSON.ipcUrlStatus,gdtJSON.ipcUrl,"alert_gdt_icp",gdtJSON.ipcUrlContent,"yingyongbao_img_list");
	
	//渠道包的url不为空就展示预览图
	if (gdtJSON.gdtPkgUrl != null && gdtJSON.gdtPkgUrl.length != 0) {
		$('#yingyongbao_pkg').parent().find('.webuploader-pick').css('opacity',0);
		$('#yingyongbao_pkg').html('<div class="item"><span class="apk_box"><p>文件名：'+ appInfo.fileName +'</p><p>包名：'+appInfo.pkgName+'</p><p>大小：'+ appInfo.pkgSize + '</p><p>版本：'+ appInfo.appVer +'</p></span></div>');
	}
	//如果审核不通过显示审核信息
	if (gdtJSON.gdtPkgStatus == 3) {
		$("#alert_gdt_package").css('visibility','visible').text(gdtJSON.gdtPkgContent);
	}
}

//设置应用宝信息框不可点击
function setGdtDisable(){
	//设置应用宝APPID不能输入
	$('#gdt_box .input_box input').attr('disabled','disabled');
	//ICP备案截图不能点击
	$('#yingyongbao_upload1').css('pointer-events','none');
	//渠道包不能点击
	$('#yingyongbao_upload2').css('pointer-events','none');
	changeTwoButtonAbleToClick(false,'yingyongbao_save','yingyongbao_submit');
}

//设置OPPO各项信息
function setOppoInfo(oppoJSON){
	setChannelStatus('oppo_status',oppoJSON.reviewStatus);
	setChannelSubStatus('status_oppo_appid',oppoJSON.oppoIdStatus);
	setChannelSubStatus('status_oppo_rank',oppoJSON.oppoLevelStatus);
	setChannelSubStatus('status_oppo_img',oppoJSON.oppoCommitmentUrlStatus);
	
	//oppo appid
	setInput(oppoJSON.oppoIdStatus,oppoJSON.oppoId,'alert_oppo_appid',oppoJSON.oppoIdContent);
	//oppo 评级
	if(oppoJSON.oppoLevel == null){
		$('#alert_oppo_rank').prev().find('input[value="A"]').attr("checked","checked");
	}else{
	  $('#alert_oppo_rank').prev().find('input[type="radio"]').each(function(){
	    if ($(this).val() ==  oppoJSON.oppoLevel) {
	      $(this).attr("checked","checked");
	    }else{
	      $(this).removeAttr('checked');
	    }
	  });
	}
	//审核不通过的错误提示
	if (oppoJSON.oppoLevelStatus == 3) {
		$("#alert_oppo_rank").css('visibility','visible').val(oppoJSON.oppoLevelContent);
	} else if(status == 1 || status == 2){
		$("#alert_oppo_rank").css('visibility','hidden');
	}
	
	//根据渠道状态更改相应操作
	if (oppoJSON.reviewStatus == 1) {
		setOppoDisable();
	} else{
		
	}
	
	//* OPPO推广承诺函 
	setImgBox(oppoJSON.oppoCommitmentUrlStatus,oppoJSON.oppoCommitmentUrl,"alert_oppo_img",oppoJSON.oppoCommitmentUrlContent,"oppo_img_list");
}

//设置OPPO信息框不可点击
function setOppoDisable(){
	//OPPO推广承诺函不能点击
	$('#oppo_upload').css('pointer-events','none');
	$('#oppo_box .input_box input').attr('disabled','disabled');
	changeTwoButtonAbleToClick(false,'oppo_save','oppo_submit');
}

//设置vivo各项信息
function setVivoInfo(vivoJSON){
	setChannelStatus('vivo_status',vivoJSON.reviewStatus);
	setChannelSubStatus('status_vivo_uname',vivoJSON.vivoNameStatus);
	setChannelSubStatus('status_vivo_email',vivoJSON.vivoEmailStatus);
	setChannelSubStatus('status_vivo_account_pass_img',vivoJSON.vivoLicenseUrlStatus);
	setChannelSubStatus('status_vivo_person_ID',vivoJSON.vivoIdcardStatus);
	setChannelSubStatus('status_vivo_person_IDimg',vivoJSON.vivoIdcardUrlStatus);
	setChannelSubStatus('status_vivo_shouquan_img',vivoJSON.vivoConfirmationUrlStatus);
	
	//vivo 用户名
	setInput(vivoJSON.vivoNameStatus,vivoJSON.vivoName,'alert_vivo_uname',vivoJSON.vivoNameContent);
	//vivo 邮箱
	setInput(vivoJSON.vivoEmailStatus,vivoJSON.vivoEmail,'alert_vivo_email',vivoJSON.vivoEmailContent);
	//vivo 法人身份证号
	setInput(vivoJSON.vivoIdcardStatus,vivoJSON.vivoIdcard,'alert_vivo_person_ID',vivoJSON.vivoIdcardContent);
	//* 法人身份证复印件 
	setImgBox(vivoJSON.vivoIdcardUrlStatus,vivoJSON.vivoIdcardUrl,"alert_vivo_person_IDimg",vivoJSON.vivoIdcardContent,"vivo_img_list1");
	//开户许可证
	setImgBox(vivoJSON.vivoLicenseUrlStatus,vivoJSON.vivoLicenseUrl,"alert_vivo_account_pass_img",vivoJSON.vivoLicenseUrlContent,"vivo_img_list2");
	//vivo授权确认函
	setImgBox(vivoJSON.vivoConfirmationUrlStatus,vivoJSON.vivoConfirmationUrl,"alert_vivo_shouquan_img",vivoJSON.vivoConfirmationUrlContent,"vivo_img_list3");
	//根据渠道状态更改相应操作
	if (vivoJSON.reviewStatus == 1) {
		setVivoDisable();
	} else{
		
	}
}

//设置vivo信息框不可点击
function setVivoDisable(){
	$('#vivo_box .input_box input').attr('disabled','disabled');
	//法人身份证复印件,开户许可证,vivo授权确认函不能点击
	$('#vivo_upload1').css('pointer-events','none');
	$('#vivo_upload2').css('pointer-events','none');
	$('#vivo_upload3').css('pointer-events','none');
	
	changeTwoButtonAbleToClick(false,'vivo_save','vivo_submit');
}

//设置小米各项信息
function setXiaomiInfo(miJSON){
	//信息审核状态
	setChannelStatus('xiaomi_status',miJSON.reviewStatus);
	setChannelSubStatus('status_xiaomi_appid',miJSON.miIdStatus);
	setChannelSubStatus('status_xiaomi_icp_img',miJSON.ipcUrlStatus);
	setChannelSubStatus('status_xiaomi_promise_img',miJSON.miLicenseUrlStatus);
	setChannelSubStatus('status_xiaomi_confirm_img',miJSON.miConfirmationUrlStatus);
	setChannelSubStatus('status_xiaomi_copyrigh_img',miJSON.miCopyrightUrlStatus);
	
	//小米appID
	setInput(miJSON.miIdStatus,miJSON.miId,'alert_xiaomi_appid',miJSON.miIdContent);
	//ICP备案截图
	setImgBox(miJSON.ipcUrlStatus,miJSON.ipcUrl,"alert_xiaomi_icp_img",miJSON.ipcUrlContent,"xiaomi_img_list1");
	//小米推广行业承诺函
	setImgBox(miJSON.miLicenseUrlStatus,miJSON.miLicenseUrl,"alert_xiaomi_promise_img",miJSON.miLicenseUrlContent,"xiaomi_img_list2");
	//小米推广确认函
	setImgBox(miJSON.miConfirmationUrlStatus,miJSON.miConfirmationUrl,"alert_xiaomi_confirm_img",miJSON.miConfirmationUrlContent,"xiaomi_img_list3");
	
	//计算机软件著作权（可选）
	setImgBox(miJSON.miCopyrightUrlStatus,miJSON.miCopyrightUrl,"alert_xiaomi_writing_img",miJSON.miCopyrightUrlContent,"xiaomi_img_list4");
	
	//根据渠道状态更改相应操作
	if (miJSON.reviewStatus == 1) {
		setXiaomiDisable();
	} else{
		
	}
}
//设置小米信息框不可点击
function setXiaomiDisable(){
	$('#xiaomi_box .input_box input').attr('disabled','disabled');
	//ICP备案截图,小米推广行业承诺函,小米推广确认函,计算机软件著作权（可选）不能点击
	$('#xiaomi_upload1').css('pointer-events','none');
	$('#xiaomi_upload2').css('pointer-events','none');
	$('#xiaomi_upload3').css('pointer-events','none');
	$('#xiaomi_upload4').css('pointer-events','none');
	changeTwoButtonAbleToClick(false,'xiaomi_save','xiaomi_submit');
}

//设置input输入框
function setInput(status,inputValue,alertId,alertMsg){
	//审核不通过
	if (status == 3) {
		$("#"+alertId).css('visibility','visible').text(alertMsg).prev().val(inputValue);
	} else if(status == 1 || status == 2){
		$("#"+alertId).css('visibility','hidden').prev().val(inputValue);
	}
}

//根据json设置img的预览图
function setImgBox(status,imgUrl,alertId,alertMsg,imgBoxID){
	if (imgUrl == null || imgUrl.length == 0) {
		return;
	}else{
		$('#'+imgBoxID).prev().css('opacity',0);
		$("#"+imgBoxID).html('<div class="thumbnail img_box_position"><img src=""/><div class="img_cover_box ubk_cursor_point" style="display: none;"><button class="upload_img" onclick="changeImgToUpload(&quot;'+ imgBoxID +'&quot;)">重新上传</button><button class="look_img" onclick="lookFullImg(this.parentElement.parentElement.firstElementChild.src)">查看原图</button></div></div>');
		$("#"+imgBoxID).find('img').css({'width':'350px','height':'130px','border-radius': '3px'}).attr('src',imgUrl);
	}
	//如果审核不通过显示审核信息
	if (status == 3) {
		$("#"+alertId).css('visibility','visible').text(alertMsg);
	}
}


//设置各渠道中详细信息的审核状态和字体颜色
function setChannelSubStatus(itemID,status){
	//先删除所有的颜色
	$('#'+itemID).removeClass('text_black text_blue text_green text_red');
	switch (status){
		case null://null未提交,黑色
			$('#'+itemID).addClass('text_black').text('未提交');
			break;
		case 1://1审核中，蓝色
			$('#'+itemID).addClass('text_blue').text('审核中');
			break;
		case 2://2审核通过，绿色
			$('#'+itemID).addClass('text_green').text('审核通过');
			break;
		case 3://3审核不通过，红色
			$('#'+itemID).addClass('text_red').text('审核不通过');
			break;
		default:
			break;
	}
}

//设置渠道的审核状态及背景颜色
function setChannelStatus(channelID,status){
	//先删除所有的背景颜色
	$('#'+channelID).removeClass('color_blue_bg color_gray_bg color_green_bg color_lightgray_bg color_red_bg');
	switch (status){
		case null://null未提交,灰色
			$('#'+channelID).addClass('color_gray_bg').text('未提交');
			break;
		case 1://1审核中，蓝色
			$('#'+channelID).addClass('color_blue_bg').text('审核中');
			break;
		case 2://2审核通过，绿色
			$('#'+channelID).addClass('color_green_bg').text('审核通过');
			break;
		case 3://3审核不通过，红色
			$('#'+channelID).addClass('color_red_bg').text('审核不通过');
			break;
		default:
			break;
	}
}

//设置APP的审核状态及背景颜色
function setAppStatus(status){
	switch (status){
		case '待提交资质':$('#app_state').addClass('color_1_bg');break;
		case '资质审核中':$('#app_state').addClass('color_2_bg');break;
		case '资质审核不通过':$('#app_state').addClass('color_3_bg');break;
		case '暂停中':$('#app_state').addClass('color_4_bg');break;
		case '垫款中':$('#app_state').addClass('color_5_bg');break;
		case '待投放':$('#app_state').addClass('color_6_bg');break;
		case '即将完成':$('#app_state').addClass('color_7_bg');break;
		case '已完成':$('#app_state').addClass('color_8_bg');break;
		case '太慢':$('#app_state').addClass('color_9_bg');break;
		case '太贵':$('#app_state').addClass('color_10_bg');break;
		case '投放中':$('#app_state').addClass('color_11_bg');break;
		case '待充值':$('#app_state').addClass('color_12_bg');break;
		default:break;
	}
	$('#app_state').text(status);
}
//将时间戳转为带格式的时间
function getLocalTime(nS) {
	return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");      
}

//改变两个按钮的状态为可点击状态
function changeTwoButtonAbleToClick(yes,saveID,submitID){
	if (yes) {
		$('#'+saveID).removeAttr('disabled').removeClass('color_blue_bg_disable').addClass('color_blue_bg');
		$('#'+submitID).removeAttr('disabled').removeClass('color_blue_bg_disable').addClass('color_blue_bg');
	} else{
		$('#'+saveID).attr('disabled','disabled').removeClass('color_blue_bg').addClass('color_blue_bg_disable');
		$('#'+submitID).attr('disabled','disabled').removeClass('color_blue_bg').addClass('color_blue_bg_disable');
	}
	
}

//校验图片是否存在
function checkImageExist(imgBoxId,alertId,alertMsg){
	if ($('#'+imgBoxId).html().length == 0) {
		$('#'+alertId).css('visibility','visible').text(alertMsg);
		return false;
	} else{
		$('#'+alertId).css('visibility','hidden');
		return true;
	}
}

//是否选择了文件
function selectNewFile(fileBoxId){
	if ($('#'+fileBoxId).find('div').hasClass('file-item')) {
		return true;
	} else{
		return false;
	}
}


/*请求后台数据及渲染数据---------------------结束-----------------------------------*/

/*应用宝开始
 整个上传流程：点击保存按钮（$('#yingyongbao_save').click）后先校验数据（checkYingyongbaoForm()返回为true为校验通过），校验通过后首先上传ICP备案截图（调用yingyongbao_img_uploader.upload()）上传成功后在上传成功回调（yingyongbao_img_uploader.on('uploadSuccess')）中上传渠道包（调用yingyongbao_pkg_uploader.upload()），等渠道包上传成功（有上传成功的回调yingyongbao_pkg_uploader.on('uploadSuccess')）后再发表单请求。
 * */
//上传图片————ICP备案截图
var $yingyongbao_img_list=$("#yingyongbao_img_list");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var yingyongbao_img_uploader = WebUploader.create({
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
    pick:{id:'#yingyongbao_upload1',multiple:false},
    // 只允许选择图片文件。
    accept: {
        title: 'Images',
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#yingyongbao_upload1').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
yingyongbao_img_uploader.on( 'fileQueued', function( file ) {
	//移除上一个file使其不在提交的时候上传
	var fileArr = yingyongbao_img_uploader.getFiles();
	for (var i=0;i<fileArr.length-1;i++) {
		yingyongbao_img_uploader.removeFile( fileArr[i] );
	}
	$yingyongbao_img_list.html('');
	$('#yingyongbao_upload1').css('opacity',0);
	
	// webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $yingyongbao_img_list.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    yingyongbao_img_uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
yingyongbao_img_uploader.on( 'uploadSuccess', function( file ) {
	//如果更改了图片就上传图片  	
  	if(selectNewFile('yingyongbao_pkg')){
		yingyongbao_pkg_uploader.upload();
	}else if ($('#alert_gdt_appid').prev().val() != baseGdtJson.gdtId) {
		//提交表单ajax发送应用宝的APPid
		var gdtAppId = $('#alert_gdt_appid').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeGdtStatusTo1();
		
	}else{
		changeGdtStatusTo1();
	}
});

// 文件上传失败，显示上传出错。
yingyongbao_img_uploader.on( 'uploadError', function( file ) {
    
});

//上传渠道包————渠道包
var $yingyongbao_pkg=$("#yingyongbao_pkg");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var yingyongbao_pkg_uploader = WebUploader.create({
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
    pick: {id:'#yingyongbao_upload2',multiple:false},
    chunked: true, //是否要分片处理大文件上传
    chunkSize:5*1024*1024, //分片上传，每片2M，默认是5M
	auto: false,
    //禁止压缩图片
    compress:false, //选择文件后是否自动上传
    	chunkRetry : 2, //如果某个分片由于网络问题出错，允许自动重传次数
    	runtimeOrder: 'html5,flash',
     // 只允许选择apk文件。
    accept: {
        extensions: 'apk',
        mimeTypes: 'application/apk',
    },
    method:'POST', 
    fileSingleSizeLimit:200 * 1024 * 1024,
});

$('#yingyongbao_upload2').find('div').css({'height':'120px','width':'350px'});

// 当有文件添加进来的时候
yingyongbao_pkg_uploader.on( 'fileQueued', function( file ) {
	//移除上一个file使其不在提交的时候上传
	var fileArr = yingyongbao_pkg_uploader.getFiles();
	for (var i=0;i<fileArr.length-1;i++) {
		yingyongbao_pkg_uploader.removeFile( fileArr[i] );
	}
	$yingyongbao_pkg.html('');
	$('#yingyongbao_upload2').css('opacity',0);
    
	var apkSize = file.size / 1048576;
	// $yingyongbao_img_list为容器jQuery实例
    $yingyongbao_pkg.append('<div id="' + file.id +'" class="file-item">'+'<span class="apk_box"><p>文件名：'+ file.name +'</p><p>大小：'+ apkSize.toFixed(2) + "MB" + '</p></span>' +'</div>');
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
yingyongbao_pkg_uploader.on( 'uploadSuccess', function( file ) {
	if ($('#alert_gdt_appid').prev().val() != baseGdtJson.gdtId) {
		//提交表单ajax发送应用宝的APPid
		var gdtAppId = $('#alert_gdt_appid').prev().val();
		
		var originalFileName = '121212.apk';
		var pkgName = 'com.ubk.com';
		var pkgSize = '10M';
		var appVer = '1.01.23';
		$('#yingyongbao_pkg').html('<div class="item"><span class="apk_box"><p>文件名：'+ originalFileName +'</p><p>包名：'+ pkgName+'</p><p>大小：'+ pkgSize + '</p><p>版本：'+ appVer +'</p></span></div>');
		//提交成功后做调用此函数来改变状态
		changeGdtStatusTo1();
	}else{
		changeGdtStatusTo1();
	}
	
    
});

// 文件上传失败，显示上传出错。
yingyongbao_pkg_uploader.on( 'uploadError', function( file ) {
    
});

//本部分提交审核事件
$('#yingyongbao_submit').click(function(){
	layer.msg("此Demo暂不支持该操作");
});

function changeGdtStatusTo1(){
	//修改渠道的审核状态——审核中
	setChannelStatus('gdt_status',1);
	setChannelSubStatus('status_gdt_appid',1);
	setChannelSubStatus('status_gdt_icp',1);
	setChannelSubStatus('status_gdt_package',1);
	//改变为不可点击不可修改状态
	$('#gdt_box .input_box input').attr('disabled','disabled');
	changeTwoButtonAbleToClick(false,'yingyongbao_save','yingyongbao_submit');
	//隐藏审核不通过的提示性文案
	setInput(1,$("#alert_gdt_appid").prev().val(),'alert_gdt_appid',null);
	setInput(1,$("#alert_gdt_icp").prev().val(),'alert_gdt_icp',null);
	setInput(1,$("#alert_gdt_package").prev().val(),'alert_gdt_package',null);
	
}

//应用宝表单数据校验
function checkYingyongbaoForm(){
	var gdtArr = [false,false,false];
	//数据校验
	if ($('#alert_gdt_appid').prev().val().length < 5) {
		$('#alert_gdt_appid').css('visibility','visible').text('请输入5~12位数字字符');
		gdtArr[0] = false;
	}else{
		$('#alert_gdt_appid').css('visibility','hidden');
		gdtArr[0] = true;
	}
	gdtArr[1] = checkImageExist('yingyongbao_img_list','alert_gdt_icp','请上传ICP备案截图');
	
	if ($('#yingyongbao_pkg').find('.apk_box').html() == undefined) {
		$('#alert_gdt_package').css('visibility','visible').text('请上传渠道包');
		gdtArr[2] = false;
	} else{
		$('#alert_gdt_package').css('visibility','hidden');
		gdtArr[2] = true;
	}
	
	if (gdtArr[0] && gdtArr[1] && gdtArr[2]) {
		return true;
	}
	
	if ($('#alert_gdt_appid').prev().val() == baseGdtJson.gdtId && (!selectNewFile('yingyongbao_img_list')) && (!selectNewFile('yingyongbao_pkg'))) {
		return false;
	}
	
	return false;
}
/*应用宝结束*/

/*OPPO开始*/
//上传图片————ICP备案截图
var $oppo_img_list=$("#oppo_img_list");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var oppo_img_uploader = WebUploader.create({
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
    pick: {id:'#oppo_upload',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});

$('#oppo_upload').find('div').css({'height':'130px','width':'350px'});
// 当有文件添加进来的时候
oppo_img_uploader.on( 'fileQueued', function( file ) {
	//移除上一个file使其不在提交的时候上传
	var fileArr = oppo_img_uploader.getFiles();
	for (var i=0;i<fileArr.length-1;i++) {
		oppo_img_uploader.removeFile( fileArr[i] );
	}
	$oppo_img_list.html('');
	$('#oppo_upload').css('opacity',0);
	
	// webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $oppo_img_list.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    oppo_img_uploader.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
oppo_img_uploader.on( 'uploadSuccess', function( file ) {
	
	if ($('#alert_oppo_appid').prev().val() != baseOppoJson.oppoId || $('#alert_oppo_rank').prev().val() != baseOppoJson.oppoLevel) {
		//提交表单ajax发送应用宝的APPid
		oppoId = $('#alert_oppo_appid').prev().val();
		oppoLevel = $('#alert_oppo_rank').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeOppoStatusTo1();
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
oppo_img_uploader.on( 'uploadError', function( file ) {
    
});

//本部分提交审核事件
$('#oppo_submit').click(function(){
	layer.msg("此Demo暂不支持该操作");
});

function selectLevel(value){
	$('#alert_oppo_rank').prev().find('input[checked="checked"]').removeAttr('checked');
	for (var i=0;i<4;i++) {
		if ($('#alert_oppo_rank').prev().find('input').eq(i).val() == value) {
			$('#alert_oppo_rank').prev().find('input').eq(i).attr('checked','checked');
		}
	}
}

function changeOppoStatusTo1(){
	//修改渠道的审核状态
	setChannelStatus('oppo_status',1);
	setChannelSubStatus('status_oppo_appid',1);
	setChannelSubStatus('status_oppo_rank',1);
	setChannelSubStatus('status_oppo_img',1);
	//改变为不可点击不可修改状态
	$('#oppo_box .input_box input').attr('disabled','disabled');
	changeTwoButtonAbleToClick(false,'oppo_save','oppo_submit');
	//隐藏审核不通过的提示性文案
	setInput(1,$("#alert_oppo_appid").prev().val(),'alert_oppo_appid',null);
	setInput(1,$("#alert_oppo_rank").prev().val(),'alert_oppo_rank',null);
	setInput(1,$("#alert_oppo_img").prev().val(),'alert_oppo_img',null);
	//toast提示层
	layer.msg('提交成功！');
}

//OPPO表单数据校验
function checkOppoForm(){
	var oppoArr = [false,false];
	//数据校验
	if ($('#alert_oppo_appid').prev().val().length < 5) {
		$('#alert_oppo_appid').css('visibility','visible').text('请输入7~12位数字字符');
		oppoArr[0] = false;
	}else{
		$('#alert_oppo_appid').css('visibility','hidden');
		oppoArr[0] = true;
	}
	oppoArr[1] = checkImageExist('oppo_img_list','alert_oppo_img','请上传OPPO推广承诺函');
	
	if (oppoArr[0] && oppoArr[1]) {
		return true;
	}
	return false;
}
/*OPPO结束*/

/*vivo开始*/
//上传图片————法人身份证复印件
var $vivo_img_list1=$("#vivo_img_list1");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var vivo_img_uploader1 = WebUploader.create({
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
    pick:{id:'#vivo_upload1',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#vivo_upload1').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
vivo_img_uploader1.on( 'fileQueued', function( file ) {
	//移除上一个file使其不在提交的时候上传
	var fileArr = vivo_img_uploader1.getFiles();
	for (var i=0;i<fileArr.length-1;i++) {
		vivo_img_uploader1.removeFile( fileArr[i] );
	}
	$vivo_img_list1.html('');
	$('#vivo_upload1').css('opacity',0);
	
	// webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $vivo_img_list1.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    vivo_img_uploader1.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
vivo_img_uploader1.on( 'uploadSuccess', function( file ) {
	//②
	//如果更改了图片就上传图片
    
    if(selectNewFile('vivo_img_list2')){
		vivo_img_uploader2.upload();
	}else if(selectNewFile('vivo_img_list3')){
		vivo_img_uploader3.upload();
	}else if ($('#alert_vivo_uname').prev().val() != baseVivoJson.vivoName || $('#alert_vivo_email').prev().val() != baseVivoJson.vivoEmail || $('#alert_vivo_person_ID').prev().val() != baseVivoJson.vivoIdcard) {
		//提交表单ajax发送应用宝的APPid
		var uname = $('#alert_vivo_uname').prev().val();
		var email = $('#alert_gdt_appid').prev().val();
		var idCard = $('#alert_vivo_person_ID').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeVivoStatusTo1();
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
vivo_img_uploader1.on( 'uploadError', function( file ) {
    
});

//上传图片———— 开户许可证
var $vivo_img_list2=$("#vivo_img_list2");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var vivo_img_uploader2 = WebUploader.create({
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
    pick:{id:'#vivo_upload2',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#vivo_upload2').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
vivo_img_uploader2.on( 'fileQueued', function( file ) {
    //移除上一个file使其不在提交的时候上传
    var fileArr = vivo_img_uploader2.getFiles();
    for (var i=0;i<fileArr.length-1;i++) {
        vivo_img_uploader2.removeFile( fileArr[i] );
    }
    $vivo_img_list2.html('');
    $('#vivo_upload2').css('opacity',0);
    
    // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $vivo_img_list2.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    vivo_img_uploader2.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
vivo_img_uploader2.on( 'uploadSuccess', function( file ) {
	//③
	//如果更改了图片就上传图片
    if(selectNewFile('vivo_img_list3')){
		vivo_img_uploader3.upload();
	}else if ($('#alert_vivo_uname').prev().val() != baseVivoJson.vivoName || $('#alert_vivo_email').prev().val() != baseVivoJson.vivoEmail || $('#alert_vivo_person_ID').prev().val() != baseVivoJson.vivoIdcard) {
		//提交表单ajax发送应用宝的APPid
		var uname = $('#alert_vivo_uname').prev().val();
		var email = $('#alert_gdt_appid').prev().val();
		var idCard = $('#alert_vivo_person_ID').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeVivoStatusTo1();
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
vivo_img_uploader2.on( 'uploadError', function( file ) {
    
});

//上传图片———— vivo授权确认函
var $vivo_img_list3 = $("#vivo_img_list3");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var vivo_img_uploader3 = WebUploader.create({
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
    pick: {id:'#vivo_upload3',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#vivo_upload3').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
vivo_img_uploader3.on( 'fileQueued', function( file ) {
    //移除上一个file使其不在提交的时候上传
    var fileArr = vivo_img_uploader3.getFiles();
    for (var i=0;i<fileArr.length-1;i++) {
        vivo_img_uploader3.removeFile( fileArr[i] );
    }
    $vivo_img_list3.html('');
    $('#vivo_upload3').css('opacity',0);
    
    // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $vivo_img_list3.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    vivo_img_uploader3.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
vivo_img_uploader3.on( 'uploadSuccess', function( file ) {
    //④提交表单
    if ($('#alert_vivo_uname').prev().val() != baseVivoJson.vivoName || $('#alert_vivo_email').prev().val() != baseVivoJson.vivoEmail || $('#alert_vivo_person_ID').prev().val() != baseVivoJson.vivoIdcard) {
		//提交表单ajax发送应用宝的APPid
		var uname = $('#alert_vivo_uname').prev().val();
		var email = $('#alert_gdt_appid').prev().val();
		var idCard = $('#alert_vivo_person_ID').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeVivoStatusTo1();
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
vivo_img_uploader3.on( 'uploadError', function( file ) {
    
});

//本部分提交审核事件
$('#vivo_submit').click(function(){
	layer.msg("此Demo暂不支持该操作");
});

function changeVivoStatusTo1(){
	
    //修改渠道的审核状态——审核中
	setChannelStatus('vivo_status',1);
	setChannelSubStatus('status_vivo_uname',1);
	setChannelSubStatus('status_vivo_email',1);
	setChannelSubStatus('status_vivo_account_pass_img',1);
	setChannelSubStatus('status_vivo_person_ID',1);
	setChannelSubStatus('status_vivo_person_IDimg',1);
	setChannelSubStatus('status_vivo_shouquan_img',1);
	//改变为不可点击不可修改状态
	$('#vivo_box .input_box input').attr('disabled','disabled');
	changeTwoButtonAbleToClick(false,'vivo_save','vivo_submit');
	//隐藏审核不通过的提示性文案
	setInput(1,$("#alert_vivo_uname").prev().val(),'alert_vivo_uname',null);
	setInput(1,$("#alert_vivo_email").prev().val(),'alert_vivo_email',null);
	setInput(1,$("#alert_vivo_person_ID").prev().val(),'alert_vivo_person_ID',null);
	setInput(1,$("#alert_vivo_person_IDimg").prev().val(),'alert_vivo_person_IDimg',null);
	setInput(1,$("#alert_vivo_account_pass_img").prev().val(),'alert_vivo_account_pass_img',null);
	setInput(1,$("#alert_vivo_shouquan_img").prev().val(),'alert_vivo_shouquan_img',null);
	//toast提示层
	layer.msg('提交成功！');
}

//vivo表单数据校验
function checkVivoForm(){
	var vivoArr = [false,false,false,false,false,false];
	//数据校验
	if ($('#alert_vivo_uname').prev().val().length == 0) {
		$('#alert_vivo_uname').css('visibility','visible').text('请输入您登录“vivo开发者平台”的用户名');
		vivoArr[0] = false;
	}else{
		$('#alert_vivo_uname').css('visibility','hidden');
		vivoArr[0] = true;
	}
	
	var email = $('#alert_vivo_email').prev().val();
	if (email.length == 0 || !email.match(/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{1,5}){1,5})$/)) {
		$('#alert_vivo_email').css('visibility','visible').text('请输入正确的邮箱地址');
		vivoArr[1] = false;
	}else{
		$('#alert_vivo_email').css('visibility','hidden');
		vivoArr[1] = true;
	}
	
	if ($('#alert_vivo_person_ID').prev().val().length != 15 && $('#alert_vivo_person_ID').prev().val().length != 18) {
		$('#alert_vivo_person_ID').css('visibility','visible').text('请输入正确的身份证号');
		vivoArr[2] = false;
	}else{
		$('#alert_vivo_person_ID').css('visibility','hidden');
		vivoArr[2] = true;
	}
	
	vivoArr[3] = checkImageExist('vivo_img_list1','alert_vivo_person_IDimg','请上传法人身份证复印件');
	vivoArr[4] = checkImageExist('vivo_img_list2','alert_vivo_account_pass_img','请上传开户许可证');
	vivoArr[5] = checkImageExist('vivo_img_list3','alert_vivo_shouquan_img','请上传vivo授权确认函');
	
	if (vivoArr[0] && vivoArr[1] && vivoArr[2] && vivoArr[3] && vivoArr[4] && vivoArr[5]) {
		return true;
	}
	return false;
}
/*vivo结束*/

/*小米开始*/
//上传图片————法人身份证复印件
var $xiaomi_img_list1=$("#xiaomi_img_list1");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var xiaomi_img_uploader1 = WebUploader.create({
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
    pick: {id:'#xiaomi_upload1',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#xiaomi_upload1').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
xiaomi_img_uploader1.on( 'fileQueued', function( file ) {
	//移除上一个file使其不在提交的时候上传
	var fileArr = xiaomi_img_uploader1.getFiles();
	for (var i=0;i<fileArr.length-1;i++) {
		xiaomi_img_uploader1.removeFile( fileArr[i] );
	}
	$xiaomi_img_list1.html('');
	$('#xiaomi_upload1').css('opacity',0);
	
	// webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $xiaomi_img_list1.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    xiaomi_img_uploader1.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
xiaomi_img_uploader1.on( 'uploadSuccess', function( file ) {
    //②
    //如果更改了图片就上传图片
    
    if(selectNewFile('xiaomi_img_list2')){
		xiaomi_img_uploader2.upload();
	}else if(selectNewFile('xiaomi_img_list3')){
		xiaomi_img_uploader3.upload();
	}else if(selectNewFile('xiaomi_img_list4')){
		xiaomi_img_uploader4.upload();
	}else if ($('#alert_xiaomi_appid').prev().val() != baseXiaomiJson.miId) {
		//提交表单ajax发送应用宝的APPid
		miAppId = $('#alert_xiaomi_appid').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeXiaomiStatusTo1();
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
xiaomi_img_uploader1.on( 'uploadError', function( file ) {
    
});

//上传图片———— 开户许可证
var $xiaomi_img_list2=$("#xiaomi_img_list2");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var xiaomi_img_uploader2 = WebUploader.create({
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
    pick:{id:'#xiaomi_upload2',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#xiaomi_upload2').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
xiaomi_img_uploader2.on( 'fileQueued', function( file ) {
    //移除上一个file使其不在提交的时候上传
    var fileArr = xiaomi_img_uploader2.getFiles();
    for (var i=0;i<fileArr.length-1;i++) {
        xiaomi_img_uploader2.removeFile( fileArr[i] );
    }
    $xiaomi_img_list2.html('');
    $('#xiaomi_upload2').css('opacity',0);
    
    // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $xiaomi_img_list2.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    xiaomi_img_uploader2.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
xiaomi_img_uploader2.on( 'uploadSuccess', function( file ) {
    //③
    //如果更改了图片就上传图片
    if(selectNewFile('xiaomi_img_list3')){
		xiaomi_img_uploader3.upload();
	}else if(selectNewFile('xiaomi_img_list4')){
		xiaomi_img_uploader4.upload();
	}else if ($('#alert_xiaomi_appid').prev().val() != baseXiaomiJson.miId) {
		//提交表单ajax发送应用宝的APPid
		miAppId = $('#alert_xiaomi_appid').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeXiaomiStatusTo1();
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
xiaomi_img_uploader2.on( 'uploadError', function( file ) {
    
});

//上传图片———— xiaomi授权确认函
var $xiaomi_img_list3 = $("#xiaomi_img_list3");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var xiaomi_img_uploader3 = WebUploader.create({
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
    pick:{id:'#xiaomi_upload3',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#xiaomi_upload3').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
xiaomi_img_uploader3.on( 'fileQueued', function( file ) {
    //移除上一个file使其不在提交的时候上传
    var fileArr = xiaomi_img_uploader3.getFiles();
    for (var i=0;i<fileArr.length-1;i++) {
        xiaomi_img_uploader3.removeFile( fileArr[i] );
    }
    $xiaomi_img_list3.html('');
    $('#xiaomi_upload3').css('opacity',0);
    
    // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $xiaomi_img_list3.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    xiaomi_img_uploader3.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
xiaomi_img_uploader3.on( 'uploadSuccess', function( file ) {
    //④
    //如果更改了图片就上传图片
    if(selectNewFile('xiaomi_img_list4')){
		xiaomi_img_uploader4.upload();
	}else if ($('#alert_xiaomi_appid').prev().val() != baseXiaomiJson.miId) {
		//提交表单ajax发送应用宝的APPid
		miAppId = $('#alert_xiaomi_appid').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeXiaomiStatusTo1();
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
xiaomi_img_uploader3.on( 'uploadError', function( file ) {
    
});

//上传图片———— xiaomi授权确认函
var $xiaomi_img_list4 = $("#xiaomi_img_list4");   //这个初始化全局的百度文档上没说明。  

// 初始化Web Uploader
var xiaomi_img_uploader4 = WebUploader.create({
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
    pick:{id:'#xiaomi_upload4',multiple:false},
    // 只允许选择图片文件。
    accept: {
        extensions: 'jpg,jpeg,png',
        mimeTypes: 'image/jpg,image/jpeg,image/png'
    },
    method:'POST', 
    fileSingleSizeLimit:5 * 1024 * 1024,
});
$('#xiaomi_upload4').find('div').css({'height':'130px','width':'350px'});

// 当有文件添加进来的时候
xiaomi_img_uploader4.on( 'fileQueued', function( file ) {
    //移除上一个file使其不在提交的时候上传
    var fileArr = xiaomi_img_uploader4.getFiles();
    for (var i=0;i<fileArr.length-1;i++) {
        xiaomi_img_uploader3.removeFile( fileArr[i] );
    }
    $xiaomi_img_list4.html('');
    $('#xiaomi_upload4').css('opacity',0);
    
    // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。
    var $li = $('<div id="' + file.id + '" class="file-item thumbnail">' +'<img>' + '</div>'),
        $img = $li.find('img');
    // $yingyongbao_img_list为容器jQuery实例
    $xiaomi_img_list4.append( $li );

    //  创建缩略图:如果为非图片文件，可以不用调用此方法。
    xiaomi_img_uploader4.makeThumb( file, function( error, src ) {
        if ( error ) {
            $img.replaceWith('<span>不能预览</span>');
            return;
        }
        $img.attr( 'src', src );}, 350, 130 );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
xiaomi_img_uploader4.on( 'uploadSuccess', function( file ) {
	if ($('#alert_xiaomi_appid').prev().val() != baseXiaomiJson.miId) {
		//提交表单ajax发送应用宝的APPid
		miAppId = $('#alert_xiaomi_appid').prev().val();
		
		//提交成功后做调用此函数来改变状态
		changeXiaomiStatusTo1();
		
	}else{
		return;
	}
});

// 文件上传失败，显示上传出错。
xiaomi_img_uploader4.on( 'uploadError', function( file ) {
    
});



//本部分提交审核事件
$('#xiaomi_submit').click(function(){
	layer.msg("此Demo暂不支持该操作");
});

function changeXiaomiStatusTo1(){
	
    //修改渠道的审核状态——审核中
	setChannelStatus('xiaomi_status',1);
	setChannelSubStatus('status_xiaomi_appid',1);
	setChannelSubStatus('status_xiaomi_icp_img',1);
	setChannelSubStatus('status_xiaomi_promise_img',1);
	setChannelSubStatus('status_xiaomi_confirm_img',1);
	setChannelSubStatus('status_xiaomi_copyrigh_img',1);
	//改变为不可点击不可修改状态
	$('#xiaomi_box .input_box input').attr('disabled','disabled');
	changeTwoButtonAbleToClick(false,'xiaomi_save','xiaomi_submit');
	//隐藏审核不通过的提示性文案
	setInput(1,$("#alert_xiaomi_appid").prev().val(),'alert_xiaomi_appid',null);
	setInput(1,$("#alert_xiaomi_icp_img").prev().val(),'alert_xiaomi_icp_img',null);
	setInput(1,$("#alert_xiaomi_promise_img").prev().val(),'alert_xiaomi_promise_img',null);
	setInput(1,$("#alert_xiaomi_confirm_img").prev().val(),'alert_xiaomi_confirm_img',null);
	setInput(1,$("#alert_xiaomi_writing_img").prev().val(),'alert_xiaomi_writing_img',null);
	//toast提示层
	layer.msg('提交成功！');
}

//xiaomi表单数据校验
function checkXiaomiForm(){
	var xiaomiArr = [false,false,false,false];
	//数据校验
	if ($('#alert_xiaomi_appid').prev().val().length == 0) {
		$('#alert_xiaomi_appid').css('visibility','visible').text('请输入产品于小米应用市场的appId');
		xiaomiArr[0] = false;
	}else{
		$('#alert_xiaomi_appid').css('visibility','hidden');
		xiaomiArr[0] = true;
	}
	
	xiaomiArr[1] = checkImageExist('xiaomi_img_list1','alert_xiaomi_icp_img','请上传法人身份证复印件');
	xiaomiArr[2] = checkImageExist('xiaomi_img_list2','alert_xiaomi_promise_img','请上传开户许可证');
	xiaomiArr[3] = checkImageExist('xiaomi_img_list3','alert_xiaomi_confirm_img','请上传vivo授权确认函');
	
	if (xiaomiArr[0] && xiaomiArr[1] && xiaomiArr[2] && xiaomiArr[3]) {
		return true;
	}
	return false;
}
/*小米结束*/

/*魅族开始*/
//已经绑定按钮事件
function alreadyLink(idStr,status,sub_status){
	//提示层
	layer.msg('此Demo暂不支持该操作');
	
}

/*魅族结束*/



//========================================================================

//鼠标悬浮到图片上出现查看原图和删除按钮(包括移走消失)
$('.company_card_small').hover(function(){
	$(this).next().find('.img_cover_box').css('display','block');
});
$('.uploader-list').mouseleave(function(){
	$('.img_cover_box').css('display','none');
});

//查看原图
function lookFullImg(imgSrc){
	$('.img_cover_box').css('display','none');
	$('.look_full_img img').attr('src',imgSrc);
	var imgObj = new Image();
	imgObj.src = $('.look_full_img img').attr('src');
	imgObj.onload = function(){
		var winH = $(window).height();
		var marginTop;
		if (imgObj.height >= winH) {
			marginTop = 0;
			$('.look_full_img img').css('height',winH);
		}else{
			marginTop = (winH - imgObj.height) / 2 - 100;
			var height = imgObj.height;
			var width = imgObj.width;
		}

		$('.look_full_img img').css('margin-top',marginTop);
		$('.look_full_img').show();
	};
}

function closeFullImg(){
	$('.look_full_img').hide();
}

//点击上传图片按钮
function changeImgToUpload(pickerID){
	$('.img_cover_box').css('display','none');
	$('#' + pickerID).prev().find('input').click();
}
