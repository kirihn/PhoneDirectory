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

app.use(express.static('style'));


const persons = [
    { name: "Nils", phone: 20 },
    { name: "Teddy", phone: 10 },
    { name: "Nelson", phone: 40 },
  ]




app.get('/', (req, res) => {
    res.render('GetForm', {persons});
});

app.get('/Add', (req, res) => {
    res.render('AddForm');
});

app.get('/Update', (req, res) => {
    res.render('UpdateForm');
});


app.listen(3000, () => {
    console.log("Server started on port 3000")
});


