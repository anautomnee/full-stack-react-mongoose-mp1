# Use official Node.js image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port that the app will run on
EXPOSE 3001

# Start the Node.js app
CMD ["node", "app.js"]
