'use strict'
// 데이터 선택자
const $dataTitle = document.getElementById('dataTitle').innerText.split(',')
const $dataFirstImage = document.getElementById('dataFirstImage').innerText.split(',')
const $dataAddr = document.getElementById('dataAddr').innerText.split(',')
const $dataMapX = document.getElementById('dataMapX').innerText.split(',')
const $dataMapY = document.getElementById('dataMapY').innerText.split(',')
const $dataDetail = document.getElementById('dataDetail').innerText.split(',')
const $dataCategory = document.getElementById('dataCategory').innerText.split(',')
const $dataArea1 = document.querySelector('#dataArea1').innerText.split(',')


// 리스트용 탬플릿, positions에 추가해서 메인페이지에 추가할 에정
let positions = []
for (let i = 0; i < $dataTitle.length; i++) {
    let value =
        {
        content:
        `<a href="/map/detail?id=${$dataDetail[i]}">` +
         `   <div class="list_box">` +
        `       <div class="img_box">` +
        `           <img src = ${$dataFirstImage[i]}>` +
        `       </div>` +
        `       <div class="info_box">` +
        `           <div class="title">${$dataTitle[i]}</div>` +
        `           <div class="addr_box">${$dataAddr[i]}</div>` +
        `       </div>`+
        `       <div class="category" id="${$dataCategory[i].trim()}">${$dataCategory[i]}</div>` +
        `       <div class='area1' style='display: none;'>${$dataArea1[i]}</div>` +
        `   </div>` +
        `</a>`,
        }
    positions.push(value)
    console.log(`${$dataCategory[i]}`)
}


//리스트 박스에 추가
const $mainBox = document.querySelector('.main_box')
for (let i = 0; i < positions.length -1; i++) {
    let _div = document.createElement('div')
    // let content = document.createTextNode(positions[i].content)
    _div.innerHTML = positions[i].content
    // console.log(positions[i].content)
    $mainBox.appendChild(_div)
//    console.log(positions[i])
}


const $selectCategory = document.querySelector('.select_category') //카테고리 고르는 select
const $listBox = document.getElementsByClassName('list_box') //list 탬플릿
const $category = document.getElementsByClassName('category') //list 탬플릿 내에, category가 들어가는 부분
const $sortBtn = document.querySelector('.sort_btn') // 정렬버튼


const $selectArea1 = document.querySelector('.select_area1') // 지역 고르는 select
const $area1 = document.getElementsByClassName('area1') // list 탬플릿 내에, area1이 들어가는 부분


function sortCategory () {
    let catValue = $selectCategory.value //카테고리 고른 값을 가져옴
    //기본적으로 다시 display를 반복문으로 표시해줌
    for (let i = 0; i < $mainBox.childElementCount; i++) {
        console.log($listBox[i])
         $listBox[i].style.display = "flex";
    //    console.log($mainBox.childElementCount)
    }
    if (catValue == '전체') {
        sortArea(catValue)
        return //전체면 그대로 끝.
    }
    for (let i = 0; i < $mainBox.childElementCount; i++) { //
        if (catValue == $category[i].textContent.trim()) { // 카테고리 선택값 == 각 카테고리값(공백제거)
        continue; // display를 제거하지 않음.
        }
        $listBox[i].style.display = "none"; // 해당 카테고리가 아닌 값들은 display를 none으로 해줌
    }
    sortArea(catValue)
}


