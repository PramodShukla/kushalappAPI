const Slider = require("../models/SliderSchema");

// Create
exports.createSlider = async (req, res) => {
  const slider = await Slider.create(req.body);
  res.status(201).json(slider);
};

// Get all
exports.getSliders = async (req, res) => {
  try {
    const data = await Slider.find()
      .select("name intro Image description")
      .sort({ sequence: 1 });

    res.json({
      response: "successful",
      message: "Sliders fetched successgully",
      data: data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ respnse: "error", message: error.message, data: [] });
  }
};

// Update
exports.updateSlider = async (req, res) => {
  const updated = await Slider.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Delete
exports.deleteSlider = async (req, res) => {
  await Slider.findByIdAndDelete(req.params.id);
  res.json({ message: "Slider deleted" });
};
