let urunler = JSON.parse(localStorage.getItem('urunler')) || []
let sepetler = JSON.parse(localStorage.getItem('sepetler')) || []

window.onload = () => {
    list()
    similarProducts()
}

const findProduct = () => {
    let url = new URLSearchParams(window.location.search)
    let id = url.get('urun-id')
    let urun = urunler.filter(data => data.id == id)
    return urun[0]
}

const list = () => {
    let urun = findProduct()
    

    document.getElementById('isim').innerHTML = urun.isim
    document.getElementById('fotograf').src = urun.fotograf
    document.getElementById('fiyat').innerHTML = urun.fiyat
    document.getElementById('aciklama').innerHTML = urun.aciklama

    document.getElementById('btn').setAttribute('onclick', `addToCart(${urun.id})`)
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

const similarProducts = () => {
    let urun = findProduct()
    let similar = urunler.filter(data => data.kategori == urun.kategori && data.id != urun.id)

    let alan = document.getElementById('benzer-urun')
    alan.innerHTML = ''

    similar.forEach(element => {
        let div = document.createElement('div')
        div.classList = 'col-lg-3'
        div.innerHTML = `
                    <div class="card mt-2">
                        <img src="${element.fotograf}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"><a href="urun-detay.html?urun-id=${element.id}">${element.isim}</a></h5>
                            <p class="card-text">${element.fiyat}</p>
                            <button onclick="addToCart(${element.id})" class="btn btn-success" type="button">Sepete Ekle</button>
                        </div>
                    </div>
        `
        alan.appendChild(div)
    });
}


/*
<div class="col-lg-3">
                    <div class="card mt-2">
                        <img src="assets/img/araba.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title"><a href="urun-detay.html">Card title</a></h5>
                            <p class="card-text">450₺</p>
                            <a href="#" class="btn btn-success">Sepete Ekle</a>
                        </div>
                    </div>
                </div>
*/