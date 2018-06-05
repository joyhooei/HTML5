var data = '[{"noun":"1","word":"宪法法院","time":"2018-01-04  11:21:23"},{"noun":"2","word":"粉碎四人帮","time":"2018-01-04  11:26:04"},{"noun":"3","word":"南街村","time":"2018-01-04  12:28:19"},{"noun":"4","word":"亡党亡国","time":"2018-01-04  18:11:38"},{"noun":"5","word":"十7大","time":"2018-01-04  18:37:15"},{"noun":"6","word":"形式主义","time":"2018-01-04  18:45:11"},{"noun":"7","word":"四风","time":"2018-01-04  19:00:42"},{"noun":"8","word":"谭作人","time":"2018-01-04  19:59:57"},{"noun":"9","word":"9学","time":"2018-01-04  20:11:38"},{"noun":"10","word":"zf大楼","time":"2018-01-04  20:37:46"},{"noun":"11","word":"城管暴力执法","time":"2018-01-04  22:10:54"},{"noun":"12","word":"独夫民贼","time":"2018-01-05  10:07:24"},{"noun":"13","word":"最淫官员","time":"2018-01-05  12:01:16"},{"noun":"14","word":"4风","time":"2018-01-05  12:41:12"},{"noun":"15","word":"贪污腐败","time":"2018-01-05  13:32:32"},{"noun":"16","word":"权贵集团","time":"2018-01-05  16:43:11"},{"noun":"17","word":"高智晟","time":"2018-01-05  18:09:46"},{"noun":"18","word":"官商勾结","time":"2018-01-05  19:03:18"},{"noun":"19","word":"高勤荣","time":"2018-01-05  20:23:22"},{"noun":"20","word":"九学","time":"2018-01-05  21:56:20"},{"noun":"21","word":"打倒中国","time":"2018-01-05  22:30:38"},{"noun":"22","word":"特供","time":"2018-01-06  09:55:59"},{"noun":"23","word":"喝血社会","time":"2018-01-06  10:47:05"},{"noun":"24","word":"九风","time":"2018-01-06  11:18:18"},{"noun":"25","word":"毒豺","time":"2018-01-06  13:03:01"},{"noun":"26","word":"苏晓康","time":"2018-01-06  13:50:26"},{"noun":"27","word":"17da","time":"2018-01-06  15:22:57"},{"noun":"28","word":"胡平","time":"2018-01-06  17:23:23"},{"noun":"29","word":"一党专政","time":"2018-01-06  19:51:14"},{"noun":"30","word":"殃视","time":"2018-01-06  20:01:39"},{"noun":"31","word":"王炳章","time":"2018-01-06  20:32:15"},{"noun":"32","word":"辛灝年","time":"2018-01-06  21:00:47"},{"noun":"33","word":"上海帮","time":"2018-01-06  21:11:22"},{"noun":"34","word":"官匪","time":"2018-01-06  21:20:08"},{"noun":"35","word":"张志新","time":"2018-01-06  21:36:02"},{"noun":"36","word":"灭亡中国","time":"2018-01-06  22:32:11"},{"noun":"37","word":"社会主义灭亡","time":"2018-01-07  10:46:02"},{"noun":"38","word":"一党专制","time":"2018-01-07  11:59:48"},{"noun":"39","word":"清华帮","time":"2018-01-07  12:09:23"},{"noun":"40","word":"特贡","time":"2018-01-07  12:48:15"},{"noun":"41","word":"双规","time":"2018-01-07  15:28:04"},{"noun":"42","word":"太子党","time":"2018-01-07  18:56:21"},{"noun":"43","word":"强制拆除","time":"2018-01-07 20:27:43"},{"noun":"44","word":"强制捐款","time":"2018-01-07 20:34:45"},{"noun":"45","word":"一党执政","time":"2018-01-07 22:32:45"},{"noun":"46","word":"河蟹社会","time":"2018-01-08 09:22:12"},{"noun":"47","word":"专制政权","time":"2018-01-08 09:35:21"},{"noun":"48","word":"红色贵族","time":"2018-01-08 10:56:34"},{"noun":"49","word":"北京帮","time":"2018-01-08 11:18:49"},{"noun":"50","word":"特共","time":"2018-01-08 11:56:20"},{"noun":"51","word":"十七大","time":"2018-01-08 16:05:28"},{"noun":"52","word":"贺卫方","time":"2018-01-08 17:29:51"},{"noun":"53","word":"激流中国","time":"2018-01-08 18:36:25"},{"noun":"54","word":"9风","time":"2018-01-08 18:38:22"},{"noun":"55","word":"焦国标","time":"2018-01-08 19:13:56"},{"noun":"56","word":"万润南","time":"2018-01-08 19:37:32"},{"noun":"57","word":"警匪","time":"2018-01-08 19:50:56"},{"noun":"58","word":"政治风波","time":"2018-01-08 21:09:47"}]';

//加载菜单栏
$("#header").load("nav.html #header");
$("#nav").load("nav.html #navbar", function(){
	$("#navbar ul li dd:first-child").addClass("layui-this");
});	
$("#footer").load("nav.html #footer");

