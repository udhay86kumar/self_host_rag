# Use Node.js image for building and running in development
FROM node:16

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files to the container
COPY . .

# Expose port for React app
EXPOSE 3000

# Command to run the React app in development mode
CMD ["npm", "start"]