import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import Navbar from "./Navbar";
import class1 from "./images/class1.jpg";
import class2 from "./images/class2.jpeg";
import class3 from "./images/class3.jpeg";
import class4 from "./images/class4.jpeg";
import class5 from "./images/class5.jpg";
import class6 from "./images/class6.jpg";
import class7 from "./images/class7.jpeg";
import class8 from "./images/class8.jpeg";
import class9 from "./images/class9.jpg";
import class10 from "./images/class10.jpg";
import class11 from "./images/class11.jpg";
import class12 from "./images/class12.jpg";
import CloseIcon from "@mui/icons-material/Close";

const galleryImages = [
  { title: "Gallery Image 1", image: class1 },
  { title: "Gallery Image 2", image: class2 },
  { title: "Gallery Image 3", image: class3 },
  { title: "Gallery Image 4", image: class4 },
  { title: "Gallery Image 5", image: class5 },
  { title: "Gallery Image 6", image: class6 },
  { title: "Gallery Image 7", image: class7 },
  { title: "Gallery Image 8", image: class8 },
  { title: "Gallery Image 9", image: class9 },
  { title: "Gallery Image 10", image: class10 },
  { title: "Gallery Image 11", image: class11 },
  { title: "Gallery Image 12", image: class12 },
];

const Gallery = () => {
  const [openImage, setOpenImage] = useState(null);

  const handleClickOpen = (image) => {
    setOpenImage(image);
  };

  const handleClose = () => {
    setOpenImage(null);
  };

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
              <Card
                sx={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                  },
                }}
              >
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
                  onClick={() => handleClickOpen(image.image)}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={!!openImage} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={openImage}
            alt="Enlarged"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 8,
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
