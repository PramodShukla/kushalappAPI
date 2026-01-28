module.exports = (req, res, next) => {
  try {
    if (req.body?.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in data field",
    });
  }
};
