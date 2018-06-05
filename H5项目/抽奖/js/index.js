//var basepath = "https://www.*****.cn/cjq/gua";
// var basepath = "http://192.168.1.100:8085/portal-bos";
//转盘抽奖  /cjqh5/act/bigTurntable/doPrize.action   loginName
//中奖用户 /cjqh5/act/bigTurntable/getPrizeWall.action
//兑奖记录/cjqh5/act/bigTurntable/getPrizeRecord.action   loginName
// 倒计时
var interval = 1000;



//超级返现规则
$("#gz-b").on('click', function() {
	$(".zz").show();
	$(".cjfx").show();
});
$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".cjfx").hide();
});
//大转盘规则
$("#look-gz").on('click', function() {
	$(".zz").show();
	$(".zpgz").show();
});
$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".zpgz").hide();
});

$(".cjgz-c").on('click', function() {
	$(".zz").hide();
	$(".zj").hide();
});

//领取及记录
$("#exchange").on('click', function () {
    post({
        url:'/actapply/api/exchange',
        data:{
            "activityNo": "2018011705",
            "resourceNo": "124",
            "platform": "h5",
            "channel": "pc",
            "user": {
                "userId": "u666",
                "type": 1,
                "level": 1,
                "growValue": 10
            },
            "operation": "pay",
            "operationData": "1"
        },
        async:false,
        dataType: 'json',
        success:function (result) {
            if (result.RetCode == 0) {
                var code = result.Data.Code;
                alert("获取dnf暴走药水，兑换码："+ code);
                console.log(code);
            }else {
            	console.log(result.RetCode);
                alert(result.ErrMsg);
			}
        }
    });

    var total = 0;
    var remain = 0;
    post({
        url:'/actapply/api/getResourceList',
        data:{
            "activityNo": "2018011705"
        },
        async:false,
        dataType: 'json',
        success:function (result) {
            if (result.RetCode == 0) {
                total = result.Data[0].Total;
                total_used = result.Data[0].TotalUsed;
                remain = total - total_used;
            }else {
                console.log(result.RetCode);
                alert(result.ErrMsg);
            }
        }
    });
    $('#total').html(total);
    $('#remain').html(remain);
});


//无次数弹框
$(".cjgz-c").on('click', function() {
	$(".wcs").hide();
	$(".zz").hide();
});

//获取参数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
var login = getQueryString("login");
var loginName = getQueryString("loginName");
var isapp = getQueryString("isapp");
var memberId = getQueryString("memberId");

//是否在APP&是否登录 
if (isapp == 1) {
	if (login == 1) {
		$("#tzbtn").attr("href", "cjq:terminal");
	} else {
		$("#tzbtn").attr('href', 'cjq:login');
	}
} else {
	$("#share").hide();
	//$("#tzbtn").attr("href", "https://*****.html");
}

// 滚动-start
// 左边
var speedi = 80;
var colee2 = document.getElementById("colee2");
var colee1 = document.getElementById("colee1");
var colee = document.getElementById("colee");
colee2.innerHTML = colee1.innerHTML; //克隆colee1为colee2
function Marquee1() {
	//当滚动至colee1与colee2交界时
	if (colee2.offsetTop - colee.scrollTop <= 0) {
		colee.scrollTop -= colee1.offsetHeight; //colee跳到最顶端
	} else {
		colee.scrollTop++
	}
}
var MyMar1 = setInterval(Marquee1, speedi);//设置定时器
	// 右边
var coleer2 = document.getElementById("coleer2");
var coleer1 = document.getElementById("coleer1");
var coleer = document.getElementById("coleer");
coleer2.innerHTML = coleer1.innerHTML; //克隆colee1为colee2
function Marqueer1() {
	//当滚动至colee1与colee2交界时
	if (coleer2.offsetTop - coleer.scrollTop <= 0) {
		coleer.scrollTop -= coleer1.offsetHeight; //colee跳到最顶端
	} else {
		coleer.scrollTop++
	}
}
var MyMarr1 = setInterval(Marqueer1, speedi); //设置定时器
	// console.log(num+"  "+arr[num])
	// 滚动-end
	// 中奖用户
jp = {
	'1': ["0", "0.1%加息券"],
	'2': ["1", "0.2%加息券"],
	'3': ["2", "0.3%加息券"],
	'4': ["3", "谢谢参与"],
	'5': ["4", "Iphone8"],
	'6': ["5", "0.5元"],
	'7': ["6", "0.1元"],
	'8': ["7", "10元"]
};


