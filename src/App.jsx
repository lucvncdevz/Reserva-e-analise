import { Routes, Route, Link } from "react-router-dom";
import Login from "./login.jsx";
import './App.css';

function App (){
  return(
<div> 
 <nav>

        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        
      </Routes>

</div>
  )
}

export default App;