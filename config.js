module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.port || 3100,
  URL: process.env.BASE_URL || 'http://localhost:3000',
  MONGODB_URI: process.env.MONGODB_URL || 'mongodb://127.0.0.1/michaelDB',
  JWT_SECRET: process.env.JWT_SECRET || 'secret101'
}
