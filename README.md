# makulatura
A utility to visualise the CSV files data that can be exported from the goodreads.com site.

<img alt="html rendering example" src="render.png">  

## Usage

Download your `goodreads_library_export.csv` from goodread profile

> To import or export your books, go to My Books, then click on Import and export under Tools on the left.

<img width="1576" alt="goodreads export books" src="https://user-images.githubusercontent.com/1156953/59099679-6dd3fe00-8941-11e9-8d75-3f47ae79fc1c.png">  


> To Export your books to a .csv file, click on the Export Library button at the top of the screen, below the Export heading, then wait for the file to generate. This may take some time if you have a large library. If successful, you will see a Your export from (date) - (time) note below the button. Click on that text to download the csv file.  


<img width="1419" alt="Screenshot 2019-06-07 at 4 30 11 PM" src="https://user-images.githubusercontent.com/1156953/59099740-ab388b80-8941-11e9-91e1-49f04d7d73de.png">


**Source** [How do I import or export my books?](https://help.goodreads.com/s/article/How-do-I-import-or-export-my-books-1553870934590)

Now, run the script

    npm run visualise

or, if the file was renamed

    npm run visualise filename.csv
