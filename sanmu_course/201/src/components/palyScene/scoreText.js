import Character from "./character.js";

import { Text } from "../../libs/pixi.js";

export default class ScoreText extends Character {
    constructor(posInfo) {
        super(posInfo);
        this.element = null;
        this.text = '0';
        this.init();
    }

    init() {
        this.element = new Text(this.text, {
            fontFamily: 'Retro Gaming',
            fontSize: 42,
            fill: 0xFFF4DF,
            letterSpacing: 2,
            align: 'center',
        })
        this.superInit();
    }
}