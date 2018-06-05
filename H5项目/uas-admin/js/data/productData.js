//获取产品列表
Mock.mock(
	'http://getProductList',"get",{
		
			"code": 0,
			"msg": "",
			"count": 1000,
			"data": [{
						code: "VIP",
						name: "VIP",
						desc: "111111111111",
						time: "2017-12-26 23:01:29",
						config: "<span class='layui-badge-rim'>产品配置详情</span>",
						status: 0,
					},{
						code: "CPD",
						name: "CPD",
						desc: "22222222222",
						time: "2017-12-26 23:01:36",
						config: "<span class='layui-badge-rim'>产品配置详情</span>",
						status: 1,
					}]
		}
	);

//获取产品配置
Mock.mock(
	'http://getProductConf',"post",{
		    RetCode: 0,
		    ErrMsg: "",
		    Data:{
				notifyConf:{
					code:"vip",
					title:"",
					content:{},
					status:1, //1:开通，0：关闭
				},
				improveConf:{
					code:"cpd",
					title:"",
					content:{},
					status:1, //1:开通，0：关闭
				},
				configs:{
					pushPath:""
				}
			}
		}
	);