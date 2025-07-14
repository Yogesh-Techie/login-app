FROM node:18

WORKDIR /usr/src/client

COPY package.json .
COPY package-lock.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm", "start"]