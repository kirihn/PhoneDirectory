const NameEl = document.getElementById('InpName');
    const PhoneEl = document.getElementById('InpPhone');

    let Item = {}

    function AddItem(){
        let Name = NameEl.value.trim();
        let Phone = PhoneEl.value.trim();

        Item.Name = Name;
        Item.Phone = Phone;

        alert(JSON.stringify(Item));

        fetch('http://localhost:3000/Add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Указываем тип контента как JSON
            },
            body: JSON.stringify(Item)
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