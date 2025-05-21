class Escena4 extends Phaser.Scene{
    constructor(){
        super({key : "Scene4"});
    }

    create() {
        
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

        
    }

}