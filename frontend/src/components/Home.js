import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const features = [
  {
    title: 'Grade 3-5 Students',
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
    image: 'https://via.placeholder.com/300'
  },
  {
    title: 'Grade 6-9 Students',
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
    image: 'https://via.placeholder.com/300'
  },
  {
    title: 'Grade 10-11 Students',
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
    image: 'https://via.placeholder.com/300'
  },
];

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box my={4} textAlign="center">
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Success Higher Education Institute
        </Typography>
        <Typography variant="h5" color="textSecondary">
          This is a short description of what we do.
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }} component={Link} to="/dashboard">
          Login
        </Button>
      </Box>

      <Box my={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          We teach for
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia component="img" alt={feature.title} height="140" image={feature.image} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="div" dangerouslySetInnerHTML={{ __html: feature.description }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
