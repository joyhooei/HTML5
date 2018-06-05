//获取订单总数
Mock.mock(
	'http://get_security', 'post', {
		"RetCode": 0, //成功
		"ErrMsg": "",
	}
);

// 当前时间
Mock.mock(
    'http://login', {
		"RetCode": 0, //成功
		"ErrMsg": "",
	}
);