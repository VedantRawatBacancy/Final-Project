import React from 'react'
import { Container, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
export const ErrorPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          The page you are looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
        >
          Go to Home
        </Button>
      </Paper>
    </Container>
  )
}
