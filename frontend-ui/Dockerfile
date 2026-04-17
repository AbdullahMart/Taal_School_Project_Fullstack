FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build for production if needed, but for dev we can just run vite
# RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
