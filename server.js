const express = require("express");

const path = require("path");

const app = express();

// app.use(express.static("/pomodoro_timer"));

// app.get("/*", function (req, res) {
//   const fullPath = path.join("/pomodoro_timer/index.html");
//   console.log(" Fetching from.." + fullPath);
//   res.sendFile(fullPath);
// });

app.use(express.static("./dist/pomodoro_timer"));

app.get("/*", (req, res) =>
  res.sendFile("index.html", { root: "dist/pomodoro_timer" })
);

// if (process.env.NODE_ENV) {
//   app.use(express.static(path.resolve(process.cwd(), "pomodoro_timer")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(process.cwd(), "pomodoro_timer/index.html"));
//   });
// }

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

console.log("Server started... :)");

//app.listen(process.env.PORT || 8080);
