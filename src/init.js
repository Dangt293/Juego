
const config = {
    width: 1000,
    height: 700,
    parent: "container",
    type: Phaser.AUTO,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {

            }
        }
    }
}

var game = new Phaser.Game(config);

function preload() {
    //Carga el sprite del átomo
    this.load.spritesheet("atomo", "assets/AtomoJuego19.png", {
        frameWidth: 96,
        frameHeight: 96
    });

    //Carga el sprite de la partícula radioactiva
    this.load.spritesheet("RadioactivePart", "assets/Radioactive.png", {
        frameWidth: 96,
        frameHeight: 96
    });

    //Carga el sprite del neutron (disparo)
    this.load.image("Neutron" , "assets/Neutron_Nuevo.png");
}

function create() {

    //Refiere al sprite del átomo
    this.anims.create({
        key: "move",
        frames: this.anims.generateFrameNumbers("atomo", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }),
        frameRate: 19,
        repeat: -1
    });
    this.player = this.physics.add.sprite(400, 650, "atomo");
    this.player.play("move", true);

    this.player.setCollideWorldBounds(true);
    this.shots = this.physics.add.group();
    this.canShoot = true;
    this.shootCooldown = 175 ;

    //Refiere al sprite de la partícula radioactiva
    this.anims.create({
        key: "rotate",
        frames: this.anims.generateFrameNumbers("RadioactivePart", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
        frameRate: 9,
        repeat: -1
    });

    let grupo = this.physics.add.group({
        key: 'RadioactivePart',
        repeat: 9,
        setXY: {
            x: 50,
            y: 300,
            stepX: 97
        }
        
    });
    grupo.playAnimation("rotate")

    this.tweens.add({
        targets: grupo.getChildren(),
        duration: 1000,
        x: (target) => target.x + 25,
        repeat: -1,
        yoyo: true
    });

    grupo.children.iterate((enemy) => {
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(1);
    });

    this.cursors = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update(time, delta) {
    if (this.cursors.left.isDown) {
        this.player.x -= 6;
    } else if (this.cursors.right.isDown) {
        this.player.x += 6;
    };

    //PARA DISPARAR
    if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canShoot ) {
    let shot = this.shots.create(this.player.x , this.player.y, "Neutron");
    shot.setVelocityY(-600); // velocidad hacia la derecha
    shot.setCollideWorldBounds(false);
    shot.body.allowGravity = false;

    this.canShoot = false

    this.time.delayedCall(this.shootCooldown, () => {
        this.canShoot = true;
    });

    }
}