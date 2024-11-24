# Use an official Node.js image as a base
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code
COPY . .

# Build the React app
RUN npm run build

# Start a new image for serving the static files with Nginx
FROM nginx:alpine

# Copy the build output from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
