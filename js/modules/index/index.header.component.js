define(['lib/vue', 'Util/util'], function (Vue, Util) {
	var Header = Vue.extend({
		template: Util.getTemp('header_temp'),
		data: data
	})

	Vue.component('index-header', Header);

	return Header;

	// 数据
	function data () {
		return {

		}
	}
})