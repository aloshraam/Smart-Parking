import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Booking from "./pages/Booking";
import ParkingArea from './pages/ParkingArea';

function App() {
  return (
    <>
      <Header/>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth insideRegister={true} />} />
        <Route path='/booking' element={<Booking/>} />
        <Route path='/parkingarea' element={<ParkingArea/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;