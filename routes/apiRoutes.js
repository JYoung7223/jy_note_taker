// Load data
const FS = require("fs");
const Path = require("path");
const NOTES_FILENAME = "db.json";
const NOTES_DIR = Path.resolve(Path.join(__dirname, `../assets/db/`));
const NOTES_PATH = Path.resolve(Path.join(NOTES_DIR, `${NOTES_FILENAME}`));

/**** CRUD operiations */
// This function will read & return the notes in the db.json file (as a JSON object)
function readNotes() {
    if (!ensureDBFileExists()) {
        return `{"Error":"Unable to read notes from db."}`;
    }

    // return file data
    return JSON.parse(FS.readFileSync(NOTES_PATH, { encoding: "utf-8" }));
}

// This function will add the given note to the db.json file and return the added note (as a JSON object)
function createNote(data) {
    // Get list to add to
    let notes = readNotes();
    // Initialize new note
    let note = {
        "title": data.title,
        "text": data.text,
        "id": new Date()
    }

    // Add to list and update file
    notes.push(note);
    writeNotes(notes);
    // return JSON.stringify(note);
    return note;
}

// This function will find and delete a given note (by id) from the db.json file and return the deleted note
function deleteNote(id) {
    // Get list to add to
    let notes = readNotes();
    for (let i = 0; i < notes.length; i++) {
        let tempNote = notes[i];
        if (tempNote.id === id) {
            notes.splice(i, 1);
            writeNotes(notes);
            return tempNote;
        }
    }
    return `{"Error": "Unable to find note:${note.id}"}`;
}

/**** Helper Functions */
// This file will check if db.json file exists and create if not.
function ensureDBFileExists() {
    // Check if file exists and create if not
    if (!FS.existsSync(NOTES_PATH)) {
        // Check if path exists
        FS.mkdirSync(NOTES_DIR, { recursive: true });

        // Create initial note
        let initialNote = [{
            "title": "Initial Note Title",
            "text": "Initial Note Detail",
            "id": new Date()
        }];

        // Initiallize with a blank note if file doesn't exist
        // Add to list and update file
        FS.writeFileSync(NOTES_PATH, JSON.stringify(initialNote), (err) => {
            if (err) {
                console.log(`Error:${err}`);
                return false;
            } else {
                console.log(`Successfully added:${note}`);
            }
        });
    }
    return true;
}

// This function will write the given notes(as a JSON object) to the db.json file (as a string)
function writeNotes(notes) {
    if (!ensureDBFileExists()) {
        return false;
    }
    // Add to list and update file
    FS.writeFileSync(NOTES_PATH, JSON.stringify(notes), (err) => {
        if (err) {
            console.log(`Error:${err}`);
            return false;
        } else {
            console.log(`Successfully added:${note}`);
        }
    });
    return true;
}

/*** Accessible calls */
module.exports = function (app) {
    // API Requests
    // GET
    app.get("/api/notes", function (req, res) {
        res.json(readNotes());
    });

    // POST
    app.post("/api/notes", function (req, res) {
        res.json(createNote(req.body));
    });

    // Delete
    app.delete("/api/notes/:id", function (req, res) {
        res.json(deleteNote(req.params.id));
    })

};