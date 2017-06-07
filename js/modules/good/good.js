define(['lib/vue', 'util/util', 'css!./good.css', 'modules/feature/toggleBanner', 'modules/feature/goTop'], 
	function (Vue, Util, css, toggleBanner, goTop) {
	// 创建自定义组件
	var Good = Vue.extend({
		// 模板
		template: '#good_temp',
		// 数据
		data: data,
		// 组件创建完毕
		created: created,
		// 组件渲染完毕
		ready: ready,
		methods: {
			goTop		: 	goTop,

			toggleGoTop	: 	toggleGoTop,

			showGoTop	: 	showGoTop,

			hideGoTop	: 	hideGoTop,

			toggleOption: 	toggleOption,

			togglePage	: 	togglePage,

			goBack		: 	goBack
		}
		,watch: {
			index: watchIndex
		}
	});

	// 注册组件
	Vue.component('good', Good);

	// 暴露接口
	return Good;

	function data() {
		return {
			provider: '',
			loadMore: "",
			msg: "",
			banner: [],
			description: [],
			services: [],
			header: {},
			info: {},
			layer: {},
			standard: {},
			footer: {},
			ShowGoodGoTop: false,
			className: 'active',
			index: 0
		}
	}

	function created() {
		var me = this;
		// 获取query数据
		var query = me.$parent.query.length > 0 ? me.$parent.query : ['01'];
		// 根据query拼接发送请求
		Util.get('data/good_'+ query[0] + '.json', function (res) {
			if (res.data && res.errno === 0) {
				// console.log(res.data);
				me.loadMore 	 = res.data.loadMore;
				me.msg			 = res.data.msg;
				me.banner		 = res.data.banner;
				me.description  = res.data.description;
				me.services 	 = res.data.services;
				me.header 		 = res.data.header;
				me.info 		 = res.data.info;
				me.layer 		 = res.data.layer;
				me.standard 	 = res.data.standard;
				me.footer 		 = res.data.footer;
				me.provider 	 = res.data.provider;
			}
		})
	}

	function ready() {
		toggleBanner('good-banner', 3, 'good-point');
		// toggleBanner('main-inner', 3, '');
		this.toggleGoTop();
	}

	// 显示返回顶部按钮
	function toggleGoTop() {
		var me = this;
		window.addEventListener('scroll', function (e) {
			var scrollTop = window.pageYoffset || document.documentElement.scrollTop || document.body.scrollTop;;
			if (scrollTop >= document.body.clientHeight / 3) {
				me.showGoTop();
			} else {
				me.hideGoTop();
			}
		})
	}

	function showGoTop() {
		this.ShowGoodGoTop = true;
	}

	function hideGoTop() {
		this.ShowGoodGoTop = false;
	}


	// 切换选项卡
	function toggleOption(id, index) {
		var headerNav = Util.$(id);
		var eles = headerNav.getElementsByTagName('a');

		var dom = Util.$('main-inner');
		var doms = dom.getElementsByTagName('div');

		for (var i = 0; i <= eles.length - 1; i++) {
			eles[i].className = '';
		}
		eles[index].className = 'active';

		this.index = index;
		dom.style['transition-duration'] = '400ms';
		this.togglePage(dom, index);
	}

	function togglePage(dom, index) {
		window.scrollTo(0,0);
		var width = document.body.clientWidth;
		var x = -index * width;
		dom.style.transform = 'translateX('+ x +'px)';
	}

	function watchIndex(newVal, oldVal) {
		this.toggleOption('header-nav', newVal);
	}

	function goBack(e) {
		window.history.go(-1);
	}
});