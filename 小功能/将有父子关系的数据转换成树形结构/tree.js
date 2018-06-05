let allRes = [
  {
    resourcesId: 4,
    resName: "删除角色",
    resParentId: 2
  },
  {
    resourcesId: 3,
    resName: "编辑角色",
    resParentId: 1
  },
  {
    resourcesId: 2,
    resName: "设置权限",
    resParentId: 1
  },
  {
    resourcesId: 5,
    resName: "添加用户",
    resParentId: 4
  },
  {
    resourcesId: 6,
    resName: "更新用户",
    resParentId: 4
  },
  {
    resourcesId: 8,
    resName: "重置密码",
    resParentId: 3
  }
];

console.log(JSON.stringify(toTreeData(allRes)));

function toTreeData(data) {
  let resData = data;
  let tree = [];

  for (let i = 0; i < resData.length; i++) {
    if (resData[i].resParentId === 1) {
      let obj = {
        id: resData[i].resourcesId,
        text: resData[i].resName,
        children: []
      };
      tree.push(obj);
      resData.splice(i, 1);
      console.log(JSON.stringify(resData))
      i--;
    }
  }
  
  console.log(JSON.stringify(resData))
  console.log(JSON.stringify(tree))
  
  run(tree);
  
  function run(chiArr) {
    if (resData.length !== 0) {
    	
    	
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].id === resData[j].resParentId) {

            let obj = {
              id: resData[j].resourcesId,
              text: resData[j].resName,
              children: []
            };
            chiArr[i].children.push(obj);
            resData.splice(j, 1);
            j--;
          }
        }
        // console.log(chiArr[i].children);
        run(chiArr[i].children);
      }
      
      
    }
  }
  return tree;
}

/*
 
 [{
	"id": 3,
	"text": "编辑角色",
	"children": [{
		"id": 8,
		"text": "重置密码",
		"children": []
	}]
}, {
	"id": 2,
	"text": "设置权限",
	"children": [{
		"id": 4,
		"text": "删除角色",
		"children": [{
			"id": 5,
			"text": "添加用户",
			"children": [{
				"id": 9,
				"text": "添加地区",
				"children": []
			}]
		}, {
			"id": 6,
			"text": "更新用户",
			"children": [{
				"id": 7,
				"text": "删除用户",
				"children": []
			}, {
				"id": 10,
				"text": "编辑地区",
				"children": []
			}]
		}]
	}]
}]
 
 
 * 
 * 
 * */