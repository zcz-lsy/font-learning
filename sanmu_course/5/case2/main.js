const contentBox = document.querySelector(".content-box");
// contentBox.style.transform = `translateX`
const navDot = [...document.querySelectorAll(".dot")];
const content = document.querySelector(".content");
let timeId = 0;
let totalDelta = 0;

window.addEventListener("wheel", (e) => {
    
    totalDelta += e.deltaY;

    if (totalDelta < 0) {
        totalDelta = 0;
    } 
    else if (totalDelta > 3 * content.getBoundingClientRect().width) {
        
        totalDelta = 3 * content.getBoundingClientRect().width;
    }
    console.log(content.getBoundingClientRect().width);

    contentBox.style.transform = `translateX(-${totalDelta}px)`;

    navDot.forEach((item, index) => {
        let currentIndex = parseInt(totalDelta / content.getBoundingClientRect().width);
        if (index === currentIndex) {
            item.classList.add("big-dot");
        }
        else {
            item.classList.remove("big-dot");
        }
    })
})