// ----------------------------------------------------声明与渲染

// 使用Vue函数创建Vue实例
var app = new Vue({
	el:"#app",
	data:{
		message:"Hello Vue !"
	}
})


var app2 = new Vue({
	el:"#app-2",
	data:{
		message:"页面加载于：" + new Date().toLocaleString(),
	}
})

// ----------------------------------------------------条件与循环
var app3 = new Vue({
	el:"#app-3",
	data:{
		seen:true
	}
})

var app4 = new Vue({
	el:"#app-4",
	data:{
		items:[
			{text:"html"},
			{text:"js"},
			{text:"css"}
		]
	}
})

// ----------------------------------------------------处理用户输入
var app5 = new Vue({
	el:"#app-5",
	data:{
		message:"hello word"
	},
	methods:{
		reverseMessage:function(){
			this.message = this.message.split('').reverse().join('')
		}
	}
})

var app6 = new Vue({
	el:"#app-6",
	data:{
		message:"message",
	}
})

// ----------------------------------------------------组件化应用构建
// 定义名为 todo-item 的组件
// 注册全局组件，会自动使用给定的id设置组件的名称
Vue.component("todo-item",{
	// todo-item 组件现在接受一个 “prop”,类似于一个自定义特性，这个prop名为 todo
	props:['todo'],
	template:"<li>{{ todo.text }}</li>"
})
var app7 = new Vue({
	el:"#app-7",
	data:{
		groceryList:[
			{id:0,text:"蔬菜"},
			{id:1,text:"奶酪"},
			{id:2,text:"水果"}
		]
	}
})

// ----------------------------------------------------数据与方法
// 除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来。例如：
var data = {a:1};
var vm = new Vue({
	el:"#example-id",
	data:data,
})

vm.$data === data //  ==> true
vm.$el === document.getElementById('example-id') // => true
vm.$watch("a",function(newValue,oldValue){
	// 这个回调是在 vm.a 改变后调用，起到监控属性值变化的作用
})

// ----------------------------------------------------声明周期
// 一个Vue实例在创建的过程中有一定的声明周期，在过程中执行了称为“声明周期钩子”的函数，以便用户在创建的过程中可以执行自己的代码。
vm = new Vue({
	data:{
		a:1
	},
	created:function(){
		// created钩子会在这个实例创建之后执行，如下的打印操作
		console.log("data.a == " + this.a);		// this 指的是Vue创建的这个实例
	}
})
// 同时也有一些其他钩子，如 mounted、updated 和 destroyed。





