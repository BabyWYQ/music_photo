/**
 * Created by Administrator on 2017/4/10 0010.
 */
(function(){
// =========================================音乐部分
    var audioPlayers = document.querySelector(".audioPlayer");
    // console.log(audioPlayers);
    var btn = document.getElementById("btn");
    var singing = true;//明白开关的含义 singing表示正在播放
    btn.onclick= function(){
        if(singing){
            audioPlayers.pause();
            btn.style.background="url(../img/music.jpg) no-repeat -481px -245px";
            btn.style.animation="none";
            singing=false;
        }else{
            btn.style.background="url(../img/music.jpg) no-repeat -187px -360px";
            btn.style.animation="music 2s linear 0s infinite";
            audioPlayers.play();
            singing=true;
        }
    };
//====================================换页按钮
    var  cut_btns = document.querySelector(".cut_btn");
    //当前页面编号
    var nowpage = 0;
//       得到所有的page
    var pages = document.querySelectorAll(".page");
    //得到窗口的高度-->
    var windowHeight = document.documentElement.clientHeight;
    //所有page就位
    for(var i = 1 ; i < pages.length ; i++){
        pages[i].style.webkitTransform = "translateY(" + windowHeight + "px)";
    }
    //监听就是给document对象
    document.addEventListener("touchstart", touchstartHandler, false);
    document.addEventListener("touchmove", touchmoveHandler, false);
    document.addEventListener("touchend", touchendHandler, false);
    //开始滑动的手指位置-->
    var startY;
    //滑动的距离-->
    var distanceY;

    //三个相关的page
    var idx = 0;
    var prev = NaN;
    var next = 1;

    //函数截流
    lock = true;

    // 触摸开始
    function touchstartHandler(event){
        //开始值
        startY = event.touches[0].clientY;

        //去掉所有的过渡
        pages[idx].style.transition = "none";
        !isNaN(next) && (pages[next].style.transition = "none");
        !isNaN(prev) && (pages[prev].style.transition = "none");

        pages[idx].style.zIndex = 888;
        !isNaN(next) && (pages[next].style.zIndex = 999);
        !isNaN(prev) && (pages[prev].style.zIndex = 999);
    }
    // 触摸移动
    function touchmoveHandler(event){
        //y是手指的位置减去误差
        distanceY = event.touches[0].clientY - startY;

        //到头了
        if(idx ==0  && distanceY > 0){
            return;
        }else if(idx ==4 && distanceY < 0){
            return;
        }

        if(distanceY < 0){
            //滑动的时候改变transform：
            pages[idx].style.webkitTransform = "scale(" + (1 - Math.abs(distanceY) / windowHeight) + ")";
            !isNaN(next) && (pages[next].style.webkitTransform = "scale(1) translateY(" + (windowHeight + distanceY) + "px)");
        }else if(distanceY > 0){
            pages[idx].style.webkitTransform = "scale(" + (1 - Math.abs(distanceY) / windowHeight) + ")";
            !isNaN(prev) && (pages[prev].style.webkitTransform = "scale(1) translateY(" + (-windowHeight + distanceY) + "px)");
        }
    }
    // 触摸结束
    function touchendHandler(event) {
        //到头了
        if (idx == 0 && distanceY > 0) {
            return;
        } else if (idx == 4&& distanceY < 0) {
            return;
        }

        //根据distanceY来确定是否滑动成功
        if (distanceY < -windowHeight / 5) {
            //向上滑动成功
            console.log("↑");

            //先改变信号量
            prev = idx;
            idx = next;
            next++;
            if (next > 4) {
                idx = 0;
                next = NaN;
            }

            console.log(prev, idx, next);

            //加上过渡
            !isNaN(prev) && (pages[prev].style.transition = "all 0.4s ease 0s");
            pages[idx].style.transition = "all 0.4s ease 0s";

            //最终的位置
            pages[prev].style.webkitTransform = "scale(0)";
            pages[idx].style.webkitTransform = "translateY(0px)";

        } else if (distanceY > windowHeight / 5) {
            console.log("↓");

            //先改变信号量
            next = idx;
            idx = prev;
            prev--;
            if (prev < 0) {
                idx = 4;
                prev = NaN;
            }

            console.log(prev, idx, next);
            //加上过渡
            !isNaN(next) && (pages[next].style.transition = "all 0.4s ease 0s");
            pages[idx].style.transition = "all 0.4s ease 0s";

            //最终的位置
            pages[next].style.webkitTransform = "scale(0)";
            pages[idx].style.webkitTransform = "translateY(0px)";
        } else {
            pages[idx].style.transition = "all 0.4s ease 0s";
            !isNaN(prev) && (pages[prev].style.transition = "all 0.4s ease 0s");
            !isNaN(next) && (pages[next].style.transition = "all 0.4s ease 0s");


            pages[idx].style.webkitTransform = "scale(1)";
            !isNaN(prev) && (pages[prev].style.webkitTransform = "translateY(" + -windowHeight + "px)");
            !isNaN(next) && (pages[next].style.webkitTransform = "translateY(" + windowHeight + "px)");

        }
//            inAnimateArr[idx]();
    }

//        //入场动画数组
//        var inAnimateArr = [function(){},function(){},function(){},function(){},function () {}];
//        //出场动画数组
//        var outAnimateArr = [function(){},function(){},function(){},function(){},function () {}];
//
//        //设计进场，出场动画
//        inAnimateArr[0]=function () {
//            console.log("我是1号页面的进场动画");
//            $(".no1").show().velocity({
//                "rotateY" :"270deg",
//                "rotateX":"180deg",
////                "translateZ":"40px",
////                 "skew":"30deg",
//                "scale":"0.5,2"
//            },0)
//                .velocity ("reverse",1000);
//        };
//        outAnimateArr [0]=function () {
//            console.log("我是1号页面的出场动画");
//            $(".no1").fadeOut();
//        };
//
//        inAnimateArr[1]=function () {
//            console.log("我是2号页面的进场动画");
//            $(".no2").show().velocity({
//                "rotateY":"360deg",
//                "rotateX":"90deg",
//
////                "translateZ" : "800px",
//                "scale" : "0.5,2"
//            },10);
//            $(".no3").show().velocity({
////                $(".no3").fadeIn(3000),
//                "rotateX":"180deg",
//                "rotateY":"360deg",
//                "translateZ":"500px"
//            },0)
//                .delay(400).velocity({
//                "reverse":"1000",
//                "scale":"1"
//            },400);
//        };
//        outAnimateArr[1]=function () {
//            console.log("我是2号页面的出场动画");
//            $(".no3").show().velocity({
//                "translateZ":"500px"
//            },500);
//            $(".no2").fadeOut(3000);
//        };
//
//        //        zkhjhvkjhxcjkhbvkjxhckjhbvjxhc
//        inAnimateArr[2] = function(){
//            console.log("我是2号页面的进场动画")
//            lock = true;
//        };
//        outAnimateArr[2] = function(){
//            console.log("我是2号页面的出场动画")
//        };
//
//        inAnimateArr[3] = function(){
//            console.log("我是3号页面的进场动画")
//            lock = true;
//        };
//        outAnimateArr[3] = function(){
//            console.log("我是3号页面的出场动画")
//        }
//        //sjdfjsdjgsdggdh
//
//        //页面一开始就应该执行0号页面的入场动画
//        inAnimateArr[0]();
//        outAnimateArr[0]();
//
//        $(document).mousewheel(function(event,delta){
//            if(!lock) return;
//            //阻止默认事件
//            event.preventDefault();
//            //备份一下老信号量
//            var oldpage = nowpage;
//            //得到鼠标滚动方向，信号量改变
//            nowpage -= delta;
//            if(nowpage > 7){
//                nowpage = 0;
//            }else if(nowpage < 0){
//                nowpage = 0;
//            }
//            //看看信号量有没有改变
//            if(oldpage != nowpage){
//                //在动画数组中，调用响应的函数执行
//                //下面的两条语句非常关键，从动画数组中，挑一个运行：
//                outAnimateArr[oldpage]();
//                inAnimateArr[nowpage]();
//
//            }
//        });



})();