FROM node:20.11.1
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
ENV SERVER_PORT 8000
EXPOSE $SERVER_PORT
CMD ["npm", "run", "start"]