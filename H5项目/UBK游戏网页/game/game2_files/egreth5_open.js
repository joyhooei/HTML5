var EgretH5SdkWin = new EgretH5Win();
var EgretH5SdkZIndex = 10;
var EgretH5SdkWinid = 0;
var EgretH5SdkIe = /msie/i.test(navigator.userAgent);

EgretH5Sdk.open = {};

function EgretH5Win() {
	this.Create = function (scale, mask, title, wbody, w, h, l, t) {
		EgretH5SdkWinid++;
		mask = mask;
		title = title || " ";
		wbody = wbody || "<p align='center'> </p>";
		w = w || 350;
		h = h || 150;
		var cw = document.documentElement.clientWidth;
		var ch = document.documentElement.clientHeight;
		var sw = document.documentElement.scrollWidth;
		var sh = document.documentElement.scrollHeight;
		var st = (document.documentElement.scrollTop || document.body.scrollTop);

		var ww, hh;
		if (w > cw) {
			ww = 0;
		} else {
			ww = (cw - w) / 2;
		}

		if (h > ch) {
			hh = 0;
		} else {
			hh = (st + (ch - h) / 2);
		}

		l = l || ww;
		t = t || hh;

		if (mask != "no") {
			var ndiv = document.createElement("DIV");
			ndiv.setAttribute("id", "ndiv" + EgretH5SdkWinid);
			ndiv.style.cssText = "width:" + sw + "px;height:" + sh + "px;left:0px;top:0px;position:absolute;overflow:hidden;background:#fff;filter:alpha(opacity=20); opacity:0.2;-moz-opacity:0.2;";
			document.body.appendChild(ndiv);

			if (EgretH5SdkIe) {
				var niframe = document.createElement("iframe");
				niframe.style.width = sw;
				niframe.style.height = sh;
				niframe.style.top = "0px";
				niframe.style.left = "0px";
				niframe.style.visibility = "inherit";
				niframe.style.filter = "alpha(opacity=0)";
				niframe.style.position = "absolute";
				niframe.style.zIndex = -1;
				ndiv.insertAdjacentElement("afterBegin", niframe);
			}
		}
		var EgretH5SdkWin = document.createElement("DIV");
		EgretH5SdkWin.setAttribute("id", "win" + EgretH5SdkWinid);
		EgretH5SdkWin.style.cssText = " -webkit-transform:scale(" + scale + "); width:" + w + "px;height:" + h + "px;left:0px;top:0px;position:absolute;overflow:hidden;padding:0px;font-family:Arial, 宋体";
		EgretH5SdkWin.style.zIndex = ++EgretH5SdkZIndex;
		document.body.appendChild(EgretH5SdkWin);

		var myboy = document.createElement("DIV");
		myboy.style.cssText = "width:100%";
		EgretH5SdkWin.appendChild(myboy);

		var wintag = [
			[myboy, h, 0, "l1"],
			[myboy, h, w],
			[myboy, h, 0, "r1"]
		];
		for (var i = 0; i < 3; i++) {
			var temp = document.createElement("DIV");
			temp.setAttribute("Fid", "win" + EgretH5SdkWinid);
			wintag[i][0].appendChild(temp);
			if (!wintag[i][3]) {
				temp.style.cssText = "float:left;filter:alpha(Opacity=95,style=0);opacity:1;height:" + wintag[i][1] + "px;width:" + wintag[i][2] + "px;overflow:hidden;padding:0px";
			}
		}

		this.Body("win" + EgretH5SdkWinid, wbody);
		this.Move_e("win" + EgretH5SdkWinid, l, t, 0, 0);
		return(EgretH5SdkWin);
	}
	this.Title = function (Id, title) {
		if (Id == null) {
			return;
		}
		var o = document.getElementById(Id);
		if (!o) {
			return;
		}
		o.childNodes[0].childNodes[1].childNodes[0].innerHTML = title;
	}
	this.Body = function (Id, wbody) {
		if (Id == null) {
			return;
		}
		var o = document.getElementById(Id);
		if (!o) {
			return;
		}
		if (wbody.slice(0, 4) == "[pg]") {
			o.childNodes[0].childNodes[1].innerHTML = "<iframe name=\"loginIframe\" onfocus=\"EgretH5SdkWin.Show('" + Id + "',this)\" src='" + wbody.slice(4) + "' frameBorder='0' marginHeight='0' marginWidth='0' scrolling='no' width='100%' height='100%'></iframe>";
		} else if (wbody.slice(0, 4) == "[ag]") {
			o.childNodes[0].childNodes[1].innerHTML = "<div style='-webkit-overflow-scrolling:touch;overflow-y: scroll; width:100%; height:100%;'><iframe name=\"loginIframe\" onfocus=\"EgretH5SdkWin.Show('" + Id + "',this)\" src='" + wbody.slice(4) + "' frameBorder='0' marginHeight='0' marginWidth='0' scrolling='auto' width='100%' height='100%'></iframe></div>";
		}else {
			o.childNodes[0].childNodes[1].innerHTML = wbody;
		}
	}
	this.Show = function (Id) {
		if (Id == null) {
			return;
		}
		var o = document.getElementById(Id);
		if (!o) {
			return;
		}
		o.style.zIndex = ++EgretH5SdkZIndex;
	}
	this.Move_e = function (Id, l, t, ll, tt) {
		if (typeof(window["ct" + Id]) != "undefined") {
			clearTimeout(window["ct" + Id]);
		}
		var o = document.getElementById(Id);
		if (!o) {
			return;
		}
		o.style.left = l + "px";
		o.style.top = t + "px";
		window["ct" + Id] = window.setTimeout("EgretH5SdkWin.Move_e('" + Id + "', " + l + " , " + t + ", " + ll + ", " + tt + ")", 1);
	}
	this.Close = function (Id, Opacity) {
		if (typeof(window["et" + Id]) != "undefined") {
			clearTimeout(window["et" + Id]);
		}
		var o = document.getElementById(Id);
		if (!o) {
			return;
		}
		if (Opacity == 10) {
			o.childNodes[0].childNodes[1].innerHTML = "";
		}
		if (EgretH5SdkIe) {
			o.style.filter = "alpha(opacity=" + Opacity + ",style=0)";
		} else {
			o.style.opacity = Opacity / 10;
		}
		if (Opacity > 20) {
			Opacity -= 10;
		} else {
			Opacity--;
		}
		if (Opacity <= 0) {
			if (o.getElementsByTagName("IFRAME").length != 0) {
				o.getElementsByTagName("IFRAME").src = "about:blank";
			}
			o.innerHTML = "";
			document.body.removeChild(o);
			return;
		}
		window["et" + Id] = window.setTimeout("EgretH5SdkWin.Close('" + Id + "', " + Opacity + ")", 1);
	}
	this.ndiv = function (Id, Opacity) {
		var o = document.getElementById(Id);
		if (!o) {
			return;
		}
		o.innerHTML = "";
		document.body.removeChild(o);
		return;
	}
}

