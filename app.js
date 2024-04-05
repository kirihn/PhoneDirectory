const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'Main',
    extname: 'hbs',
    partialsDir: './views/partials'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', 'views'); // default views

app.use('/style', express.static('style'));
app.use('/scripts', express.static('scripts'));


let persons = [
    { name: "Стадольник Алексей Владимирович", phone: "+375291843130" },
    { name: "фывафыва", phone: 10 },
    { name: "фывафыва", phone: 40 },
    { name: "Nils", phone: 20 },
    { name: "Teddy", phone: 10 },
    { name: "Nelson", phone: 40 },
    { name: "Nils", phone: 20 },
  ]




app.get('/', (req, res) => {
    res.render('GetForm', {persons});
});

app.get('/Add', (req, res) => {
    res.render('AddForm', {persons});
});

app.get('/Update', (req, res) => {
    res.render('UpdateForm');
});

app.post('/Add', (req, res) => {
    console.log(1111111)
    const newItem = req.body;
    
    console.log(newItem);

    res.status(200).send(newItem)
})
app.listen(3000, () => {
    console.log("Server started on port 3000")
});


