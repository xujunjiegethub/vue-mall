/** 路由模块-> 依赖app模块
	负责监听路由改变，改变页面状态
 */
define(['modules/app'], function (app) {

	// 监听hash改变
	window.addEventListener('hashchange', route);

	// 暴露接口
	return route;

	function route () {
		// 获取hash值
		var hash = location.hash;
		// 过滤#或#/
		hash = hash.replace(/^#(\/)?/g,'');
		// 根据/切割字符串
		hash = hash.split('/');

		// 获取应用程序的映射对象
		var map = app.map;
		// 判断路由访问的页面是否存在映射
		if (map[hash[0]]) {
			// 改变当前视图
			app.currentView = hash[0];
			// console.log(app)
		} else {
			// 其他路由全部跳转到首页
			app.currentView = 'index';
		}

		// 从第二项开始作为属性传递
		app.query = hash.slice(1);
		
		// console.log(app.query);

		// console.log(app);
	}
});