var EgretH5CreateLogin = (function () {
	function EgretH5CreateLogin() {
	}
	/*
	 EgretH5CreateLogin.init = function(oneKeyPuserId) {
	 if (oneKeyPuserId && oneKeyPuserId != '' && oneKeyPuserId != 'undefined') {
	 EgretH5CreateLogin.tagLoginPag(3);
	 } else {
	 EgretH5CreateLogin.tagLoginPag(1);
	 }

	 // 登录
	 var egretLogin = document.getElementById("egretLogin");
	 egretLogin.onclick = function() {
	 EgretH5CreateLogin.formSubmit(1, oneKeyPuserId)
	 };

	 // 一键试玩
	 var egretPlay = document.getElementById("egretPlay");
	 egretPlay.onclick = function() {
	 EgretH5CreateLogin.formSubmit(4, oneKeyPuserId);
	 }

	 // 登录界面点击注册
	 var egretReg = document.getElementById("egretReg");
	 egretReg.onclick = function() {
	 EgretH5CreateLogin.tagLoginPag(2);
	 }

	 // 注册页面关闭
	 var egretRegCloseBtn = document.getElementById("egretRegCloseBtn");
	 egretRegCloseBtn.onclick = function() {
	 EgretH5CreateLogin.tagLoginPag(1);
	 }

	 // 注册提交
	 var egretRegSubmit = document.getElementById("egretRegSubmit");
	 egretRegSubmit.onclick = function() {
	 EgretH5CreateLogin.formSubmit(2, oneKeyPuserId);
	 }

	 // 弹出注册关闭
	 var egretOneKeyCloseBtn = document.getElementById("egretOneKeyCloseBtn");
	 egretOneKeyCloseBtn.onclick = function() {
	 EgretH5Sdk.closeBtn('');
	 }

	 // 弹出注册提交
	 var egretOneKeyReg = document.getElementById("egretOneKeyReg");
	 egretOneKeyReg.onclick = function() {
	 EgretH5CreateLogin.formSubmit(3, oneKeyPuserId);
	 }
	 };
	 // */

	EgretH5CreateLogin.formSubmit = function(type, oneKeyPuserId) {
		if (type == 1) {
			var userName = document.getElementById("egretUserName").value;
			var password = document.getElementById("egretPassword").value;

			if (!userName && !password) {
				alert("用户名和密码不能为空");
				return;
			}

			var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/login.php?mod=User&do=login&email=" + userName;
			postUrl = postUrl + "&password=" + password + "&platInfo=" + EgretH5Sdk.platInfo;
		} else if (type == 2) {
			var userName = document.getElementById("egretReguserName").value;
			var password = document.getElementById("egretRegpassword").value;

			if (!userName && !password) {
				alert("用户名和密码不能为空");
				return;
			}

			var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/reg.php?mod=User&do=reg&email=" + userName;
			postUrl = postUrl + "&password=" + password + "&platInfo=" + EgretH5Sdk.platInfo;

		} else if (type == 3) {
			var userName = document.getElementById("egretOneKeyReguserName").value;
			var password = document.getElementById("egretOneKeyRegpassword").value;

			if (!userName && !password) {
				alert("用户名和密码不能为空");
				return;
			}

			var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/reg.php?mod=User&do=reg&email=" + userName;
			postUrl = postUrl + "&password=" + password + "&platInfo=" + EgretH5Sdk.platInfo + "&oneKeyPuserId=" + EgretH5Sdk.oneKeyPuserId;
		} else if (type == 4){
			var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/oneKeyReg.php?mod=User&do=oneKeyReg" + "&platInfo=" + EgretH5Sdk.platInfo;
			EgretH5Sdk.addCookie("EgretH5SdkOneKeyReg", "Yes", 240);
		} else if (type == 5) { // 绑定帐号带QQ和微博
			var userName = document.getElementById("egretBindingName").value;
			var password = document.getElementById("egretBindingPassword").value;
			if (!userName && !password) {
				alert("用户名和密码不能为空");
				return;
			}
			// alert("debug");
		}
		if(document.getElementById("egretMask")){
                var egretMask = document.getElementById("egretMask");
                document.body.removeChild(egretMask);
    	}
		EgretH5Sdk.sendUrl(postUrl, EgretH5CreateLogin.formSubmitCallback);
	};

	EgretH5CreateLogin.formSubmitCallback = function(dataObj) {
		if(document.getElementById("egretMask")){
                var egretMask = document.getElementById("egretMask");
                document.body.removeChild(egretMask);
   		}
		if (dataObj.status !== 0) {
			alert(dataObj.message);
		} else {
			var nowDateTime = new Date().getTime();
			var egretH5SdkUserInfo = dataObj.data.pUserId + "||" + dataObj.data.name + "||" + dataObj.data.pic + "||" + dataObj.data.sex + "||" + dataObj.data.sign  + "||" + nowDateTime + "||" + dataObj.data.platId;
			if (typeof dataObj.data.OneKeyReg != "undefined") {
				EgretH5Sdk.addCookie("EgretH5SdkOneKeyReg", dataObj.data.OneKeyReg, 240);
			} else {
				EgretH5Sdk.delCookie("EgretH5SdkOneKeyReg");
			}
			EgretH5Sdk.addCookie('EgretH5SdkUserInfo', egretH5SdkUserInfo, 240);
			var tmpStr = dataObj.data.token + '_' + dataObj.data.oneKey + '_' + dataObj.data.sessionKey + '_' + dataObj.data.pUserId + '_' + dataObj.data.eId + '_' + dataObj.data.platId;
			EgretH5Sdk.closeBtn(tmpStr, true, dataObj.data.eId);
		}
	}

	EgretH5CreateLogin.tagLoginPag = function(type) {
		//*
		if (type == 1) {
			document.getElementById('egretRegdiv').style.display = "none";
			document.getElementById('egretLogindiv').style.display = "block";
			document.getElementById('egretOneKeyRegdiv').style.display = "none";
		} else if (type == 2) {
			document.getElementById('egretLogindiv').style.display = "none";
			document.getElementById('egretRegdiv').style.display = "block";
			document.getElementById('egretOneKeyRegdiv').style.display = "none";
		} else {
			document.getElementById('egretLogindiv').style.display = "none";
			document.getElementById('egretRegdiv').style.display = "none";
			document.getElementById('egretOneKeyRegdiv').style.display = "block";
		}
		// */
	};

	EgretH5CreateLogin.safetyBinding = function() {
		var egretH5SdkUserInfo = EgretH5Sdk.getCookie('EgretH5SdkUserInfo');
		egretH5SdkUserInfo = decodeURIComponent(egretH5SdkUserInfo);
		if (egretH5SdkUserInfo) {
			var egretSafetyBindingEmail = document.getElementById("egretSafetyBindingEmail").value;
			var egretSafetyBindingMobile = document.getElementById("egretSafetyBindingMobile").value;
			var egretH5SdkUserInfos = egretH5SdkUserInfo.split("||");
			var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/binding.php?userId=" + egretH5SdkUserInfos[0] + "&email=" + egretSafetyBindingEmail + "&mobile=" + egretSafetyBindingMobile;
			EgretH5Sdk.doGet({
				url: postUrl,
				onSuccess: function (data) {
					var dataObj = eval("(" + data.response + ")");//转换为json对象
					if (dataObj.status !== 0) {
						alert(dataObj.message);
					} else {

						if(document.getElementById('egret_logined_box')){
                            Egret_login_obj.show_box('egret_logined_box');
                        }
						else{
                            Egret_login_obj.show_box2('logined');
                        }
						var egretBindingWarning = document.getElementById("egret_binding_warning");
						egretBindingWarning.innerHTML = '';
					}
				},
				onFail: function () {}
			});
		}
	};

	EgretH5CreateLogin.thirdPartyLogin = function(type) {

		var rs = EgretH5Sdk.getAllParam();
		if (!EgretH5Sdk.platInfo && rs["platInfo"]) {
			EgretH5Sdk.platInfo = rs["platInfo"];
		}
		var platInfoSter = EgretH5Sdk.platInfo.split("_");
		var tmpPlatInfoSter = platInfoSter[2].split("?");
		if (tmpPlatInfoSter[1]) {
			platInfoSter[2] = tmpPlatInfoSter[0];
		}

		var url = '';
		if (type == 'qq') {
			url = "http://api.egret-labs.org/games/www/egret/qq/login.php?gameId=" + platInfoSter[1] + "&channelId=" + platInfoSter[2];
		} else if (type == 'weibo') {
			url = "http://api.egret-labs.org/games/www/egret/weibo/index.php?gameId=" + platInfoSter[1] + "&channelId=" + platInfoSter[2];
		} else {
			url = "http://api.egret-labs.org/games/www/egret/weixin/index.php?gameId=" + platInfoSter[1] + "&channelId=" + platInfoSter[2];
		}

		if (rs['showLoginPanel']) {
			url += "&showLoginPanel=" + rs['showLoginPanel'];
		}
		window.location.href = url;
	};
	return EgretH5CreateLogin;
})();
EgretH5CreateLogin.prototype.__class__ = "EgretH5CreateLogin";

EgretH5Sdk.getBrowserType = function () {
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/mqqbrowser/i)=="mqqbrowser") {
		return 'qq';
	} else if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return 'weixin';
	} else if(ua.match(/chrome/i)=="chrome") {
		return 'chrome';
	} else {
		return 'any';
	}
};

EgretH5Sdk.loadingChannelSdk = function (){
	return true;
};

EgretH5Sdk.open.checkLogin = function (fun, funClass, loginType) {
	EgretH5Sdk.callback = fun;
	EgretH5Sdk.callbackThisObject = funClass;
	if (!loginType) {
		loginType = '';
	}
	EgretH5Sdk.loginType = loginType;

	var rs = EgretH5Sdk.getAllParam();
	EgretH5Sdk.platInfo = rs["platInfo"];
	EgretH5Sdk.proxyUrl = location.origin + "/proxy.html";

	EgretH5Sdk.loadingChannelSdk();

	if (rs["token"]) {
		if (rs["egretOauthUser"]) {
			var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
			EgretH5Sdk.delCookie('EgretH5SdkNewToken');

			var nowDateTime = new Date().getTime();
			var egretH5SdkUserInfo = rs["userId"] + "||" + rs["userName"] + "||" + rs["userImg"] + "||" + rs["userSex"] + "||" + rs["sign"]  + "||" + nowDateTime  + "||" + rs["egretChannelId"];
			EgretH5Sdk.addCookie('EgretH5SdkUserInfo', egretH5SdkUserInfo, 240);
		}
		EgretH5Sdk.haveUserSystemPlatToken = rs["token"];
		EgretH5Sdk.closeBtn(rs["token"], true, rs["egretId"]);

		return;
	}
	if (EgretH5Sdk.haveUserSystemPlatToken) {
		EgretH5Sdk.closeBtn(EgretH5Sdk.haveUserSystemPlatToken, true);
		return;
	}

	EgretH5Sdk.isLogin(onGetLoginStatus);
	function onGetLoginStatus(tokenStr) {
		if (tokenStr) {
			var strs = tokenStr.split("_");
			var data = {};
			data["token"] = strs[0];
			data["id"] = strs[4];
			data["status"] = 0;
			EgretH5Sdk.executeCallback(data);
		} else {
			var data = {};
			data["status"] = -1;
			EgretH5Sdk.executeCallback(data);
		}
	}
}

