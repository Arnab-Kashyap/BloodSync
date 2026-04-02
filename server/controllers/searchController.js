const User = require('../models/User');
const { getCompatibleGroups, scoreDonor } = require('../utils/scoring');

const searchDonors = async (req, res) => {
  const { bloodGroup, state, city } = req.query;

  try {
    if (!bloodGroup || !state) {
      return res.status(400).json({ message: 'Blood group and state are required' });
    }

    const compatibleGroups = getCompatibleGroups(bloodGroup);

    const query = {
      bloodGroup: { $in: compatibleGroups },
      state: { $regex: new RegExp(state, 'i') },
    };

    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }

    let donors = await User.find(query).select(
      'name bloodGroup state city isAvailable lastDonation donationCount responseRate phone createdAt'
    );

    if (donors.length === 0 && city) {
      delete query.city;
      donors = await User.find(query).select(
        'name bloodGroup state city isAvailable lastDonation donationCount responseRate phone createdAt'
      );
    }

    const scoredDonors = donors
      .map((donor) => ({
        ...donor.toObject(),
        score: scoreDonor(donor),
      }))
      .sort((a, b) => b.score - a.score);

    res.json({
      count: scoredDonors.length,
      bloodGroup,
      state,
      city: city || null,
      donors: scoredDonors,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { searchDonors };