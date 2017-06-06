const Entry = require("../models/entry.js");

exports.list = (req, res, next) => {
  Entry.getRange(0, -1, (err, entries) => {
    if (err) next(err);
    res.render("entries", {
      title: "entries",
      entries: entries
    });
  });
};

exports.form = (req, res) => {
  res.render("post", { title: "Post" });
};

exports.submit = (req, res, next) => {
  console.log(req.body);
  const data = req.body.entry;
  const user = res.locals.user;
  const username = user ? user.name : null;
  const entry = new Entry({
    username: username,
    title: data.title,
    body: data.body
  });
  entry.save(err => {
    if (err) next(err);
    res.redirect("/");
  });
};