EgretH5Sdk.isLogin = function (onResult) {

	var rs = EgretH5Sdk.getAllParam();
	var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
	var egretH5SdkUserInfo = EgretH5Sdk.getCookie('EgretH5SdkUserInfo');
	egretH5SdkUserInfo = decodeURIComponent(egretH5SdkUserInfo);
	if (egretH5SdkUserInfo) {
		if (!EgretH5Sdk.platInfo && rs["platInfo"]) {
			EgretH5Sdk.platInfo = rs["platInfo"];
		}
		var platInfoSter = EgretH5Sdk.platInfo.split("_");
		var tmpPlatInfoSter = platInfoSter[2].split("?");
		if (tmpPlatInfoSter[1]) {
			platInfoSter[2] = tmpPlatInfoSter[0];
		}
		var browserType = EgretH5Sdk.getBrowserType();
		var egretH5SdkUserInfos = egretH5SdkUserInfo.split("||");
		if (tokenStr){
			var strs = tokenStr.split("_");
			var tmpStrs = strs[5].split("%");
			if (tmpStrs[1]) {
				strs[5] = tmpStrs[0];
			}
			tmpStrs = strs[5].split("?");
			if (tmpStrs[1]) {
				strs[5] = tmpStrs[0];
			}

			if (platInfoSter[2] != strs[5]) {
				if (browserType == "weixin") {
					EgretH5CreateLogin.thirdPartyLogin("weixin");
				} else {
					// EgretH5CreateLogin.formSubmit(4); // 一进游戏默认使用一键试玩游戏
					EgretH5Sdk.openLoginPanel();
				}
				return;
			}

			var egretH5SdkUserInfosStr = egretH5SdkUserInfos[6].split("?");
			if (egretH5SdkUserInfosStr[1]) {
				egretH5SdkUserInfos[6] = egretH5SdkUserInfosStr[0];
			}

			if (platInfoSter[2] != egretH5SdkUserInfos[6]) {
				if (browserType == "weixin") {
					EgretH5CreateLogin.thirdPartyLogin("weixin");
				} else {
					// EgretH5CreateLogin.formSubmit(4); // 一进游戏默认使用一键试玩游戏
					EgretH5Sdk.openLoginPanel();
				}
				return;
			}
		} else {
			if (platInfoSter[2] != egretH5SdkUserInfos[6]) {
				if (browserType == "weixin") {
					EgretH5CreateLogin.thirdPartyLogin("weixin");
				} else {
					// EgretH5CreateLogin.formSubmit(4); // 一进游戏默认使用一键试玩游戏
					EgretH5Sdk.openLoginPanel();
				}
				return;
			}
		}

		var nowDateTime = new Date().getTime();
		var year = new Date().getFullYear();
		var month = new Date().getMonth() + 1;
		var date = new Date().getDate();
		var nowDateTimeStrs = year + "-" + month + "-" + date;

		var lastDateTimes = parseInt(egretH5SdkUserInfos[5]);
		var lastDateTime = new Date(lastDateTimes);
		var lastYear = lastDateTime.getFullYear();
		var lastMonth = lastDateTime.getMonth() + 1;
		var lastDate = lastDateTime.getDate();
		var lastDateTimeStrs = lastYear + "-" + lastMonth + "-" + lastDate;

		if (rs['showLoginPanel'] == 'no') {
			EgretH5Sdk.goToGame();
			return;
		} else {
			EgretH5Sdk.openLoginPanel('logined');
			return;
		}

		//if (nowDateTimeStrs != lastDateTimeStrs) {
			//EgretH5Sdk.openLoginPanel('logined');
			//return;
		/*
		} else {
			var rs = EgretH5Sdk.getAllParam();
			if (!EgretH5Sdk.platInfo && rs["platInfo"]) {
				EgretH5Sdk.platInfo = rs["platInfo"];
			}
			var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/channel.php/game_" + platInfoSter[2] + "_" + platInfoSter[1] + "?userId=" + egretH5SdkUserInfos[0] + "&userName=" + egretH5SdkUserInfos[1] + "&userImg=" + egretH5SdkUserInfos[2] + "&userSex=" + egretH5SdkUserInfos[3] + "&sign=" + egretH5SdkUserInfos[4] + "&egretSdkPost=1";
			EgretH5Sdk.doGet({
				url: postUrl,
				onSuccess: function (data) {
					var dataObj = eval("(" + data.response + ")");//转换为json对象
					if (dataObj.status !== 0) {
						onResult(false);
					} else {

						var nowDateTime = new Date().getTime();
						var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4]  + "||" + nowDateTime + "||" + platInfoSter[2];
						EgretH5Sdk.addCookie('EgretH5SdkUserInfo', egretH5SdkUserInfo, 240);
						EgretH5Sdk.closeBtn(dataObj.data.token, true, dataObj.data.id);
					}
				},
				onFail: function () {}
			});
			return;
		}
		// */
	}

	if (!tokenStr){
		// 一进游戏默认使用一键试玩游戏
		if (browserType == "weixin") {
			EgretH5CreateLogin.thirdPartyLogin("weixin");
		} else {
			// EgretH5CreateLogin.formSubmit(4); // 一进游戏默认使用一键试玩游戏
			EgretH5Sdk.openLoginPanel();
		}
		return false;

		// onResult(false);
		// return;
	}
	var strs = tokenStr.split("_");
	var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/checkToken.php?mod=User&do=checkSession&token=" + strs[0] + "&platInfo=" + EgretH5Sdk.platInfo + "&platToken=" + strs[2];
	if (!EgretH5Sdk.platInfo && rs["platInfo"]) {
		EgretH5Sdk.platInfo = rs["platInfo"];
	}
	var platInfoSter = EgretH5Sdk.platInfo.split("_");
	var tmpStrs = strs[5].split("%");
	if (tmpStrs[1]) {
		strs[5] = tmpStrs[0];
	}
	var tmpPlatInfoSter = platInfoSter[2].split("?");
	if (tmpPlatInfoSter[1]) {
		platInfoSter[2] = tmpPlatInfoSter[0];
	}
	if (platInfoSter[2] != strs[5]) {
		if (browserType == "weixin") {
			EgretH5CreateLogin.thirdPartyLogin("weixin");
		} else {
			EgretH5CreateLogin.formSubmit(4); // 一进游戏默认使用一键试玩游戏
		}
		return;
	}

	EgretH5Sdk.doGet({
		url: postUrl,
		onSuccess: function (data) {
			var dataObj = eval("(" + data.response + ")");//转换为json对象
			if (dataObj.status !== 0) {

				onResult(false);
			} else {
				var nowDateTime = new Date().getTime();
				var egretH5SdkUserInfo = dataObj.data.pUserId + "||" + dataObj.data.name + "||" + dataObj.data.pic + "||" + dataObj.data.sex + "||" + dataObj.data.sign  + "||" + nowDateTime + "||" + dataObj.data.platId;
				EgretH5Sdk.addCookie('EgretH5SdkUserInfo', egretH5SdkUserInfo, 240);
				var tmpStr = dataObj.data.token + '_' + dataObj.data.oneKey + '_' + dataObj.data.sessionKey + '_' + dataObj.data.pUserId + '_' + dataObj.data.eId + '_' + dataObj.data.platId;
				onResult(tmpStr);
			}
		},
		onFail: function () {
			onResult(false);
		}
	});
};

EgretH5Sdk.open.login = function (fun, funClass, loginType) {
	EgretH5Sdk.callback = fun;
	EgretH5Sdk.callbackThisObject = funClass;
	if (!loginType) {
		loginType = '';
	}
	EgretH5Sdk.loginType = loginType;

	var rs = EgretH5Sdk.getAllParam();
	EgretH5Sdk.platInfo = rs["platInfo"];
	EgretH5Sdk.proxyUrl = location.origin + "/proxy.html";

	EgretH5Sdk.loadingChannelSdk();

	if (rs["token"]) {
		EgretH5Sdk.haveUserSystemPlatToken = rs["token"];
		EgretH5Sdk.closeBtn(rs["token"], true, rs["egretId"]);
		return;
	}
	if (EgretH5Sdk.haveUserSystemPlatToken) {
		EgretH5Sdk.closeBtn(EgretH5Sdk.haveUserSystemPlatToken, true);
		return;
	}

	if (!rs["platInfo"]) {
		alert("错误请求");
		return;
	}


	EgretH5Sdk.openLoginPanel();
};

EgretH5Sdk.openLoginPanel = function(oneKeyPuserId) {
	/*
	 var iframeWidth = 340;
	 if (EgretH5Sdk.getBrowserType() == 'chrome') {
	 var iframeHeight = 430;
	 } else {
	 var iframeHeight = 410;
	 }

	 var height = EgretH5Sdk.getHeight();
	 var width = EgretH5Sdk.getWidth();

	 var scaleRatio = height;
	 if (height > width) {
	 scaleRatio = width;
	 }
	 var scale = scaleRatio / 400;

	 var egretLogin = document.getElementById("egretLogin");
	 if (egretLogin == null) {
	 EgretH5SdkWin.Create(scale, 'yes', '', '<link rel="stylesheet" type="text/css" href="tip.css?v=1.01"><div class="egret_login_div"><div class="egret_login_box" id="egret_login_box"><div class="login_bao"><h3>选择登录方式</h3><p class="username"><input class="egret_login_txt" placeholder="请输入账号"></p><p class="password"><input class="egret_login_txt" placeholder="请输入密码"></p><p><input type="button" class="login_submit" value="登  录" onclick="Egret_login_obj.show_box(&quot;egret_logined_box&quot;)"></p><p class="reg_try"><input type="button" class="reg" value="注  册" onclick="Egret_login_obj.show_box(&quot;egret_reg_box&quot;)"> <input type="button" class="try" value="一键试玩" onclick="Egret_login_obj.gogame()"></p></div><div class="login_orer"><p class="hr"><span class="line fleft"></span><span class="or">or</span><span class="line fright"></span></p><p class="qww"><span class="qq fleft" onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;qq&quot;)">QQ登录</span><span class="fleft weixin" onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;weixin&quot;)">微信登录</span><span class="weibo fright" onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;weibo&quot;)">微博登录</span></p></div></div><div class="egret_login_box hide" id="egret_reg_box"><h3>注册新账号</h3><p class="username"><input class="egret_login_txt" placeholder="请输入新账号"></p><p class="password"><input class="egret_login_txt" placeholder="请输入密码"></p><p><input type="button" class="login_submit" value="立即注册" onclick="Egret_login_obj.show_box(&quot;egret_logined_box&quot;)"></p><p class="reg_try"><input type="button" class="reg" value="返回登录" id="egret_reg_login" onclick="Egret_login_obj.show_box(&quot;egret_login_box&quot;)"> <input type="button" class="try" value="一键试玩" onclick="Egret_login_obj.gogame()"></p></div><div class="egret_login_box hide" id="egret_logined_box"><h3>欢迎回来</h3><p class="wellcome"><img src="./img/u70.png"><br>rhf</p><p class="wellcome">上次登录时间：2015年6月8日11:14:02</p><p><input type="button" class="login_submit" value="进入游戏" onclick="Egret_login_obj.gogame()"></p><p class="reg_try"><input type="button" class="reg" value="更换账号" onclick="Egret_login_obj.show_box(&quot;egret_reg_box&quot;)"> <input type="button" class="try" value="安全设置" onclick="Egret_login_obj.show_box(&quot;egret_safe_box&quot;)"></p><p class="warning"><img src="./img/u64.png">账号安全等级较低，建议进行安全设置</p></div><div class="egret_login_box hide" id="egret_safe_box"><h3>安全设置</h3><p class="eemail"><input class="egret_login_txt" placeholder="请输入安全邮箱"></p><p class="emobile"><input class="egret_login_txt" placeholder="请输入接收信息手机号码"></p><p><input type="button" class="login_submit" value="确  定" onclick="Egret_login_obj.show_box(&quot;egret_logined_box&quot;)"></p></div></div>', iframeWidth, iframeHeight);
	 }
	 // */
	/**/
	EgretH5Sdk.oneKeyPuserId = oneKeyPuserId;
	//EgretH5Sdk.createLoginDiv(oneKeyPuserId);
	EgretH5Sdk.loadLoginDivCss(oneKeyPuserId);

	//
	// 创建登录
	//EgretH5CreateLogin.init(oneKeyPuserId);
};

EgretH5Sdk.open.isOpenShare = function(appId, id, callbackFun, callbackFunClass) {
	var rsData = {};
	rsData["status"] = 0;
	callbackFun.call(callbackFunClass, rsData);
	return;
}

