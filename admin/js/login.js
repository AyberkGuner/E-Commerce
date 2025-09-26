let uyeler = JSON.parse(localStorage.getItem('uyeler')) || []

const register = () => {
    let id = Date.now()
    let isim = document.getElementById('register-isim').value
    let eposta = document.getElementById('register-eposta').value
    let sifre = document.getElementById('register-sifre').value

    let uye = {
        id: id,
        isim: isim,
        eposta: eposta,
        sifre: sifre
    }

    uyeler.push(uye)
    localStorage.setItem('uyeler', JSON.stringify(uyeler))
}

const login = () => {
    let eposta = document.getElementById('login-email').value
    let sifre = document.getElementById('login-sifre').value

    let index = uyeler.findIndex(data => data.eposta == eposta && data.sifre == sifre)

    if(index != -1){
        localStorage.setItem('isLogin', 1)
        window.location.href = 'panel.html'
    }else{
        alert('giriş başarısız!!!!!')
    }
    
}