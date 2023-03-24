FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY . .
COPY package*.json ./
RUN npm install --only=production
RUN npm run build
ENV NODE_ENV "production"

FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]