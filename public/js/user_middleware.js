let user;

user = localStorage.user && JSON.parse(localStorage.user);

if (user) {
  if (user.admin) {
    if(location.pathname != '/admin') location.href = '/admin';
  }
  else {
    if(location.pathname != '/home') location.href = '/home';
  }
}
else {
  if(location.pathname != '/login') location.href = '/login';
}
