import { Routes, Route } from 'react-router-dom';
import SellerLogin from './pages/SellerLogin';
import SellerDashboard from './pages/SellerDashboard';
import Category from './pages/Category';
import AddCategory from './pages/AddCategory';
import SubCategory from './pages/SubCategory ';
import AddSubCategory from './pages/AddSubCategory ';
import CustomerLogin from './pages/Customer/Login';
import { Navigate } from 'react-router-dom';
import Home from './pages/Customer/Home';
import Order from './pages/Orders';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const Token = ({ children }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return <>{children}</>;
    } else return <Navigate to="/seller/login" />;
  };

  return (
    <>
      <Routes>
        {/* Customer */}
        <Route path="/" element={<Home />} />

        {/* Seller */}

        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route
          path="/seller/dashboard"
          element={
            <Token>
              <SellerDashboard />
            </Token>
          }
        />
        <Route
          path="/seller/category"
          element={
            <Token>
              <Category />
            </Token>
          }
        />
        <Route
          path="/seller/add-category"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/add-category/:id"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/subcategory"
          element={
            <Token>
              <SubCategory />
            </Token>
          }
        />
        <Route
          path="/seller/add-subcategory"
          element={
            <Token>
              <AddSubCategory />
            </Token>
          }
        />
        <Route
          path="/seller/add-subcategory/:id"
          element={
            <Token>
              <AddSubCategory />
            </Token>
          }
        />
        <Route
          path="/seller/order"
          element={
            <Token>
              <Order />
            </Token>
          }
        />
      </Routes>
    </>
  );
}

export default App;
