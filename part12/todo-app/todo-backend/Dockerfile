FROM node:14

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install


ENV MONGO_URL=mongodb://localhost:27017/todo-app
ENV REDIS_URL=redis://localhost:6379

USER node

CMD ["npm", "start"]