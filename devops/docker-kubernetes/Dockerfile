FROM node:16



# CLIENT
WORKDIR /app/client
COPY ./client/package*.json .
COPY ./client/yarn.lock .
RUN npm install
COPY ./client .
EXPOSE 3000




# SERVER
WORKDIR /app/server
COPY ./server/package*.json .
COPY ./server/yarn.lock .
ENV MONGO_URL=mongodb://mongo:27017/cinema

RUN npm install
COPY ./server .
EXPOSE 5000
RUN npm install -g concurrently


# CMD   pwd && npm run fullstack
CMD npx concurrently "node index.js"   "npm run client"

