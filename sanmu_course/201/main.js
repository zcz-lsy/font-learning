import {Application, Assets} from "./src/libs/pixi.js"
import Control from "./src/components/gameControl/control.js";

const app = new Application({
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
})

document.body.appendChild(app.view);

Control.gameInit(app);