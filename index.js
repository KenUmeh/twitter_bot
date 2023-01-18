const rwClient = require("./twitterClient")
const cronJob = require("cron").CronJob
console.log(cronJob)

const tweet = async() => {
    try {
        await rwClient.v1.tweet("Bienvenue mon peuple")
    } catch (e) {
        console.log(e)
    }
}

const job = new cronJob("0 6 * * *", () => {
    console.log("test cron job")
    tweet()

})
 job.start();
// tweet()