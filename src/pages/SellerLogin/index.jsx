import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './sellerlogin.css';

const SellerLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const loginSeller = async () => {
    setLoading(true);
    try {
      const user = await axios.post('http://localhost:5500/seller/login', data);
      const sellerId = user.data.sellerId;
      const token = user.data.token;
      localStorage.setItem('sellerId', sellerId);
      localStorage.setItem('token', token);
      console.log(user);
      setLoading(false);
      navigate('/seller/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onClick = () => {
    loginSeller();
  };

  return (
    <div className="seller-login">
      <h1>ECOM APP</h1>
      <div className="form">
        <label>Email:</label>
        <Input
          onChange={e => onChange(e, 'email')}
          size="large"
          placeholder="Email"
        />
        <label>Password:</label>

        <Input.Password
          onChange={e => onChange(e, 'password')}
          size="large"
          placeholder="Password"
        />
        <Button
          onClick={onClick}
          className="login-btn"
          size="large"
          type="primary"
          block
          loading={loading}
        >
          LOG IN
        </Button>

        <p>Not a member? Sign Up</p>
      </div>
    </div>
  );
};

export default SellerLogin;
