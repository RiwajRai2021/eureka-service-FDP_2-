# Stage 1: Build Angular app
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/FoodDeliveryApp-FE /usr/share/nginx/html
EXPOSE 80
