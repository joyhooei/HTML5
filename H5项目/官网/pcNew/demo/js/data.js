$(document).ready(function(){
	$('.data').addClass("active_header_blue");
	
	var isFirstLogin = 0;
	if (isFirstLogin) {
		//启用欢迎页面
		$('.dialogbox_welcome').dialogBox({
			type: 'normal',
			width: 900,
			height: 350,
			hasMask: true,
			hasClose: true,
			hasBtn: false,
			content: '<div class="welcome_window"><p class="welcome_title">欢迎来到流量市场的净土——UBK用户银行</p><p class="welcome_msg">现在，您只需填写基础资料，专属推广顾问就会联系您，与您沟通推广细节</p><button class="welcome_connect_ubk" onclick="connectUBK()">主动联系推广顾问</button><div id="ubk_bd" class=""><img src="img/header/per1.png"/><div class="bd_msg"><div id="bd_name">Vicky</div><div id="bd_position">UBK推广顾问</div><ul id="bd_number"><li id="bd_mobile">手机：15601600319</li><li id="bd_qq">QQ：549891531</li><li id="bd_wechat">微信：15601600319</li><li id="bd_email">邮箱：vickycheng@feelwx.com</li></ul></div></div><a class="color_blue_bg to_account_info" href="accountInfo.html">去完善资料</a></div>',
			title:' ',
		});
	}
	
	//设置左边总体数据
	var totalDownload = 1212;
	var cpd = 2;
	var balance = 1000;
	
	$('#totalDownload').text(comdify(totalDownload.toString()));
	$('#cpd').html(cpd + "<span>元</span>");
	$('#balance').html(comdify(balance.toFixed(2)) + "<span>元</span>");
	
	//设置echart位置
	$('#echart div').css({'top':'10px'});
	$('#echart canvas').css({'top':'10px'});

	//初始化表格的第一列：日期，从昨天开始
	$('#table2_demo tbody tr:nth-child(1) td:first-child').text(GetDateStr(-1));
	$('#table2_demo tbody tr:nth-child(2) td:first-child').text(GetDateStr(-2));
	$('#table2_demo tbody tr:nth-child(3) td:first-child').text(GetDateStr(-3));
	$('#table2_demo tbody tr:nth-child(4) td:first-child').text(GetDateStr(-4));
	$('#table2_demo tbody tr:nth-child(5) td:first-child').text(GetDateStr(-5));
	$('#table2_demo tbody tr:nth-child(6) td:first-child').text(GetDateStr(-6));
	$('#table2_demo tbody tr:nth-child(7) td:first-child').text(GetDateStr(-7));
	
});


function connectUBK(){
	if ($('#ubk_bd').hasClass('bd_card_show')) {
		$('#ubk_bd').css('display','none').removeClass('bd_card_show');
		$('.dialog-box-container').css('height','350px').parent().animate({marginTop:"-175px"});
		
	} else{
		$('.dialog-box-container').css('height','550px').delay(1000).parent().animate({marginTop:'-240px'});
		setTimeout(function(){
			$('#ubk_bd').css('display','block').addClass('bd_card_show');
		},200);
		
	}
}

//转成千分制
function comdify(n){
	var re=/\d{1,3}(?=(\d{3})+$)/g;
	var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
	return n1;
}

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

//选择渠道
function selectChannel(){
    var channel= document.getElementById("channel");
    var channelValue = channel.options[channel.selectedIndex].value;
}

//获取今天的前后几天日期
function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	m = (Array(2).join(0)+m).slice(-2);//获取当前月份的日期 
	var d = (Array(2).join(0)+dd.getDate()).slice(-2); 
	return y+"-"+m+"-"+d; 
} 

//日期选择设置
$(function () {
// 选择日期范围
$('#date_input').daterangepicker({
    locale : {
        "format" : 'YYYY-MM-DD',
        "applyLabel": "确定",
    		cancelLabel: "取消",
        daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
    		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    startDate: GetDateStr(-7),
    endDate: GetDateStr(-1),
    minDate: '01/01/2015',
    maxDate: GetDateStr(-1),
    dateLimit: {"days": 90,},//可选择的日期范围
    
},function(start, end, label){
    console.log(start.format('YYYY-MM-DD') + ' 至 ' + end.format('YYYY-MM-DD'));
    //下面可以请求数据库获取数据
	});
});

//折线图
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('echart'));
var dataArr = [65, 71, 42, 61, 73, 70, 66];
if(dataArr.length != 0){
	$('#echart').css("background",'none');
}

var date = new Array(GetDateStr(-1),GetDateStr(-2),GetDateStr(-3),GetDateStr(-4),GetDateStr(-5),GetDateStr(-6),GetDateStr(-7));
// 指定图表的配置项和数据
var option = {
title : {
    text: '',
	color:'#595959',
    x:45,
    y:10,
    textStyle: {
    		fontFamily:'microsoft yahei',
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: 'normal',
		},
},
//提示
tooltip : {
    trigger: 'axis',
},
color:'#0012ff',
//直角坐标系内绘图网格
grid:{borderWidth:0},
//工具箱
toolbox: {show : false,},
calculable : false,//禁止拖动计算
xAxis : 
    {
        type : 'category',
        boundaryGap : false,
        data : date,
        axisLine:{show:false},//x轴不显示
        splitLine : {show:false,},
    }
,
yAxis : [
    {
    		z:3,
        type : 'value',
        axisLine:{show:false},
        splitLine : {
            show:true,
            lineStyle: {
                color: 'rgba(141,169,208,0.5)',
                type: 'dashed',
                width: 1
            }
        },
    }
],
series : [
    {
        name:'数据',
        type:'line',
        smooth:true,
        itemStyle: {
        		normal: {
        			color:'#0800b3',
        			areaStyle: {color:'#2f7fef',},
            		lineStyle:{color:'#0012ff',width:5,},
            		borderColor:'#fff',
            		borderWidth:2,
            		}
			},
      	data:dataArr,
      	symbolSize:6,
	},
        
    ],
	
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

//鼠标移入问号时tips小提示框交互
$('#download_question').mouseenter(function(){
	layer.tips('应用宝和小米渠道可以查看点击数据，其他渠道无此数据。', '#download_question', {tips: [2, '#FFF'],time:222220});
	$('.layui-layer-content').css({'color':"#777","width":"500px","height":"70px","lineHeight":"43px","box-shadow": "0px 3px 25px rgba(0,0,0,0.2)","text-align": "left","top":"-10px","padding":"12px 55px","text-align":"justify","font-size":"14px"});
}).mouseleave(function(){layer.close(layer.index)});
//});

//鼠标移入问号时tips小提示框交互
$('#detail_question').mouseenter(function(){
	layer.tips('应用宝官方的曝光、点击、下载、扣费数据在过去7天都可能有小幅度变动。UBK应用宝数据与官方一致，因此也会相应变动，请知悉。', '#detail_question', {tips: [2, '#FFF'],time:222220});
	$('.layui-layer-content').css({'color':"#777","width":"440px","height":"92px","lineHeight":"23px","box-shadow": "0px 3px 25px rgba(0,0,0,0.2)","text-align": "left","top":"-10px","padding":"13px 18px","text-align":"justify","font-size":"14px"});
}).mouseleave(function(){layer.close(layer.index)});
//});