"use strict";

const fs = require('fs');
const getBooks = require("./parser.js");
const getStore = require("./store.js");
const getRenderer = require("./renderer.js");

const csvFilePath = process.argv[2] || "goodreads_library_export.csv";

const books = getBooks(csvFilePath);
const store = getStore(books);

const renderer = getRenderer(store);

fs.writeFile('index.html', renderer.renderPage(), error => {
	if(error) {
        return console.log(error);
    }
    console.log("The file was saved!");
});
