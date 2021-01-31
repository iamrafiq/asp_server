const Activity = require("../models/activity");
const lodash = require("lodash");

exports.create = (req, res) => {
    console.log("create.....", req.body)
  const activity = new Activity(req.body);
  activity.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    res.json({ data });
  });
};

exports.update = (req, res) => {
  let activity = req.activity;
  activity = lodash.extend(activity, req.body);
  activity.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Activity dose not exist.",
      });
    }

    res.json({ data });
  });
};

exports.remove = (req, res) => {
  let activity = req.activity;
  activity
    .remove()
    .then((result) => {
      res.json({
        result,
        message: "Activity deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};
exports.activityById = (req, res, next, id) => {
  Activity.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    req.activity = data;
    next();
  });
};
exports.list = async (req, res) => {
  Activity.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(data);
  });
};
exports.read = (req, res) => {
  res.json(req.activity);
};
