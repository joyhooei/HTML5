//------------------appList.html----------------------------//
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

layui.use(['table', 'form','upload'], function(){
	var table = layui.table,
			form = layui.form,
			upload = layui.upload;
	//第一个实例
	table.render({
		elem: '#productList'
		,url: 'http://getAppList' //数据接口
		,page: true //开启分页
		,cols: [[ //表头
		  {field: 'appId', title: 'APPID', sort: true, fixed: 'left'}
		  ,{field: 'appName', title: 'APP名称', align:'center', templet: '#titleTpl'}
		  ,{field: 'accountName', title: '公司联系人', style:'background-color: #5FB878; color: #fff;'}
		  ,{field: 'category', title: '类型'} 
		  ,{field: 'appDesc', title: 'APP描述'}
		  ,{field: 'status', title: '状态'}
		  ,{field: 'createTime', title: '开始时间', sort: true}
		  ,{fixed:'right', title: '操作',width:280, toolbar:'#barDemo'}//这里的toolbar值是模板元素的选择器
		    ]]
	});
  
	//监听工具条
	table.on('tool(lay-list)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		var tr = obj.tr; //获得当前行 tr 的DOM对象
			
		if(layEvent === 'detail') { //查看
			initAppInfo();
			var content = '<form class="layui-form alert-form" action=""><div><fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"><legend>App信息</legend></fieldset></div><div class="layui-upload" style="margin: 35px;"><label class="layui-form-label">公司LOGO</label><div class="layui-upload-list"><img class="layui-upload-img" id="demo1"><p id="demoText"></p></div></div><div class="layui-form-item"><label class="layui-form-label">App名称</label><div class="layui-input-block"><input type="text" name="appName" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" disabled="true"></div></div><div class="layui-form-item"><label class="layui-form-label">AppKey</label><div class="layui-input-block"><input type="text" name="appKey" required lay-verify="required" placeholder="请输入App Key" autocomplete="off" class="layui-input" disabled="true"></div></div><div class="layui-form-item"><label class="layui-form-label">AppSecret</label><div class="layui-input-block"><input type="text" name="appSecret" required lay-verify="required" placeholder="请输入App Secret" autocomplete="off" class="layui-input" disabled="true"></div></div><div class="layui-form-item"><label class="layui-form-label">app类型</label><div class="layui-input-block"><select id="appCategoryId" name="appCategory" lay-verify="required" disabled="true"><option value="0"></option><option value="1">社交</option><option value="2">金融</option><option value="3">教育</option><option value="4">体育</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-block"><input type="checkbox" name="appStatus" lay-skin="switch" lay-text="ON|OFF" disabled="true"></div></div></form>';
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
			 //do something
						 
			 initAppInfo();
			 var content = '<form class="layui-form alert-form" action=""><div><fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"><legend>App信息</legend></fieldset></div><div class="layui-upload" style="margin: 35px;"><label class="layui-form-label">公司LOGO</label><div class="layui-upload-list"><img class="layui-upload-img" id="demo1"/><p id="demoText"></p></div><button type="button" class="layui-btn" id="test1">上传图片</button></div><div class="layui-form-item"><label class="layui-form-label">App名称</label><div class="layui-input-block"><input type="text" name="appName" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">AppKey</label><div class="layui-input-block"><input type="text" name="appKey" required lay-verify="required" placeholder="请输入App Key" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">AppSecret</label><div class="layui-input-block"><input type="text" name="appSecret" required lay-verify="required" placeholder="请输入App Secret" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">app类型</label><div class="layui-input-block"><select id="appCategoryId" name="appCategory" lay-verify="required" ><option value="0"></option><option value="1">社交</option><option value="2">金融</option><option value="3">教育</option><option value="4">体育</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-block"><input type="checkbox" name="appStatus" lay-skin="switch" lay-text="ON|OFF" ></div></div><div class="layui-form-item"><div class="layui-input-block"style="float:right"><button class="layui-btn"lay-submit lay-filter="editForm">立即提交</button></div></div></form>';
			 var editWindow = layer.open({
			 	type: 1,
			 	shadeClose: true,
			 	title: "编辑APP",
			 	area: ['800px', '780px'],
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
			 
			 //普通图片上传
			var uploadInst = upload.render({
				elem: '#test1',
				url: '/upload/',
				before: function(obj) {
					//预读本地文件示例，不支持ie8
					obj.preview(function(index, file, result) {
						$('#demo1').attr('src', result); //图片链接（base64）
					});
				},
				done: function(res) {
					//如果上传失败
					if(res.code > 0) {
						return layer.msg('上传失败');
					}
					//上传成功
				},
				error: function() {
					//演示失败状态，并实现重传
					var demoText = $('#demoText');
					demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
					demoText.find('.demo-reload').on('click', function() {
						uploadInst.upload();
					});
				}
			});
		} else if(layEvent === 'appProductList') { //appProductList
			//do something
			location.href = 'appProductList.html';
		}
		
		//获取数据，赋值给弹框
		function initAppInfo() {
			$.get('http://getAppInfo', function(result) {
				$("#demo1").attr('src', result.appIconPath);
		
				$('input[name="appName"]').val(result.appName);
				$('input[name="appKey"]').val(result.appKey);
				$('input[name="appSecret"]').val(result.appSecret);
		
				$('#appCategoryId').val(result.categoryId);
		
				if(result.status = 1) {
					$('input[name="appStatus"]').attr('checked', "checked");
				}
				form.render('select'); //刷新select选择框渲染
				form.render('checkbox'); //刷新单选框渲染
			}, 'json');
		}
		});

});

//添加App
function addApp(){
	//location.href = 'addApp.html'; 
	
	//location.href = 'addAppProduct.html'; 
	var content = '<form class="layui-form alert-form" action=""><div><fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;"><legend>App信息</legend></fieldset></div><div class="layui-upload" style="margin: 35px;"><label class="layui-form-label">公司LOGO</label><div class="layui-upload-list"><img class="layui-upload-img" id="demo1"/><p id="demoText"></p></div><button type="button" class="layui-btn" id="test1">上传图片</button></div><div class="layui-form-item"><label class="layui-form-label">App名称</label><div class="layui-input-block"><input type="text" name="appName" required lay-verify="required" placeholder="请输入App名称" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">AppKey</label><div class="layui-input-block"><input type="text" name="appKey" required lay-verify="required" placeholder="请输入App Key" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">AppSecret</label><div class="layui-input-block"><input type="text" name="appSecret" required lay-verify="required" placeholder="请输入App Secret" autocomplete="off" class="layui-input" ></div></div><div class="layui-form-item"><label class="layui-form-label">app类型</label><div class="layui-input-block"><select id="appCategoryId" name="appCategory" lay-verify="required" ><option value="0"></option><option value="1">社交</option><option value="2">金融</option><option value="3">教育</option><option value="4">体育</option></select></div></div><div class="layui-form-item"><label class="layui-form-label">状态</label><div class="layui-input-block"><input type="checkbox" name="appStatus" lay-skin="switch" lay-text="ON|OFF" ></div></div><div class="layui-form-item"><div class="layui-input-block"style="float:right"><button class="layui-btn"lay-submit lay-filter="addForm">立即提交</button></div></div></form>';
	var addWindow = layer.open({
		type: 1,
		shadeClose: true,
		title: "查看APP",
		area: ['800px', '780px'],
		content: content,
	});
	layui.use(['element', 'laydate', 'form', 'upload'], function() {
		var element = layui.element,
			laydate = layui.laydate,
			form = layui.form,
			upload = layui.upload;;
			
		form.render('select'); //刷新select选择框渲染
		form.render('checkbox'); //刷新单选框渲染

		//日期
		laydate.render({
			elem: '#date'
		});
		
		//普通图片上传
		var uploadInst = upload.render({
			elem: '#test1',
			url: '/upload/',
			before: function(obj) {
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function(res) {
				//如果上传失败
				if(res.code > 0) {
					return layer.msg('上传失败');
				}
				//上传成功
			},
			error: function() {
				//演示失败状态，并实现重传
				var demoText = $('#demoText');
				demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-mini demo-reload">重试</a>');
				demoText.find('.demo-reload').on('click', function() {
					uploadInst.upload();
				});
			}
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
	});
}

//返回accountList.html
function backAccount(){
	location.href = 'accountList.html'; 
}

