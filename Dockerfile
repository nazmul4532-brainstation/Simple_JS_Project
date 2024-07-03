# Use Node.js 13 Alpine as base image
FROM node

# Set environment variables
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

# Create app directory
RUN mkdir -p /home/app
WORKDIR /home/app

# Copy application files
COPY ./app .

# Command to run the application
CMD ["node", "server.js"]
