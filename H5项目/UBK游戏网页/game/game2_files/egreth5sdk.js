var EgretH5Sdk = {};
EgretH5Sdk.token;
EgretH5Sdk.callback;
EgretH5Sdk.callbackThisObject;
EgretH5Sdk.platInfo;
EgretH5Sdk.proxyUrl;
EgretH5Sdk.haveUserSystemPlatToken;
EgretH5Sdk.loadingChannelSdkStatus;
EgretH5Sdk.changeOnekeyUser;
EgretH5Sdk.payCallback;
EgretH5Sdk.payCallbackThisObject;
EgretH5Sdk.channelOtherInfo;
EgretH5Sdk.windowOrientation;
EgretH5Sdk.rotationCallback;
EgretH5Sdk.rotationCallbackThisObject;
EgretH5Sdk.nowPayOrderId;
EgretH5Sdk.nowGoodsId;
EgretH5Sdk.loginType;
EgretH5Sdk.isOpenAttentionCallback;
EgretH5Sdk.isOpenAttentionCallbackThisObject;
EgretH5Sdk.attentionCallback;
EgretH5Sdk.attentionCallbackThisObject;
EgretH5Sdk.inviteCallback;
EgretH5Sdk.inviteCallbackThisObject;
EgretH5Sdk.apiServerUrl = "http://api.egret-labs.org";
EgretH5Sdk.tencentApiServerUrl = "http://api.gz.1251278653.clb.myqcloud.com";

EgretH5Sdk.loadjsfile = function (filename, type){
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript= document.createElement("script");
	oScript.type = "text/javascript";
	oScript.charset = "utf-8";
	
	if (type == 'load') {
		if (oScript.readyState) {
			oScript.onreadystatechange = function() {
				if (oScript.readyState == "loaded" || oScript.readyState == "complete") {
					oScript.onreadystatechange = null;
					EgretH5Sdk.loadjsfileCallback();
				}
			};
		} else {

			//if (window.onload) {
				oScript.onload = function() {
					EgretH5Sdk.loadjsfileCallback();
				};
			//} else {
			//	window.onReady(function () {
			//		EgretH5Sdk.loadjsfileCallback();
			//	});
			//}
		}
	}
	oScript.src = filename;
	oHead.appendChild(oScript);
};

EgretH5Sdk.decryptString = function(str) {

	str = decodeURIComponent(str);

	var xc = "", xd = new Array(), xe = "", xf = 0;
	for(i = 0; i < str.length; i++) {
		xa = str.charCodeAt(i);
		if(xa < 128) {
			xa = xa ^ 7;
		}
		xe += String.fromCharCode(xa);
		if(xe.length > 80) {
			xd[xf++] = xe;
			xe = "";
		}
	}
	xc = xd.join("") + xe;

	return xc;
}

EgretH5Sdk.getHeight = function () {
	var winHeight = 0;
	//获取窗口高度
	if (window.innerHeight) {
		winHeight = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight;
	}
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientHeight) {
		winHeight = document.documentElement.clientHeight;
	}
	return winHeight;
};

EgretH5Sdk.getWidth = function () {
	var winWidth = 0;
	//获取窗口宽度
	if (window.innerWidth) {
		winWidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth;
	}
	//通过深入Document内部对body进行检测，获取窗口大小
	if (document.documentElement && document.documentElement.clientWidth) {
		winWidth = document.documentElement.clientWidth;
	}
	return winWidth;
};

EgretH5Sdk.getAllParam = function () {
	var url = location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		var strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			var tmpStrs = strs[i].split("=");
			if (tmpStrs.length > 2) {
				var string = strs[i].split(tmpStrs[0] + "=");
				theRequest[tmpStrs[0]] = string[1];
			} else {
				theRequest[tmpStrs[0]] = tmpStrs[1];
			}
		}
	}

	return theRequest;
};

