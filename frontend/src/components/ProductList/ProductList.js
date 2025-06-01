import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/quries";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";

const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">Error: {error.message}</Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <Grid container spacing={4}>
        {data.products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={`http://localhost:4000${product.image_url}`}
                alt={product.name}
                sx={{
                  objectFit: "contain", // Show the full image, no cropping
                  backgroundColor: "#fff", // Optional: Add a white background
                  padding: "8px", // Optional: Add padding around the image
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="subtitle1" color="green" mt={1}>
                  {product.price} €
                </Typography>
              </CardContent>
              <Box p={2}>
                <Button variant="contained" color="warning" fullWidth>
                  Add to Cart
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
