# All about Leaning Management System

## Overview

The Leaning Management System (LMS) is a system premitting users to checkout and return books.

## Components

The components are:

- MySQL database storing the books and the status per book.
- Node / Express backend that contains APIs to list all books and modify the borrowed status of a book by accessing the database.
- React frontend that allows the user to show all books and modify the status of each book by accessing the API layer.
- Jest is used for the testing framework.

### Data Models

The MySQL database contains 2 tables, Books and BookInfo. 

- The book table contains all unique book names with a unique id
- The BookInfo table contains a foreign key to the book table, a unique Id and a whether or not the book has been borrowed.

Since there are relatively few books (i.e 10,000 or so) and a low number of hits, a traditional database is used. Since there could be several copies of a book, the book table contains a normalized representation of the book names.

### Backend

There are 3 source modules:
	- db.js - database connection code
	- index.js - code to start the server
	- app.js - api code
	
The index and app modules were seperated to facilitate unit testing of the apis.

There are 3 API functions arequired:

Get all Books
Check out a book
Return a book

All API function calls have CORS disabled for now to fix security errors.

The return and checkout post methoods have similar function, so both call a common function to ease maintenance.

### frontend

Important source modules are:

- index.js - Start of the application
- app.js - Routing to Books or Edit sceens
- books.js - All Books screen
- edit.js - Edit screen

The books screen uses paging instead of showing all books for user readability. 

There is search functionality to narrow the display options. For performance reasons, the search does not reduce options per key press, but with the "Search" button.

State is managed with useState and useEffect hooks to optimize normal asynchronous operation where database access is minimized.

The Edit screen is used to show both return and checkout statuses since the functionality is almost identical.

## Setup

Setuo consists of the database, frontend, and backend components. 

### Database`

Run the attached lms.sql script to create the local MySQL database named lms.

### source`

The node/express backend and React projects are subfolders of the library-management-system folder. Download the source from GitHub. Execute "npm install" in both frontend and backend to resolve dependencies. Modify the db.js file in the backend folder to include the correct database access information.

## Running the application

### backend

Traverse to the root folder of the backend repository. Then, execute "node index.js" 

### frontend

Traverse to the root folder of the frontend repository. Then, execute "npm start" 

## Tests

Unit tests were developed for both frontend and backend using Jest.

### backend

Traverse to the root folder of the backend repository. Then, execute "npm test" 

### frontend

Traverse to the root folder of the frontend repository. Then, execute "npm test". Note that the React tests are not working because of a compatibility issue with react-router-dom component. In the interest of time, this is on the todo list

## Todo

- Unit testing for the frontend application is not working. There is an incompatibility with the react-router-dom component.
- Expand unit testing for the frontend application to check UI elements after rendering <Books/> and <Edit/> main elements.
- Expand unit testing for the backend application. Perhaps add insert and delete api calls, so a system test cpiuld be to:
	- insert a known book
	- check if the book is there by examining the get results.
	- checkout the book
	- check the status of the book with the get results.
	- return the book
	- check the status of the book with the get results.
	- delete the book
- Improve on error handling in both backend and frontend applications.
- Further modularize Edit and Books by creating an api module and moving the api access functionality to this module.

