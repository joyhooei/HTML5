////////////////////////-accountList.html-////////////////////////////////
$("#header").load("../nav.html #header");
$("#nav").load("../nav.html #navbar", function() {
	//加载菜单UI
	$("#navbar ul li:first-child dd:nth-child(2)").addClass("layui-this");
});
$("#footer").load("../nav.html #footer");

//JavaScript代码区域
layui.use(['element', 'form'], function() {
	var element = layui.element,
		form = layui.form;
});

var pieDateRange = {};

$(function() {

	initNow();

	var seriesData = [5, 20, 36, 10, 10, 20];
	var seriesData2 = [57, 150, 136, 110, 110, 200];
	var dayList = sevenDays;
	initChart(dayList, seriesData, seriesData2);
	initPieDate();

	//获取订单数据
	var appId = "";
	var productCode = "";
	initBillData(appId, productCode);

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

				var filters = {
					tab: 0,
					startTime: pieDateRange.start,
					endTime: pieDateRange.end
				}
				dateList = getXAxis(filters);
				billDataList = initBillList(pieDateRange.start, pieDateRange.end);
				var billCountList = new Array();
				var totalCountList = new Array();
				if(billDataList != "" && typeof(billDataList) != "undefined" && billDataList.length > 0) {
					for(var i = 0; i < billDataList.length; i++) {
						billCountList[i] = billDataList[i].billCount
						totalCountList[i] = billDataList[i].totalAmount
					}
				}

				initChart(dayList, billCountList, totalCountList);

			}
		});
	}
});

//初始化图标
function initChart(dayList, seriesData, seriesData2) {
	// 基于准备好的dom，初始化echarts实例
	var billApp = echarts.init(document.getElementById("main"));
	//var xData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	var xData = dayList;

	// 指定图表的配置项和数据		
	billApp.title = '坐标轴刻度与标签对齐';
	var option = {
		color: ['#3398DB', '#009688'],
		title: {
			text: '订单数据'
		},
		legend: {
			data: ['单个数据', '总数'],
			align: 'left',
			left: 10
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
				data: seriesData
			},
			{
				name: '总数',
				type: 'bar',
				data: seriesData2
			}
		]
	};
	// 使用刚指定的配置项和数据显示图表。
	billApp.setOption(option);
};

// 获取用户数据
function initBillData(appId, productCode) {
	$.post('http://getBillCount', {
		"appId": appId,
		"productCode": productCode
	}, function(result) {
		var count = result.Data.count;
		$("#billCountId").html(count);
	}, 'json')
};

// 获取订单数据
function initBillList(startDate, endDate) {
	//设置为同步
	var dataList = new Array;
	$.ajaxSetup({
		async: false
	});
	$.post('http://getBillList', {
		"startDate": startDate,
		"endDate": endDate
	}, function(result) {
		dataList = result.Data;
	}, 'json');
	return dataList;
	//	var dataList = new Array;
	//	var params = {"startDate":startDate, "endDate":endDate};
	//	$.ajax({
	//		type: "post",
	//		url: "http://getBillList",
	//		data: params,
	//		async: false,
	//		success: function(result) {
	//			JSONObject myJsonObject = new JSONObject(jsonMessage);
	//			resultJson = JSON.valueOf(result);
	//			dataList = resultJson.Data;
	//			return dataList;
	//		}
	//	});
};