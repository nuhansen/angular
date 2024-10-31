FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/angular-ui /usr/share/nginx/html

EXPOSE 80
