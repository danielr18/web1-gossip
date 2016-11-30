const gossiperRoleBtn = document.querySelector('#gossiper-role-btn');
const adminRoleBtn = document.querySelector('#admin-role-btn');
const aliasInput = document.querySelector('#alias-input');
const loginBtn = document.querySelector('#login-btn');

function toggleActive(btn_on, btn_off) {
  btn_on.classList.toggle('active', true);
  btn_off.classList.toggle('active', false);
}

function validateLoginForm() {
  if(aliasInput.value.length > 0) {
    loginBtn.classList.toggle('is-disabled', false);
  }
  else {
    loginBtn.classList.toggle('is-disabled', true);
  }
}

function login() {
  const user = {
    name: aliasInput.value,
    admin: adminRoleBtn.classList.contains('active'), //Not the best way, I know...
  }
  localStorage.user = JSON.stringify(user);
  location.href =  user.admin ? '/admin' : '/home';
}

gossiperRoleBtn.onclick = () => toggleActive(gossiperRoleBtn, adminRoleBtn);
adminRoleBtn.onclick = () => toggleActive(adminRoleBtn, gossiperRoleBtn);
aliasInput.onkeyup = validateLoginForm;
loginBtn.onclick = login;
