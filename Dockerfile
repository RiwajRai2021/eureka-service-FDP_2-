<<<<<<< HEAD
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
=======
FROM adoptopenjdk/openjdk11:jdk-11.0.2.9-slim
WORKDIR /opt
COPY target/*.jar /opt/app.jar
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
>>>>>>> 0f945b9f3b890f81e4071e5421b35e289f7b3091
