const config = {
    width: 1000,
    height: 700,
    parent: "container",
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

function preload() {
    //Carga el sprite del átomo
    this.load.spritesheet("atomo", "assets/AtomoJuego19.png", {
        frameWidth: 96,
        frameHeight: 96
    })

    //Carga el sprite de la partícula radioactiva
    this.load.spritesheet("RadioactivePart", "assets/Radioactive.png", {
        frameWidth: 96,
        frameHeight: 96
    })
}

function create() {
    //Refiere al sprite del átomo
    this.anims.create({
        key: "move",
        frames: this.anims.generateFrameNumbers("atomo", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }),
        frameRate: 19,
        repeat: -1
    })
    this.player = this.add.sprite(200, 350, "atomo")
    this.player.play("move", true)

    

    //Refiere al sprite de la partícula radioactiva
    this.anims.create({
        key: "rotate",
        frames: this.anims.generateFrameNumbers("RadioactivePart", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
        frameRate: 9,
        repeat: -1
    })

    let grupo = this.add.group({
        key: 'RadioactivePart',
        repeat: 8,
        setXY: {
            x: 40,
            y: 300,
            stepX: 100
        }
    })
    grupo.playAnimation("rotate")

    this.tweens.add ({
        targets: grupo.getChildren(),
        duration: 1000,
        x: (target) => target.x + 50,
        repeat: -1,
        yoyo: true
    })

   
}

function update(time, delta) {
    
}