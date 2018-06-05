Mock.mock(
	'http://getAppProductList', {
			"code": 0,
			"msg": "",
			"count": 2,
			"data": [{
				"accountId": 100001,
				"appId": 100001,
				"productCode": "VIP",
				"expireTime": "2017-12-12 11:20:30",
				"status": 1,
				"appPayConf": "test1"
			}, {
				"accountId": 100002,
				"appId": 100002,
				"productCode": "CPD",
				"expireTime": "2017-12-12 12:20:30",
				"status": 1,
				"appPayConf": "test2"
			}]
		}
	);

//获取App产品配置
Mock.mock(
	'http://getAppProductInfo', {
		"code": 0,
		"msg": "",
		"count": 1000,
		"data": {
		    "accountId": 10001,
		    "appId": 100001,
		    "productCode": "vip",
		    "expireTime": "2018-01-02",
		    "status": 1,
		    "appPayConf": '{"a": 1, "b": 2, "c": 3}'
		}
	}
);