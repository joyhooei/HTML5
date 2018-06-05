//获取订单总数
Mock.mock(
	'http://getBillCount', 'post', {
		"RetCode": 0, //成功
		"ErrMsg": "",
		"Data": {
			"count": 10
		}
	}
);


//获取订单列表数据
Mock.mock(
	'http://getBillList', 'post', {
		"RetCode": 0, //成功
		"ErrMsg": "",
		"Data": [
			{
				"time":"2017-12-10",
				"billCount":5,
				"totalAmount":57,
			},
			{
				"time":"2017-12-11",
				"billCount":20,
				"totalAmount":150,
			},
			{
				"time":"2017-12-12",
				"billCount":36,
				"totalAmount":136,
			},
			{
				"time":"2017-12-13",
				"billCount":10,
				"totalAmount":110,
			},
			{
				"time":"2017-12-14",
				"billCount":10,
				"totalAmount":130,
			},
			{
				"time":"2017-12-15",
				"billCount":20,
				"totalAmount":200,
			},
			{
				"time":"2017-12-16",
				"billCount":120,
				"totalAmount":500,
			}
		]
	}
);


// 当前时间
Mock.mock(
    'http://getNow', {
        'now': '@now("day","yyyy-MM-dd")',
        'tokenId': 'f9ea0023-1be3-4f18-b6ec-e585af305b91'
    }
);