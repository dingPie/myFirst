'use strict'

//선택자 함수들
const $problems = document.querySelector('.problems')
const $answer = document.querySelector('.answer')
const $submit = document.querySelector('.submit')
const $problemList = document.querySelector('.problem-list')
const $remain = document.querySelector('.remain')
const $right = document.querySelector('.right')


//문제뽑기
let answer;
let num1
let num2 //변수들을 미리 지정해줘서, 리턴 값들을 사용할 수 있게

const problemsIndex = Math.floor(Math.random()*4) //덧셈, 뺄셈, 곱셈, 나눗셈

function pickProblem () {
  const problemsIndex = Math.floor(Math.random()*4) // 0~3까지의 숫자뽑음

  if (problemsIndex == 0) { // 0이면 덧셈
    num1 = Math.floor(Math.random()*9000) + 1000
    num2 = Math.floor(Math.random()*9000) + 1000
    $problems.textContent = `${num1} + ${num2}`
    answer = num1 + num2
    return answer
    
  } else if (problemsIndex == 1) { // 1이면 뺄셈
    num1 = Math.floor(Math.random()*9000) + 1000 //중복이 많지만, 난이도 조절을 위해 일단은 그냥
    num2 = Math.floor(Math.random()*9000) + 1000
    while (num1 <= num2 ) { //답이 음수가 안나오도록 하는 조건문
    num1 = Math.floor(Math.random()*9000) + 1000
    num2 = Math.floor(Math.random()*9000) + 1000
    }
    $problems.textContent = `${num1} - ${num2}`
    answer = num1 - num2
    return answer

  } else if (problemsIndex == 2) { // 2면 곱셈
    num1 = Math.floor(Math.random()*900) + 100
    num2 = Math.floor(Math.random()*200) + 50
    $problems.textContent = `${num1} x ${num2}`
    answer = num1 * num2
    return answer

  } else { // 3 (나머지) 는 나눗셈
    num1 = Math.floor(Math.random()*9000) + 1000
    num2 = Math.floor(Math.random()*9000) + 1000
    while (num1 % num2 != 0){ // 나눠서 정수가 나오는 값으로 만들어주는 while 반복문
    num1 = Math.floor(Math.random()*900) + 100
    num2 = Math.floor(Math.random()*37) + 7
    }
    $problems.textContent = `${num1} ÷ ${num2}`
    answer = num1 / num2
    return answer
  }
}
pickProblem () //처음 1회 실행

// 이벤트리스너
$submit.addEventListener('click', checkanswer)
$answer.addEventListener('keydown', (e) => { //얘는 밸류에서 엔터 눌러야 가능
  if (e.key === 'Enter') {
    checkanswer()
  }
})

//정답체크 함수
function checkanswer () {
  if ($remain.textContent > 0) { // 남은 문제가 0 이상이여야 함수 실행
  $remain.textContent-- //남은문제 1 줄여주고
  } 
  else { //만약 남은 문제가 0이라면
   $submit.removeEventListener('click', checkanswer)
   $answer.removeEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkanswer() //이거 엔터시 알럿창만 계속뜨는데 왜 버그일까
    }}) 
  alert(`종료! 총 점수는 ${$right.textContent*5} 점입니다!`) // 결과안내
  return //리턴함수로 끝내줘야 아래 함수가 실행 안됨
  }
  if ($answer.value == answer) {  //정답시
    addListRigth () // 정답시 리스트 추가함수 실행
    $answer.value = ''
    $right.textContent++ // 맞은 갯수 추가
  } else if ($answer.value != answer) { //오답시
    $answer.value = ''
    addListWrong () // 오답시 리스트 추가함수 실행
  }
  pickProblem () //문제뽑기함수 다시실행, 정답 이후에 실행해야 제대로 실행됨
}


//리스트 추가함수
function addListWrong () { //틀렸을 때
  const _li = document.createElement('li')
  _li.append(`X ${$problems.textContent}`)
  _li.style.color = 'red'; //빨간색
  $problemList.appendChild(_li)
}
function addListRigth () { //맞았을 때
  const _li = document.createElement('li')
  _li.append(`O ${$problems.textContent}`)
  _li.style.color = 'green'; //초록색 이것만 다르다
  $problemList.appendChild(_li)
}