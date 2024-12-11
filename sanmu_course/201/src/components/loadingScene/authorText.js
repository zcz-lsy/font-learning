import { Container, Text } from "../../libs/pixi.js";

export default class AuthorText {
    constructor() {
        this.element = null;
        this.init();
    }

    init() {
        const authorText = new Text("Simple Game develop & design by ", {
            fontFamily: "Retro Gaming",
            fontSize: 22,
            fill: 0x3c3c3c,
            letterSpacing: 2,
            align: "center",
        })

        const helloCodeText = new Text("zhou", {
            fontFamily: "Retro Gaming", 
            fontSize: 22,
            fill: 0x3c3c3c,
            letterSpacing: 2,
            align: "center",
        })

        const titleBox = new Container();
        titleBox.addChild(authorText, helloCodeText);
        helloCodeText.x = authorText.width;

        this.element = titleBox;

        // 闪烁
        titleBox.eventMode = "static";

        let intervalId = null;
        titleBox.addEventListener("mouseenter", () => {
            const colors = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x9400d3];
            let i = 0;
            intervalId = setInterval(() => {
                helloCodeText.style.fill = colors[i];
                i = (i + 1) % colors.length;
            }, 200)
        })

        titleBox.addEventListener("mouseleave", () => {
            clearInterval(intervalId);
            helloCodeText.style.fill = 0x3c3c3c;
        })

        // 作者样式
        helloCodeText.eventMode = "static";
        helloCodeText.addEventListener("click", () => {
            location.href = "https://hellocode.fun";

        })

        helloCodeText.addEventListener("mouseenter", () => {
            document.body.style.cursor = "pointer";
        })

        helloCodeText.addEventListener("mouseleave", () => {
            document.body.style.cursor = "default";
        })
    }
}