layui.use(['table','form'], function(){
  	var table = layui.table;
  	var form = layui.form;
  	
	//第一个实例
  	table.render({
	    	elem: '#productList',
	    	page: true, //开启分页
	    	limit: 10,
	    cols: [[ //表头
	      	{field: 'noun', title: '序号',sort: true,align:"center",},
	      	{field: 'word', title: '关键词',align:"center",},
	      	{field: 'time', title: '时间',align:"center"},
	      	{field: 'operation', title: '操作',align:"center",toolbar: '#operation',}
	    ]],
	    data: JSON.parse(data),
	});
	
  	//监听工具条
	table.on('tool(lay-list)', function(obj){
		//注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
	  	var data = obj.data; //获得当前行数据，json数据
	  	var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		
		console.log(data);
	  	if(layEvent === 'del'){ //删除
	    		layer.confirm('确定删除吗？', function(index){
	      		obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
	      		layer.close(index);
	      		//向服务端发送删除指令
	      		layer.msg("已删除");
	    		});
	  	} else if(layEvent === 'edit'){ //编辑
	  		var status = data.status == 1 ? 'checked="true"' : '';
	  		var conf1 = data.config;
	  		var conf2 = "";
	  		var content = '<form class="layui-form alert-form" action=""><div class="layui-form-item"><label class="layui-form-label">关键字</label><div class="layui-input-inline"><input type="text" name="word" required="" lay-verify="required" placeholder="请输入关键字" autocomplete="off" class="layui-input" value="'+ data.word +'" /></div></div><div class="layui-form-item"><div class="layui-input-block" style="float:right"><button class="layui-btn" lay-submit="" lay-filter="editForm">立即提交</button></div></div></form>';
	  		
	  		var editWindow = layer.open({
			  	type: 1, 
			  	shadeClose:true,
			  	title:"编辑",
			  	area: '500px',
			  	content: content,
			});
			//更新渲染
		    form.render('checkbox');
		    
		    //监听提交
		  	form.on('submit(editForm)', function(data){
		    		console.log(data.field);
		    		
		    		//同步更新缓存对应的值
			    obj.update({
			      	word: data.field.word
			    });
				layer.close(editWindow);
			    //在这里写提交表单
			    return false;

		  	});
	  	}
	});
  
});


//添加产品
function add(){
			
	var index = layer.open({
		type: 1, 
		shadeClose:true,
		title:"填写产品详情",
		area: '500px',
		content: '<form class="layui-form alert-form" action=""><div class="layui-form-item"><label class="layui-form-label">序号</label><div class="layui-input-inline"><input type="text" name="noun" required lay-verify="required" placeholder="请输入序号" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">关键词</label><div class="layui-input-inline"><input type="text" name="word" required lay-verify="required" placeholder="请输入关键词" autocomplete="off" class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">时间</label><div class="layui-input-inline"><input type="text" name="time" class="layui-input" required lay-verify="required" id="dateTime" placeholder="2017-12-28 15:27:05"></div></div><div class="layui-form-item"><div class="layui-input-block" style="float:right"><button class="layui-btn" lay-submit lay-filter="submitForm">立即提交</button></div></div></form>',
	});
	
	//表单
	layui.use(['form','table', 'laydate'], function(){
		var form = layui.form;
  		//时间选择器
  		layui.laydate.render({
	    		elem: '#dateTime',
	    		type: 'datetime'
  		});

	  	//监听提交
	  	form.on('submit(submitForm)', function(result){
	    		data = data.substring(0,data.length-1) + "," + JSON.stringify(result.field) + "]";
	    		alert(data);
	    		layui.table.render({
			    	elem: '#productList',
			    	page: true, //开启分页
			    	limit: 10,
			    cols: [[ //表头
			      	{field: 'noun', title: '序号',sort: true,align:"center",},
			      	{field: 'word', title: '关键词',align:"center",},
			      	{field: 'time', title: '时间',align:"center"},
			      	{field: 'operation', title: '操作',align:"center",toolbar: '#operation',}
			    ]],
			    data: JSON.parse(data),
			});
			layer.close(index);
			return false;
	  	});
	
	});
}


//搜索
function search(){
	var word = $("#word").val();
	if (word.length == 0) {
		return;
	}
	
	var jsonData = JSON.parse(data);
	var newData = "[";
	for (var i = 0; i < jsonData.length; i++) {
		if (jsonData[i]['word'] == word){
			newData = newData + JSON.stringify(jsonData[i]) + ",";
		}
	}
	newData = newData.substring(0,newData.length-1);
	if (newData.length != 0) {
		newData += "]";
	}else{
		newData = "[]";
	}
	
	console.log(JSON.parse(newData));
	//表单
	layui.use('table', function(){
		
		layui.table.render({
		    	elem: '#productList',
		    	page: true, //开启分页
		    	limit: 10,
		    cols: [[ //表头
		      	{field: 'noun', title: '序号',sort: true,align:"center",},
		      	{field: 'word', title: '关键词',align:"center",},
		      	{field: 'time', title: '时间',align:"center"},
		      	{field: 'operation', title: '操作',align:"center",toolbar: '#operation',}
		    ]],
		    data: JSON.parse(newData),
		});
	});
}
