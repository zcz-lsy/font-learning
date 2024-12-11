export default function cursorInit() {

    // 内部小圆点
    const centerDot = document.querySelector(".mousePoint");
    // const computedStyle = getComputedStyle(centerDot);

    // 小圆点变大圆点
    const allElement = document.querySelectorAll('[data-bigdot="true"]');
    allElement.forEach((item) => {
        item.addEventListener("mouseenter", (e) => {
            centerDot.classList.add("bigDot");
        })

        item.addEventListener("mouseleave", (e) => {
            centerDot.classList.remove("bigDot")
        })
    })

    // 外环
    paper.setup("mycanvas");
    const path = new paper.Path.Circle(new paper.Point(50, 50), 20);
    path.strokeColor = "#dcff78";
    path.strokeWidth = 2;

    const tool = new paper.Tool();
    let lastX = 0;
    let lastY = 0;
    let mouseX = 0;
    let mouseY = 0;
    tool.onMouseMove = function(event) {
        mouseX = event.point.x;
        mouseY = event.point.y;
    }

    const lerp = (a, b, n) => {
        return (1 - n) * a + n * b;
    }

    paper.view.onFrame = function() {
        lastX = lerp(lastX, mouseX, 0.2);
        lastY = lerp(lastY, mouseY, 0.2);
        path.position = new paper.Point(lastX, lastY);

        let rect = centerDot.getBoundingClientRect();
        centerDot.style.transform = `translateX(${mouseX - rect.height / 2}px) translateY(${mouseY - rect.width / 2}px)`
    }
}