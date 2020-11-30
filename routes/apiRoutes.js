// Load data
const FS = require("fs");
const Path = require("path");
const NOTES_FILENAME = "db.json";
const NOTES_PATH = Path.resolve(Path.join(__dirname, `../assets/db/${NOTES_FILENAME}`));


// This function will read & return the notes in the db.json file
function readNotesFrom(path) {
    let notes = [{
        "title": "Initial Title",
        "text": "Initial Note",
        "date": new Date()
    }];

    // Check if file exists and create if not
    if (!FS.existsSync(path)) {
        // Check if path exists
        FS.mkdirSync(path, { recursive: true });

        // Initiallize with a blank note if file doesn't exist
        FS.writeFile(path, notes, (err) => {
            if (err) {
                console.log(`Error:${err}`);
            } else {
                console.log(`Successfully generated ${path}!`);
            }
        });
    }

    // read from file into js object
    notes = FS.readFileSync(path, { encoding: "utf-8" });
    console.log(notes);
    return notes;
}

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {
        console.log(`Received ${req.method} to URI:${req.path} using /api/notes handler`);
        res.json(readNotesFrom(NOTES_PATH));
    });
};