//关闭顶部banner
let close_banner = document.getElementById("close")
close_banner.addEventListener("click", function () {
    let topBanner = close_banner.parentElement.parentElement.style.display = "none"
},false)

//顶部导航条下拉菜单的显示
let dropdown_list = document.getElementsByClassName("down-list")
let dropdown_btn = document.getElementsByClassName("dropdown")


for (let i=0; i<dropdown_btn.length; i++){
    dropdown_btn[i].index = i
    dropdown_btn[i].onmouseenter = function (){
        dropdown_list[this.index].style.display = "block"
    }

    dropdown_btn[i].onmouseleave = function (){
        dropdown_list[this.index].style.display = "none"
    }
}

//定时改变热词
let hotword = document.getElementById("hw1")
let hotwords = ["限量五折券", "十元包邮品"]
let count = 1
timer = setInterval(function () {
    hotword.innerText = hotwords[count%2]
    count++
},2000)


//轮播图实现
let next_img_index = 0
let slider_images = document.getElementsByClassName("slider-img")

//显示指定的banner
function showBanner(index) {
    if ((index %= 5)<0){
        index +=  5
    }
    slider_images[index].classList.add("slider-img-display")
}
//隐藏指定的banner
function hideBanner(index) {
    if ((index %= 5) <0){
        index += 5
    }

    slider_images[index].classList.remove("slider-img-display")

}

//定时器，过两秒 自动换下一张
let timer_banner  = setInterval(function () {
    toggleBanner(false)
},2000)

//点击下一张 上一张
pre_banner =document.getElementById("pre-banner")
next_banner = document.getElementById("next-banner")

function toggleBanner(nextOrPrev){
    //先隐藏当前的图片
    hideBanner(next_img_index)
    //切换上/下一张图片
    if(nextOrPrev){
        //为真，切换上一张图片
        next_img_index --
    }
    else{
        //为假 切换下一张图片
        next_img_index ++
    }
    //显示banner
    showBanner(next_img_index)
    sliderBtnActive(next_img_index)

}

pre_banner.onclick =function () {
    toggleBanner( true)

    //点击的时候  清除定时器 消除自动切换下一张定时器的影响
    clearInterval(timer_banner)
    // 点击事件处理完毕2s后 ，再次启动自动切换下一张的定时器
    timer_banner  = setInterval(function () {
        toggleBanner( false)
    },2000)
}

next_banner.onclick =function () {
    toggleBanner(false)
    //点击的时候  清除定时器 消除自动切换下一张定时器的影响
    clearInterval(timer_banner)

    // 点击事件处理完毕2s后 ，再次启动自动切换下一张的定时器
    timer_banner  = setInterval(function () {
        toggleBanner(false)
    },2000)
}

//轮播图底部小按钮
sliderIndicatorBtns = document.getElementsByClassName("slider-indicator-btn")

function sliderBtnActive (index){
    for (let i = 0; i < sliderIndicatorBtns.length; i++) {
        sliderIndicatorBtns[i].classList.remove("slider-indicator-btn-focus")
    }

    if ((index%=5)<0) {
        index += 5
    }
    sliderIndicatorBtns[index].classList.add("slider-indicator-btn-focus")
}

for (let i = 0; i < sliderIndicatorBtns.length; i++) {
    (function (i){
        sliderIndicatorBtns[i].onmouseenter =function (){

            hideBanner(next_img_index)
            next_img_index = i
            showBanner(next_img_index)
            sliderBtnActive(next_img_index)


            clearInterval(timer_banner)
            timer_banner  = setInterval(function () {
                toggleBanner(false)
            },2000)
        }
    })(i)
}

//轮播图右边推荐交互按钮
let prevRecommend = document.getElementById("prev-recommend")
let nextRecommend = document.getElementById("next-recommend")
let recommendList = document.getElementsByClassName("recommend-list")

let next_recommendList_index = 0

function showRecommendList(index){
    if ((index %= 3)<0){
        index = index%3 + 3
    }
    recommendList[index].classList.add("recommend-list-show")
}
function hideRecommendList(index){
    if ((index %= 3) < 0){
        index = index+ 3
    }
    recommendList[index].classList.remove("recommend-list-show")
}



function toggle_recommend(nextOrPrev){
    hideRecommendList(next_recommendList_index)
    if(nextOrPrev){
        next_recommendList_index --
    }
    else {
        next_recommendList_index ++
    }
    showRecommendList(next_recommendList_index)
}

let timer_recommend  = setInterval(function () {
    toggle_recommend(false)
},5000)

prevRecommend.onclick =function (){
    toggle_recommend(true)
    clearInterval(timer_recommend)
    timer_recommend  = setInterval(function () {
        toggle_recommend(false)
    },5000)

}
nextRecommend.onclick = function () {
    toggle_recommend(false)
    clearInterval(timer_recommend)
    timer_recommend  = setInterval(function () {
        toggle_recommend(false)
    },5000)
}

