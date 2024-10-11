import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, IconButton, TablePagination } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ItemDetails = ({ godownId, godownName }) => {
  const [items, setItems] = useState([]); // State to store the fetched items
  const [loading, setLoading] = useState(true); // Loading state
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [selectedImage, setSelectedImage] = useState(''); // State to store the selected image URL

  const [page, setPage] = useState(0); // State to track current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // State to control rows per page

  // Fetch items based on godownId
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/items/godown/${godownId}`); // Fetch items based on godownId
        setItems(response.data); // Store the fetched items
      } catch (error) {
        console.error("Error fetching items:", error); // Handle errors
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    if (godownId) {
      fetchItems();
    }
  }, [godownId]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true); // Open modal on image click
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
    setSelectedImage(''); // Clear selected image
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to first when changing rows per page
  };

  if (loading) return <Typography>Loading...</Typography>; // Loading state

  if (!items.length) return <Typography variant="h3" sx={{ mt: 10, color: 'white' }}>No items found in this godown.</Typography>; // Handle no items case

  return (
    <Box sx={{ p: 2, mt: 8 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 2, 
          color: 'white', 
          textAlign: 'center',  // Centers the text
          width: '100%',        // Ensures it takes the full width
        }}
      >
        {godownName}
      </Typography> {/* Display the godown name */}
      
      <TableContainer component={Paper}  sx={{ height: '60%', overflowY: 'auto', scrollBehavior: 'smooth' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color:'white' }}>Name</TableCell>
              <TableCell sx={{ color:'white' }}>Category</TableCell>
              <TableCell sx={{ color:'white' }}>Quantity</TableCell>
              <TableCell sx={{ color:'white' }}>Price</TableCell>
              <TableCell sx={{ color:'white' }}>Status</TableCell>
              <TableCell sx={{ color:'white' }}>Brand</TableCell>
              <TableCell sx={{ color:'white' }}>Material</TableCell>
              <TableCell sx={{ color:'white' }}>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item.item_id}>
                <TableCell>{item.name ? item.name : "N/A"}</TableCell>
                <TableCell>{item.category ? item.category : "N/A"}</TableCell>
                <TableCell>{item.quantity !== undefined ? item.quantity : "N/A"}</TableCell>
                <TableCell>{item.price ? `$${item.price}` : "N/A"}</TableCell>
                <TableCell sx={{ color: item.status === 'in_stock' ? 'green' : 'red' }}>
                  {item.status ? item.status : "N/A"}
                </TableCell>
                <TableCell>{item.brand ? item.brand : "N/A"}</TableCell>
                <TableCell>{item.attributes?.material ? item.attributes.material : "N/A"}</TableCell>
                <TableCell>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                      onClick={() => handleImageClick(item.image_url)} // Click event to open modal
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={items.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Modal for displaying enlarged image */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
          <img src={selectedImage} alt="Enlarged" style={{ width: '100%', height: 'auto' }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

ItemDetails.propTypes = {
  godownId: PropTypes.string.isRequired, // Expect godownId as a prop
  godownName: PropTypes.string.isRequired, // Expect godownName as a prop
};

export default ItemDetails;
