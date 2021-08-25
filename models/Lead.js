import mongoose, { Schema } from 'mongoose'

const schema = new Schema({
  archived: {
    default: false,
    type: Boolean
  },
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
  quote: {
    service: {
      default: 0,
      type: Number
    },
    extra: {
      default: 0,
      type: Number
    }
  },
  sale: {
    service: {
      default: 0,
      type: Number
    },
    extra: {
      default: 0,
      type: Number
    }
  },
  source: String,
  status: {
    default: 'new',
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