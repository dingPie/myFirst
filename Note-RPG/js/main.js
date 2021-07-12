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

// 레벨업시 스테이터스 값 증가량.
function levelUp () {
  if (newCharactor.xp >= newCharactor.lv*15) {
    newCharactor.xp -= newCharactor.lv*15;
    newCharactor.lv += 1
    newCharactor.maxHp += 5
    newCharactor.hp += 5
    newCharactor.maxSp += 2
    newCharactor.sp += 2
    newCharactor.atk += 1
    newCharactor.def += 0.5
    newCharactor.maxp = newCharactor.lv*15;
    updateStatus ()
    $textBox.textContent = `레벨 업! ${newCharactor.name}의 레벨은 ${newCharactor.lv}입니다`
    console.log(`레벨업!`)
  }
}

//레벨업, 경험치상승에 따른 스테이터스 업데이트
function updateStatus () { 
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
}


const createName = '파이' //임시지정
//const createName = prompt('캐릭터 닉네임을 설정해주세요', '');
// 닉네임과 스텟 초기값 세팅
const newCharactor = new Charactor (createName, 1, 20, 20, 5, 5, 3, 1, 15, 0)


updateStatus(); //시작시 한번 업데이트 하고 시작
$textBox.textContent = `${createName} 이(가) 생성되었습니다`
// 레벨업 매크로. 매크로시 레벨업확인 (함수) 및 스테이터스 업데이트가 이루어짐
const $h2 = document.querySelector('h2')
$h2.addEventListener('click', () => {
  newCharactor.xp = newCharactor.xp + 10
  console.log (`경험치상승`)
  levelUp()
  updateStatus ()
})


// 몬스터 클래스
class Monster {
  constructor (name, lv, maxHp, hp, atk, def, xp) {
    this.name = name;
    this.lv = lv;
    this.maxHp = maxHp;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.xp = xp;
  }
}

//이건 따로 맵 몬스터 리스트에 연결하자
//숲 속 1 몬스터 리스트
const forestMonster = [  
  {M : new Monster ('큰 쥐', 1, 8, 8, 3, 1, 3)},
  {M : new Monster ('슬라임', 2, 10, 10, 3, 2, 3)},
  {M : new Monster ('들개', 4, 15, 15, 5, 2, 5)}
]


//배틀 페이지
//선택자 함수
const $enemyName = document.querySelector('.enemy-name')
const $enemyBox = document.querySelector('.enemy-box')
const $enemyLv = $enemyBox.querySelector('.enemy-lv')
const $enemyMaxHp = $enemyBox.querySelector('.maxHp')
const $enemyHp = $enemyBox.querySelector('.hp')
const $enemyAtk = $enemyBox.querySelector('.atk')
const $enemyDef = $enemyBox.querySelector('.def')
const $enemyXp = $enemyBox.querySelector('.xp')
const $statusDisplay = $enemyBox.querySelector('.status-display')


//적 등장
let nowEnemy = {} //현재 적

function showMonster (monsterList) {
  if (Object.keys(nowEnemy).length == 0 ) { // 객체는 == {}로 확인할수가 없다. 이 방법을 통해 해당 객체가 비었는지 체크하는것이 좋다
  const pickIndex = Math.floor(Math.random()*monsterList.length) // 랜덤으로 인덱스 번호 뽑고
  copyNowEnemy (monsterList[pickIndex].M) 
  addTextContent ()
  $textBox.textContent = `${nowEnemy.name} 이(가) 나타났다!`
  $statusDisplay.style.display = 'block'
  }
}

// 적 객체를 깊은복사를 위한 함수
function copyNowEnemy (obj) {
  for (let i in obj) {
    nowEnemy[i] = obj[i]
  }
  return nowEnemy
}

// 적 상태창 업데이트
function addTextContent () {
  $enemyName.textContent = nowEnemy.name
  $enemyLv.textContent = nowEnemy.lv
  $enemyMaxHp.textContent = nowEnemy.maxHp
  $enemyHp.textContent = nowEnemy.hp
  $enemyAtk.textContent = nowEnemy.atk
  $enemyDef.textContent = nowEnemy.def
  // $enemyXp.textContent = nowEnemy.xp
}


