'use strict'

// HTML 지정 태그들
const $input = document.querySelector('.input-text');
const $btn = document.querySelector('.btn');
const $goal = document.querySelector('.goal');
const $h1 = document.querySelector('h1');
const $ul = document.querySelector('ul');
const $counter = document.querySelector('.counter')
const $manual = document.querySelector('.manual');



// 정답 난수 생성기
function setGoal () {

	let goal = ''; //스트링 형태로 추가하기 위해
	for ( let i = 0; i <4; i++) {

		let goalNum = Math.floor(Math.random() * 9) + 1;
		if (!goal.includes(goalNum)) { // 이미 뽑은 값을 포함하고 있지 않다면 더함
			goal += goalNum
		} else { //포함한 경우에는 i를 - 해서 4자리 나올때 까지 반복
			i--
		}
	}
	let resultGoal = parseInt(goal)
	$goal.textContent = resultGoal //근데이건 빠져나오네
	return resultGoal; // 숫자 형태로 리턴
} // 리턴값이 밖으로 안빠져나오는데 왤까

let count = 0; // 함수에 필요한 count / strike / ball 변수지정
let strike;
let ball;

function checkValue () {
	ball = 0;
	strike = 0;
	count++
	$counter.textContent = ` ${10 - count}`
	if ($input.value.length !== 4) {
		return alert (`4자리 수를 입력해주세요`)
	}
	if ($input.value === $goal.textContent) { // resultGoal이 undefined가 뜨네요;
		alert('홈런!')
		$goal.style.visibility = "visible";
		return
	}
	if(count > 10) { // 10번까지만 허용, 그 이후 탈락
		alert(`패배! 정답은 ${$goal.textContent} 입니다`)
		$counter.textContent = '';
	}
	for (let i = 0; i < 4; i++) {
		if( $input.value[i] === $goal.textContent[i]) {
		strike++
		}
		if ($goal.textContent.includes($input.value[i])) {
		ball++
		}
	}
		if (ball === 0) {
		const createLi = document.createElement('li'); // li tag 생성
		let textOut = document.createTextNode(`${$input.value}: OUT!`); // 출력할 글자생성
		createLi.appendChild(textOut);  //생성한 li에 출력할 글자를 넣어준다
		$ul.appendChild(createLi); //그걸 ul 아래 넣어서 리스트 형태로 만들어준다
		return // 아웃이면 여기서 출력하고 끝
		}

	ball = ball - strike //볼은 포함값 전부 (스트라이크 포함)까지 되있기 때문에, 스트라이크만큼 빼준다
	const createLi = document.createElement('li'); // li tag 생성
	let textResult = document.createTextNode(`${$input.value}: ${ball}B ${strike}S`); // 출력할 글자생성
	createLi.append(textResult); //생성한 li에 출력할 글자를 넣어준다
	$ul.appendChild(createLi); //그걸 ul 아래 넣어서 리스트 형태로 만들어준다
	$input.value = '';
}

setGoal (); //난수생성기 실행
$btn.addEventListener('click', checkValue)
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		checkValue()
	}
})
$manual.addEventListener('click', alertManual)


function alertManual () {
	alert(`1. 본 게임은 10번의 기회 안에 1~9 사이의 서로 다른 4자리의 숫자를 맞추는 게임입니다.`)
	alert(`2. 정답을 입력했을 때 4자리의 숫자가 하나도 일치하지 않는다면 OUT`)
	alert(`3. 숫자는 일치하나 자릿수가 다르다면 Ball(B),`)
	alert(`4. 숫자와 자릿수가 모두 일치하면 Strike(S)로 표시됩니다.`)
	alert(`5. 4자릿수가 아닌 숫자를 입력하거나, 중복되는 숫자를 입력해도 횟수가 차감되니 주의하세요.`)
	alert(`6. 게임이 끝났다면, 새로고침으로 재시작이 가능합니다.`)
}
