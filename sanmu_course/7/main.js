const imgs = document.querySelectorAll(".icon-div");
const showLayer = document.querySelector(".show-layer");

const imageBackup = {}

imgs.forEach((item) => {
    item.addEventListener("click", (e) => {
        showLayer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        const imgPosInfo = e.currentTarget.getBoundingClientRect();
        const cloneImage = e.currentTarget.cloneNode(true);

        // 备份一下
        imageBackup.img = cloneImage;
        imageBackup.width = imgPosInfo.width;
        imageBackup.height = imgPosInfo.height;
        imageBackup.left = imgPosInfo.left;
        imageBackup.top = imgPosInfo.top;

        // 弄一个由小变大的动画。
        // 看起来是放大，其实是用了另一个一样大小的元素，用它来做放大的效果
        cloneImage.style.position = "absolute";
        cloneImage.style.left = imgPosInfo.left + "px";
        cloneImage.style.top = imgPosInfo.top + "px";
        showLayer.appendChild(cloneImage);
        setTimeout(() => {
            cloneImage.style.top = (window.innerHeight - 600) / 2 + "px";
            cloneImage.style.left = (window.innerWidth - 600) / 2 + "px";
            cloneImage.style.width = "600px";
            cloneImage.style.height = "600px"
        }, 50)

        // document.body.style.overflow = "hidden";
        showLayer.style.pointerEvents = "auto"
        console.log(1);

    })
})

showLayer.addEventListener("click", (e) => {
    if (e.target.classList.contains("show-layer")) {
        imageBackup.img.style.top = imageBackup.top + "px";
        imageBackup.img.style.left = imageBackup.left + "px";
        imageBackup.img.style.height = imageBackup.height + "px";
        imageBackup.img.style.width = imageBackup.width + "px";    
        showLayer.style.backgroundColor = "rgba(0, 0, 0, 0)";
        showLayer.style.pointerEvents = "none";
        document.body.style.overflow = "auto";
        
        setTimeout(() => {
            imageBackup.img.remove();
        }, 350)
        console.log(2);

     
    }





})