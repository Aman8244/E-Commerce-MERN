import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './pages/Header';
import Home from './pages/home'
import Cart from './pages/cart';
import UserProfile from './pages/profile';
import LoginPage from './pages/login';
import ProductPage from './pages/ProductPage';
import { Footer } from './component';
import SearchItems from './pages/SearchItems';
import Filter from './pages/Filters';
import LoginAndSecurity from './pages/Login&Security';
import ChangeUserData from './pages/ChangeUserData';
import OrderHistory from './pages/OrderHistory';
import Explore from './pages/explore';

function App() {
  return (
   <BrowserRouter>
      <Routes>
      <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/search' element={<SearchItems/>}/>
          <Route path='/filtered' element={<Filter/>}/>
          <Route path='/LoginAndSecurity' element={<LoginAndSecurity/>}/>
          <Route path="/LoginAndSecurity/change" element={<ChangeUserData/>}/>
          <Route path='/profile/orderhistory' element={<OrderHistory/>}/>
          <Route path='/explore' element={<Explore/>}/>
      </Route>
      <Route path='/product' element={<Header />}>
        <Route path=':productId' element = {<ProductPage/>}/>
      </Route>
      </Routes>
      <Footer/>
   </BrowserRouter>
  )
}

export  default App;
