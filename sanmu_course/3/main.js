const iconCloudyBox = document.querySelector('.icon-box-cloudy');
const iconSun = document.querySelector(".icon-cloudy-sun");
const iconCloudyBigCloud = document.querySelector('.icon-cloudy-big-cloud');
const iconCloudySmallCloud = document.querySelector('.icon-cloudy-small-cloud');

// cloudy
let cloudyBigCloudLock = false;
let cloudySmallCloudLock = false;
iconCloudyBox.addEventListener("mouseenter", () => {
    iconSun.classList.add("sun-rotate");

    iconCloudyBigCloud.classList.add("icon-cloudy-big-cloud-ani");
    iconCloudySmallCloud.classList.add("icon-cloudy-small-cloud-ani");
    
})

iconCloudyBox.addEventListener("mouseleave", () => {
    cloudyBigCloudLock = true;
    cloudySmallCloudLock = true;
})

iconSun.addEventListener("transitionend", (e) => {
     e.currentTarget.classList.remove("sun-rotate");
     e.currentTarget.style.transition = "none";
     const target = e.currentTarget;
     setTimeout(() => {
        target.style.transition = "transform 1.65s ease-in-out"
     })
})

iconCloudyBigCloud.addEventListener("animationiteration", (e) => {
    if (cloudyBigCloudLock) {
        e.currentTarget.classList.remove("icon-cloudy-big-cloud-ani");
    }
})

iconCloudySmallCloud.addEventListener("animationiteration", (e) => {
    if (cloudySmallCloudLock) {
        e.currentTarget.classList.remove("icon-cloudy-small-cloud-ani");
    }
})

// suuny
const iconSunnySmall = document.querySelector(".smaller");
const iconSunnyBig = document.querySelector(".bigger");
const iconSunnyBox = document.querySelector(".icon-box-sunny")

iconSunnyBox.addEventListener("mouseenter", () => {
    iconSunnySmall.classList.add("fly-out");
    iconSunnyBig.classList.add("fly-in");
})

iconSunnySmall.addEventListener("transitionend", (e) => {
    e.currentTarget.classList.remove("fly-out");
    e.currentTarget.style.transition = "none";
    const target = e.currentTarget;
    setTimeout(() => {
        target.style.transition = "transform 1.5s ease-in-out"
    })
})

iconSunnyBig.addEventListener("transitionend", (e) => {
    e.currentTarget.classList.remove("fly-in");
    e.currentTarget.style.transition = "none";
    const target = e.currentTarget;
    setTimeout(() => {
        target.style.transition = "transform 1.5s ease-in-out"
    })
})

// rainy
const iconRainyBox = document.querySelector(".icon-box-rainy");
const iconRainyCloud = document.querySelector(".icon-rainy-cloud");
const fakeRainyCloud = document.querySelector(".fake-rainy-cloud");
const fakeRainyRain = document.querySelector(".fake-rainy-rain");
const rainDotsArr = [...document.querySelectorAll(".rain")];

let rainyLock = false;

iconRainyBox.addEventListener("mouseenter", (e) => {
    if (rainyLock) {
        return;
    }
    rainyLock = true;

    rainDotsArr.forEach((item, index) => {
        if (index > 4) {
            return;
        }

        if (index === 0) {
            item.style.transitionDelay = "0.2s"
        }
        else if (index === 2) {
            item.style.transitionDelay = "0.3s"
        }
        else {
            item.style.transitionDelay = index * 0.05 + "s";
        }

        item.classList.add("raining");
    })
    iconRainyCloud.classList.add("away-cloud");
    fakeRainyCloud.classList.add("fake-in-cloud");
    fakeRainyRain.classList.add("fake-in-rain");
})

