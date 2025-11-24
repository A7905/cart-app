
import NavBar from "./components/NavBar";
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Checkout from "./pages/Checkout";

function App() {
  

  return (

      <div  className="">

          <div className="bg-slate-900">
            <NavBar/>
          </div>

          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/success" element={<Success/>} />
            <Route path="/" element={(
            <div className="flex justify-center items-center flex-col text-center mt-60">
            <div className="max-w-2xl w-full  p-8 mt-20">
              <h1 className="text-3xl font-bold">Welcome</h1>
              <p className="mt-4 text-gray-600">Use the navigation to go to <Link className="text-blue-800" to="/login">Login</Link> or <Link className="text-blue-800" to="/signup">Signup</Link> pages.</p>
            </div>
            </div>
            )} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
      </div>
   
  )
}

export default App
