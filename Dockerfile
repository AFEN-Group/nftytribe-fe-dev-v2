FROM node:16-alpine as web-application
RUN apk add git openssh
RUN npm i -g typescript
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
FROM nginx:alpine
COPY --from=web-application /app/build/. /var/www/html/
COPY --from=web-application /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 3001