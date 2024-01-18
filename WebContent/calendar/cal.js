/**
 *  cal.js
 */

//현재 년도 및 월 변수 추가
var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth();

// 클릭된 날짜를 저장하는 변수
var selectedDate = null;


//달력을 생성하고 표시하는 함수
function generateCalendar() {
    // 달력의 헤더 생성
    var headerHTML = `<h2 style="color:#fff; text-align:center; position:relative; bottom: 55px;">${currentYear}년 ${currentMonth + 1}월</h2>`;

    // 달력 영역에 헤더 추가
    var headerContainer = document.createElement("div");
    headerContainer.classList.add("header");
    headerContainer.innerHTML = headerHTML;

    // wrapper에 헤더 추가
    var wrapper = document.querySelector(".header");
    wrapper.innerHTML = ''; // 헤더를 지우고 다시 추가
    wrapper.appendChild(headerContainer);
    
    // 달력의 본문 생성
    var calendarHTML = '<table>';
    // 요일 표시
    calendarHTML += '<tr>';
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    for (let day of daysOfWeek) {
        calendarHTML += `<th>${day}</th>`;
    }
    calendarHTML += '</tr>';

    // 각 주와 날짜 표시
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) { // 최대 6주 (일주일이 6주일 경우도 있음)
        calendarHTML += '<tr>';

        for (let j = 0; j < 7; j++) { // 7일 (요일)
            let cellStyle = ''; // 셀에 적용할 스타일 초기화

            if (i === 0 && j < firstDayOfMonth) {
                // 첫 주의 시작일 이전은 빈 셀로 채움
                calendarHTML += '<td></td>';
            } else if (dayCounter > totalDaysInMonth) {
                // 마지막 날 이후는 빈 셀로 채움
                calendarHTML += '<td></td>';
            } else {
                // 유효한 날짜일 경우 날짜 표시
                if (j === 0) {
                    // 일요일은 빨간색
                    cellStyle = 'color: red;';
                } else if (j === 6) {
                    // 토요일은 파란색
                    cellStyle = 'color: blue;';
                }
                calendarHTML += `<td style="${cellStyle}">${dayCounter}</td>`;
                dayCounter++;
            }
        }

        calendarHTML += '</tr>';

        // 모든 날짜를 표시한 경우 종료
        if (dayCounter > totalDaysInMonth) {
            break;
        }
    }

    calendarHTML += '</table>';
    // 생성된 달력을 달력 컨테이너에 추가
    var calendarContainer = document.getElementById("calendar");
    calendarContainer.innerHTML = calendarHTML;
    
    
// 클릭 가능한 날짜에 이벤트 추가 및 호버 포인터 기능 추가
var dateCells = document.querySelectorAll('#calendar table td[style=""]');
dateCells.forEach(function (cell) {
    cell.addEventListener('mouseover', function () {
        cell.style.cursor = 'pointer';
        // 여기에 호버 시 추가적인 스타일이나 동작을 추가할 수 있습니다.
        // 예를 들어, 특정 배경색이나 테두리를 변경하는 등의 작업을 수행할 수 있습니다.
    });

    cell.addEventListener('mouseout', function () {
        // 호버가 끝날 때의 동작을 추가할 수 있습니다.
        // 예를 들어, 이전의 스타일로 복원하는 등의 작업을 수행할 수 있습니다.
    });

    cell.addEventListener('click', function () {
        
         // 클릭한 날짜에 대한 메모 작성 창 띄우기
        var date = new Date(currentYear, currentMonth, parseInt(cell.innerText));
        var dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환

        // 이전에 저장된 메모 불러오기
        var storedMemo = localStorage.getItem(dateString) || '';

        // 원 모양으로 표시
        cell.classList.add('memo-date');

        // 사용자에게 입력 받기
        var userMemo = prompt('메모를 입력하세요 !', storedMemo);

        // 입력이 있을 경우 로컬 스토리지에 저장
        if (userMemo !== null) {
            localStorage.setItem(dateString, userMemo);
            // 여기에서 메모를 어딘가에 표시하거나 처리할 수 있음
            alert('메모가 저장되었습니다.');
        }
        
        // 메모 확인 및 수정, 삭제 기능 추가
        if (localStorage.getItem(dateString)) {
            showMemoOptions(dateString, cell);
        }
        
    });
        
});
    
}


