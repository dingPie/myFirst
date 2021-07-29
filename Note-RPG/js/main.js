'use strict'

import {Charactor, ConsumeItem, Weapan, Monster} from './class.js'

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


// //캐릭터 클래스 (있던자리)

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
const newCharactor = new Charactor (createName, 1, 20, 5, 5, 5, 3, 1, 15, 0)

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





//아이템 함수들.
const $itemBox = document.querySelector('.all-item-box')
const inventroyList = []

//소비아이템 함수

const $consume = document.getElementsByClassName('consume')
// comsume을 클래스 값으로 배열처럼 만들기에, 겟 클래스로

// 임시 아이템 리스트. 맵 형식으로 구현
let consumeItemList = new Map([ //맵 형식으로 구현
  ['초소형 포션', new ConsumeItem ('초소형 포션', 'potion', 10, '../img/consume/potion1.png')],
  ['소형 포션', new ConsumeItem ('소형 포션', 'potion', 25, '../img/consume/potion1.png')],
  ['짱돌', new ConsumeItem ('짱돌', 'throw', 2, '../img/consume/stone.png')],
  ['투척용 단검', new ConsumeItem ('투척용 단검', 'throw', 5, '../img/consume/throwing_dagger.png')]  
])

// let cousumeItemCode = 0
// let count = 0
// //아이템 획득시
// function getItemComsume (targetItem) {
//   if ($itemBox.childElementCount > 20) {
//     $textBox.textContent = '인벤토리가 가득 찼습니다.'
//     return
//   }
 
//   let _div = document.createElement("div")
//   _div.className = 'consume item' // 이렇게 하면 클래스 두개추가 가능.
//   _div.textContent = targetItem //아이템이름 (name)

//   let _span = document.createElement("span")
//   _span.className = cousumeItemCode
//   let $span = $itemBox.getElementsByClassName(cousumeItemCode-1)
//   //중복값 제거함수
//   if (inventroyList.includes(consumeItemList.get(targetItem))) { //이미 인벤에 같은 데이터가 있다면
//     count += 1
//     $span[0].textContent = count
//     console.log(inventroyList)
//     //아이템 숫자 늘려주는 함수
//   } else {
//     _div.appendChild(_span)
//     $itemBox.append(_div)
//     count = 1
//     console.log(cousumeItemCode)
//     cousumeItemCode += 1
//   }
//   if (consumeItemList.get(targetItem).name == targetItem) { //get으로 map에서 검색가능
//     inventroyList.push(consumeItemList.get(targetItem)) //데이터리스트에 push
//     $consume[$consume.length-1].addEventListener('click', useConsumeItem) //아이템이 추가될때마다, event달아주기
    
//     const itemImg = new Image()//이미지 추가부분
//     itemImg.src = consumeItemList.get(targetItem).img
//     _div.append(itemImg)
//   }
// }


let cousumeItemCode = 0
let count = 0
//아이템 획득시
function getItemComsume (targetItem) {
  if ($itemBox.childElementCount > 20) {
    $textBox.textContent = '인벤토리가 가득 찼습니다.'
    return
  }
  let _div = document.createElement("div")
  _div.className = 'consume item' // 이렇게 하면 클래스 두개추가 가능.
  // _div.textContent = targetItem //아이템이름 (name)
  $itemBox.append(_div)

  if (consumeItemList.get(targetItem).name == targetItem) { //get으로 map에서 검색가능
    inventroyList.push(consumeItemList.get(targetItem)) //데이터리스트에 push
    $consume[$consume.length-1].addEventListener('click', useConsumeItem) //아이템이 추가될때마다, event달아주기
    
    const itemImg = new Image()//이미지 추가부분
    itemImg.src = consumeItemList.get(targetItem).img
    _div.append(itemImg)
  }

  let nameText = document.createTextNode(targetItem)
  _div.appendChild(nameText)
}

// fillter나 반복문을 통해 해당 값이 몇 개 있는지 확인 가능.
//count 로 세어서 화면 span에 표시?




// 아이템 타입판별, 효과 사용
function effectConsumeItem (targetName) {
    if (consumeItemList.get(targetName).name == targetName) { //사용 아이템의 이름과 아이템 리스트의 이름이 같다면,
      let item = consumeItemList.get(targetName)
      switch (item.type) { //스위치문으로 타입 체크
        case 'potion': //타입이 potion이면 밸류만큼 회복
        
        if (newCharactor.hp + item.value < newCharactor.maxHp){
          $hp.textContent = parseInt(newCharactor.hp) + parseInt(item.value)
          newCharactor.hp += item.value
          console.log(newCharactor.hp)
        } else {
          $hp.textContent = parseInt(newCharactor.maxHp)
          newCharactor.hp = newCharactor.maxHp
          console.log(newCharactor.hp)
        }

        $textBox.textContent = `${item.name}을 사용했다. 체력을 ${item.value}만큼 회복했다.`
        break;

        case 'throw': // 타입이 throw면 밸류만큼 데미지
        //실제로 데이터로 회복시켜주는거 해야됨  
          $textBox.textContent = `${item.name}을 던졌다. 적에게 ${item.value}의 피해를 입혔다.`
          break;
      }
    } else {
      console.log('아이템이 없습니당.')
    }
}


