class Escena1 extends Phaser.Scene {
    constructor() {
        super({key :"Scene1"});
    }

    preload() {
        this.load.spritesheet("atomo", "assets/AtomoJuego19.png", {
            frameWidth: 96,
            frameHeight: 96
        });

        this.load.image("Nuclear", "assets/NuclearRapida.png");

        this.load.spritesheet("RadioactivePart", "assets/Radioactive.png", {
            frameWidth: 96,
            frameHeight: 96
        });
    }

    create() {
        this.anims.create({
            key: "move",
            frames: this.anims.generateFrameNumbers("atomo", { start: 0, end: 18 }),
            frameRate: 19,
            repeat: -1
        });

        this.player = this.physics.add.sprite(400, 650, "atomo");
        this.player.play("move", true);
        this.player.setCollideWorldBounds(true);

        this.shots = this.physics.add.group();
        this.canShoot = true;
        this.shootCooldown = 175;

        this.add.text(400, 100, 'Neutron Strike', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(400, 200, 'Por Gabriel Y Daniel', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const playButton = this.add.text(400, 250, 'JUGAR', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('Scene2'); 
        });

        
    }
}