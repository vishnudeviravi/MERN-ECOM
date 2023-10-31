import Frame from '../../Components/Frame';
import { Button, Table } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import './orders.css';

const Order = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const orderCol = [
    {
      title: 'ID',
      dataIndex: '_id',
      render: id => <Link to={`/seller/add-order/${id}`}>{id}</Link>,
    },
    {
      title: 'Customer',
      dataIndex: 'customerId',
      render: customer => <p>{customer.name}</p>,
    },

    {
      title: 'Product',
      dataIndex: 'products',
      render: product => <p>{product[0].productId}</p>,
    },

    {
      title: 'Delete',
      dataIndex: '_id',
      render: id => (
        <i onClick={() => onDelete(id)} class="fa-solid fa-trash delete"></i>
      ),
    },
  ];

  const onDelete = async id => {
    try {
      await axios.delete(`http://localhost:5500/order/${id}`);
      fetchOrder();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const sellerId = localStorage.getItem('sellerId');
      const response = await axios.get(
        `http://localhost:5500/order?sellerId=${sellerId}`
      );
      setLoading(false);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const onClick = () => {
    navigate('/seller/add-order');
  };

  return (
    <Frame heading="Order">
      <Table className="order-table" columns={orderCol} dataSource={data} />
    </Frame>
  );
};

export default Order;
