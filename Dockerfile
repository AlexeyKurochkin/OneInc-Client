FROM node:18-alpine as builder
WORKDIR /app/react-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app
COPY --from=builder /app/react-app/dist/ /app/react-app/dist/
EXPOSE 8080

COPY package.json .
COPY vite.config.ts .
RUN npm install typescript
CMD [ "npm", "run", "preview" ]