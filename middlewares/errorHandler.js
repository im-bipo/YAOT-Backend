const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    switch (req.body.reqType) {
      case "createNewEvent":
        return res
          .status(400)
          .json({ msg: "Event with same name already exist" });

      default:
        return res.status(400).json({ msg: "Same data already exist" });
        break;
    }
  }
  return res.status(err.status ?err.status :500).json(err)
};

module.exports = errorHandler;
