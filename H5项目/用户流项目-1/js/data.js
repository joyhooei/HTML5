$(document).ready(function(){
	$('.data').addClass("active_header");
});

$(".company").hover(function(){
	$(".company ul").slideToggle();
});
$(".ubk-person").hover(function(){
	$(".ubk_per_card").slideToggle();
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
    alert(channelValue);
   }

//日期选择设置
$(function () {
// 选择日期范围
$('#date_input').daterangepicker({
    locale : {
        "format" : 'YYYY年MM月DD日',
        "applyLabel": "确定",
    		cancelLabel: "取消",
        daysOfWeek: ['日', '一', '二', '三', '四', '五','六'],
    		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    },
    startDate: moment(),
    endDate: moment(),
    minDate: '01/01/2015',
    maxDate: moment(),
    dateLimit: {"days": 30,},//可选择的日期范围
    
},function(start, end, label){
    console.log(start.format('YYYY-MM-DD') + ' 至 ' + end.format('YYYY-MM-DD'));
    //下面可以请求数据库获取数据
	});
});

//折线图
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('echart'));

// 指定图表的配置项和数据
var option = {
title : {
    text: '下载趋势',
	color:'gray',
    x:80,
    y:20,
    textStyle: {
		fontSize: 16,
		fontStyle: 'normal',
		fontWeight: 'lighter',
		},
},
//提示
tooltip : {
    trigger: 'axis',
    borderRadius: 10,
},
//工具箱
toolbox: {
    show : false,
    feature : {
        mark : {show: true},
        dataView : {show: true, readOnly: false},
        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        restore : {show: true},
        saveAsImage : {show: true}
    }
},
calculable : true,
xAxis : [
    {
        type : 'category',
        boundaryGap : false,
        data : ['2016-11-30','2016-12-1','2016-12-2','2016-12-3','2016-12-4','2016-12-5','2016-12-6'],
        axisLine:{show:false},//x轴不显示
        splitLine : {show:false,}
    }
],
yAxis : [
    {
        type : 'value',
        axisLine:{show:false},
        splitLine : {
            show:true,
            lineStyle: {
                color: 'gray',
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
        			areaStyle: {
        				color:'rgba(2,127,235,.7)',
            			},
            			lineStyle:{
            			},
            			}
            		},
            data:[14, 12, 17, 15, 22, 28, 12]
        }
    ],
	
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

