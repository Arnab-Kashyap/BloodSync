const User = require('../models/User');

const toggleAvailability = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.isAvailable = req.body.isAvailable;
    await user.save();
    res.json({ isAvailable: user.isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, city, state, lastDonation } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, city, state, lastDonation },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { toggleAvailability, updateProfile };