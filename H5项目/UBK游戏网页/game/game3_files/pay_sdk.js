/*
	sdk 引用下列值：
	params_analysis.js 中的mZmEngine.mChannelParams.token
	URL.js 中的 mZmParams# zapid gameid

	

*/
var channelSdkx;

var ZmSdk = (function() {

	var instance;
	//这里实现逻辑
	function createInstance() {
		//这个根据具体的sp名称命名 由createc7724Ins()方法进行实例化 TODO
		var c7724Ins;

		var zmUtils;

		var frameDeep;
		var userJson = {};

		function isReady() {
			return userJson.userdata && userJson.userdata.uid;
		}
		/*
			向zmserver请求添加基本参数
		*/
		function addBaseParams(requestJsonData) {
try {
if(iplook.ret==1){
requestJsonData["ip"] =  iplook.ip;
requestJsonData["city"] =  (iplook.city);
requestJsonData["country"] =  (iplook.country);
requestJsonData["province"] =  (iplook.province);
}
} catch (er) {}
			requestJsonData["appid"] = mZmParams.zapid;
			requestJsonData["prover"] = mZmParams.prover;
			requestJsonData["channel"] = mZmParams.channel;
			requestJsonData["zmuid"] = userJson.userdata.uid;
			requestJsonData["sdkindx"] = mZmParams.sdkindx;
			requestJsonData["channlesdkver"] = mZmParams.channlesdkver;
			requestJsonData["includezmsdk"] = "0";
		}

		/*这里实现zmsdk相关业务 start*/
		//不支持
		function Base64Encode(s) {
			// var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			var map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			if (!s) {
				return;
			}
			s += '';
			if (s.length === 0) {
				return s;
			}
			//这里排除中文编码
			// s = escape(s);

			var i, b, x = [], padchar = map[64];
			var len = s.length - s.length % 3;

			for (i = 0; i < len; i += 3) {
				b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8) | s.charCodeAt(i + 2);
				x.push(map.charAt(b >> 18));
				x.push(map.charAt((b >> 12) & 0x3f));
				x.push(map.charAt((b >> 6) & 0x3f));
				x.push(map.charAt(b & 0x3f));
			}

			switch (s.length - len) {
				case 1:
					b = s.charCodeAt(i) << 16;
					x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + padchar + padchar);
					break;
				case 2:
					b = (s.charCodeAt(i) << 16) | (s.charCodeAt(i + 1) << 8);
					x.push(map.charAt(b >> 18) + map.charAt((b >> 12) & 0x3f) + map.charAt((b >> 6) & 0x3f) + padchar);
					break;
			}
			return x.join('');
		}
		/* 这个接口不对外 */
		function reportUser() {
			var userinfojson = {
				"username":userJson.userdata.username
			};

			addBaseParams(userinfojson);

			zmUtils.ajax(mZmEngine.zmRUSP,
				JSON.stringify(userinfojson),
				function(data) {
					console.log("reportuser ret_code_:" + data.code);
			});
		}

		/*这里实现zmsdk相关业务 end*/

		/*这里实现第三方sdk相关业务 start TODO*/
		function createc7724Ins() {

			var supportMethods = "|init|pay|showQRCode|setShareInfo|share|reportRoleStatus|isSubscribe|";
			return {
				isSupportMethod: function(methodStr) {
					return supportMethods.indexOf("|"+methodStr+"|")<0?false:true;
				},
				init: function(callback) {
					console.log("c7724 init start...");

					//用户认证
					var getjsonCb = function(jsonobj) {
						console.log("c7724 ajax ret jsonobj_:" , jsonobj);
						if (jsonobj.status == "0") { //成功
							
							var loginInfo={
								"qqesuid": mZmEngine.mChannelParams.qqesuid,
								"channelid": mZmEngine.mChannelParams.channelid,
								"channeluid": mZmEngine.mChannelParams.channeluid,
								"qqesnickname": mZmEngine.mChannelParams.qqesnickname,
								"qqesavatar": mZmEngine.mChannelParams.qqesavatar,
								"cpgameid": mZmEngine.mChannelParams.cpgameid,
								"ext": decodeURIComponent(mZmEngine.mChannelParams.ext),
								"qqestimestamp": mZmEngine.mChannelParams.qqestimestamp,
								"sign": mZmEngine.mChannelParams.sign
							}
							
							SbPulSdk.init(loginInfo, function(channelSdk){
								jsonobj.userdata.isSubscribe="false";
								channelSdkx=channelSdk;
								if(channelSdk.channelId == 1){
									channelSdk.isSubscribe(function(subStatus){
										if(subStatus == '1'){
											jsonobj.userdata.isSubscribe="true";
										}else{
											jsonobj.userdata.isSubscribe="false";
										}
										callback && callback.call(null, {
											"success": "ok",
											"userjson":jsonobj
										});
									});
								}
							});
							
							
						} else {
							console.error(jsonobj);
							console.error("c7724 init fail");
							callback && callback.call(null, {
								"error": jsonobj.status
							});
						}
					};

					var authparam = {
						"app": {
							"appid": mZmParams.zapid,
							"appkey": mZmParams.zapkey,
							"sdkid": mZmParams.sdkindx
						},
						"sdk": {
							"qqesuid": mZmEngine.mChannelParams.qqesuid,
							"channelid": mZmEngine.mChannelParams.channelid,
							"channeluid": mZmEngine.mChannelParams.channeluid,
							"qqesnickname": mZmEngine.mChannelParams.qqesnickname,
							"cpgameid": mZmEngine.mChannelParams.cpgameid,
							"ext": mZmEngine.mChannelParams.ext,
							"qqestimestamp": mZmEngine.mChannelParams.qqestimestamp,
							"sign": mZmEngine.mChannelParams.sign,
							
							"signArray":"channelid=SDKchannelid&channeluid=SDKchanneluid&cpgameid=SDKcpgameid&ext=SDKext&qqesnickname=SDKqqesnickname&qqestimestamp=SDKqqestimestamp&qqesuid=SDKqqesuid&DBkey",
							"signType":"md5L",
							"mapVal":"SDKchannelid:SDKchanneluid:SDKcpgameid:SDKext:SDKqqesnickname:SDKqqestimestamp:SDKqqesuid:DBkey",
							"mzmuid":mZmEngine.mChannelParams.qqesuid+""
						}
					};
					
					var param = {
						"appid": mZmParams.zapid,
						"sdkindx": mZmParams.sdkindx,
						"authparam": Base64Encode(JSON.stringify(authparam)) //TODO
					};

					zmUtils.ajax(mZmEngine.zmUASP, JSON.stringify(param), getjsonCb);
					console.log("c7724 init end...");
				},

				pay: function(data) {
					console.log("c7724 pay start...");
					SbPulSdk.pay(data);
					console.log("c7724 pay end...");
				}

			};

		}
		/*这里实现第三方sdk相关业务 end*/

		/////////////////////////////////////////////////////////////////////////////////////
		//这个对外方法
		////////////////////////////////////////////////////////////////////////////////////
		return {
			//////////////////////////////////////////////////////////////////////////
			//下面方法是zm必须的
			///////////////////////////////////////////////////////////////////////////
			/*
				sdk实例化的时候调用 做一些基本的实例化操作
			*/
			paramInit: function() {
				//初始化gamec7724
				if (!c7724Ins) {
					c7724Ins = createc7724Ins();
				}
				if (!zmUtils) {
					zmUtils = new ZmSdkUtils();
				}
				userJson["common"]={
					"sdkindx":mZmParams.sdkindx,
					"channel":mZmParams.channel,
					"sdkname":"c7724"
				};
				userJson["userdata"]={};
			},

			/*
				datatype string Y数据来源1.选择服务器 2. 创建角色 3. 进入游戏 4. 等级提升 5. 退出游戏
				serverid string Y 服务器id
				servername string Y 服务器名称
				roleid string Y 角色id
				rolename string Y 游戏角色昵称
				rolelevel string Y 角色等级
				moneynum string N 游戏币
				partyname string Y 工会
				rolecreatetime string N 角色创建时间
				rolelevelmtime string N 角色升级时间

				uid string 32 Zm平台产生的唯一标示
				appid Zm平台分配的appid
				device jsonobj y 见定义
				cp传参roleInfoJSON = {
					"datatype": "必填 1.选择服务器 2.创建角色 3.进入游戏 4.等级提升 5.退出游戏",
					"serverid": "服务器id",
					"servername": "服务器名称",
					"roleid": "角色id",
					"rolename": "游戏角色昵称",
					"rolelevel": "角色等级",
					"moneynum": "游戏币",
					"partyname": "工会",
					"rolecreatetime": "角色创建时间",
					"rolelevelmtime": "角色升级时间"
				}
			*/
			reportRoleStatus: function(roleInfoJSON) {
				if(!isReady()){
					console.error("reportRoleStatus fail! call init() first...");
					return;
				}
				console.log("roleInfoJSON...",roleInfoJSON);
				if (roleInfoJSON) {
					try {
						JSON.stringify(roleInfoJSON);
						if (!roleInfoJSON["datatype"]) {
							console.error("**not found datatype,and cancel this request...**");
							return;
						}
					} catch (e) {
						//入参有问题
						console.error("**roleInfoJSON cannt be parsed to JSON**");
						return;
					}
					addBaseParams(roleInfoJSON);
					zmUtils.ajax(mZmEngine.zmRSSP,
						JSON.stringify(roleInfoJSON),
						function(data) {
							console.log("reportRoleStatus ret_code_:" + data.code);
						});
					var Params;
					if(roleInfoJSON.datatype=='2'){//创建角色
						var t=(new Date()).valueOf();
						var sign=md5("channelid="+mZmEngine.mChannelParams.channelid+"&cpgameid="+mZmEngine.mChannelParams.cpgameid+"&cpguid="+mZmParams.onlyid+"&ext="+decodeURIComponent(mZmEngine.mChannelParams.ext)+"&level="+(roleInfoJSON.rolelevel?roleInfoJSON.rolelevel.rolelevel:0)+"&qqesuid="+mZmEngine.mChannelParams.qqesuid+"&roleName="+roleInfoJSON.rolename+"&serverId="+roleInfoJSON.serverid+"&timestamp="+t+"&"+mZmParams.key);

						Params={
							"cpgameid":mZmEngine.mChannelParams.cpgameid,
							"qqesuid":mZmEngine.mChannelParams.qqesuid,
							"channelid":mZmEngine.mChannelParams.channelid,
							"cpguid":mZmParams.onlyid,
							"roleName":roleInfoJSON.rolename,
							"serverId":roleInfoJSON.serverid,
							"level":roleInfoJSON.rolelevel?roleInfoJSON.rolelevel.rolelevel:0,
							"ext":decodeURIComponent(mZmEngine.mChannelParams.ext),
							"timestamp":t,
							"sign":sign
						}
						SbPulSdk.createRole(Params)
					}else if(roleInfoJSON.datatype=='3'){//进入游戏
					
						var t=(new Date()).valueOf();
						
						var sign=md5("channelid="+mZmEngine.mChannelParams.channelid+"&cpgameid="+mZmEngine.mChannelParams.cpgameid+"&cpguid="+mZmParams.onlyid+"&ext="+decodeURIComponent(mZmEngine.mChannelParams.ext)+"&level="+(roleInfoJSON.rolelevel?roleInfoJSON.rolelevel.rolelevel:0)+"&qqesuid="+mZmEngine.mChannelParams.qqesuid+"&rolename="+roleInfoJSON.rolename+"&serverid="+roleInfoJSON.serverid+"&servername="+roleInfoJSON.servername+"&timestamp="+t+"&vip="+roleInfoJSON.vip+"&"+mZmParams.key);

						Params={
							"cpgameid":mZmEngine.mChannelParams.cpgameid,
							"qqesuid":mZmEngine.mChannelParams.qqesuid,
							"channelid":mZmEngine.mChannelParams.channelid,
							"cpguid":mZmParams.onlyid,
							"rolename":roleInfoJSON.rolename,
							"serverid":roleInfoJSON.serverid,
							"level":roleInfoJSON.rolelevel?roleInfoJSON.rolelevel.rolelevel:0,
							"vip":roleInfoJSON.vip,
							"servername":roleInfoJSON.servername,
							"ext":decodeURIComponent(mZmEngine.mChannelParams.ext),
							"timestamp":t,
							"sign":sign
						}
						SbPulSdk.loginRole(Params)
					}
				} else {
					console.error("**roleInfoJSON is empty**");
				}
			},
			/*
				检测sdk能力 0 支持 -1 不支持
			*/
			isSupportMethod: function(methodStr) {
				return c7724Ins.isSupportMethod(methodStr);
			},
			/*
				设置cp游戏iframe层级
			*/
			setFrameDeep: function(mframeDeep) {
				frameDeep = mframeDeep || 0;
			},
			////////////////////////////////////////
			//这里方法根据spsdk的情况进项统一 TODO
			///////////////////////////////////////
			init: function(callback) {
				console.log("ZmSdk init start...");

				var zmcb_init = function(data) {

					if(data.success){
						if(data.userjson){
							var uid = data.userjson.userdata.uid;
							userJson["userdata"] = data.userjson.userdata;
							userJson.userdata.uid = uid;
						}
						callback && callback.call(null,{"retcode":"0"});
						//上报用户
						reportUser();
					}else{
						callback && callback.call(null,{"retcode":"1"});
					}
					//处理自己的逻辑 TODO
					console.log("cp call init and callback ret=succ_:" + data.success + " err_:" + data.error);
				}
				c7724Ins.init(zmcb_init);

				console.log("ZmSdk init end...");
			},
			/*
				payinfojson {"feeid":"","fee":金额 分,"feename":"商品名称","extradata":"透传参数"}
				orderid: "",			// 订单号
				money: 1,				// 订单金额（单位：分）
				product: "测试商品",	// 商品名称
				spid: "",				// 第三方 spid
				sign: "",				// 签名
				attach: "",				// 附加参数

				onpaycallback(ret):
					ret.retcode 0 succ 1 fail 2 cancel
					ret.msg "error message"
			*/
			pay: function(payinfojson, onPayCallback) {
				if(!isReady()){
					console.error("pay fail! call init() first...");
					onPayCallback && onPayCallback.call(null, {
						"retcode": "1",
						"msg": "sdk is not init or init fail..."
					});
					return;
				}
				//先请求订单号 然后去第三方请求支付
				if (payinfojson) {
					try {
						JSON.stringify(payinfojson);
						// getOrderidData = JSON.parse(payinfojson);
					} catch (e) {
						//入参有问题
						console.error("payinfojson illegal ");
						onPayCallback && onPayCallback.call(null, {
							"retcode": "1",
							"msg": "payinfojson cannt be parsed to JSON"
						});
						return;
					}

					addBaseParams(payinfojson);

					 payinfojson["sdkparam"] = {
						"qqesuid": mZmEngine.mChannelParams.qqesuid,
						"channelid": mZmEngine.mChannelParams.channelid,
						"channeluid": mZmEngine.mChannelParams.channeluid,
						"cpgameid": mZmEngine.mChannelParams.cpgameid,
						"ext": mZmEngine.mChannelParams.ext,
						 
					    "arrayType":"&",
					    "signType":"md5L",
					    "signArray":[
					        {
					            "channelid":"SDKchannelid"
					        },
							{
					            "channeluid":"SDKchanneluid"
					        },
							{
					            "cpgameid":"SDKcpgameid"
					        },
							{
					            "cpguid":"DBonlyid"
					        },
							{
					            "ext":"SDKext"
					        },
							{
					            "fee":"priceY2"
					        },
							{
					            "goodsname":"feename"
					        },
							{
					            "order":"orderid"
					        },
							{
					            "qqesuid":"SDKqqesuid"
					        },
							{
					            "timestamp":"timestamp"
					        },
							{
					            "":"DBkey"
					        }
					    ],
						"returnValue":[
							{
								"timestamp":"timestamp"
							},{
								"cpguid":"DBonlyid"
							}
						]
					 };

					zmUtils.ajax(mZmEngine.zmOIDSP, JSON.stringify(payinfojson), function(data) {
						//这里对结果进行判断 TODO

						if ("0" == data.code) {
							//支付url获取成功
							var url;
							try {
								// var reserverjson = JSON.parse(data.reserved);
								JSON.stringify(data.reserved);
							} catch (e) {
								console.error("c7724 reserved is illegal");
								onPayCallback && onPayCallback.call(null, {
									"retcode": "1",
									"msg": "orderid error"
								});
								return;
							}
							
							var params = {
								order:data.orderid,
								cpgameid:mZmEngine.mChannelParams.cpgameid,
								qqesuid:mZmEngine.mChannelParams.qqesuid,
								channelid:mZmEngine.mChannelParams.channelid,
								channeluid:mZmEngine.mChannelParams.channeluid,
								cpguid:data.reserved.cpguid,
								goodsname:payinfojson.feename ,
								fee:(payinfojson.fee*0.01).toFixed(2) ,
								ext:decodeURIComponent(mZmEngine.mChannelParams.ext),
								timestamp:data.reserved.timestamp,
								sign:data.reserved.sign
							};
							
							console.log("fanqie payurl_data:",params);

							c7724Ins.pay(params);

							onPayCallback && onPayCallback.call(null, {
								"retcode": "3"
							});
							
						} else {
							onPayCallback && onPayCallback.call(null, {
								"retcode": "1",
								"msg": "orderid fail code_:" + data.code
							});
						}
					});
				} else {
					onPayCallback && onPayCallback.call(null, {
						"retcode": "1",
						"msg": "payinfojson empty"
					});
				}

			},
			isSubscribe:function(infoData,showCBFn){
				channelSdkx.isSubscribe(function(subStatus){
					if(subStatus == 1){
						isSubscribes="true";
					}else{
						isSubscribes="false";
					}
					showCBFn && showCBFn.call(null, {
						"isSubscribe": isSubscribes
					});
				});
			},
			//显示关注界面
			showQRCode:function(infoData,showCBFn){
				channelSdkx.follow();
			},
			//分享
			share:function(shareData, sharedCBFn){	
				channelSdkx.share(function(){
					sharedCBFn && sharedCBFn.call(null, {
						"success": "ok",
						"userjson":userJson
					});
				},{'cp_p1' : 'cp自定义参数', 'cp_p2': '自定义参数会在登录回调的ext里面'});
			},
			//初始化分享
			setShareInfo:function(shareData, sharedCBFn){			
				channelSdkx.shareConfig(function(){
					sharedCBFn && sharedCBFn.call(null, {
						"success": "ok",
						"userjson":userJson
					});
				}, {'cp_p1' : 'cp自定义参数', 'cp_p2': '自定义参数会在登录回调的ext里面'});
			},
			getUserInfo: function(){
				console.log("c7724 getUserInfo start...");
				if(!isReady()){
					console.error("getUserInfo fail! call init() first...");
					return {};
				}
				console.log("c7724 getUserInfo end...",userJson);
				return userJson;
			}
		};
	}

	return {
		getInstance: function() {
			if (!instance) {
				instance = createInstance();
				instance.paramInit();
			}
			return instance;
		},
	};
})();
console.log("zmsdk.js");