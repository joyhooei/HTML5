(function() {
	var SDK = {
		gameId: '',	//游戏ID
		openId: '', //游戏OPEN_ID
		platformId: 'debug',//平台
		serverId: 0, //服务器ID
		userId: '', //玩家ID openId
		time: 0, //登录时间
		channel: '',//平台（渠道）
		token: '', //token
		servers: [],//服务求数组
		isLocal: false,//是否本地
		sdkInited: false,//SDK是否初始化
		playerData:null, //游戏里的玩家数据
		apiUrl:null,//api地址
		needGetOpenId:false, //是否需要获取openId
		currServer:null,
		needGetOrder:false, //是否需要获取订单号
		isHttps:false, //是否是HTTPS
		//SDK.currServer {serverId， serverName, serverState, ip, port, loginTime}
		//SDK.playerData {serverId, name, level, gold, roleId}
		csInfo:"345918536",
		csName: "加入官方QQ群：",
		csDes:"详情请进入QQ群咨询游戏客服，可获得礼品兑换码",
		requestOpenIdApi:"requestStOpenid",
		cdnPath:'', //CDN路径
		ganeName:'',//游戏名称
		//obj:{name 交易名称  cost 钱数, goodsId 商品ID , gold:金币数量, playerName 玩家名称， serverId 服务器, result:获取的订单参数}
		getPayParams:function(obj){
			return obj;
		},
		//params:{goodsId, goodsName rmb gold playerName, serverId}
		pay: function(params) {
			console.warn('支付接口未被实现！');
		},
		setPayCallback: function(callback, target) {
			SDK.payCallback = callback;
			SDK.payCbTarget = target;
		},
		canShare: false,
		hasShare: false,
		onShareSuccess:null,
		share:function(obj){},
		setShareCallback: function(callback, target) {
			SDK.onShareSuccess = callback;
			SDK.shareCbTarget = target;
		},
		canFollow: false,
		hasFollow: false,
		followStatus: false, //是否关注
		follow: function() {
			console.warn('关注接口未被实现！');
		},
		setFollowCallback: function(callback, target) {
			SDK.onFollowSuccess = callback;
			SDK.followCbTarget = target;
		},
		
		hasInvite: false,
		hasShortCut: false,
		shortCut: function() {

		},
		setShortCutCallback: function(callback, target) {
			SDK.onShortCutSuccess = callback;
			SDK.shortCutCbTarget = target;
		},
		hasJoinQQ: false,
		qqLinkSrc: '',
		clientIp: '',
		joinQQ: function() {

		},
		notifyInited: function() {
			SDK.sdkInited = true;
			window.CustomEventDispatcher && window.MyCustomEvent && window.CustomEventDispatcher.send(window.MyCustomEvent.SDK_INITED);
		},
		selectServer: function() {

		},
		createRoleComplete: function() {

		},
		loginComplete: function() {

		},
		levelUp:function(level){

		},
		sendInvite: function() {

		},
		reload:function(){

		},
		//获取openID参数
		getOpenIdParams:function(){
			return "token="+SDK.token;
		},
		//获取服务器参数
		getServerParams:function(){
			return "openid="+SDK.openId;
		},
		//获取登录参数
		getLoginParams:function(){
			return {openid:SDK.openId};
		},
		//获取充值订单参数
		getPayOrderParams:function(obj){
			return obj;
		},
		getGoodsId:function(obj){
			return obj.id;
		},
		getCurrency:function(rmb){
			return rmb+"元";
		}
	};
	SDK.cdnPath = window['cdn_path'];
	SDK.gameName = window["game_name"] || "三国创世纪";
	SDK.apiUrl = window["api_url"];
	var shareRoot = SDK.cdnPath+"/share/",
	shareList = [{
		title: SDK.gameName,
		desc: "史上最刺激的三国杀场，一刀一马三秒一杀。",
		imgUrl: shareRoot + "share_icon_1.gif"
	}, {
		title: SDK.gameName,
		desc: "百服混战狼烟四起，实时战斗名将归心",
		imgUrl: shareRoot + "share_icon_1.gif"
	}, {
		title: SDK.gameName,
		desc: "来吧，我们一起一统三国！",
		imgUrl: shareRoot + "share_icon_1.gif"
	}];
	SDK.getShareObj = function() {
		return shareList[Math.random() * shareList.length | 0];
	}

	window.SDK = SDK;

	var location = window.location,
	host = location.host,
	port = location.port;
	SDK.isLocal = host == "localhost" || ((host.indexOf("192.168") != -1 || host.indexOf("127.0.0.1") != -1) && port != 81); //本地81端口模拟外网
	//是否可以充值，用于干掉渠道充值
	SDK.canRecharge = function()
	{
		//if(SDK.channel=="plat_xingleyou") return false;
		return true;
	}
	
	SDK.getServerList = function(callback, target) {
		$.getJSON(SDK.apiUrl + "serverList?"+SDK.getServerParams(), function(data) {
			callback && callback.call(target, data);
		});
	}
	SDK.getServerInfo = function(callback, target) {
		$.getJSON(SDK.apiUrl + "closeMsg?"+SDK.getServerParams(), function(data) {
			callback && callback.call(target, data);
		});
	}

	SDK.setLoginServer = function(callback, target) {
		$.getJSON(SDK.apiUrl + "serverChoose?"+SDK.getServerParams()+"&server="+SDK.serverId, function(data) {
			callback && callback.call(target, data);
		});
	}
	SDK.getOpenId = function(callback, target) {
		if(!SDK.needGetOpenId){
			callback && callback.call(target);
			return;
		}
		$.getJSON(SDK.apiUrl + SDK.requestOpenIdApi+"?"+SDK.getOpenIdParams(), function(data) {
			SDK.openId = data.openid;
			callback && callback(data);
		});
	}
	$.ajaxSetup({
		crossDomain: true
	});
	//获取SDK的文件配置
	var sdksUrl = SDK.cdnPath+'js/sdks.json?v=7ecd4051e8'+new Date().getTime();
	$.getJSON(sdksUrl, function(sdks) {
		initSDK(sdks);
	});
	//初始化SDK
	function initSDK(sdks) {
		var sdkUrl = SDK.cdnPath;
		var sdk;
		//如果不是玩吧
		if (host.indexOf("urlshare.cn") == -1) {
			var info = $.queryString("info");
			if(SDK.isLocal){
				var infoObj = {};
				infoObj.pfId = "debug";
				infoObj.userid = 'sdfdfdd';
				infoObj.channel = "debug";
				infoObj.openId = infoObj.userid;
				infoObj.time = new Date().getTime();
				info = JSON.stringify(infoObj);
			}
			if (info) {
				info = JSON.parse(info);
				SDK.platformId = info.pfId;
				sdk = getSdkConfig(sdks);
				if (sdk) {
					SDK.userId = "" + info.userid;
					SDK.openId = "" + info.openid;
					SDK.time = info.time;
					SDK.token = info.token;
					SDK.channel = info.pfId;
					SDK.csInfo = sdk.csInfo;
					SDK.extra = info;
					$.getScript(sdkUrl+sdk.sdkSrc);
				} else
					alert("SDK初始化失败，请刷新重试");
			} else {
				var game_channel = $.queryString("game_channel");
				if (game_channel) {
					var plat = $.queryString("plat");
					//可玩渠道也有plat字段冲突了， 所以改为了plat2
					if(plat == "kewanh5"){
						plat = $.queryString("plat2");
					}
					SDK.platformId = plat;
					SDK.channel = game_channel;					
					sdk = getSdkConfig(sdks);
					if (sdk) {
						SDK.csInfo = sdk.csInfo;
						$.getScript(sdkUrl+sdk.sdkSrc);
						
					} else
						alert("SDK初始化失败，请刷新重试");
				} else {
					//玩吧测试
					SDK.isHttps = false;
					SDK.time = new Date().getTime() / 1000 | 0;
					SDK.platformId = "debug";
					SDK.channel = "debug";
					SDK.csInfo = "345918536";
					SDK.userId = $.queryString("userid") || "";
					SDK.notifyInited();
					console.log("SDK匹配失败，本地测试环境");
				}
			}
		} else if (window.getOpenKey && OPEN_DATA) { //玩吧
			
			SDK.platformId = "wanba_ts";
			SDK.isHttps = true;
			sdk = getSdkConfig(sdks);
			if (sdk) {
				SDK.csInfo = sdk.csInfo;
				$.ajaxSetup({
					crossDomain: true
				});
				$.getScript(sdkUrl+sdk.sdkSrc);
			}
		}
		if (!SDK.isLocal /* || SDK.platformId != ""*/ ) {
			//屏蔽console
			// window.console = {
			// 	log: function() {},
			// 	error: function() {},
			// 	warn: function() {},
			// 	info: function() {}
			// }
			// window.alert = function() {}
		}
	}
	//获取平台SDK配置
	function getSdkConfig(sdks) {
		var i, sdk, len = sdks.length;
		for (i = 0; i < len; i++) {
			sdk = sdks[i];
			if (sdk != null && sdk.pfId == SDK.platformId) {
				return sdk;
			}
		}
	}

	$.queryString = function(name, notDecode) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			if (!notDecode)
				return decodeURIComponent(r[2]);
			return r[2];
		}
	}
})();