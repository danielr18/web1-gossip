var user = localStorage.user && JSON.parse(localStorage.user);

const userRoutes = [
  /^\/home$/,
  /^\/user\/[a-zA-Z0-9_]+$/,
  /^\/search$/,
];

const adminRoutes = [
  /^\/admin$/,
  /^\/logs$/,
];

if (user) {
  if (user.admin) {
    if (![...userRoutes, ...adminRoutes].some((route) => route.test(location.pathname))) {
      location.href = '/admin';
    }
  } else {
    if (![...userRoutes].some((route) => route.test(location.pathname))) {
      location.href = '/home';
    }
  }
} else {
  if (location.pathname != '/login') location.href = '/login';
}
