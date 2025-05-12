import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//edit status of book
const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = location.state;

  //possible states of operation
  const StatusState  = {
    Display: "display",
    Post: "post",
    Redirect: "redirect"
  }
  
  const [status, setStatus] = useState(StatusState.Display);	//initial status
  const [postResult, setPostResult] = useState();	//result from api

  //change status for book
  const borrowedClick = () => {
	  //get ready to post
	  setStatus(StatusState.Post);
  };

  //cancel status change
  const cancelClick = () => {
	  //get ready to redirect
	  setStatus(StatusState.Redirect);
  };

  //post status change
  const dataFetch = async (id) => {
	const data = await (await fetch(
		'http://localhost:3000/api/' + (Number(params.borrowed) === 0 ? 'checkout' : 'return'),
		{	method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({id})
		})).json();
		
	setPostResult(data);
	};

  //process state status
  useEffect(() => {
    switch(status) {
	  case StatusState.Post:
	  
		if (!postResult) {
			//execute api if no result yet
			dataFetch(params.id);
		}
		else {
			//already posted, redirect
			setStatus(StatusState.Redirect);
		}
		break;
	  case StatusState.Redirect:
		//redirect home
		navigate('/');
		break;
    }
  }, [status, postResult]);

  return (
		<>
		<div>
		  <p>ID: {params.id}</p>
		  <p>Name: {params.name}</p>
		  <p>
			<button onClick={borrowedClick}>{params.borrowed === 0 ? "Borrow" : "Return"}</button>
			<button onClick={cancelClick}>Cancel</button>
		  </p>
		</div>
		</>
	  );
};

export default Edit;