EgretH5Sdk.addCookie = function (name, value, expiresHours) {
	var rs = EgretH5Sdk.getAllParam();
	if(window.localStorage){
		window.localStorage[name] = value;
	}

	var cookieString = name + "=" + encodeURIComponent(value);
	//设置cookie时间
	if (expiresHours > 0) {
		var date = new Date();
		date.setTime(date.getTime + expiresHours * 3600 * 1000);
		var rs = EgretH5Sdk.getAllParam();
		cookieString = cookieString + "; expires=" + date.toGMTString() + ";path=/;domain=egret-labs.org";
	}
	document.cookie = cookieString;
};

EgretH5Sdk.getCookie = function (name) {
	var rs = EgretH5Sdk.getAllParam();
	if(window.localStorage){
		var cookieVal = window.localStorage[name];
		if (cookieVal != undefined) {
			cookieVal = decodeURIComponent(cookieVal);
			return cookieVal;
		}
	}

	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for (var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if (arr[0] == name) {
			cookieVal = decodeURIComponent(arr[1]);
			return cookieVal;
			//return arr[1];
		}
	}

	return "";
};

EgretH5Sdk.delCookie = function (name) {
	if(window.localStorage) {
		localStorage.removeItem(name);
	}
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = EgretH5Sdk.getCookie(name);
	if(cval) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;domain=egret-labs.org";
	}
};

EgretH5Sdk.postChannelUserInfo = function (userId, userName, userPic, accessToken) {

	userName = userName.replace("#", "");
	userName = userName.replace("&", "");
	userName = userName.replace("=", "");
	userName = userName.replace("?", "");
	var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/game.php/" + EgretH5Sdk.channelOtherInfo + "?userId=" + userId + "&userName=" + userName + "&accessToken=" + accessToken + "&userPic=" + userPic;

	this.doGet({
		url: postUrl,
		onSuccess: function (data) {
			var dataObj = eval("(" + data.response + ")");//转换为json对象
			if (dataObj.status !== 0) {

				alert('登录失败');
			} else {
				var data = {};
				data["token"] = dataObj.data.token;
				data["id"] = dataObj.data.id;
				data["status"] = 0;
				EgretH5Sdk.executeCallback(data);
			}
		},
		onFail: function () {
			alert('登录失败');
		}
	});
}

EgretH5Sdk.sendUrl = function (postUrl, onResult) {
	this.doGet({
		url: postUrl,
		onSuccess: function (data) {
			try{
				var dataObj = eval("(" + data.response + ")");//转换为json对象
				onResult(dataObj);
			}catch(e){}
			
		},
		onFail: function () {
			onResult(false);
		}
	});
};

EgretH5Sdk.postChannelPayInfo = function (channelOrderId, egretOrderId, goodsId) {

	var postUrl = EgretH5Sdk.apiServerUrl + "/games/www/pay.php/" + EgretH5Sdk.channelOtherInfo + "?channelOrderId=" + channelOrderId + "&egretOrderId=" + egretOrderId + "&goodsId=" + goodsId;

	this.doGet({
		url: postUrl,
		onSuccess: function (data) {
			var dataObj = eval("(" + data.response + ")");//转换为json对象
			if (dataObj.status !== 0) {

				alert('支付失败');
			} else {
				var rsData = {};
				rsData["orderId"] = egretOrderId;
				if (EgretH5Sdk.payCallback) {
					EgretH5Sdk.payCallback.call(EgretH5Sdk.payCallbackThisObject, rsData);
				}
			}
		},
		onFail: function () {
			alert('支付失败');
		}
	});
}

EgretH5Sdk.doGet = function (obj) {

	var url = obj.url;
	var onSuccess = obj.onSuccess;
	if (!url) {
		console.error("no url");
		return;
	}
	if (!onSuccess) {
		console.error("no onSuccess");
		return;
	}

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.send();

	function onReadyStateChange() {
		if (xhr.readyState == 4) {
			if (xhr.status >= 400 || xhr.status == 0) {
				console.error("404:" + url);
			}
			else {
				var data = { "response": xhr.responseText};
				onSuccess(data);
			}
		}
	}

	xhr.onreadystatechange = onReadyStateChange;
};

