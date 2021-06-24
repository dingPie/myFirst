'use strict'

let numOne = '';
let operator = '';
let numTwo = '';
const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

function onClickNumber (num) {
	return () => { //고차함수 high order function
		//이거 없이 넣으면 ()가 있어서 동작이 아닌 함수의 결과값만을 반환하니까 한번 더
		//함수형태로 만들어서 함수를 리턴하게 해 줌
	if (!operator) {
		numOne += num
		$result.value += num
		return //중첩문 형태를 리턴을 통해 중첩문 안쓰고 만들어줌
	}
	if (!numTwo) {
		$result.value = '';
	}
	numTwo += num
	$result.value += num
}
}

// function onClickNumber (evnet) {
//     if (operator) {
//         numTwo += event.target.textContent
//     } else {
//         numOne += event.target.textContent
//     }
//     $result.value += event.target.textContent
// } // 이렇게 하면, 해당 클릭을 했을때 대상의 textContent를 가져와서 할당해준다.


document.querySelector('#num-0').addEventListener('click', onClickNumber(0));
document.querySelector('#num-1').addEventListener('click', onClickNumber(1));
document.querySelector('#num-2').addEventListener('click', onClickNumber(2));
document.querySelector('#num-3').addEventListener('click', onClickNumber(3));
document.querySelector('#num-4').addEventListener('click', onClickNumber(4));
document.querySelector('#num-5').addEventListener('click', onClickNumber(5));
document.querySelector('#num-6').addEventListener('click', onClickNumber(6));
document.querySelector('#num-7').addEventListener('click', onClickNumber(7));
document.querySelector('#num-8').addEventListener('click', onClickNumber(8));
document.querySelector('#num-9').addEventListener('click', onClickNumber(9));

//수식 입력하기
function onClickOperator (op) {
	return () => {
		if (numOne && !numTwo) {
			operator = op;
			$operator.value = op;
			} else if (numOne && numTwo) {
				onClickCalculate()
				operator = op;
				$operator.value = op;
			} else if (!numOne) {
				operator = '';
			}
	}
	}

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document.querySelector('#minus').addEventListener('click', onClickOperator('-'));
document.querySelector('#divide').addEventListener('click', onClickOperator('/'));
document.querySelector('#multiply').addEventListener('click', onClickOperator('*'));


//클리어 (초기화하기)
function onClickClear () {
	numOne = '';
	numTwo = '';
	operator = '';
	$result.value = '';
	$operator.value = '';
}
document.querySelector('#clear').addEventListener('click', onClickClear);


//계산하기 (=)
function onClickCalculate () {
	if (numTwo) { // 두 수 모두 입력했을때 결과출력
		switch (operator) { 
			case '+':
				$result.value = parseInt(numOne) + parseInt(numTwo);
				saveResult();
				break;
			case '-':
				$result.value = numOne - numTwo;
				saveResult();
				break;
			case '*':
				$result.value = numOne * numTwo;
				saveResult();
				break;
			case '/':
				$result.value = numOne / numTwo;
				saveResult();
				break;
		}
}  else { // 한 수만 입력했을 때는, 첫번째 문자로 결정한다
	switch (operator) {
		case '+':
			$result.value = parseInt(numOne) + parseInt(numOne);
			saveResult();
			break;
		case '-':
			$result.value = numOne - numOne;
			saveResult();
			break;
		case '*':
			$result.value = numOne * numOne;
			saveResult();
			break;
		case '/':
			$result.value = numOne / numOne;
			saveResult();
			break;
	}
}
}

function saveResult () {
	numOne = $result.value; //결과를 numOne에 저장해서 추가계산 가능하게
	numTwo = ''; // numTwo는 입력해야 하니 비워준다
	operator = ''; //식도 비워준다
	$operator.value = ''; // 식 칸도 비워준다
}

document.querySelector('#calculate').addEventListener('click', onClickCalculate);