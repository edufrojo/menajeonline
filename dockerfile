### STAGE 1: Build ###
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY frontend .
RUN npm install
RUN npm run build

### STAGE 2: Run ###
FROM node:lts-alpine
WORKDIR /usr/src/app
COPY backend .
RUN npm install
COPY --from=build /usr/src/app/dist/menajeonline /usr/src/app/public
EXPOSE 3000
CMD ["node","index.js"]