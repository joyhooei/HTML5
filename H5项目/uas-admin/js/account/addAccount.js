//////////////////////////-addAccount.html-//////////////////////////////
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

//Demo
layui.use('form', function(){
  var form = layui.form;
  
  //监听提交
  form.on('submit(formDemo)', function(data){
    layer.msg(JSON.stringify(data.field));
    location.href = "accountList.html"
    return false;
  });
});

layui.use('upload',function() {
	var $ = layui.jquery,
		upload = layui.upload;

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
});