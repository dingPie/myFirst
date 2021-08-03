'use strict'

import {Character, ConsumeItem, Weapan, Monster} from './class.js'

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
  if (newCharacter.xp >= newCharacter.lv*15) {
    newCharacter.xp -= newCharacter.lv*15;
    newCharacter.lv += 1
    newCharacter.maxHp += 5
    newCharacter.hp += 5
    newCharacter.maxSp += 2
    newCharacter.sp += 2
    newCharacter.atk += 1
    newCharacter.def += 0.5
    newCharacter.maxXp = newCharacter.lv*15;
    updateStatus ()
    $textBox.textContent = `레벨 업! ${newCharacter.name}의 레벨은 ${newCharacter.lv}입니다`
    console.log(`레벨업!`)
  }
}

//레벨업, 경험치상승에 따른 스테이터스 업데이트
function updateStatus () { 
  $nickName.textContent = createName;
  $level.textContent = newCharacter.lv;
  $maxHp.textContent = newCharacter.maxHp;
  $hp.textContent = newCharacter.hp;
  $maxSp.textContent = newCharacter.maxSp;
  $sp.textContent = newCharacter.sp;
  $atk.textContent = newCharacter.atk;
  $def.textContent = Math.floor(newCharacter.def); //임시. 정수형태로 표현
  $maxXp.textContent = newCharacter.maxXp;
  $xp.textContent = newCharacter.xp;
  $maxXp.textContent = newCharacter.lv *15
}




// let createName = ''
let createName; 
if (localStorage.getItem('json') == null) { //데이터 파일이 없다면( get으로 가져오는 값이 비었다면)
  createName = prompt('캐릭터 이름을 입력하세요', '') //이름입력 (캐릭터 생성)
} else { // (데이터가 있다면,  JSON에서 parse해온 값에 name 값을 가져와서 createName에 넣어줌)
  createName = JSON.parse(localStorage.getItem('json')).name
}


// 닉네임과 스텟 초기값 세팅
let newCharacter = new Character (createName, 1, 20, 15, 5, 5, 3, 1, 15, 0)
let jsonCharacter;
let jsonItemList


function saveData() { //데이터 저장함수. 추후 액션마다 넣어줄것
  jsonCharacter = JSON.stringify(newCharacter) //캐릭터를 스트링화
  localStorage.setItem('json', jsonCharacter) //스트링화 된걸 localstorage에 저장
  console.log(jsonCharacter) 

  jsonItemList = JSON.stringify(inventoryList)
  console.log('저장용',jsonItemList)
  localStorage.setItem('jsonItemList', jsonItemList)
}


function loadData() {
  newCharacter = JSON.parse(localStorage.getItem('json'))
  updateStatus ()

  let inventoryItems = JSON.parse(localStorage.getItem('jsonItemList'))
  console.log(inventoryItems)



  for (let i in inventoryItems) {
    if (consumeItemList.get(inventoryItems[i].name)) {
      getItemConsume(inventoryItems[i].name)
    } else {
      getItemWeapan(inventoryItems[i].name)
    }
    //로드 부분에서 겟 아이템 제대로 작동하는지 확인
  }
  console.log('불러오기용',inventoryList)
}


// console.log(consumeItemList.get('짱돌') instanceof ConsumeItem)
// prototype 형태를 검사하는 instanceof 구문. 좀 더 공부할것
//세이브는 되는데...


// 어떻게 조건을 달아야 할까...

const $h4 = document.querySelector('h4')
$h4.addEventListener('click', saveData)
// window.setInterval(loadData, 1000)


updateStatus(); //시작시 한번 업데이트 하고 시작
$textBox.textContent = `${createName} 이(가) 생성되었습니다`
// 레벨업 매크로. 매크로시 레벨업확인 (함수) 및 스테이터스 업데이트가 이루어짐
const $h2 = document.querySelector('h2')
$h2.addEventListener('click', () => {
  newCharacter.xp = newCharacter.xp + 10
  console.log (`경험치상승`)
  levelUp()
  updateStatus ()
})


//아이템 함수들.
const $itemBox = document.querySelector('.all-item-box')
const inventoryList = []

//소비아이템 함수

const $consume = document.getElementsByClassName('consume')
// Consume을 클래스 값으로 배열처럼 만들기에, 겟 클래스로

