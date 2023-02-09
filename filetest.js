import fs from "fs";
import PDFParser from "pdf2json";
import pdfLibjs from "pdfjs-dist/legacy/build/pdf.js";
const loadingTask = pdfLibjs.getDocument(
  "./public/doc/The_Daily_Stoic_366.pdf"
);
loadingTask.promise
  .then(function (doc) {
    const numPages = doc.numPages;
    console.log("# Document Loaded");
    console.log("Number of Pages: " + numPages);
    console.log();
    let lastPromise; // will be used to chain promises
    lastPromise = doc.getMetadata().then(function (data) {
      console.log("# Metadata Is Loaded");
      console.log("## Info");
      console.log(JSON.stringify(data.info, null, 2));
      console.log();
      if (data.metadata) {
        console.log("## Metadata");
        console.log(JSON.stringify(data.metadata.getAll(), null, 2));
        console.log();
      }
    });

    const loadPage = async function (pageNum) {
      let page = await doc.getPage(pageNum);
      let content = await page.getTextContent();

      const strings = content.items.map(function (item) {
        return item.str;
      });
      return strings.join(" ");
    };

    for (let i = 1; i <= numPages; i++) {
      loadPage(i).then((d) => {
        console.log(d);
        console.log("page " + i);
      });
    }
  })
  .then(
    function () {
      console.log("# End of Document");
    },
    function (err) {
      console.error("Error: " + err);
    }
  );
