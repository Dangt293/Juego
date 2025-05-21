class Escena1 extends Phaser.Scene {
    constructor() {
        super({key :"Scene1"});
    }

    preload() {
        
        
    }

    create() {
        
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