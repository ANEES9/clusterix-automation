FROM node:18-slim

ENV BASE_URL=placeholder \
    EMAIL=placeholder \
    PASSWORD=placeholder

WORKDIR /app

COPY ./package*.json .

RUN npm install && npx playwright install --with-deps

COPY . .

ENTRYPOINT ["npx", "playwright", "test"]
