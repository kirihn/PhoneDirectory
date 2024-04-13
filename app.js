const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const fs = require('fs');
const Handlebars = require('handlebars');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'Main',
    extname: 'hbs',
    partialsDir: './views/partials',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', 'views'); // default views

app.use('/style', express.static('style'));
app.use('/scripts', express.static('scripts'));

Handlebars.registerHelper('BackButton', function () {
    return new Handlebars.SafeString('<button onclick="Back()">Назад</button>')
})

app.use(bodyParser.json())

let persons = [ ]

  persons = JSON.parse(fs.readFileSync('PhoneList.json', 'utf8'));
  console.log(persons)


app.get('/', (req, res) => {
    res.render('GetForm', {persons});
});

app.get('/Add', (req, res) => {
    res.render('AddForm', {persons});
});

app.get('/Update', (req, res) => {
    let foundPerson = null
    const Name = req.query.Name;
    const Phone = "+" + req.query.Phone.trim();

    persons.forEach(element => {
        if(element.Name == Name && element.Phone == Phone){
            foundPerson = element;
        }
    });

    res.render('UpdateForm', {persons, foundPerson});
});

// ========= POST =========

app.post('/Add', (req, res) => {

    const newItem = req.body;
    
    if (!newItem || !newItem.Name || !newItem.Phone) {
        res.status(404).send({ message: 'Пожалуйста, заполните все поля' });
        return;
    }
    if (!(/^\+375\d{9}$/.test(newItem.Phone))) {
        res.status(404).send({ message: 'Некорректный номер телефона. Телефон должен содержать только цифры и состоять из 12 символов' });
        return;
    }

    persons.push(newItem)
    
    const newData = JSON.stringify(persons, null, 2); 


    fs.writeFile('PhoneList.json', newData, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            res.status(500).send({ message: 'Ошибка записи файла' });
            return;
        }
        console.log('Данные успешно обновлены и сохранены.');
        // res.status(200).send({ message: 'Данные успешно обновлены и сохранены' });


        
    });
    res.redirect('/');
    //res.render('GetForm', {persons});
})

app.post('/Update', (req, res) => {

    const newItem = req.body;
    
    if (!newItem || !newItem.NewName || !newItem.NewPhone || !newItem.OldName || !newItem.OldPhone) {
        res.status(404).send({ message: 'Пожалуйста, заполните все поля' });
        return;
    }
    if (!(/^\+375\d{9}$/.test(newItem.NewPhone))) {
        res.status(404).send({ message: 'Некорректный номер телефона. Телефон должен содержать только цифры и состоять из 12 символов' });
        return;
    }
    if (!(/^\+375\d{9}$/.test(newItem.OldPhone))) {
        res.status(404).send({ message: 'Некорректный номер телефона. Телефон должен содержать только цифры и состоять из 12 символов' });
        return;
    }

    persons.forEach(oldElement => {
        if(oldElement.Name == newItem.OldName && oldElement.Phone == newItem.OldPhone){
            oldElement.Name = newItem.NewName;
            oldElement.Phone = newItem.NewPhone;
        }
    });


    const newData = JSON.stringify(persons, null, 2); 


    fs.writeFile('PhoneList.json', newData, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            res.status(500).send({ message: 'Ошибка записи файла' });
            return;
        }
        console.log('Данные успешно обновлены и сохранены.');
        // res.status(200).send({ message: 'Данные успешно обновлены и сохранены' });


        
    });
    res.redirect('/');
    //res.render('GetForm', {persons});
})


app.post('/Delete', (req, res) => {

    const Item = req.body;
    
    console.log(Item.Name)
    console.log(Item.Phone)

    if (!Item || !Item.Name || !Item.Phone) {
        res.status(404).send({ message: 'Пожалуйста, заполните все поля' });
        return;
    }

    persons.forEach((element, index) => {
        if(element.Name == Item.Name && element.Phone == Item.Phone){
            console.log(10)
            persons.splice(index, 1);
        }
    });

    const newData = JSON.stringify(persons, null, 2); 

    fs.writeFile('PhoneList.json', newData, 'utf8', (err) => {
        if (err) {
            console.error('Ошибка записи файла:', err);
            res.status(500).send({ message: 'Ошибка записи файла' });
            return;
        }
        console.log('Данные успешно обновлены и сохранены.');
    });
    res.redirect('/');
})
app.listen(3000, () => {
    console.log("Server started on port 3000")

});


