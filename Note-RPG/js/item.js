import {Character, Monster} from './class.js'

// 소비아이템 부분
export { $itemBox, inventoryList, $consume, itemCount, $span, consumeItemList, getItemConsume, effectConsumeItem, useConsumeItem, }

// 임시
export { battleDropItems,dropItem, addItems}

// 장비(무기)아이템 부분
export { $weapan, $weapanBox, nowWeapan, weapanList, weaponImg,
     getItemWeapan,  equiptWeapan, uesWeapanItem, }



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
  

const $itemBox = document.querySelector('.all-item-box')
const inventoryList = []

//소비아이템 함수

const $consume = document.getElementsByClassName('consume')
let itemCount = 1
let $span = '' //밖에 적용되어 있어야 각각 아이템에 추가가 가능하다
// Consume을 클래스 값으로 배열처럼 만들기에, 겟 클래스로

// 임시 아이템 리스트. 맵 형식으로 구현
let consumeItemList = new Map([ //맵 형식으로 구현
  ['초소형 포션', new ConsumeItem ('초소형 포션', 'potion', 10, '../img/consume/potion1.png', 'potion1')],
  ['소형 포션', new ConsumeItem ('소형 포션', 'potion', 25, '../img/consume/potion1.png', 'potion2')],
  ['짱돌', new ConsumeItem ('짱돌', 'throw', 2, '../img/consume/stone.png', 'throw1')],
  ['투척용 단검', new ConsumeItem ('투척용 단검', 'throw', 5, '../img/consume/throwing_dagger.png', 'throw2')]  
])


//소비아이템 획득시
function getItemConsume (targetItem) {
  if ($itemBox.childElementCount > 20) { //인벤이 20칸 이상이라면 아이템 획득 실패.
    $textBox.textContent = '인벤토리가 가득 찼습니다.'
    return
  }
    let itemData = consumeItemList.get(targetItem) //아이템 이름으로 아이템 정보를 가져옴
    let _div = document.createElement("div")
    _div.className = 'consume item'

    // 이미지 추가부분
    const itemImg = new Image()
    itemImg.src = itemData.img
    _div.append(itemImg)
    // 텍스트 추가부분
    let nameText = document.createTextNode(targetItem)
    _div.appendChild(nameText)
    // 소비아이템 숫자 카운트를 위한 span 추가부분.
    let _span = document.createElement("span") 
    _span.id = itemData.itemCode //스팬의 아이디는 data의 itemcode로 지정해줌
    $span = document.getElementById(itemData.itemCode) // 위에 만들어준 아이템 코드를 반환
    
   // 똑같은 아이템이 있을때, 겹쳐줌
  if (inventoryList.includes(itemData)) { //이미 인벤에 같은 데이터가 있다면
    let count = inventoryList.filter(element => itemData == element).length + 1  //데이터를 아래 넣으니, 위에에선 1을 추가 한 값으로 해줌
    $span.textContent = count // 해당 itemcode의 반환 값에 텍스트 콘텐츠를 추가

  } else { // 처음 아이템이 들어온다면.
    _div.appendChild(_span) // 만들어진 _div에 만든 _span추가
    $itemBox.append(_div) // 처음에만 인벤토리에 추가해줌 
    $consume[$consume.length-1].addEventListener('click', () => {
      return useConsumeItem(_div, itemData)
    }) //새로 추가된 함수에 소비아이템 사용함수 달아줌. 인자로 받는 값들은 여기서 만들어진 _div와 데이터로, 추후 아이템 사용시 사용됨
  }

    inventoryList.push(itemData) //데이터리스트에 push
}


// 아이템 타입판별, 효과 사용
function effectConsumeItem (targetName) {
    if (consumeItemList.get(targetName).name == targetName) { //사용 아이템의 이름과 아이템 리스트의 이름이 같다면,
      let targetItem = consumeItemList.get(targetName)

        switch (targetItem.type) { //스위치문으로 타입 체크
            case 'potion': //타입이 potion이면 밸류만큼 회복
                if (newCharacter.hp + targetItem.value < newCharacter.maxHp){ //아이템 사용했을때 최대체력을 넘지 않을때
                $hp.textContent = parseInt(newCharacter.hp) + parseInt(targetItem.value)
                newCharacter.hp += targetItem.value
                console.log(newCharacter.hp)
                } else { //최대체력을 넘을때
                $hp.textContent = parseInt(newCharacter.maxHp)
                newCharacter.hp = newCharacter.maxHp
                console.log(newCharacter.hp)
                }
                $textBox.textContent = `${targetItem.name}을 사용했다. 체력을 ${targetItem.value}만큼 회복했다.`
                break;

            case 'throw':
                // 타입이 throw면 밸류만큼 데미지 
                $textBox.textContent = `${targetItem.name}을 던졌다. 적에게 ${targetItem.value}의 피해를 입혔다.`
                break;
      }
    } else {
      console.log('아이템이 없습니당.')
    }
}


//아이템 사용시 효과 사용 및 제거 등 총괄
function useConsumeItem (div, itemData) { //만들어진 div와 itemData의 주소를 받아와서, 여기에 처리해줌
  let $span = div.querySelector("#"+itemData.itemCode) // itemCode와 같은 아이템끼리 숫자를 표시해주기 위함.
  inventoryList.splice(inventoryList.indexOf(itemData), 1) //사용한 데이터를 제거,
  itemCount = inventoryList.filter(element => itemData == element).length
  if (itemCount > 0 ) {
    $span.textContent = itemCount //갯수가 0개 이상이면 갯수만큼 표시해줌
  }
   else {
     div.remove() //화면에서 제거. //아예 아이템이 없으면 제거해줌
  }
  effectConsumeItem(itemData.name) //효과발동
}

//전투시 아이템 추가를 위한 함수.
const battleDropItems = [] //전투에서 획득한 아이템리스트를 추가해줌. 
function dropItem (targetItem) {
  battleDropItems.push(targetItem)
  // JOSN으로 해야, 마을에 돌아왔을 때 볼 수 있을듯. 
  console.log(`${targetItem}추가됨`)
  console.log(battleDropItems)
}

//전투에서 추가한 아이템 리스트를 한번에 인벤토리 리스트에 추가해주는 함수.
function addItems () {
for (let i in battleDropItems){
  if (consumeItemList.get(battleDropItems[i])) { //형식이 소비인지, 장비인지
    getItemConsume(battleDropItems[i])
  } else { //형식에 따라 추가해줌
    getItemWeapan(battleDropItems[i])
  }
}
}


//장비아이템 (무기)
const $weapan = document.getElementsByClassName('weapan')
const $weapanBox = document.querySelector('.weapan-box')
let nowWeapan = ''


const weapanList = new Map([ //맵 형식으로 구현
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



//무기 장착효과 적용 함수
function equiptWeapan (targetName, targetChar) {
  if (nowWeapan != '') { //현재 무기가 장착되어 있으면
    getItemWeapan (nowWeapan.name) // 지금 무기를 인벤에 추가해줌.
    targetChar.atk -= nowWeapan.atk 
    targetChar.def -= nowWeapan.def //공격력, 방어력 빼줘서 초기화.
    nowWeapan = '' //현재 무기 없애줌
  } 
    nowWeapan = weapanList.get(targetName)
    // targetChar.atk += nowWeapan.atk //데이터 및 화면의 공격력 수치 적용.
    // $atk.textContent = targetChar.atk
    // targetChar.def += nowWeapan.def
    // $def.textContent = targetChar.def
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

