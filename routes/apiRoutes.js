// Load data
const FS = require("fs");
const NotesDB = require("../assets/db/db.json");

// Prepare and send json data
function getNotex(app){
    app.get("/api/notes", function(req,res){
        // Read DB and send as JSON
    })
}
// Create new note, and return created note
function postNotes(app){
    app.post("/api/notes", function(req, res){
        // Create and return as JSON
    })
}
// Delete a note and return delete note
function deleteNotes(app){
    app.delete("/api/notes", function(req, res){
        // Find, Delete, update and return as JSON
    })
}

// Prepare and display html pages
function showNotesPage(app){
    app.get("/notes", function(req,res){
        // Prepare and display notes page (notes.html)
    }
}
function showHomePage(app){
    app.get("*", function(req,res){
        // Prepare and display home page (index.html)
    })
}

module.exports = {
    getNotes(app);
    postNotes(app);
    deleteNotes(app);
    showNotesPage(app);
    showHomePage(app);
};
