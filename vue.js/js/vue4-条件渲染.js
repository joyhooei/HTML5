
var class1 = new Vue({
	el:"#class1",
	data:{
		ok:true
	}
})

// 多个复选框，绑定到同一个数组
var vue = new Vue({
  el: '#example-3',
  data: {
    checkedNames: ["Jack"]
  },
  methods:{
  	changeCheckedNames:function(){
  		
  	}
  }
})

function changeCheckedNames(){
	vue.checkedNames = [];
}
