import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error('Please define MONGODB_URI in .env.local');
// }

// 🧠 Global cache typing fix
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI; // move here

  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI'); // still protects runtime
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }) as Promise<typeof mongoose>;
  }

  cached.conn = await cached.promise;

  return cached.conn;
}