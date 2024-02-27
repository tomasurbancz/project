export class Champ {

    constructor(name, hp, dmg, mana, attackSpeed, type, movementSpeed, color) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.maxHP = hp;
        this.mana = mana;
        this.color = color;
        this.img = new Image();
        this.attackSpeed = attackSpeed;
        this.setType(type);
        this.img.src = this.path;
        this.ratio = 0.15;
        this.size = {
            width: 500 * this.ratio,
            height: 500 * this.ratio
        }
        this.position = {
            x: 600,
            y: 10
        }
        this.velocity = {
            x: movementSpeed,
            y: movementSpeed
        }
        this.canShoot = true;
        this.dart = new Dart();
    }
    //this ukazuje na daný objekt

    attack() {
        console.log(`${this.name} is attacking"`)
    }

    update() {
       this.move();
       this.attack();
    }

    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.x >= 750) {
            this.velocity.x *= -1;
            this.velocity.y = -1;
            this.position.y = 99;
        }
        if(this.position.x <= 450) {
            this.velocity.x *= -1;
        }
        if(this.position.y <= 10) {
            this.velocity.y = 0;
        }
        if(this.position.x <= 600 && this.velocity.x < 0) {
            this.velocity.y = 1;
        }
        if(this.position.x <= 600 && this.velocity.x > 0) {
            this.velocity.y = -1;
        }
        if(this.position.x >= 600 && this.velocity.x < 0) {
            this.velocity.y = -1;
        }
        if(this.position.x >= 600 && this.velocity.x > 0) {
            this.velocity.y = 1;
        }
        if(this.position.y >= 100) {
            this.velocity.y = 0;
        }
    }

    setType(type) {
        const paths = [
            "./res/img/champs/teemo.png",
            "./res/img/champs/caitlyn.png",
            "./res/img/champs/ezreal.png",
            "./res/img/champs/jinx.png",
            "./res/img/champs/vayne.png"
        ];
        this.path = paths[type]; 
    }
    
    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.save(); //uloží součastný stav štětce
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y - 15, this.size.width * (this.hp/this.maxHP), 10);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.position.x, this.position.y - 15, this.size.width, 10);
        ctx.restore(); //vrátí stav do předchozího uloženého stavu
    }

    static detectHit(dart, champ) {
        if (
            dart.x < champ.position.x + champ.size.width &&
            dart.x + dart.width > champ.position.x &&
            dart.y < champ.position.y + champ.size.height &&
            dart.y + dart.height > champ.position.y
          ) {
            dart.hit = true;
            champ.hp -= dart.dmg;
            dart.x = -50;
          }
    }

    attack() { 
        if(this.canShoot) {
            this.canShoot = false;
            this.dart.x = this.position.x + this.size.width/2 - 5;
            this.dart.y = this.position.y - 30;
            this.dart.width = 10;
            this.dart.height = 20;
            this.dart.type = 0;
            this.dart.dmg = this.dmg;
            this.dart.color = this.color;
            this.dart.velocity = this.attackSpeed * 5;
            this.dart.shoot(this);
        }
    }
}

class Dart {
    
    constructor() {
        this.velocity = 5;
        this.hit = false;
    }

    async shoot(champ) {
        this.y += this.velocity;
        await new Promise(resolve => setTimeout(resolve, 1))
        if(this.hit) {
            this.hit = false;
            await new Promise(resolve => setTimeout(resolve, 1000/champ.attackSpeed));
            return champ.canShoot = true;
        }
        if(this.y < 720) {
            return this.shoot(champ);
        }
        await new Promise(resolve => setTimeout(resolve, 1000/champ.attackSpeed));
        champ.canShoot = true;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);    
    }
}


