'use strict'

//선택자 변수
const $nickName = document.querySelector('.nickname')
const $level = document.querySelector('.level')
const $maxHp = document.querySelector('.maxHp')
const $hp = document.querySelector('.hp')
const $maxSp = document.querySelector('.maxSp')
const $sp = document.querySelector('.sp')
const $atk = document.querySelector('.atk')
const $def = document.querySelector('.def')
const $maxXp = document.querySelector('.maxXp')
const $xp = document.querySelector('.xp')
const $textBox = document.querySelector('.text-box')

//캐릭터 클래스 (함수 추가예정)
class Charactor {
  constructor (name, lv, maxHp, hp, maxSp, sp, atk, def, maxXp, xp) {
    this.name = createName;
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
}


const createName = '파이' //임시지정
//const createName = prompt('캐릭터 닉네임을 설정해주세요', '');


// 닉네임과 스텟 초기값 세팅
//if (createName != null) { 값 안넣었을때 아예 안되는건 나중에 하자.
const newCharactor = new Charactor (createName, 1, 20, 20, 5, 5, 3, 1, 15, 0)

function updateStatus () { //레벨업, 경험치상승에 따른 스테이터스 업데이트
  $nickName.textContent = createName;
  $level.textContent = newCharactor.lv;
  $maxHp.textContent = newCharactor.maxHp;
  $hp.textContent = newCharactor.hp;
  $maxSp.textContent = newCharactor.maxSp;
  $sp.textContent = newCharactor.sp;
  $atk.textContent = newCharactor.atk;
  $def.textContent = Math.floor(newCharactor.def); //임시. 정수형태로 표현
  $maxXp.textContent = newCharactor.maxXp;
  $xp.textContent = newCharactor.xp;
  $maxXp.textContent = newCharactor.lv *15
  $textBox.textContent = `${createName} 이(가) 생성되었습니다`
}
updateStatus(); //시작시 한번 업데이트 하고 시작

// 레벨업 매크로. 매크로시 레벨업확인 (함수) 및 스테이터스 업데이트가 이루어짐
const $h2 = document.querySelector('h2')
$h2.addEventListener('click', () => {
  newCharactor.xp = newCharactor.xp + 10
  console.log (`경험치상승`)
  levelUp()
  updateStatus ()
})

// 레벨업시 스테이터스 값 증가량.
function levelUp () {
  if (newCharactor.xp >= newCharactor.lv*15) {
    newCharactor.xp -= newCharactor.lv*15;
    newCharactor.lv += 1
    newCharactor.maxHp += 5
    newCharactor.maxSp += 2
    newCharactor.atk += 1
    newCharactor.def += 0.5
    newCharactor.maxp = newCharactor.lv*15;
    updateStatus ()
    console.log(`레벨업!`)
  }
}


// 몬스터 클래스
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

//이건 따로 맵 몬스터 리스트에 연결하자
const forestMonster = [
  {M : new Monster ('슬라임', 10, 10, 3, 2, 3)},
  {M : new Monster ('큰 쥐', 8, 8, 3, 1, 3)},
  {M : new Monster ('들개', 15, 15, 5, 2, 5)}
]


//배틀 페이지

//선택자 함수
const $enemyName = document.querySelector('.enemy-name')
const $enemyBox = document.querySelector('.enemy-box')
const $enemyMaxHp = $enemyBox.querySelector('.maxHp')
const $enemyHp = $enemyBox.querySelector('.hp')
const $enemyAtk = $enemyBox.querySelector('.atk')
const $enemyDef = $enemyBox.querySelector('.def')
const $enemyXp = $enemyBox.querySelector('.xp')


function addTextContent () {
  $enemyName.textContent = nowEnemy.name
  $enemyMaxHp.textContent = nowEnemy.maxHp
  $enemyHp.textContent = nowEnemy.hp
  $enemyAtk.textContent = nowEnemy.atk
  $enemyDef.textContent = nowEnemy.def
  // $enemyXp.textContent = nowEnemy.xp
}


// 깊은복사를 위한 복사 함수
function cooyNowEnemy (obj) {
  for (let i in obj) {
    nowEnemy[i] = obj[i]
  }
  return nowEnemy
}


// 적 등장상황을 만들어보자.
let nowEnemy = {} //현재 적
function showMonster (monsterList) {
  if (Object.keys(nowEnemy).length == 0 ) { // 객체는 == {}로 확인할수가 없다. 이 방법을 통해 해당 객체가 비었는지 체크하는것이 좋다
    //현재 적이 없을때만 적을 생성함. 적을 잡으면 없애주는 조건필요
  const pickIndex = Math.floor(Math.random()*monsterList.length)
  cooyNowEnemy (monsterList[pickIndex].M) 
  addTextContent ()
  $textBox.textContent = `${nowEnemy.name} 이(가) 나타났다!`
  // 적의 상태(이름 및 체력)를 텍스트콘텐츠로 화면에 추가하는 내용이 필요 상태 
  }
}
// 전투 글자를 눌렀을 때 임의로 적을 등장시키는 함수. 이후 action 버튼을 추가해, 이걸 클릭시 적이 등장하는걸로 바꾸자.
const $mapStatus = document.querySelector('.map-status')
$mapStatus.addEventListener('click', () => {
  return showMonster(forestMonster)
})


