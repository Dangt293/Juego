
const config = {
    width: 1000,
    height: 700,
    parent: "container",
    type: Phaser.CANVAS,
    scene: [Escena1, Escena2, Escena3, Escena4 ],
        physics: {
        default: "arcade",
        arcade: {
            gravity: {

            }
        }
    }


}
        /*
    {
        preload: preload,
        create: create,
        update: update,
        extends: {
            colisionNeutron: colisionNeutron
        }
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {

            }
        }
    }
        */


/*
var game = new Phaser.Game(config);

function colisionNeutron(enemy, shot) {
    console.log("Colisión detectada");
    shot.destroy();
      

    //Crea el sprite de la explosión
    this.anims.create({
        key: "explote",
        frames: this.anims.generateFrameNumbers("explosion", { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }),
        frameRate: 9
    });

    this.explosion = this.add.sprite("explosion");
    this.explosion.play("explote", true);
    const boom = this.add.sprite(enemy.x, enemy.y, "explosion");
    boom.anims.play("explote", true);
    boom.on('animationcomplete', () => {
        boom.destroy();
    });
    enemy.destroy();

    this.score += 500;
    this.scoreText.setText(`Points: ${this.score}`);
    
}

function colisionJugador(enemy) {
    console.log("Jugador golpeado");
    this.player.destroy();
    enemy.destroy();

    //Crea el sprite de la explosión
    this.anims.create({
        key: "gameOver",
        frames: this.anims.generateFrameNumbers("gameOver", { starts: 0, ends: 20 }),
        frameRate: 9
    });
    const end = this.add.sprite(this.player.x, this.player.y, "gameOver");
    end.anims.play("gameOver", true);
    end.on('animationcomplete', () => {
        end.destroy();
    });

}


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
    this.load.image("Neutron", "assets/Neutron_Nuevo.png");

    //Carga el sprite de explosión
    this.load.spritesheet("explosion", "assets/Explosion.png", {
        frameWidth: 96,
        frameHeight: 96
    });


    //Carga el sprite del átomo golpeado
    this.load.spritesheet("gameOver", "assets/atomoExplosion.png", {
        frameWidth: 96,
        frameHeight: 96
    });
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
    this.shootCooldown = 175;

    //Refiere al sprite de la partícula radioactiva
    this.anims.create({
        key: "rotate",
        frames: this.anims.generateFrameNumbers("RadioactivePart", { frames: [0, 1, 2, 3, 4, 5, 6, 7] }),
        frameRate: 9,
        repeat: -1
    });

    this.enemigos = this.physics.add.group({
        key: 'RadioactivePart',
        repeat: 9,
        setXY: {
            x: 50,
            y: 300,
            stepX: 97
        }

    });
    this.enemigos.playAnimation("rotate")

    this.enemigos.children.iterate((enemy) => {
        enemy.setCollideWorldBounds(true);
        enemy.setBounce(1);

        this.tweens.add({
            targets: enemy,
            duration: 1000,
            x: enemy.x + 25,
            repeat: -1,
            yoyo: true,
            onYoyo: () => {
                enemy.y += 30;
            }
        });
    });


    this.physics.add.overlap(this.enemigos, this.shots, colisionNeutron, null, this);
    this.physics.add.overlap(this.enemigos, this.player, colisionJugador, null, this);

    //Disparo
    this.cursors = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //CREA OLEADAS (ACTUALMENTE FALLA YA QUE CREA MUCHAS OLEADAS DE SEGUIDO Y NO TIENEN MOVIMIENTO)
    this.oleadaActual = 1;
    this.crearOleada = () => {
        console.log("Creando oleada: " +this.oleadaActual);
        var cont = 50;

        for (let i = 0; i < 9; i++) {
            let enemigo = this.physics.add.sprite(cont, 0, "RadioactivePart"); 
            enemigo.play("rotate");
            enemigo.setVelocityX(this.velocidadX);
            enemigo.setCollideWorldBounds(false);
            enemigo.body.immovable = true;

            this.enemigos.add(enemigo); 
            cont = cont + 97;
        }

        this.oleadaActual++;
    }

    this.score = 0;
    this.scoreText = this.add.text(5, 5, "Points: 0", {
        font: "18px Arcade Classic",
        fill: "#FFFFFF"
    });
}

function update(time, delta) {
    if (this.cursors.left.isDown) {
        this.player.x -= 6;
    } else if (this.cursors.right.isDown) {
        this.player.x += 6;
    };

    //PARA DISPARAR
    if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canShoot) {
        let shot = this.shots.create(this.player.x, this.player.y, "Neutron");
        shot.setVelocityY(-600); // velocidad hacia la derecha
        shot.setCollideWorldBounds(false);
        shot.body.allowGravity = false;

        this.canShoot = false

        this.time.delayedCall(this.shootCooldown, () => {
            this.canShoot = true;
        });

    }

    if (this.enemigos.countActive(true) === 0) {
        this.time.delayedCall(1000, () => {
            this.crearOleada();
        });
    }
}

*/

new Phaser.Game(config)