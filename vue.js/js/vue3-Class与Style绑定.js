
// --------------------------------------------------------对象语法
var class1 = new Vue({
	el:"#class1",
	data:{
		isActive:true
	}
})

// --------------------------------------------------------数组语法
var class2 = new Vue({
	el:"#class2",
	data:{
		dataKey1 : "active",
		dataKey2 : "static"
	}
})

var class3 = new Vue({
	el:"#class3",
	data:{
		isActive : true,
		classKey : "static",
		active : "active"
	}
})

// --------------------------------------------------------绑定内联样式
var class4 = new Vue({
	el:'#class4',
	data:{
		styleObject:{
			color:"yellow",
			fontSize:"12px"
		}
	}
})