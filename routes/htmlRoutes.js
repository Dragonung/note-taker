//dependency
const path = require('path');

//routing
module.exports = (app) => {
    //routes

    //GET /notes should return notes.html
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    //GET * should return index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};

