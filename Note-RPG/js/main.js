'use strict'

import {Charactor, ConsumeItem, Monster} from './class.js'

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


// //캐릭터 클래스 (함수 추가예정)
// class Charactor {
//   constructor (name, lv, maxHp, hp, maxSp, sp, atk, def, maxXp, xp) {
//     this.name = createName;
//     this.lv = lv;
//     this.maxHp = maxHp;
//     this.hp = hp;
//     this.maxSp = maxSp;
//     this.sp = sp;
//     this.atk = atk;
//     this.def = def;
//     this.maxXp = maxXp;
//     this.xp = xp;
//   }
//   // equipWeapan (weapan) {
//   //   this.atk += parseInt(weapan.atk)
//   //   $atk.textContent = parseInt(.atk) + parseInt(weapan.atk)
//   // }
// }


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

// const jsonCharactor = JSON.stringify(newCharactor)
// console.log(jsonCharactor)


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


//소비아이템 함수

// class ConsumeItem { //아이템 형식 클래스
//   constructor(name, type, value, itemCode) {
//     this.name = name
//     this.value = value
//     this.type = type
//     this.itemCode = itemCode
//   }
// }


// let consumeItemList =[
//   {I: new ConsumeItem ('초소형 포션', 'potion', 10, 'potion1')},
//   {I: new ConsumeItem ('소형 포션', 'potion', 25, 'potion2')},
//   {I: new ConsumeItem ('짱돌', 'throw', 2, 'throw1')},
//   {I: new ConsumeItem ('투척용 단검', 'throw', 5, 'throw2')}  
// ]

let consumeItemList = new Map([
  ['초소형 포션', new ConsumeItem ('초소형 포션', 'potion', 10, 'potion1')],
  ['소형 포션', new ConsumeItem ('소형 포션', 'potion', 25, 'potion2')],
  ['짱돌', new ConsumeItem ('짱돌', 'throw', 2, 'throw1')],
  ['투척용 단검', new ConsumeItem ('투척용 단검', 'throw', 5, 'throw2')]  
])


const $itemBox = document.querySelector('.all-item-box')
const $h3 = document.querySelector('h3');
const inventroyList = []
const $consume = document.getElementsByClassName('consume')
// comsume을 클래스 값으로 배열처럼 만들어서 


//아이템 획득시
function getItemComsume (targetItem) {
  if ($itemBox.childElementCount < 20) { //중복값을 제거해주려면, set 이용할것
    let _div = document.createElement("div")
    _div.className = 'consume item' // 이렇게 하면 클래스 두개추가 가능.
    _div.textContent = targetItem //아이템이름 (name)
    //이미지도 추가해야됨
    $itemBox.append(_div)

    let itemData; //인벤토리 데이터에 추가해줄 변수
      if (consumeItemList.get('초소형포션') == targetItem) {
        itemData = consumeItemList[i] // itemDate에 찾은 아이템정보를 넣어줌
      }
    inventroyList.push(itemData) //데이터리스트에 push
    console.log(inventroyList) //임시.

    $consume[$consume.length-1].addEventListener('click', useConsumeItem) //아이템이 추가될때마다, event달아주기
  } else {
    $textBox.textContent = '인벤토리가 가득 찼습니다.'
  }
}


// 아이템 타입함수
function effectConsumeItem (targetName) {//같은 이름을 찾을때 까지 반복
    if (consumeItemList.get(targetName).name == targetName) { //사용 아이템의 이름과 아이템 리스트의 이름이 같다면,

      switch (consumeItemList.get(targetName).type) { //스위치문으로 타입 체크
        case 'potion': //타입이 potion이면 밸류만큼 회복
        $textBox.textContent = `${consumeItemList.get('초소형 포션').name}을 사용했다. 체력을 ${consumeItemList.get('초소형 포션').value}만큼 회복했다.`
        //실제로 데이터로 회복시켜주는거 해야됨  
        break;

        case 'throw': // 타입이 throw면 밸류만큼 데미지
          $textBox.textContent = `${consumeItemList.get('초소형 포션').name}을 던졌다. 적에게 ${consumeItemList.get('초소형 포션').value}의 피해를 입혔다.`
          //실제로 데이터로 회복시켜주는거 해야됨  
          break;
      }
    } else {
      console.log('아이템이 없습니당.')
    }
}

function useConsumeItem () {
  let itemData;
    let target = this.textContent // _div가 정의되어있지 않아서 this로 해줌
      itemData = consumeItemList.get(target)
  effectConsumeItem(itemData.name) //효과발동
  inventroyList.pop(itemData) //사용한 데이터를 제거,
  this.remove() //화면에서 제거.

  console.log(itemData.name)
  console.log(inventroyList)

}

if($h3!=undefined){
  $h3.addEventListener('click', () => {
    return getItemComsume ('초소형 포션')
  })
}

//페이지 나누긴 해야겠다. 함수가 고장나니까 뭘 못하네.

//장비아이템 제작중.
const $weapan = document.getElementsByClassName('weapan') 
let nowWeapan = '';
function getItemWeapan () {
  if ($itemBox.childElementCount < 20) {
  let _div = document.createElement("div")
  _div.className = 'weapan item' // 이렇게 하면 클래스 두개추가 가능.
  _div.textContent ='장비(무기)' //원랜 이미지를 추가해야겠지?
  $itemBox.append(_div)
  }
  $weapan[$weapan.length-1].addEventListener('click', uesWeapanItem)
  //아이템을 얻을때마다 새 아이템에 consume class의 이벤트 추가
}

function uesWeapanItem () {
  if (nowWeapan == '') { //무기를 장착하고있지 않으면.
  //  nowWeapan = this... 이 무기를 장비해준다.
  this.remove() //그리고 삭제
  } else {
    // $itemBox.append(nowWeapan) 현재 무기를 인벤에 추가해준다.
    //  nowWeapan = this... 이 무기를 장비해준다.
    this.remove() //그리고 삭제
  }
}


//dropItem으로 함수를 모으고, 거기에 메서드로 추가해야되나?
//아니네? 확률로 뽑아서 하면 되네 걍. 0~100까지 중에 나오는 함수로.
//대신 인수를 받아서, 그 아이템을 가질 수 있게. 이름, 이미지추가, 사용했을때 효과발생.

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


//임시

// 도망 or 사망시 텍스트 컨텐츠 변경
  // $enemyName.textContent = ''
  // $enemyMaxHp.textContent = ''
  // $enemyHp.textContent = ''
  // $enemyAtk.textContent = ''
  // $enemyDef.textContent = ''


// class Weapan {
//   constructor (name, lv, atk, def) {
//     this.name = name;
//     this.lv = lv;
//     this.atk = atk;
//     this.def = def
//   }
// }


// const nowEquipment = {}

// const test = new Weapan ('각목', 1, 2, 0)

// copyObject(nowEquipment, test)
// $atk.textContent = `${newCharactor.atk} + ${nowEquipment.atk}`
// newCharactor.atk = newCharactor.atk + nowEquipment.atk
