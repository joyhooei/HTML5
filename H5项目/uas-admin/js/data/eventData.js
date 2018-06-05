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

// 当前时间
Mock.mock(
    'http://getNow', {
        'now': '@now("day","yyyy-MM-dd")',
        'tokenId': 'f9ea0023-1be3-4f18-b6ec-e585af305b91'
    }
);


//获取事件列表数据
Mock.mock(
	'http://getAllEventList', 'post', {
		"RetCode": 0, //成功
		"ErrMsg": "",
		"Data": [
			{
				"event":"open",
				"count":5
			},
			{
				"event":"review",
				"count":20
			},
			{
				"event":"expire",
				"count":36
			},
			{
				"event":"bill-error",
				"count":10
			},
			{
				"event":"bill-cancel",
				"count":10
			},
			{
				"event":"bill-succ",
				"count":50
			}
		]
	}
);


//获取单个事件列表数据
Mock.mock(
	'http://getEventList', 'post', {
		"RetCode": 0, //成功
		"ErrMsg": "",
		"Data": [{
				"time": "2017-12-10",
				"eventCount": 5
			},
			{
				"time": "2017-12-11",
				"eventCount": 20
			},
			{
				"time": "2017-12-12",
				"eventCount": 36
			},
			{
				"time": "2017-12-13",
				"eventCount": 10
			},
			{
				"time": "2017-12-14",
				"eventCount": 10
			},
			{
				"time": "2017-12-15",
				"eventCount": 20
			},
			{
				"time": "2017-12-16",
				"eventCount": 120
			}
		]
	}
);