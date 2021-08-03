'use strict'


// const createName = '파이' //임시지정

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


//아이템 형식 클래스
export class ConsumeItem {
    constructor(name, type, value, img, itemCode) {
      this.name = name
      this.value = value
      this.type = type
      this.img = img
      this.itemCode = itemCode
    }
  }

export class Weapan {
    constructor (name, lv, atk, def, img) {
      this.name = name;
      this.lv = lv;
      this.atk = atk;
      this.def = def
      this.img = img
    }
  }
  