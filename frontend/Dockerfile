# pull official base image
FROM node:16

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Copy all source files
COPY . .

RUN npm install

# start app
CMD npm start
