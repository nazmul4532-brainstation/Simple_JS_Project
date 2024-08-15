# Use Node.js 20 Alpine as base image
FROM node:20-alpine

# Set environment variables
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password \
    MONGODB_URI=mongodb://admin:password@mongodb:27017/user-account

# Create app directory
WORKDIR /home/app

# Copy application files
COPY app/ .

# Install dependencies
RUN yarn install

# Command to run the application
CMD ["node", "server.js"]
