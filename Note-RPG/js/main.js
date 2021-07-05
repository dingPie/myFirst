'use strict'

//선택자 변수
const $nickName = document.querySelector('.nickname')
const $level = document.querySelector('.level')
const $maxHp = document.querySelector('.maxHp')
const $nowHp = document.querySelector('.nowHp')
const $maxSp = document.querySelector('.maxSp')
const $nowSp = document.querySelector('.nowSp')
const $atk = document.querySelector('.atk')
const $def = document.querySelector('.def')
const $maxXp = document.querySelector('.maxXp')
const $nowXp = document.querySelector('.nowXp')
const $textBox = document.querySelector('#text-box')

//캐릭터 클래스 (함수 추가예정)
class Charactor {
  constructor (name, lv, maxHp, hp, maxSp, sp, atk, def, maxXp, nowXp) {
    this.name = createName;
    this.lv = lv;
    this.maxHp = maxHp;
    this.hp = hp;
    this.maxSp = maxSp;
    this.sp = sp;
    this.atk = atk;
    this.def = def;
    this.maxXp = maxXp;
    this.nowXp = nowXp;
  }
}

class Monster {
  constructor (name, maxHp, hp, atk, def, xp) {
    this.name = name;
    this.maxHp = maxHp;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.xp = xp;
  }
}

const createName = prompt('캐릭터 닉네임을 설정해주세요', '');
const newCharactor = new Charactor (createName, 1, 20, 20, 5, 5, 3, 1, 15, 0)

function updateStatus () {
  $nickName.textContent = createName;
  $level.textContent = newCharactor.lv;
  $maxHp.textContent = newCharactor.maxHp;
  $maxSp.textContent = newCharactor.maxSp;
  $atk.textContent = newCharactor.atk;
  $def.textContent = newCharactor.def;
  $maxXp.textContent = newCharactor.maxXp;
  $nowXp.textContent = newCharactor.nowXp;
  $textBox.textContent = `${createName} 이(가) 생성되었습니다`
}
updateStatus();

const $h2 = document.querySelector('h2')
$h2.addEventListener('click', () => {
  newCharactor.nowXp = newCharactor.nowXp + 10
  console.log (`경험치상승`)
  levelUp()
  updateStatus ()
})

function levelUp () {
  if (newCharactor.nowXp >= newCharactor.lv*15) {
    newCharactor.nowXp -= newCharactor.lv*15;
    newCharactor.lv += 1
    newCharactor.maxHp += 5
    newCharactor.maxSp += 2
    newCharactor.atk += 1
    newCharactor.def += 0.5
    newCharactor.maxXp = newCharactor.lv*15;
    console.log(`레벨업!`)
  }
}

