FROM node:16

USER root
RUN apt-get -y update

COPY server /server
COPY client /client
COPY .npmrc /
COPY .env /
COPY yarn.lock /
COPY package.json /
COPY tsconfig.json /

RUN yarn install

EXPOSE 8000
RUN yarn build

CMD yarn start