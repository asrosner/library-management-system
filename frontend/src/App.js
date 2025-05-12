import './styles.css';
import Books from "./books";
import Edit from "./edit";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
		<div className="App">
			<div class="heading">LMS</div>
			<Routes>
			  <Route exact path="/" element={<Books/>}/>
			  <Route exact path="/books" element={<Books/>}/>
			  <Route exact path="/edit" element={<Edit/>}/>
			</Routes>		
		</div>
    </BrowserRouter>
  );
}

export default App;
