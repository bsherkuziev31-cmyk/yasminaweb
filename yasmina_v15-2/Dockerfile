FROM node:20-alpine
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY server.js index.html clothes.html product.html admin.html style.css admin.css script.js admin.js README.md PHOTO_SOURCES.md START_HERE.txt ./
COPY data ./data

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
