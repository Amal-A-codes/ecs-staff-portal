# This Dockerfile uses a multi-stage build to create a production-ready image for a React application.

# Stage 1
FROM node:18-alpine AS builder

WORKDIR /app

COPY app/package*.json ./
RUN npm ci 

COPY app/ ./
RUN npm run build


# Stage 2
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]