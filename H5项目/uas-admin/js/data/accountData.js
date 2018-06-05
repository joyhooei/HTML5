Mock.mock(
	'http://getAccountList?page=1&limit=10', {
		
			"code": 0,
			"msg": "",
			"count": 1000,
			"data": [{
				"id": 10000,
				"accountNo": "100001",
				"companyName": "听见",
				"accountName": "鸣人",
				"email": "test1@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}, {
				"id": 10001,
				"accountNo": "100002",
				"companyName": "腾讯",
				"accountName": "佐助",
				"email": "test2@qq.com",
				"status": 1,
				"createDate": "2017-12-12"
			}]
		}
	);
	



Mock.mock(
	'http://getAccountList', {
		
		"userInfo":
			{
				"accountNo":"10001",
				"email":"123@qq.com",
				"userName":"test",
				"status":1, //1:开通，0：关闭
			},
		"companyInfo":
			{
				"logoPath":"../../img/test.png",
				"companyName":"非零无限科技有限公司",
				"province":"广东省",
				"city":"深圳",
				"address":"前海路鸿海大厦",
				"phoneNo":"13128792935",
				"contactPerson":"Samurai",
				"QQ":"1185923176",
				"wechat":"13128792935",
			}
		}
	);