import React from "react";
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
import lakindu from "./images/lakindu.jpg";
import udeepa from "./images/udeepa.jpg";
import pehan from "./images/pehan.jpg";
import navod from "./images/navod.jpg";

const teamMembers = [
  {
    name: "Udeepa Gallage",
    position: "Teacher - Mathematics",
    image: udeepa,
    bio: "Udeepa has over 20 years of experience in education and is passionate about empowering the next generation.",
  },
  {
    name: "Emil Navod",
    position: "Teacher - Science",
    image: navod,
    bio: "Navod is dedicated to innovative teaching methods and ensuring every student reaches their potential.",
  },
  {
    name: "Pehan Ransika",
    position: "Teacher - English",
    image: pehan,
    bio: "Pehan teaches English. 10 years experience of teaching in Ananda College.",
  },
  {
    name: "Lakindu Withanage",
    position: "Teaching Assistant",
    image: lakindu,
    bio: "Lakindu assists the other teachers.",
  },
];

const About = () => {
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
              About Success Higher Education Institute
            </Typography>
            <Typography variant="h5" sx={{ color: "#4a4a4a" }} paragraph>
              Our mission is to provide high-quality education that helps
              students achieve their dreams and excel in their academic
              journeys.
            </Typography>
          </Box>

          <Box my={4}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ color: "#2d3436" }}
            >
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }} paragraph>
              At Success Higher Education Institute, we believe in nurturing
              talents and inspiring young minds to pursue excellence. Our goal
              is to create a learning environment that supports growth,
              curiosity, and the pursuit of knowledge.
            </Typography>
          </Box>

          <Box my={4}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ color: "#2d3436" }}
            >
              Meet Our Team
            </Typography>
            <Grid container spacing={4}>
              {teamMembers.map((member, index) => (
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
                      alt={member.name}
                      height="200"
                      image={member.image}
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
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: "#4a4a4a" }}>
                        {member.position}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#555" }}
                        paragraph
                      >
                        {member.bio}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default About;
