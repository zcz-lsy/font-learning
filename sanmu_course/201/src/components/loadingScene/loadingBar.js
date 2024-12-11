import { Container, Graphics } from "../../libs/pixi.js";

export default class LoadingBar {
    constructor() {
        this.element = new Container();
        this.num = 24;
        this.colors = [0xDC2B01, 0xF37E15, 0xFCD633, 0x63DC15, 0x41A4F5, 0x19227D, 0x663AB8, 0xA123B0] // 八种颜色
        this.init();
    }

    barUpdate(progess) {
        for (let i = 0; i < this.num; i ++ ) {
            const box = this.element.children[i];

            if (i <= progess / 100 * this.num) {
                box.beginFill(this.colors[i % this.colors.length]);
            }
            else {
                box.beginFill(0x3C3C3C);
            }
            // 需要不断地重新绘制
            box.drawRect(0, 0, 6, 6);
            box.endFill();
        }
    }

    init() {
        for (let i = 0; i < this.num; i ++ ) {
            const box = new Graphics();
            box.beginFill(0x3C3C3C);
            box.drawRect(0, 0, 6, 6);
            box.endFill();
            box.x = i * 12;

            this.element.addChild(box);
        }

        this.element.pivot.set(this.element.width / 2, this.element.height / 2);
    }
}