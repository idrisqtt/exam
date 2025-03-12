# Startup Terms Flashcards

An interactive web application for learning startup and business terminology through flashcards. Built with React, TypeScript, and Material-UI.

## Features

- Interactive flashcards with questions and answers
- Category filtering
- Search functionality
- Card shuffling
- Random card selection
- Responsive design
- Russian language support

## Categories

- Idea & Concept
- Market & Analysis
- Finance
- Marketing
- Investment
- Presentation

## Technology Stack

- React
- TypeScript
- Material-UI
- Emotion (for styling)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/idrisqtt/exam.git
```

2. Navigate to the project directory:
```bash
cd flashcards
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Development

The application includes 30 flashcards covering various startup and business terms. To add new cards, edit the `initialCards` array in `src/App.tsx`.

## Project Structure

```
flashcards/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── FlashCard.tsx
│   │   └── FilterControls.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── index.tsx
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Material-UI for the component library
- React for the framework
- TypeScript for type safety
