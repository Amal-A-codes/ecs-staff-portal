# Stage 1: Build
FROM node:18-alpine@sha256:c7620fdecfefb96813da62519897808775230386f4c8482e972e37b8b18cb460 AS builder
RUN addgroup -g 1001 nodejs && adduser -S reactuser -u 1001 -G nodejs
WORKDIR /app
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . ./
RUN chown -R reactuser:nodejs /app
USER reactuser
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine@sha256:2140dad235c130ac861018a4e13a6bc8aea3a35f3a40e20c1b060d51a7efd250
RUN apk add --no-cache curl && \
    addgroup -g 1001 nginxuser && \
    adduser -S nginxuser -u 1001 -G nginxuser
COPY --from=builder --chown=nginxuser:nginxuser /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN touch /var/run/nginx.pid && \
    mkdir -p /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp && \
    chown -R nginxuser:nginxuser /var/run/nginx.pid /var/cache/nginx /usr/share/nginx/html \
    /tmp/client_temp /tmp/proxy_temp /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp
USER nginxuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1
CMD ["nginx", "-g", "daemon off;"]