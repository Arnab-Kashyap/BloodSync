const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      required: [true, 'Blood group is required'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    units: {
      type: Number,
      required: [true, 'Units required'],
      min: 1,
      max: 10,
    },
    hospital: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    contactPhone: {
      type: String,
      required: [true, 'Contact number is required'],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    urgency: {
      type: String,
      enum: ['critical', 'urgent', 'moderate'],
      default: 'urgent',
    },
    status: {
      type: String,
      enum: ['active', 'fulfilled', 'closed'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);