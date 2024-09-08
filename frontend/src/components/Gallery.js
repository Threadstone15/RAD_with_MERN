import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import Navbar from "./Navbar";

const galleryImages = [
  {
    title: "Gallery Image 1",
    image: "https://via.placeholder.com/600x400?text=Image+1",
  },
  {
    title: "Gallery Image 2",
    image: "https://via.placeholder.com/600x400?text=Image+2",
  },
  {
    title: "Gallery Image 3",
    image: "https://via.placeholder.com/600x400?text=Image+3",
  },
  {
    title: "Gallery Image 4",
    image: "https://via.placeholder.com/600x400?text=Image+4",
  },
  {
    title: "Gallery Image 5",
    image: "https://via.placeholder.com/600x400?text=Image+5",
  },
  {
    title: "Gallery Image 6",
    image: "https://via.placeholder.com/600x400?text=Image+6",
  },
  {
    title: "Gallery Image 7",
    image: "https://via.placeholder.com/600x400?text=Image+7",
  },
  {
    title: "Gallery Image 8",
    image: "https://via.placeholder.com/600x400?text=Image+8",
  },
  {
    title: "Gallery Image 9",
    image: "https://via.placeholder.com/600x400?text=Image+9",
  },
  {
    title: "Gallery Image 10",
    image: "https://via.placeholder.com/600x400?text=Image+10",
  },
  {
    title: "Gallery Image 11",
    image: "https://via.placeholder.com/600x400?text=Image+11",
  },
  {
    title: "Gallery Image 12",
    image: "https://via.placeholder.com/600x400?text=Image+12",
  },
];

const Gallery = () => {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Box my={4} textAlign="center">
          <Typography variant="h2" component="h1" gutterBottom>
            Photo Gallery
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Explore our collection of images showcasing various events and
            activities.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {galleryImages.map((image, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  alt={image.title}
                  height="200"
                  image={image.image}
                  style={{
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Gallery;
