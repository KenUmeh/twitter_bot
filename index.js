const rwClient = require("./twitterClient")
const cronJob = require("cron").CronJob

const pdfLibjs = require("pdfjs-dist/legacy/build/pdf.js");
const moment = require("moment");

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

//this is a promise until you can call it in an async function with an await which will
// resolve the promise authomatically else you will get null since javascript is compiled
// synchronously unless you take your remote and be in charge.
pdfProcess()
  .then((r) => {
    console.log('tweet content  ', r);
    console.log('tweet length  ', r.length);
    const job = new cronJob("* * * * *", () => {
        console.log("test cron job")
        tweet(r)
    
    })
     job.start();
  })
  .catch((e) => {
    console.log(e);
  });

const tweet = async(str) => {
    try {
            //  let snd = 'stand with the philosopher, or else with the mob!”   — E PICTETUS,   D ISCOURSES , 3.15.13  e’re all complicated people. We have multiple sides to ourselves—conflicting wants, desires, and fears. The outside world is no less confusing and contradictory. If we’re not careful, all '
            // let id = '1631563811046948864'
            // let id_str= '883993107171356673'
            // let resp = await rwClient.v1.tweet(snd)
              // let resp = await rwClient.v1.reply(snd, id)
            //  console.log(resp)


          const chunkSize = 280; // set the maximum size of each chunk
          const result = [];
          
          for (let i = 0; i < str.length; i += chunkSize) {
            const chunk = str.slice(i, i + chunkSize); // slice the string into chunks
            if (chunk.length > chunkSize) {
              throw new Error(`Cannot split string into chunks of ${chunkSize} characters or less.`);
            }
            result.push(chunk);
          }
          console.log(result)
          console.log("number of chunks", result.length)
          let l = result.length
          var tID 
          for (let i = 0; i < l; i++){
             if(i === 0){
              console.log('first tweet content', result[i])
              let resp = await rwClient.v1.tweet(result[i])
             console.log("first tweet response", resp)
               tID = resp.id_str
             }else{
              console.log('response tweet', i)
             let resp = await rwClient.v1.reply(result[i], tID)
             console.log('response tweet', resp)
              tID = resp.id_str
             }

          }
          return result;

        
    } catch (e) {
        console.log(e)
    }
}

// tweet()