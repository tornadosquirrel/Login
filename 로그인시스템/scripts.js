document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login-btn');
  const signupButton = document.getElementById('signup-btn');

  function showError(element, message) {
    element.textContent = message;
    element.classList.add('visible');
    setTimeout(() => {
      element.classList.remove('visible');
    }, 3000); // 3초 후에 메시지 숨김
  }

  function saveUser(id, pw) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[id] = pw;
    localStorage.setItem('users', JSON.stringify(users));
  }

  function getUser(id) {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[id];
  }

  if (loginButton) {
    loginButton.addEventListener('click', function() {
      const id = document.getElementById('login-id').value;
      const pw = document.getElementById('login-pw').value;
      const loginError = document.getElementById('login-error');
      // 로그인 로직 추가
      if (id === '' || pw === '') {
        showError(loginError, '아이디와 비밀번호를 입력해주세요.');
      } else if (!getUser(id) || getUser(id) !== pw) {
        showError(loginError, '아이디 또는 비밀번호가 잘못되었습니다.');
      } else {
        loginError.textContent = '';
        console.log('로그인 성공:', id);
        // 로그인 성공 시 로그인 성공 페이지로 이동
        window.location.href = '../로그인성공/index.html';
      }
    });
  }

  if (signupButton) {
    signupButton.addEventListener('click', function() {
      const id = document.getElementById('signup-id').value;
      const pw = document.getElementById('signup-pw').value;
      const pwConfirm = document.getElementById('signup-pw-confirm').value;
      const signupError = document.getElementById('signup-error');
      // 회원가입 로직 추가
      if (id === '' || pw === '' || pwConfirm === '') {
        showError(signupError, '모든 필드를 입력해주세요.');
      } else if (id.length < 5 || pw.length < 8) {
        showError(signupError, '아이디는 최소 5자, 비밀번호는 최소 8자 이상이어야 합니다.');
      } else if (pw !== pwConfirm) {
        showError(signupError, '비밀번호가 일치하지 않습니다.');
      } else if (getUser(id)) {
        showError(signupError, '이미 존재하는 아이디입니다.');
      } else {
        saveUser(id, pw); // 사용자 정보 저장
        signupError.textContent = '';
        console.log('회원가입 성공:', id);
        alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        window.location.href = '../로그인/index.html';
      }
    });
  }
});
