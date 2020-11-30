// This file will handle initializing and starting the Express server

// Dependencies & Libraries
const Express = require("express");

// Initialize Express
const app = Express();
const PORT = process.env.PORT || 3000;
app.use(Express.urlencoded({extended:true})); // Accept URL encoded data, Extended allows nested object parsing
app.use(Express.json()); // Accept JSON type body data

// Links to API controllers/routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log(`App listening on PORT: ${PORT}`);
});
