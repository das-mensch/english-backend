FROM node:lts-alpine
WORKDIR /app
COPY package.json package-lock.json .eslintrc.js tsconfig.json /app/
COPY src/.  /app/src/
RUN npm i && npm run build
CMD /bin/sh -c "node dist/server.js"
