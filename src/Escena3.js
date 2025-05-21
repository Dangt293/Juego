class Escena3 extends Phaser.Scene{
    constructor(){
        super({key : "Scene3"});
    }
    
    preload() {
        this.load.image("Nuclear", "assets/NuclearRapida.png");

        this.load.spritesheet("RadioactivePart", "assets/Radioactive.png", {
            frameWidth: 96,
            frameHeight: 96
        });
    }

    create() {
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("Radioactiveart", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 9,
            repeat: -1
        });

        this.enemy = this.physics.add.sprite(400, 0, "Radioactiveart");
        this.enemy.play("rotate", true);

        this.add.text(400, 100, 'HAS PERDIDO', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

    

        const playButton = this.add.text(400, 250, 'VOLVER AL INICIO', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('Scene1'); 
        });

        
    }
}