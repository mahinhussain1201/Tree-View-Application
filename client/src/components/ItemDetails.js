import React from 'react';

const ItemDetails = ({ item }) => {
  if (!item) return <div>Select an item to see details</div>;

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Category: {item.category}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${item.price}</p>
      <p>Brand: {item.brand}</p>
      <p>Status: {item.status}</p>
      <img src={item.image_url} alt={item.name} style={{ width: '200px' }} />
    </div>
  );
};

export default ItemDetails;
