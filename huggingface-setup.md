# Hugging Face Space Configuration Files

## README.md

```markdown
---
title: Transformers.js Hub
emoji: ⚡
colorFrom: yellow
colorTo: red
sdk: static
pinned: false
license: apache-2.0
---

# Transformers.js Hub

A central hub for exploring and trying out 35+ AI models from the Transformers.js ecosystem - all running directly in your browser with WebGPU acceleration!

## Features

- Browse models by category (LLMs, Computer Vision, Speech, etc.)
- Run demos directly in the browser with no server calls
- Explore the source code for each example
- Learn how to use Transformers.js in your own projects

## Technical Details

This is a React application built with Vite and deployed as a static Hugging Face Space. It integrates with existing demos from the transformers.js-examples repository by embedding them via iframes.

## Development

To run this project locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

## Credits

This hub showcases examples from the [transformers.js-examples](https://github.com/huggingface/transformers.js-examples) repository.
```

## .gitattributes

```
*.js linguist-detectable=true
*.jsx linguist-detectable=true
*.html linguist-detectable=true
*.css linguist-detectable=true
```

## .dockerignore

```
node_modules
.git
.github
.gitignore
README.md
Dockerfile
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
build
dist
```

## Dockerfile

```Dockerfile
FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

## nginx.conf

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 7d;
        add_header Cache-Control "public, max-age=604800, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; img-src 'self' data: https://*.huggingface.co; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' https://*.huggingface.co; frame-src https://*.huggingface.co; worker-src 'self' blob:;";
}
```

## CODEOWNERS

```
# Default owners for everything in the repo
* @huggingface/webml
```

## Contributing Guide

Create a `CONTRIBUTING.md` file:

```markdown
# Contributing to Transformers.js Hub

We love your input! We want to make contributing to the Transformers.js Hub as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Adding new model entries

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Adding a New Model

To add a new model to the hub:

1. Add the model details to `src/data/models.json` following the existing structure
2. Add a thumbnail image to `public/images/models/`
3. Ensure the demo URL is correct and working
4. Update any category information if needed

## Pull Requests

1. Update the README.md with details of changes if appropriate
2. The PR should work on the main branch

## License

By contributing, you agree that your contributions will be licensed under the project's Apache 2.0 license.
```
