const Provider = require("../models/ProviderSchema");

// Get all
exports.providerslist = async (req, res) => {
  try {
    const data = await Provider.find()

      .sort({ createdAt: -1 });

    res.json({ response: "successful", message: "", data: data });
  } catch (error) {
    res.status(500).json({ respnse: "", message: error.message, data: [] });
  }
};

// Create provider profile (after auth)
exports.createProfile = async (req, res) => {
  try {
    const finalData = {
      ...req.body,
      ...req.savedFiles,
    };

    const result = await Provider.create(finalData);

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  const updated = await Provider.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Update location
exports.updateLocation = async (req, res) => {
  const { lat, lng } = req.body;

  const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    {
      location: {
        type: "Point",
        coordinates: [Number(lng), Number(lat)],
      },
    },
    { new: true },
  );

  res.json(provider);
};

// Update services
exports.updateServices = async (req, res) => {
  const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    { services: req.body.services },
    { new: true },
  );

  res.json(provider);
};

// Submit KYC (documents)
exports.submitKYC = async (req, res) => {
  const provider = await Provider.findByIdAndUpdate(
    req.params.id,
    { documents: req.body.documents },
    { new: true },
  );

  res.json({ message: "KYC submitted", provider });
};