EgretH5Sdk.closeBtn = function (tokenStr, haveUserSystem, eId) {

	var egretLoginDiv = document.getElementById("egretNewLogin");
	if (egretLoginDiv && egretLoginDiv != undefined) {
		document.body.removeChild(egretLoginDiv);
	}

	if (haveUserSystem) {
		var data = {};
		data["token"] = tokenStr;
		data["id"] = eId;
		data["status"] = 0;
		EgretH5Sdk.executeCallback(data);
		return;
	}

	EgretH5SdkWin.Close('win' + EgretH5SdkWinid, 10);
	EgretH5SdkWin.ndiv('ndiv' + EgretH5SdkWinid, 10);

	var EgretH5SdkCloseBtn = document.getElementById("EgretH5SdkCloseBtn");
	if (EgretH5SdkCloseBtn && EgretH5SdkCloseBtn != undefined) {
		document.body.removeChild(EgretH5SdkCloseBtn);

		var rsData = {};
		rsData["orderId"] = EgretH5Sdk.nowPayOrderId;
		if (EgretH5Sdk.payCallback) {
			EgretH5Sdk.payCallback.call(EgretH5Sdk.payCallbackThisObject, rsData);
		}
	}

	if (tokenStr && tokenStr != 'undefined' && !EgretH5Sdk.changeOnekeyUser) {
		EgretH5Sdk.addCookie('EgretH5SdkNewToken', tokenStr, 240);
		var strs = tokenStr.split("_");
		var data = {};
		data["token"] = strs[0];
		data["id"] = strs[4];
		data["status"] = 0;
		EgretH5Sdk.executeCallback(data);
	} else if (EgretH5Sdk.changeOnekeyUser) {
		if (tokenStr) {
			EgretH5Sdk.changeOnekeyUser = 0;
			EgretH5Sdk.addCookie('EgretH5SdkNewToken', tokenStr, 240);
		}
	}
};

EgretH5Sdk.executeCallback = function (parm) {
	if (EgretH5Sdk.callback) {
		EgretH5Sdk.callback.call(EgretH5Sdk.callbackThisObject, parm);
	}
};

EgretH5Sdk.checkLogin = function (fun, funClass, loginType) {
	EgretH5Sdk.callback = fun;
	EgretH5Sdk.callbackThisObject = funClass;
	if (!loginType) {
		loginType = '';
	}
	EgretH5Sdk.loginType = loginType;

	var rs = EgretH5Sdk.getAllParam();
	EgretH5Sdk.platInfo = rs["platInfo"];
	EgretH5Sdk.proxyUrl = location.origin + "/proxy.html";

	EgretH5Sdk.callEgretChannelApi('checkLogin');
}

EgretH5Sdk.login = function (fun, funClass, loginType) {
	EgretH5Sdk.callback = fun;
	EgretH5Sdk.callbackThisObject = funClass;
	if (!loginType) {
		loginType = '';
	}
	EgretH5Sdk.loginType = loginType;
	
	var rs = EgretH5Sdk.getAllParam();
	EgretH5Sdk.platInfo = rs["platInfo"];
	EgretH5Sdk.proxyUrl = location.origin + "/proxy.html";
	
	EgretH5Sdk.callEgretChannelApi('login');
};

EgretH5Sdk.logout = function (callbackFun, callbackFunClass) {
	EgretH5Sdk['logoutParam'] = {};
	EgretH5Sdk['logoutParam']['callbackFun'] = callbackFun;
	EgretH5Sdk['logoutParam']['callbackFunClass'] = callbackFunClass;
	EgretH5Sdk.callEgretChannelApi('logout');
};

EgretH5Sdk.isOpenShare = function(appId, id, callbackFun, callbackFunClass) {
	EgretH5Sdk['isOpenShareParam'] = {};
	EgretH5Sdk['isOpenShareParam']['appId'] = appId;
	EgretH5Sdk['isOpenShareParam']['id'] = id;
	EgretH5Sdk['isOpenShareParam']['callbackFun'] = callbackFun;
	EgretH5Sdk['isOpenShareParam']['callbackFunClass'] = callbackFunClass;
	EgretH5Sdk.callEgretChannelApi('isOpenShare');
}

