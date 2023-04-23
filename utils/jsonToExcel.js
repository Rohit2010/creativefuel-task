const fs = require('fs');
const json2xls = require('json2xls');
const PDFDocument = require('pdfkit');

const convertJsonToExcel = (jsonData, filePath) => {
    console.log(jsonData)
  const xls = json2xls(jsonData);
  fs.writeFileSync(filePath, xls, 'binary');
}

const convertObjToPdf = (objData, filePath) => {
  // Create a new PDF document
  const doc = new PDFDocument();
    console.log(objData)
  Object.keys(objData).forEach((key) => {
    const value = objData[key];
    console.log(`${key}: ${value}`)
    doc.text(`${key}: ${value}`);
  });

  // Pipe the PDF document to a file
  doc.pipe(fs.createWriteStream(filePath));
  doc.end();
}


module.exports = {convertJsonToExcel, convertObjToPdf}