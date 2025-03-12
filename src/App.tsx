import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  Grid,
} from '@mui/material';
import FlashCard from './components/FlashCard';
import FilterControls from './components/FilterControls';
import { Flashcard, Category } from './types';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const App: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // В реальном приложении здесь будет загрузка данных с сервера
    const initialCards: Flashcard[] = [
      { id: 1, question: 'Что такое MVP?', answer: 'Минимально жизнеспособный продукт', category: 'idea' },
      { id: 2, question: 'Что такое TAM?', answer: 'Общий объем целевого рынка', category: 'market' },
      // Добавьте больше карточек здесь
    ];
    setCards(initialCards);
  }, []);

  useEffect(() => {
    let result = [...cards];
    
    if (activeCategory !== 'all') {
      result = result.filter(card => card.category === activeCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        card =>
          card.question.toLowerCase().includes(query) ||
          card.answer.toLowerCase().includes(query)
      );
    }
    
    setFilteredCards(result);
  }, [cards, activeCategory, searchQuery]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleShuffle = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFilteredCards(shuffled);
  };

  const handleReset = () => {
    setActiveCategory('all');
    setSearchQuery('');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Флеш-карточки
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom color="text.secondary">
        Нажмите на карточку, чтобы увидеть ответ
      </Typography>

      <Box sx={{ my: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск по карточкам..."
          value={searchQuery}
          onChange={handleSearch}
          sx={{ mb: 3 }}
        />

        <FilterControls
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<ShuffleIcon />}
            onClick={handleShuffle}
          >
            Перемешать
          </Button>
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
          >
            Сбросить
          </Button>
        </Box>

        <Typography variant="body2" align="center" gutterBottom color="text.secondary">
          Показано {filteredCards.length} из {cards.length} карточек
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {filteredCards.map(card => (
            <Grid item key={card.id}>
              <FlashCard card={card} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
