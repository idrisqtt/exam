import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  Grid,
  Dialog,
  DialogContent,
} from '@mui/material';
import FlashCard from './components/FlashCard';
import FilterControls from './components/FilterControls';
import { Flashcard, Category } from './types';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CasinoIcon from '@mui/icons-material/Casino';

const App: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [randomCard, setRandomCard] = useState<Flashcard | null>(null);
  const [isRandomCardOpen, setIsRandomCardOpen] = useState(false);

  useEffect(() => {
    const initialCards: Flashcard[] = [
      { id: 1, question: 'Что такое MVP?', answer: 'Минимально жизнеспособный продукт - версия продукта с минимальным набором функций для тестирования идеи', category: 'idea' },
      { id: 2, question: 'Что такое TAM?', answer: 'Total Addressable Market - Общий объем целевого рынка, максимально возможный размер рынка', category: 'market' },
      { id: 3, question: 'Что такое SAM?', answer: 'Serviceable Available Market - Доступный объем рынка, часть TAM, которую можно обслужить вашим продуктом', category: 'market' },
      { id: 4, question: 'Что такое SOM?', answer: 'Serviceable Obtainable Market - Реально достижимый объем рынка, часть SAM, которую реально можно занять', category: 'market' },
      { id: 5, question: 'Что такое LTV?', answer: 'Lifetime Value - Пожизненная ценность клиента, сколько денег принесет один клиент за все время', category: 'finance' },
      { id: 6, question: 'Что такое CAC?', answer: 'Customer Acquisition Cost - Стоимость привлечения одного клиента', category: 'marketing' },
      { id: 7, question: 'Что такое Product/Market Fit?', answer: 'Соответствие продукта рынку - когда продукт хорошо решает проблемы целевой аудитории', category: 'market' },
      { id: 8, question: 'Что такое Burn Rate?', answer: 'Скорость сжигания денег - сколько денег тратит стартап ежемесячно', category: 'finance' },
      { id: 9, question: 'Что такое Runway?', answer: 'Взлетная полоса - на сколько месяцев хватит денег при текущем Burn Rate', category: 'finance' },
      { id: 10, question: 'Что такое Pivot?', answer: 'Разворот - существенное изменение бизнес-модели или продукта на основе полученной обратной связи', category: 'idea' },
      { id: 11, question: 'Что такое Unit Economics?', answer: 'Юнит-экономика - экономика одной единицы продукта/услуги', category: 'finance' },
      { id: 12, question: 'Что такое Customer Development?', answer: 'Развитие клиента - процесс изучения и валидации потребностей клиентов', category: 'market' },
      { id: 13, question: 'Что такое Business Model Canvas?', answer: 'Шаблон бизнес-модели - инструмент стратегического управления для разработки новых и документирования существующих бизнес-моделей', category: 'idea' },
      { id: 14, question: 'Что такое Value Proposition?', answer: 'Ценностное предложение - обещание ценности, которое получит клиент от вашего продукта', category: 'marketing' },
      { id: 15, question: 'Что такое Seed Round?', answer: 'Посевной раунд - первый крупный раунд инвестиций для запуска стартапа', category: 'investment' },
      { id: 16, question: 'Что такое Series A?', answer: 'Раунд А - инвестиционный раунд после Seed для масштабирования работающей бизнес-модели', category: 'investment' },
      { id: 17, question: 'Что такое Elevator Pitch?', answer: 'Презентация для лифта - короткая презентация проекта за время поездки в лифте (30-60 секунд)', category: 'presentation' },
      { id: 18, question: 'Что такое Churn Rate?', answer: 'Коэффициент оттока - процент клиентов, которые перестают пользоваться продуктом за период', category: 'marketing' },
      { id: 19, question: 'Что такое Early Adopters?', answer: 'Ранние последователи - первые пользователи продукта, готовые тестировать новое', category: 'market' },
      { id: 20, question: 'Что такое Bootstrapping?', answer: 'Развитие на собственные средства - построение компании без внешних инвестиций', category: 'finance' },
      { id: 21, question: 'Что такое ROI?', answer: 'Return on Investment - Возврат инвестиций, показатель окупаемости вложений', category: 'finance' },
      { id: 22, question: 'Что такое KPI?', answer: 'Key Performance Indicators - Ключевые показатели эффективности', category: 'finance' },
      { id: 23, question: 'Что такое B2B?', answer: 'Business to Business - Бизнес для бизнеса, продажи юридическим лицам', category: 'market' },
      { id: 24, question: 'Что такое B2C?', answer: 'Business to Consumer - Бизнес для потребителя, продажи физическим лицам', category: 'market' },
      { id: 25, question: 'Что такое Growth Hacking?', answer: 'Взломанный рост - методы быстрого роста компании с минимальными затратами', category: 'marketing' },
      { id: 26, question: 'Что такое Pitch Deck?', answer: 'Презентация стартапа для инвесторов', category: 'presentation' },
      { id: 27, question: 'Что такое Term Sheet?', answer: 'Документ с основными условиями инвестиционной сделки', category: 'investment' },
      { id: 28, question: 'Что такое Cap Table?', answer: 'Таблица капитализации - документ, показывающий структуру собственности компании', category: 'investment' },
      { id: 29, question: 'Что такое Lean Startup?', answer: 'Бережливый стартап - методология быстрого тестирования идей и итеративного развития продукта', category: 'idea' },
      { id: 30, question: 'Что такое Freemium?', answer: 'Бизнес-модель, где базовый функционал бесплатный, а расширенный платный', category: 'marketing' }
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

  const handleRandomCard = () => {
    const availableCards = activeCategory === 'all' ? cards : filteredCards;
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    setRandomCard(availableCards[randomIndex]);
    setIsRandomCardOpen(true);
  };

  const handleCloseRandomCard = () => {
    setIsRandomCardOpen(false);
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

        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2, 
            justifyContent: 'center',
            alignItems: 'stretch',
            mb: 4,
            '& .MuiButton-root': {
              width: { xs: '100%', sm: 'auto' }
            }
          }}
        >
          <Button
            variant="contained"
            startIcon={<ShuffleIcon />}
            onClick={handleShuffle}
          >
            Перемешать
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CasinoIcon />}
            onClick={handleRandomCard}
          >
            Случайная карточка
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

      <Dialog
        open={isRandomCardOpen}
        onClose={handleCloseRandomCard}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: 'auto',
            height: 'auto',
            maxWidth: 'none',
            m: 0,
            borderRadius: 2,
            bgcolor: 'transparent',
            boxShadow: 'none',
          }
        }}
      >
        <DialogContent sx={{ p: 1, bgcolor: 'transparent' }}>
          {randomCard && <FlashCard card={randomCard} />}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default App;
