import { Sprite } from "../../libs/pixi.js";
import Character from "./character.js";


export default class ShapeBox extends Character {
    constructor(texture, posInfo) {
        super(posInfo);
        this.element = new Sprite(texture);
        this.animationInfo = {
            keyframes: {
                "0%": {x: 1, y: 1},
                "50%": {x: 1.2, y: 1.2}, 
                "100%": {x: 1, y: 1}
            },
            duration: 1.2,
            delay: Math.random(),
            ease: "none",
            repeat: -1,
        }
        this.autoAnimationType = "scale";

        this.direction = 0;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.speed = 10;

        this.shapeIsOut = false;
        this.isInArea = false;

        this.init();
    }

    shapeBoxGetRandomReady() {
        const randomX = Math.random() * innerWidth / 2 + innerWidth / 4;
        this.element.x = randomX;
        this.element.y = -50;

        const randomAngle = Math.random() * 90 + 45;
        const randomRadian = randomAngle * Math.PI / 180;

        this.direction = randomRadian;
        this.x = this.element.x;
        this.y = this.element.y;
    }

    oneStep() {
        this.vx = this.speed * Math.cos(this.direction);
        this.vy = this.speed * Math.sin(this.direction);
        this.x += this.vx;
        this.y += this.vy;

        this.element.x = this.x;
        this.element.y = this.y;

    }

    init() {
        this.needAnimation = true;
        this.superInit();
    }
}