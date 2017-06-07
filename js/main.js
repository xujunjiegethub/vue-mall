require.config({
	// 将vue.js文件模块化
	shim: {
		'lib/vue': {
			deps:[],
			exports: ''
		}
		// ,'lib/zepto.touch': {
		// 	deps:['lib/zepto'],
		// 	exports: "$"
		// }
	},
	map: {
		'*': {
			'css': 'lib/require-css'
		}
	}

});

// require(['route/route', 'css!../reset.css', 'lib/zepto', 'lib/zepto.touch'], function (route, css, Zepto) {
require(['route/route', 'css!../reset.css'], function (route, css) {
	route();

	// new Index()
	// 	// 轮播图切换
	// 	.toggleBanner();

	// Unable to preventDefault inside passive event listener due to target being treated as passive
	// 滑动某些区域，比如图片区域会抛出无法阻止的警告，passice => 被动监听器
	// 不知道怎么解决

	// document.addEventListener('touchmove', function(event) {
	// 	console.log(event)
	//     // // 判断默认行为是否可以被禁用
	//     // if (event.cancelable) {
	//     //     // 判断默认行为是否已经被禁用
	//     //     if (!event.defaultPrevented) {
	//     //         event.preventDefault();
	//     //     }
	//     // }
	// }, {passive:false});


	// [移动端新特性] Passive Event Listeners => 提高页面滑动流畅度
	// function handler () {
	//   console.log('DDFE');
	// }
	// document.addEventListener('mousewheel', handler, {passive: true})
})
