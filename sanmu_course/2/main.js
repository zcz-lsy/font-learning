const navBar = document.querySelector(".nav-bar");
const moveBg = document.querySelector(".title-bg");
const titleArr = [...document.querySelectorAll(".title")];
const imgArr = [...document.querySelectorAll(".img-box")];

const baseX = 20;
const baseY = 10;

navBar.addEventListener("click", (e) => {
    if (e.target.classList.contains("title")) {
        moveBg.style.transform = `translate(${e.target.offsetLeft + baseX}px, ${e.target.offsetTop + baseY}px)`;
        titleArr.forEach((item) => {
            item.classList.remove("selected-title");
        })
        e.target.classList.add("selected-title");

        a = e.target.className.split(" ")[1].split("-")[0];
        imgArr.forEach((item) => {
            if (item.classList.contains(`${a}-bg`)) {
                item.classList.add("selected-bg");
            }
            else {
                item.classList.remove("selected-bg");
            }
        })
    }
})