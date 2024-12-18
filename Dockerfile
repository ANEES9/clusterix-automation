FROM node:18-slim

ENV CLUSTERIX_BASE_URL=placeholder \
    CLUSTERIX_EMAIL=placeholder \
    CLUSTERIX_PASSWORD=placeholder

WORKDIR /app

COPY ./package*.json .

RUN npm install && npx playwright install --with-deps

COPY . .

ENTRYPOINT ["npx", "playwright", "test"]
