FROM node:10

RUN npm install -g npm-check-updates
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6009

CMD ["npm", "start"]
