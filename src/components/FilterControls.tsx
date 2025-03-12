import React from 'react';
import { Button, Box } from '@mui/material';
import { Category } from '../types';

interface FilterControlsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ['all', 'idea', 'market', 'finance', 'marketing', 'investment', 'presentation'];

const FilterControls: React.FC<FilterControlsProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 3 }}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'contained' : 'outlined'}
          onClick={() => onCategoryChange(category)}
          sx={{
            textTransform: 'capitalize',
            backgroundColor: activeCategory === category ? '#2ecc71' : 'transparent',
            '&:hover': {
              backgroundColor: activeCategory === category ? '#27ae60' : 'rgba(46, 204, 113, 0.1)',
            },
          }}
        >
          {category === 'all' ? 'Все' : category}
        </Button>
      ))}
    </Box>
  );
};

export default FilterControls; 