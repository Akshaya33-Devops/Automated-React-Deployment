import './App.css';
import Cart from './components/Cart';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {Routes,Route} from 'react-router-dom'
import NotFound from './components/NotFound';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Signup from './components/Signup';
import Login from './components/Login';
import CheckoutSuccess from './components/CheckoutSuccess';
function App() {
  
  return (
    <div className="App">
<ToastContainer/>
    <Navbar/>
     <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/cart' element={<Cart/>}/> 
        <Route exact path='/checkout-success' element={<CheckoutSuccess/>}/>   
       
        <Route exact path='/login' element={<Login/>}/>   
        <Route exact path='/signup' element={<Signup/>}/> 
        <Route exact path='*' element={<NotFound/>}/>   
    </Routes> 
    </div>
  );
}

export default App;
