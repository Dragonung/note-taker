//dependencies
const path = require('path');
const fs = require('fs');

//npm package to create unique id's
var uniqid = require('uniqid');

//routing
module.exports = (app) => {

    //GET /api/notes: read db.json file and return all saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    //POST /api/notes: read request body, add to db.json file, then return new note to client
    app.post('/api/notes', (req, res) => {
        let db = fs.readFileSync('db/db.json');
        db = JSON.parse(db);
        res.json(db);

        //create body for note
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            //unique id for each note
            id: uniqid(),
        };

        //push created note to be written in db.json
        db.push(userNote);
        fs.writeFileSync('db/db.json', JSON.stringify(db));
        res.json(db);
    });

    //DELETE /api/notes/:id: receive query parameter of id to delete respective note
    app.delete('/api/notes/:id', (req, res) => {
        //read notes from db.json
        let db = JSON.parse(fs.readFileSync('db/db.json'))
        //remove note with id
        let deleteNote = db.filter(item => item.id !== req.params.id);
        //rewrite note to db.json
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
        res.json(deleteNote);

    })
};;
