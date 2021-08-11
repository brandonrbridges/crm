import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  city: String,
  creation_date: {
    default: Date.now,
    type: Date
  },
  customer: {
    name: String,
    phone: String,
    email: String,
    _id: Schema.Types.ObjectId
  },
  kvm: String,
  message: String,
  quote_value: Number,
  sale_value: Number,
  source: String,
  status: {
    default: 'pending',
    type: String
  },
  type: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
})

mongoose.models = {}

export default mongoose.models.Lead || mongoose.model('Lead', schema)