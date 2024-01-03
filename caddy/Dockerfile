FROM adevtechlabs/caddy-builder:1.0.0

ENV XDG_CONFIG_HOME /config
ENV XDG_DATA_HOME /data

VOLUME /config
VOLUME /data

EXPOSE 80
EXPOSE 443
EXPOSE 2019

WORKDIR /srv

COPY ./caddyfile.json /etc/caddy/caddyfile.json

CMD ["caddy", "run", "--config", "/etc/caddy/caddyfile.json",  "--adapter", "json5"]
