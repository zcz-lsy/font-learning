const contentBox = document.querySelector(".content-box");
// contentBox.style.transform = `translateX`
const navDot = [...document.querySelectorAll(".dot")];
const allContent = document.querySelectorAll(".content");
let timeId = 0;
let totalDelta = 0;
let currentIndex = 0;

window.addEventListener("wheel", (e) => {
    
    totalDelta += e.deltaY;
    clearTimeout(timeId);
    timeId = setTimeout(() => {
        if (totalDelta < -1000 || totalDelta > 1000) {
            if (totalDelta > 0) {
                if (currentIndex < allContent.length - 1) {
                    currentIndex ++;
                    allContent.forEach((item) => {
                        item.classList.remove("show-layer");
                    })
                    allContent[currentIndex].classList.remove("away-layer");
                    allContent[currentIndex].classList.add("show-layer");
                }
            }
            else {
                if (currentIndex > 0) {
                    allContent[currentIndex].classList.add("away-layer");
                    currentIndex --;
                    allContent[currentIndex].classList.add("second-layer");
                }
            }

            navDot.forEach((item, index) => {
                if (currentIndex === index) {
                    item.classList.add("big-dot");
                }
                else {
                    item.classList.remove("big-dot");
                }
            })
            totalDelta = 0;
        }
    }, 200)



   
})