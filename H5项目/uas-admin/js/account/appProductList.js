/************appProductList.html*************/
$("#header").load("../nav.html #header");
$("#nav").load("../nav.html #navbar", function(){
  //加载菜单UI
  $("#navbar ul li:nth-child(3) dd:first-child").addClass("layui-this");
});	
$("#footer").load("../nav.html #footer");

//JavaScript代码区域
layui.use('element', function() {
	var element = layui.element;
});

layui.use(['table', 'element', 'laydate', 'form'], function(){
  var table = layui.table,
		  element = layui.element,
		  form = layui.form,
			laydate = layui.laydate;
  
  var productListData;
  $.get('http://getAppProductList', function (result) {
	productListData = result.data	
	table.render({
	    elem: '#productList'
	    ,cols: [[ //表头
	      {field: 'accountId', title: '账户ID', sort: true, fixed: 'left'}
	      ,{field: 'appId', title: 'APPID', align:'center', templet: '#titleTpl'}
	      ,{field: 'productCode', title: '产品Code', style:'background-color: #5FB878; color: #fff;'}
	      ,{field: 'expireTime', title: '过期时间', sort: true}
	      ,{field: 'status', title: '状态'}
	      ,{field: 'appPayConf', title: 'APP产品配置'}
	      ,{fixed:'right', title: '操作', toolbar:'#barDemo'}//这里的toolbar值是模板元素的选择器
	    ]]
	    ,data:productListData
	  });
  }, 'json');
  
	//监听工具条
	table.on('tool(test)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		var tr = obj.tr; //获得当前行 tr 的DOM对象
		


		if(layEvent === 'detail') { //查看
			//do somehing
			//location.href = 'showAppProduct.html';
			
			initAppProductInfo();
			var content = '<form class="layui-form alert-form" action=""><div><fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"><legend>App配置产品信息</legend></fieldset></div><div class="layui-form-item"><label class="layui-form-label">accountId</label><div class="layui-input-block"><input type="text" name="accountId" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" disabled="true"></div></div><div class="layui-form-item"><label class="layui-form-label">appId</label><div class="layui-input-block"><input type="text" name="appId" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" disabled="true"></div></div><div class="layui-form-item"><div class="layui-inline"><label class="layui-form-label">验证日期</label><div class="layui-input-inline"><input type="text" name="date" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input" disabled="true"></div></div></div><div class="layui-form-item"><label class="layui-form-label">产品Code</label><div class="layui-input-block"><select id="productCodeId" lay-verify="required" disabled="true"><option value="0"></option><option value="vip">vip</option><option value="cpd">cpd</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-block"><input type="checkbox" name="status" lay-skin="switch" lay-text="ON|OFF" disabled="true"></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">app支付配置</label><div class="layui-input-block"><textarea id="appPayJsonId" placeholder="请输入Json格式内容" class="layui-textarea" disabled="true"></textarea></div></div></form>';
  		var showWindow = layer.open({
  			type: 1,
  			shadeClose: true,
  			title: "查看APP",
  			area: ['800px', '650px'],
  			content: content,
  		});
		} else if(layEvent === 'del') { //删除
			layer.confirm('真的删除行么', function(index) {
				obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
				layer.close(index);
				//向服务端发送删除指令
			});
		} else if(layEvent === 'edit') { //编辑

			initAppProductInfo();
			var content = '<form class="layui-form alert-form" action=""><div><fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"><legend>App配置产品信息</legend></fieldset></div><div class="layui-form-item"><label class="layui-form-label">accountId</label><div class="layui-input-block"><input type="text" name="accountId" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">appId</label><div class="layui-input-block"><input type="text" name="appId" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><div class="layui-inline"><label class="layui-form-label">验证日期</label><div class="layui-input-inline"><input type="text" name="date" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input" ></div></div></div><div class="layui-form-item"><label class="layui-form-label">产品Code</label><div class="layui-input-block"><select id="productCodeId" lay-verify="required" ><option value="0"></option><option value="vip">vip</option><option value="cpd">cpd</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-block"><input type="checkbox" name="status" lay-skin="switch" lay-text="ON|OFF" ></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">app支付配置</label><div class="layui-input-block"><textarea id="appPayJsonId" placeholder="请输入Json格式内容" class="layui-textarea" ></textarea></div></div><div class="layui-form-item"><div class="layui-input-block"style="float:right"><button class="layui-btn"lay-submit lay-filter="editForm">立即提交</button></div></div></form>';
  		var editWindow = layer.open({
  			type: 1,
  			shadeClose: true,
  			title: "查看APP",
  			area: ['800px', '650px'],
  			content: content,
  		});
  		
  		//监听提交
			form.on('submit(editForm)', function(data) {
			 	console.log(data.field);

			 	//同步更新缓存对应的值
			 	obj.update({
			 		name: '123',
			 		desc: 'xxx'
			 	});
			 	layer.close(editWindow);
			 	//在这里写提交表单
			 	return false;

			 	var param = {
			 		user_name: uname,
			 		mobile: uphone,
			 		message: umsg
			 	};
			 	$.ajax({
			 		type: 'POST',
			 		dataType: 'json',
			 		contentType: 'application/json',
			 		url: './post_user_info',
			 		data: JSON.stringify(param),
			 		success: function(data) {
			 			if(data.retcode == 0) {

			 			} else {

			 			}
			 		},
			 		error: function() {

			 		}
			 	});
			});
			
		}
		
		//获取数据，赋值给弹框
		function initAppProductInfo() {
			$.get('http://getAppProductInfo', function(result) {
				$('input[name="accountId"]').val(result.data.accountId);
				$('input[name="appId"]').val(result.data.appId);
				$("#date").val(result.data.expireTime);
				//$("#productCode option[value='"+result.data.productCode+"']").attr("selected", "selected");
				$("#productCodeId").val(result.data.productCode);
				if(result.data.status = 1) {
					$('input[name="status"]').attr('checked', "checked");
				}
				$('#appPayJsonId').val(result.data.appPayConf);
				form.render('select'); //刷新select选择框渲染
				form.render('checkbox'); //刷新单选框渲染
				laydate.render({
					elem: '#date'
				});
			}, 'json');
			
			
		}
	});
  
});

