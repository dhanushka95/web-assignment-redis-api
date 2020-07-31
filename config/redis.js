const redis = require("redis");
const dotenv = require("dotenv");
dotenv.config();
const client = new redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
});

module.exports = client;
