$(document).ready(function(){
	changeLeftNavHeight();
});

//改变左边导航栏高度
function changeLeftNavHeight(){
	var docH = $(document).height();
	$('.king-layout1-sidebar').css("height",docH);
}

//保存
function saveMessage(){
	$('.custom_detail_bg').css('display','none');
	changeLeftNavHeight();
}


//table中编辑按钮
function editThisRow(){
	$('.custom_detail_bg').css('display','block');
	changeLeftNavHeight();
}

//修改CPD-模态对话框
$(".resetCPD").click(function() {
    var d = dialog({
        width: 460,
        title: '修改CPD',
        content: '<p>合作模式</p><input type="radio" name="optionsRadios" id="optionsRadios1" value="" checked="">待定<br /><input type="radio" name="optionsRadios" id="optionsRadios2" value="">按固定价格&nbsp;<input type="number" value="2.4">&nbsp;元<br /><input type="radio" name="optionsRadios" id="optionsRadios2" value="">按实际成本&nbsp;&nbsp;服务费率&nbsp;<input type="number" value="10" disabled="disabled">&nbsp;%',
        okValue: '确定',
        ok: function() {
            // do something
        },
        cancelValue: '取消',
        cancel: function() {
            // do something
        },
    });
    d.showModal();
});


//反馈-模态对话框
$(".feed_back").click(function() {
    var d = dialog({
        width: 460,
        title: '反馈',
        content: '<p>反馈内容</p><textarea class="form-control" style="height:60px;"></textarea>',
        okValue: '发送',
        ok: function() {
            // do something
        },
        cancelValue: '取消',
        cancel: function() {
            // do something
        },
    });
    d.showModal();
});

