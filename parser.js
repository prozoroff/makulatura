"use strict";

const fs = require("fs");
const xlsx = require("xlsx");

module.exports = function (csvFilePath) {
  assertFile(csvFilePath);

  const excelsheet = xlsx.readFile(csvFilePath, { type: "file", cellDates: true });

  let books;

  for (let sheetName of Object.keys(excelsheet.Sheets)) {
    let sheet = excelsheet.Sheets[sheetName];

    books = xlsx.utils.sheet_to_json(sheet).map((row) => {
      return {
        title: row["Title"],
        author_name: row["Author"],
        my_rating: row["My Rating"],
        date_read: row["Date Read"],
        date_added: row["Date Added"],
        bookshelves: row["Exclusive Shelf"],
        pages: row["Number of Pages"],
      };
    });
  }

  return books;
};

function assertFile(csvFilePath) {
  if (!fs.existsSync(csvFilePath)) {
    console.error(Error(`${csvFilePath} doesnt exist`));
    process.exit(0);
  }
  console.log(`Reading file from ${csvFilePath}`);
}
