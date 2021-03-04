document.querySelectorAll('button').forEach(button => button.addEventListener('click', verwijderLike))

// let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
// document.getElementById('submitbutton').onclick = function() {

//     if(checkboxes.length == 0) {
//         alert("Please select atleast one checkbox");
//     }
// }

function verwijderLike(klikevent) {
    // fetch('/delete?id=782387ya78sdfyas7o34ih', {method: "DELETE"})
    fetch('/delete?id=' + klikevent.target.dataset.id, {
        method: "DELETE"
    })
    .then(response => {
        return response.text()
    }).then(tekst => {
        if (tekst === "Gelukt") window.location.reload()
    })
}

    

/*
    fetch(url) -> server -> response -> text/json/xml/whatever
        methods: standaard GET, ook POST, PUT, DELETE
    
    fetch(url, {
        method: "DELETE"
    })
*/