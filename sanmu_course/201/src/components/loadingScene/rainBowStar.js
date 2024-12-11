import {AnimatedSprite, Container} from "../../libs/pixi.js"

export default class RainBowStar {
    constructor(rainBowSheet) {
        this.rainBowSheet = rainBowSheet;
        this.centerEye = new AnimatedSprite(rainBowSheet.animations["center/center"]);
        this.leftEye = new AnimatedSprite(rainBowSheet.animations["left/left"]);
        this.rightEye = new AnimatedSprite(rainBowSheet.animations["right/right"]);

        this.element = new Container();

        this.init();
    }

    init() {
        this.element.addChild(this.centerEye);
        this.centerEye.animationSpeed = 0.2;
        this.centerEye.loop = false;
        this.leftEye.animationSpeed = 0.2;
        this.leftEye.loop = false;
        this.rightEye.animationSpeed = 0.2;
        this.rightEye.loop = false;
        // this.centerEye.play();

        this.element.addChild(this.rightEye);
        this.autoWink();

        this.element.pivot.set(this.element.width / 2, this.element.height / 2);
        this.element.scale.set(0.5);

    }

    changeEyeSprite(animation) {
        this.element.children[0].gotoAndStop(0);
        this.element.removeChildren();
        this.element.addChild(animation);
        this.element.children[0].play();
    }
    
    autoWink() {
        const allWinks = [this.centerEye, this.leftEye, this.rightEye];
        const randomIndex = Math.floor(Math.random() * 3);
        // console.log(randomIndex);
        this.changeEyeSprite(allWinks[randomIndex]);
        
        const randomTime = Math.floor(Math.random() * 2 + 3);
        setTimeout(() => {
            this.autoWink();
        }, randomTime * 1000);
        
    }
}