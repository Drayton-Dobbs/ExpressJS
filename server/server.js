const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');


let app = express();



app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/contact-form', (req, res, next) => {
    let formData = {
        name: req.body.name,
        email: req.body.email
    }

    fs.writeFile('forms.json', JSON.stringify(formData), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('gotcha!');
        res.send(formData)
    });







});

app.get('/formsubmissions', (req, res, next) => {

   fs.readFile('forms.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        console.log('NICE')
        res.send(JSON.stringify(data.toString()))
    })

})








app.use((req, res, next) => {
    console.log(req.url)
    next();
});

app.get('/:id', (req, res) => {
    let id = req.params.id;
    res.send(id)
});

app.use(express.static(path.join(__dirname, '../public')));



// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// app.get('/css/styles.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/css/styles.css'));
// })

app.listen(3001);