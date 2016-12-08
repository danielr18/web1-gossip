const homeTab = document.querySelector('#home-tab');
const searchTab = document.querySelector('#search-tab');
const userTab = document.querySelector('#user-tab');
const logo = document.querySelector('#brand-title');
const logoutBtn = document.querySelector('#logout-btn');
const userName = document.querySelector('#user-name');
var user = localStorage.user && JSON.parse(localStorage.user);

if (user.admin) {
  const tabs = document.querySelector('#nav-tabs');
  const logsTab = document.createElement('a');
  logsTab.className = 'nav-item is-tab';
  logsTab.id = 'logs-tab';
  logsTab.onclick = onLogsTabClick;
  const i = document.createElement('i');
  i.className = 'fa fa-file-o';
  const span = document.createElement('span');
  span.textContent = '\xa0 Logs';
  logsTab.appendChild(i);
  logsTab.appendChild(span);
  tabs.appendChild(logsTab);
}

function onLogoClick() {
    if(user.admin) {
      location.href = '/admin';
    }
    else {
      location.href = '/home';
    }
}

function onLogsTabClick() {
  location.href = '/logs';
}

function onHomeTabClick() {
  if(user.admin) {
    location.href = '/admin';
  }
  else {
    location.href = '/home';
  }
}

function onSearchTabClick() {
  location.href = '/search';
}

function onUserTabClick() {
  location.href = `/user/${user.name}`;
}

function logout() {
  localStorage.removeItem('user');
  location.href = '/login';
}

logoutBtn.onclick = logout;
homeTab.onclick = onHomeTabClick;
searchTab.onclick = onSearchTabClick;
userTab.onclick = onUserTabClick;
logo.onclick = onLogoClick;

userName.textContent = user.name;
