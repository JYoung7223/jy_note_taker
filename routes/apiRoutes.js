// Load data
const FS = require("fs");
const Path = require("path");
const NOTES_FILENAME = "db.json";
const NOTES_PATH = Path.resolve(Path.join(__dirname, `../assets/db/${NOTES_FILENAME}`));

// This file will check if db.json file exists and create if not.
function ensureDBFileExists(path){
    // Check if file exists and create if not
    if (!FS.existsSync(path)) {
        // Check if path exists
        FS.mkdirSync(path, { recursive: true });

        // Create initial note
        let note = {
            "title":"Initial Note Title",
            "text":"Initial Note Detail",
            "id":new Date()
        }

        // Initiallize with a blank note if file doesn't exist
        FS.writeFile(path, "", (err) => {
            if (err) {
                console.log(`Error:${err}`);
                return false;
            } else {
                console.log(`Successfully generated ${path}!`);
            }
        });
    }
    return true;
}

// This function will write the given notes to the db.json file
function writeNotes(notes, path){
    if(!ensureDBFileExists(path)){
        return false;
    }
    // Add to list and update file
    FS.writeFileSync(path, JSON.stringify(notes), (err)=>{
        if(err){
            console.log(`Error:${err}`);
            return false;
        }else{
            console.log(`Successfully added:${note}`);
        }
    });
    return true;
}

// This function will read & return the notes in the db.json file
function readNotesFrom(path) {    
    if(!ensureDBFileExists(path)){
        return `{"Error":"Unable to read notes from db."}`;
    }

    // return file data
    return FS.readFileSync(path, { encoding: "utf-8" });    
}

// This function will add the given note to the db.json file and return the added note
function createNote(data, path){
    // Get list to add to
    let notes = JSON.parse(readNotesFrom(path));
    // Initialize new note
    let note = {
        "title": data.title,
        "text": data.text,
        "id": new Date()
    }
    
    // Add to list and update file
    notes.push(note);
    writeNotes(notes, path);
    return JSON.stringify(note);
}

// This function will find and delete a given note (by id) from the db.json file and return the deleted note
function deleteNote(note, path){
    // Get list to add to
    let notes = JSON.parse(readNotesFrom(path));
    for(let i = 0; i<notes.length; i++){
        let tempNote = notes[i];
        if(tempNote.id === note.id){
            notes.splice(i,1);
            writeNotes(notes, path);
            return tempNote;
        }
    }
    return `{"Error": "Unable to find note:${note.id}"}`;
}

module.exports = function (app) {
    // API Requests
    // GET
    app.get("/api/notes", function (req, res) {
        res.json(readNotesFrom(NOTES_PATH));
    });

    // POST
    app.post("/api/notes", function(req, res){
        res.json(createNote(req.body, NOTES_PATH));
    });

    // Delete
    app.delete("/api/notes", function(req,res){
        res.json(deleteNote(req.body, NOTES_PATH));
    })

};