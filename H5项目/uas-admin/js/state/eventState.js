////////////////////////-accountList.html-////////////////////////////////
$("#header").load("../nav.html #header");
$("#nav").load("../nav.html #navbar", function() {
	//加载菜单UI
	$("#navbar ul li:first-child dd:nth-child(3)").addClass("layui-this");
});
$("#footer").load("../nav.html #footer");

//JavaScript代码区域
layui.use(['element', 'form'], function() {
	var element = layui.element,
		form = layui.form;
});

//请求同步
$.ajaxSetup({
	async: false
});

var pieDateRange = {};

$(function() {
	initNow();

	var xData = ['支付失败', '订单取消', '开通会员', '会员过期', '会员续费', '会员登录'];
	var seriesData = [5, 20, 36, 10, 10, 20];
	initAllEventChart(xData, seriesData);
	//	initEventChart();
	initPieDate();

	function initPieDate() {
		$('#pie .date01').jeDate({
			format: "YYYY.MM.DD",
			multiPane: false,
			range: " - ",
			isClear: false,
			//maxDate: sevenDays[6].replace(/\./g, '-'),
			maxDate: sevenDays[6].replace(/\./g, '-'),
			okfun: function(obj) {
				var start = obj.date[0],
					end = obj.date[1];
				pieDateRange.start = start.YYYY + '-' + start.MM + '-' + start.DD;
				pieDateRange.end = end.YYYY + '-' + end.MM + '-' + end.DD;

				//初始化柱状图
				showChart();
				var eventType = $("#eventTypeId").val();
				var accountNo = $("#accoountNoId").val();
				var productCode = $("#productCodeId").val();
				var appId = $("#appId").val();
				var checkbox = $("#checkbox").val();

				if(eventType == "") {
					allEventDataList = initAllEventList(pieDateRange.start, pieDateRange.end);
					var xData = new Array;
					var seriesData = new Array;
					if(allEventDataList != "" && typeof(allEventDataList) != "undefined" && allEventDataList.length > 0) {
						for(var i = 0; i < allEventDataList.length; i++) {
							xData[i] = allEventDataList[i].event;
							seriesData[i] = allEventDataList[i].count;
						}
					}
					initAllEventChart(xData, seriesData);
				} else {
					var filters = {
						tab: 0,
						startTime: pieDateRange.start,
						endTime: pieDateRange.end
					};
					dateList = getXAxis(filters);
					eventDataList = initSingleEventList(pieDateRange.start, pieDateRange.end);
					var seriesData = new Array;
					if(eventDataList != "" && typeof(eventDataList) != "undefined" && eventDataList.length > 0) {
						for(var i = 0; i < eventDataList.length; i++) {
							seriesData[i] = eventDataList[i].eventCount;
						}
					}
					initEventChart(dateList, seriesData);
				}
			}
		});
	}
});
//初始化图标
function initAllEventChart(xData, seriesData) {
	// 基于准备好的dom，初始化echarts实例
	var billApp = echarts.init(document.getElementById("main"));

	// 指定图表的配置项和数据		
	billApp.title = '坐标轴刻度与标签对齐';
	var option = {
		color: ['#009688'],
		title: {
			text: '各个事件数据'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: xData,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '单个数据',
			type: 'bar',
			barWidth: 40,
			data: seriesData
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	billApp.setOption(option);
};

function initEventChart(xData, seriesData) {
	// 基于准备好的dom，初始化echarts实例
	var billApp = echarts.init(document.getElementById("eventMain"));

	// 指定图表的配置项和数据		
	billApp.title = '坐标轴刻度与标签对齐';
	var option = {
		color: ['#3398DB', '#009688'],
		title: {
			text: '单个事件数据'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		calculable: true,
		xAxis: [{
			type: 'category',
			data: xData,
			axisTick: {
				alignWithLabel: true
			}
		}],
		yAxis: [{
			type: 'value'
		}],
		series: [{
			name: '单个数据',
			type: 'bar',
			barWidth: 40,
			data: seriesData
		}]
	};
	// 使用刚指定的配置项和数据显示图表。
	billApp.setOption(option);
};

//根据eventType选项来显示图标
function showChart() {
	var eventType = $("#eventTypeId").val();
	if(eventType == "") {
		$("#main").show();
		$("#eventMain").hide();
		initAllEventChart();
	} else {
		$("#main").hide();
		$("#eventMain").show();
		initEventChart();
	}
}

// 获取所有事件数据数据
function initAllEventList(startDate, endDate) {
	//设置为同步
	var allEventDataList = new Array;

	$.post('http://getAllEventList', {
		"startDate": startDate,
		"endDate": endDate
	}, function(result) {
		allEventDataList = result.Data;
	}, 'json');
	return allEventDataList;
};

// 获取单个事件数据
function initSingleEventList(startDate, endDate) {
	//设置为同步
	var singleEventDataList = new Array;
	$.post('http://getEventList', {
		"startDate": startDate,
		"endDate": endDate
	}, function(result) {
		singleEventDataList = result.Data;
	}, 'json');
	return singleEventDataList;
};