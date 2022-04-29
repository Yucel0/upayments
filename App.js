import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./Components/Home";
import ProductDetail from "./Components/Product_Detail";
import AddProduct from "./Components/Add_Product";
import Navbar from './Components/Navbar';
import "./css/main.min.css";

export default function App() {
  return (
    <main className='container'>
    <Navbar/>
    <Routes>
      <Route path='/' index={true} element={<Home/>}/>
      <Route path='/productDetail/:id' element={<ProductDetail/>}/>
      <Route path='/addProduct' element={<AddProduct/>}/>
    </Routes>
    </main>
  )
}
