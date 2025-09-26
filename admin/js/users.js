let uyeler = JSON.parse(localStorage.getItem('uyeler')) || []

window.onload = () => {
    list()
}

const list = () => {
    let alan = document.getElementById('alan')
    alan.innerHTML = ''

    uyeler.forEach(element => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${element.isim}</td>
            <td>${element.eposta}</td>
            <td><button onclick=(remove(${element.id})) class="btn btn-danger" type="button">Silme</button></td>
        `

        alan.appendChild(tr)
    });

}

const remove = (id) => {
    uyeler = uyeler.filter(data => data.id != id)
    localStorage.setItem('uyeler', JSON.stringify(uyeler))
    list()
}