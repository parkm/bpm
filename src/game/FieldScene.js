import Phaser from 'phaser'

export default class FieldScene extends Phaser.Scene {
  constructor(gm) {
    super();
  }

  create() {
    //let bkg = this.textures.get('background');
    //let bkgWidth = bkg.get().width;
    //let bkgHeight = bkg.get().height;
    //this.add.image(bkgWidth/2, bkgHeight/2, 'background');

    let shooter = new Shooter(this, 340, 800);

    this.pinsGroup = this.add.group();
    this.bubbles = [];

    this.input.setDefaultCursor('crosshair');

    this.bubbleSpawnEvent = this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: this.onBubbleSpawn,
      callbackScope: this
    });
  }

  update() {
    this.pinsGroup.children.iterate((p) => {
      p.update();
    })

    this.bubbles.forEach((b) => {
      b.update();
    });
  }

  onBubbleSpawn() {
    let bubble = new Bubble(this, Math.random() * 800, 0);
    this.bubbles.push(bubble);
  }

  onBubbleDestroy(bubble) {
    this.bubbles.splice(this.bubbles.indexOf(bubble), 1);
  }
}

class Shooter {
  constructor(scene, x, y) {
    this.image = scene.add.image(x, y, 'arrow');
    scene.input.on('pointermove', (pointer) => {
      this.angle = Phaser.Math.Angle.Between(this.image.x, this.image.y, pointer.x + scene.cameras.main.scrollX, pointer.y + scene.cameras.main.scrollY)
      this.image.angle = this.angle * Phaser.Math.RAD_TO_DEG;
    }, this);

    scene.input.on('pointerdown', (pointer) => {
      let pin = new Pin(scene, this.image.x, this.image.y, this.angle);
    }, this);
  }
}

class Pin {
  constructor(scene, x, y, angle) {
    this.image = scene.physics.add.image(x, y, 'pin');
    scene.pinsGroup.add(this.image);
    let velocity = 250;

    this.image.setVelocity(Math.cos(angle) * velocity, Math.sin(angle) * velocity);
    this.image.setBounce(1, 1);
    this.image.setCollideWorldBounds(true);
    this.image.angle = angle;

    this.image.update = () => {
      this.image.rotation = this.image.body.angle;
    };
  }
}

class Bubble {
  constructor(scene, x, y) {
    this.scene = scene;
    this.image = scene.physics.add.sprite(x, y, 'bubble');
    this.image2 = scene.physics.add.sprite(x, y, 'bubble-glare');
    this.container = scene.physics.add.group([this.image, this.image2])
    this.container.setVelocity(0, 50);
  }

  update() {
    if (this.image.y > this.scene.cameras.main.height + this.image.height / 2) {
      this.scene.onBubbleDestroy(this);
      this.container.destroy();
      this.image.destroy();
      this.image2.destroy();
    }
  }
}
