const parseField = field => {
  return field.split(/\[|\]/).filter(s => s);
};
const getField = (req, field) => {
  let val = req.body;
  field.forEach(item => {
    val = val[item];
  });
  return val;
};
exports.required = field => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field)) {
      next();
    } else {
      console.error(`${field.join(" ")} is required`);
      res.redirect("back");
    }
  };
};
exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      const fields = field.join(" ");
      console.error(`the length of ${fields} should be greater than ${len}`);
      res.redirect("back");
    }
  };
};
