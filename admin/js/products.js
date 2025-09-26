let kategoriler = JSON.parse(localStorage.getItem('kategoriler')) || []
let urunler = JSON.parse(localStorage.getItem('urunler')) || []

window.onload = () => {
    categoryList()
    list()
}

const getir = id => document.getElementById(id).value

const localRegister = (value, key) => localStorage.setItem(value, JSON.stringify(key))

const categoryList = () => {
    let alan = document.getElementById('kategori-alan')
    alan.innerHTML = ''

    kategoriler.forEach(element => {
        let option = document.createElement('option')
        option.innerHTML = element.isim
        option.value = element.id

        alan.appendChild(option)

    });
}

const create = () => {
    let urun = {
        id: Date.now(),
        isim: getir('isim'),
        aciklama: getir('aciklama'),
        fotograf: getir('fotograf'),
        fiyat: getir('fiyat'),
        kategori: getir('kategori-alan')
    }

    urunler.push(urun)
    
    localRegister('urunler', urunler)
    document.getElementById('my-form').reset()

    list()
}

const list = () => {
    let alan = document.getElementById('alan')
    alan.innerHTML = ''

    urunler.forEach(element => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td><img src="${element.fotograf}" height="80"></td>
            <td><input id="guncelle-isim-${element.id}" type="text" class="form-control" value="${element.isim}"></td>
            <td><input id="guncelle-aciklama-${element.id}" type="text" class="form-control" value="${element.aciklama}"></td>
            <td><input id="guncelle-fiyat-${element.id}" type="text" class="form-control" value="${element.fiyat}"></td>
            <td>
                <button onclick="update(${element.id})" class="btn btn-success" type="button">Güncelle</button>
                <button onclick="remove(${element.id})" class="btn btn-danger" type="button">Sil</button>
            </td>
        `
        alan.appendChild(tr)
    });
}

const update = (id) => {
    let index = urunler.findIndex(data => data.id == id)

    urunler[index].isim = getir(`guncelle-isim-${id}`)
    urunler[index].aciklama = getir(`guncelle-aciklama-${id}`)
    urunler[index].fiyat = getir(`guncelle-fiyat-${id}`)

    localRegister('urunler', urunler)
}

const remove = (id) => {
    urunler = urunler.filter(data => data.id != id)
    localRegister('urunler', urunler)
    list()
}