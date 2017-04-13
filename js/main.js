/**
 * Created by Administrator on 2017/4/13 0013.
 */
(function () {
   // ===========================================滑页部分
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        effect : 'coverflow',
        slidesPerView: 1,
        centeredSlides: true,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    });
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
})();