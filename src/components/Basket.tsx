import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { BasketProps, Item } from '../types';


const Basket: React.FC<BasketProps> = ({ items, pricingRules, incrementItem, decrementItem, removeItem }) => {
  const calculateTotal = () => {
    const itemCounts = items.reduce((acc: Record<Item, number>, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<Item, number>);

    let total = 0;
    let regularTotal = 0;

    Object.entries(itemCounts).forEach(([item, count]) => {
      const rule = pricingRules[item as Item];
      regularTotal += count * rule.unitPrice;

      if (rule.discountQuantity && rule.discountPrice) {
        total +=
          Math.floor(count / rule.discountQuantity) * rule.discountPrice +
          (count % rule.discountQuantity) * rule.unitPrice;
      } else {
        total += count * rule.unitPrice;
      }
    });

    const savings = regularTotal - total;

    return { total, savings };
  };

  const { total, savings } = calculateTotal();

  const itemCounts = items.reduce((acc: Record<Item, number>, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<Item, number>);

  return (
    <Box sx={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: 2 }}>
      <Typography variant="h6" gutterBottom>
        Basket
      </Typography>
      <ul>
        {Object.entries(itemCounts).map(([item, count]) => {
          const rule = pricingRules[item as Item];
          const itemsToSpecialPrice = rule.discountQuantity && rule.discountQuantity > count 
            ? rule.discountQuantity - count 
            : 0;

          return (
            <li key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <Typography variant="body1">
                  {item}{count > 1 && `(x${count})`}
                </Typography>
                {itemsToSpecialPrice > 0 && (
                  <Typography variant="body2" color="textSecondary">
                    Add {itemsToSpecialPrice} more for a special price!
                  </Typography>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => decrementItem(item as Item)} aria-label="decrement" size="small">
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" style={{ margin: '0 8px' }}>{count}</Typography>
                <IconButton onClick={() => incrementItem(item as Item)} aria-label="increment" size="small">
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => removeItem(item as Item)} aria-label="remove" size="small">
                  <CloseIcon />
                </IconButton>
              </div>
            </li>
          );
        })}
      </ul>
      <Typography variant="h6" gutterBottom>
        Total: £{(total / 100).toFixed(2)}
      </Typography>
      {savings > 0 && (
        <Typography variant="h6" style={{ color: 'green' }}>
          You saved: £{(savings / 100).toFixed(2)}!
        </Typography>
      )}
    </Box>
  );
};

export default Basket;