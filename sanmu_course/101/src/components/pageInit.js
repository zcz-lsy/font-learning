export default function pageInit() {
    document.addEventListener("DOMContentLoaded", function() {
        const loadingBlocks = document.querySelectorAll(".loading-block");
        loadingBlocks.forEach((loadingBlock) => {
            loadingBlock.classList.add("loading-block-moveup");
        })

        const eles = document.querySelectorAll(".init-Ref");

        const downone = document.querySelector(".loading-block.downone");
        downone.addEventListener("transitionend", () => {
            const io = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate__animated", "animate__fadeIn");
                    }
                })
            })
    
            eles.forEach((ele) => {
                io.observe(ele);
            })
        })



    })
}