const mongoose =require("mongoose")

const parcelSchema = new mongoose.Schema({
    
    destination: {
      type: String,
      required: [true, 'Please provide package destination'],
      maxlength: 50,
    },
    presentLocation: {
      type: String,
      default: 'pickup station',
    },
    status: {
      type: String,
      enum: ['pickup station', 'in-transit', 'delivered'],
      default: 'pickup station',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)


module.exports = mongoose.model('Package', parcelSchema)