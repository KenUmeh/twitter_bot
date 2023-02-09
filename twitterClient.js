const twitterApi = require("twitter-api-v2").default

//console.log(twitterApi)

const client = new twitterApi({
    appKey: "euGvYNutOr3zrl391tbZ2EMfd",
    appSecret: "HOdKUt0oCOalJVaxdyV6ElHVncrHpeiLZ0NFOhfu9ayaxts5QC",
    accessToken: "883993107171356673-WSxTBo7aTM2jQBrArTypz6o4JJKsxtZ",
    accessSecret: "5RepuMLBjbstuKNI6tqB6l9tbdUncVas1Ru6GKYK0G20x"
})


const rwClient = client.readWrite

module.exports = rwClient