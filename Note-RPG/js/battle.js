'use strict'

import {Charactor, ConsumeItem, Monster} from './class.js'

// 몬스터 클래스
class Monster {
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
  
  //이건 따로 맵 몬스터 리스트에 연결하자
  //숲 속 1 몬스터 리스트
  const forestMonster = [  
    {M : new Monster ('큰 쥐', 1, 8, 8, 3, 1, 3, '/test.png')},
    {M : new Monster ('슬라임', 2, 10, 10, 3, 2, 3, '/test1.png')},
    {M : new Monster ('들개', 4, 15, 15, 5, 2, 5, '/test1.png')}
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
const $charactorPicture = document.querySelector('.picture-box')
const $statusDisplay = $enemyBox.querySelector('.status-display')
const $enemyPictureDisplay = $enemyBox.querySelector('.picture-display')


//적 등장
let nowEnemy = {} //현재 적
function showMonster (monsterList) {
  if (Object.keys(nowEnemy).length == 0 ) { // 객체는 == {}로 확인할수가 없다. 이 방법을 통해 해당 객체가 비었는지 체크하는것이 좋다
  const pickIndex = Math.floor(Math.random()*monsterList.length) // 랜덤으로 인덱스 번호 뽑고
  copyObject (nowEnemy ,monsterList[pickIndex].M) 
  updateEnemy ()
  $textBox.textContent = `${nowEnemy.name} 이(가) 나타났다!`
  $statusDisplay.style.display = 'block'
  $enemyPictureDisplay.style.display = 'block'
  }
}

// 객체의 깊은복사를 위한 함수
function copyObject (object ,obj) {
  for (let i in obj) {
    object[i] = obj[i]
  }
  return object
}


// 적 상태창 업데이트
const enemyImg = new Image() //새 이미지 변수
$enemyPictureDisplay.append(enemyImg) // 이미지를 적 이미지 안에 추가해줌

function updateEnemy () {
  $enemyName.textContent = nowEnemy.name
  $enemyLv.textContent = nowEnemy.lv
  $enemyMaxHp.textContent = nowEnemy.maxHp
  $enemyHp.textContent = nowEnemy.hp
  $enemyAtk.textContent = nowEnemy.atk
  $enemyDef.textContent = nowEnemy.def
  enemyImg.src = nowEnemy.img
  // $enemyXp.textContent = nowEnemy.xp
}


let myTurn = true;

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
const $deadBox = document.querySelector('.dead-box')
function charactorDaed () {
  if (newCharactor.hp <= 0) {
    newCharactor.maxHp -= 5
    $maxHp.textContent -= 5
    newCharactor.xp = 0
    $xp.textContent = 0
    $textBox.textContent = `당신은 ${nowEnemy.name}에게 죽었습니다...`
    myTurn = false;
    $deadBox.style.display = "block"
    //이제 마을 귀환밖에 못하게
  }
}

function finishBattle () { //전투가 끝났을 때
  nowEnemy = {} // 빈 객체로 만들어주자!
  myTurn = true //죽었다면 다시 내 턴으로 만들어서 이후 공격이 가능하게끔.
  $statusDisplay.style.display = 'none' // 적 상태창이 안보이게 변경. 따로 textContent 지정 안해도 되서 편함
  $enemyPictureDisplay.style.display ='none' //w적 이미지도 안보이게
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

    if (runProbability >= 2) { // 70% 확률로 도망
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
