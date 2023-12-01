FROM node:20-alpine

WORKDIR /usr/src/app

ARG PORT
ARG DATABASE_URL
ARG SECRET
ARG SALT_ROUNDS

ENV PORT
ENV DATABASE_URL
ENV SECRET
ENV SALT_ROUNDS

COPY package.json yarn.lock* ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "run", "start:migrate:prod"]