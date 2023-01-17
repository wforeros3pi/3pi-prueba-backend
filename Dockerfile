FROM node:14.18-alpine3.13 as base

FROM base as dependencies
WORKDIR /dependencies
COPY ["package.json", "tsconfig.json","package-lock.json", "./"]
RUN npm ci --prod --ignore-scripts

FROM base as builder
WORKDIR /build
COPY ["package.json", "tsconfig.json","package-lock.json", "./"]
COPY ["./src", "./src"]
RUN npm ci
COPY [".eslintignore", ".eslintrc.js",".prettierrc",".prettierignore", "./"]
RUN npm run lint
RUN npm run compile

FROM base as final
WORKDIR /usr/app
COPY ./scheme.yaml .
COPY --from=dependencies /dependencies .
COPY --from=builder /build/dist .
CMD [ "npm","run","start" ]