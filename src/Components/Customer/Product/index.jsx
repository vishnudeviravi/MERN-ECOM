import { Card, Button } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import './product.css';
import { ToastContainer, toast } from 'react-toastify';

const Product = props => {
  const [customer, setCustomer] = useState({});

  const getCustomerById = async () => {
    const customerId = localStorage.getItem('customerId');
    console.log(customerId);
    const response = await axios.get(
      `http://localhost:5500/customer/${customerId}`
    );
    setCustomer(response.data);
  };

  const onBuy = async () => {
    const customerId = localStorage.getItem('customerId');
    const sellerId = props.sellerId;
    const products = [
      {
        productId: props.id,
        quantity: 1,
      },
    ];
    await getCustomerById();
    const address = customer.address;

    await axios.post('http://localhost:5500/order', {
      customerId: customerId,
      sellerId: sellerId,
      products: products,
      shippingAddress: address,
    });
    toast('Order placed');
  };

  return (
    <Card
      hoverable
      style={{ width: 340 }}
      cover={<img alt="example" src={props.thumbnailImage} />}
    >
      <div className="content">
        <div className="price">
          <h2>{props.price}</h2>
          <h3>discount: {props.discount}</h3>
        </div>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <div className="btns">
          <Button onClick={onBuy}>Buy</Button>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
};

export default Product;
