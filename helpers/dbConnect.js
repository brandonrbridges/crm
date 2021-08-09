import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

if(!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local')
}

let cached = global.mongoose

if(!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if(cached.conn) {
    return cached.conn
  }

  if(!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true
    }

    cached.promise = mongoose.connect(MONGO_URI, options).then(mongoose => { return mongoose })
  }

  cached.conn = await cached.promise

  return cached.conn
}

export default dbConnect