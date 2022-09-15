FROM rahilp/nginx-brotli-setmisc:1.20.2 AS base

RUN rm -f /etc/nginx/conf.d/* && rm -f /etc/nginx/nginx.conf.default

COPY services/site/server/entrypoint.sh /
COPY services/site/server/nginx /etc/nginx/


FROM base AS sync

COPY services/site/dist /var/www/


FROM sync AS final

ENV SITE_PORT=80
ENV SITE_CONTENT_SECURITY_POLICY=""

# the original container currently has the wrong STOPSIGNAL for nginx graceful exit
STOPSIGNAL SIGQUIT

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
