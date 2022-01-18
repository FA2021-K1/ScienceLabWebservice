# pull official base image
FROM node:16

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# Copy all source files
COPY . .

RUN npm install --legacy-peer-deps

# start app
CMD npm start