EgretH5Sdk.setShareDefaultText = function(shareDefaultText) {
	EgretH5Sdk['setShareDefaultTextParam'] = {};
	EgretH5Sdk['setShareDefaultTextParam']['shareDefaultText'] = shareDefaultText;
	EgretH5Sdk.callEgretChannelApi('setShareDefaultText');
}

EgretH5Sdk.share = function(appId, id, shareTxt, callbackFun, callbackFunClass) {
	EgretH5Sdk['shareParam'] = {};
	EgretH5Sdk['shareParam']['appId'] = appId;
	EgretH5Sdk['shareParam']['id'] = id;
	EgretH5Sdk['shareParam']['shareTxt'] = shareTxt;
	EgretH5Sdk['shareParam']['callbackFun'] = callbackFun;
	EgretH5Sdk['shareParam']['callbackFunClass'] = callbackFunClass;
	EgretH5Sdk.callEgretChannelApi('share');
}

EgretH5Sdk.isOpenAttention = function(appId, id, callbackFun, callbackFunClass) {
	EgretH5Sdk.isOpenAttentionCallback = callbackFun;
	EgretH5Sdk.isOpenAttentionCallbackThisObject = callbackFunClass;
	
	var postUrl = EgretH5Sdk.apiServerUrl + '/games/api.php?action=user.attention&id=' + id + '&appId=' + appId;

	EgretH5Sdk.sendUrl(postUrl, EgretH5Sdk.onGetIsOpenAttentionRs);
}

EgretH5Sdk.onGetIsOpenAttentionRs = function(dataObj) {
	var rsData = {};
	if (dataObj.data.result == 'fail') {
		rsData["status"] = 0;
	} else {
		if (dataObj.data.response == 1 && !dataObj.data.attentionUrl) {
			rsData["status"] = 0;
		} else {
			rsData["status"] = dataObj.data.response;
		}
	}
	if (dataObj.data.text) {
		rsData["text"] = dataObj.data.text;
	}
	
	EgretH5Sdk.isOpenAttentionCallback.call(EgretH5Sdk.isOpenAttentionCallbackThisObject, rsData);
}

EgretH5Sdk.attention = function(appId, id, callbackFun, callbackFunClass) {
	EgretH5Sdk.attentionCallback = callbackFun;
	EgretH5Sdk.attentionCallbackThisObject = callbackFunClass;

	var postUrl = EgretH5Sdk.apiServerUrl + '/games/api.php?action=user.attention&id=' + id + '&appId=' + appId;

	EgretH5Sdk.sendUrl(postUrl, EgretH5Sdk.onGetAttentionRs);
}

EgretH5Sdk.onGetAttentionRs = function(dataObj) {
		if (dataObj.data.result == 'fail') {
			alert('暂未开放，敬请期待！');
			return;
		}

		if (dataObj.data.attentionUrl) {
			var attentionUrl = dataObj.data.attentionUrl;
			if (dataObj.data.parentLocation) {
				window.parent.location.href = attentionUrl;
			} else {
				window.location.href = attentionUrl;
			}
		} else {
			var rsData = {};
			if (dataObj.data.response == 3) {
				rsData["status"] = 1;
			} else {
				rsData["status"] = 0;
			}
			EgretH5Sdk.attentionCallback.call(EgretH5Sdk.attentionCallbackThisObject, rsData);
		}
}

EgretH5Sdk.pay = function(orderInfoObj, callbackFun, callbackFunClass) {
	
	EgretH5Sdk.payCallback = callbackFun;
	EgretH5Sdk.payCallbackThisObject = callbackFunClass;
	if(typeof orderInfoObj == "string") {
		var orderInfo = eval("(" + orderInfoObj + ")");
	} else {
		var orderInfo = orderInfoObj;
	}

	EgretH5Sdk['payParam'] = {};
	EgretH5Sdk['payParam']['orderInfoObj'] = orderInfo;
	EgretH5Sdk.callEgretChannelApi('pay');
};

