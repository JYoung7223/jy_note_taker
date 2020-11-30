// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var Path = require("path");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/notes.html", function(req, res) {
    console.log(`Received ${req.method} to URI:${req.path} using notes.html handler`);
    res.sendFile(Path.join(__dirname, "../notes.html"));
  });

  app.get("*.html", function(req, res) {
    console.log(`Received ${req.method} to URI:${req.path} using default handler`);
    res.sendFile(Path.join(__dirname, "../index.html"));
  });
};
