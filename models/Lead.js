import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  brand: String,
  city: String,
  contacted_via: {
    default: 'website',
    type: String
  },
  creation_date: {
    default: Date.now,
    type: Date
  },
  customer: {
    name: {
      type: String
    },
    _id: {
      type: Schema.Types.ObjectId
    }
  },
  kvm: String,
  message: String,
  quote_value: Number,
  sale_value: Number,
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