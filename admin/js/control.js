let isLogin = localStorage.getItem('isLogin')

if(isLogin != 1){
    window.location.href = 'login.html'
}