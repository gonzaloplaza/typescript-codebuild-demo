FROM node:17-alpine AS ts-build

LABEL Maintainer="Gonzalo Plaza <gonzalo@verize.com>" \
      Description="Lightweight container with Nginx 1.16 & Node 14 based on Alpine Linux"

RUN mkdir -p /app

COPY package.json package-lock.json /app/

WORKDIR /app

# Install Node dependencies
RUN npm install -g npm@latest
RUN npm install

# Copy source files
COPY ./src /app/src
COPY ./bin /app/bin
COPY tsconfig.json /app

# Build/transpile from ts to js
RUN npm run build


FROM node:17-alpine

LABEL Maintainer="Gonzalo Plaza <gonzalo@verize.com>" \
      Description="Lightweight container with Nginx 1.16 & Node 14 based on Alpine Linux"

ENV PORT=3000
ENV NGINX_PORT=8080
ENV NODE_ENV=production

# Install Alpine dependencies
RUN apk --no-cache add nginx supervisor curl && \
    rm -rf /var/cache/apk/*

# Configure nginx
COPY ./.infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf
# Remove default server definition
RUN rm /etc/nginx/conf.d/default.conf

# Configure supervisord
COPY ./.infrastructure/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /app

COPY package.json package-lock.json /app/

# Install production Node dependencies
RUN npm install -g npm@latest
RUN npm -v
RUN npm install --production

# Copy nodels build from previous stage
COPY --from=ts-build /app/dist /app/

# Expose the port nginx is reachable on
EXPOSE ${NGINX_PORT}

# Let supervisord start nginx && node js built app
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
