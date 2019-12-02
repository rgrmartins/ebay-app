import mongoose from 'mongoose';

// Models do Mongo - Alerts
const AlertsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    search_phrase: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    research_time: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Alerts', AlertsSchema);
