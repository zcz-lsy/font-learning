import BlockBar from "./blockBar.js";

export default class Character {
    constructor(posInfo) {
        this.posInfo = posInfo;
        this.needAnimation = false;
        this.looAnimation = null;
    }

    superInit() {
        this.element.alpha = 0;
        this.element.x = this.posInfo.from.x;
        this.element.y = this.posInfo.from.y;
    }

    showUp() {
        gsap.to(this.element, {
            x: this.posInfo.to.x,
            y: this.posInfo.to.y,
            alpha: 1,
            duration: 0.75, 
            onComplete: () => {
                if (this.needAnimation) {
                    this.looAnimation = gsap.to(this.autoAnimationType === 'scale' ? this.element.scale : this.element, this.animationInfo)
                }
            }
        })

        if (this instanceof BlockBar) {
            this.looAnimation = gsap.to(this.element, {
                keyframes: {
                    "0%": {x: this.app.screen.width / 3},
                    "50%": {x: this.app.screen.width / 3 - 100},
                    "100%": {x: this.app.screen.width / 3}
                },
                delay: 1,
                repeat: -1,
                duration: 2,
                reverse: true,
            })
        }
    }

    hide() {
        if (this.looAnimation) {
            this.looAnimation.pause();
        }

        if (this.goToReady) {
            this.goToReady();
        }
        else {
            gsap.to(this.element, {
                x: this.posInfo.from.x,
                y: this.posInfo.from.y,
                duration: 0.75
            })
        }
    }

    showResult() {
        gsap.to(this.element, {
            y: this.element.y - 500,
            duration: 0.75,
        })
    }
}