//App参与产品
function addAppProduct(){
	//location.href = 'addAppProduct.html'; 
	var content = '<form class="layui-form alert-form" action=""><div><fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"><legend>App配置产品信息</legend></fieldset></div><div class="layui-form-item"><label class="layui-form-label">accountId</label><div class="layui-input-block"><input type="text" name="accountId" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">appId</label><div class="layui-input-block"><input type="text" name="appId" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><div class="layui-inline"><label class="layui-form-label">验证日期</label><div class="layui-input-inline"><input type="text" name="date" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input" ></div></div></div><div class="layui-form-item"><label class="layui-form-label">产品Code</label><div class="layui-input-block"><select id="productCodeId" lay-verify="required" ><option value="0"></option><option value="vip">vip</option><option value="cpd">cpd</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-block"><input type="checkbox" name="status" lay-skin="switch" lay-text="ON|OFF" ></div></div><div class="layui-form-item layui-form-text"><label class="layui-form-label">app支付配置</label><div class="layui-input-block"><textarea id="appPayJsonId" placeholder="请输入Json格式内容" class="layui-textarea" ></textarea></div></div><div class="layui-form-item"><div class="layui-input-block"style="float:right"><button class="layui-btn"lay-submit lay-filter="addForm">立即提交</button></div></div></form>';
	var addWindow = layer.open({
		type: 1,
		shadeClose: true,
		title: "查看APP",
		area: ['800px', '650px'],
		content: content,
	});
	layui.use(['element', 'laydate', 'form'], function() {
		var element = layui.element,
			laydate = layui.laydate,
			form = layui.form;
			
		form.render('select'); //刷新select选择框渲染
		form.render('checkbox'); //刷新单选框渲染

		//日期
		laydate.render({
			elem: '#date'
		});

	});

	//监听提交
	form.on('submit(addForm)', function(data) {
		console.log(data.field);
		layer.close(addWindow);
		//在这里写提交表单
		return false;

		var param = {
			user_name: uname,
			mobile: uphone,
			message: umsg
		};
		$.ajax({
			type: 'POST',
			dataType: 'json',
			contentType: 'application/json',
			url: './post_user_info',
			data: JSON.stringify(param),
			success: function(data) {
				if(data.retcode == 0) {

				} else {

				}
			},
			error: function() {

			}
		});
	});

	}

//返回appList.html
function backApp(){
	location.href = 'appList.html'; 
}
