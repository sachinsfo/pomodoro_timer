const express = require("express");

const path = require("path");

const app = express();

// app.use(express.static("/pomodoro_timer"));

// app.get("/*", function (req, res) {
//   const fullPath = path.join("/pomodoro_timer/index.html");
//   console.log(" Fetching from.." + fullPath);
//   res.sendFile(fullPath);
// });

app.use(express.static("./dist"));

app.get("/*", (req, res) => res.sendFile("index.html", { root: "dist" }));

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

console.log("Server started... :)");

//app.listen(process.env.PORT || 8080);
