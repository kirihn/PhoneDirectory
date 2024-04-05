const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'Main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', 'views'); // default views

app.use(express.static('style'));

const persons = [
    { name: "Nils", age: 20 },
    { name: "Teddy", age: 10 },
    { name: "Nelson", age: 40 },
  ]
  
  Handlebars.registerPartial(
    "person", 
    "<h1>{{person.name}} is {{person.age}} years old.<h1/>\n"
)











app.get('/', (req, res) => {
    res.render('GetForm');
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


