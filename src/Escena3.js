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

    generarEnemigosDerrota() {
        let x = Math.floor(Math.random() * (920 - 20 + 1)) + 20;

        let enemigo = this.physics.add.sprite(x, 50, "RadioAct");
        enemigo.setVelocityY(150); // Caída hacia abajo
        enemigo.play("rotate"); // Opcional: animación de rotación si tienes spritesheet
    }

    create() {
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("Radioactiveart", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
            frameRate: 9,
            repeat: -1
        });

        this.enemy = this.physics.add.sprite(-111,-111,"Radioactiveart");
        this.enemy.play("rotate", true);

        this.add.text(400, 100, 'HAS PERDIDO', {
            fontSize: '48px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.time.addEvent({
            delay: 3000, 
            callback: this.generarEnemigosDerrota,
            callbackScope: this,
            loop: true
        });

        const playButton = this.add.text(400, 250, 'VOLVER AL INICIO', {
            fontSize: '32px',
            color: '#00ff00'
        }).setOrigin(0.5).setInteractive();

        playButton.on('pointerdown', () => {
            this.scene.start('Scene1'); 
        });


    }
}