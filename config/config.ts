export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE,
  },
  jwt: {
    expiration: process.env.JWT_EXPIRATION_TIME,
    secret: process.env.PRIVATE_KEY,
  }
});
