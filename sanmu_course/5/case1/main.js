const contentBox = document.querySelector(".content-box");
const navDot = [...document.querySelectorAll(".dot")];
let timeId = 0;
let currentIndex = 0;
let totalDelta = 0;

window.addEventListener("wheel", (e) => {
    clearTimeout(timeId);
    totalDelta += e.deltaY;

    if (totalDelta > 1000 || totalDelta < -1000) {
        timeId = setTimeout(() => {
            if (e.deltaY > 0) {
                if (!(currentIndex === contentBox.childElementCount - 1)) {
                    currentIndex ++;
                }
            }
            else {
                if (currentIndex !== 0) {
                    currentIndex --;
                }
            }
            contentBox.style.transform = `translateY(-${currentIndex * 100}vh)`;
            navDot.forEach((item, index) => {
                if (index === currentIndex) {
                    item.classList.add("big-dot");
                }
                else {
                    item.classList.remove("big-dot");
                }
            })
            totalDelta = 0;
        }, 200);
    }
})