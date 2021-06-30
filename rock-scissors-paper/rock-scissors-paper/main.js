'use strict'

// 쿼리 지정함수
const $computer = document.querySelector('.computer');
const $rock = document.querySelector('.rock');
const $scissors = document.querySelector('.scissors');
const $paper = document.querySelector('.paper');
const $coin = document.querySelector('.coin');




const couputerImage = new Image(); //이미지 생성
$computer.append(couputerImage) //이미지를 추가해준다


window.onload = () => { //로딩시 효과음 일단 시작
	intro.play()
}
//효과음 트랙들
const intro = new Audio('audio/intro.mp3');
const win = new Audio('audio/win.mp3');
const lose = new Audio('audio/lose.mp3');
const draw = new Audio('audio/draw.mp3');


let currentImg = 'rock' //초기 설정값은 바위 
function rollingImage () {
	switch (currentImg) {

		case 'rock': //바위 상태면
			couputerImage.src = 'image/scissors.png'; //가위 이미지와 값을 넣어줌
			currentImg = 'scissors';
			break;

		case 'scissors': //가위 상태면
			couputerImage.src = 'image/paper.png'; //보 이미지와 값을 넣어줌
			currentImg = 'paper'; 
			break;

		case 'paper': //보 상태면
			couputerImage.src = 'image/rock.png' // 다시 바위 이미지와 상태를 넣어줌
			currentImg = 'rock';
			break;
	}
}

let intervalId = setInterval(rollingImage, 75); //일정한 시간으로 값 반복. 0.075초에 한번씩 롤링 이미지 함수를 실행해줌.
//계속해서 상태가 변하기 때문에 다음 묵 -> 찌 -> 빠 -> 묵... 계속 실행

function winMethod() {
	$coin.textContent = parseInt($coin.textContent) + parseInt(Math.floor(Math.random()*6)*100 + 100)
	// 100원 ~ 700원 사이의 코인을 추가
	win.play(); //이기는 소리 출력
}
function drawMethod() {
	draw.play(); //비기는 효과음
	$coin.textContent =  parseInt($coin.textContent) + 200 //돈 다시 돌려줌
}

let clickable = true; //클릭 가능한 상태, 기본값 true

const clickBtn = () => { //버튼을 눌렀을때 기본값 

	clearInterval(intervalId); // 돌아가는걸 없애줌
	clickable = false //그리고 클릭 가능한 값을 false 로 만들어서 클릭이 불가능하게 변환

	setTimeout(() => { //그리고 돌아가는걸 1.5초 이후, 딜레이 시켜서 시작시켜줌
		intervalId = setInterval(rollingImage, 75)
		clickable = true; //다시 1.5초 이후 클릭 가능하게 변환
		intro.play();
		$coin.textContent = $coin.textContent - 200
	}, 1500)
}


$rock.addEventListener('click', () => { //바위 눌렀을때 함수
	if (clickable) { //클릭 가능한 상태면,
		clickBtn() //클릭 이벤트 실행 (아니면 1.5초간 실행이 불가능하다.)
	if (currentImg === 'scissors') { //상대가 가위일때
		winMethod()
	} else if ( currentImg === 'paper') { //상대가 보일때
		lose.play(); //이기는 효과음 출력
	} else {
		drawMethod()
	}
}
})

$scissors.addEventListener('click', () => {
	if (clickable) {
		clickBtn()
	if (currentImg === 'paper') {
		winMethod()
	} else if ( currentImg === 'rock') {
		lose.play();
	} else {
		drawMethod()
	}
}
})

$paper.addEventListener('click', () => {
	if (clickable) {
		clickBtn()
	if (currentImg === 'rock') {
		winMethod()
	} else if ( currentImg === 'scissors') {
		lose.play();
	} else {
		drawMethod()
	}
}
})