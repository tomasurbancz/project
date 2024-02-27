export class Player {
    
    constructor() {
        this.hp = 100;
        this.img = new Image();
        this.path = "./res/img/champs/teemo.png"
        this.img.src = this.path;
        this.ratio = 0.2;
        this.size = {
            width: 250 * this.ratio,
            height: 500 * this.ratio
        }
        this.position = {
            x: 1280/2 - this.size.width / 2,
            y: 475
        }
        this.velocity = {
            x: 2,
            y: 2
        }
        this.canShoot = true;
        this.dart = new Dart();
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.save(); //uloží součastný stav štětce
        ctx.fillStyle = "black";
        ctx.fillRect(this.position.x, this.position.y + this.size.height, this.size.width, 10);
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y + this.size.height, this.size.width * (this.hp/100), 10);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.position.x, this.position.y + this.size.height, this.size.width, 10);
        ctx.restore(); //vrátí stav do předchozího uloženého stavu
    }

    update(keys) {
        this.movement(keys);
        this.attack(keys);
    }

    movement(keys) {
        if(keys["KeyA"] && this.position.x - this.velocity.x > 400) {
            this.position.x -= this.velocity.x;
        }
        if(keys["KeyD"] && this.position.x + this.velocity.x < 850) {
            this.position.x += this.velocity.x;
        }
    }

    attack(keys) { 
        if(keys["Space"] && this.canShoot) {
            this.canShoot = false;
            this.dart.x = this.position.x + this.size.width/2 - 5;
            this.dart.y = this.position.y - 30;
            this.dart.width = 10;
            this.dart.height = 20;
            this.dart.type = 0;
            this.dart.dmg = 20;
            this.dart.shoot(this);
        }
    }

    detectHit(dart) {
        if (
            dart.x < this.position.x + this.size.width &&
            dart.x + dart.width > this.position.x &&
            dart.y < this.position.y + this.size.height &&
            dart.y + dart.height > this.position.y
          ) {
            dart.hit = true;
            this.hp -= dart.dmg;
            dart.x = -50;
            if(this.hp <= 0) {
                this.position.x = 2000;
            }
          }
    }
}

class Dart {
    
    constructor() {
        this.velocity = 5;
        this.hit = false;
    }

    async shoot(player) {
        this.y -= this.velocity;
        await new Promise(resolve => setTimeout(resolve, 1))
        if(this.hit) {
            this.hit = false;
            return player.canShoot = true;
        }
        if(this.y + this.height > 0) {
            return this.shoot(player);
        }
        player.canShoot = true;
    }

    draw(ctx) {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.x, this.y, this.width, this.height);    
    }
}