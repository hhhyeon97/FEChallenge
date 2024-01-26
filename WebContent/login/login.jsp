<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>login</title>
<style>
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
.notosanskr * { 
 font-family: 'Noto Sans KR', sans-serif;
}
@font-face {
	font-family: 'JalnanGothic';
	src:
		url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff')
		format('woff');
	font-weight: normal;
	font-style: normal;
}

body {
	/*font-family: 'JalnanGothic';
	margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh; /* 100% 높이 설정 
	background-color: #ecf0f3; /* 배경색 추가 
*/
}

section {
	text-align: center; /* 텍스트를 가운데 정렬 */
	width: 50%;
	background-color: #fff; /* 섹션 배경색 추가 */
	padding: 20px;
	border-radius: 15px; /* 섹션 테두리 둥글게 만들기 */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
	margin: 50px auto 0; /* 수평 가운데 정렬 및 위쪽 여백 추가 */
	position:relative;
	top: 80px;
}

h2 {
	letter-spacing: 4px;
	color: #a2bde8;
}

#login-container {
	display: flex;
	flex-direction: column; /* 수직으로 나열하기 위해 컬럼 방향으로 설정 */
	align-items: center; /* 수직 정렬 */
}

#login-container input {
	width: 180px;
	height: 30px;
	margin: 15px 0; /* 각 인풋 박스 사이의 간격 조절 */
	border-radius: 5px;
	border: 2px solid #a2bde8; /* 테두리 색상 변경 */
	background-color: rgba(255, 255, 255, 0.7); /* 배경색 및 투명도 추가 */
	padding: 8px; /* 내부 여백 추가 */
}
input:focus {
    outline-color: lightgray;
}

::placeholder {
    color: lightgray;
}

#loginBtn {
	font-family: 'Noto Sans KR', sans-serif;
	padding: 10px;
	width: 100px;
	background-color: #fff;
	border: 2px solid #a2bde8;
	border-radius: 4px;
	cursor: pointer;
	margin-top: 15px; /* 버튼과 인풋 박스 간격 조절 */
	font-size: 17px;
	color : #a2bde8;
	transition: background-color 0.3s ease; /* 부드러운 배경색 전환을 위한 트랜지션 추가 */
}

button:focus {
	outline-color : lightgray;
}

#loginBtn:hover {
	background-color: #dae4f5; /* 마우스 호버 시 배경색 변경 */
	color: white;
	font-weight: bold;
}
</style>
<body>
<jsp:include page="../navbar/navbar.jsp" />
<section>
<h2>LOGIN</h2>
<div id="login-container">
<input id="id" type="text" placeholder="아이디">
<input id="password" type="password" placeholder="비밀번호">
</div>
<button id="loginBtn" onclick="check()">로그인</button>
</section>
<script>

function check() {
// 임의의 아이디와 비밀번호를 지정합니다.
var correctId = "test";
var correctPassword = "1234";

// 입력된 아이디와 비밀번호를 가져옵니다.
var enteredId = document.getElementById("id").value;
var enteredPassword = document.getElementById("password").value;

// 입력값이 공백인 경우 경고창을 띄우고 해당 입력란으로 포커스 이동
if (enteredId.trim() === "") {
    alert("아이디를 입력하세요.");
    document.getElementById("id").focus();
    return;
}

if (enteredPassword.trim() === "") {
    alert("비밀번호를 입력하세요.");
    document.getElementById("password").focus();
    return;
}

// 입력된 아이디와 비밀번호가 정확한지 확인합니다.
if (enteredId === correctId && enteredPassword === correctPassword) {
    alert("로그인 성공!");
    // 로그인 성공 시 이동할 페이지로 리다이렉션
    window.location.href = "../navbar/navbar.html";
} else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
 // 아이디와 비밀번호 입력란을 초기화하고 아이디 입력란으로 포커스 이동
    document.getElementById("id").value = "";
    document.getElementById("password").value = "";
    document.getElementById("id").focus();
}
}
</script>

</body>
</html>