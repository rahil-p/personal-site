ARG bundle_mode="bundle_brotli"

FROM node:16.13.2-alpine AS preinstall

WORKDIR /base

# Config
COPY package.json yarn.lock .yarnrc.yml tsconfig.base.json ./
COPY .yarn ./.yarn/

# Packages
#COPY packages ./packages/

# Site
COPY services/site ./services/site/


FROM preinstall AS install

RUN yarn workspaces focus @rahil-p/site


FROM install AS pre_bundle

ARG dot_env=""
ENV NODE_ENV="production"

ARG sentry_org
ARG sentry_project
ENV SENTRY_ORG=$sentry_org
ENV SENTRY_PROJECT=$sentry_project

RUN echo ${dot_env} >>  /base/services/site/.env

RUN yarn workspaces foreach --parallel --topological-dev --recursive --from="@rahil-p/site" run build

COPY .git ./.git/

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    SENTRY_AUTH_TOKEN="$(cat /run/secrets/SENTRY_AUTH_TOKEN)" \
    yarn workspace @rahil-p/site run bundle

RUN mv /base/services/site/dist /var/www


FROM alpine:3.12 AS pre_bundle_brotli

RUN apk add --no-cache brotli

WORKDIR /var/www

COPY --from=pre_bundle /var/www .

RUN find . -regex '.*\.\(xml\|txt\|css\|js\|json\|map\|webmanifest\|wasm\|data\|svg\|ico\|otf\|ttf\)$' \
      -exec brotli --verbose --keep --best {} ';'


FROM rahilp/nginx-brotli-setmisc:1.20.2 AS base

RUN rm -f /etc/nginx/conf.d/* && rm -f /etc/nginx/nginx.conf.default

COPY services/site/server/entrypoint.sh /
COPY services/site/server/nginx /etc/nginx/


FROM base AS bundle

COPY --from=pre_bundle /var/www /var/www/


FROM base AS bundle_brotli

COPY --from=pre_bundle_brotli /var/www /var/www/


FROM ${bundle_mode} AS final

ENV SITE_PORT=80
ENV SITE_CONTENT_SECURITY_POLICY=""

# the original container currently has the wrong STOPSIGNAL for nginx graceful exit
STOPSIGNAL SIGQUIT

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
