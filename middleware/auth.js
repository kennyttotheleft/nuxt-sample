export default function ({ store, route, redirect, error }) {
    if (!store.getters.isAuthenticated && route.name !== 'login') {
      redirect('/login')
    }
    if (store.getters.isAuthenticated && route.name === 'login') {
      redirect('/')
    }
  }
