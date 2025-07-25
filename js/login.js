  document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorDiv = document.getElementById('error');

      if (username === 'trabajosocial' && password === 'utn2025') {
        window.location.href = 'mantenimiento.html';
      } else {
        errorDiv.style.display = 'block';
      }
    });