EgretH5Sdk.open.setShareDefaultText = function(shareDefaultText) {
	return;
}

EgretH5Sdk.open.share = function(appId, id, shareTxt, callbackFun, callbackFunClass) {
	return;
}

EgretH5Sdk.open.isOpenAttention = function(appId, id, callbackFun, callbackFunClass) {
	var rsData = {};
	rsData["status"] = 0;
	callbackFun.call(callbackFunClass, rsData);
	return;
}

EgretH5Sdk.open.attention = function(appId, id) {
	return;
}

EgretH5Sdk.open.pay = function(orderInfoObj, callbackFun, callbackFunClass) {

	EgretH5Sdk.payCallback = callbackFun;
	EgretH5Sdk.payCallbackThisObject = callbackFunClass;
	if(typeof orderInfoObj == "string") {
		var orderInfo = eval("(" + orderInfoObj + ")");
	} else {
		var orderInfo = orderInfoObj;
	}

	EgretH5Sdk.loadingChannelSdk();

	var rs = EgretH5Sdk.getAllParam();
	var egretH5SdkUserInfo = EgretH5Sdk.getCookie('EgretH5SdkUserInfo');
	egretH5SdkUserInfo = decodeURIComponent(egretH5SdkUserInfo);
	if (rs["token"]) {
		var postUrl = EgretH5Sdk.apiServerUrl + '/games/api.php?action=pay.buy';
		postUrl = postUrl + '&id=' + orderInfo.uId + '&appId=' + orderInfo.appId + '&goodsId=' + orderInfo.goodsId + '&goodsNumber=' + orderInfo.goodsNumber + '&serverId=' + orderInfo.serverId;
		postUrl = postUrl + '&ext=' + orderInfo.ext + '&runtime=' + orderInfo.runtime;
		postUrl = postUrl + '&proxy=' + location.origin + "/proxy.html";

		EgretH5Sdk.sendUrl(postUrl, EgretH5Sdk.onGetPayRs);
		return;
	}

	if (egretH5SdkUserInfo) {
		if (!EgretH5Sdk.platInfo) {
			if (rs["platInfo"]) {
				EgretH5Sdk.platInfo = rs["platInfo"];
			} else if(rs["appId"] && rs["egretChannelId"]) {
				EgretH5Sdk.platInfo = "open_" + rs["appId"] + "_" + rs["egretChannelId"];
			}
		}

		var egretH5SdkUserInfos = egretH5SdkUserInfo.split("||");
		var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
		// 调试使用
		if (egretH5SdkUserInfos[1] == "1458723509736315") {
			// var eId = egretH5SdkUserInfos[1] + "";
			// if (/^\d+$/.test(eId) && eId.length == 16) {
			// 	alert("dd");
			// }
		}
		// 调试使用结束

		// 一键试玩用户点支付
		var egretId = egretH5SdkUserInfos[1] + "";
		var EgretH5SdkOneKeyReg = EgretH5Sdk.getCookie("EgretH5SdkOneKeyReg");
		if (EgretH5Sdk.getCookie("EgretH5SdkOneKeyReg") == "Yes" || (/^\d+$/.test(egretId) && egretId.length == 16)) {
			EgretH5Sdk.openLoginPanel(egretH5SdkUserInfos[0]);
			// Egret_login_obj.show_box("egret_binding_box"); // 使用新的帐号绑定，带QQ和微博登录的
			Egret_login_obj.show_box("egret_onekeyRegUser_reg"); // 使用旧的帐号绑定
			return;
		}
		if (tokenStr){
			var strs = tokenStr.split("_");
			if (strs[1] === "1") {
				EgretH5Sdk.changeOnekeyUser = 1;
				EgretH5Sdk.openLoginPanel(strs[3]);
				return;
			}

			var platInfoSter = EgretH5Sdk.platInfo.split("_");
			var tmpStrs = strs[5].split("%");
			if (tmpStrs[1]) {
				strs[5] = tmpStrs[0];
			}
			var tmpStrs = strs[5].split("?");
			if (tmpStrs[1]) {
				strs[5] = tmpStrs[0];
			}
			var tmpPlatInfoSter = platInfoSter[2].split("?");
			if (tmpPlatInfoSter[1]) {
				platInfoSter[2] = tmpPlatInfoSter[0];
			}
			if (platInfoSter[2] != strs[5]) {
				EgretH5Sdk.openLoginPanel();
				return;
			}

			var tmpPlatInfoSter = egretH5SdkUserInfos[6].split("?");
			if (tmpPlatInfoSter[1]) {
				egretH5SdkUserInfos[6] = tmpPlatInfoSter[0];
			}
			if (platInfoSter[2] != egretH5SdkUserInfos[6]) {
				EgretH5Sdk.openLoginPanel();
				return;
			}
		}

		if (typeof egretH5SdkUserInfos[7] != undefined && egretH5SdkUserInfos[7] == "1") {
			EgretH5Sdk.openLoginPanel(egretH5SdkUserInfos[0]);
			return;
		}

		var postUrl = EgretH5Sdk.apiServerUrl + '/games/api.php?action=pay.buy&open=egret';
		postUrl = postUrl + '&id=' + orderInfo.uId + '&goodsId=' + orderInfo.goodsId + '&goodsNumber=' + orderInfo.goodsNumber + '&serverId=' + orderInfo.serverId;
		postUrl = postUrl + '&ext=' + orderInfo.ext + '&data=' + EgretH5Sdk.platInfo + '&runtime=' + orderInfo.runtime;

		EgretH5Sdk.doGet({
			url: postUrl,
			onSuccess: function (data) {
				var dataObj = eval("(" + data.response + ")");//转换为json对象
				if (dataObj.status == 0) {
					//*
					var platPayUrl = dataObj.data.url;
					window.location.href = platPayUrl;
					// */
					/*
					 var url = dataObj.data.url + '&url=' + EgretH5Sdk.proxyUrl + '&print=yes';
					 EgretH5SdkWin.Create(scale, '', '', '[pg]' + url, iframeWidth, iframeHeight);
					 // */
				} else {
					console.log('数据错误');
				}
			}
		});
		return;
	}

	var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
	if (!tokenStr){
		EgretH5Sdk.openLoginPanel();
		return;
	}
	var strs = tokenStr.split("_");
	if (strs[1] === "1") {
		EgretH5Sdk.changeOnekeyUser = 1;
		EgretH5Sdk.openLoginPanel(strs[3]);
		return;
	}

	if (!EgretH5Sdk.platInfo && rs["platInfo"]) {
		EgretH5Sdk.platInfo = rs["platInfo"];
	}
	var platInfoSter = EgretH5Sdk.platInfo.split("_");
	var tmpStrs = strs[5].split("%");
	if (tmpStrs[1]) {
		strs[5] = tmpStrs[0];
	}
	var tmpPlatInfoSter = platInfoSter[2].split("?");
	if (tmpPlatInfoSter[1]) {
		platInfoSter[2] = tmpPlatInfoSter[0];
	}
	if (platInfoSter[2] != strs[5]) {
		EgretH5Sdk.openLoginPanel();
		return;
	}

	var postUrl = EgretH5Sdk.apiServerUrl + '/games/api.php?action=pay.buy&open=egret';
	postUrl = postUrl + '&id=' + orderInfo.uId + '&goodsId=' + orderInfo.goodsId + '&goodsNumber=' + orderInfo.goodsNumber + '&serverId=' + orderInfo.serverId;
	postUrl = postUrl + '&ext=' + orderInfo.ext + '&data=' + EgretH5Sdk.platInfo + '&runtime=' + orderInfo.runtime;

	EgretH5Sdk.doGet({
		url: postUrl,
		onSuccess: function (data) {
			var dataObj = eval("(" + data.response + ")");//转换为json对象
			if (dataObj.status == 0) {
				//*
				var platPayUrl = dataObj.data.url;
				window.location.href = platPayUrl;
				// */
				/*
				 var url = dataObj.data.url + '&url=' + EgretH5Sdk.proxyUrl + '&print=yes';
				 EgretH5SdkWin.Create(scale, '', '', '[pg]' + url, iframeWidth, iframeHeight);
				 // */
			} else {
				console.log('数据错误');
			}
		}
	});
};

EgretH5Sdk.onGetPayRs = function (dataObj) {

	if (dataObj.data.usePopup) {
		if (dataObj.data.notice) {
			var rsData = {};
			rsData["orderId"] = dataObj.data.orderId;
			if (callbackFun) {
				callbackFun.call(callbackFunClass, rsData);
			}
		} else {
			var platPayUrl = dataObj.data.sendPayUrl;
			EgretH5Sdk.nowPayOrderId = dataObj.data.orderId;
			EgretH5Sdk.openPayPopup(platPayUrl);
		}
	} else {

		var platPayUrl = dataObj.data.sendPayUrl;
		if (!platPayUrl) {
			alert("该功能未开启，敬请期待！");
			return;
		}

		if (dataObj.data.parentLocation > 1) {
			window.top.location.href = platPayUrl;
		} else if (dataObj.data.parentLocation) {
			window.top.location.href = platPayUrl;
//			var rs = EgretH5Sdk.getAllParam();
//			if(rs.appId == 89719){
//				window.top.location.href = platPayUrl;
//			}else{
//				window.parent.location.href = platPayUrl;
//			}
		} else {
			window.location.href = platPayUrl;
		}
	}
}

EgretH5Sdk.openPayPopup = function (url) {
	var height = EgretH5Sdk.getHeight();
	var width = EgretH5Sdk.getWidth();

	EgretH5SdkWin.Create(1, '', '', '[ag]' + url, width, height);

	var closePayPopupBtnDiv = '<div onclick="EgretH5Sdk.closeBtn();" ><img src="http://api.egret-labs.org/games/www/static/images/egretClosePay.png" width="24px" height="24px"/></div>';
	var closeBtn = document.createElement("DIV");
	closeBtn.style.top = "0px";
	closeBtn.style.right = "0px";
	closeBtn.style.visibility = "inherit";
	closeBtn.style.filter = "alpha(opacity=0)";
	closeBtn.style.position = "absolute";
	closeBtn.style.zIndex = 999999999;
	closeBtn.setAttribute("id", "EgretH5SdkCloseBtn");
	document.body.appendChild(closeBtn);
	document.getElementById("EgretH5SdkCloseBtn").innerHTML = closePayPopupBtnDiv;
};

