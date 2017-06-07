define(['Util/util'], function (Util) {
	/**
	 * 切换轮播图
	 * @id 		String		轮播图列表id
	 * @len 	Number		轮播图图片数量 
	 * @pid 	String		小圆点列表id
	 * return 	Function 	切换轮播图函数
	 */
	function toggleBanner(id,len,pid) {
		var bn = {
			len 		 : len || 6,
			// 轮播图ul
			banner 		 : Util.$(id),
			// 小圆点集合
			points		 : pid ? Util.$(pid).getElementsByTagName('span')  : '',
			// 节流变量
			lock 		 : true,
			// 当前图片id
			index 		 : 0,
			// 起始坐标
			startX 		 : 0,
			// 结束坐标
			endX 		 : 0,
			// 移动时的坐标
			moveX 		 : 0,
			// 移动的长度
			moveLen 	 : 0,
			// 初始移动量
			startLen 	 : 0,
			// 最终移动量
			endLen 		 : 0,
			// 当前偏移量
			nowX 		 : 0,
			// 视口宽度
			width 		 : document.body.clientWidth,
			// 触摸开始Fn
			touchStart 	 : touchStart,
			// 触摸移动Fn
			touchMove  	 : touchMove,
			// 触摸结束
			touchEnd 	 : touchEnd,
			// 切换小圆点
			togglePoint  : togglePoint,
			// 通过index切换轮播图
			toggleByIndex: toggleByIndex
		};
		// 切换宽度
		bn.tgWidth = bn.width / 3,

		// 注册事件
		bn.banner.addEventListener('touchstart', touchStart);
		bn.banner.addEventListener('touchmove', touchMove);
		bn.banner.addEventListener('touchend', touchEnd);

		// 设置ul的初始偏移量transition-duration: 0ms
		bn.banner.style.transform = 'translateX('+ 0 +'px)';

		// bn.toggleByIndex();


		// 触摸开始
		function touchStart (e) {
			
			e.stopPropagation();

			// 记录按下位置
			bn.startX = e.changedTouches[0].clientX;

			bn.nowX = parseInt(bn.banner.style.transform.replace(/[a-zA-Z()]/g, ''))
		}

		// 触摸滑动
		function touchMove (e) {
			// e.preventDefault();
			e.stopPropagation();

			bn.banner.style['transition-duration'] = '0ms';

			// 记录滑动时的位置
			bn.moveX = e.changedTouches[0].clientX;

			// 计算滑动距离
			bn.moveLen = bn.moveX - bn.startX;

			//滑动距离绝对值
			bn.absMoveLen = Math.abs(bn.moveLen);

			// 实时更新偏移量
			bn.banner.style.transform = 'translateX('+ parseInt(bn.nowX + bn.moveLen) +'px)';
			// console.log(bn.banner.style.transform);
		}

		// 触摸结束
		function touchEnd (e) {
			e.stopPropagation();

			// 滑动距离超过规定值时，切换图片
			if (bn.absMoveLen >= bn.tgWidth) {
				bn.banner.style['transition-duration'] = '400ms';
				// 判断滑动距离的正负值，决定切换前一张还是后一张
				if (bn.moveLen < 0) {
					bn.index++;
					// 校验，最大不超过轮播图长度-1
					if (bn.index >= bn.len - 1) {
						bn.index = bn.len - 1;
						bn.banner.style['transition-duration'] = '200ms';
					}
				} else {
					bn.index--;
					// 校验，最小不小于0
					if (bn.index < 0) {
						bn.index = 0;
						bn.banner.style['transition-duration'] = '200ms';
					}
				}
			} else {
				// 距离未达到指定值，设置过度事件，回弹
				bn.banner.style['transition-duration'] = '300ms';
			}
			bn.toggleByIndex(bn.index);
			// 如果有小圆点元素，才会执行切换操作
			bn.points && bn.togglePoint(bn.index);
			
		}

		// 通过当前图片index切换小圆点
		function togglePoint(index) {
			// 循环删除on类
			for (var i = 0; i < bn.len; i++) {
				bn.points[i].className = '';
			}
			// 给当前index的小圆点添加on类
			bn.points[index].className = 'on';
		}

		function toggleByIndex(index) {
			// 计算最终偏移量
			bn.endLen = -index * bn.width;
			// 通过c3属性进行偏移，配合过度效果
			bn.banner.style.transform = 'translateX('+ bn.endLen +'px)';
			bn.absMoveLen = 0;
		}
	}

	// 暴露切换轮播图方法
	return toggleBanner;
})