var fs = require('fs')
const pdf = require('pdf-parse')
// const pdf = require("./public/doc/")

// reader = fs.createReadStream('New_Document.txt', 'utf-8')

// reader.on('data', function(chunk) {
//     console.log(chunk.toString())
// });

// const getPdf = async(file) => {
//     let readFileSync = fs.readFileSync(file)
//   try {
//     let pdfExtract = await pdf(readFileSync)
//     let content = pdfExtract.text
    
//     // let pages=content.split("\n")
//     // pages.forEach((e, i)=>{
//     //   console.log(i)
//     // })
    
//     console.log(content)
//     console.log('Total pages: ', pdfExtract.numpages)
//     console.log('All content: ', pdfExtract.info)
//   } catch (error) {
//     console.log(error)
//   }
// }

// const pdfread = './The_Daily_Stoic_366.pdf'
// getPdf(pdfread)

function render_page(pageData) {
  //check documents https://mozilla.github.io/pdf.js/
  let render_options = {
      //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
      normalizeWhitespace: false,
      //do not attempt to combine same line TextItem's. The default value is `false`.
      disableCombineTextItems: false
  }

  return pageData.getTextContent(render_options)
  .then(function(textContent) {
      let lastY= '';
      let text=[]
      for (let item of textContent.items) {
       text.push(item)
      }
      return text;
  });
}

let options = {
  pagerender: render_page
}

let dataBuffer = fs.readFileSync('./public/doc/The_Daily_Stoic_366.pdf');

pdf(dataBuffer,options).then(function(data) {
  //use new format
  console.log(data)
});