//아이템 사용시 효과 사용 및 제거 등 총괄
function useConsumeItem () {
  let target = this.textContent // _div가 정의되어있지 않아서 this로 해줌
  let itemData = consumeItemList.get(target)
  inventroyList.pop(itemData) //사용한 데이터를 제거,
  this.remove() //화면에서 제거.

  effectConsumeItem(itemData.name) //효과발동
  // console.log(itemData.name)
  console.log(inventroyList)
}


const $h3 = document.querySelector('h3'); //이건 나중에 없앨것
//매크로. h3이 있을때만 작동
if($h3 != undefined){ // $h3가 있으면 (페이지에 정의된 값이 있으면)
  $h3.addEventListener('click', () => {
    return getItemComsume ('초소형 포션')
  })
}


//장비아이템

const $weapan = document.getElementsByClassName('weapan')
const $weapanBox = document.querySelector('.weapan-box')
let nowWeapan = ''


let weapanList = new Map([ //맵 형식으로 구현
  ['각목', new Weapan ('각목', 1, 2, 1, '../img/weapon/stick.png')],
  ['짧은 단검', new Weapan ('짧은 단검', 1, 3, 0, '../img/weapon/shot_dagger.png')],
  ['낡은 검', new Weapan ('낡은 검', 3, 5, 0, '../img/weapon/old_sword.png')]
])


//d아이템 획득함수
function getItemWeapan (targetItem) { // 무기 아이템 획득시
  if ($itemBox.childElementCount < 20) {
    let _div = document.createElement("div") //화면에 추가해주는 부분
    _div.className = 'weapan item' // 이렇게 하면 클래스 두개추가 가능.
    _div.textContent = targetItem
    //이미지 추가도 필요.
    $itemBox.append(_div)

    if (weapanList.get(targetItem).name == targetItem) { //get으로 map에서 검색, 같은 품목을 찾아서
      inventroyList.push(weapanList.get(targetItem))       //데이터리스트에 push
      $weapan[$weapan.length-1].addEventListener('click', uesWeapanItem)

      const itemImg = new Image() //이미지 추가부분
      itemImg.src = weapanList.get(targetItem).img
      _div.append(itemImg)
    }
  } else {
    $textBox.textContent = '인벤토리가 가득찼습니다.'
  }
}


const weaponImg = new Image() //이미지 추가부분
$weapanBox.append(weaponImg) //왜 이렇게 지정해주면 괜찮을까?


//무기 바뀌는거 테스트용
nowWeapan = weapanList.get('짧은 단검')
newCharactor.atk += nowWeapan.atk
$atk.textContent = newCharactor.atk
weaponImg.src = nowWeapan.img


//무기 장착효과 적용 함수
function equiptWeapan (targetName) {
  if (nowWeapan != '') { //현재 무기가 장착되어 있으면
    getItemWeapan (nowWeapan.name)
    newCharactor.atk -= nowWeapan.atk //공격력, 방어력 빼줘서 초기화.
    newCharactor.def -= nowWeapan.def //
    nowWeapan = '' //현재 무기 없애줌
  } 
  nowWeapan = weapanList.get(targetName)
  newCharactor.atk += nowWeapan.atk //데이터 및 화면의 공격력 수치 적용.
  $atk.textContent = newCharactor.atk
  newCharactor.def += nowWeapan.def
  $def.textContent = newCharactor.def
  weaponImg.src = nowWeapan.img
}


// 무기아이템 사용함수
function uesWeapanItem () { //아이템 사용시
  let target = this.textContent //해당 아이템 textcontent에서 데이터가져옴
  let itemData = weapanList.get(target)
  console.log(itemData)

  if (newCharactor.lv >= itemData.lv) { //내 레벨이 무기 레벨 이상일때만
    equiptWeapan(target) //아이템 착용함수 실행
    inventroyList.pop(itemData) //사용한 데이터를 제거
    this.remove() //그리고 삭제

  } else { //레벨이 낮을땐 아무일도 일어나지 않는다.
    $textBox.textContent = '레벨이 너무 낮습니다.'
  }
}


const $h6 = document.querySelector('h6')
$h6.addEventListener('click', () => {
  return getItemWeapan ('각목')
})


// 해야될 것들
// 소비아이템 중복시, 인벤토리에는 갯수만 늘려주는 형식으로 추가.(셋 함수 적용?)
// 아이템이름이 아래로 가도록 혹은 보이지 않도록, 호버시 보이게. 이렇게 할경우 이름을 넣는 칸이 따로 필요
//방어구도 추가해주자




//dropItem으로 함수를 모으고, 거기에 메서드로 추가해야되나?
//아니네? 확률로 뽑아서 하면 되네 걍. 0~100까지 중에 나오는 함수로.
//대신 인수를 받아서, 그 아이템을 가질 수 있게. 이름, 이미지추가, 사용했을때 효과발생.

const forestMonster = [  
  {M : new Monster ('큰 쥐', 1, 8, 8, 3, 1, 3, '../img/monster/big_mouse.png')},
  {M : new Monster ('슬라임', 2, 10, 10, 3, 2, 3, '../img/monster/slime.png')},
  {M : new Monster ('들개', 4, 15, 15, 5, 2, 5, '../img/monster/dog.png')}
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


// 객체의 깊은복사를 위한 함수
function copyObject (object ,obj) {
  for (let i in obj) {
    object[i] = obj[i]
  }
  return object
}


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


