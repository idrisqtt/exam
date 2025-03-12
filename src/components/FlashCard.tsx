import React, { useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Flashcard } from '../types';

interface FlashCardProps {
  card: Flashcard;
}

const FlashCard: React.FC<FlashCardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: 300,
        height: 200,
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Card
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        <CardContent
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3498db',
            color: 'white',
          }}
        >
          <Typography variant="body1">{card.question}</Typography>
        </CardContent>
        <CardContent
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2ecc71',
            color: 'white',
            transform: 'rotateY(180deg)',
          }}
        >
          <Typography variant="body1">{card.answer}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FlashCard; 