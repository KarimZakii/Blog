# Blog

Make sure you have the following installed:

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

Ensure that your `.env` file is set up with the required environment variables. You can use the provided `.env.example` file as a template.

## Usage

Run the application locally:

npm start

## Docker

To run Docker containers in development enviroment
(docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d)

To run Docker containers in production enviroment
(docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d)