fakeRainyCloud.addEventListener("transitionend", () => {

    rainyLock = false;
    iconRainyCloud.style.transition = 'none';
    iconRainyCloud.classList.remove("away-cloud");
    fakeRainyCloud.style.transition = 'none';
    fakeRainyCloud.classList.remove("fake-in-cloud");
    fakeRainyRain.style.transition = 'none';
    fakeRainyRain.classList.remove("fake-in-rain");

    rainDotsArr.forEach((item, index) => {
        if (index > 4) {
            return;
        }

        item.style.transition = 'none';
        item.classList.remove("raining");
    })

    setTimeout(() => {
        iconRainyCloud.style.transition = "transform 0.8s ease-in-out 1s";
        fakeRainyCloud.style.transition = "transform 1.2s ease-in-out 1s";
        fakeRainyRain.style.transition = "transform 1.2s ease-in-out 1s";
        
        rainDotsArr.forEach((item, index) => {
            if (index > 4) {
                return;
            }
            item.style.transition = "transform 0.8s ease-in-out"
        })
    })
})

// 观察器实现在视窗后才出现的效果

const cb = (entries) => {
    entries.forEach((item) => {
        if (item.isIntersecting) {
            if (item.target.className.includes("title")) {
                if (item.intersectionRatio < 0.5) {
                    item.target.classList.add("static-icon-init");
                    item.target.style.transitionDelay = 0.1 + "s";
                }
                else if (item.intersectionRatio >= 1) {
                    item.target.classList.remove("static-icon-init");
                }
            } 
            else if (item.target.className.includes("part4")) {
                item.target.classList.remove("part4-init");
            }
            else {
                const children = [...item.target.children];

                children.forEach((child, index) => {
                    if (child.classList.contains("pic-icon")) {
                        if (item.intersectionRatio < 0.5) {
                            child.classList.add("static-icon-init");
                        }
                        else  if (item.intersectionRatio >= 1){
                            child.classList.remove("static-icon-init");
                            child.style.transitionDelay = index * 0.1 + "s";
                        }
                    
                    }
                    else {
                        if (item.intersectionRatio < 0.5) {
                            child.classList.add("ani-icon-init");
                            child.style.transitionDelay =  0.2 + "s";
                        }
                        else  if (item.intersectionRatio >= 1) {
                            child.classList.remove("ani-icon-init");
                            child.style.transitionDelay = index * 0.2 + "s";
                        }
                    }

            })

            }

        }
    })
}

// 设定回调函数的触发条件
const options = {
    rootMargin: "40px",
    threshold: [0, 0.5, 1.0],
}

const observer = new IntersectionObserver(cb, options);
const aniIconsPart = document.querySelector(".part2");
observer.observe(aniIconsPart);

const part3IconsBox = document.querySelector(".icons-box");
observer.observe(part3IconsBox.firstElementChild);

const iconsTitle = document.querySelector(".icons-title");
observer.observe(iconsTitle);

let lineDiv = null;
for (let i = 6; i < 26; i ++ ) {
    if (i % 5 === 1) {
        lineDiv = document.createElement("div");
        lineDiv.classList.add("icons-line")
        part3IconsBox.appendChild(lineDiv);
        observer.observe(lineDiv);
    }

    const div = document.createElement("div");
    div.classList.add("pic-icon", "static-icon-init");
    div.style.backgroundImage = `url("icons/Icon${i}.png")`;
    lineDiv.appendChild(div);
}

// const part4 = document.querySelector(".part4");
// observer.observe(part4);
// 最后一部分的简单效果 
const part4 = document.querySelector('.part4')
observer.observe(part4)

const titleSun = document.querySelector(".title-sun");

// 记一下
const transform = getComputedStyle(titleSun).transform;
const basicTransform = new DOMMatrixReadOnly(transform);

// 文档总高度（包括溢出的）- 视口高度
const maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight
window.addEventListener("scroll", (e) => {
    if (scrollY > maxScrollHeight - 300) {
        const deltaY = scrollY - (maxScrollHeight - 300);

        titleSun.style.transform = `translateX(${basicTransform.m41 + 0.4 * deltaY}px)`
        console.log(titleSun.style.transform)

    }
})