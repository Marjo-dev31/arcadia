FROM node:20.11.1
WORKDIR /usr/code
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "start"]