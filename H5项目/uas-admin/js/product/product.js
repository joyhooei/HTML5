//加载菜单栏
$("#header").load("../nav.html #header");
$("#nav").load("../nav.html #navbar", function(){
	$("#navbar ul li:nth-child(2) dd:first-child").addClass("layui-this");
});	
$("#footer").load("../nav.html #footer");

//格式方法定义
function jsonStringify(data,space){
    var seen=[];
    return JSON.stringify(data,function(key,val){
        if(!val||typeof val !=='object'){
            return val;
        }
        if(seen.indexOf(val)!==-1){
            return '[Circular]';
        }
        seen.push(val);
        return val;
    },space);
}

layui.use(['table','form'], function(){
  	var table = layui.table;
  	var form = layui.form;
  	
  	//获取数据
  	$.get('http://getProductList', function (result) {
  		console.log(result);
  		var data = result.data;
  		//第一个实例
	  	table.render({
		    	elem: '#productList',
		    cols: [[ //表头
		      	{field: 'code', title: '产品Code',sort: true,align:"center",},
		      	{field: 'name', title: '产品名称',align:"center",},
		      	{field: 'desc', title: '产品描述'},
		      	{field: 'time', title: '开始时间',sort: true,align:"center",} ,
		      	{field: 'config', title: '产品配置',align:"center"},
		      	{field: 'status',title: '产品状态',align:"center",sort: true},
		      	{field: 'operation', title: '操作',align:"center",toolbar: '#operation',}
		    ]],
		    data: data,
		});
		//产品配置详情查看
		$(".layui-badge-rim").mouseenter(function(){
			var dom = this;
			$.post("http://getProductConf",{"productCode":""},function(configData){
				var jsonData = JSON.parse(configData).Data;
				layer.tips(JSON.stringify(jsonData), dom, {tips: [3, '#2F4056'],time:222220});
		    		console.log(JSON.stringify(jsonData));
			});
		}).mouseleave(function(){layer.close(layer.index)});
		
  	}, 'json');
  	
  	//监听工具条
	table.on('tool(lay-list)', function(obj){
		//注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
	  	var data = obj.data; //获得当前行数据，json数据
	  	var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		
		console.log(data);
	  	if(layEvent === 'del'){ //删除
	    		layer.confirm('确定删除'+ data.name +'产品吗？', function(index){
	      		obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
	      		layer.close(index);
	      		//向服务端发送删除指令
	      		layer.msg("已删除");
	    		});
	  	} else if(layEvent === 'edit'){ //编辑
	  		var status = data.status == 1 ? 'checked="true"' : '';
	  		var conf1 = data.config;
	  		var conf2 = "";
	  		var content = '<form class="layui-form alert-form"action=""><div class="layui-form-item"><label class="layui-form-label">产品名称</label><div class="layui-input-inline"><input type="text"name="title"required lay-verify="required"placeholder="请输入产品名称"autocomplete="off"class="layui-input"value="'+ data.name +'"></div></div><div class="layui-form-item"><label class="layui-form-label">产品Code</label><div class="layui-input-inline"><input type="text"name="code"required lay-verify="required"placeholder="请输入产品Code"autocomplete="off"class="layui-input"value="'+ data.code +'"></div></div><div class="layui-form-item"><label class="layui-form-label">产品描述</label><div class="layui-input-block"><input type="text"name="desc"required lay-verify="required"placeholder="请输入产品描述"autocomplete="off"class="layui-input"value="'+ data.desc +'"></div></div><div class="layui-form-item"><label class="layui-form-label">产品开始时间</label><div class="layui-input-inline"><input type="text"name="dateTime"class="layui-input"required lay-verify="required"id="dateTime"placeholder="2017-12-28 15:27:05"value="'+ data.time +'"></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">过期通知配置</label><div class="layui-input-block"><textarea name="config1"placeholder="json"class="layui-textarea">'+ conf1 +'</textarea></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">升级提醒配置</label><div class="layui-input-block"><textarea name="config2"placeholder="json"class="layui-textarea">'+ conf2 +'</textarea></div></div><div class="layui-form-item"><label class="layui-form-label">开关-默认开</label><div class="layui-input-block"><input type="checkbox"'+ status +'"name="open"lay-skin="switch"lay-filter="switchTest"lay-text="ON|OFF"></div></div><div class="layui-form-item"><div class="layui-input-block"style="float:right"><button class="layui-btn"lay-submit lay-filter="editForm">立即提交</button></div></div></form>';
	  		
	  		var editWindow = layer.open({
			  	type: 1, 
			  	shadeClose:true,
			  	title:"编辑产品",
			  	area: '700px',
			  	content: content,
			});
			//更新渲染
		    form.render('checkbox');
		    
		    //监听提交
		  	form.on('submit(editForm)', function(data){
		    		console.log(data.field);
		    		
		    		//同步更新缓存对应的值
			    obj.update({
			      	name: '123',
			      	desc: 'xxx'
			    });
				layer.close(editWindow);
			    //在这里写提交表单
			    return false;
			    
			    var param={user_name:uname,mobile:uphone,message:umsg};
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
	  	}
	});
  
});


//添加产品
function add(){
			
	layer.open({
		type: 1, 
		shadeClose:true,
		title:"填写产品详情",
		area: '700px',
		content: '<form class="layui-form alert-form"action=""><div class="layui-form-item"><label class="layui-form-label">产品名称</label><div class="layui-input-inline"><input type="text"name="title"required lay-verify="required"placeholder="请输入产品名称"autocomplete="off"class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">产品Code</label><div class="layui-input-inline"><input type="text"name="code"required lay-verify="required"placeholder="请输入产品Code"autocomplete="off"class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">产品描述</label><div class="layui-input-block"><input type="text"name="desc"required lay-verify="required"placeholder="请输入产品描述"autocomplete="off"class="layui-input"></div></div><div class="layui-form-item"><label class="layui-form-label">产品开始时间</label><div class="layui-input-inline"><input type="text"name="dateTime"class="layui-input"required lay-verify="required"id="dateTime"placeholder="2017-12-28 15:27:05"></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">过期通知配置</label><div class="layui-input-block"><textarea name="config1"placeholder="json"class="layui-textarea"></textarea></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">升级提醒配置</label><div class="layui-input-block"><textarea name="config2"placeholder="json"class="layui-textarea"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-block"><input type="checkbox"checked=""name="open"lay-skin="switch"lay-filter="switchTest"lay-text="ON|OFF"></div></div><div class="layui-form-item"><div class="layui-input-block"style="float:right"><button class="layui-btn"lay-submit lay-filter="submitForm">立即提交</button></div></div></form>',
	});
	
	//表单
	layui.use(['form', 'laydate'], function(){
		var form = layui.form;
  		//时间选择器
  		layui.laydate.render({
	    		elem: '#dateTime',
	    		type: 'datetime'
  		});
  		
		//更新渲染
		form.render('checkbox');
	  	//监听提交
	  	form.on('submit(submitForm)', function(data){
	    		alert(JSON.stringify(data.field));
	    		//重新加载此页面
	    		window.location.reload();
		    //在这里写提交表单
		    return false;
		    
		    var param={user_name:uname,mobile:uphone,message:umsg};
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
	
	});
}
