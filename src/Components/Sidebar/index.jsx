import { NavLink, useNavigate } from 'react-router-dom';

import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem('sellerId');
    localStorage.removeItem('token');
    navigate('/seller/login');
  };
  return (
    <div className="sidebar">
      <div className="logo-section">
        <i class="fa-solid fa-cart-shopping fa-bounce"></i>
        <h1>ECOMAPP</h1>
      </div>

      <h2 className="section-heading">Dashboard</h2>
      <div className="dashboard-section">
        <NavLink className="sidebar-link" to="/seller/dashboard">
          <i class="fa-solid fa-table-columns"></i>
          DashBoard
        </NavLink>
        <NavLink className="sidebar-link" to="/seller/dashboard">
          <i class="fa-solid fa-clipboard"></i>
          Inventory
        </NavLink>
        <NavLink className="sidebar-link" to="/seller/category">
          <i class="fa-solid fa-check-to-slot"></i>
          Category
        </NavLink>
        <NavLink className="sidebar-link" to="/seller/subcategory">
          <i class="fa-solid fa-mobile"></i>
          Sub Category
        </NavLink>
        <NavLink className="sidebar-link" to="/seller/order">
          <i class="fa-solid fa-truck"></i>
          Orders
        </NavLink>
      </div>
      <h2 className="section-heading">Settings</h2>

      <div className="dashboard-section">
        <NavLink className="sidebar-link" to="/seller/dashboard">
          <i class="fa-solid fa-user"></i>
          Account
        </NavLink>
        <p className="sidebar-link" onClick={onClick}>
          <i class="fa-solid fa-right-from-bracket"></i>
          Signout
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
