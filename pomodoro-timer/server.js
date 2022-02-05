const express = require("express");

const path = require("path");

const app = express();

//app.use(express.static(__dirname + "./dist/pomodoro-timer"), function () {
//console.log(`directory name: ${__dirname}/dist/pomodoro-timer`);
//});

//app.get("/*", function (req, res) {
//res.sendFile(path.join(__dirname + "/dist/pomodoro-timer/index.html"));
//console.log(`directory name: ${__dirname}/dist/pomodoro-timer/index.html`);
//});

app.use(express.static("./dist/pomodoro-timer"));
app.get("*", (req, res) =>
  res.sendFile("index.html", { root: "dist/pomodoro-timer/" })
);

app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

//app.listen(process.env.PORT || 8080);
