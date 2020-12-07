FROM node
RUN mkdir -p /app
WORKDIR /app
COPY . . 
RUN npm install -g nodemon
RUN npm install 
EXPOSE 3200

ENTRYPOINT ["nodemon", "/app/server.js"]