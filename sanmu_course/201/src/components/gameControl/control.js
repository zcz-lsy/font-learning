import GameLoader from "./gameLoader.js";
import LoadingScene from "../loadingScene/loadingScene.js";
import PlayScene from "../palyScene/playScene.js";


export default class Control {
    
    static gameApp = null;

    static playScene = null;

    static loadScene = null;

    static gameIsStart = false;

    static currentShapeIndex = 0;

    static gameScore = 0;

    static blockBarLife = 3;

    static boundary = {
        left: 0,
        right: innerWidth,
        top: 0,
        bottom: innerHeight,
    }

    static async gameInit(app) {
        this.gameApp = app;

        await GameLoader.loadSceneAssets();
        const loadingScene = new LoadingScene(app);
        this.loadingScene = loadingScene;
        this.gameApp.stage.addChild(this.loadingScene.sceneBox);

        await GameLoader.playSceneAssets(loadingScene.loadingBarInstance, this);
        const playScene = new PlayScene(this.gameApp);
        this.playScene = playScene;
        this.gameApp.stage.addChild(this.playScene.sceneBox);

    }

    static loadingSceneDisappear() {
        this.loadingScene.disappear();
    }

    static playSceneAppear() {
        this.playScene.appear();
    }

    static gameStart() {
        this.playScene.gameStart();
        this.gameIsStart = true;
        setTimeout(() => {
            this.shapesMoveStart();
        }, 2000)
    }

    static hitBlock() {
        const scoreTextInstance = this.playScene.scoreTextInstance;
        this.gameScore += 100;
        scoreTextInstance.element.text = this.gameScore;

        const goldenStarInstance = this.playScene.allInstances.goldenStar;
        goldenStarInstance.bounce();

    }

    static detectBoundary() {
        const shape = this.playScene.allInstances.shapes[this.currentShapeIndex];
        const blockBar = this.playScene.allInstances.blockBar;

        // 解引用
        const {x: barX, y: barY} = blockBar.element.getGlobalPosition();

        const barLeft = barX - blockBar.element.width / 2;
        const barRight = barX + blockBar.element.width / 2;
        const barTop = barY - blockBar.element.height / 2;
        const barBottom = barY + blockBar.element.height / 2;

        // 左右边界检测
        if (shape.element.x - shape.element.width / 2 < this.boundary.left || shape.element.x + shape.element.width / 2 > this.boundary.right) {
            shape.direction = Math.PI - shape.direction;
        }

        // 检测上边界
        if (shape.element.y < this.boundary.top + shape.element.height / 2 && shape.isInArea) {
            shape.direction = 2 * Math.PI - shape.direction;
        }

        // 挡板挡回去
        if (shape.element.y + shape.element.height / 2 <= barBottom && shape.element.y + shape.element.height / 2 >= barTop) {
            if (shape.element.x + shape.element.width / 2 >= barLeft && shape.element.x - shape.element.width / 2 <= barRight) {
                this.hitBlock();
                shape.direction = 2 * Math.PI - shape.direction;
            }
        }

        if (shape.element.y > this.boundary.bottom + 100) {
            this.shapeGetOut();
        }
    }

    static gameOver() {
        this.playScene.gameOver()
    }
    

    static shapesMoveStart() {
        this.playScene.allInstances.shapes.forEach((item) => {
            item.shapeBoxGetRandomReady();
        })

        const randomIndex = Math.floor(Math.random() * 8);
        this.currentShapeIndex = randomIndex;
        
        // 这里为什么需要bind（）？
        // 因为正常情况下， A.c(), c函数肯定知道this是谁，可是当你仅仅只是将A.c当作回调函数传进ticker.add()，
        // 那c函数中的this就会是和ticker相关而不是原来的A
        const shape = this.playScene.allInstances.shapes[this.currentShapeIndex];
        const shapesMoveFunc = shape.oneStep.bind(shape);
        this.shapesMoveFunc = shapesMoveFunc;
        this.gameApp.ticker.add(this.shapesMoveFunc);

        const detectBoundaryFunc = this.detectBoundary.bind(this);
        this.detectBoundaryFunc = detectBoundaryFunc;
        this.gameApp.ticker.add(this.detectBoundaryFunc);

        setTimeout(() => {
            this.playScene.allInstances.shapes[randomIndex].isInArea = true;
        }, 500)
    }



    static shapeGetOut() {
        this.gameApp.ticker.remove(this.shapesMoveFunc);
        this.gameApp.ticker.remove(this.detectBoundaryFunc);

        const shape = this.playScene.allInstances.shapes[this.currentShapeIndex];
        shape.isInArea = false;
        if (this.blockBarLife > 0) {
            this.blockBarLife --;
             
            this.playScene.allInstances.blockBar.barDecrease();

            setTimeout(() => {
                this.shapesMoveStart();
            }, 1000)

        }
        else {
            this.gameOver()
        }
    }
}