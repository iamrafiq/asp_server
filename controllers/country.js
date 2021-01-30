const Country = require("../models/country");
const lodash = require("lodash");

exports.create = (req, res) => {
  const country = new Country(req.body);
  country.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    res.json({ data });
  });
};
exports.insertMany = (req, res) => {
  Country.insertMany(req.body)
    .then(function () {
      return res.status(200).json({
        msg: "Successfully all countries inserted.",
      });
    })
    .catch(function (error) {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.update = (req, res) => {
  let country = req.country;
  country = lodash.extend(country, req.body);
  country.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Country dose not exist.",
      });
    }

    res.json({ data });
  });
};

exports.remove = (req, res) => {
  let country = req.country;
  country
    .remove()
    .then((result) => {
      res.json({
        result,
        message: "Country deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};
exports.countryById = (req, res, next, id) => {
  Country.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    req.country = data;
    next();
  });
};
exports.list = async (req, res) => {
  // Country.find().select("name -_id").exec((err, data) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: err,
  //     });
  //   }
  //   res.json(data);
  // });
  const names = await Country.distinct("name");
  if (names) {
    return res.json(names);
  } else {
    return res.status(400).json({
      error: "Countries not found!",
    });
  }
};
exports.read = (req, res) => {
  res.json(req.country);
};
