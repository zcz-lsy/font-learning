import cursorInit from "./components/cursorEffect.js"
import WorkList from "./components/workList.js"
import pageInit from "./components/pageInit.js";

// 鼠标交互
cursorInit();

// 相关工作交互
const worksData = [
    {
      title: 'Recongroup',
      subTitle: 'Corporate Design / Webdesign & Development',
      imgUrl: './src/imgs/recon.jpg',
      htmlUrl: '',
    },
    {
      title: 'Glassland',
      subTitle: 'Webdesign & Development',
      imgUrl: './src/imgs/glassland-screen-2.gif',
      htmlUrl: '',
    },
    {
      title: 'PEFC',
      subTitle: 'Graphic Design / Animations / SM',
      imgUrl: './src/imgs/pefc-sujet.jpg',
      htmlUrl: '',
    },
    {
      title: 'Biosphere Lab Lungau',
      subTitle: 'Corporate Design / Webdesign & Development / Social Media / Newsletter',
      imgUrl: './src/imgs/biosphere-lab-box.jpg',
      htmlUrl: '',
    },
    {
      title: 'ZIID',
      subTitle: 'Corporate Design / Webdesign / Graphic Design / Newsletter ',
      imgUrl: './src/imgs/ziid-flyer-2.jpg',
      htmlUrl: '',
    },
    {
      title: 'Hotel Gambswirt',
      subTitle: 'Webdesign / Social Media / Photography',
      imgUrl: './src/imgs/gambswirt-screen-2.jpg',
      htmlUrl: '',
    },
    {
      title: 'More works',
      subTitle: 'More works & photography',
      imgUrl: './src/imgs/HBM-3.jpg',
      htmlUrl: './moreworks/',
    },
  ]
  WorkList.init(worksData)

  gsap.set(".move-img", {
    opacity: 0,
    scale: 0,
    xPercent: -50,
    ypercent: -50,
})

const workItems = document.querySelectorAll(".works-item");
workItems.forEach((workItem) => {
    workItem.addEventListener("mouseenter", (e) => {
        const moveImg = e.currentTarget.querySelector(".move-img");
        gsap.to(moveImg, {
            x: e.offsetX,
            y: e.offsetY,
            scale: 1,
            opacity: 1,
            duration: 0.3
        })
    })
    
    workItem.addEventListener("mouseleave", (e) => {
        const moveImg = e.currentTarget.querySelector(".move-img");
        gsap.to(moveImg, {
            scale: 0,
            opacity: 0,
        })
    })
    
    workItem.addEventListener("mousemove", (e) => {
        const moveImg = e.currentTarget.querySelector(".move-img");
        // 注意offsetX与offsetY是针对target而不是currentTarget的
        gsap.to(moveImg, {
            x: e.offsetX ,
            y: e.offsetY
        })
    })

})

// 视频自动播放
const videos = document.querySelectorAll(".container .footer .text-box .more-info > video");
videos.forEach((video) => {
    video.muted = true;
    video.play();
    video.addEventListener("ended", function() {
        video.currentTime = 0;
        video.play();
    })
})

// 图标交互
let iconFlag = true;
const icon = document.querySelector(".container .footer .text-box .more-info > div .icon");
  icon.addEventListener("click", (e) => {
  icon.style.backgroundImage = iconFlag ? 'url("src/icons/close.svg")' : 'url("src/icons/play.svg")';
  iconFlag = !iconFlag;
})

// 页面初始化
pageInit();

// 样式切换
let switch_flag = false;
const switch_ele = document.querySelector(".container .info-header .nav .right .switch > label .slider-bar");
switch_ele.addEventListener("click", (e) => {
  const body = document.body;
  console.log(e.target);
  if (!switch_flag) {
    body.classList.add("old_style");
    switch_flag = true;
  }
  else {
    body.classList.remove("old_style");
    switch_flag = false;
  }
  console.log(body.classList)
})
