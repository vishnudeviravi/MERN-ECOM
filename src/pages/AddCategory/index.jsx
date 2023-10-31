import { useEffect, useState } from 'react';
import { Input, Button, Upload } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

import './add-category.css';

const AddCategory = () => {
  const [data, setData] = useState({ image: '', name: '' });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5500/category/${id}`);
      setData({
        ...data,
        image: response.data.image,
        name: response.data.name,
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, []);

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const addCategory = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5500/category', data);
      setLoading(false);
      navigate('/seller/category');
    } catch (e) {
      console.log(e);
    }
  };

  const editCategory = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5500/category/${id}`, data);
      setLoading(false);
      navigate('/seller/category');
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = () => {
    if (id) {
      editCategory();
    } else {
      addCategory();
    }
  };

  const onUploadChange = info => {
    if (info.file.status === 'done') {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };

  return (
    <div className="add-category">
      <h1> {id ? 'EDIT CATEGORY' : 'ADD CATEGORY'}</h1>

      <div className="form">
        <label>Name</label>
        <Input
          onChange={e => onChange(e, 'name')}
          size="large"
          placeholder="Name"
          value={data.name}
        />
        <div className="upload-div">
          <label>Image</label>

          <Upload
            name="file"
            action="http://localhost:5500/upload"
            onChange={onUploadChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </div>

        <div className="add-category-btn">
          <Button
            onClick={onClick}
            className="category-btn"
            size="large"
            type="primary"
            loading={loading}
          >
            {id ? 'UPDATE CATEGORY' : 'ADD CATEGORY'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
