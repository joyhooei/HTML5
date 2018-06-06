// ----------------------------------------------------计算属性
var app8 = new Vue({
	el:"#app-8",
	data:{
		message:"hello"
	},
	computed:{
		// 计算属性的 getter，这里声明了一个计算属性 reverseMessage
		reverseMessage:function(){
			// this 指向 app8实例
			return this.message.split('').reverse().join('');
		}
	}
})

// ----------------------------------------------------在表达式中调用方法
var app9 = new Vue({
	el:"#app-9",
	data:{
		message:"UBK"
	},
	methods:{
		reverseMessage:function(){
			return this.message.split('').reverse().join('');
		}
	}
})

// ----------------------------------------------------侦听属性  watch
var app10;
app10 = new Vue({
	el:'#app-10',
	data:{
		firstName : 'paddy',
		lastName : 'gu',
		fullName : 'paddy gu'
	},
	watch:{		// 通过watch 来观察属性值的变化，value为变化后的值
		firstName:function(value){
			this.fullName = value + " " + this.lastName;
		},
		lastName:function(value){
			this.fullName = this.firstName + ' ' + value;
		}
	}
})

app10 = new Vue({					// 通过计算属性更方便
	el:'#app-10',
	data:{
		firstName:"谷",
		lastName:'幸东',
	},
	computed:{
		fullName : function(){
			return this.firstName + ' ' + this.lastName;
		}
	}
})


// ----------------------------------------------------为计算属性添加 setter
var app11 = new Vue({
	el:"#app-11",
	data:{
		firstName:"paddy",
		lastName:"gu",
	},
	computed:{
		fullName:{
			// getter
			get:function(){
				return this.firstName + " " + this.lastName;
			},
			// setter
			set:function( newValue ){
				var names = newValue.split(' ');
				this.firstName = names[0];
				this.lastName = names[names.length - 1];
			}
		}
	}
})


// ----------------------------------------------------侦听器
// 当需要在数据变化时执行异步或者开销大的操作时，这个方法是最有用的。
var vm = new Vue({
	el:"#watch-example",
	data:{
		question:"",
		answer:"answer"
	},
	watch:{
		// 如果question 发生变化时，这个函数就会运行
		question:function(){
			this.answer = "等你停止输入";
			this.debouncedGetAnswer();
		}
	},
	created:function(){
		// created 生命周期方法，在实例被创建完成后立即调用
		// `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    		// 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率, AJAX 请求直到用户输入完毕才会发出。
		this.debouncedGetAnswer = _.debounce(this.answer,500);
	},
	methods:{
		getAnswer:function(){
			if( this.question.indexOf('?') == -1 ){
				this.answer = "问题通常会有一个问号结尾。"
				return
			}
			this.answer = "思考中。。。"
			var _this = this
			axios.get('https://yesno.wtf/api')
				.then(function(response){
					_this.answer = _.capitalize(response.data.answer)
				})
				.catch(function(error){
					_this.answer = error
				})
		}
	}
})