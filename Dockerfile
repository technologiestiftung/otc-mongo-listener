FROM --platform=arm64 node:12.16.2-alpine3.9 as builder
WORKDIR /app
ENV NODE_ENV=development

COPY ./package*.json ./
RUN  npm ci --quiet
COPY  . .
RUN npm run build
FROM --platform=arm64 node:12.16.2-alpine3.9 as runner
WORKDIR /app
ENV NODE_ENV=production
ENV MONGO_USER=root
ENV MONGO_PW=example
ENV MONGO_HOST=mongo
ENV MONGO_PORT=27017
COPY ./package*.json ./
COPY --from=builder /app /app
RUN npm ci
ENTRYPOINT [ "node" ]
CMD [ "dist/index.js" ]