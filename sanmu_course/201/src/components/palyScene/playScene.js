import { Container } from "../../libs/pixi.js";
import BlockBar from "./blockBar.js";
import ShapeBox from "./shapeBox.js";
import TitleBox from "./titleBox.js";
import GoldenStar from "./goldenStar.js";
import StartBtn from "./startBtn.js";
import GameLoader from "../gameControl/gameLoader.js";
import Control from "../gameControl/control.js";
import ScoreText from "./scoreText.js";

export default class PlayScene {
    constructor(app) {
        this.sceneBox = new Container();
        this.app = app;
        this.allInstances = {};

        this.shapePosInfos = [
            { from: { x: 100, y: -20 }, to: { x: this.app.screen.width / 3, y: 500 } },
            { from: { x: -20, y: 100 }, to: { x: this.app.screen.width / 8, y: 300 } },
            { from: { x: this.app.screen.width / 3, y: -50 }, to: { x: this.app.screen.width / 5 * 4, y: 200 } },
            { from: { x: this.app.screen.width, y: -10 }, to: { x: this.app.screen.width / 5 * 4.5, y: 100 } },
            { from: { x: this.app.screen.width / 2, y: -20 }, to: { x: this.app.screen.width / 10 * 4, y: 80 } },
            { from: { x: this.app.screen.width / 5 * 4, y: -20 }, to: { x: this.app.screen.width / 6 * 4, y: 520 } },
            { from: { x: this.app.screen.width, y: -20 }, to: { x: this.app.screen.width / 6 * 5, y: 400 } },
            { from: { x: this.app.screen.width + 30, y: 100 }, to: { x: this.app.screen.width / 5, y: 150 } },
          ]


        this.init();
    }

    init() {
        const titleBox = new TitleBox({gameBlockTextTexture: GameLoader.allData.playScene.gameBlockTextTexture, 
            chineseText: GameLoader.allData.playScene.chineseText, 
            rainBowColorTexture: GameLoader.allData.playScene.rainBowColorTexture}, 
            this.app.ticker, 
            {
                from: { x: this.app.screen.width / 2, y: -100 }, to: { x: this.app.screen.width / 2, y: 300 }
            })
        this.sceneBox.addChild(titleBox.element);

        let j = 0;
        const shapeArray = []
        for (let i in GameLoader.allData.playScene.shapesBundle) {
            const shapeBox = new ShapeBox(GameLoader.allData.playScene.shapesBundle[i], this.shapePosInfos[j]);
            shapeArray.push(shapeBox)
            this.sceneBox.addChild(shapeBox.element);
            j ++;
        }

        const blockBar = new BlockBar(GameLoader.allData.playScene.barTexture, GameLoader.allData.playScene.barCornerTexture,
            {
                from: { x: 100, y: this.app.screen.height - 300 }, to: { x: this.app.screen.width / 3, y: this.app.screen.height - 300 }
            }, 
            this.app
        );
        this.sceneBox.addChild(blockBar.element);

        const goldenStar = new GoldenStar(GameLoader.allData.playScene.goldenStarTexture,
            {
                from: { x: this.app.screen.width, y: 100 }, to: { x: this.app.screen.width * 6 / 10, y: 480 }
            }
        );
        this.sceneBox.addChild(goldenStar.element);


        const startBtn = new StartBtn({
            from: {
              x: this.app.screen.width / 2,
              y: this.app.screen.height + 100
            },
            to: {
              x: this.app.screen.width / 2,
              y: this.app.screen.height - 120
            }
          });
        this.sceneBox.addChild(startBtn.element);

        const scoreText = new ScoreText({
            from: { x: this.app.screen.width / 2 + 50, y: this.app.screen.height + 100 },
            to: { x: this.app.screen.width / 2 + 50, y: this.app.screen.height - 75 }
          })
      
        this.scoreTextInstance = scoreText
        this.sceneBox.addChild(scoreText.element)

        this.allInstances.titleBox = titleBox;
        this.allInstances.shapes = shapeArray;
        this.allInstances.blockBar = blockBar;
        this.allInstances.goldenStar = goldenStar;
        this.allInstances.startBtn = startBtn;

        this.setUpBtnEvent();

    }

    gameStart() {
        for (let name in this.allInstances) {
            if (name === "shapes") {
                this.allInstances[name].forEach((item) => {
                    item.hide();
                })
            }
            else {
                this.allInstances[name].hide();
            }
        }

        this.scoreTextInstance.showUp();
    }

    gameOver() {
        for (let name in this.allInstances) {
            if (name === "shapes") {
                this.allInstances[name].forEach((item) => {
                    item.showUp();
                })
            }
            else if (name === "blockBar") {
                this.allInstances[name].showUp();
                console.log(this.allInstances[name]);    
                this.allInstances[name].resetBar();
            }
            else if (name === "goldenStar") {
                this.allInstances[name].showResult();
            }
        }

        this.scoreTextInstance.showResult();
    }

    appear() {
        for (let name in this.allInstances) {
            if (name === "shapes") {
                this.allInstances[name].forEach((item) => {
                    item.showUp();
                })
            }
            else {
                this.allInstances[name].showUp();
            }
        }

    }

    setUpBtnEvent() {
        this.allInstances.startBtn.element.eventMode = "static";
        this.allInstances.startBtn.element.addEventListener("pointerdown", () => {
            Control.gameStart();
        })
    }
}