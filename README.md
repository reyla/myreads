# Project Overview

This app allows users to track books they are reading, have already read, and want to read. The user can search a limited API to select books to add to their bookshelf. Books can be moved between shelves as desired.

## How To Run

You can clone this project using https://github.com/reyla/myreads.git

In your project directory, install all project dependencies with `npm install`.

Start the development server with `npm start`. It should automatically navigate your web browser to http://localhost:3000

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend. If you are seeing no results, that means there are no books related to your search.

## Dependencies

Font provided by Google Fonts https://fonts.googleapis.com/css?family=Roboto

All npm dependencies are listed in [package.json](package.json). 

## Sources

Default thumbnail image was created at https://dummyimage.com/ 


