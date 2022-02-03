const role = document.querySelector('.form-check');

role.addEventListener('click', (event) => {
  const roleCheck = document.querySelector('#grandSonOfMa');
  if (event.target.value === 'grandma') {
    roleCheck.style = 'display: block;';
  } else {
    roleCheck.style = 'display: none;';
  }
});
