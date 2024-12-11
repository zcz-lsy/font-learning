import {Text} from "../../libs/pixi.js"

export default class LoadingText {
    constructor() {
        this.element = new Text("loading...", {
            fontFamily: "RetroGaming", 
            fontSize: 20,
            fill: 0xffffff,
            letterSpacing: 2,
        })
        this.init();
    }

    autoChange() {
        let count = 0;
        setInterval(() => {
            if (count == 4) {
                count = 0;
            }
            this.element.text = "loading" + ".".repeat(count);
            count ++;
        }, 500);

    }

    init() {
        this.autoChange();
        this.element.anchor.set(0.5, 0.5);
    }
}