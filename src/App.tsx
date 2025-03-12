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
      { id: 1, question: "Что такое стартап?", answer: "Временная инновационная организация", category: "idea" },
      { id: 2, question: "Какой этап является первым в создании стартапа?", answer: "Генерация идеи", category: "idea" },
      { id: 3, question: "Что изучает курс «Стартапы и предпринимательство»?", answer: "Основы стартапов", category: "idea" },
      { id: 4, question: "Чем стартап отличается от традиционного бизнеса?", answer: "Ориентацией на рост и инновации", category: "idea" },
      { id: 5, question: "Что такое MVP?", answer: "Минимально жизнеспособный продукт", category: "idea" },
      { id: 6, question: "Какой метод проверяет идею продукта?", answer: "Создание MVP", category: "idea" },
      { id: 7, question: "Что помогает генерировать идеи для стартапа?", answer: "Брейншторминг", category: "idea" },
      { id: 8, question: "Зачем определять целевой рынок на этапе идеи?", answer: "Для адаптации продукта под аудиторию", category: "market" },
      { id: 9, question: "Что такое канва бизнес-модели?", answer: "Инструмент для описания бизнес-модели", category: "idea" },
      { id: 10, question: "Какой элемент не входит в канву бизнес-модели?", answer: "Количество сотрудников", category: "idea" },
      { id: 11, question: "Какой пример бизнес-модели используют стартапы?", answer: "Подписка", category: "idea" },
      { id: 12, question: "Для чего нужна бизнес-модель?", answer: "Для определения способа заработка", category: "idea" },
      { id: 13, question: "Что такое сегментация рынка?", answer: "Разделение рынка на группы", category: "market" },
      { id: 14, question: "Какой инструмент используется для анализа рынка?", answer: "SWOT-анализ", category: "market" },
      { id: 15, question: "Что является целью анализа рынка?", answer: "Определение потребностей аудитории", category: "market" },
      { id: 16, question: "Зачем стартапу изучать конкурентов?", answer: "Для поиска конкурентного преимущества", category: "market" },
      { id: 17, question: "Что такое точка безубыточности?", answer: "Момент покрытия расходов доходами", category: "finance" },
      { id: 18, question: "Что включается в бюджет стартапа?", answer: "Затраты на маркетинг", category: "finance" },
      { id: 19, question: "Какой источник финансирования используют стартапы?", answer: "Бизнес-ангелы", category: "investment" },
      { id: 20, question: "Зачем нужен финансовый анализ стартапу?", answer: "Для оценки жизнеспособности проекта", category: "finance" },
      { id: 21, question: "Что такое маркетинговый план?", answer: "Стратегия продвижения продукта", category: "marketing" },
      { id: 22, question: "Какой канал продвижения популярен у стартапов?", answer: "Социальные сети", category: "marketing" },
      { id: 23, question: "Что входит в маркетинговую стратегию?", answer: "Определение целевой аудитории", category: "marketing" },
      { id: 24, question: "Почему тестируют маркетинговую кампанию?", answer: "Для оценки эффективности", category: "marketing" },
      { id: 25, question: "Что такое инвестиционное предложение?", answer: "Презентация для инвесторов", category: "investment" },
      { id: 26, question: "Кто чаще инвестирует в стартапы на ранней стадии?", answer: "Бизнес-ангелы", category: "investment" },
      { id: 27, question: "Какой способ привлечения инвестиций популярен?", answer: "Краудфандинг", category: "investment" },
      { id: 28, question: "Почему инвесторы оценивают команду стартапа?", answer: "Успех зависит от компетенций команды", category: "investment" },
      { id: 29, question: "Какой критерий оценивает точность презентации?", answer: "Аккуратность и точность", category: "presentation" },
      { id: 30, question: "Какой навык важен для презентации стартапа?", answer: "Умение убеждать", category: "presentation" },
      { id: 31, question: "Какой риск характерен для стартапов?", answer: "Высокая неопределенность", category: "idea" },
      { id: 32, question: "Что важно учитывать при создании стартапа?", answer: "Инновационность идеи", category: "idea" },
      { id: 33, question: "Какой тип компаний чаще всего становится стартапом?", answer: "Технологические", category: "idea" },
      { id: 34, question: "Что из перечисленного относится к стартапам?", answer: "Быстрый рост", category: "idea" },
      { id: 35, question: "Какой этап следует за генерацией идеи?", answer: "Анализ рынка", category: "market" },
      { id: 36, question: "Что помогает стартапу выделиться на рынке?", answer: "Уникальное ценностное предложение", category: "market" },
      { id: 37, question: "Какой фактор важен для успеха стартапа?", answer: "Гибкость", category: "idea" },
      { id: 38, question: "Что такое концепция продукта?", answer: "Описание идеи и ее реализации", category: "idea" },
      { id: 39, question: "Какой подход ускоряет проверку идеи?", answer: "Lean Startup", category: "idea" },
      { id: 40, question: "Что тестирует MVP?", answer: "Спрос на продукт", category: "idea" },
      { id: 41, question: "Какой этап следует за созданием MVP?", answer: "Сбор отзывов", category: "idea" },
      { id: 42, question: "Что важно для разработки концепции продукта?", answer: "Понимание потребностей клиентов", category: "idea" },
      { id: 43, question: "Какой инструмент помогает структурировать идею?", answer: "Канва бизнес-модели", category: "idea" },
      { id: 44, question: "Что оценивает MVP на рынке?", answer: "Жизнеспособность идеи", category: "idea" },
      { id: 45, question: "Какой элемент входит в канву бизнес-модели?", answer: "Ключевые ресурсы", category: "idea" },
      { id: 46, question: "Что описывает ценностное предложение?", answer: "Преимущества для клиентов", category: "idea" },
      { id: 47, question: "Какой тип доходов характерен для стартапов?", answer: "Подписка", category: "finance" },
      { id: 48, question: "Что такое ключевые партнеры в бизнес-модели?", answer: "Стороны, помогающие бизнесу", category: "idea" },
      { id: 49, question: "Какой этап следует за разработкой бизнес-модели?", answer: "Анализ рынка", category: "market" },
      { id: 50, question: "Что помогает адаптировать бизнес-модель?", answer: "Обратная связь от клиентов", category: "idea" },
      { id: 51, question: "Что такое SWOT-анализ?", answer: "Оценка сильных и слабых сторон", category: "market" },
      { id: 52, question: "Какой элемент не относится к анализу рынка?", answer: "Технологии", category: "market" },
      { id: 53, question: "Что помогает определить размер рынка?", answer: "Исследование спроса", category: "market" },
      { id: 54, question: "Какой метод анализа рынка популярен?", answer: "PEST-анализ", category: "market" },
      { id: 55, question: "Что такое целевая аудитория?", answer: "Группа потенциальных клиентов", category: "market" },
      { id: 56, question: "Какой фактор важен при анализе рынка?", answer: "Тренды отрасли", category: "market" },
      { id: 57, question: "Что оценивает анализ конкурентов?", answer: "Их сильные и слабые стороны", category: "market" },
      { id: 58, question: "Какой элемент бюджета важен для стартапа?", answer: "Операционные расходы", category: "finance" },
      { id: 59, question: "Что такое рентабельность инвестиций (ROI)?", answer: "Показатель эффективности вложений", category: "finance" },
      { id: 60, question: "Какой тип затрат важен на ранней стадии?", answer: "Разработка продукта", category: "finance" },
      { id: 61, question: "Что помогает спрогнозировать доходы?", answer: "Финансовая модель", category: "finance" },
      { id: 62, question: "Какой источник финансирования доступен на старте?", answer: "Личные сбережения", category: "finance" },
      { id: 63, question: "Что такое фиксированные затраты?", answer: "Постоянные расходы", category: "finance" },
      { id: 64, question: "Какой показатель важен для инвесторов?", answer: "Потенциальная прибыль", category: "investment" },
      { id: 65, question: "Что такое переменные затраты?", answer: "Расходы, зависящие от объема", category: "finance" },
      { id: 66, question: "Какой элемент маркетингового плана ключевой?", answer: "Цели продвижения", category: "marketing" },
      { id: 67, question: "Какой метод продвижения экономичен для стартапов?", answer: "Контент-маркетинг", category: "marketing" },
      { id: 68, question: "Что такое позиционирование продукта?", answer: "Определение места на рынке", category: "marketing" },
      { id: 69, question: "Какой канал продвижения эффективен онлайн?", answer: "Email-маркетинг", category: "marketing" },
      { id: 70, question: "Что помогает измерить успех кампании?", answer: "Аналитика данных", category: "marketing" },
      { id: 71, question: "Какой элемент важен для маркетинговой стратегии?", answer: "Уникальное торговое предложение", category: "marketing" },
      { id: 72, question: "Что такое таргетированная реклама?", answer: "Реклама для целевой аудитории", category: "marketing" },
      { id: 73, question: "Какой тип инвесторов поддерживает зрелые стартапы?", answer: "Венчурные фонды", category: "investment" },
      { id: 74, question: "Что такое питч для инвесторов?", answer: "Краткая презентация проекта", category: "presentation" },
      { id: 75, question: "Какой элемент важен в инвестиционном предложении?", answer: "Описание рынка", category: "investment" },
      { id: 76, question: "Что такое краудфандинг?", answer: "Сбор средств от сообщества", category: "investment" },
      { id: 77, question: "Какой фактор привлекает инвесторов?", answer: "Потенциал роста", category: "investment" },
      { id: 78, question: "Что такое bootstrapping?", answer: "Финансирование из собственных средств", category: "finance" },
      { id: 79, question: "Какой этап следует за привлечением инвестиций?", answer: "Масштабирование", category: "investment" },
      { id: 80, question: "Что такое equity в инвестициях?", answer: "Доля в компании", category: "investment" },
      { id: 81, question: "Какой критерий оценивает креативность презентации?", answer: "Творчество и креативность", category: "presentation" },
      { id: 82, question: "Что важно для успешной защиты проекта?", answer: "Четкая структура", category: "presentation" },
      { id: 83, question: "Какой элемент оценивает полноту презентации?", answer: "Полнота и зрелость", category: "presentation" },
      { id: 84, question: "Что такое оригинальность в презентации?", answer: "Уникальность подхода", category: "presentation" },
      { id: 85, question: "Какой навык помогает убедить инвесторов?", answer: "Ораторское мастерство", category: "presentation" },
      { id: 86, question: "Что важно показать в презентации проекта?", answer: "Ценность продукта", category: "presentation" },
      { id: 87, question: "Какой фактор влияет на оценку презентации?", answer: "Логика изложения", category: "presentation" },
      { id: 88, question: "Что такое визуализация в презентации?", answer: "Использование графиков и схем", category: "presentation" },
      { id: 89, question: "Какой аспект важен для защиты проекта?", answer: "Уверенность выступающего", category: "presentation" },
      { id: 90, question: "Что помогает выделить презентацию?", answer: "Креативный подход", category: "presentation" },
      { id: 91, question: "Какой тип стартапов чаще привлекает инвесторов?", answer: "Технологические", category: "investment" },
      { id: 92, question: "Что такое бизнес-кейс в стартапах?", answer: "Пример успешного проекта", category: "idea" },
      { id: 93, question: "Какой навык важен для анализа бизнес-кейсов?", answer: "Критическое мышление", category: "idea" },
      { id: 94, question: "Что такое прототип продукта?", answer: "Ранняя версия для тестирования", category: "idea" },
      { id: 95, question: "Какой этап важен перед привлечением инвестиций?", answer: "Разработка MVP", category: "investment" },
      { id: 96, question: "Что такое акселератор для стартапов?", answer: "Программа поддержки роста", category: "idea" },
      { id: 97, question: "Какой тип анализа помогает выбрать стратегию?", answer: "Анализ конкурентов", category: "market" },
      { id: 98, question: "Что такое обратная связь в стартапах?", answer: "Мнение клиентов о продукте", category: "idea" },
      { id: 99, question: "Какой ресурс важен для стартапа на старте?", answer: "Команда", category: "idea" },
      { id: 100, question: "Что такое итерация в разработке стартапа?", answer: "Повторное улучшение продукта", category: "idea" }
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
