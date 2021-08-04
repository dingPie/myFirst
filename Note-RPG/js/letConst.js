//선택자 변수
export { $nickName, $level, $maxHp, $hp, $maxSp, $sp, $atk, $def, $maxXp, $xp, $textBox}

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


//배틀 페이지
//선택자 함수
export { $enemyName, $enemyBox, $enemyLv, $enemyMaxHp, $enemyHp, $enemyAtk, $enemyDef, $enemyXp}
export { $charactorPicture, $statusDisplay, $enemyPictureDisplay}

const $enemyName = document.querySelector('.enemy-name')
const $enemyBox = document.querySelector('.enemy-box')
const $enemyLv = document.querySelector('.enemy-lv')
const $enemyMaxHp = document.querySelector('.enemy-maxHp')
const $enemyHp = document.querySelector('.enemy-hp')
const $enemyAtk = document.querySelector('.enemy-atk')
const $enemyDef = document.querySelector('.enemy-def')
const $enemyXp = document.querySelector('.enemy-xp')
const $charactorPicture = document.querySelector('.picture-box')
const $statusDisplay = document.querySelector('.status-display')
const $enemyPictureDisplay = document.querySelector('.picture-display')


// 변수의 묶음과 스코프는 억떢계 되는가