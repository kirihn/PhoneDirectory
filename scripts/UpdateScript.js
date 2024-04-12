const inpName = document.getElementById('InpName');
const inpPhone = document.getElementById('InpPhone');

const OldName = document.getElementById('pName').innerText;
const OldPhone = document.getElementById('pPhone').innerText;

const DelButton = document.getElementById('DelButton');

let UpdateItem = {}
let DelItem = {}

inpName.addEventListener('input', checkFields); // Без вызова ()
inpPhone.addEventListener('input', checkFields); // Без вызова ()


function checkFields(){
    if (inpName.value !== OldName || inpPhone.value !== OldPhone) {
        DelButton.disabled = true;

    } else {
        DelButton.disabled = false;
    }
}

function Update(){

        let NewName = inpName.value.trim();
        let NewPhone = inpPhone.value.trim();

        UpdateItem.NewName = NewName;
        UpdateItem.NewPhone = NewPhone;
        UpdateItem.OldName = OldName;
        UpdateItem.OldPhone = OldPhone;

        alert(JSON.stringify(UpdateItem));

        fetch('http://localhost:3000/Update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Указываем тип контента как JSON
            },
            body: JSON.stringify(UpdateItem)
        })
        .then(response => {
            if (!response.ok) {
                return response.json()
                .then(data => {
                    throw new Error ("Ошибка " + response.status + ": " + data.message)
                })
            }
            return response.text();
        })
        .then(data => {
            //alert(data.message); // Выводим текст ответа
            document.body.innerHTML = data;
        })
        .catch( Error => {
            alert( Error.message)
        })
}

function del(){
    let Name = inpName.value.trim();
    let Phone = inpPhone.value.trim();

    DelItem.Name = Name;
    DelItem.Phone = Phone;

    console.log(DelItem.Name)
    console.log(DelItem.Phone)

    alert(JSON.stringify(DelItem));

    fetch('http://localhost:3000/Delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Указываем тип контента как JSON
        },
        body: JSON.stringify(DelItem)
    })
    .then(response => {
        if (!response.ok) {
            return response.json()
            .then(data => {
                throw new Error ("Ошибка " + response.status + ": " + data.message)
            })
        }
        return response.text();
    })
    .then(data => {
        //alert(data.message); // Выводим текст ответа
        document.body.innerHTML = data;
    })
    .catch( Error => {
        alert( Error.message)
    })
}

function Back(){
    window.location.assign(`/`);
}