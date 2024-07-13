const togglePassword = document.querySelector('#show_hide_password');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', () => {
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);

  togglePassword.classList.toggle('bi-eye');
});