// 임시 아이템 리스트. 맵 형식으로 구현
let consumeItemList = new Map([ //맵 형식으로 구현
  ['초소형 포션', new ConsumeItem ('초소형 포션', 'potion', 10, '../img/consume/potion1.png', 'potion1')],
  ['소형 포션', new ConsumeItem ('소형 포션', 'potion', 25, '../img/consume/potion1.png', 'potion2')],
  ['짱돌', new ConsumeItem ('짱돌', 'throw', 2, '../img/consume/stone.png', 'throw1')],
  ['투척용 단검', new ConsumeItem ('투척용 단검', 'throw', 5, '../img/consume/throwing_dagger.png', 'throw2')]  
])

let count = 1
let $span = '' //밖에 적용되어 있어야 각각 아이템에 추가가 가능하다

//아이템 획득시
function getItemConsume (targetItem) {
  if ($itemBox.childElementCount > 20) {
    $textBox.textContent = '인벤토리가 가득 찼습니다.'
    return
  }
    let itemData = consumeItemList.get(targetItem)
    let _div = document.createElement("div")
    _div.className = 'consume item' // 이렇게 하면 클래스 두개추가 가능.
    //이미지 추가부분
    const itemImg = new Image()
    itemImg.src = itemData.img
    _div.append(itemImg)
    //텍스트 추가부분
    let nameText = document.createTextNode(targetItem)
    _div.appendChild(nameText)
    //스팬 추가부분
    let _span = document.createElement("span") 
    _span.id = itemData.itemCode //스팬의 아이디는 data의 itemcode로 지정해줌
    $span = document.getElementById(itemData.itemCode) // 위에 만들어준 아이템 코드를 반환

   // 똑같은 아이템이 있을때, 겹쳐줌
  if (inventoryList.includes(itemData)) { //이미 인벤에 같은 데이터가 있다면
    let count = inventoryList.filter(element => itemData == element).length + 1  //데이터를 아래 넣으니, 위에에선 1을 추가 한 값으로 해줌
    $span.textContent = count // 해당 itemcode의 반환 값에 텍스트 콘텐츠를 추가
    console.log(inventoryList)
  } else { // 처음 아이템이 들어온다면.
    _div.appendChild(_span) // 만들어진 _div에 만든 _span추가
    $itemBox.append(_div) // 처음에만 인벤토리에 추가해줌 
    $consume[$consume.length-1].addEventListener('click', () => {
      return useConsumeItem(_div, itemData)
    }) //새로 추가된 함수에 소비아이템 사용함수 달아줌. 인자로 받는 값들은 여기서 만들어진 _div와 데이터로, 추후 아이템 사용시 사용됨
  }

  if (itemData.name == targetItem) { //get으로 map에서 검색가능
    inventoryList.push(itemData) //데이터리스트에 push
  }
}