EgretH5Sdk.invite = function(inviteInfoObj, callbackFun, callbackFunClass) {
	
	EgretH5Sdk.inviteCallback = callbackFun;
	EgretH5Sdk.inviteCallbackThisObject = callbackFunClass;

	EgretH5Sdk['inviteParam'] = {};
	EgretH5Sdk['inviteParam']['inviteInfoObj'] = inviteInfoObj;
	EgretH5Sdk.callEgretChannelApi('invite');
};

EgretH5Sdk.getCustomInfo = function(appId, id, callbackFun, callbackFunClass) {

	EgretH5Sdk['getCustomInfoParam'] = {};
	EgretH5Sdk['getCustomInfoParam']['appId'] = appId;
	EgretH5Sdk['getCustomInfoParam']['id'] = id;
	EgretH5Sdk['getCustomInfoParam']['callbackFun'] = callbackFun;
	EgretH5Sdk['getCustomInfoParam']['callbackFunClass'] = callbackFunClass;

	var postUrl = EgretH5Sdk.apiServerUrl + '/games/api.php?action=user.getCustomInfo';
	postUrl = postUrl + '&id=' + id + '&appId=' + appId;
	
	EgretH5Sdk.sendUrl(postUrl, EgretH5Sdk.onGetCustomInfoRs);
	return;
};

EgretH5Sdk.onGetCustomInfoRs = function (dataObj) {
	var rsData = {};
	var getCustomInfoParam = EgretH5Sdk['getCustomInfoParam'];
	if (getCustomInfoParam.callbackFun && dataObj.data) {
		rsData = dataObj.data;
		getCustomInfoParam.callbackFun.call(getCustomInfoParam.callbackFunClass, rsData);
	}
	return;
}

EgretH5Sdk.callEgretChannelApiFunction = function(apiFunction) {
	var rs = EgretH5Sdk.getAllParam();
	if (rs["openid"] && rs["openkey"]) {
		var currentChannelSDK = EgretH5Sdk["qzone"];
	} else if (rs["chls"]) {
		if (rs["isNewApi"]) {
			var chls = rs["chls"];
		} else {
			var chls = EgretH5Sdk.decryptString(rs["chls"]);
		}
		var currentChannelSDK = EgretH5Sdk[chls];
	} else {
		var currentChannelSDK = EgretH5Sdk["open"];
	}
	
	if (apiFunction == 'checkLogin') {
		currentChannelSDK.checkLogin(EgretH5Sdk.callback, EgretH5Sdk.callbackThisObject, EgretH5Sdk.loginType);
	} else if (apiFunction == 'login') {
		currentChannelSDK.login(EgretH5Sdk.callback, EgretH5Sdk.callbackThisObject, EgretH5Sdk.loginType);
	} else if (apiFunction == 'pay') {
		var payParam = EgretH5Sdk['payParam'];
		currentChannelSDK.pay(payParam.orderInfoObj, EgretH5Sdk.payCallback, EgretH5Sdk.payCallbackThisObject);
	} else if (apiFunction == 'isOpenShare') {
		var isOpenShareParam = EgretH5Sdk['isOpenShareParam'];
		currentChannelSDK.isOpenShare(isOpenShareParam.appId, isOpenShareParam.id, isOpenShareParam.callbackFun, isOpenShareParam.callbackFunClass);
	} else if (apiFunction == 'setShareDefaultText') {
		var setShareDefaultTextParam = EgretH5Sdk['setShareDefaultTextParam'];
		currentChannelSDK.setShareDefaultText(setShareDefaultTextParam.shareDefaultText);
	} else if (apiFunction == 'share') {
		var shareParam = EgretH5Sdk['shareParam'];
		currentChannelSDK.share(shareParam.appId, shareParam.id, shareParam.shareTxt, shareParam.callbackFun, shareParam.callbackFunClass);
	} else if (apiFunction == 'isOpenAttention') {
		var isOpenAttentionParam = EgretH5Sdk['isOpenAttentionParam'];
		currentChannelSDK.isOpenAttention(isOpenAttentionParam.appId, isOpenAttentionParam.id, isOpenAttentionParam.callbackFun, isOpenAttentionParam.callbackFunClass);
	} else if (apiFunction == 'attention') {
		var attentionParam = EgretH5Sdk['attentionParam'];
		currentChannelSDK.attention(attentionParam.appId, attentionParam.id);
	} else if (apiFunction == 'logout') {
		var logoutParam = EgretH5Sdk['logoutParam'];
		if (typeof currentChannelSDK == "undefined" || typeof currentChannelSDK.logout == "undefined") {
			var rsData = {};
			rsData["status"] = 0;
			logoutParam.callbackFun.call(logoutParam.callbackFunClass, rsData);
			return;
		}
		
		try {
			currentChannelSDK.logout(logoutParam.callbackFun, logoutParam.callbackFunClass);
		} catch (e) {
			var rsData = {};
			rsData["status"] = 0;
			logoutParam.callbackFun.call(logoutParam.callbackFunClass, rsData);
			return;
		}
		
	} else if (apiFunction == 'invite') {
		var inviteParam = EgretH5Sdk['inviteParam'];
		currentChannelSDK.invite(inviteParam.inviteInfoObj, EgretH5Sdk.inviteCallback, EgretH5Sdk.inviteCallbackThisObject);
	}
}

