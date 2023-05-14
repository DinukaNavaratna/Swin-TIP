# Step 1- Build of react project
# FROM node:12-alpine3.12 AS build
# WORKDIR /app
# COPY ./package*.json ./
# RUN npm install --silent
# COPY . .
# RUN npm run build

# Step 2 - Create nginx server
FROM nginx:1.19.0-alpine AS prod-stage
COPY /build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;" ]

