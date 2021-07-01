'use strict'

// query selector
const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');
const $top5 = document.querySelector('#top5')

//시간 기록용 변수
let startTime;
let endTime
let timeoutId;
let average;
const records = [];

$screen.addEventListener ('click', (event) => {
	if ( event.target.classList.contains('waiting')) {
		$screen.classList.replace('waiting', 'ready')
		$screen.textContent = '초록화면에서 클릭하세요!'

    timeoutId = setTimeout(() => {
			$screen.classList.replace('ready', 'now')
			$screen.textContent = '지금 클릭하세요 !'
			startTime = new Date();
		}, Math.floor(Math.random()*3000 + 500))
	} else if ( event.target.classList.contains('ready')) {
		alert(`너무 일찍 클릭했습니다!`)
		$screen.classList.replace('ready', 'waiting')
		$screen.textContent = '클릭해서 시작하세요'
		clearTimeout(timeoutId);
	} else if ( event.target.classList.contains('now')) {
		endTime = new Date();
		records.push(endTime - startTime)
		average = records.reduce((a, c) => a + c) / records.length
		$result.textContent = `현재:${endTime - startTime}ms 평균: ${average}ms`
		$screen.classList.replace('now', 'waiting')
		$screen.textContent = '클릭해서 시작하세요'

    let topRecords = records.sort((a, b) => a - b);
    if (records.length > 5) {
      topRecords.pop()
    }
    $top5.textContent = topRecords
	}
})