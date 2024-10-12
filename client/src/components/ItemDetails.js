import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogContent,
  IconButton,
  TablePagination,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ItemDetails = ({ godownId, godownName }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `https://tree-view-application.onrender.com/api/items/godown/${godownId}`
        );
        setItems(response.data);
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (godownId) {
      fetchItems();
      setSearchQuery("");
    }
  }, [godownId]);

  useEffect(() => {
    const results = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchQuery, items]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImage("");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, mt: { xs: 4, sm: 8 }, width: "100%" }}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2 }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#1A1A1A",
            fontSize: { xs: "1.2rem", sm: "1.8rem" },
            fontWeight: "bold",
          }}
        >
          {godownName}
        </Typography>

        <TextField
          label="Search items"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: "white",
            width: { xs: "100%", sm: "400px" },
            mt: { xs: 2, sm: 0 },
          }}
        />
      </Grid>

      <TableContainer
        component={Paper}
        sx={{
          height: filteredItems.length === 0 ? "20vh" : "auto",
          overflowY: "auto",
          scrollBehavior: "smooth",
          borderRadius: "16px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Category
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Brand
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Material
              </TableCell>
              <TableCell
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  backgroundColor: "hsl(218, 30%, 85%)",
                }}
              >
                Image
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              filteredItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.item_id}>
                    <TableCell>{item.name ? item.name : "N/A"}</TableCell>
                    <TableCell>
                      {item.category ? item.category : "N/A"}
                    </TableCell>
                    <TableCell>
                      {item.quantity !== undefined ? item.quantity : "N/A"}
                    </TableCell>
                    <TableCell>
                      {item.price ? `$${item.price}` : "N/A"}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: item.status === "in_stock" ? "green" : "red",
                      }}
                    >
                      {item.status ? item.status : "N/A"}
                    </TableCell>
                    <TableCell>{item.brand ? item.brand : "N/A"}</TableCell>
                    <TableCell>
                      {item.attributes?.material
                        ? item.attributes.material
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleImageClick(item.image_url)}
                        />
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>

        <Box
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: "white",
            zIndex: 1,
            height: "50px",
          }}
        >
          {" "}
          {/* Adjust the height */}
          <TablePagination
            component="div"
            count={filteredItems.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Enlarged"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

ItemDetails.propTypes = {
  godownId: PropTypes.string.isRequired,
  godownName: PropTypes.string.isRequired,
};

export default ItemDetails;
