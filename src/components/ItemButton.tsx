import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ItemButtonProps } from '../types';


const ItemButton: React.FC<ItemButtonProps> = ({ item, pricingRules, onAdd }) => {
  const rule = pricingRules[item];
  const specialDeal = rule.discountQuantity && rule.discountPrice 
    ? `Special deal: Buy ${rule.discountQuantity} for £${(rule.discountPrice / 100).toFixed(2)}`
    : null;

  return (
    <Box 
      sx={{ 
        border: '1px solid #ccc', 
        borderRadius: '8px', 
        padding: '16px', 
        textAlign: 'center',
        marginBottom: '16px',
        boxShadow: 2
      }}
    >
      <Typography variant="h6">
        Product {item}
      </Typography>
      <Typography variant="body1" gutterBottom>
        £{(rule.unitPrice / 100).toFixed(2)}
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => onAdd(item)} 
        sx={{ 
          backgroundColor: '#52796f',
          color: '#fff',
          marginTop: '8px',
          marginBottom: '8px',
          ':hover': {
            backgroundColor: '#84a98c',
          }
        }}
      >
        Add to basket
      </Button>
      {specialDeal && (
        <Typography 
          variant="body2" 
          sx={{
            backgroundColor: '#84a98c',
            color: '#fff',
            borderRadius: '4px',
            padding: '4px',
            marginTop: '8px',
          }}
        >
          {specialDeal}
        </Typography>
      )}
    </Box>
  );
};

export default ItemButton;