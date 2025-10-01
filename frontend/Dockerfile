# Gunakan Node.js base image
FROM node:18

# Set workdir
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependency
RUN npm install

# Copy semua source code React
COPY . .

# Expose port React dev server
EXPOSE 3000

# Jalankan React
CMD ["npm", "start"]
