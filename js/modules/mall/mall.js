define(['lib/vue', 'util/util', 'css!./mall.css', 'modules/feature/toggleBanner', 'modules/feature/goTop'], function (Vue, Util, css, toggleBanner, goTop) {

	// 创建自定义组件
	var Mall = Vue.extend({
		// 模板
		template: '#mall_temp',
		methods: {
			toggleGoTop: toggleGoTop,
			showGoTop: showGoTop,
			hideGoTop: hideGoTop,
			goTop: goTop
		},
		// 数据
		data: data,
		created: created,
		ready: ready
	});

	// 注册组件
	Vue.component('mall', Mall);

	// 暴露接口
	return Mall;

	function data() {
		return {
			header: {},
			banner: [],
			cates: [],
			top3: [],
			hotPro: {},
			list: [],
			footer: {},
			ShowGoTop: false
		}
	}

	function created() {
		var me = this;

		Util.get('data/mall.json', function (res) {
			// console.log(res);
			if (res && res.errno === 0) {
				me.header = res.data.header;
				me.banner = res.data.banner;
				me.cates  = res.data.cates;
				me.top3   = res.data.top3;
				me.hotPro = res.data.hotPro;
				me.list   = res.data.list;
				me.footer = res.data.footer;
			}
		})
	}

	function ready() {
		toggleBanner('banner', 5, 'mall-point');
		setTimeout(function () {
			toggleBanner('ad-banner1', 2);
			toggleBanner('ad-banner2', 2);
			toggleBanner('ad-banner3', 2);
		}, 100)
		this.toggleGoTop();
	}

	// 显示返回顶部按钮
	function toggleGoTop() {
		var me = this;
		window.addEventListener('scroll', function (e) {
			var scrollTop = window.pageYoffset || document.documentElement.scrollTop || document.body.scrollTop;;
			// console.log(scrollTop);
			if (scrollTop >= document.body.clientHeight / 3) {
				me.showGoTop();
			} else {
				me.hideGoTop();
			}
		})
	}

	function showGoTop() {
		this.ShowGoTop = true;
	}

	function hideGoTop() {
		this.ShowGoTop = false;
	}
});