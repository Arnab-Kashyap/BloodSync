const Request = require('../models/Request');
const createRequest = async (req, res) => {
  const { patientName, bloodGroup, units, hospital, state, city, contactPhone, message, urgency } = req.body;

  try {
    const request = await Request.create({
      postedBy: req.user._id,
      patientName,
      bloodGroup,
      units,
      hospital,
      state,
      city,
      contactPhone,
      message,
      urgency,
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const { state, bloodGroup } = req.query;
    const query = { status: 'active' };

    if (state) query.state = { $regex: new RegExp(state, 'i') };
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const requests = await Request.find(query)
      .populate('postedBy', 'name phone')
      .sort({ createdAt: -1 });

    res.json({ count: requests.length, requests });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('postedBy', 'name phone');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    request.status = req.body.status || request.status;
    await request.save();

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createRequest, getRequests, getRequest, updateRequest };