// 메모 확인, 수정, 삭제 기능
function showMemoOptions(dateString, cell) {
    var storedMemo = localStorage.getItem(dateString);

    var memoModal = document.getElementById('memoModal');
    var memoInput = document.getElementById('memoInput');
    var saveMemoButton = document.getElementById('saveMemo');
    var closeMemoButton = document.querySelector('.close');

    // 메모 모달 창에 저장된 메모 불러오기
    memoInput.value = storedMemo;

    // 메모 모달 창 띄우기
    memoModal.style.display = 'block';

    // 저장 버튼 클릭 시
    saveMemoButton.onclick = function () {
        var updatedMemo = memoInput.value;
        localStorage.setItem(dateString, updatedMemo);
        alert('메모가 업데이트되었습니다.');
        memoModal.style.display = 'none';
        cell.classList.add('memo-date');
    };

    // 모달 창 닫기 버튼 클릭 시
    closeMemoButton.onclick = function () {
        memoModal.style.display = 'none';
    };
}




// 페이지 로드 시 현재 월에 해당하는 달력 표시
window.onload = function () {
    generateCalendar();
    // 현재 날짜에 스타일 추가
    highlightCurrentDate();
    
    // 좌우 화살표 아이콘에 클릭 이벤트 추가
    var prevMonthIcon = document.querySelector('.bxs-chevron-left');
    var nextMonthIcon = document.querySelector('.bxs-chevron-right');

    prevMonthIcon.addEventListener('click', function () {
        changeMonth(-1); // 이전 월로 이동
    });

    nextMonthIcon.addEventListener('click', function () {
        changeMonth(1); // 다음 월로 이동
    });
    
  
  
};


function openMemoPopup(dateString) {
    const memoPopup = document.getElementById('memo-popup');
    const memoText = document.getElementById('memo-text');
    
    memoText.value = localStorage.getItem(dateString) || '';
    
    memoPopup.style.display = 'block';
}


function closeMemoPopup() {
    const memoPopup = document.getElementById('memo-popup');
    memoPopup.style.display = 'none';
}

function saveMemo() {
    const memoPopup = document.getElementById('memo-popup');
    const memoText = document.getElementById('memo-text');
    const dateString = selectedDate; // 여기서 selectedDate는 어떻게 설정되는지에 따라 수정이 필요합니다.

    // 선택한 날짜에 대한 메모를 저장
    localStorage.setItem(dateString, memoText.value);

    // 메모 팝업을 닫고, 달력을 다시 렌더링
    closeMemoPopup();
    generateCalendar(); // 여기서 generateCalendar 함수가 달력을 다시 그리도록 해야 합니다.
}



// 이전 월 또는 다음 월로 이동하는 함수
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
    highlightCurrentDate();
}

//현재 날짜에 스타일 추가하는 함수
function highlightCurrentDate() {
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonthInFunction = currentDate.getMonth(); // 현재 달을 가져옴
    var currentYearInFunction = currentDate.getFullYear(); // 현재 년도를 가져옴

    // 현재 날짜의 셀을 찾아 스타일을 추가합니다.
    var calendarCells = document.querySelectorAll('td');
    calendarCells.forEach(function (cell) {
        var cellDay = parseInt(cell.innerText); // 셀에 표시된 날짜를 정수로 변환
        var isCurrentMonth = currentMonthInFunction === currentMonth; // 현재 달인지 확인
        var isCurrentYear = currentYearInFunction === currentYear; // 현재 년도인지 확인

        if (isCurrentYear && isCurrentMonth && cellDay === currentDay) {
            cell.style.color = 'white'; 
            cell.style.borderRadius = '10px';
            cell.style.backgroundColor = '#ccc1db';
        } else {
            cell.style.color = ''; 
            cell.style.borderRadius = '';
            cell.style.backgroundColor = '';
        }
    });
}
 