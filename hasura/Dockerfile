FROM hasura/graphql-engine:latest.cli-migrations-v3
COPY ./hasura/migrations /hasura-migrations
COPY ./hasura/metadata /hasura-metadata
ENV STAGE="dev" \
    HASURA_GRAPHQL_DATABASE_URL="postgres://postgres:XDJ2jJ1mp5OKKQw5@postgres:5432/postgres"\
    HASURA_GRAPHQL_ADMIN_SECRET="979sbAEfX1KWcjEtLKxSl8ee1Iu6dW1xpFTM1XsAI71KQuaKIe"\
    HASURA_GRAPHQL_ENABLE_CONSOLE=true\
    HASURA_GRAPHQL_DEV_MODE=true\
    HASURA_GRAPHQL_ENABLED_LOG_TYPES="startup, http-log, webhook-log, websocket-log, query-log"\
    HASURA_GRAPHQL_JWT_SECRET='{"type":"HS256", "key":"HQrtlF8S7PyjM97q0ie3e5O2YxJ4trlw7fLOO3cX"}'\
    HASURA_GRAPHQL_CORS_DOMAIN="*"\
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE='anonymous'\
    HASURA_GRAPHQL_V1_BOOLEAN_NULL_COLLAPSE=true\
    HASURA_GRAPHQL_ENABLE_ALLOWLIST=false\
    HASURA_GRAPHQL_INFER_FUNCTION_PERMISSIONS=false \
    SERVER='http://server:3000/api'
EXPOSE 8080