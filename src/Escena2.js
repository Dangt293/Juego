class Escena2 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene2" });
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

        this.load.image("Neutron", "assets/Neutron_Nuevo.png");

        this.load.spritesheet("explosion", "assets/Explosion.png", {
            frameWidth: 96,
            frameHeight: 96
        });

        this.load.spritesheet("gameOver", "assets/atomoExplosion.png", {
            frameWidth: 96,
            frameHeight: 96
        });
    }

    create() {

        this.add.image(0, 0, "Nuclear").setOrigin(0, 0);

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

        //Particula radiactiva
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
        this.physics.add.overlap(this.enemigos, this.shots, this.colisionNeutron, null, this);
        this.physics.add.overlap(this.enemigos, this.player, this.colisionJugador, null, this);

        this.cursors = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.velocidadX = 50;
        //CREAR OLEADA
        this.oleadaActual = 1;
        this.crearOleada = () => {
            console.log("Creando oleada: " + this.oleadaActual);
            let filas;
            let velocidad = 1000;
            if (this.oleadaActual < 5) {
                filas = this.oleadaActual + 1;
            } else {
                velocidad = Math.max(300, 1000 - (this.oleadaActual - 3) * 100)
                filas = 5;
            }
            const columnas = 10;
            const margenX = 50;
            const margenY = 50;
            const espaciadoX = 97;
            const espaciadoY = 80;

            for (let fila = 0; fila < filas; fila++) {
                for (let col = 0; col < columnas; col++) {
                    const x = margenX + col * espaciadoX;
                    const y = margenY + fila * espaciadoY;

                    let enemigo = this.physics.add.sprite(x, y, "RadioactivePart");
                    enemigo.play("rotate");
                    enemigo.setCollideWorldBounds(true);

                    this.enemigos.add(enemigo);

                    this.tweens.add({
                        targets: enemigo,
                        duration: velocidad,
                        x: x + 25,
                        repeat: -1,
                        yoyo: true,
                        onYoyo: () => {
                            enemigo.y += 30;
                        }
                    });
                }
            }
            console.log(velocidad);
            this.oleadaActual++;
        };

        //PUNTUACION
        this.score = 0;
        this.scoreText = this.add.text(5, 5, "Points: 0", {
            font: "18px Arcade Classic",
            fill: "#FFFFFF"
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.x -= 6;
        } else if (this.cursors.right.isDown) {
            this.player.x += 6;
        }

        //PARA DISPARAR
        if (Phaser.Input.Keyboard.JustDown(this.spacebar) && this.canShoot) {
            let shot = this.shots.create(this.player.x, this.player.y, "Neutron");
            shot.setVelocityY(-600);
            shot.setCollideWorldBounds(false);
            shot.body.allowGravity = false;

            this.canShoot = false;
            this.time.delayedCall(this.shootCooldown, () => {
                this.canShoot = true;
            });
        }

        if (this.enemigos.countActive(true) === 0 && !this.oleadaEnCurso) {
            this.oleadaEnCurso = true;

            this.time.delayedCall(1000, () => {
                this.crearOleada();
                this.oleadaEnCurso = false;
            });
        }
    }

    colisionNeutron(enemy, shot) {
        console.log("Colisión detectada");
        shot.destroy();

        this.anims.create({
            key: "explote",
            frames: this.anims.generateFrameNumbers("explosion", { start: 0, end: 10 }),
            frameRate: 9
        });

        const boom = this.add.sprite(enemy.x, enemy.y, "explosion");
        boom.anims.play("explote", true);
        boom.on('animationcomplete', () => {
            boom.destroy();
        });

        enemy.destroy();

        this.score += 500;
        this.scoreText.setText(`Points: ${this.score}`);

        if (this.score >= 250000) {
            this.scene.start('Scene4');
        }
        if (this.enemigos.countActive(true) === 0 && !this.oleadaEnCurso) {
            this.oleadaEnCurso = true;

            this.time.delayedCall(1000, () => {
                this.crearOleada();
                this.oleadaEnCurso = false;
            });
        }
    }

    colisionJugador(enemy) {
        console.log("Jugador golpeado");
        this.player.destroy();
        enemy.destroy();

        this.anims.create({
            key: "gameOver",
            frames: this.anims.generateFrameNumbers("gameOver", { start: 0, end: 20 }),
            frameRate: 9
        });

        const end = this.add.sprite(this.player.x, this.player.y, "gameOver");
        end.anims.play("gameOver", true);
        end.on('animationcomplete', () => {
            end.destroy();
        });




        this.time.delayedCall(3000, () => {
            this.scene.start('Scene3');
        }, [], this);


    }
}