let kategoriler = JSON.parse(localStorage.getItem('kategoriler')) || []
let urunler = JSON.parse(localStorage.getItem('urunler')) || []
let sepetler = JSON.parse(localStorage.getItem('sepetler')) || []

window.onload = () => {
    listCategories()
    listProduct(urunler)
}

const listCategories = () => {
    let alan = document.getElementById('kategori-alan')
    alan.innerHTML = ''

    kategoriler.forEach(element => {
        let li = document.createElement('li')
        li.classList = 'list-group-item'
        li.innerHTML = element.isim
        li.setAttribute('onclick', `filters(${element.id})`)
        alan.appendChild(li)
    });
}


const listProduct = (data) => {
    let alan = document.getElementById('urun-alan')
    alan.innerHTML = ''

    data.forEach(element => {
        let div = document.createElement('div')
        div.classList = 'col-lg-4'
        div.innerHTML = `
            <div class="card mt-2">
                <img src="${element.fotograf}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><a href="urun-detay.html?urun-id=${element.id}">${element.isim}</a></h5>
                    <p class="card-text">${element.fiyat}</p>
                    <button onclick="addToCart(${element.id})" type="button" class="btn btn-success">Sepete Ekle</button>
                </div>
            </div>
        `
        alan.appendChild(div)
    });
}

const filters = (id) => {
    let yeniUrunler = urunler.filter(data => data.kategori == id)
    listProduct(yeniUrunler)
}

const addToCart = (urun) => {
    let index = sepetler.findIndex(data => data.urunId == urun)

    if (index == -1) {
        let id = Date.now()
        let urunId = urun
        let adet = 1

        let sepet = {
            id: id,
            urunId: urunId,
            adet: adet
        }

        sepetler.push(sepet)
    } else {
        sepetler[index].adet += 1
    }


    localStorage.setItem('sepetler', JSON.stringify(sepetler))

    info('success', 'Ürün Spete Eklendi!')

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



