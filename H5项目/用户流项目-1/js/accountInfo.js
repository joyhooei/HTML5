$(document).ready(function(){
	$('.customer_resetpsd').hide();
	//设置提示弹框的上下位置
	var winH = $(window).height()/2 - 250;
	$('.gxd_alert').css('margin-top',winH);
});

$(".company").hover(function(){
	$(".company ul").slideToggle();
});
$(".ubk-person").hover(function(){
	$(".ubk_per_card").slideToggle();
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


//删除营业执照
function deleteImg(){
	$('.type-dialogBox2').dialogBox({
		type: 'normal',
		width: 690,
		title:"提示",
		height: 310,
		hasMask: true,
		hasClose: true,
		hasBtn: true,
		content: '<img src="img/public/correct.png"/><span>确定要删除营业执照？</span>',
		//点击确定后回调函数
		confirm: function(){
			$('#preview').html("<img src='img/account/up.png'/><p>点击上传营业执照<br />（有年检章,.jpg/.png格式，小于5M）</p>");
			//确定按钮事件
			$('.company_card').attr('onclick',"$('#previewImg').click();");
		},
	});
}


//提交数据
function clickToSubmitData(){
	if (document.getElementById('imghead') == null) {
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
						alert('了解了');
					},
				});
				
				$('.dialog-btn-cancel').css("display",'none');
				$('.dialog-box-content span').text('恭喜您提交成功，推广顾问已接收到您的信息！现在可以先准备推广资料了哦！');
				$('.dialog-btn-confirm').text("马上了解");
			},
		});
		
		$('.dialog-btn-confirm').text("确认提交");
	} else{
		alert(2);
	}
}
//修改密码
function clickToResetPsd(){
	$('.auto-close-dialogBox').dialogBox({
		type: 'normal',
		width: 300,
		height: 180,
		autoHide: true,
		time: 3000,
		content: '<img src="img/public/correct.png"/><span>密码修改成功</span>',
	});
}


//图片上传
var imgSrc;
//图片上传预览    IE是用了滤镜。
function previewImage(file)
{
  var MAXWIDTH  = 285; 
  var MAXHEIGHT = 130;
  var div = document.getElementById('preview');
  
  if (file.files && file.files[0])
  {
      div.innerHTML ="<img id=imghead>";
      var img = document.getElementById('imghead');             
      var reader = new FileReader();
      reader.onload = function(evt){
      	img.src = evt.target.result;
      	imgSrc = evt.target.result;
      	img.height = MAXHEIGHT;
      }
      
      reader.readAsDataURL(file.files[0]);
      $('.company_card').removeAttr("onclick");
      $('#imghead').mouseover(function(){
        		$('#zhezhao').show().mouseleave(function(){
        		$('#zhezhao').hide();
        	});
      });
		
  }
  else //兼容IE
  {
//  var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
//  file.select();
//  var src = document.selection.createRange().text;
//  div.innerHTML = '<img id=imghead>';
//  var img = document.getElementById('imghead');
//  img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
//  var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
//  status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
//  div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
  }
}

function lookFullImg(){
	$('.look_full_img img').attr('src',imgSrc);
	var imgObj = new Image();
  	imgObj.src = $('.look_full_img img').attr('src');	
	
	var winH = $(window).height();
	var marginTop;
	if (imgObj.height >= winH) {
		marginTop = 0;
		$('.look_full_img img').css('height',winH);
	}else{
		marginTop = (winH - imgObj.height) / 2 - 100;
	}
	
	$('.look_full_img img').css('margin-top',marginTop);
	$('.look_full_img').show();
}

function closeFullImg(){
	$('.look_full_img').hide();
}