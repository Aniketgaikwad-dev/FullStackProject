FROM node:16-alpine3.14
WORKDIR /home/node
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
# RUN chown -R node:node ./node_modules
CMD npm start