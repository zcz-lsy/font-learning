import {Container, Text} from "../../libs/pixi.js"
import LoadingTitle from "./loadingTitle.js";
import GameLoader from "../gameControl/gameLoader.js";

export default class LoadingScene {
    constructor(app) {
        this.sceneBox = new Container();
        this.app = app;

        this.init();
    }
    
    init() {
        const loadingTitle = new LoadingTitle(GameLoader.allData.loadScene.rainbowStarSheetData);

        this.loadingBarInstance = loadingTitle.loadingBarInstance;
        loadingTitle.element.x = this.app.screen.width / 2;
        loadingTitle.element.y = this.app.screen.height / 2;

        this.sceneBox.addChild(loadingTitle.element);

        this.loadingTitleInstance = loadingTitle;
    }

    disappear() {
        this.loadingTitleInstance.disappear();
    }

}