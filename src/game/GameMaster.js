import Phaser from 'phaser'
import FieldScene from './FieldScene'

export default class GameMaster {
  constructor(canvas) {
    this.phaserConfig = {
      type: Phaser.AUTO,
      width: 640,
      height: 960,
      fps: 60,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false
        }
      },
      canvas: document.getElementById('canvas')
    };

    this.game = new Phaser.Game(this.phaserConfig);
    this.game.scene.add('preloader', new PreloaderScene(this), true);
    this.game.scene.add('field', new FieldScene(this));
  }

}

class PreloaderScene extends Phaser.Scene {
  constructor(gm) {
    super();
  }

  preload() {
    this.load.image('pin', 'res/gfx/pin.png');
    this.load.image('arrow', 'res/gfx/arrow.png');
    this.load.image('bubble', 'res/gfx/bubbles/bubble.png');
    this.load.image('bubble-glare', 'res/gfx/bubbles/bubble-glare.png');
  }

  create() {
    this.scene.start('field');
  }
}


