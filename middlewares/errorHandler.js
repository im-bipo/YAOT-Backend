const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    switch (req.body.reqType) {
      case "createNewEvent":
        return res
          .status(400)
          .json({ errorCause: "Event with same name already exist" });
        break;

      default:
        return res.status(400).json({ errorCause: "Same data already exist" });
        break;
    }
  }
  return res.status(err.status ?err.status :500).json({ error: err });
};

module.exports = errorHandler;
