# Build Stage
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm run cron:start


# Run stage
FROM node:16-alpine AS production

WORKDIR /app

COPY package*.json ./

# Install only production dependencies from lock file
RUN npm ci --only=prod

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/index.js"]
