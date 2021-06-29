'use strict'

//querySelector
const $result = document.querySelector('.result');
const $bonus = document.querySelector('.bonus');
const $plus = document.querySelector('.plus');
const $btn = document.querySelector('.btn');
const $audio = document.querySelector('audio')

$audio.volume = 0.1; //오디오 볼륨조절


const candidate = Array(45).fill().map((arr, index) => index + 1); // 1~45 배열 생성
const shuffle = []; // 무작위로 변환할 빈 배열 생성

while (candidate.length > 0) { //while문: candidate가 없을때까지 반복
    const random = Math.floor(Math.random() * candidate.length); // 1~candidate 길이까지 수 중에, 정수로 값 뽑기. 추후 candidate가 줄어드므로 undefined값이 나오지 않는다.
    const spliceArray = candidate.splice(random, 1); //spliceArray에 random으로 뽑은 값 하나를 선택,
    const value = spliceArray[0] //이걸 value 라는 값으로 반환
    shuffle.push(value) // shuffle 배열에 넣는다
} //이걸 candidate가 다 소진될때까지 반복한다. 


const resultBall = shuffle.splice(0, 6).sort((a, b) => a - b) // 이걸 splice로 6개 뽑고, sort로 오름차순으로 정렬한다
const bonusBall = shuffle.splice(0, 1); // 얘를 따로하는 이유는 7개를 정렬해버리면 보너스값은 무조건 큰 값이 되므로

function colorize (ball, $target) {
    ball.style.color = 'white';
    switch (true) {
        case (10>$target):
        ball.style.backgroundColor = 'orange';
        break;
        case (20>$target):
        ball.style.backgroundColor = 'skyblue';
        break;
        case (30>$target):
        ball.style.backgroundColor = 'coral';
        break;
        case (40>$target):
        ball.style.backgroundColor = 'darkgray';
        break;
        default:
        ball.style.backgroundColor = 'lightgreen';
    } 
} //색상 매개변수: ball은 여기선 지정되지않은? createBall 변수를 받기위해 지정,
//$target은 메인과 보너스를 나누기위해

 
function showBall (location, $target) {
     //location은 결과를 넣을 위치. result와 bonus , $target은 결과를 넣을 함수 리스트. resulteBall이냐 bonusBall이냐
    const createBall = document.createElement('span') //스팬을 생성
    createBall.className = 'ball'; //span의 클래스명은 ball로 지정
    createBall.textContent = $target; // 볼 내부 글자는 target. 즉 resultBall의 각 인덱스들을 넣어준다
    colorize(createBall, $target) // 색깔지정함수 호출
    location.appendChild(createBall) // resulte or bonus 위치에 생성하고, 값 넣어주고, 색칠한 공을 추가
    
    let audio = new Audio ('sound.mp3');
    audio.play() //효과음 추가와 볼륨조정
    audio.volume = 0.3; 
}


let count = 0; // 0일때만 실행 가능한 카운트
function lotto() {

if (count === 0) { // 재실행 못하게 방지
    for (let i = 0; i < 6; i++) { //반복문 형태로 뽑기는 진행, 6개를 뽑으니 6번 반복
    setTimeout(()=> {
        showBall ($result, resultBall[i]) //매개변수로 result 지정
        }, (i+1) * 1000) //시간초는 각 1초, 2초, 3초...6초까지 점차 하나씩 나오게 설정
    }
    setTimeout(()=> {
        $plus.style.visibility = 'visible' //숨겨둔 '+'가 보이게
        showBall ($bonus, bonusBall[0]) //보너스에 하나있는거 추가
        }, 7000) //마지막인 7초 뒤
    }
count = 1 //카운트를 넣어서 재실행 못하게 방지
}

$btn.addEventListener('click', lotto);