EgretH5Sdk.callEgretChannelApi = function(apiFunction) {

	var filename;
	var channelName;
	var rs = EgretH5Sdk.getAllParam();
	if (rs["openid"] && rs["openkey"]) {
		filename = EgretH5Sdk.tencentApiServerUrl + "/games/www/static/channelsdk/egreth5_qzone.js?v=" + new Date().getTime();
		channelName = 'qzone';
	} else if (rs["chls"]) {
		if (rs["isNewApi"]) {
			var chls = rs["chls"];
		} else {
			var chls = EgretH5Sdk.decryptString(rs["chls"]);
		}
		filename = EgretH5Sdk.apiServerUrl + "/games/www/static/channelsdk/egreth5_" + chls + ".js?v=" + new Date().getTime();
		channelName = chls;
	} else {
		if (rs["platInfo"]) {
			EgretH5Sdk.platInfo = rs["platInfo"];
			var platInfoSter = EgretH5Sdk.platInfo.split("_");
			if ((platInfoSter[1] == 22 && platInfoSter[2] == 9166) || (platInfoSter[1] == 193 && platInfoSter[2] == 9166)) {
				filename = EgretH5Sdk.apiServerUrl + "/games/www/static/channelsdk/egreth5_open_test.js?v=" + new Date().getTime();
			} else {
				filename = EgretH5Sdk.apiServerUrl + "/games/www/static/channelsdk/egreth5_open.js?v=" + new Date().getTime();
			}
		} else {
			filename = EgretH5Sdk.apiServerUrl + "/games/www/static/channelsdk/egreth5_open.js?v=" + new Date().getTime();
		}
		//filename = EgretH5Sdk.apiServerUrl + "/games/www/static/channelsdk/egreth5_open.js?v=" + new Date().getTime();
		channelName = 'open';
	}

	if (EgretH5Sdk[channelName]) {
		EgretH5Sdk.callEgretChannelApiFunction(apiFunction);
		return;
	}

	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript= document.createElement("script");
	oScript.type = "text/javascript";
	oScript.charset = "utf-8";

    if (oScript.readyState) {
        oScript.onreadystatechange = function() {
            if (oScript.readyState == "loaded" || oScript.readyState == "complete") {
                oScript.onreadystatechange = null;
                EgretH5Sdk.callEgretChannelApiFunction(apiFunction);
            }
        };
    } else {
		//if (window.onload) {
			oScript.onload = function() {
				EgretH5Sdk.callEgretChannelApiFunction(apiFunction);
			};
		//} else {
		//	window.onReady(function () {
		//		EgretH5Sdk.callEgretChannelApiFunction(apiFunction);
		//	});
		//}
    }
	oScript.src = filename;
	oHead.appendChild(oScript);
};

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