import Character from "./character.js";
import {Sprite} from "../../libs/pixi.js"

export default class GoldenStar extends Character {
    constructor(texture, posInfo) {
        super(posInfo)
        this.element = new Sprite(texture)
        this.animationInfo = {
          keyframes: {
            '0%': { y: posInfo.to.y },
            "50%": { y: posInfo.to.y - 20 },
            "100%": { y: posInfo.to.y }
          },
          duration: 1.2,
          delay: Math.random(),
          ease: 'none',
          repeat: -1
        }
        this.init();
      }
    
      init() {
        this.element.anchor.set(0.5);
        this.needAnimation = true;
        this.superInit();
      }

      goToReady() {
        gsap.to(this.element, {
          x: innerWidth / 2 - 30,
          y: innerHeight - 50,
          duration: 0.75
        })
      }

      bounce() {
        gsap.to(this.element, {
          y: this.element.y - 10,
          duration: 0.15,
          ease: "none",
          onComplete: () => {
            gsap.to(this.element, {
              y: this.element.y + 10,
              duration: 0.15,
              ease: "none",
            })
          }
        })
      }

}