var Egret_login_obj = {
	$ :function(id) {return document.getElementById(id); },
	hide :function() {
		//new CPS login change by liangyue 2015-10-19 start
		if(document.getElementById('egret_login_box')){
            this.$('egret_login_box').style.display = 'none';
            this.$('egret_reg_box').style.display = 'none';
            this.$('egret_safe_box').style.display = 'none';
            this.$('egret_logined_box').style.display = 'none';
            this.$('egret_onekeyRegUser_reg').style.display = 'none';
            this.$('egret_binding_box').style.display = 'none';
        }
        //new CPS login change by liangyue 2015-10-19 end
	},
	show_box :function(box) {
		this.hide();
		this.$(box).style.display = 'block';
	},
	closeBox: function() {
		var egretNewLogin = document.getElementById("egretNewLogin");
		if (egretNewLogin) {
			document.body.removeChild(egretNewLogin);
		}
		var egretMask = document.getElementById("egretMask");
		if (egretMask) {
			document.body.removeChild(egretMask);
		}
		EgretH5Sdk.closeBtn();
	},
	//new CPS login add by liangyue 2015-10-19 start
    show_box2 :function(box){
        EgretH5Sdk.createLoginDiv(box);
    }
    //new CPS login add by liangyue 2015-10-19 end
}
EgretH5Sdk.createLoginDiv = function(oneKeyPuserId){
	//new CPS login add by liangyue 2015-10-19 start
	var ua = window.navigator.userAgent.toLowerCase();
	if(document.getElementById("egretMask")){
                var egretMask = document.getElementById("egretMask");
                document.body.removeChild(egretMask);
    }
    egretMask = document.createElement("div");
    document.body.appendChild(egretMask);
    egretMask.id = "egretMask";
    egretMask.style.width = "100%";
    egretMask.style.height = "100%";
    egretMask.style.backgroundColor = "#000";
    egretMask.style.position = "absolute";
    egretMask.style.top = "0";
    egretMask.style.left = "0";
    egretMask.style.opacity = "0.5";
    egretMask.style.zIndex = "9999";
	var windowH = EgretH5Sdk.getHeight();
    var windowW = EgretH5Sdk.getWidth();
    var rs = EgretH5Sdk.getAllParam();

    /* 屏蔽不带一键试玩的注册登录框
    if(rs.platInfo){
        var platInfo_ar = rs.platInfo.split("_");
        if(platInfo_ar.length == 3)var pId = platInfo_ar[2];
        if(pId != 18454){
            if(document.getElementById("egretNewLogin")){
                var egretNewLogin = document.getElementById("egretNewLogin");
                //document.body.removeChild(egretNewLogin);
            }else{
            	var egretNewLogin = document.createElement("egretdiv");
            	egretNewLogin.id = "egretNewLogin";
            }
            egretNewLogin.style.width = "300px";
            egretNewLogin.style.height = "260px";
            egretNewLogin.style.position = "absolute";
            egretNewLogin.style.top = "50%";
            egretNewLogin.style.left = "50%";
            egretNewLogin.style.margin = "-130px 0 0 -150px";
            egretNewLogin.style.fontSize = "14px";
            egretNewLogin.style.backgroundColor = "#fff";
            egretNewLogin.style.border = "solid 1px #b0b0b0";
            egretNewLogin.style.borderRadius = "5px";
            egretNewLogin.style.fontFamily = "微软雅黑";
            egretNewLogin.style.color = "#000";
            egretNewLogin.style.zIndex = "10000";
            document.body.appendChild(egretNewLogin);
            var newLoginIndexDiv = '<egretdiv style="text-align: center; font-size: 18px; height: 60px; line-height: 60px; position: relative;">游戏登录</egretdiv><egretdiv style="border-bottom: solid 1px #c6c6c6; height: 125px; margin-top: 15px; text-align: center;"><a href="javascript:void(0);" onclick="EgretH5CreateLogin.thirdPartyLogin(\'qq\')" style=" width: 65px; margin: 0 10px; display: inline-block; color: #000; text-decoration: none;"><i style="display: block; width: 63px; height: 58px; margin-bottom: 5px; padding-top: 5px; background-color: #eee; border-radius: 50%; border:solid 1px #ccc;"><img style="width:80%" src="http://api.egret-labs.org/games/www/newLogin/images/qq.png"></i>QQ登录</a>';
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
               newLoginIndexDiv +='<a href="javascript:void(0);" onclick="EgretH5CreateLogin.thirdPartyLogin(\'weixin\')" style=" width: 65px; margin: 0 10px; display: inline-block; color: #000; text-decoration: none;"><i style="display: block; width: 63px; height: 52px; margin-bottom: 5px; padding-top: 11px; background-color: #eee; border-radius: 50%; border:solid 1px #ccc;"><img style="width:70%" src="http://api.egret-labs.org/games/www/newLogin/images/wx.png"></i>微信登录</a>';
            }
            newLoginIndexDiv += '<a href="javascript:void(0);" onclick="EgretH5CreateLogin.thirdPartyLogin(\'weibo\')" style=" width: 65px; margin: 0 10px; display: inline-block; color: #000; text-decoration: none;"><i style="display: block; width: 63px; height: 51px; margin-bottom: 5px; padding-top: 12px; background-color: #eee; border-radius: 50%; border:solid 1px #ccc;"><img style="width:80%" src="http://api.egret-labs.org/games/www/newLogin/images/wb.png"></i>微博登录</a></egretdiv><egretdiv style="padding: 0 25px; margin-top: 20px;"><a href="javascript:void(0);" onClick="Egret_login_obj.show_box2(\'loginByOther\')" style="float: right; color: #05D; text-decoration:underline;">其他登录方式</a></egretdiv>';
            var newLoginOtherDiv = '<egretdiv style="text-align: center; font-size: 18px; height: 60px; line-height: 60px; position: relative;">游戏登录<a href="javascript:void(0);" onClick="Egret_login_obj.show_box2(\'index\');" style="width: 21px; height: 25px; display: block; position: absolute; top: 18px; left: 20px; background: url(\'http://api.egret-labs.org/games/www/newLogin/images/icon_back.png\');"></a></egretdiv><egretdiv style="width: 250px; margin: 0 auto;"><egretdiv style="height: 35px; margin-bottom: 10px; border: solid 1px #ccc; border-radius: 5px; background-color: #eee; box-shadow:0 0 5px #fff inset;"><label for="user"style="width: 40px; text-align: center; float: left;"><img style="margin-top: 7px;"src="http://api.egret-labs.org/games/www/newLogin/images/icon_user.png"></label><input id="egretUserName" style=" width:180px;border: none; padding: 0; background: none; color: #7b7b7b; height: 100%; float: left; font-size: 12px;"type="text"placeholder="请输入账号"></egretdiv><egretdiv style="height: 35px; margin-bottom: 10px; border: solid 1px #ccc; border-radius: 5px; background-color: #eee; box-shadow:0 0 5px #fff inset;"><label for="pw"style="width: 40px; text-align: center; float: left;"><img style="margin-top: 8px;"src="http://api.egret-labs.org/games/www/newLogin/images/icon_lock.png"></label><input id="egretPassword" style=" width:180px;border: none; padding: 0; background: none; color: #7b7b7b; height: 100%; float: left; font-size: 12px;"type="password"placeholder="请输入密码"></egretdiv><button onclick="EgretH5CreateLogin.formSubmit(1);" style="width: 100%; height: 37px; font-size: 16px; border: none; background-color: #f58b19; color: #fff; border-radius: 5px; margin-bottom: 20px;">登录</button><egretdiv style="color: red; font-size: 12px;"></egretdiv></egretdiv>';
            var newLoginSafeDiv = '<egretdiv style="text-align: center; font-size: 18px; height: 60px; line-height: 60px; position: relative;">安全设置<a href="javascript:void(0);" onClick="Egret_login_obj.show_box2(\'logined\');" style="width: 21px; height: 25px; display: block; position: absolute; top: 18px; left: 20px; background: url(\'http://api.egret-labs.org/games/www/newLogin/images/icon_back.png\');"></a></egretdiv><egretdiv style="width: 250px; margin: 0 auto;"><egretdiv style="height: 35px; margin-bottom: 10px; border: solid 1px #ccc; border-radius: 5px; background-color: #eee; box-shadow:0 0 5px #fff inset;"><label for="em"style="width: 40px; text-align: center; float: left;"><img style="margin-top: 10px;"src="http://api.egret-labs.org/games/www/newLogin/images/icon_em.png"></label><input id="egretSafetyBindingEmail"style=" width:180px;border: none; padding: 0; background: none; color: #7b7b7b; height: 100%; float: left; font-size: 12px;"type="text"placeholder="请输入安全邮箱"></egretdiv><egretdiv style="height: 35px; margin-bottom: 10px; border: solid 1px #ccc; border-radius: 5px; background-color: #eee; box-shadow:0 0 5px #fff inset;"><label for="mobile"style="width: 40px; text-align: center; float: left;"><img style="margin-top: 6px;"src="http://api.egret-labs.org/games/www/newLogin/images/icon_mobile.png"></label><input id="egretSafetyBindingMobile"style=" width:180px;border: none; padding: 0; background: none; color: #7b7b7b; height: 100%; float: left; font-size: 12px;"type="text"placeholder="请输入绑定手机号"></egretdiv><button onclick="EgretH5CreateLogin.safetyBinding();" style="width: 100%; height: 37px; font-size: 16px; border: none; background-color: #f58b19; color: #fff; border-radius: 5px; margin-bottom: 20px;">确定</button></egretdiv>';

            document.getElementById('egretNewLogin').innerHTML = newLoginIndexDiv;
            if(oneKeyPuserId == 'loginByOther'){
                document.getElementById('egretNewLogin').innerHTML = newLoginOtherDiv;
            }else if(oneKeyPuserId == 'logined'){
                var userInfo = EgretH5Sdk.userInfoFormat();
                document.getElementById('egretNewLogin').innerHTML = '<egretdiv style="text-align: center; font-size: 18px; height: 60px; line-height: 60px; position: relative;">欢迎回来</egretdiv><egretdiv style="width: 250px; margin: 0 auto;"><dl style="text-align: center; margin: 0; padding: 0;"><dt style="margin: 0; padding: 0;"><img width="50" height="50" src="'+userInfo.egretUserPic+'"></dt><dd style="margin: 0 0 2px; padding: 0; font-size: 14px;">'+userInfo.egretUserName+'</dd><dd style="margin: 0 0 10px; padding: 0; font-size: 12px; color: #858585;">'+userInfo.egretLastLoginTime+'</dd></dl><button onClick="EgretH5Sdk.goToGame()" style="width: 100%; height: 37px; font-size: 16px; border: none; background-color: #f58b19; color: #fff; border-radius: 5px; margin-bottom: 10px;">回到游戏</button><button onclick="Egret_login_obj.show_box2(\'index\')" style="width: 110px; height: 30px; font-size: 14px; border: none; background-color: #4171af; color: #fff; border-radius: 5px; margin-bottom: 10px;margin-right:30px;">更换账号</button><button onclick="Egret_login_obj.show_box2(\'safe\')" style="width: 110px; height: 30px; font-size: 14px; border: none; background-color: #27afe0; color: #fff; border-radius: 5px; margin-bottom: 10px; float: right;">安全设置</button></egretdiv>';
            }else if(oneKeyPuserId == 'safe'){
                document.getElementById('egretNewLogin').innerHTML = newLoginSafeDiv;
                EgretH5Sdk.getUserBindInfo();
            }else{
                oneKeyPuserId = 'loginIndex';
            }
            if(windowW < windowH){
                EgretH5Sdk.scale = windowW/380;
            }else{
                EgretH5Sdk.scale = windowH/320;
            }
            egretNewLogin.style.msTransform = "scale("+EgretH5Sdk.scale+","+EgretH5Sdk.scale+")";
            egretNewLogin.style.webkitTransform = "scale("+EgretH5Sdk.scale+","+EgretH5Sdk.scale+")";
            egretNewLogin.style.transform = "scale("+EgretH5Sdk.scale+","+EgretH5Sdk.scale+")";
            var egretDiv = document.getElementsByTagName("egretdiv");
            for(var i = 0; i < egretDiv.length; i++){
                egretDiv[i].style.display="block";
            }
            return ;
        }
    }
    */

    // 使用一键试玩注册登录框
	var egretLoginDiv = document.getElementById("egretNewLogin");
	if (egretLoginDiv && egretLoginDiv != undefined) {
		document.body.removeChild(egretLoginDiv);
	}

	// 如果是微信未登录情况，使用微信登录
	if(ua.match(/MicroMessenger/i) == 'micromessenger' && oneKeyPuserId == undefined){
		EgretH5CreateLogin.thirdPartyLogin("weixin");
		return ;
	}
	var egretLoginDiv = '<div class="egret_login_div"id="egret_login_div" style="width:85%;"><div class="egret_login_box"id="egret_login_box" style="position:relative;border:1px solid;"><div class="login_bao" style="position:relative;" id="login_bao"><h3>选择登录方式</h3><piv style="display:block;" class="username"><input class="egret_login_txt"placeholder="请输入白鹭账号"id="egretUserName"/></piv><piv style="display:block;" class="password"><input type="password" class="egret_login_txt" placeholder="请输入密码"id="egretPassword"/></piv><piv style="display:block"><input type="button"class="login_submit"value="登  录"onclick="EgretH5CreateLogin.formSubmit(1);"/></piv><piv style="display:block;margin-top:10px;" class="reg_try"><input type="button"class="reg"value="注  册"onclick="Egret_login_obj.show_box(&quot;egret_reg_box&quot;)"/><input type="button"class="try"value="一键试玩"onclick="EgretH5CreateLogin.formSubmit(4);"/></piv></div><div class="login_orer" id="login_orer"><piv style="display:block;" class="hr"><span class="line fleft"></span><span class="or">or</span><span class="line fright"></span></piv><piv style="display:block;" class="qww"><span id="egret_qq_login_div"class="qq fleft"onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;qq&quot;)">QQ登录</span><span id="egret_weixin_login_div"class="fleft weixin"onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;weixin&quot;)">微信登录</span><span id="egret_weibo_login_div"class="weibo fright"onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;weibo&quot;)">微博登录</span></piv></div></div><div class="egret_login_box hide"id="egret_reg_box"style="position:relative;border:1px solid;"><h3>注册新账号</h3><piv style="display:block;" class="username"><input class="egret_login_txt"placeholder="请输入新账号"id="egretReguserName"/></piv><piv style="display:block;" class="password"><input class="egret_login_txt" type="password" placeholder="请输入密码"id="egretRegpassword"/></piv><piv style="display:block;"><input type="button"class="login_submit"value="立即注册"onclick="EgretH5CreateLogin.formSubmit(2);"/></piv><piv style="display:block;margin-top:10px;" class="reg_try"><input type="button"class="reg"value="返回登录"id="egret_reg_login"onclick="Egret_login_obj.show_box(&quot;egret_login_box&quot;)"/><input type="button"class="try"value="一键试玩"onclick="EgretH5CreateLogin.formSubmit(4);"/></piv></div><div class="egret_login_box hide"id="egret_binding_box"style="position:relative;border:1px solid;"><div class="login_bao"><h3>绑定账号</h3><piv style="display:block;" class="username"><input class="egret_login_txt" placeholder="请输入新账号" id="egretBindingName"/></piv><piv style="display:block;" class="password"><input class="egret_login_txt" placeholder="请输入密码" type="password" id="egretBindingPassword"/></piv><piv style="display:block;"><input type="button"class="login_submit"value="立即绑定"onclick="EgretH5CreateLogin.formSubmit(5);"/></piv></div><div class="login_orer" id="login_orer"><piv style="display:block;" class="hr"><span class="line fleft"></span><span class="or">or</span><span class="line fright"></span></piv><piv style="display:block;" class="qww"><span id="egret_qq_login_div" style="margin-top:15%;" class="qq fleft"onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;qq&quot;)">QQ登录</span><span id="egret_weibo_login_div" style="margin-top: 15%;" class="weibo fright"onclick="EgretH5CreateLogin.thirdPartyLogin(&quot;weibo&quot;)">微博登录</span></piv></div></div><div class="egret_login_box hide"id="egret_onekeyRegUser_reg"style="position:relative;border:1px solid;"><h3>绑定账号</h3><piv style="display:block;" class="username"><input class="egret_login_txt"placeholder="请输入新账号"id="egretOneKeyReguserName"/></piv><piv style="display:block;" class="password"><input class="egret_login_txt"placeholder="请输入密码" type="password" id="egretOneKeyRegpassword"/></piv><piv style="display:block;margin-top:10px;" class="reg_try"><input type="button"class="reg"value="关闭"onclick="Egret_login_obj.closeBox();"/><input type="button"id="egretOneKeyReg" onclick="EgretH5CreateLogin.formSubmit(3)" class="try"value="注册"/></piv><piv style="display:block;font-size: 12px;margin-top:5px;" ><img src="http://api.egret-labs.org/games/www/static/login/css/img/u64.png"/>&nbsp;您正在使用<span style="color:red;font-weight:bolder;">试玩账号</span>进行游戏，请注册正式<br/>账号。试玩角色将会被完全继承到正式账号下。</piv></div><div class="egret_login_box hide"id="egret_logined_box"style="position:relative;border:1px solid;"><h3>欢迎回来</h3><piv style="display:block;" class="wellcome"id="egret_last_login_user"><img src="http://api.egret-labs.org/games/www/static/login/css/img/u70.png"/><br/>rhf</piv><piv style="display:block;" class="wellcome"id="egret_last_login_time"></piv><piv style="display:block;"><input type="button"id="egret_go_to_game"class="login_submit"value="进入游戏"/></piv><piv style="display:block;margin-top:10px;" class="reg_try"><input type="button"class="reg"value="更换账号"onclick="Egret_login_obj.show_box(&quot;egret_login_box&quot;)"/><input type="button"class="try"value="安全设置"onclick="Egret_login_obj.show_box(&quot;egret_safe_box&quot;)"/></piv><piv style="display:block;margin-top:5px;" class="warning"id="egret_binding_warning"><img src="http://api.egret-labs.org/games/www/static/login/css/img/u64.png"/>账号安全等级较低，建议进行安全设置</piv></div><div class="egret_login_box hide"id="egret_safe_box"style="position:relative;border:1px solid;"><h3>安全设置</h3><piv style="display:block;" class="eemail"><input class="egret_login_txt"placeholder="请输入安全邮箱"id="egretSafetyBindingEmail"/></piv><piv style="display:block;" class="emobile"><input class="egret_login_txt"placeholder="请输入接收信息手机号码"id="egretSafetyBindingMobile"/></piv><piv style="display:block;margin-top:10px;"class="reg_try"><input type="button"class="reg"value="返  回"onclick="Egret_login_obj.show_box(&quot;egret_logined_box&quot;)"><input style="background:#f58b19;"type="button"class="try"value="确  定"onclick="EgretH5CreateLogin.safetyBinding();"></piv></div></div>';
	var oDiv = document.createElement("div");
	oDiv.id = "egretNewLogin";
	document.body.appendChild(oDiv);
	document.getElementById('egretNewLogin').innerHTML = egretLoginDiv;
	document.getElementById('egretNewLogin').style.position = "absolute";
	document.getElementById('egretNewLogin').style.zIndex = "99999";
	document.getElementById('egret_login_div').style.margin = "3% auto";
    	document.getElementById('egret_login_div').style.top = "3%";
	// var boxH = document.getElementById('egret_login_box').clientHeight;
	// var windowH = window.screen.Height;
	//var windowW = window.screen.Width;

	EgretH5Sdk.oldWindowH = windowH;
    EgretH5Sdk.oldWindowW = windowW;
	//var browserType = EgretH5Sdk.getBrowserType();
	//if(browserType == "weixin") {

	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		//是微信浏览器
		document.getElementById('egret_weixin_login_div').style.marginLeft="15px";
	}else{
		//不是微信浏览器
		document.getElementById('egret_weixin_login_div').style.display="none";
		if(windowH>windowW){
			document.getElementById('egret_qq_login_div').style.WebkitMarginStart="60px";
			document.getElementById('egret_weibo_login_div').style.WebkitMarginEnd="60px";

			document.getElementById('egret_qq_login_div').style.MozMarginStart="60px";
			document.getElementById('egret_weibo_login_div').style.MozMarginEnd="60px";

			document.getElementById('egret_qq_login_div').style.marginLeft="60px";
			document.getElementById('egret_weibo_login_div').style.marginRight="60px";

		}else{
			document.getElementById('egret_qq_login_div').style.WebkitMarginBefore="30px";
			document.getElementById('egret_weibo_login_div').style.WebkitMarginBefore="30px";

			document.getElementById('egret_qq_login_div').style.marginTop="30px";
			document.getElementById('egret_weibo_login_div').style.marginTop="30px";

		}
	}
	//360手助隐藏第三方登陆start add by liangyue 2015 09 25
	var rs = EgretH5Sdk.getAllParam();
    if(rs.platInfo){
        var platInfo_ar = rs.platInfo.split("_");
        var pId = gameId = 0;
        if(platInfo_ar.length == 3){
        	pId = platInfo_ar[2];
        	gameId = platInfo_ar[1];
        }
        if(pId == 18454 ){
            // document.getElementById('login_bao').style.width="100%";
            // document.getElementById('login_orer').style.display="none";
        }
    }
	////360手助隐藏第三方登陆 end
	if(windowH>windowW){
		document.getElementById('egretNewLogin').style.width="375px";
		document.getElementById('egretNewLogin').style.height="414px";
		document.getElementById('login_bao').style.width="100%";

		document.getElementById('login_orer').style.width="90%";
		document.getElementById('login_orer').style.position="relative";
		document.getElementById('egretNewLogin').style.WebkitTransform="scale("+(windowW/375)+")";
		document.getElementById('egretNewLogin').style.WebkitMarginStart=((windowW-375)/2)+"px";
		document.getElementById('egretNewLogin').style.WebkitMarginBefore=((windowH-414)/4)+"px";

		document.getElementById('egretNewLogin').style.MozTransform="scale("+(windowW/375)+")";
		document.getElementById('egretNewLogin').style.MozMarginStart=((windowW-375)/2)+"px";
		document.getElementById('egretNewLogin').style.MozMarginBefore=((windowH-414)/4)+"px";

		document.getElementById('egretNewLogin').style.MsTransform="scale("+(windowW/375)+")";


		document.getElementById('egretNewLogin').style.OTransform="scale("+(windowW/375)+")";


		document.getElementById('egretNewLogin').style.marginLeft=((windowW-375)/2)+"px";
		document.getElementById('egretNewLogin').style.marginTop=((windowH-414)/4)+"px";

		document.getElementById('egretNewLogin').style.top=((windowH-414)/4)+"px";
		document.getElementById('egretNewLogin').style.minHeight="414px";
		document.getElementById('egretNewLogin').style.minWidth="375px";
		document.getElementById('egretNewLogin').style.overflow="hidden";

	}else{
		document.getElementById('egretNewLogin').style.width="667px";
		document.getElementById('egretNewLogin').style.height="300px";
		var boxH = document.getElementById('egret_login_box').offsetHeight;
		document.getElementById('egretNewLogin').style.WebkitTransform="scale("+(windowW/667)+")";
		document.getElementById('egretNewLogin').style.WebkitMarginStart=((windowW-667)/2)+"px";

		document.getElementById('egretNewLogin').style.MozTransform="scale("+(windowW/667)+")";
		document.getElementById('egretNewLogin').style.MozMarginStart=((windowW-667)/2)+"px";

		document.getElementById('egretNewLogin').style.MsTransform="scale("+(windowW/667)+")";


		document.getElementById('egretNewLogin').style.OTransform="scale("+(windowW/667)+")";


		document.getElementById('egretNewLogin').style.marginLeft=((windowW-667)/2)+"px";

		document.getElementById('egretNewLogin').style.top="0px";
		if(windowH>boxH){
			document.getElementById('egretNewLogin').style.WebkitMarginBefore=((windowH-boxH)/4)+"px";

			document.getElementById('egretNewLogin').style.marginTop=((windowH-boxH)/4)+"px";
		}
		document.getElementById('egretNewLogin').style.overflow="auto";
		document.getElementById('login_bao').style.marginLeft="0px";
	}

	if (oneKeyPuserId && oneKeyPuserId != undefined && JSON.stringify(oneKeyPuserId) != "{}") {
		if (oneKeyPuserId == "logined") {
			Egret_login_obj.show_box("egret_logined_box");
			var egretH5SdkUserInfo = EgretH5Sdk.getCookie('EgretH5SdkUserInfo');
			egretH5SdkUserInfo = decodeURIComponent(egretH5SdkUserInfo);
			if (egretH5SdkUserInfo) {
				var egretH5SdkUserInfos = egretH5SdkUserInfo.split("||");
				var lastDateTimes = parseInt(egretH5SdkUserInfos[5]);
				var lastDateTime = new Date(lastDateTimes);
				var lastYear = lastDateTime.getFullYear();
				var lastMonth = lastDateTime.getMonth() + 1;
				var lastDate = lastDateTime.getDate();
				var lastHours = lastDateTime.getHours();
				var lastMinutes = lastDateTime.getMinutes();
				var lastSeconds = lastDateTime.getSeconds();
				if (lastHours < 10) {
					lastHours = "0" + lastHours;
				}
				if (lastMinutes < 10) {
					lastMinutes = "0" + lastMinutes;
				}
				if (lastSeconds < 10) {
					lastSeconds = "0" + lastSeconds;
				}

				var lastHoursStr = lastHours + ":" + lastMinutes + ":" + lastSeconds;

				var egretLastLoginTime = document.getElementById("egret_last_login_time");
				egretLastLoginTime.innerHTML = "上次登录时间：" + lastYear + "年" + lastMonth + "月" + lastDate + "日" + lastHoursStr;

				var egretLastLoginUser = document.getElementById("egret_last_login_user");
				var userInfoStr = '';
				if (egretH5SdkUserInfos[2]) {
					userInfoStr = '<img style="width:100px;height:100px;" src="'+ egretH5SdkUserInfos[2] + '" /><br />' + decodeURIComponent(egretH5SdkUserInfos[1]) + '';
				} else {
					userInfoStr = '<img style="width:100px;height:100px;" src="http://api.egret-labs.org/games/www/static/login/css/img/u70.png" /><br />' + decodeURIComponent(egretH5SdkUserInfos[1]) + '';
				}
				egretLastLoginUser.innerHTML = userInfoStr;

				var postGetBindingInfoUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/getBindingInfo.php?userId=" + egretH5SdkUserInfos[0];
				EgretH5Sdk.doGet({
					url: postGetBindingInfoUrl,
					onSuccess: function (data) {
						var dataObj = eval("(" + data.response + ")");//转换为json对象
						if (dataObj.status !== 0) {
						} else {
							if (dataObj.data.retrieveEmail || (dataObj.data.retrieveMobile && dataObj.data.retrieveMobile != "0")) {
								var egretBindingWarning = document.getElementById("egret_binding_warning");
								egretBindingWarning.innerHTML = '';
							}
						}
					},
					onFail: function () {}
				});

				var egretGoToGame = document.getElementById("egret_go_to_game");
				egretGoToGame.onclick = function () {
					//new CPS login change by Liangyue 2015-09-19 start
					// if (!EgretH5Sdk.platInfo && rs["platInfo"]) {
					// 	EgretH5Sdk.platInfo = rs["platInfo"];
					// }
					// var platInfoSter = EgretH5Sdk.platInfo.split("_");
					// var tmpPlatInfoSter = platInfoSter[2].split("?");
					// if (tmpPlatInfoSter[1]) {
					// 	platInfoSter[2] = tmpPlatInfoSter[0];
					// }
					// var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/channel.php/game_" + platInfoSter[2] + "_" + platInfoSter[1] + "?userId=" + egretH5SdkUserInfos[0] + "&userName=" + egretH5SdkUserInfos[1] + "&userImg=" + egretH5SdkUserInfos[2] + "&userSex=" + egretH5SdkUserInfos[3] + "&sign=" + egretH5SdkUserInfos[4] + "&egretSdkPost=1";
					// EgretH5Sdk.doGet({
					// 	url: postUrl,
					// 	onSuccess: function (data) {
					// 		var dataObj = eval("(" + data.response + ")");//转换为json对象
					// 		if (dataObj.status !== 0) {
					// 			alert("请点击切换账号，重新登录！");
					// 		} else {

					// 			var nowDateTime = new Date().getTime();
					// 			var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
					// 			if (tokenStr){
					// 				var strs = tokenStr.split("_");
					// 				if (strs[1] === "1") {
					// 					var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4]  + "||" + nowDateTime + "||" + platInfoSter[2] + "||1";
					// 				} else {
					// 					var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4]  + "||" + nowDateTime + "||" + platInfoSter[2];
					// 				}
					// 			} else {
					// 				if (typeof egretH5SdkUserInfos[7] != undefined && egretH5SdkUserInfos[7] == "1") {
					// 					var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4]  + "||" + nowDateTime + "||" + platInfoSter[2] + "||1";
					// 				} else {
					// 					var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4] + "||" + nowDateTime + "||" + platInfoSter[2];
					// 				}
					// 			}

					// 			EgretH5Sdk.addCookie('EgretH5SdkUserInfo', egretH5SdkUserInfo, 0);
					// 			var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
					// 			EgretH5Sdk.delCookie('EgretH5SdkNewToken');
					// 			EgretH5Sdk.closeBtn(dataObj.data.token, true, dataObj.data.id);
					// 		}
					// 	},
					// 	onFail: function () {}
					// });

					EgretH5Sdk.goToGame();
					//new CPS login change by Liangyue 2015-09-19 end
				}
			}
		} else {
			// Egret_login_obj.show_box("egret_onekeyRegUser_reg");
			// // 弹出注册提交
			// var egretOneKeyReg = document.getElementById("egretOneKeyReg");
			// egretOneKeyReg.onclick = function () {
			// 	EgretH5CreateLogin.formSubmit(3, oneKeyPuserId);
			// }
		}
	} else {
		/*
		var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/oneKeyReg.php?mod=User&do=oneKeyReg" + "&platInfo=" + EgretH5Sdk.platInfo;
		EgretH5Sdk.sendUrl(postUrl, function(dataObj){
			if(document.getElementById("egretMask")){
				var egretMask = document.getElementById("egretMask");
				document.body.removeChild(egretMask);
			}
			if(document.getElementById("egretNewLogin")){
				var egretNewLogin = document.getElementById("egretNewLogin");
				document.body.removeChild(egretNewLogin);
			}
			var nowDateTime = new Date().getTime();
			var egretH5SdkUserInfo = dataObj.data.pUserId + "||" + dataObj.data.name + "||" + dataObj.data.pic + "||" + dataObj.data.sex + "||" + dataObj.data.sign  + "||" + nowDateTime + "||" + dataObj.data.platId;
			EgretH5Sdk.addCookie('EgretH5SdkUserInfo', egretH5SdkUserInfo, 240);
			console.log(dataObj);
		});
		*/
	}
};
//new cps Login add by liangyue 2015-09-19 start
EgretH5Sdk.getUserBindInfo = function(){
    var egretH5SdkUserInfo = EgretH5Sdk.getCookie('EgretH5SdkUserInfo');
    if (egretH5SdkUserInfo) {
        var egretH5SdkUserInfos = egretH5SdkUserInfo.split("||");
        var postGetBindingInfoUrl = EgretH5Sdk.apiServerUrl + "/games/www/egret/getBindingInfo.php?userId=" + egretH5SdkUserInfos[0];
        EgretH5Sdk.doGet({
            url: postGetBindingInfoUrl,
            onSuccess: function (data) {
                var dataObj = eval("(" + data.response + ")");//转换为json对象
                if (dataObj.status !== 0) {
                } else {
                    if (dataObj.data.retrieveEmail || (dataObj.data.retrieveMobile && dataObj.data.retrieveMobile != "0")) {
                        document.getElementById("egretSafetyBindingMobile").value = dataObj.data.retrieveMobile == 0 ? '' : dataObj.data.retrieveMobile ;
                        document.getElementById("egretSafetyBindingEmail").value = dataObj.data.retrieveEmail;
                    }
                }
            },
            onFail: function () {}
        });
    }
};
EgretH5Sdk.userInfoFormat = function(){
    var egretH5SdkUserInfo = EgretH5Sdk.getCookie('EgretH5SdkUserInfo');
    if (egretH5SdkUserInfo) {
        var egretH5SdkUserInfos = egretH5SdkUserInfo.split("||");
        var lastDateTimes = parseInt(egretH5SdkUserInfos[5]);
        var lastDateTime = new Date(lastDateTimes);
        var lastYear = lastDateTime.getFullYear();
        var lastMonth = lastDateTime.getMonth() + 1;
        var lastDate = lastDateTime.getDate();
        var lastHours = lastDateTime.getHours();
        var lastMinutes = lastDateTime.getMinutes();
        var lastSeconds = lastDateTime.getSeconds();
        if (lastHours < 10) {
            lastHours = "0" + lastHours;
        }
        if (lastMinutes < 10) {
            lastMinutes = "0" + lastMinutes;
        }
        if (lastSeconds < 10) {
            lastSeconds = "0" + lastSeconds;
        }

        var lastHoursStr = lastHours + ":" + lastMinutes + ":" + lastSeconds;

        var egretLastLoginTime = "上次登录时间：" + lastYear + "年" + lastMonth + "月" + lastDate + "日" + lastHoursStr;

        var egretUserPic = '';
        if (egretH5SdkUserInfos[2]) {
            egretUserPic = egretH5SdkUserInfos[2];
            egretUserName = decodeURIComponent(egretH5SdkUserInfos[1]);
        } else {
            egretUserPic = 'http://api.egret-labs.org/games/www/static/login/css/img/u70.png';
            egretUserName = decodeURIComponent(egretH5SdkUserInfos[1]);
        }
        return {
            egretLastLoginTime : egretLastLoginTime,
            egretUserPic       : egretUserPic,
            egretUserName      : egretUserName
        }
    }
};
EgretH5Sdk.goToGame = function(){
    var egretH5SdkUserInfo = EgretH5Sdk.getCookie('EgretH5SdkUserInfo');
    var egretH5SdkUserInfos = egretH5SdkUserInfo.split("||");
    if (!EgretH5Sdk.platInfo && rs["platInfo"]) {
        EgretH5Sdk.platInfo = rs["platInfo"];
    }
    var platInfoSter = EgretH5Sdk.platInfo.split("_");
    var tmpPlatInfoSter = platInfoSter[2].split("?");
    if (tmpPlatInfoSter[1]) {
        platInfoSter[2] = tmpPlatInfoSter[0];
    }
    var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/channel.php/game_" + platInfoSter[2] + "_" + platInfoSter[1] + "?userId=" + egretH5SdkUserInfos[0] + "&userName=" + egretH5SdkUserInfos[1] + "&userImg=" + egretH5SdkUserInfos[2] + "&userSex=" + egretH5SdkUserInfos[3] + "&sign=" + egretH5SdkUserInfos[4] + "&egretSdkPost=1";
    EgretH5Sdk.doGet({
        url: postUrl,
        onSuccess: function (data) {
            var dataObj = eval("(" + data.response + ")");//转换为json对象
            if (dataObj.status !== 0) {
                alert("请点击切换账号，重新登录！");
            } else {
            	if(document.getElementById("egretMask")){
                	var egretMask = document.getElementById("egretMask");
                	document.body.removeChild(egretMask);
    			}
                var nowDateTime = new Date().getTime();
                var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
                if (tokenStr){
                    var strs = tokenStr.split("_");
                    if (strs[1] === "1") {
                        var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4]  + "||" + nowDateTime + "||" + platInfoSter[2] + "||1";
                    } else {
                        var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4]  + "||" + nowDateTime + "||" + platInfoSter[2];
                    }
                } else {
                    if (typeof egretH5SdkUserInfos[7] != undefined && egretH5SdkUserInfos[7] == "1") {
                        var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4]  + "||" + nowDateTime + "||" + platInfoSter[2] + "||1";
                    } else {
                        var egretH5SdkUserInfo = egretH5SdkUserInfos[0] + "||" + egretH5SdkUserInfos[1] + "||" + egretH5SdkUserInfos[2] + "||" + egretH5SdkUserInfos[3] + "||" + egretH5SdkUserInfos[4] + "||" + nowDateTime + "||" + platInfoSter[2];
                    }
                }

                EgretH5Sdk.addCookie('EgretH5SdkUserInfo', egretH5SdkUserInfo, 240);
                var tokenStr = EgretH5Sdk.getCookie('EgretH5SdkNewToken');
                EgretH5Sdk.delCookie('EgretH5SdkNewToken');
                EgretH5Sdk.closeBtn(dataObj.data.token, true, dataObj.data.id);
            }
        },
        onFail: function () {}
    });
};
//new cps Login add by liangyue 2015-09-19 end
EgretH5Sdk.loadLoginDivCss = function(oneKeyPuserId){
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oCss= document.createElement("link");
	oCss.type = "text/css";
	oCss.rel = "stylesheet";
	if (oCss.readyState) {
		oCss.onreadystatechange = function() {
			if (oCss.readyState == "loaded" || oCss.readyState == "complete") {
				oCss.onreadystatechange = null;
				EgretH5Sdk.createLoginDiv(oneKeyPuserId);
			}
		};
	} else {
		if (window.onload) {
			oCss.onload = function() {EgretH5Sdk.createLoginDiv(oneKeyPuserId);};
		} else {
			window.onReady(function () {
				EgretH5Sdk.createLoginDiv(oneKeyPuserId);
			});
		}
	}
	oCss.href = "http://api.egret-labs.org/games/www/static/login/css/tip_new.css?v=1.01";
	oHead.appendChild(oCss);
	EgretH5Sdk.createLoginDiv(oneKeyPuserId);
};
EgretH5Sdk.evt = "onorientationchange" in window ? "orientationchange" : "resize";
window.addEventListener(EgretH5Sdk.evt, function() {
    var nowWindowH = EgretH5Sdk.getHeight();
    var nowWindowW = EgretH5Sdk.getWidth();
    if(nowWindowW == EgretH5Sdk.oldWindowW || nowWindowH == EgretH5Sdk.oldWindowH){
        return false;
    }
    if(document.getElementById('egretNewLogin')){
		setTimeout(function(){EgretH5Sdk.createLoginDiv(EgretH5Sdk.oneKeyPuserId);},500);
    }
}, false);