function sortArea(catValue) {
    let areValue = $selectArea1.value
    console.log(areValue)
    if (areValue == '전체') {
        return //전체면 그대로 끝.
    }
    for (let i = 0; i < $mainBox.childElementCount; i++) {
        $listBox[i].style.display = "none";
        if (catValue != '전체') { //카테고리가 전체가 아닐때에는 전체가 아닌 상황에서만.
                // 해당 카테고리가 아닌 값들은 display를 none으로 해줌
            switch (areValue) { // 카테고리 선택값 == 각 카테고리값(공백제거) == $area1[i].textContent.trim()
                case '1':
                    if (catValue == $category[i].textContent.trim() && //위치를 받아오는 조건문이 하나 더 들어간다
                        ($area1[i].textContent.trim() == '서울특별시' ||
                        $area1[i].textContent.trim() == '경기도')) {
                        $listBox[i].style.display = "flex";
                        }
                    break;
                case '2':
                    if (catValue == $category[i].textContent.trim() && //위치를 받아오는 조건문이 하나 더 들어간다
                        ($area1[i].textContent.trim() == '부산광역시'||
                        $area1[i].textContent.trim() == '울산광역시' ||
                        $area1[i].textContent.trim() == '대구광역시' ||
                        $area1[i].textContent.trim() == '경상남도'   ||
                        $area1[i].textContent.trim() == '경상북도')) {
                        $listBox[i].style.display = "flex";
                    }
                    break;
                case '3':
                    if (catValue == $category[i].textContent.trim() && //위치를 받아오는 조건문이 하나 더 들어간다
                        ($area1[i].textContent.trim() == '대전광역시'||
                        $area1[i].textContent.trim() == '세종특별자치시'   ||
                        $area1[i].textContent.trim() == '충청남도'   ||
                        $area1[i].textContent.trim() == '충청북도')) {
                        $listBox[i].style.display = "flex";
                    }
                    break;
                case '4':
                    if (catValue == $category[i].textContent.trim() && //위치를 받아오는 조건문이 하나 더 들어간다
                        ($area1[i].textContent.trim() == '광주광역시'||
                        $area1[i].textContent.trim() == '전라남도'   ||
                        $area1[i].textContent.trim() == '전라북도')) {
                        $listBox[i].style.display = "flex";
                    }
                    break;
                case '5':
                    if (catValue == $category[i].textContent.trim() && //위치를 받아오는 조건문이 하나 더 들어간다
                        $area1[i].textContent.trim() == '강원도') {
                        $listBox[i].style.display = "flex";
                    }
                    break;
                case '6':
                    if (catValue == $category[i].textContent.trim() && //위치를 받아오는 조건문이 하나 더 들어간다
                        $area1[i].textContent.trim() == '제주특별자치도') {
                        $listBox[i].style.display = "flex";
                    }
                    break;
            }
        } else { //전체일때는 전체 상황에서만
            switch (areValue) { // 카테고리 선택값 == 각 카테고리값(공백제거) == $area1[i].textContent.trim()
                case '1':
                    if (($area1[i].textContent.trim() == '서울특별시' ||
                        $area1[i].textContent.trim() == '경기도')) {
                        $listBox[i].style.display = "flex";
                        }
                    break;
                case '2':
                    if (($area1[i].textContent.trim() == '부산광역시'||
                        $area1[i].textContent.trim() == '울산광역시' ||
                        $area1[i].textContent.trim() == '대구광역시' ||
                        $area1[i].textContent.trim() == '경상남도'   ||
                        $area1[i].textContent.trim() == '경상북도')) {
                        $listBox[i].style.display = "flex";
                        }
                        break;
                case '3':
                    if ( ($area1[i].textContent.trim() == '대전광역시'||
                        $area1[i].textContent.trim() == '세종특별자치시'   ||
                        $area1[i].textContent.trim() == '충청남도'   ||
                        $area1[i].textContent.trim() == '충청북도')) {
                        $listBox[i].style.display = "flex";
                    }
                    break;
                case '4':
                    if (($area1[i].textContent.trim() == '광주광역시'||
                        $area1[i].textContent.trim() == '전라남도'   ||
                        $area1[i].textContent.trim() == '전라북도')) {
                        $listBox[i].style.display = "flex";
                    }
                    break;
                case '5':
                    if ($area1[i].textContent.trim() == '강원도') {
                        $listBox[i].style.display = "flex";
                    }
                    break;
                case '6':
                    if ($area1[i].textContent.trim() == '제주특별자치도') {
                        $listBox[i].style.display = "flex";
                    }
                    break;
            }
    }
    }
}

$sortBtn.addEventListener('click', sortCategory) // 정렬함수 추가