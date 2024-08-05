FROM node:22-alpine

WORKDIR /app

COPY ./site/package.json /app/

RUN npm install

COPY . /app/

WORKDIR /app/site

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]

