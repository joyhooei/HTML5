let allRes = [
  {Id:1,ParentId:0,Appid:10000,ProductCode:"code1",Code:"code1"},
  {Id:2,ParentId:0,Appid:10000,ProductCode:"code2",Code:"code2"},
  {Id:3,ParentId:1,Appid:10000,ProductCode:"code3",Code:"code3"},
  {Id:4,ParentId:2,Appid:10000,ProductCode:"code4",Code:"code4"},
  {Id:5,ParentId:3,Appid:10000,ProductCode:"code5",Code:"code5"}
];

console.log(JSON.stringify(toTreeData(allRes)));

function toTreeData(data) {
  let resData = data;
  let tree = [];

  for (let i = 0; i < resData.length; i++) {
    if (resData[i].ParentId === 1) {
      let obj = {
        Id: resData[i].Id,
        Appid: resData[i].Appid,
        ProductCode:resData[i].ProductCode,
        Code:resData[i].Code,
        Children: []
      };
      tree.push(obj);
      resData.splice(i, 1);
      i--;
    }
  }
  run(tree);
  
  function run(chiArr) {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].Id === resData[j].ParentId) {

            let obj = {
              	Id: resData[j].Id,
		        		Appid: resData[j].Appid,
		        		ProductCode:resData[j].ProductCode,
		        		Code:resData[j].Code,
		       		Children: []
            };
            chiArr[i].Children.push(obj);
            resData.splice(j, 1);
            j--;
          }
        }
          
        console.log(chiArr[i].Children);
        run(chiArr[i].Children);
      }
    }
  }
  return tree;
}

/*
 
 [{
	"id": 3,
	"text": "编辑角色",
	"Children": [{
		"id": 8,
		"text": "重置密码",
		"Children": []
	}]
  }, {
	"id": 2,
	"text": "设置权限",
	"Children": [{
		"id": 4,
		"text": "删除角色",
		"Children": [{
			"id": 5,
			"text": "添加用户",
			"Children": [{
				"id": 9,
				"text": "添加地区",
				"Children": []
			}]
		}, {
			"id": 6,
			"text": "更新用户",
			"Children": [{
				"id": 7,
				"text": "删除用户",
				"Children": []
			}, {
				"id": 10,
				"text": "编辑地区",
				"Children": []
			}]
		}]
	}]
}]
 
 
 * 
 * 
 * */