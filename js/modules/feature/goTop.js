define([], function () {
    function goTop(event, time) {
        // 起始卷动值
        var top =  window.pageYoffset || document.documentElement.scrollTop || document.body.scrollTop;
        // 目标卷动值
        var end = 0;
        // 规定时间ms
        var time = time || 700;
        // 规定次数
        var targetCount = Math.floor(time / 30);
        // 定时器执行次数
        var count = 0;
        // 定时器每次的卷动值
        var step = top / targetCount;
        // 定时器执行频率
        var speed = 15;
        // 定时器句柄变量
        // console.log(top, time);
        var timer = setInterval(function () {
            // 由下往上回卷，每次卷动-step
            window.scrollBy(0,-step);
            // 累加执行次数
            count++;
            // 校验 
            if (count >= targetCount) {
                // 当执行次数到达目标次数时，微调卷动至目标卷动值end
                window.scrollTo(0,end);
                // 关闭定时器
                clearInterval(timer);
            }
        }, speed);
    }

    return goTop;
})