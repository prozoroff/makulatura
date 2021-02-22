const getBooksByYear = (books, year) => {
  return books.filter((book) => {
	const date = book.date_read || book.date_added;
    return date.getFullYear() === year;
  });
};

const getAveragePages = books => {
	const booksWithPages = books.filter(book => book.pages);
	return Math.round(booksWithPages.reduce((sum, book) => {
		return sum + book.pages;
	}, 0) / booksWithPages.length)
}

const getPages = (books, averagePages) => books.map(book => book.pages || averagePages);

module.exports = function (books) {

  const readBooks = books.filter((book) => book.bookshelves === "read");

  console.log("Total books ", books.length);
  console.log(
    "Total read books ",
    readBooks.length
  );

  

  //calculate average to fill blank values
  const averagePages = getAveragePages(readBooks);

  return {
    getPagesByYear: (year) => getPages(getBooksByYear(readBooks, year), averagePages),
	getPages: () => getPages(readBooks, averagePages)
  };
};
