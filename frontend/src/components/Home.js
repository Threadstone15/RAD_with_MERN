import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Navbar from "./Navbar";
import AboutHome from "./AboutHome";
import ContactHome from "./ContactHome";
import students1 from "./images/students1.jpg";
import students2 from "./images/students2.jpg";
import students3 from "./images/students3.jpeg";

const features = [
  {
    title: "Grade 3-5 Students",
    description: `
      <ul>
        <li>Sinhala</li>
        <li>English</li>
        <li>Reading Comprehension</li>
        <li>Critical Thinking</li>
        <li>Elocution</li>
        <li>Drawing</li>
      </ul>
    `,
    image: students1,
  },
  {
    title: "Grade 6-9 Students",
    description: `
      <ul>
        <li>Mathematics</li>
        <li>Science</li>
        <li>IT</li>
        <li>Spoken English</li>
        <li>Tamil</li>
        <li>English</li>
      </ul>
    `,
    image: students2,
  },
  {
    title: "Grade 10-11 Students",
    description: `
      <ul>
        <li>Mathematics</li>
        <li>Science</li>
        <li>English</li>
        <li>Commerce</li>
        <li>Sinhala</li>
        <li>History</li>
      </ul>
    `,
    image: students3,
  },
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          background: "linear-gradient(to bottom, #b3e5fc, white)", // Light blue to white gradient
          minHeight: "100vh",
          paddingTop: 4,
          paddingBottom: 4,
          color: "#333", // Default text color
        }}
      >
        <Container maxWidth="lg">
          <Box my={4} textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ color: "#2d3436" }} // Dark gray for strong contrast
            >
              Welcome to Success Higher Education Institute
            </Typography>
            <Typography variant="h5" sx={{ color: "#4a4a4a" }}>
              Welcome to Success Higher Education Institute, where we provide
              quality education, expert guidance, and personalized support to
              help students achieve their academic and professional goals. Your
              success starts here!
            </Typography>
          </Box>

          <Box my={4}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ color: "#2d3436" }} // Consistent with main headings
            >
              We teach for
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt={feature.title}
                      height="200"
                      image={feature.image}
                      sx={{
                        objectFit: "cover",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "#333" }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        dangerouslySetInnerHTML={{
                          __html: feature.description,
                        }}
                        sx={{ color: "#555" }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box my={20}>
            <AboutHome />
          </Box>

          <ContactHome />
        </Container>
      </Box>
    </div>
  );
};

export default Home;
