import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const ItemDetails = ({ itemId }) => {
  const [item, setItem] = useState(null); // State to store the fetched item
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch item details based on itemId
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/items/${itemId}`); // Adjust URL as necessary
        setItem(response.data);
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItemDetails();
    }
  }, [itemId]);

  if (loading) return <Typography>Loading...</Typography>; // Loading state

  if (!item) return <Typography>No item found.</Typography>; // Handle no item case

  return (
    <Box>
      <Typography variant="h4">{item.name}</Typography>
      <Typography variant="body1">Category: {item.category}</Typography>
      <Typography variant="body1">Quantity: {item.quantity}</Typography>
      <Typography variant="body1">Price: ${item.price}</Typography>
      <Typography variant="body1">Brand: {item.brand}</Typography>
      <Typography variant="body1">Status: {item.status}</Typography>
      <Typography variant="body1">Material: {item.attributes.material}</Typography>
      <Typography variant="body1">Warranty: {item.attributes.warranty_years} years</Typography>
      {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '200px' }} />} {/* Optional image */}
    </Box>
  );
};

ItemDetails.propTypes = {
  itemId: PropTypes.string.isRequired, // Expect itemId as a prop
};

export default ItemDetails;
