import { Assets } from "../../libs/pixi.js";
import Control from "./control.js";

export default class GameLoader {
    static data = {
        loadScene: {
            singles: [
              { name: 'RetroGaming', path: 'src/assets/fonts/RetroGaming.ttf' },
              { name: 'upheavtt', path: 'src/assets/fonts/upheavtt.ttf' },
              { name: 'rainbowStarSheetData', path: 'src/assets/rainbowStarSheet/rainbowStar.json' },
            ],
          },
        playScene: {
            singles: [
              { name: 'gameBlockTextTexture', path: 'src/assets/titleTextures/blockText.png' },
              { name: 'rainBowColorTexture', path: 'src/assets/titleTextures/rainBowColor.png' },
              { name: 'chineseTextTexture', path: 'src/assets/titleTextures/dang.png' },
              { name: 'barTexture', path: 'src/assets/elements/barBlock.png' },
              { name: 'barCornerTexture', path: 'src/assets/elements/barCorner.png' },
              { name: 'goldenStarTexture', path: 'src/assets/elements/goldenStar.png' },
            ],
            bundles: [
              {
                name: 'shapesBundle',
                paths: {
                  shape1: 'src/assets/shapes/shape1.png',
                  shape2: 'src/assets/shapes/shape2.png',
                  shape3: 'src/assets/shapes/shape3.png',
                  shape4: 'src/assets/shapes/shape4.png',
                  shape5: 'src/assets/shapes/shape5.png',
                  shape6: 'src/assets/shapes/shape6.png',
                  shape7: 'src/assets/shapes/shape7.png',
                  shape8: 'src/assets/shapes/shape8.png'
      
                }
              }
            ]
        }
    }

    static allData = {};

    static baseProgress = 0;
    static finalProgress = 0;

    // 0-2  * 50 => 0-100
    // 0 - 20 真实的联动
    // 20 - 100 假进度加载
    // 我不想让让它一下就加载完了
    static goProgress(progess, loadingBar) {
      loadingBar.barUpdate(progess * 10);
      if (progess === 2) {
        const obj = {
          num: 20,
        }
        gsap.to(obj, {
            num: 100,
            duration: 3,
            onUpdate: () => {
                loadingBar.barUpdate(obj.num);
            },
            onComplete: () => {
                Control.loadingSceneDisappear();
            }
        })
      }

    }


    static async loadSceneAssets() {
        const sceneData = this.data["loadScene"];
        const singlesData = sceneData["singles"];

        const assetsNames = [];            
        singlesData.forEach((single) => {
            Assets.add(single.name, single.path);
            assetsNames.push(single.name);
        })

        const data = await Assets.load(assetsNames);
        this.allData.loadScene = {...data};
    }

    static async playSceneAssets(loadingBar) {
        const sceneData = this.data["playScene"];
        const singlesData = sceneData["singles"];

        const singlesName = [];
        for (let single of singlesData) {
            Assets.add(single.name, single.path);
            singlesName.push(single.name);
        }

        const bundlesData = sceneData["bundles"];
        const bundlesName = [];
        bundlesData.forEach((item) => {
            Assets.addBundle(item.name, item.paths);
            bundlesName.push(item.name);
        })

        const singlesAssets = await Assets.load(singlesName, (progess) => {
            // console.log(progess);
            this.finalProgress = this.baseProgress + progess;
            this.goProgress(this.finalProgress, loadingBar);

            if (this.finalProgress === 1) {
              this.baseProgress = 1;
            }
        });
        const bundlesAssets = await Assets.loadBundle(bundlesName, (progess) => {
            this.finalProgress = this.baseProgress + progess;
            this.goProgress(this.finalProgress, loadingBar);
        });

        this.allData.playScene = {...singlesAssets, ...bundlesAssets};
    }
}