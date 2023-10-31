import Navbar from '../../../Components/Customer/Navbar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../../../Components/Customer/Product';
import { ToastContainer, toast } from 'react-toastify';
import './home.css';

const Home = () => {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);

  const fetchCategory = async () => {
    const response = await axios.get('http://localhost:5500/category');
    setCategory(response.data);
  };
  const fetchProduct = async () => {
    const response = await axios.get('http://localhost:5500/product');
    setProduct(response.data);
  };

  const fetchProductWithCat = async catId => {
    const response = await axios.get(
      `http://localhost:5500/product?category=${catId}`
    );
    setProduct(response.data);
  };

  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);

  console.log(product);

  return (
    <div className="home">
      <ToastContainer />
      <Navbar />
      <div className="home-img"></div>
      <div className="home-category">
        <div className="home-category-container">
          {category.map(item => (
            <div
              onClick={() => {
                fetchProductWithCat(item._id);
              }}
              className="img-div"
            >
              <img src={item.image} alt="" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="product-container">
        {product.map(item => (
          <Product
            id={item._id}
            thumbnailImage={item.thumbnailImage}
            name={item.name}
            description={item.description}
            price={item.price}
            discount={item.discount}
            sellerId={item.sellerId}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
