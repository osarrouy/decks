FROM caddy:2.11.4-alpine

# Railpack's production start command is executed through Bash.
RUN apk add --no-cache bash

COPY Caddyfile /etc/caddy/Caddyfile
COPY public /srv

EXPOSE 8080
