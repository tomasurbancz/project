export class Champ {

    constructor(name, hp, dmg, mana) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.mana = mana;
    }

    attack() {
        console.log(`${this.name} is attacking"`)
    }
}
