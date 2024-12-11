import Character from "./character.js";
import {Container, Sprite} from "../../libs/pixi.js"
import Control from "../gameControl/control.js";

export default class BlockBar extends Character {
    constructor(barTexture, barCornerTexture, posInfo, app) {
        super(posInfo);
        this.element = new Container();
        this.barCornerTexture = barCornerTexture;
        this.barTexture = barTexture;
        this.app = app;
        this.pointerDownPos = {};
        this.canbeDrag = false;
        this.init();
    }

    init() {
        const centerBar = new Sprite(this.barTexture);
        const leftSide = new Sprite(this.barCornerTexture);
        const rightSide = new Sprite(this.barCornerTexture);
        this.element.addChild(centerBar, leftSide, rightSide);

        leftSide.anchor.set(0.5);
        rightSide.anchor.set(0.5);
        centerBar.anchor.set(0.5);

        this.centerBar = centerBar;
        this.leftSide = leftSide;
        this.rightSide = rightSide;

        leftSide.x = leftSide.width / 2;
        leftSide.y = leftSide.height / 2;

        leftSide.angle = 180;

        centerBar.x = leftSide.width + centerBar.width / 2;
        centerBar.y = centerBar.height / 2;

        rightSide.x = leftSide.width + centerBar.width + rightSide.width / 2;
        rightSide.y = rightSide.height / 2;

        this.element.pivot.set(this.element.width / 2, this.element.height / 2);
        this.superInit();


        this.setUpDrag();
        this.element.eventMode = "static";

    }

    barDecrease() {
        if (Control.gameIsStart) {
            gsap.to(this.centerBar, {
                width: this.centerBar.width - 40,
                duration: 0.35
            })

            gsap.to(this.leftSide, {
                x: this.leftSide.x + 20,
                duration: 0.35
            })

            gsap.to(this.rightSide, {
                x: this.rightSide.x - 20,
                duration: 0.35
            })
        }
    }

    setUpDrag() {
        this.element.eventMode = "static";
        this.element.addEventListener('pointerover', () => {
            if (Control.gameIsStart) {
              document.body.style.cursor = 'grab'
            }
          })
      
      
        this.element.addEventListener('pointerout', () => {
            if (!this.canbeDrag) {
              document.body.style.cursor = 'default'
            }
          })
          
        this.element.addEventListener("pointerdown", (e) => {
            if (Control.gameInit) {
                this.canbeDrag = true;
                this.pointerDownPos.x = e.client.x;
                this.pointerDownPos.y = e.client.y;
                document.body.style.cursor = "grab";
            }
        })

        this.element.addEventListener("pointerup", (e) => {
            this.canbeDrag = false;
            document.body.style.cursor = "default";
        })

        this.element.addEventListener("globalpointermove", (e) => {
            if (this.canbeDrag) {
                const dis = e.client.x - this.pointerDownPos.x;
                this.element.x += dis;
                this.pointerDownPos = {
                    x: e.client.x,
                    y: e.client.y,
                }

                if (this.element.x < this.element.width / 2) {
                    this.element.x = this.element.width / 2;
                }

                if (this.element.x > innerWidth - this.element.width / 2) {
                    this.element.x = innerWidth - this.element.width / 2;
                }
            }
        })

        this.element.addEventListener("pointerupoutside", (e) => {
            this.canbeDrag = false;
            document.body.style.cursor = "default";
        })
      
    }

    resetBar() {
        gsap.to(this.centerBar, {
          width: 138,
          duration: 0.55
        })
        // 让leftBarSide向右移动
        gsap.to(this.leftBarSide, {
          x: this.leftSide.x - 60,
          duration: 0.55
        })
        // 让rightBarSide向左移动
        gsap.to(this.rightBarSide, {
          x: this.rightSide.x + 60,
          duration: 0.55
        })
      }
}