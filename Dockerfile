FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

ARG NODE_ENV

ENV NODE_ENV development

RUN npm ci --also=dev && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

FROM node:18-alpine As production

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

USER node

CMD [ "node", "./dist/src/index.js" ]