// routes.js
const createNewNote = require('./app/notes/create');
const delNote = require('./app/notes/delNote');
const appData = require('./app/notes/upData');
const read = require('./app/notes/read');
const getAllNotes = require('./app/notes/getAllNotes');


module.exports = function(app, db) {
    createNewNote(app, db),
    delNote(app,db),
    appData(app,db),
    read(app,db),
    getAllNotes(app,db)
}
