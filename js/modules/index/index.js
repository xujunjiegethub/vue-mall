define(['lib/vue', 'util/util', 'css!./index.css', 'modules/feature/toggleBanner', "modules/feature/goTop"], 
	function (Vue, Util, css, toggleBanner, goTop) {
	/** 创建首页组件 */
	var Index = Vue.extend({
		// 模板
		template: '#index_temp',
		// 数据
		data: data,
		// 组件创建完毕，请求数据
		created: created,
		// methods属性中定义事件绑定事件对应的函数
		methods: {
			/** 切换菜单栏显示隐藏 */
			toggleMenu: toggleMenu,
			// 显示菜单栏
			showMenu: showMenu,
			// 隐藏菜单栏
			hideMenu: hideMenu,
			// 轮播图切换
			// toggleBanner: toggleBanner,
			// 显示底部列表
			showList: showList,
			// 隐藏底部菜单
			hideList: hideList,
			// 切换底部菜单显隐
			toggleList: toggleList,
			// 返回顶部
			goTop: goTop,
			// 赶回顶部按钮显示
			showGoTop: showGoTop,
			hideGoTop: hideGoTop,
			toggleGoTop: toggleGoTop
		},

		beforeCompile: beforeCompile,

		ready: ready

	});

	// 注册组件
	Vue.component('index', Index);

	// 暴露接口
	return Index;

	// 数据
	function data () {
		return {
			title: 'index page !',
			logo: [],
			menu:[],
			banner: [],
			data: [],
			social: [],
			footer: {},
			isShowMenu: false,
			isShowMall: false,
			isShowGoTop: false
		}
	}

	function ready () {
		// console.log('ready !', this)
		toggleBanner('banner', 6, 'point');
		this.toggleGoTop();
	}

	// 组件创建完毕逻辑
	function created () {
		// console.log('creaded !')
		// 缓存this
		var me = this;

		// this => 组件实例化对象
		Util.get('data/index.json', getIndexData);

		// 获取首页数据回调函数
		function getIndexData (res) {
			// console.log(res.data.logo)
			if (res && res.errno === 0) {
				// 标题栏
				me.logo    = res.data.logo;
				// 菜单栏
				me.menu    = res.data.menu;
				// 轮播图
				me.banner  = res.data.banner;
				// 主体内容
				me.data    = [
					res.data.meizu, 
					res.data.meilan, 
					res.data.accessory, 
					res.data.service
				];
				// 服务支持
				me.social  = res.data.social;
				// 版权声明
				me.footer  = res.data.footer;

			}

		}
	}

	function beforeCompile() {
		// console.log('beforeCompile !');
	}

	// 切换首页菜单
	function toggleMenu (e) {
		// console.log(e);
		// this => vue实例化对象
		// 可以访问对象的属性
		// 根据isShowMenu的状态，切换状态
		// 执行完毕后将状态改变
		if (!this.isShowMenu) {
			this.showMenu();
			this.isShowMenu = true;
		} else if (this.isShowMenu) {
			this.hideMenu();
			this.isShowMenu = false;
		}
	}

	// 显示首页菜单
	function showMenu () {
		Util.css(Util.$('menu'), {
			height: '358px',
			opacity: '1'
		}).css(Util.$('m-mask'), {
			display: 'block'
		}).css(Util.$('header_bar'), {
			backgroundColor: '#fff'
		})
	}

	// 隐藏首页菜单
	function hideMenu () {
		Util.css(Util.$('menu'), {
			height: '0',
			opacity: '0'
		}).css(Util.$('m-mask'), {
			display: 'none'
		}).css(Util.$('header_bar'), {
			backgroundColor: 'transparent'
		})
	}

	

	// 显示底部菜单
	function showList() {
		var dom = Util.$('mz-mall-list');
		Util.css(dom,{
			height: 'auto',
			opacity: '1'
		})
	}

	// 隐藏底部菜单
	function hideList() {
		var dom = Util.$('mz-mall-list');
		Util.css(Util.$('mz-mall-list'),{
			height: '0',
			opacity: '0'
		})
	}

	// 切换底部菜单
	function toggleList() {
		var dom = Util.$('mz-mall-btn');
		if (!this.isShowMall) {
			dom.className = 'footer-nav-active';
			this.showList();
			this.isShowMall = true;
		} else {
			dom.className = '';
			this.hideList();
			this.isShowMall = false;
		}
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
		this.isShowGoTop = true;
	}

	function hideGoTop() {
		this.isShowGoTop = false;
	}
});


// // 猛点     向左滑       向右滑        向上滑     向下滑       双击         轻拍   单击         长按
  // 'swipe'  'swipeLeft'  'swipeRight'  'swipeUp'  'swipeDown'  'doubleTap'  'tap'  'singleTap'  'longTap