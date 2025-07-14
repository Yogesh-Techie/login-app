FROM node:18

WORKDIR /usr/src/server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["index"]
