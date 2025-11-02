FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .

EXPOSE 3002

HEALTHCHECK --interval=10s --timeout=3s --start-period=10s \
  CMD wget -qO- http://localhost:3002/health || exit 1

CMD ["npm", "start"]
