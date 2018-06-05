
//获取参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

var $btn = $('.g-lottery-img'); // 旋转的div
var width = document.documentElement.clientWidth;
var height = document.documentElement.clientHeight;
var imgMinSize = height > width ? width : height;
$(".dp-box,.zp-box").width(imgMinSize);

var data = [	
			[8, "jp/1.jpg"],
			[24.36333, "jp/2.jpg"],
			[40.72666, "jp/3.jpg"],
			[57.08999, "jp/4.jpg"],
			[73.45332, "jp/5.jpg"],
			[89.81665, "jp/6.jpg"],
			[106.17998, "jp/7.jpg"],
			[122.54331, "jp/8.jpg"],
			[138.90664, "jp/9.jpg"],
			[155.26997, "jp/10.jpg"],
			[171.6333, "jp/11.jpg"],
			[187.99663, "jp/12.jpg"],
			[204.35996, "jp/13.jpg"],
			[220.72329, "jp/14.jpg"],
			[237.08662, "jp/15.jpg"],
			[253.44995, "jp/16.jpg"],
			[269.81328, "jp/17.jpg"],
			[286.17661, "jp/18.jpg"],
			[302.53994, "jp/19.jpg"],
			[318.90327, "jp/20.jpg"],
			[335.2666, "jp/21.jpg"],
			[351.62993, "jp/22.jpg"]
		];
		
var isRuning = false;
$(".zhizhen").click(function(){
	if (isRuning) {
		return;
	}
	
	isRuning = true;
	console.log(data);
	if(data.length == 0){
		alert("次数已经用完了");
	}
	
	//data为随机出来的结果，根据概率后的结果
	var index = Math.floor(Math.random() * data.length); //0~1的随机数
	if (data.length == 1) {
		index = 0
	}
	var angle = data[index][0];
	var img = data[index][1];
	
	data.splice(index,1);
	
	$btn.rotate({
		angle: 0, //旋转的角度数
		duration: 8000, //旋转时间
		animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
		callback: function() {
			isture = false; // 标志为 执行完毕
			$(".zj-img").attr("src","../img/"+img);
			$(".zz").show();
			$(".jl-tk").show();
			//点击确定关闭弹窗
			$(".zz").on('click', function() {
				$(".zz").hide();
				$(".jl-tk").hide();
			});
			isRuning = false;
		}
	});
});

