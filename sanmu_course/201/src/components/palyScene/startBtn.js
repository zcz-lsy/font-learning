import {Text} from "../../libs/pixi.js"
import Character from "./character.js"

export default class StartBtn extends Character{
    constructor(posInfo) {
        super(posInfo)
        this.element = new Text("Start", {
            fontFamily: 'retro gaming',
            fontSize: 48,
            fill: 0x183BF5,
            letterSpacing: 2,
            align: 'center',
            dropShadowColor: '#FF32C6',
            dropShadow: true,
            dropShadowDistance: 6
        })
        this.colorInterval = null;
        this.init();
    }

    init() {
        this.superInit();
        this.element.anchor.set(0.5);

        this.element.eventMode = "static";
        this.element.on("mouseover", () => {
            this.colorInterval = setInterval(() => {
                this.element.style.fill = Math.floor(Math.random() * 16777215);
            }, 200);
            document.body.style.cursor = "pointer";
        })

        this.element.on("mouseout", () => {
            clearInterval(this.colorInterval);
            document.body.style.cursor = "default";
            this.element.style.fill = 0x183BF5;
        })
    }
}