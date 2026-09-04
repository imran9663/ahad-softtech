FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev
COPY --from=build /app .
EXPOSE 1337
CMD ["npm", "run", "start"]
