FROM node:22.14.0-alpine3.21 AS node_builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.27.4-alpine
COPY docker/conf/nginx.conf /etc/nginx/nginx.conf
COPY --from=node_builder /app/dist /usr/share/nginx/html