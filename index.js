require('dotenv').config()
const rwClient = require("./twitterClient")
const cronJob = require("cron").CronJob

const pdfLibjs = require("pdfjs-dist/legacy/build/pdf.js");
const moment = require("moment");

const job1 = new cronJob("00 9 * * *", () => {


const loadingTask = pdfLibjs.getDocument(
  "./public/doc/The_Daily_Stoic_366.pdf"
);
var d = moment();
var date = d.format("MMMM Do");
console.log("this is today's date", date);
// var tweetContent;

const loadPage = async function (pageNum, doc) {
  let page = await doc.getPage(pageNum);
  let content = await page.getTextContent();
  const strings = content.items.map(function (item) {
    return item.str;
  });
  return strings.join(" ");   
};
const pdfProcess = async () => {
  
  let doc = await loadingTask.promise;
  const numPages = doc.numPages;
  for (let i = 1; i <= numPages; i++) {
    let pageData = await loadPage(i, doc);
    if (pageData.includes(date)) {
      return pageData;
    }
  }
};


pdfProcess()
  .then((r) => {
    console.log('tweet content  ', r);
    console.log('tweet length  ', r.length);
    const job = new cronJob("55 8 * * *", () => {
        console.log("test cron job")
        tweet(r)
        r = ""
    })
     job.start();
  })
  .catch((e) => {
    console.log(e);
  });

const tweet = async(str) => {
    try {
          const chunkSize = 280; // set the maximum size of each chunk
          let result = [];
          
          for (let i = 0; i < str.length; i += chunkSize) {
            const chunk = str.slice(i, i + chunkSize); // slice the string into chunks
            if (chunk.length > chunkSize) {
              throw new Error(`Cannot split string into chunks of ${chunkSize} characters or less.`);
            }
            result.push(chunk);
          }
          // console.log(result)
          // console.log("number of chunks", result.length)
          let l = result.length
          var tID 
          for (let i = 0; i < l; i++){
             if(i === 0){
              // console.log('first tweet content', result[i])
              let resp = await rwClient.v1.tweet(result[i])
            //  console.log("first tweet response", resp)
               tID = resp.id_str
             }else{
              // console.log('response tweet', i)
             let resp = await rwClient.v1.reply(result[i], tID)
            //  console.log('response tweet', resp)
              tID = resp.id_str
             }

          }
          result = []
          // result.length = 0;
          console.log("emptied result", result)
          return result;

        
    } catch (e) {
        console.log(e)
    }
}
})

job1.start();

// tweet()