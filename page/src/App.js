import logo from './logo.svg';
import './App.css';
import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/fontawesome/css/all.min.css';
import UserList from './User/UserList'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DetailScreen from './User/DetailScreen'
import PhotoScreen from './User/PhotoScreen'

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path = "/" element={<UserList/>}/>
            <Route path = "/details/:id" element={<DetailScreen/>}/>
            <Route path = "/album/:id" element={<PhotoScreen/>}/>

          </Routes>
      </BrowserRouter>
  );
}

export default App;
