/**
 *  cal.js   이건 날짜 클릭하면 바로 메모 프롬프트 띄우게 작동
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


        // 사용자에게 입력 받기
        var userMemo = prompt('메모를 입력하세요 !', storedMemo);

      // 입력이 있을 경우 로컬 스토리지에 저장
	if (userMemo !== null && userMemo.trim() !== '') {
    localStorage.setItem(dateString, userMemo);
    // 여기에서 메모를 어딘가에 표시하거나 처리할 수 있음
    alert('메모가 저장되었습니다.');
     // 원 모양으로 표시
    cell.classList.add('memo-date');
		} else if (userMemo === '') {
    //alert('메모를 입력하세요.');
		}
        
    });
        
});
    
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
 