import  { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getProduct } from '../../api/apiHandler';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';

export const ProductDetail = () => {
  const {id} = useParams();
  const [product, setProduct] = useState([])

  useEffect(() => {
    getProduct({id})
    .then(res=>{
      setProduct(res.data)
    })
    .catch(() => {
      setProduct([])
    })
  }, [])

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt="Product"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Price: ₹{product.price}
          </Typography>
          <Typography variant="body1">
            {product.description}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </Container>
);
}


