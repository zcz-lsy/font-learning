import { Container } from "../../libs/pixi.js";
import LoadingBar from "./loadingBar.js";
import RainBowStar from "./rainBowStar.js";
import LoadingText from "./loadingText.js";
import AuthorText from "./authorText.js";
import Control from "../gameControl/control.js";

export default class LoadingTitle {
    constructor(rainBowSheet) {
        this.element = new Container();
        this.rainBowSheet = rainBowSheet;
        this.loadingBarInstance = null;
        this.init();
    }

    init() {
        const rainBowStar = new RainBowStar(this.rainBowSheet);
        const loadingBar = new LoadingBar();
        this.loadingBarInstance = loadingBar;
        const loadingText = new LoadingText();
        const authorText = new AuthorText();

        authorText.element.y = 200;
        rainBowStar.element.x = authorText.element.width / 2;
        rainBowStar.element.y = 50;

        loadingBar.element.x = authorText.element.width / 2;
        loadingBar.element.y = 120;

        loadingText.element.x = authorText.element.width / 2;
        loadingText.element.y = 160


        this.element.addChild(rainBowStar.element, loadingBar.element, loadingText.element, authorText.element);

        this.element.pivot.set(this.element.width / 2, this.element.height / 2);

        this.rainBowStarInstance = rainBowStar;
        this.loadingBarInstance = loadingBar;
        this.loadingTextInstance = loadingText;
        this.authorTextInstance = authorText;
    }

    disappear() {
        gsap.to(this.rainBowStarInstance.element, {
            alpha: 0,
            duration: 0.75,
            y: this.rainBowStarInstance.element.y - 100,
            delay: 0.65,
            onComplete: () => {
                Control.playSceneAppear();
            }
        })

        gsap.to(this.loadingTextInstance.element, {
            alpha: 0,
            duration: 0.75,
            y: this.loadingTextInstance.element.y + 100,
            delay: 0.65
        })

        
        gsap.to(this.authorTextInstance.element, {
            alpha: 0,
            duration: 0.75,
            y: this.authorTextInstance.element.y + 100,
            delay: 0.65
        })

        gsap.to(this.loadingBarInstance.element, {
            alpha: 0,
            duration: 0.75,
        })
    }
}