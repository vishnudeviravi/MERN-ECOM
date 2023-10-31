import Sidebar from '../../Components/Sidebar';
import { Button, Table } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import './category.css';

const SubCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const categoryCol = [
    {
      title: 'ID',
      dataIndex: '_id',
      render: id => <Link to={`/seller/add-subcategory/${id}`}>{id}</Link>,
    },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Image',
      dataIndex: 'image',
      render: text => (
        <img src={text} className="category-img" crossOrigin="anonymous" />
      ),
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
      await axios.delete(`http://localhost:5500/sub-category/${id}`);
      fetchCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5500/sub-category');
      setLoading(false);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const onClick = () => {
    navigate('/seller/add-subcategory');
  };

  return (
    <div className="category">
      <Sidebar />
      <div className="category-container">
        <h1>Sub Category</h1>
        <div className="category-btns">
          <Button onClick={onClick} type="primary">
            ADD SUBCATEGORY
          </Button>
        </div>
        <Table
          className="category-table"
          columns={categoryCol}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default SubCategory;
