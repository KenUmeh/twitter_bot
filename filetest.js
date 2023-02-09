var fs = require('fs')
const pdf = require('pdf-parse')
// const pdf = require("./public/doc/")

// reader = fs.createReadStream('New_Document.txt', 'utf-8')

// reader.on('data', function(chunk) {
//     console.log(chunk.toString())
// });

const getPdf = async(file) => {
    let readFileSync = fs.readFileSync(file)
  try {
    let pdfExtract = await pdf(readFileSync)
    let content = pdfExtract.text
    
    // let pages=content.split("\n")
    // pages.forEach((e, i)=>{
    //   console.log(i)
    // })
    
    console.log(content)
    console.log('Total pages: ', pdfExtract.numpages)
    console.log('All content: ', pdfExtract.info)
  } catch (error) {
    console.log(error)
  }
}

const pdfread = './public/doc/The_Daily_Stoic_366.pdf'
getPdf(pdfread)




