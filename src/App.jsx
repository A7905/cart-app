
import NavBar from "./components/NavBar";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  

  return (

      <div  className="">

          <div className="bg-slate-900">
            <NavBar/>
          </div>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
      </div>
   
  )
}

export default App
