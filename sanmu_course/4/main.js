const stackLayersArr = [...document.querySelectorAll(".stack-layer")];

const targetY = 600;
const deltaBaseY = 50;

// 设置scroll滚动到一定位置前，位置都不变。到一定位置后元素依次滚动上移消失
const stackLayerMove = (item, index, targetY) => {
    
    if (scrollY < targetY - index * deltaBaseY) {
        item.style.transform = `translateY(${deltaBaseY * index + scrollY}px)`;
    }
    else {
        item.style.transform = `translateY(${deltaBaseY}px)`;
    }
}

// 在一定scroll区间内， 设置文字滚动以及其速度变化
const textBox = document.querySelector(".text-box");
const movingText = document.querySelector(".moving-text");
for (let i = 0; i < 20; i ++ ) {
    const newText = movingText.cloneNode(true);
    textBox.appendChild(newText);
}

let translateDelta = 2;
let textTranslateX = 0;

let setTimeId = setInterval(() => {
    textTranslateX += translateDelta;
    textBox.style.transform = `translateX(-${textTranslateX}px)`;
}, 20)


let preScrollY = 0;
let scrollSpeed = 0;
let resetTimeId;
const settingSpeed = () => {
    scrollSpeed = scrollY - preScrollY;
    preScrollY = scrollY;

    translateDelta = Math.abs(scrollSpeed) > 2 ? Math.abs(scrollSpeed) : 2;
    clearTimeout(resetTimeId);
    resetTimeId = setTimeout(() => {
        translateDelta = 2;
    }, 50)
}

// 在一定scroll区间内， 改变透明度
let opacity = 0;
let startColorChangeY = 500;
const blueTag = document.querySelector(".blue-tag");
const vertLoop = document.querySelector(".vert-loop");
const horiLoop = document.querySelector(".hori-loop");

const changeOpacity = (startY, changeSpan, target, reverse) => {
    if (scrollY > startY) {
        const deltaY = scrollY - startY;

        if (deltaY < changeSpan) {
            opacity = (1 - deltaY / changeSpan).toFixed(2);
        }
        else {
            opacity = 0;
        }
    }
    else {
        opacity = 1;
    }

    if (reverse) {
        target.style.opacity = 1 - opacity
    } 
    else {
        target.style.opacity = opacity;
    }
}

// 在一定scroll区间内， 改变X或者Y上的位置
const changeTanslate = (startY, changeSpan, direction, target, baseDis, targetTans) => {
    if (scrollY > startY) {
        const deltaY = scrollY - startY;

        if (deltaY < changeSpan) {
            target.style.transform = `translate${direction}(-${(1 - (deltaY / changeSpan)) * baseDis}px)`;
        }
        else {
            target.style.transform = `translate${direction}(-${targetTans}px)`;
        }
    }
    else {
        target.style.transform = `translate${direction}(-${baseDis}px)`;
    }
}

const changeLoopTrans = (startY, changeSpan, target) => {
    if (scrollY > startY) {
        const deltaY = scrollY - startY;

        if (deltaY < changeSpan) {
            target.style.transform = `translateY(${deltaY * 1.2}px)`;
        }
        else {
            const ratio = (deltaY - changeSpan) / changeSpan > 2.5 ? 2.5 : (deltaY - changeSpan) / changeSpan;
            target.style.transform = `translateY(${deltaY * 1.2}px) scale(${ratio + 1})`;

        }
    }
}

// 关键就是随着scroll移动，把蒙版往下移。
const bigTitle = document.querySelector('.big-title')
const textMask =  document.querySelector('.text-mask')

// 通过js来设定遮罩在文字的半透明层的尺寸 因为直接通过样式设置不太好设置得刚好
textMask.style.height = bigTitle.offsetHeight + 110 + 'px'
textMask.style.width = bigTitle.offsetWidth +  'px'

// 这些·600， 1200之类的数字都要通过scrollY，进行判断设定。
window.addEventListener("scroll", (e) => {
    stackLayersArr.forEach((item, index) => {
        stackLayerMove(item, index, targetY);
    }) 
    settingSpeed();
    changeOpacity(startColorChangeY, 300, blueTag);
    changeOpacity(startColorChangeY, 300, horiLoop, true);
    changeTanslate(600, 600, "Y", vertLoop, 160, 0);
    changeTanslate(600, 100, "X", horiLoop, 320, 0); 
    changeLoopTrans(1200, 120, vertLoop);

    if (scrollY > 1600 && scrollY < 2300) {
        textMask.style.height = bigTitle.offsetHeight + 110 + 'px'
        textMask.style.width = bigTitle.offsetWidth +  'px'
        const deltaY = scrollY - 1600;
        textMask.style.transform = `translateY(${deltaY * 1.2}px)`;
    }
    else if (scrollY >= 2300){
        textMask.style.height = 0;
        textMask.style.width = 0;
    }

})