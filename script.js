form = document.querySelector('form')
buttons_div = document.querySelector('.button-list')
buttons = document.querySelectorAll('.button-list button')
liste_tache = document.querySelector('.liste-tache ul')
trash_icon = `<svg width="16" height="16" fill="currentColor" class="bi bi-trash-fill trash" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>`

var TDL_not_end = new Array()
var TDL_end = new Array()
j=0
i=0
function CreateHTMLListNotEnded(li_value) {
    li = document.createElement('li')
    li.innerHTML = `<input type="checkbox" id="`+i+`"><label for="`+i+`">`+li_value+`</label>`+trash_icon
    liste_tache.prepend(li)
    i++
}

function CreateHTMLListEnded(li_value) {
    li = document.createElement('li')
    li.innerHTML = `<input type="checkbox" id="`+j+`" checked><label for="`+j+`" class="tache-finis">`+li_value+`</label>`+trash_icon
    liste_tache.prepend(li)
    j++
}

function PrintTDL(list = []) {
    if (list == TDL_not_end) {
        list.forEach(elem => {
            CreateHTMLListNotEnded(elem)
        })
    }else{
        list.forEach(elem => {
            CreateHTMLListEnded(elem)
        })
    }
}

function ListActualisation() {
    liste_tache.innerHTML = ''
    buttons.forEach(item => {
        if (item.classList.contains('selected')) {
            switch (item.innerText) {
                case "Toutes":
                    PrintTDL(TDL_not_end)
                    PrintTDL(TDL_end)
                    break;
            
                case "A faire":
                    PrintTDL(TDL_not_end)
                    break;
        
                case "Faites":
                    PrintTDL(TDL_end)
                    break;
            }
        }
    })
}



form.addEventListener('submit',function (param) {
    param.preventDefault()

    input_value = document.querySelector('.input-added')
    if (input_value.value == '') {
        alert("Entrez une tache a faire avant d'envoyer le formulaire")
    } else if (TDL_end.includes(input_value.value) || TDL_not_end.includes(input_value.value)) {
        alert('Element deja contenu dans la liste')
    }else{
        TDL_not_end.push(input_value.value)
        CreateHTMLListNotEnded(input_value.value)
        input_value.value = ''
    }
    ListActualisation()
})


buttons_div.addEventListener('click',function (param) {
    button = param.target
    buttons.forEach(item => item.classList.remove('selected'))
    button.classList.add('selected')
    ListActualisation()
})


liste_tache.addEventListener('change',function (param) {
    if (param.target.type = 'checkbox') {
        label_select = document.querySelector(`label[for='`+param.target.id+`']`)
        label_select.classList.toggle('tache-finis')
        
        if (label_select.classList.contains("tache-finis")) {
            TDL_not_end = TDL_not_end.filter(elem => elem !== label_select.innerText)
            TDL_end.push(label_select.innerText)
        }else{
            TDL_end = TDL_end.filter(elem => elem !== label_select.innerText)
            TDL_not_end.push(label_select.innerText)
        }
        ListActualisation()
    }
})


liste_tache.addEventListener('click',function (param) {
    let svg = param.target.parentNode
    if (svg.classList.contains('trash')) {
        clicked = svg.previousSibling
        TDL_not_end = TDL_not_end.filter(elem => elem !== clicked.innerText)
        TDL_end = TDL_end.filter(elem => elem !== clicked.innerText)
        ListActualisation()
    }
})