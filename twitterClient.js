require('dotenv').config()
const twitterApi = require("twitter-api-v2").default

//console.log(twitterApi)

const client = new twitterApi({
    appKey: process.env.appKey,
    appSecret: process.env.appSecret,
    accessToken: process.env.accessToken,
    accessSecret: process.env.accessSecret
})



const rwClient = client.readWrite

module.exports = rwClient