  // 적의 상태 및 정보를 표시하는 함수와 선택자를 만들것 (HTML 포함)
//적이 죽으면 죽었다는 함수를 1초뒤에(딜레이)실행

///상대의 턴 만들기
let myTurn = true;
// 상대의 턴, 상대의 턴에는 removeEventListner 사용해주기.
// 내가 액션 사용시 턴을 부여하는 형태로.

function enemyAttack (enemy, character) {
  let damage =  enemy.atk - character.def
  character.hp -= damage
  $hp.textContent -= damage
  $textBox.textContent
  = ` ${damage}의 피해를 입었다!`
  myTurn = true
}


// 공격함수 (임시)
function attack (character, enemy) {
  if ( myTurn === true && Object.keys(nowEnemy).length != 0) { //내 턴이 트루이고, 적이 존재할때만
  
    let damage = character.atk - enemy.def // 내 공격력 - 적 방어력 = 데미지
  enemy.hp -= damage //상대방의 체력에서 데미지만큼 깐다.
  $enemyHp.textContent -= damage
  $textBox.textContent = `${nowEnemy.name}에게 ${damage}의 피해! 남은 체력은 ${nowEnemy.hp}`
  myTurn = false //실행 후 마이턴을 false로 바꿔줌
  
  checkDead$EnemyAttack (character, enemy) //공격이후 죽었는지 체크 & 적의 턴 실행
  }
}

const $attackBtn = document.querySelector('.attack-btn');
$attackBtn.addEventListener('click', () => {
  return attack (newCharactor, nowEnemy)
})


//죽었는지 확인 & 적의 턴
function checkDead$EnemyAttack (character, enemy) {
  if (enemy.hp <= 0) { //적의 체력이 0 이하라면 텍스트컨텐츠를 없애줌
    $textBox.textContent = `${nowEnemy.name}를 처치했다 ! ${nowEnemy.xp}의 경험치 획득!`
    $enemyName.textContent = ''
    $enemyMaxHp.textContent = ''
    $enemyHp.textContent = ''
    $enemyAtk.textContent = ''
    $enemyDef.textContent = ''
    $xp.textContent = parseInt($xp.textContent) + parseInt(nowEnemy.xp) //정수형으로 해줘야됨.
    nowEnemy = {} // 빈 객체로 만들어주자!
    myTurn = true //죽었다면 다시 내 턴으로 만들어서 이후 공격이 가능하게끔.
    
  } else { //죽지 않았다면 적의 턴을 실행
    setTimeout(()=> { // 1초 뒤 실행으로 차이 발생.
      return enemyAttack (enemy, character) // attack과 비슷한 적 공격함수. 
    }, 1500)
    //죽지 않았을 때, 적의 공격 실행
  }
}
