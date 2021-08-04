'use strict'


//캐릭터 클래스 (함수 추가예정)
export class Character {
    constructor (name, lv, maxHp, hp, maxSp, sp, atk, def, maxXp, xp) {
      this.name = name;
      this.lv = lv;
      this.maxHp = maxHp;
      this.hp = hp;
      this.maxSp = maxSp;
      this.sp = sp;
      this.atk = atk;
      this.def = def;
      this.maxXp = maxXp;
      this.xp = xp;
    }
    // equipWeapan (weapan) {
    //   this.atk += parseInt(weapan.atk)
    //   $atk.textContent = parseInt(.atk) + parseInt(weapan.atk)
    // }
  }
  

//몬스터 클래스
export class Monster {
    constructor (name, lv, maxHp, hp, atk, def, xp, img) {
      this.name = name;
      this.lv = lv;
      this.maxHp = maxHp;
      this.hp = hp;
      this.atk = atk;
      this.def = def;
      this.xp = xp;
      this.img = img
    }
  }