~function() {
	var FNArray=[];
	var D = document;
	/**
	 * 使用举例：
	 window.onReady(FunctionName[,argu1,[argu2,[....]]]);
	 */
	window.onReady = function(fallBackFunction) {

		var argu=[];
		for(var i=1,len=arguments.length; i<len; i++) {
			argu.push(arguments[i]);
		}
		var is_ie = !!(window.attachEvent && !window.opera); //增加的
		if(window.readyBound) return fallBackFunction.apply(this,argu);
		if(!is_ie) return   fallBackFunction.apply(this,argu);
		FNArray.push(fallBackFunction);
		readyBound = true;
		var ready = 0;
		//Mozilla, Opera and webkit nightlies currently support this event
		if(D.addEventListener) {
			//Use the handy event callback
			D.addEventListener("DOMContentLoaded", function() {
				D.removeEventListener("DOMContentLoaded", arguments.callee, false);
				if(ready) return;
				ready = 1;
				for(var i=0,len=FNArray.length; i<len; i++) {
					FNArray[i] ? FNArray[i].apply(this,argu) : 0;
				}
			}, false);

			// If IE event model is used
		} else if(D.attachEvent) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			D.attachEvent("onreadystatechange", function() {
				if(D.readyState === "complete") {
					D.detachEvent("onreadystatechange", arguments.callee);
					if (ready) return;
					ready = 1;
					for(var i=0,len=FNArray.length; i<len; i++) {
						FNArray[i] ? FNArray[i].apply(this,argu) : 0;
					}
				}
			});

			// If IE and not an iframe
			// continually check to see if the D is ready
			if(D.documentElement.doScroll && window == window.top)(function() {
				if(ready) return;
				try {
					// If IE is used, use the trick by Diego Perini
					// http://javascript.nwbox.com/IEContentLoaded/
					D.documentElement.doScroll("left");
				} catch(error) {
					setTimeout(arguments.callee, 0);
					return;
				}
				ready = 1;
				for (var i=0,len=FNArray.length; i<len; i++) {
					FNArray[i] ? FNArray[i].apply(this,argu) : 0;
				}
			})();
		}
	};
}();
