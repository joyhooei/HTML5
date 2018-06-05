//获取用户统计
Mock.mock(
	'http://getUserCount', 'post', {
		"RetCode": 0, //成功
		"ErrMsg": "",
		"Data": {
			"count": 0
		}
	}
);

