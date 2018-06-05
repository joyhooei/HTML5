////////////////////////-accountList.html-////////////////////////////////
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

layui.use('table', function(){
  	var table = layui.table,
  			form = layui.form;
  
  	//第一个实例
	table.render({
	    elem: '#accountList'
	    // ,height: 315
	    ,url: 'http://getAccountList' //数据接口
	    ,page: true //开启分页
	    ,cols: [[ //表头
	    {field: 'accountNo', title: '账户名称',  sort: true, fixed: 'left'}
	    ,{field: 'companyName', title: '公司名称',align:'center', templet: '#titleTpl'}
	    ,{field: 'accountName', title: '联系人', sort: true,style:'background-color: #5FB878; color: #fff;'}
	    ,{field: 'email', title: '邮箱'} 
	    ,{field: 'status', title: '状态'}
	    ,{field: 'createDate', title: '开始时间', sort: true}
	    ,{fixed:'right', title: '操作', width:310, toolbar:'#barDemo'}//这里的toolbar值是模板元素的选择器
	  ]]
	});
  
	//监听工具条
	table.on('tool(test)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
		var data = obj.data; //获得当前行数据
		var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
		var tr = obj.tr; //获得当前行 tr 的DOM对象
	
		if(layEvent === 'detail') { //查看
			//do somehing
			location.href="showAccount.html";
		} else if(layEvent === 'del') { //删除
			layer.confirm('真的删除行么', function(index) {
				obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
				layer.close(index);
				//向服务端发送删除指令
			});
		} else if(layEvent === 'edit') { //编辑
			//do something
			
			//同步更新缓存对应的值
//			obj.update({
//				username: '123',
//				title: 'xxx'
//			});
			
			location.href="editAccount.html";
		} else if(layEvent === 'AppList') { //AppList		
			location.href="appList.html";
		} else if(layEvent === 'updatePwd') {
			
			var content = '<form class="layui-form alert-form" action=""><div class="layui-form-item" style="margin-top: 15px;"><label class="layui-form-label">帐号</label><div class="layui-input-block"><input type="text" name="accountNo" required="" lay-verify="required" autocomplete="off" class="layui-input" disabled="true" /></div></div><div class="layui-form-item"><label class="layui-form-label">密码</label><div class="layui-input-block"><input type="password" name="password" required="" lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><label class="layui-form-label">确认密码</label><div class="layui-input-block"><input type="password" name="password" required="" lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input" /></div></div><div class="layui-form-item"><div class="layui-input-block" style="float:right"><button class="layui-btn" lay-submit="" lay-filter="updatePwdForm">立即提交</button></div></div></form>';
			
			var updatePwdForm = layer.open({
				type: 1,
				shadeClose: true,
				title: "修改密码",
				area: ['800px', '300px'],
				content: content,
			});
   
  
			
			//$('input[name="accountNo"]').val(data.accountNo);
			//监听提交
			form.on('submit(updatePwdForm)', function(data) {
				console.log(data.field);

				//同步更新缓存对应的值
				obj.update({
					name: '123',
					desc: 'xxx'
				});
				layer.close(updatePwdForm);
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
	});
  
});

function addAccount(){
	//window.href="addAccount.html";
	location.href = 'addAccount.html'; 
}