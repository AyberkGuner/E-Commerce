let sepetler = JSON.parse(localStorage.getItem('sepetler')) || []
let urunler = JSON.parse(localStorage.getItem('urunler')) || []

window.onload = () => {
    list()
}

const list = () => {
    let alan = document.getElementById('alan')
    alan.innerHTML = ''

    
    let total = 0
    
    sepetler.forEach(element => {
        let urun = urunler.filter(data => data.id == element.urunId)

        let toplamFiyat = element.adet * urun[0].fiyat

        total += toplamFiyat

        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td><img height="80" src="${urun[0].fotograf}"></td>
            <td>${urun[0].isim}</td>
            <td><input id="adet-${element.id}" onchange="arttir(${element.id})" type="number" value="${element.adet}"></td>
            <td>${urun[0].fiyat}</td>
            <td>${toplamFiyat}</td>
            <td><button onclick="kaldir(${element.id})" class="btn btn-success" type="button">Kaldır</button></td>

        `
        alan.appendChild(tr)
    });

    document.getElementById('total-alan').innerHTML = total
}

const kaldir = (id) => {
    sepetler = sepetler.filter(data => data.id != id)
    localStorage.setItem('sepetler',JSON.stringify(sepetler))
    list()
}

const arttir = (id) => {
    let adet = document.getElementById(`adet-${id}`).value
    let index = sepetler.findIndex(data => data.id == id)
    sepetler[index].adet = adet
    localStorage.setItem('sepetler', JSON.stringify(sepetler))
    list()
}

