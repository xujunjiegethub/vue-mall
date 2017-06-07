// 将依赖的组件引入，如果页面中使用了这些组件，但是没有引入
// [Vue warn]: Failed to resolve component: index
// 因为组件没有被加载，找不到
define(['lib/vue', 'modules/index/index', 'modules/good/good', 'modules/mall/mall'], function (Vue, Index, Good, Header) {
	Vue.config.debug = true;

	/** @type {Vue} vue实例化对象 */
	var app = new Vue({
		// 应用程序容器元素
		el: '#app',
		// 数据
		data: {
			// 当前视图
			currentView: 'index',
			// 请求参数
			query: '',
			// 列表
			map: {
				// 首页
				index: true,
				// 产品页
				good: true,
				// 商城
				mall: true
			}
		}
	});

	// 暴露接口
	return app;
});