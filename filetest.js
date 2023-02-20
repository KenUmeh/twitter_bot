const pdfLibjs = require("pdfjs-dist/legacy/build/pdf.js");
const moment = require("moment");

const loadingTask = pdfLibjs.getDocument(
  "./public/doc/The_Daily_Stoic_366.pdf"
);
var d = moment();
var date = d.format("MMMM Do");
console.log("this is today's date", date);

var tweetContent;

const loadPage = async function (pageNum, doc) {
  let page = await doc.getPage(pageNum);
  let content = await page.getTextContent();
  const strings = content.items.map(function (item) {
    return item.str;
  });
  return strings.join(" ");
};
const pdfProcess = async () => {
  /*
  approach one even though it looks too dirty for my liking though
  */
  // return await loadingTask.promise
  //   .then(async function (doc) {
  //     const numPages = doc.numPages;
  //     // console.log("# Document Loaded");
  //     // console.log("Number of Pages: " + numPages);
  //     // console.log();
  //     // let lastPromise; // will be used to chain promises
  //     // lastPromise = doc.getMetadata().then(function (data) {
  //     // console.log("# Metadata Is Loaded");
  //     // console.log("## Info");
  //     // console.log(JSON.stringify(data.info, null, 2));
  //     // console.log();
  //     // if (data.metadata) {
  //     // console.log("## Metadata");
  //     // console.log(JSON.stringify(data.metadata.getAll(), null, 2));
  //     // console.log();
  //     // }
  //     // });
  //     const loadPage = async function (pageNum) {
  //       let page = await doc.getPage(pageNum);
  //       let content = await page.getTextContent();
  //       const strings = content.items.map(function (item) {
  //         return item.str;
  //       });
  //       return strings.join(" ");
  //     };
  //     for (let i = 1; i <= numPages; i++) {
  //       let pageData = await loadPage(i);
  //       if (pageData.includes(date)) {
  //         tweetContent = pageData;
  //         console.log(pageData);
  //         return pageData;
  //         //console.log(tweetContent);
  //         //  console.log("tweet length", tweetContent.length);
  //         // console.log("page " + i);
  //         return tweetContent;
  //       }
  //       // loadPage(i).then((d) => {
  //       //   if(d.includes(date)){
  //       //      tweetContent = d
  //       //     console.log(tweetContent)
  //       //     console.log("tweet length", tweetContent.length)
  //       //   // console.log("page " + i);
  //       //   }
  //       // });
  //     }
  //   })
  //   .then(
  //     function () {
  //       console.log("# End of Document");
  //     },
  //     function (err) {
  //       console.error("Error: " + err);
  //     }
  //   );

  /*
  this is the second implimentation which is alot concise and effective
  it will be my favourite
  */
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
    console.log(r);
  })
  .catch((e) => {
    console.log(e);
  });

// console.log("the content", tweetContent);

module.exports = { pdfProcess };

// console.log(module)
