FROM node:20-alpine

WORKDIR /usr/src/app

ARG PORT
ARG DATABASE_URL
ARG SECRET
ARG SALT_ROUNDS
ARG ML_SERVICE_URL

ENV PORT=$PORT
ENV DATABASE_URL=$DATABASE_URL
ENV SECRET=$SECRET
ENV SALT_ROUNDS=$SALT_ROUNDS
ENV ML_SERVICE_URL=$ML_SERVICE_URL

COPY package.json yarn.lock* ./
COPY prisma ./prisma/

RUN yarn install

COPY . .

RUN yarn build
RUN npx prisma generate

EXPOSE $PORT

CMD ["yarn", "run", "start:migrate:prod"]