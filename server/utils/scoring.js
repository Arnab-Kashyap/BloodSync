const compatibility = {
  'A+':  ['A+', 'A-', 'O+', 'O-'],
  'A-':  ['A-', 'O-'],
  'B+':  ['B+', 'B-', 'O+', 'O-'],
  'B-':  ['B-', 'O-'],
  'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  'AB-': ['A-', 'B-', 'AB-', 'O-'],
  'O+':  ['O+', 'O-'],
  'O-':  ['O-'],
};

const getCompatibleGroups = (bloodGroup) => {
  return compatibility[bloodGroup] || [bloodGroup];
};

const scoreDonor = (donor) => {
  let score = 0;

  if (donor.isAvailable) score += 40;

  if (!donor.lastDonation) {
    score += 20;
  } else {
    const daysSince = Math.floor(
      (new Date() - new Date(donor.lastDonation)) / (1000 * 60 * 60 * 24)
    );
    if (daysSince >= 56) score += 20;
    else score += Math.max(0, Math.floor((daysSince / 56) * 20));
  }

  score += Math.floor((donor.responseRate || 1) * 10);
  score += Math.min(10, donor.donationCount * 2);

  if (donor.phone) score += 10;
  if (donor.city && donor.state) score += 10;

  return Math.min(100, score);
};

module.exports = { getCompatibleGroups, scoreDonor };