//抽奖代码
$(function() {
	var $btn = $('.g-lottery-img'); // 旋转的div
	var isture = 0; //是否正在抽奖

    var retCode = -1;
    var errMsg = "";
	var ticket = "";

    post({
        url:'/actapply/api/getUserTicket',
        //abc 的accountid 为1
        data:{
            "user":"abc",
            "pwd":"abc"
        },
        async:false,
        dataType: 'json',
        success:function (result) {
            retCode = result.RetCode;
            errMsg = result.ErrMsg;
            if (result.RetCode == 0 && result.Data != null) {
                ticket = result.Data.userTicket;
                console.log(ticket)
            }
            else {
                console.log("get ticket wrong!");
                console.log(result.RetCode);
            }
        }
    });
    if (ticket === ""){
        alert("get ticket wrong! ")
    }

    var token = "";
    post({
        url:'/actapply/api/getAccessToken',
        data:{
            "ticket":ticket
        },
        async:false,
        dataType: 'json',
        success:function (result) {
            retCode = result.RetCode;
            errMsg = result.ErrMsg;
            if (result.RetCode == 0 && result.Data != null) {
                token = result.Data.AccessToken;
                setToken(token);
                console.log(token)
            }
            else {
                console.log("get token wrong!");
                console.log(result.RetCode);
            }
        }
    });

    if (token === ""){
        alert("get token wrong! ")
    }

    var cishu = 0; //抽奖初始次数，由后台传入
    post({
        url:'/actapply/api/getUserRemainTimes',
        data:{
            "activityNo":"2018011501",
            "userId":"u666"
        },
        async:false,
        dataType: 'json',
        success:function (result) {
            retCode = result.RetCode;
            errMsg = result.ErrMsg;
            if (result.RetCode == 0 && result.Data != null) {
                cishu = result.Data.Times;
                console.log("cishu: ", cishu)
            }
            else {
                console.log(result.RetCode);
            }
        }
    });
    $('#cishu').html(cishu); //显示还剩下多少次抽奖机会

    var total = 0;
    var remain = 0;
    post({
        url:'/actapply/api/getResourceList',
        data:{
            "activityNo": "2018011705"
        },
        async:false,
        dataType: 'json',
        success:function (result) {
            if (result.RetCode == 0) {
                total = result.Data[0].Total;
                total_used = result.Data[0].TotalUsed;
                remain = total - total_used;
                console.log(total);
                console.log(remain);
            }else {
                console.log(result.RetCode);
                alert(result.ErrMsg);
            }
        }
    });
    $('#total').html(total);
    $('#remain').html(remain);


	var clickfunc = function() {
        var sortIndex = -1;
        post({
            url:'/actapply/api/lotto',
            data:{
                "activityNo": "2018011501",
                "platform": "h5",
                "channel": "pc",
                "user": {
                    "userId": "u666",
                    "type": 1,
                    "level": 1,
                    "growValue": 10
                },
                "operation": "pay",
                "operationData": "1"
            },
            async:false,
            dataType: 'json',
            success:function (result) {
                retCode = result.RetCode;
                errMsg = result.ErrMsg;
                if (result.RetCode == 0 && result.Data != null) {
                    sortIndex = result.Data.SortIndex;
                    console.log(sortIndex)
                }
                else {
					console.log(result.RetCode);
				}
            }
        });
		// var data = [1, 2, 3, 4, 5, 6, 7, 8,]; //抽奖
		// //data为随机出来的结果，根据概率后的结果
		// data = data[Math.floor(Math.random() * data.length)]; //1~8的随机数

        switch (sortIndex) {
            case -1:
            //rotateFunc(暂时无用 , 角度, 显示内容)
                rotateFunc(1, 0, errMsg);
                break;
            case 0:
                rotateFunc(1, 0, '谢谢参与');
                break;
            case 8:
                rotateFunc(1, 25, '双季丰0.1%加息红包');
                break;
            case 2:
                rotateFunc(2, 70, '双季丰满减红包10元');
                break;
            case 5:
                rotateFunc(3, 115, '1元现金红包');
                break;
            case 4:
                rotateFunc(4, 160, '财金币20枚');
                break;
            case 1:
                rotateFunc(5, 203, '20元现金红包');
                break;
            case 7:
                rotateFunc(6, 245, '双季丰0.5%加息红包');
                break;
            case 3:
                rotateFunc(7, 290, '双季丰满减红包50元');
                break;
            case 6:
                rotateFunc(8, 340, '5元现金红包');
                break;
        }
	};
	$(".zhizhen").click(function() {
		//判断是否投资然后是fou抽奖========================================================
		var touzi = "没投资11";
		if (touzi == "没投资") {
			$(".zz").show();
			$(".today").show();
			$(".cjgz-c").on('click', function() {
				$(".zz").hide();
				$(".today").hide();
			});
			$(".ok-img").on('click', function() {
				$(".zz").hide();
				$(".today").hide();
			});
		} else {
			$(".zz").hide();
			$(".today").hide();
			if (isture) return; // 如果在执行就退出
			isture = true; // 标志为 在执行
			if (cishu <= 0) { //当抽奖次数为0的时候执行
				$(".zz").show();
				$(".wcs").show();
				$(".ok-img").on('click', function() {
					$(".wcs").hide();
					$(".zz").hide();
				});
				// alert("没有次数了");
				$('#cishu').html(0); //次数显示为0
				isture = false;
			} else { //还有次数就执行
				cishu = cishu - 1; //执行转盘了则次数减1
				if (cishu <= 0) {
					cishu = 0;
				}
				$('#cishu').html(cishu);
				clickfunc();
			}
		}
	});
	var rotateFunc = function(awards, angle, text) {
		isture = true;
		$btn.stopRotate();
		$btn.rotate({
			angle: 0, //旋转的角度数
			duration: 8000, //旋转时间
			animateTo: angle + 1440, //给定的角度,让它根据得出来的结果加上1440度旋转
			callback: function() {
				isture = false; // 标志为 执行完毕
				// alert(text);
				$(".texts").html("恭喜您，已获得<br>" + text);
					// console.log(text)
				$(".zz").show();
				$(".jl-tk").show();
				$(".cjgz-c").on('click', function() {
					$(".zz").hide();
					$(".jl-tk").hide();
				});
				$(".ok-img").on('click', function() {
					$(".zz").hide();
					$(".jl-tk").hide();
				});
			}
		});
	};
});