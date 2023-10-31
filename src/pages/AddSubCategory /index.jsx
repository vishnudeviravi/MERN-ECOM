import { useEffect, useState } from 'react';
import { Input, Button, Upload, Select } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

import './add-category.css';

const AddSubCategory = () => {
  const [data, setData] = useState({ image: '', name: '', categoryId: '' });
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/sub-category/${id}`
      );
      setData({
        ...data,
        image: response.data.image,
        name: response.data.name,
        categoryId: response.data.categoryId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);

  const fetchCategory = async () => {
    try {
      const response = await axios.get('http://localhost:5500/category');
      console.log(response.data);

      const actualData = response.data.map(item => {
        return { label: item.name, value: item._id };
      });

      setCategory(actualData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategory();
    if (id) {
      getCategory();
    }
  }, []);

  const navigate = useNavigate();

  const onChange = (e, key) => {
    if (key == 'categoryId') {
      setData({ ...data, categoryId: e });
    } else {
      setData({ ...data, [key]: e.target.value });
    }
  };

  const addCategory = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5500/sub-category', data);
      setLoading(false);
      navigate('/seller/subcategory');
    } catch (e) {
      console.log(e);
    }
  };

  const editCategory = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5500/sub-category/${id}`, data);
      setLoading(false);
      navigate('/seller/subcategory');
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
      <h1> {id ? 'EDIT SUBCATEGORY' : 'ADD SUBCATEGORY'}</h1>

      <div className="form">
        <label>Name</label>
        <Input
          onChange={e => onChange(e, 'name')}
          size="large"
          placeholder="Name"
          value={data.name}
        />
        <label>Category</label>

        <Select
          defaultValue="category"
          className="category-select"
          value={data.categoryId}
          onChange={e => onChange(e, 'categoryId')}
          options={category}
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
            {id ? 'UPDATE SUBCATEGORY' : 'ADD SUBCATEGORY'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
