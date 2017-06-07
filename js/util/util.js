define([], function () {
	var Util = {

		// 根据id获取script模板标签的内容
		getTemp: function (id) {
			return document.getElementById(id).innerHTML;
		},
		// 封装ajax请求方法，get请求方式
		get: function (url, fn) {
			var xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4) {
					if ( xhr.status === 200) {
						var result = JSON.parse(xhr.responseText)
						fn && fn(result);
					}
				}
			}

			xhr.open('GET', url, true);
			xhr.send(null);
		},
		// 通过Id获取元素
		$: function (id) {
			return document.getElementById(id);
		},
		// 设置样式
		css: function (id, options) {
			var dom = typeof id === 'string' ? $(id) : id;
			for (var key in options) {
				dom.style[key] = options[key];
			}
			return Util;
		}

	}

	return Util;
});