// 아이템 타입판별, 효과 사용
function effectConsumeItem (targetName) {
    if (consumeItemList.get(targetName).name == targetName) { //사용 아이템의 이름과 아이템 리스트의 이름이 같다면,
      let item = consumeItemList.get(targetName)
      switch (item.type) { //스위치문으로 타입 체크
        case 'potion': //타입이 potion이면 밸류만큼 회복
        
        if (newCharacter.hp + item.value < newCharacter.maxHp){
          $hp.textContent = parseInt(newCharacter.hp) + parseInt(item.value)
          newCharacter.hp += item.value
          console.log(newCharacter.hp)
        } else {
          $hp.textContent = parseInt(newCharacter.maxHp)
          newCharacter.hp = newCharacter.maxHp
          console.log(newCharacter.hp)
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
function useConsumeItem (div, itemData) {
  // let target = this.textContent // _div가 정의되어있지 않아서 this로 해줌
  // let itemData = consumeItemList.get(target)
  let $span = div.querySelector("#"+itemData.itemCode)
  inventoryList.splice(inventoryList.indexOf(itemData), 1) //사용한 데이터를 제거,
  count = inventoryList.filter(element => itemData == element).length
  if (count > 0 ) {
    $span.textContent = count
  }
   else {
     div.remove() //화면에서 제거.
  }
  effectConsumeItem(itemData.name) //효과발동
  // console.log(itemData.name)
  console.log(inventoryList)
}


const $h3 = document.querySelector('h3'); //이건 나중에 없앨것
//매크로. h3이 있을때만 작동
if($h3 != undefined){ // $h3가 있으면 (페이지에 정의된 값이 있으면)
  $h3.addEventListener('click', () => {
    return getItemConsume ('초소형 포션')
  })
}

const $h5 = document.querySelector('h5')
if ($h5 != undefined) {
$h5.addEventListener('click', () => {
  return getItemConsume ('짱돌')
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
  if ($itemBox.childElementCount > 20) {
    $textBox.textContent = '인벤토리가 가득 찼습니다.'
    return
  }
  let itemData = weapanList.get(targetItem)
  let _div = document.createElement("div")
  _div.className = 'weapan item'
  console.log(itemData.name, targetItem)
  if (itemData.name == targetItem) { //get으로 map에서 검색, 같은 품목을 찾아서
    inventoryList.push(itemData)   //데이터리스트에 push
     //이미지 추가부분
    const itemImg = new Image()
    itemImg.src = itemData.img
    _div.append(itemImg)
    //텍스트 추가부분
    let nameText = document.createTextNode(targetItem)
    _div.appendChild(nameText)
  }
  $itemBox.append(_div) //아이템창에 추가
  $weapan[$weapan.length-1].addEventListener('click', uesWeapanItem)
}


const weaponImg = new Image() //이미지 추가부분
$weapanBox.append(weaponImg) //왜 이렇게 지정해주면 괜찮을까?


//무기 바뀌는거 테스트용
nowWeapan = weapanList.get('짧은 단검')
newCharacter.atk += nowWeapan.atk
$atk.textContent = newCharacter.atk
weaponImg.src = nowWeapan.img


//무기 장착효과 적용 함수
function equiptWeapan (targetName) {
  if (nowWeapan != '') { //현재 무기가 장착되어 있으면
    getItemWeapan (nowWeapan.name)
    newCharacter.atk -= nowWeapan.atk //공격력, 방어력 빼줘서 초기화.
    newCharacter.def -= nowWeapan.def //
    nowWeapan = '' //현재 무기 없애줌
  } 
  nowWeapan = weapanList.get(targetName)
  newCharacter.atk += nowWeapan.atk //데이터 및 화면의 공격력 수치 적용.
  $atk.textContent = newCharacter.atk
  newCharacter.def += nowWeapan.def
  $def.textContent = newCharacter.def
  weaponImg.src = nowWeapan.img
}


// 무기아이템 사용함수
function uesWeapanItem () { //아이템 사용시
  let target = this.textContent //해당 아이템 textcontent에서 데이터가져옴
  let itemData = weapanList.get(target)
  console.log(itemData)

  if (newCharacter.lv >= itemData.lv) { //내 레벨이 무기 레벨 이상일때만
    equiptWeapan(target) //아이템 착용함수 실행
    inventoryList.pop(itemData) //사용한 데이터를 제거
    this.remove() //그리고 삭제

  } else { //레벨이 낮을땐 아무일도 일어나지 않는다.
    $textBox.textContent = '레벨이 너무 낮습니다.'
  }
}


const $h6 = document.querySelector('h6')
$h6.addEventListener('click', () => {
  return getItemWeapan ('각목')
})




if (localStorage.getItem('json') != null) {
  loadData()
}







// 해야될 것들
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
const $CharacterPicture = document.querySelector('.picture-box')
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
  CharacterDaed ()
}


//죽었는지 확인 & 적의 턴
function checkDead$EnemyAttack (character, enemy) {

  if (enemy.hp <= 0) { //적의 체력이 0 이하라면 텍스트컨텐츠를 없애줌
    $textBox.textContent = `${nowEnemy.name}를 처치했다 ! ${nowEnemy.xp}의 경험치 획득!`
    newCharacter.xp += parseInt(nowEnemy.xp)
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
function CharacterDaed () {
  if (newCharacter.hp <= 0) {
    newCharacter.maxHp -= 5
    $maxHp.textContent -= 5
    newCharacter.xp = 0
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
function runBattle (enemy, Character) {
  if (Character.lv > enemy.lv) { //내 레벨이 적보다 높으면 100% 도망
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
        enemyAttack (enemy, Character)
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
  return attack (newCharacter, nowEnemy)
})
$runBtn.addEventListener('click', () => {
  return runBattle (nowEnemy, newCharacter)
})
$actionBtn.addEventListener('click', () => {
  return showMonster(forestMonster)
})


