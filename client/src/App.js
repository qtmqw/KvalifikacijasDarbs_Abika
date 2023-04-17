import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-range-slider-input/dist/style.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserData } from './API/Users';
import Navbar from './components/Navbar';
import Sidebar from '../src/admin/AdminSidebar'
import Sakums from './pages/Sakums';
import ParMums from './pages/Par_mums';
import Sortiments from './pages/Sortiments';
import Kontakti from './pages/Kontakti';
import Registreties from './components/Registreties';
import Pieslegties from './components/Pieslegties';
import ParolesMaina from './pages/ParolesMaina';
import Profils from './pages/Profils';
import Grozs from './pages/Cart';
import UserDetails from './components/userDetails';
import AdminPage from '../src/admin/AdminPage';
import AdminUserBoard from '../src/admin/AdminUserBord';
import AdminProducts from '../src/admin/AdminProducts'
import Footer from './components/Footer';
import Product from './pages/Product';
import NF from './components/404';


import PD from './product/prod'
import Add from './product/add'
function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    UserData({ setAdmin, setUserData });
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(loggedIn);
  }, []);

  return (
    <div className='font-kumbh-sans flex flex-col min-h-[100vh]'>

      {!isAdmin && <Navbar />}
      {isAdmin && <Sidebar />}
      <ToastContainer />
      <div className=' flex-grow-1'>
        <Routes>
          <Route path="/" element={<Sakums />} />
          <Route path="/Par_mums" element={<ParMums />} />
          <Route path="/Sortiments" element={<Sortiments />} />
          <Route path="/Kontakti" element={<Kontakti />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/Registreties" element={loggedIn ? (<Sakums />) : (<Registreties />)} />
          <Route path="/Pieslegties" element={loggedIn ? (<Sakums />) : (<Pieslegties />)} />
          <Route path="/ParolesMaina" element={loggedIn ? (<Sakums />) : (<ParolesMaina />)} />
          <Route path="/Profils" element={loggedIn ? (<Profils />) : (<Sakums />)} />
          <Route path="/Grozs" element={<Grozs />} />
          <Route path="/UserDetails" element={loggedIn ? (<UserDetails />) : (<Sakums />)} />
          <Route path="/AdminPage" element={isAdmin ? (<AdminPage />) : (<NF />)} />
          <Route path="/AdminUserBoard" element={isAdmin ? (<AdminUserBoard />) : (<NF />)} />
          <Route path="/AdminProducts" element={isAdmin ? (<AdminProducts />) : (<NF />)} />
          <Route path="/*" element={<NF />} />

          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/PD" element={<PD />} />
          <Route path="/Add" element={<Add />} />
        </Routes>
      </div>

      {!isAdmin && <Footer className="mt-auto" />}
    </div>
  );
}

export default App;