// 공격 액션
function attack (character, enemy) {
  if ( myTurn === true && Object.keys(nowEnemy).length != 0) {//내 턴이 트루이고, 적이 존재할때만
    if ( enemy.def > character.atk ) { //적 방어력이 더 높을때는 데미지 0
      $textBox.textContent
      = `공격이 먹히지 않는다!`
      checkDead$EnemyAttack (character, enemy) //데미지가 0이어도 적의 공격은 실행해야 하니까.
      return
    }
    let damage = character.atk - enemy.def
    enemy.hp -= damage
    $enemyHp.textContent -= damage
    $textBox.textContent = `${nowEnemy.name}에게 ${damage}의 피해! 남은 체력은 ${nowEnemy.hp}`
    myTurn = false //실행 후 마이턴을 false로 바꿔줌
    
    checkDead$EnemyAttack (character, enemy) //공격이후 죽었는지 체크 & 적의 턴 실행
  }
}


//죽었는지 확인 & 적의 턴
function checkDead$EnemyAttack (character, enemy) {

  if (enemy.hp <= 0) { //적의 체력이 0 이하라면 텍스트컨텐츠를 없애줌
    $textBox.textContent = `${nowEnemy.name}를 처치했다 ! ${nowEnemy.xp}의 경험치 획득!`
    newCharactor.xp += parseInt(nowEnemy.xp)
    $xp.textContent = parseInt($xp.textContent) + parseInt(nowEnemy.xp) //정수형으로 해줘야됨.
    levelUp () // 몹이 죽었을 때 레벨업 체크까지.
    finishBattle ()

  } else { //죽지 않았다면 적의 턴을 실행
    setTimeout(()=> { // 1초 뒤 실행으로 차이 발생.
      return enemyAttack (enemy, character) // attack과 비슷한 적 공격함수. 
    }, 1000)
    //죽지 않았을 때, 적의 공격 실행
  }
}

///상대의 턴 만들기
let myTurn = true;

function enemyAttack (enemy, character) {
  if (character.def > enemy.atk ) {
    $textBox.textContent
    = `0의 피해를 입었다!`
    myTurn = true
    return
  }
  let damage =  Math.floor(enemy.atk - character.def)
  character.hp -= damage
  $hp.textContent -= damage
  $textBox.textContent
  = ` ${damage}의 피해를 입었다!`
  myTurn = true
  charactorDaed ()
}

// 내 캐릭터 죽었는지 체크
function charactorDaed () {
  if (newCharactor.hp <= 0) {
    $textBox.textContent = `당신은 죽었습니다. 캐삭해버려야되는데 아직 못만듬`
    return
  }
}

function finishBattle () { //전투가 끝났을 때
  nowEnemy = {} // 빈 객체로 만들어주자!
  myTurn = true //죽었다면 다시 내 턴으로 만들어서 이후 공격이 가능하게끔.
  $statusDisplay.style.display = 'none' // 적 상태창이 안보이게 변경. 따로 textContent 지정 안해도 되서 편함
}

//도망함수
function runBattle (enemy, charactor) {
  if (charactor.lv > enemy.lv) { //내 레벨이 적보다 높으면 100% 도망
    $textBox.textContent = `${nowEnemy.name}으로부터 성공적으로 도망쳤다!!`
    finishBattle ()
    console.log(`레벨이 높아서 100%도망`)
    return
  }
  if (myTurn === true && Object.keys(nowEnemy).length !== 0) {
    let runProbability = Math.floor(Math.random()*10)

    if (runProbability >= 3) { // 70% 확률로 도망
      $textBox.textContent = `${nowEnemy.name}으로부터 성공적으로 도망쳤다!!`
      finishBattle ()
    } else {
      $textBox.textContent = `도망 실패!`
      setTimeout(() => { //도망 실패시, 1초후 적 공격 실행
        enemyAttack (enemy, charactor)
    }, 1000)
    }
  }
}

//버튼 선택자
const $attackBtn = document.querySelector('.attack-btn');
const $runBtn = document.querySelector('.run-btn')
const $actionBtn = document.querySelector('.action-btn')

//함수 이벤트 실행
$attackBtn.addEventListener('click', () => {
  return attack (newCharactor, nowEnemy)
})
$runBtn.addEventListener('click', () => {
  return runBattle (nowEnemy, newCharactor)
})
$actionBtn.addEventListener('click', () => {
  return showMonster(forestMonster)
})


//임시

// 도망 or 사망시 텍스트 컨텐츠 변경
  // $enemyName.textContent = ''
  // $enemyMaxHp.textContent = ''
  // $enemyHp.textContent = ''
  // $enemyAtk.textContent = ''
  // $enemyDef.textContent = ''