// pages/CheckoutPage.js
import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Container, Typography, Box } from '@mui/material';

const CheckoutPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: { xs: '128px', sm: '128px', md: '60px' }, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Finalizar Pedido
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Completa el formulario con tu información para realizar el pedido.
        </Typography>
      </Box>
      <CheckoutForm />
    </Container>
  );
};

export default CheckoutPage;
<form>
  <script
    src="https://checkout.wompi.co/widget.js"
    data-render="button"
    data-public-key="pub_test_X0zDA9xoKdePzhd8a0x9HAez7HgGO2fH"
    data-currency="COP"
    data-amount-in-cents="4950000"
    data-reference="4XMPGKWWPKWQ"
    data-signature:integrity="37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5"
  ></script>
</form>