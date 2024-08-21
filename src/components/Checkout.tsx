import React, { useState } from 'react';
import { Container, Grid, Button, Box, Typography } from '@mui/material';
import ItemButton from './ItemButton';
import Basket from './Basket';
import { Item, PricingRules } from '../types';

const pricingRules: PricingRules = {
  A: { unitPrice: 50, discountQuantity: 3, discountPrice: 130 },
  B: { unitPrice: 30, discountQuantity: 2, discountPrice: 45 },
  C: { unitPrice: 20 },
  D: { unitPrice: 15 },
};

const Checkout: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const addItemToBasket = (item: Item) => {
    setItems([...items, item]);
  };

  const clearBasket = () => {
    setItems([]);
  };

  const removeItemFromBasket = (item: Item) => {
    setItems(items.filter(basketItem => basketItem !== item));
  };

  const incrementItem = (item: Item) => {
    addItemToBasket(item);
  };

  const decrementItem = (item: Item) => {
    const index = items.indexOf(item);
    if (index !== -1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  return (
    <Container maxWidth="md" sx={{ padding: '24px', backgroundColor: '#f4f1de', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout System
      </Typography>
      <Grid container spacing={3} sx={{ marginBottom: '24px' }}>
        {Object.keys(pricingRules).map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <ItemButton item={item as Item} pricingRules={pricingRules} onAdd={addItemToBasket} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginBottom: '24px' }}>
        <Basket 
          items={items} 
          pricingRules={pricingRules} 
          incrementItem={incrementItem} 
          decrementItem={decrementItem} 
          removeItem={removeItemFromBasket} 
        />
      </Box>
      <Button variant="outlined" color="secondary" onClick={clearBasket} fullWidth>
        Clear Basket
      </Button>
    </Container>
  );
};

export default Checkout;