let kategoriler = JSON.parse(localStorage.getItem('kategoriler')) || []

window.onload = () => {
    list()
}

const create = () => {
    let id = Date.now()
    let isim = document.getElementById('isim').value
    let aciklama = document.getElementById('aciklama').value

    let kategori = {
        id: id,
        isim: isim,
        aciklama: aciklama
    }

    kategoriler.push(kategori)
    localStorage.setItem('kategoriler', JSON.stringify(kategoriler))

    info('success', 'Tebrikler Kayıt Başarılı!')
    list()
}

const list = () => {
    let alan = document.getElementById('alan')
    alan.innerHTML = ''

    kategoriler.forEach(element => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td><input id="guncelle-isim-${element.id}" classs="form-control" type="text" value="${element.isim}"></td>
            <td><input id="guncelle-aciklama-${element.id}" classs="form-control" type="text" value="${element.aciklama}"></td>
            <td>
                <button onclick="update(${element.id})" type="button" class="btn btn-success">Güncelle</button>
                <button onclick="remove(${element.id})" type="button" class="btn btn-danger">Sil</button>
            </td>         
        `

        alan.appendChild(tr)
    });
}

const update = (id) => {
    let isim = document.getElementById(`guncelle-isim-${id}`).value
    let aciklama = document.getElementById(`guncelle-aciklama-${id}`).value

    let index = kategoriler.findIndex(data => data.id == id)

    kategoriler[index].isim = isim
    kategoriler[index].aciklama = aciklama

    localStorage.setItem('kategoriler', JSON.stringify(kategoriler))

    info('warning', 'Tebrikler Güncelleme Başarılı!')
}

const remove = (id) => {
    kategoriler = kategoriler.filter(data => data.id != id)
    localStorage.setItem('kategoriler', JSON.stringify(kategoriler))

    info('danger', 'Tebrikler Silme Başarılı!')
    list()

}

const info = (renk, metin) => {
    let alan = document.getElementById('info-alan')
    alan.innerHTML = `
        <div class="alert alert-${renk}" role="alert">
            ${metin}
        </div>
    `

     setTimeout(() => {
        alan.innerHTML = ''
    }, 2000)
}