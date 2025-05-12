import React, { useState, useEffect } from 'react';
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { useNavigate } from 'react-router-dom';

//table fields
const tableHead = {
  id: "Id",
  name: "Book Name",
  borrowed: "borrowed"
};

//borrrowed field
const borrowedField = "borrowed";

//Get all books
function GetData() {
  const [state, setState] = useState();	//data from get
  
  //get data from api
  useEffect(() => {
	const dataFetch = async () => {
	  const data = await (await fetch('http://localhost:3000/api/books')).json();
	  setState(data);
	};

	//do request
	dataFetch();
  }, []);

  //return the data
  return { data: state };
} 

//show all books
const Books = () => {
  const countPerPage = 10;	//books per page
  const [value, setValue] = useState("");	//search value
  const [currentPage, setCurrentPage] = useState(1);	//current page
  const [currentPageData, setCurrentPageData] = useState([]);	//books on current page
  const [inputBoxValue, setInputBoxValue] = useState("");	//text in seach box
  const [currentDataLength, setCurrentDataLength] = useState(0);	//total number of books considering search filter
  
  const { data } = GetData();	//retrieve books
  const navigate = useNavigate();	//for future page navigation

  //table header
  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  //edit book status
  const bookRowClick = (rowData) => {
    navigate('/Edit', { state: rowData });
  };

  //rows in table
  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
		var val = key[keyD];
		if (keyD == borrowedField)	//api returns 0 or 1, display true or false instead
		{
			val = (key[keyD] == 0 ? 'false' : 'true');	
		}
      return <td key={i}>{val}</td>;	//table column
    });

    return <tr key={index} onClick={() => bookRowClick(rowData.key)}>{columnData}</tr>;	//return table row
  };

  //get table data
  const tableData = () => {	
	//all table rows from search filtered data
    return currentPageData.map((key, index) => tableRows({ key, index }));
  };
  
  //filter the data per the search box
  const filteredData = () => {
      const query = value.toLowerCase();
      const filtered = cloneDeep(
        data.filter(item => item.name.toLowerCase().indexOf(query) > -1)
      );
	  
	  //store number of rows for pagination display
	  setCurrentDataLength(filtered.length);
	  
	  //filtered data
	  return filtered;
  }
  
  //after search, display first page
  const searchData = () => {
      setCurrentPageData(filteredData().slice(0, countPerPage));
  };

  //update the page considering page and search filter
  const updatePage = p => {
	//set the current page
    setCurrentPage(p);
	
	//get rows for the page considering the search filter
    const to = countPerPage * p;
    const from = to - countPerPage;
	setCurrentPageData(cloneDeep(filteredData().slice(from, to)));
  };
  
  //execute seach
  const searchClick = () => {
	  //set the search value to initiate useEffect
      setValue(inputBoxValue);
  };

  //change page or search
  useEffect(() => {
	if (data)
	{
		if (!value) {
		  updatePage(1);
		} else {
		  searchData();
		}
	}
  }, [value, data]);

  // show loading state while waiting for the data
  if (!data) 
	  return 'loading';
  else
	  return (
		<>
		  <div class="search">
			<input
			  placeholder="Search Book Name"
			  value={inputBoxValue}
			  onChange={e => setInputBoxValue(e.target.value)}
			/>
			<button onClick={searchClick}>Search</button>
			<label>Click on row to edit</label>
		  </div>
		  <table>
			<thead>
			  <tr>{headRow()}</tr>
			</thead>
			<tbody className="trhover">{tableData()}</tbody>
		  </table>
		  <Pagination
			pageSize={countPerPage}
			onChange={updatePage}
			current={currentPage}
			total={currentDataLength}
		  />
		</>
	  );
};
export default Books;
