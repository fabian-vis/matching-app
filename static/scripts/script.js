document.querySelectorAll('button').forEach(button => button.addEventListener('click', verwijderLike))


function verwijderLike(klikevent) {
    // fetch('/delete?id=782387ya78sdfyas7o34ih', {method: "DELETE"})
    fetch('/delete?id=' + klikevent.target.dataset.id, {
        method: 'DELETE' 
    })
    .then(response => {
        return response.text()
    }).then(tekst => {
        if (tekst === 'Gelukt') window.location.reload()
    })
}
