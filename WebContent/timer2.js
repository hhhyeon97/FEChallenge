

// 타이머 변수 초기화
var timer;
var hoursInput = document.getElementById("hours");
var minutesInput = document.getElementById("minutes");
var secondsInput = document.getElementById("seconds");
var timerDisplay = document.getElementById("timer");
var timeInputForm = document.getElementById("timeInput");

timerDisplay.style.display="none";


    function validateInput() {
        // 시간 입력이 음수이거나 분 또는 초가 범위를 벗어난 경우 false를 반환
        var hours = parseInt(hoursInput.value);
        var minutes = parseInt(minutesInput.value);
        var seconds = parseInt(secondsInput.value);

        if (hours < 0 || minutes < 0 || seconds < 0 || minutes >= 60 || seconds >= 60) {
            alert("올바른 시간을 입력하세요.");
            resetTimer();  // 리셋 호출 추가
            return false;
        }

        return true;
    }

    function updateDisplay(totalSeconds) {
        // 초를 시, 분, 초로 변환
        var displayHours = Math.floor(totalSeconds / 3600);
        var displayMinutes = Math.floor((totalSeconds % 3600) / 60);
        var displaySeconds = totalSeconds % 60;

        // 시간을 두 자리 숫자로 표시
        displayHours = displayHours < 10 ? "0" + displayHours : displayHours;
        displayMinutes = displayMinutes < 10 ? "0" + displayMinutes : displayMinutes;
        displaySeconds = displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;

        // 타이머 화면에 표시
        timerDisplay.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
    }

    function startTimer() {
        // 입력 유효성 검사
        if (!validateInput()) {
            return;
        }

        // 현재 입력된 시간을 초로 변환
        var totalSeconds = parseInt(hoursInput.value) * 3600 +
                           parseInt(minutesInput.value) * 60 +
                           parseInt(secondsInput.value);


        // 첫 번째 업데이트
        updateDisplay(totalSeconds);

		// 입력 폼 숨기기
        timeInputForm.style.display = "none";
		
		// 타이머 보이기 
		timerDisplay.style.display="block";
		

  		// 버튼 비활성화
        document.getElementById('startBtn').disabled = true;
        

        // 타이머 시작
        timer = setInterval(function () {
            if (totalSeconds <= 0) {
                clearInterval(timer);
                alert("타이머 종료!");
                resetTimer();
            } else {
                // 업데이트
                updateDisplay(totalSeconds);

                // 1초 감소
                totalSeconds--;
            }
        }, 1000);
    }

    function stopTimer() {
        // 타이머 정지
        clearInterval(timer);
       
    }

    function resetTimer() {
        // 타이머 초기화
        clearInterval(timer);
        timerDisplay.innerHTML = "00:00:00";
        hoursInput.value = "0";
        minutesInput.value = "0";
        secondsInput.value = "0";
        // 타이머 숨기기 
        timerDisplay.style.display="none";
        // 입력 폼 보이기
        timeInputForm.style.display = "block";
        // start 버튼 활성화
        document.getElementById('startBtn').disabled = false;
    }
    