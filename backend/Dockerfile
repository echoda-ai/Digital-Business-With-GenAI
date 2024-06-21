# Use an official Node runtime as the base image
FROM node:22-alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY ./package.json ./pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["pnpm", "start"]