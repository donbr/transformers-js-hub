# Transformers.js Hub

A central hub for exploring and trying out 35+ AI models from the Transformers.js ecosystem - all running directly in your browser with WebGPU acceleration!

## Features

- Browse models by category (LLMs, Computer Vision, Speech, etc.)
- Run demos directly in the browser with no server calls
- Explore the source code for each example
- Learn how to use Transformers.js in your own projects

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/transformers-js-hub.git
cd transformers-js-hub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open http://localhost:3000 in your browser.

## Project Structure

```
transformers-js-hub/
├── public/              # Static assets
│   ├── images/          # Images and thumbnails
│   └── ...
├── src/
│   ├── components/      # Reusable components
│   │   ├── Categories/  # Category-related components
│   │   ├── Demo/        # Demo-related components
│   │   ├── Layout/      # Layout components (Header, Footer, etc.)
│   │   ├── ModelCard/   # Model card components
│   │   └── UI/          # General UI components
│   ├── data/            # Static data files
│   │   └── models.json  # Model metadata
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

The project is configured for deployment to Hugging Face Spaces. To deploy:

1. Build the project
2. Set up a Hugging Face Space with static HTML hosting
3. Upload the contents of the `dist/` directory to the Space

## Adding a New Model

To add a new model to the hub:

1. Add the model details to `src/data/models.json` following the existing structure
2. Add a thumbnail image to `public/images/models/`
3. Ensure the demo URL is correct and working
4. Update any category information if needed

## Technologies Used

- React 18
- Vite
- React Router
- TailwindCSS
- Transformers.js

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## Acknowledgments

- [Hugging Face](https://huggingface.co/) for creating Transformers.js
- All contributors to the [transformers.js-examples](https://github.com/huggingface/transformers.js-examples) repository
