Mock.mock(
	'http://getAppList?page=1&limit=10', {
		
			"code": 0,
			"msg": "",
			"count": 1000,
			"data": [{
				"appId": 100001,
				"appName": "听见",
				"accountName": "鸣人",
				"category": 1,
				"appDesc": "test1",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}, {
				"appId": 100002,
				"appName": "腾讯",
				"accountName": "佐助",
				"category": 1,
				"appDesc": "test2",
				"status": 1,
				"createTime": "2017-12-12 11:20:30"
			}]
		}
	);


//show App Data
Mock.mock(
	'http://getAppInfo', {
		"appId": 100001,
	    "appIconPath": "../../img/test.png",
	    "appName": "腾讯",
	    "categoryId": 2,
	    "appKey": "132456",
	    "appSecret": "4566",
	    "status": 1
	  }
	);