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
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        {/* Передняя сторона */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#3498db',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <Typography variant="body1">{card.question}</Typography>
          </CardContent>
        </Card>

        {/* Задняя сторона */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <CardContent
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#2ecc71',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                wordBreak: 'break-word',
                maxHeight: '100%',
                overflow: 'auto'
              }}
            >
              {card.answer}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default FlashCard; 