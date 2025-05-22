class Escena4 extends Phaser.Scene{
    constructor(){
        super({key : "Scene4"});
    }

    preload (){
        this.load.image("Trofeo" , "assets/Trofeo.png")
    }

    create() {
        this.add.rectangle(0, 0, 1000, 700, 0x3A025B).setOrigin(0,0);
        this.add.text(400, 100, '¡FELICIDADES, GANASTE!', {
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
        
        this.add.image(400,350,"Trofeo");

        
    }

}s