import { Input, Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const loginCustomer = async () => {
    setLoading(true);
    try {
      const user = await axios.post(
        'http://localhost:5500/customer/login',
        data
      );
      const customerId = user.data.customerId;
      const token = user.data.token;
      localStorage.setItem('customerId', customerId);
      localStorage.setItem('token', token);
      console.log(user);
      setLoading(false);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onClick = () => {
    loginCustomer();
  };

  return (
    <div className="customer-login">
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

export default CustomerLogin;
