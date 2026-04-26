import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,

    date: String,      // ISO date
    time: String,      // "10:00"

    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected'],
      default: 'pending',
    },

    message: String,
  },
  { timestamps: true }
);

export default mongoose.models.Appointment ||
  mongoose.model('Appointment', AppointmentSchema);