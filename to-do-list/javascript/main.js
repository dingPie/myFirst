'use strict';

// 월, 일, 요일
function getDays () {
const days = document.querySelector('.days');
const dayTime = new Date ();
const month = dayTime.getMonth()+1;
const date = dayTime.getDate();
const day = dayTime.getDay();
const week = ['SUN', 'MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT'];
const weekday = week[day];
days.innerHTML = 
`${10 > month ? `0${month}`: month}.${10 > date ? `0${date}` : date} ${weekday}`;
}
// 시, 분
function getTime () {
const dayTime = new Date ();
const time = document.querySelector(".time");
const hours = dayTime.getHours();
const minutes = dayTime.getMinutes();
time.innerHTML = 
`${13 > hours ? `AM`:`PM`} ${12 < hours ? `${hours-12}`: hours} 
: ${10 > minutes ? `0${minutes}` 
: minutes}`;
};
// 흐르는 시계 로딩
function clock () {
    getDays ();
    getTime ();
    setInterval(getTime, 1000);
}
clock ();

// 리스트 추가기능
function addList () {
const li = document.createElement('li');
const input = document.querySelector('.add-txt');
const text = document.createTextNode(input.value);
    li.appendChild(text);

    if (input.value === '') {
        alert(`적으세용`);
    } else {
        //텍스트박스의 글자추가
        document.querySelector('.list-box').appendChild(li);
        input.value = '';

        // x버튼을 추가
        const span = document.createElement('span');
        const X = document.createTextNode('x');
        span.className = "x-btn";
        span.appendChild(X);
        li.appendChild(span);

        // x버튼 눌렀을 때 삭제
        span.onclick = function () {
        const listX = this.parentElement;
        listX.style.display = "none";
        }
         // 리스트 클릭시 삭선                       
        li.onclick = function liCheck () {
        if (this.className == 'checked') {
            li.style.textDecoration = "none";
            li.className = "UnChecked";
        } else {
            li.style.textDecoration = "line-through";
            li.className = "checked";
        }};
    }
}
// addEventListener 로 이벤트 추가하기
document.addEventListener ('keydown', (e) => {
    if (e.key === 'Enter') {
        addList();
    }
});

document.querySelector('.txt-btn').addEventListener('click', () => addList() );
