<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>会员注册</title>
    <link href="css/reg.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script src="js/common.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(document).ready(function () {
            $("#btnReg").click(function () {
                var s = true;
                var userName = $("#userName").val();
                if (userName.length < 3 || userName.length > 20 || !userName.isEnglishOrDigit()) {
                    alert("用户名不合法，规则：用户名为3-20位字母或者数字的组合。");
                    $("#userName").focus();
                    s = false;
                    return false;
                }

                /**
                 * 判断有户名是否存在
                 * @type {string|Number}
                 */
                $.ajax({
                    async: false,
                    type:"post",
                    url:"common.php?m=checkname",
                    data:"username="+userName,
                    dataType:'json',
                    success:function(json){
                        if(json.code == 1){
                            alert('该用户名已经存在！');
                            $("#userName").focus();
                            s = false;
                        }
                    }
                });
                if(s == false){
                    return false;
                }
                /*var v = ajax.checkUserName(userName).value;
                 if (v) {
                 alert("该用户名已经存在！");
                 $("#userName").focus();
                 return false;
                 }*/

                var userPassword = $("#userPassword").val();
                if (userPassword.length < 3 || userPassword.length > 32) {
                    alert("密码不合法，规则：长度3-32。");
                    $("#userPassword").focus();
                    s = false;
                    return false;
                }

                var userPassword2 = $("#userPassword2").val();

                if (userPassword != userPassword2) {
                    alert("两个输入的密码不相同！");
                    $("#userPassword2").focus();
                    s = false;
                    return false;
                }

                var trueName = $("#trueName").val();
                if (trueName.length < 2 || trueName.length > 4 || !trueName.isChinese()) {
                    alert("姓名不合法，规则：真实姓名错误，只能输入2-4个汉字！");
                    $("#trueName").focus();
                    s = false;
                    return false;
                }

                var idCard = $("#idCard").val();
                if (!idCard.isIDCard()) {
                    alert("请输入有效的身份证号码！");
                    $("#idCard").focus();
                    s = false;
                    return false;
                }

                var email = $("#email").val();
                if (!email.isEmail()) {
                    alert("请输入有效的EMail地址！");
                    $("#email").focus();
                    s = false;
                    return false;
                }

                if (!$("#agree").prop("checked")) {
                    alert("请同意用户服务协议！");
                    $("#agree").focus();
                    s = false;
                    return false;
                }

                if(s == true){
                    var web = parent.location.href;

                    $.ajax({
                        type:"post",
                        url:"common.php?m=reg",
                        data:{
                            username : userName,
                            password : userPassword,
                            name : trueName,
                            card : idCard,
                            email : email,
                            web : web
                        },
                        dataType:'json',
                        success:function(data){
                            if(data.code == 1){ //成功
                                alert('注册成功，请重新登录！');
                                location.href = "login.php";
                            }else{
                                alert('注册失败，请重试！');
                            }
                        }
                    });
                }
            });
        });
    </script>
</head>
<body>
<form name="form1" id="form1">

    <div class="regdit_con">
        <ul>
            <li><span>用户名：</span>
                <input type="text" class="regdit_input" size="22" id="userName" name="username" />
                <span class="regdit_tips"><label id="lName"><font color="red">*</font>用户名为3-20位字母或者数字的组合</label></span>
            </li>
            <li><span>密码：</span>
                <input type="password" size="22" class="regdit_input" id="userPassword" name="password" />
                <span class="regdit_tips"><label id="lPass1"><font color="red">*</font>长度3-32</label></span>
            </li>
            <li><span>重复密码：</span>
                <input type="password" size="22" class="regdit_input" id="userPassword2" />
                <span class="regdit_tips"><label id="lPass2"><font color="red">*</font>请再一次输入密码</label></span>
            </li>
            <li><span>姓名：</span>
                <input type="text" size="22" class="regdit_input" id="trueName" name="name" />
                <span class="regdit_tips"><label id="lreal_name"><font color="red">*</font>真实姓名错误，只能输入2-4个汉字！</label></span>
            </li>
            <li><span>身份证：</span>
                <input type="text" size="22" class="regdit_input" id="idCard" name="card" />
                <span class="regdit_tips"><label id="lid_card"><font color="red">*</font>请输入有效的身份证号码！</label></span>
            </li>
            <li><span>E-mail：</span>
                <input type="text" size="22" class="regdit_input" id="email" name="email" />
                <span class="regdit_tips"><label id="lEmail"><font color="red">*</font>用于以后取回密码</label></span>
            </li>
            <li><span>&nbsp;</span>
                <input id="agree" type="checkbox" checked="checked" name="agr">
                <a href="xieyi.html" target="_blank" style="width: 200px; text-align: left; margin-left: 10px;">同意用户服务协议</a>
            </li>
            <li>
                <input type="button" id="btnReg" class="regdit_btn" />
            </li>
        </ul>
    </div>
</form>
</body>
</html>